import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";

// Every export of a "use server" file is a public POST endpoint: anyone can
// call it with any arguments, signed in or not. This finds them all (so a new
// action is covered without touching this file) and throws hostile calls at
// each one, as a stranger and as another learner. Nothing may write to the
// database for a stranger, and nobody may see or change the victim's data.

const clerk = vi.hoisted(() => ({ signedInAs: null as string | null }));

vi.mock("@clerk/nextjs/server", () => {
    const attacker = {
        id: "user_ATTACKER",
        primaryEmailAddressId: "idn_attacker",
        primaryEmailAddress: {
            id: "idn_attacker",
            emailAddress: "attacker@x.com",
            verification: { status: "verified" },
        },
        emailAddresses: [
            {
                id: "idn_attacker",
                emailAddress: "attacker@x.com",
                verification: { status: "verified" },
            },
        ],
        username: "attacker",
        firstName: "A",
        lastName: "T",
        imageUrl: "",
    };
    return {
        auth: async () => ({ userId: clerk.signedInAs }),
        currentUser: async () => (clerk.signedInAs ? attacker : null),
        clerkClient: async () => ({
            users: { getUser: async () => attacker },
        }),
    };
});
vi.mock("next/cache", () => ({
    revalidatePath: () => {},
    revalidateTag: () => {},
    unstable_cache: (fn: unknown) => fn,
}));
vi.mock("next/headers", () => ({
    headers: async () => new Headers(),
    cookies: async () => ({ get: () => undefined }),
}));

// No real model calls, whatever an action does
delete process.env.GEMINI_KEY;
delete process.env.GEMINI_API_KEY;
delete process.env.OPENAI_API_KEY;

const ROOT = path.resolve(import.meta.dirname, "..");

function serverActionFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) {
            return name === "node_modules" ? [] : serverActionFiles(full);
        }
        if (!/\.(ts|tsx)$/.test(name)) return [];
        return /^\s*["']use server["']/.test(readFileSync(full, "utf8"))
            ? [full]
            : [];
    });
}

const files = ["lib", "app", "components"].flatMap((dir) =>
    serverActionFiles(path.join(ROOT, dir)),
);

const VICTIM_CLERK_ID = "user_VICTIM";
const VICTIM_EMAIL = "victim-secret@x.com";
let victimId = "";

const hostileArguments = () => [
    [],
    [victimId],
    [VICTIM_CLERK_ID],
    [{ $gt: "" }],
    [{ $ne: null }, { $ne: null }],
    [victimId, { lessons: {} }],
    [{ userId: victimId, clerkId: VICTIM_CLERK_ID }],
    [JSON.parse('{"__proto__": {"isAdmin": true}}')],
    ["x".repeat(200_000)],
    [-1, NaN, null, undefined],
    [0, "en", victimId],
];

// The whole database, so any write shows up
async function snapshot() {
    const db = mongoose.connection.db!;
    const dump: Record<string, unknown[]> = {};
    for (const collection of await db.collections()) {
        dump[collection.collectionName] = await collection
            .find({})
            .sort({ _id: 1 })
            .toArray();
    }
    return JSON.stringify(dump);
}

async function victimData() {
    const db = mongoose.connection.db!;
    const dump: Record<string, unknown[]> = {};
    for (const collection of await db.collections()) {
        const docs = await collection
            .find({
                $or: [
                    { userId: new mongoose.Types.ObjectId(victimId) },
                    { clerkId: VICTIM_CLERK_ID },
                    { _id: new mongoose.Types.ObjectId(victimId) },
                ],
            })
            .toArray();
        // Collections that appear empty along the way aren't the victim's
        if (docs.length > 0) dump[collection.collectionName] = docs;
    }
    return JSON.stringify(dump);
}

async function call(fn: (...args: unknown[]) => unknown, args: unknown[]) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), 5_000),
    );
    try {
        return { value: await Promise.race([fn(...args), timeout]) };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : String(error),
        };
    }
}

type Action = { name: string; fn: (...args: unknown[]) => unknown };
const actions: Action[] = [];

beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});

    for (const file of files) {
        const module = await import(file);
        for (const [name, value] of Object.entries(module)) {
            if (typeof value === "function") {
                actions.push({
                    name: `${path.relative(ROOT, file)}#${name}`,
                    fn: value as Action["fn"],
                });
            }
        }
    }

    const { connectToDatabase } = await import("@/lib/database");
    await connectToDatabase();
});

async function seedVictim() {
    const { default: User } = await import("@/lib/database/models/user.model");
    const { default: LearnerProgress } = await import(
        "@/lib/database/models/learnerProgress.model"
    );
    const victim = await User.create({
        clerkId: VICTIM_CLERK_ID,
        email: VICTIM_EMAIL,
        username: "victim-secret",
    });
    victimId = victim._id.toString();
    await LearnerProgress.create({
        clerkId: VICTIM_CLERK_ID,
        lessons: {
            "mrt-basics": {
                completedAt: new Date().toISOString(),
                runs: 7,
                bestFirstTry: 3,
                total: 4,
            },
        },
    });
}

// Only what the attacker can't have sent: an error that echoes back the
// victim's id from the arguments isn't a leak
const leaksVictim = (value: unknown) => {
    const text = JSON.stringify(value) ?? "";
    return [VICTIM_EMAIL, "victim-secret", '"runs":7'].some((marker) =>
        text.includes(marker),
    );
};

describe("server actions", () => {
    beforeEach(seedVictim);

    it("finds the actions to test", () => {
        expect(files.length).toBeGreaterThan(5);
        expect(actions.length).toBeGreaterThan(20);
    });

    it("write nothing and reveal nothing for a signed-out stranger", async () => {
        const problems: string[] = [];

        for (const { name, fn } of actions) {
            for (const args of hostileArguments()) {
                clerk.signedInAs = null;
                const before = await snapshot();
                const result = await call(fn, args);
                const after = await snapshot();

                if (result.error === "TIMEOUT") problems.push(`${name}: hangs`);
                if (before !== after)
                    problems.push(`${name}: wrote to the database`);
                if (leaksVictim(result))
                    problems.push(`${name}: returned the victim's data`);
            }
        }

        expect([...new Set(problems)]).toEqual([]);
    }, 300_000);

    it("never let one learner see or change another's data", async () => {
        const problems: string[] = [];

        for (const { name, fn } of actions) {
            for (const args of hostileArguments()) {
                clerk.signedInAs = "user_ATTACKER";
                const before = await victimData();
                const result = await call(fn, args);
                const after = await victimData();

                if (result.error === "TIMEOUT") problems.push(`${name}: hangs`);
                if (before !== after)
                    problems.push(`${name}: changed the victim's data`);
                if (leaksVictim(result))
                    problems.push(`${name}: returned the victim's data`);
            }
        }

        expect([...new Set(problems)]).toEqual([]);
    }, 300_000);
});
