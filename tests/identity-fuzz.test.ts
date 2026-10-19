import { AsyncLocalStorage } from "node:async_hooks";
import { performance } from "node:perf_hooks";
import mongoose from "mongoose";
import { Webhook } from "svix";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type ClerkUser = {
    id: string;
    emailAddresses: { id: string; emailAddress: string }[];
    primaryEmailAddressId: string | null;
    username: string | null;
    firstName: string;
    lastName: string;
    imageUrl: string;
    updatedAt: number;
};
type RequestContext = { userId?: string; headers?: Headers };
type Gate = { entered: () => void; release: Promise<void> };
type Event = {
    type: "user.created" | "user.updated" | "user.deleted";
    data: Record<string, unknown>;
};

// Same module boundary as user-identity.test.ts. ALS prevents global auth/header
// state from inventing identity swaps when different requests run concurrently.
const clerk = vi.hoisted(() => ({
    users: new Map<string, ClerkUser>(),
    failures: new Set<string>(),
    gates: new Map<string, Gate>(),
    context: null as AsyncLocalStorage<RequestContext> | null,
    calls: 0,
    version: 0,
}));
vi.mock("@clerk/nextjs/server", () => ({
    auth: async () => ({ userId: clerk.context!.getStore()?.userId ?? null }),
    currentUser: async () => null,
    clerkClient: async () => ({
        users: {
            getUser: async (id: string) => {
                clerk.calls++;
                if (clerk.failures.has(id))
                    throw new Error("Synthetic Clerk outage");
                const current = clerk.users.get(id);
                if (!current) {
                    throw Object.assign(new Error("Not Found"), {
                        clerkError: true,
                        status: 404,
                        errors: [],
                    });
                }
                // A real HTTP request may return a snapshot read before a
                // concurrent mutation. Never return a mutable shared object.
                const snapshot = structuredClone(current);
                const gate = clerk.gates.get(id);
                if (gate) {
                    clerk.gates.delete(id);
                    gate.entered();
                    await gate.release;
                }
                return snapshot;
            },
        },
    }),
}));
vi.mock("next/headers", () => ({
    headers: async () => clerk.context!.getStore()?.headers ?? new Headers(),
}));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

clerk.context = new AsyncLocalStorage<RequestContext>();
const { ensureUser } = await import("@/lib/actions/user.actions");
const { POST } = await import("@/app/api/webhook/clerk/route");
const { default: User } = await import("@/lib/database/models/user.model");
const { default: LearnerProgress } = await import(
    "@/lib/database/models/learnerProgress.model"
);
const { connectToDatabase } = await import("@/lib/database");

let messageNumber = 0;
function user(
    id: string,
    email: string | null = "shared@example.test",
    username: string | null = "shared",
): ClerkUser {
    const result = {
        id,
        emailAddresses: email
            ? [{ id: `email_${id}`, emailAddress: email }]
            : [],
        primaryEmailAddressId: email ? `email_${id}` : null,
        username,
        firstName: "Test",
        lastName: id,
        imageUrl: `https://images.invalid/${id}`,
        updatedAt: ++clerk.version,
    };
    clerk.users.set(id, result);
    return result;
}
function event(type: Event["type"], profile: ClerkUser): Event {
    return {
        type,
        data: {
            id: profile.id,
            email_addresses: profile.emailAddresses.map((entry) => ({
                id: entry.id,
                email_address: entry.emailAddress,
            })),
            primary_email_address_id: profile.primaryEmailAddressId,
            username: profile.username,
            first_name: profile.firstName,
            last_name: profile.lastName,
            image_url: profile.imageUrl,
        },
    };
}
async function deliver(evt: Event) {
    const body = JSON.stringify({ ...evt, object: "event" });
    const id = `msg_identity_${++messageNumber}`;
    const timestamp = new Date();
    const signature = new Webhook(process.env.WEBHOOK_SECRET!).sign(
        id,
        timestamp,
        body,
    );
    return clerk.context!.run(
        {
            headers: new Headers({
                "svix-id": id,
                "svix-timestamp": String(
                    Math.floor(timestamp.getTime() / 1000),
                ),
                "svix-signature": signature,
            }),
        },
        () =>
            POST(
                new Request("http://localhost/api/webhook/clerk", {
                    method: "POST",
                    body,
                }),
            ),
    );
}
function visit(id: string) {
    return clerk.context!.run({ userId: id }, () => ensureUser());
}
function holdNextFetch(id: string) {
    let entered!: () => void;
    let release!: () => void;
    const reached = new Promise<void>((resolve) => {
        entered = resolve;
    });
    const blocked = new Promise<void>((resolve) => {
        release = resolve;
    });
    clerk.gates.set(id, { entered, release: blocked });
    return { reached, release };
}
function rng(seed: number) {
    let state = seed >>> 0;
    return (length: number) => {
        state += 0x6d2b79f5;
        let n = Math.imul(state ^ (state >>> 15), state | 1);
        n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
        return ((n ^ (n >>> 14)) >>> 0) % length;
    };
}
function expectedProfile(profile: ClerkUser) {
    const email = (
        profile.emailAddresses.find(
            (item) => item.id === profile.primaryEmailAddressId,
        ) ?? profile.emailAddresses[0]
    )?.emailAddress;
    const local = email?.split("@")[0].replace(/[^a-zA-Z0-9._-]/g, "");
    return {
        email,
        username:
            profile.username || `${local || "user"}-${profile.id.slice(-6)}`,
    };
}
async function freshDatabase() {
    await connectToDatabase();
    // Recreate the entire database, including indexes, between scenarios.
    await mongoose.connection.db!.dropDatabase();
    await Promise.all([User.syncIndexes(), LearnerProgress.syncIndexes()]);
    clerk.users.clear();
    clerk.failures.clear();
    clerk.gates.clear();
    clerk.calls = 0;
    clerk.version = 0;
}
async function assertStructure(stale: unknown[]) {
    const rows = await User.find({}).lean<any[]>();
    expect(new Set(rows.map((row) => row.clerkId)).size).toBe(rows.length);
    expect(
        JSON.parse(
            JSON.stringify(
                rows
                    .filter((row) => row.clerkId.startsWith("stale_"))
                    .sort((a, b) => a.clerkId.localeCompare(b.clerkId)),
            ),
        ),
    ).toEqual(stale);
}

beforeEach(async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    await freshDatabase();
});
afterEach(() => {
    vi.restoreAllMocks();
});

describe("seeded identity model", () => {
    // 60 random scenarios keep `npm test` quick; IDENTITY_FUZZ_RUNS=300 (or
    // more) for a deep run. A failure prints its seed: IDENTITY_FUZZ_SEED
    // replays exactly that scenario
    it(
        "checks fresh-database scenarios, including four fixed boundary seeds",
        {
            timeout: 3_600_000,
        },
        async () => {
            const defaultSeeds = [
                0,
                1,
                0xdeadbeef,
                0xffffffff,
                ...Array.from(
                    { length: Number(process.env.IDENTITY_FUZZ_RUNS ?? 60) },
                    (_, index) => Math.imul(index + 1, 0x9e3779b1) >>> 0,
                ),
            ];
            const seeds =
                process.env.IDENTITY_FUZZ_SEED === undefined
                    ? defaultSeeds
                    : [Number(process.env.IDENTITY_FUZZ_SEED) >>> 0];
            const failures: { seed: number; steps: string[]; error: string }[] =
                [];
            const stats = {
                scenarios: 0,
                steps: 0,
                visits: 0,
                deliveries: 0,
                outages: 0,
                drops: 0,
                recreations: 0,
            };
            const start = performance.now();
            for (const seed of seeds) {
                await freshDatabase();
                const random = rng(seed);
                const steps: string[] = [];
                const pending: Event[] = [];
                const replayAtEnd: Event[] = [];
                const seen = new Set<string>();
                const deletedDelivered = new Set<string>();
                let nextId = 0;
                const create = (
                    email?: string | null,
                    username?: string | null,
                ) => {
                    const profile = user(
                        `user_${seed}_${nextId++}`,
                        email,
                        username,
                    );
                    const evt = event("user.created", profile);
                    pending.push(evt);
                    // Reserve a real old created-event retry for the final drain.
                    // This ensures dropped updates can still be reconciled from
                    // Clerk; no invented latest-profile event is injected at end.
                    replayAtEnd.push(evt);
                    steps.push(
                        `create ${profile.id} ${JSON.stringify(expectedProfile(profile))}`,
                    );
                    return profile;
                };
                const send = async (evt: Event) => {
                    stats.deliveries++;
                    const id = evt.data.id as string;
                    seen.add(id);
                    const response = await deliver(evt);
                    expect(response.status).toBe(200);
                    if (evt.type === "user.deleted") deletedDelivered.add(id);
                    const body = await response.json();
                    if (body.user) expect(body.user.clerkId).toBe(id);
                };
                const visits = async (ids: string[], count: number) => {
                    await Promise.all(
                        ids.flatMap((id) =>
                            Array.from({ length: count }, async () => {
                                seen.add(id);
                                stats.visits++;
                                if (clerk.users.has(id))
                                    expect((await visit(id)).clerkId).toBe(id);
                                else if (deletedDelivered.has(id))
                                    await expect(visit(id)).rejects.toThrow(
                                        "Not authenticated",
                                    );
                                else {
                                    // A session may precede deletion delivery. An existing
                                    // row fast-path is allowed here; a 404 is also valid.
                                    try {
                                        expect((await visit(id)).clerkId).toBe(
                                            id,
                                        );
                                    } catch (error) {
                                        expect((error as Error).message).toBe(
                                            "Not authenticated",
                                        );
                                    }
                                }
                            }),
                        ),
                    );
                };
                try {
                    for (let index = 0; index < 3; index++) {
                        await User.create({
                            clerkId: `stale_${index}`,
                            email: "shared@example.test",
                            username: "shared",
                            firstName: index
                                ? "dev instance"
                                : "deleted account",
                        });
                    }
                    const stale = JSON.parse(
                        JSON.stringify(
                            await User.find({ clerkId: /^stale_/ })
                                .sort({ clerkId: 1 })
                                .lean(),
                        ),
                    );
                    for (let index = 0; index < 3 + random(3); index++)
                        create();
                    // Include real progress even for accounts deleted before their
                    // first successful row creation.
                    for (const id of clerk.users.keys())
                        await LearnerProgress.create({
                            clerkId: id,
                            lessons: { sample: { completed: true } },
                        });
                    for (let step = 0; step < 28; step++) {
                        stats.steps++;
                        const live = [...clerk.users.values()];
                        const profile = live[random(live.length)];
                        const choice = random(9);
                        if (choice === 0 || !profile) create();
                        else if (choice === 1) {
                            const changed = user(
                                profile.id,
                                [
                                    null,
                                    "shared@example.test",
                                    "other@example.test",
                                ][random(3)],
                                [null, "shared", "other"][random(3)],
                            );
                            steps.push(
                                `change ${profile.id} ${JSON.stringify(expectedProfile(changed))}`,
                            );
                            pending.push(event("user.updated", changed));
                        } else if (choice === 2) {
                            clerk.users.delete(profile.id);
                            steps.push(`delete Clerk ${profile.id}`);
                            pending.push({
                                type: "user.deleted",
                                data: { id: profile.id, deleted: true },
                            });
                            if (random(2)) {
                                create(
                                    profile.emailAddresses[0]?.emailAddress,
                                    profile.username,
                                );
                                stats.recreations++;
                            }
                        } else if (choice === 3 && pending.length) {
                            const index = random(pending.length);
                            const [evt] = pending.splice(index, 1);
                            steps.push(`deliver ${evt.type} ${evt.data.id}`);
                            await send(evt);
                            if (random(2)) {
                                steps.push("duplicate previous delivery");
                                await send(evt);
                            }
                        } else if (choice === 4 && pending.length) {
                            const [evt] = pending.splice(
                                random(pending.length),
                                1,
                            );
                            steps.push(`drop ${evt.type} ${evt.data.id}`);
                            stats.drops++;
                        } else if (choice === 5) {
                            const ids = live
                                .slice(0, 1 + random(live.length))
                                .map((entry) => entry.id);
                            steps.push(`concurrent visits ${ids.join(",")}`);
                            await visits(ids, 2 + random(7));
                        } else if (choice === 6) {
                            steps.push(
                                `Clerk outage ${profile.id}: signed webhook fails, visit succeeds, retry succeeds`,
                            );
                            stats.outages++;
                            clerk.failures.add(profile.id);
                            const evt = event("user.updated", profile);
                            await expect(deliver(evt)).rejects.toThrow(
                                "Synthetic Clerk outage",
                            );
                            await visits([profile.id], 3);
                            clerk.failures.delete(profile.id);
                            await send(evt);
                        } else {
                            const id =
                                [...seen][random(seen.size)] ?? profile.id;
                            steps.push(`visit ${id}`);
                            await visits([id], 1);
                        }
                        await assertStructure(stale);
                        for (const id of deletedDelivered) {
                            expect(
                                await User.countDocuments({ clerkId: id }),
                            ).toBe(0);
                            expect(
                                await LearnerProgress.countDocuments({
                                    clerkId: id,
                                }),
                            ).toBe(0);
                        }
                    }
                    // Randomized final delivery order, with deliberately old
                    // payloads and actual retries of the original created events.
                    pending.push(...replayAtEnd);
                    while (pending.length) {
                        const [evt] = pending.splice(random(pending.length), 1);
                        steps.push(`drain ${evt.type} ${evt.data.id}`);
                        await send(evt);
                        await assertStructure(stale);
                    }
                    for (const id of seen) {
                        const profile = clerk.users.get(id);
                        if (profile) {
                            const rows = await User.find({ clerkId: id }).lean<
                                any[]
                            >();
                            expect(rows).toHaveLength(1);
                            const actual = {
                                email: rows[0].email,
                                username: rows[0].username,
                            };
                            const expected = expectedProfile(profile);
                            if (
                                JSON.stringify(actual) !==
                                JSON.stringify(expected)
                            ) {
                                throw new Error(
                                    `PROFILE ${id}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
                                );
                            }
                        } else if (deletedDelivered.has(id)) {
                            expect(
                                await User.countDocuments({ clerkId: id }),
                            ).toBe(0);
                            expect(
                                await LearnerProgress.countDocuments({
                                    clerkId: id,
                                }),
                            ).toBe(0);
                        }
                    }
                } catch (error) {
                    failures.push({
                        seed,
                        steps,
                        error: (error as Error).message,
                    });
                }
                stats.scenarios++;
                if (stats.scenarios % 50 === 0) {
                    process.stdout.write(
                        `IDENTITY_FUZZ_PROGRESS ${stats.scenarios}/${seeds.length}\n`,
                    );
                }
            }
            const summary = {
                ...stats,
                failedScenarios: failures.length,
                failedSeeds: failures.map((failure) => failure.seed),
                wallMs: Math.round(performance.now() - start),
            };
            process.stdout.write(`IDENTITY_FUZZ ${JSON.stringify(summary)}\n`);
            // Finish every seed, then print bounded, fully replayable failure traces.
            expect(
                failures.length,
                JSON.stringify(failures.slice(0, 3), null, 2),
            ).toBe(0);
        },
    );

    it("loads 100 colliding new identities with 10 simultaneous first visits each", async () => {
        const ids = Array.from(
            { length: 100 },
            (_, index) => user(`user_load_${index}`).id,
        );
        const start = performance.now();
        const results = await Promise.all(
            ids.flatMap((id) =>
                Array.from({ length: 10 }, async () => ({
                    id,
                    row: await visit(id),
                })),
            ),
        );
        const elapsed = performance.now() - start;
        for (const id of ids) {
            const own = results.filter((result) => result.id === id);
            expect(own.every((result) => result.row.clerkId === id)).toBe(true);
            expect(new Set(own.map((result) => result.row._id)).size).toBe(1);
            expect(await User.countDocuments({ clerkId: id })).toBe(1);
        }
        expect(await User.countDocuments()).toBe(100);
        process.stdout.write(
            `IDENTITY_LOAD ${JSON.stringify({ identities: 100, concurrentVisits: 1000, wallMs: Math.round(elapsed), clerkCalls: clerk.calls })}\n`,
        );
    });
});

describe("minimal deterministic interleavings (seed 1)", () => {
    it("removes a previously stored email when Clerk removes its last email", async () => {
        const original = user("user_remove_email");
        expect((await deliver(event("user.created", original))).status).toBe(
            200,
        );
        const changed = user(original.id, null);
        expect((await deliver(event("user.updated", changed))).status).toBe(
            200,
        );
        expect(
            (await User.findOne({ clerkId: original.id }).lean<any>()).email,
        ).toBeUndefined();
    });

    for (const path of ["ensureUser", "webhook"] as const) {
        it(`does not resurrect a deleted user when an in-flight ${path} fetched before deletion`, async () => {
            const profile = user(`user_delete_race_${path}`);
            await LearnerProgress.create({
                clerkId: profile.id,
                lessons: { sample: true },
            });
            const gate = holdNextFetch(profile.id);
            const inFlight =
                path === "ensureUser"
                    ? visit(profile.id)
                    : deliver(event("user.created", profile));
            await gate.reached;
            try {
                clerk.users.delete(profile.id);
                expect(
                    (
                        await deliver({
                            type: "user.deleted",
                            data: { id: profile.id, deleted: true },
                        })
                    ).status,
                ).toBe(200);
            } finally {
                gate.release();
            }
            const [result] = await Promise.allSettled([inFlight]);
            if (path === "webhook") {
                expect(result.status).toBe("fulfilled");
                if (result.status === "fulfilled")
                    expect(result.value.status).toBe(200);
            } else if (result.status === "rejected") {
                expect(result.reason.message).toBe("Not authenticated");
            }
            expect(
                await LearnerProgress.countDocuments({ clerkId: profile.id }),
            ).toBe(0);
            expect(await User.countDocuments({ clerkId: profile.id })).toBe(0);
        });
    }

    it("does not overwrite a newer webhook profile with an older in-flight fetch", async () => {
        const old = user("user_profile_race", "old@example.test", "old");
        const gate = holdNextFetch(old.id);
        const slow = deliver(event("user.created", old));
        await gate.reached;
        try {
            const current = user(old.id, "new@example.test", "new");
            expect((await deliver(event("user.updated", current))).status).toBe(
                200,
            );
        } finally {
            gate.release();
        }
        expect((await slow).status).toBe(200);
        expect(await User.findOne({ clerkId: old.id }).lean()).toMatchObject({
            email: "new@example.test",
            username: "new",
        });
    });

    it("does not resurrect a previously deleted identity during a later Clerk outage", async () => {
        const profile = user("user_deleted_outage");
        await visit(profile.id);
        clerk.users.delete(profile.id);
        await deliver({
            type: "user.deleted",
            data: { id: profile.id, deleted: true },
        });
        clerk.failures.add(profile.id);
        await Promise.allSettled([visit(profile.id)]);
        expect(await User.countDocuments({ clerkId: profile.id })).toBe(0);
    });
});

// A visit to an existing, filled-in row deliberately doesn't ask Clerk (it's
// every page load), so a profile change whose every webhook retry was lost
// stays stale until the next one: Svix retries for days. A bare row from a
// Clerk outage is the exception, and fills itself in
describe("convergence when every useful webhook is dropped (seed 1)", () => {
    it("repairs a bare first-visit outage row on a later healthy visit", async () => {
        const profile = user("user_outage_no_webhook");
        clerk.failures.add(profile.id);
        expect((await visit(profile.id)).clerkId).toBe(profile.id);
        clerk.failures.delete(profile.id);
        expect(await visit(profile.id)).toMatchObject(expectedProfile(profile));
    });
});
