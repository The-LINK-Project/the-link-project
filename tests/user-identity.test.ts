import { beforeEach, describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";
import { Webhook } from "svix";

// Every way a signed-in person has ever landed on "Something went wrong" from
// their user row: a stale row holding their email or username, a webhook that
// arrived out of order or twice, a sign-up without an email, a Clerk outage,
// two first requests at once. Runs against a real mongod (tests/setup.ts).

// ---- Clerk, faked at the module boundary --------------------------------

type FakeClerkUser = {
    id: string;
    emailAddresses: { id: string; emailAddress: string }[];
    primaryEmailAddressId: string | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
};

const clerk = vi.hoisted(() => ({
    signedInAs: null as string | null,
    users: new Map<string, unknown>(),
    getUserFails: false,
}));

vi.mock("@clerk/nextjs/server", () => ({
    auth: async () => ({ userId: clerk.signedInAs }),
    currentUser: async () => null,
    clerkClient: async () => ({
        users: {
            getUser: async (id: string) => {
                if (clerk.getUserFails) throw new Error("Clerk API is down");
                const user = clerk.users.get(id);
                if (!user) {
                    throw Object.assign(new Error("Not Found"), {
                        clerkError: true,
                        status: 404,
                        errors: [],
                    });
                }
                return user;
            },
        },
    }),
}));

const request = vi.hoisted(() => ({ headers: new Headers() }));
vi.mock("next/headers", () => ({ headers: async () => request.headers }));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

const { ensureUser } = await import("@/lib/actions/user.actions");
const { deleteUser } = await import("@/lib/userSync");
const { POST: clerkWebhook } = await import("@/app/api/webhook/clerk/route");
const { default: User } = await import("@/lib/database/models/user.model");
const { default: LearnerProgress } = await import(
    "@/lib/database/models/learnerProgress.model"
);
const { connectToDatabase } = await import("@/lib/database");
const { dropUserUniqueIndexes } = await import("@/lib/database/userIndexes");

function clerkUser(
    id: string,
    { email, username }: { email?: string; username?: string } = {},
): FakeClerkUser {
    const user = {
        id,
        emailAddresses: email ? [{ id: `idn_${id}`, emailAddress: email }] : [],
        primaryEmailAddressId: email ? `idn_${id}` : null,
        username: username ?? null,
        firstName: "Adrish",
        lastName: "Majumder",
        imageUrl: `https://img.clerk.com/${id}`,
    };
    clerk.users.set(id, user);
    return user;
}

function signIn(user: FakeClerkUser) {
    clerk.signedInAs = user.id;
}

// The webhook as Clerk sends it: snake_case, signed by svix
async function deliver(type: string, data: Record<string, unknown>) {
    const body = JSON.stringify({ type, data, object: "event" });
    const id = `msg_${Math.random().toString(36).slice(2)}`;
    const timestamp = new Date();
    const signature = new Webhook(process.env.WEBHOOK_SECRET!).sign(
        id,
        timestamp,
        body,
    );
    request.headers = new Headers({
        "svix-id": id,
        "svix-timestamp": String(Math.floor(timestamp.getTime() / 1000)),
        "svix-signature": signature,
    });
    return clerkWebhook(
        new Request("http://localhost/api/webhook/clerk", {
            method: "POST",
            body,
        }),
    );
}

function webhookPayload(user: FakeClerkUser) {
    return {
        id: user.id,
        email_addresses: user.emailAddresses.map((entry) => ({
            id: entry.id,
            email_address: entry.emailAddress,
        })),
        primary_email_address_id: user.primaryEmailAddressId,
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        image_url: user.imageUrl,
    };
}

// A row whose Clerk account no longer exists here: deleted from the app or
// the dashboard, or made by the dev Clerk instance, which shares this database
async function staleRow(email: string, username: string) {
    await connectToDatabase();
    return User.create({ clerkId: "user_GONE", email, username });
}

// The indexes the live database had before this fix
async function addLegacyUniqueIndexes() {
    await connectToDatabase();
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ username: 1 }, { unique: true });
}

beforeEach(async () => {
    clerk.signedInAs = null;
    clerk.users.clear();
    clerk.getUserFails = false;
    await connectToDatabase();
    await User.syncIndexes();
});

// ---- The schema ----------------------------------------------------------

describe("User schema", () => {
    it("has clerkId as its only unique key", () => {
        const uniqueFields = Object.entries(User.schema.paths)
            .filter(([, path]: [string, any]) => path.options?.unique)
            .map(([name]) => name);
        const uniqueIndexKeys = User.schema
            .indexes()
            .filter(([, options]: [unknown, any]) => options?.unique)
            .map(([fields]: [Record<string, unknown>, unknown]) =>
                Object.keys(fields),
            );

        expect(uniqueFields).toEqual(["clerkId"]);
        expect(uniqueIndexKeys).toEqual([["clerkId"]]);
    });
});

// ---- ensureUser: every signed-in page and action -------------------------

describe("ensureUser", () => {
    it("creates the row on a first visit and reuses it after", async () => {
        signIn(clerkUser("user_A", { email: "a@x.com", username: "a" }));

        const first = await ensureUser();
        const second = await ensureUser();

        expect(second._id).toBe(first._id);
        expect(first).toMatchObject({
            clerkId: "user_A",
            email: "a@x.com",
            username: "a",
            firstName: "Adrish",
        });
        expect(await User.countDocuments()).toBe(1);
    });

    it("isn't blocked by a stale row with the same email and username", async () => {
        // The production bug: majum137859@… had a dev-instance row, so the
        // prod account's insert failed with E11000 on every visit
        const stale = await staleRow("school@x.com", "adrishschool");
        signIn(
            clerkUser("user_PROD", {
                email: "school@x.com",
                username: "adrishschool",
            }),
        );

        const user = await ensureUser();

        expect(user.clerkId).toBe("user_PROD");
        expect(user._id).not.toBe(stale._id.toString());
        // The other row is left alone: it may still be someone's
        const untouched = await User.findById(stale._id).lean<any>();
        expect(untouched.clerkId).toBe("user_GONE");
    });

    it("fails on the old indexes, and works once the migration drops them", async () => {
        await addLegacyUniqueIndexes();
        await staleRow("school@x.com", "adrishschool");
        signIn(clerkUser("user_PROD", { email: "school@x.com" }));

        await expect(ensureUser()).rejects.toMatchObject({ code: 11000 });

        const dropped = await dropUserUniqueIndexes(User.collection as any, {
            apply: true,
        });

        expect(dropped.sort()).toEqual(["email_1", "username_1"]);
        await expect(ensureUser()).resolves.toMatchObject({
            clerkId: "user_PROD",
        });
    });

    it("lets someone who deleted their account sign up again with the same email", async () => {
        signIn(clerkUser("user_OLD", { email: "me@x.com", username: "me" }));
        await ensureUser();

        // Webhook delivered: the old row is gone
        await deleteUser("user_OLD");
        signIn(clerkUser("user_NEW", { email: "me@x.com", username: "me" }));
        await expect(ensureUser()).resolves.toMatchObject({
            clerkId: "user_NEW",
        });

        // Webhook never delivered: the old row is still there
        signIn(clerkUser("user_NEWER", { email: "me@x.com", username: "me" }));
        await expect(ensureUser()).resolves.toMatchObject({
            clerkId: "user_NEWER",
        });
    });

    it("handles a sign-up with no email and no username", async () => {
        signIn(clerkUser("user_PHONE123456"));

        const user = await ensureUser();

        expect(user.clerkId).toBe("user_PHONE123456");
        expect(user.email).toBeUndefined();
        expect(user.username).toBe("user-123456");
    });

    it("still works when the Clerk API is down", async () => {
        signIn(clerkUser("user_A", { email: "a@x.com" }));
        clerk.getUserFails = true;
        vi.spyOn(console, "error").mockImplementationOnce(() => {});

        const user = await ensureUser();

        expect(user.clerkId).toBe("user_A");
        expect(await User.countDocuments()).toBe(1);
    });

    it("makes exactly one row when many first requests arrive at once", async () => {
        signIn(clerkUser("user_A", { email: "a@x.com" }));

        const users = await Promise.all(
            Array.from({ length: 20 }, () => ensureUser()),
        );

        expect(new Set(users.map((user) => user._id)).size).toBe(1);
        expect(await User.countDocuments({ clerkId: "user_A" })).toBe(1);
    });

    it("won't bring back a user deleted in Clerk whose session is still live", async () => {
        signIn(clerkUser("user_A", { email: "a@x.com" }));
        clerk.users.delete("user_A");

        await expect(ensureUser()).rejects.toThrow("Not authenticated");
        expect(await User.countDocuments()).toBe(0);
    });

    it("refuses a signed-out caller", async () => {
        await expect(ensureUser()).rejects.toThrow("Not authenticated");
    });
});

// ---- The Clerk webhook ---------------------------------------------------

describe("Clerk webhook", () => {
    it("creates the row, and a repeated delivery changes nothing", async () => {
        const user = clerkUser("user_A", { email: "a@x.com", username: "a" });

        const first = await deliver("user.created", webhookPayload(user));
        const again = await deliver("user.created", webhookPayload(user));

        expect(first.status).toBe(200);
        expect(again.status).toBe(200);
        expect(await User.countDocuments()).toBe(1);
    });

    it("joins the row a first visit already made", async () => {
        const user = clerkUser("user_A", { email: "a@x.com", username: "a" });
        signIn(user);
        const made = await ensureUser();

        const response = await deliver("user.created", webhookPayload(user));

        expect(response.status).toBe(200);
        expect((await response.json()).user._id).toBe(made._id);
        expect(await User.countDocuments()).toBe(1);
    });

    it("never hands back another account's row for a shared email", async () => {
        // The old createUser matched by email on E11000 and returned this row
        const stale = await staleRow("a@x.com", "a");
        const user = clerkUser("user_A", { email: "a@x.com", username: "a" });

        const response = await deliver("user.created", webhookPayload(user));
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.user.clerkId).toBe("user_A");
        expect(body.user._id).not.toBe(stale._id.toString());
    });

    it("accepts user.updated before user.created", async () => {
        const user = clerkUser("user_A", { email: "a@x.com" });

        const updated = await deliver("user.updated", webhookPayload(user));
        const created = await deliver("user.created", webhookPayload(user));

        expect(updated.status).toBe(200);
        expect(created.status).toBe(200);
        expect(await User.countDocuments()).toBe(1);
    });

    it("keeps the row in step with an email or username change", async () => {
        const user = clerkUser("user_A", {
            email: "old@x.com",
            username: "old",
        });
        await deliver("user.created", webhookPayload(user));

        const changed = clerkUser("user_A", {
            email: "new@x.com",
            username: "new",
        });
        await deliver("user.updated", webhookPayload(changed));

        const row = await User.findOne({ clerkId: "user_A" }).lean<any>();
        expect(row).toMatchObject({ email: "new@x.com", username: "new" });
    });

    it("won't bring back a deleted user from a late user.updated", async () => {
        const user = clerkUser("user_A", { email: "a@x.com" });
        await deliver("user.created", webhookPayload(user));

        clerk.users.delete("user_A");
        await deliver("user.deleted", { id: "user_A", deleted: true });
        const late = await deliver("user.updated", webhookPayload(user));

        expect(late.status).toBe(200);
        expect(await User.countDocuments()).toBe(0);
    });

    it("writes Clerk's current profile, not a stale payload", async () => {
        const old = clerkUser("user_A", {
            email: "old@x.com",
            username: "old",
        });
        clerkUser("user_A", { email: "new@x.com", username: "new" });

        // An old event retried after the change
        await deliver("user.updated", webhookPayload(old));

        const row = await User.findOne({ clerkId: "user_A" }).lean<any>();
        expect(row).toMatchObject({ email: "new@x.com", username: "new" });
    });

    it("asks Clerk to retry when Clerk can't be reached", async () => {
        const user = clerkUser("user_A", { email: "a@x.com" });
        clerk.getUserFails = true;

        await expect(
            deliver("user.created", webhookPayload(user)),
        ).rejects.toThrow();
        expect(await User.countDocuments()).toBe(0);
    });

    it("creates a row for a sign-up with no email", async () => {
        const user = clerkUser("user_PHONE123456");

        const response = await deliver("user.created", webhookPayload(user));

        expect(response.status).toBe(200);
        expect(await User.countDocuments({ clerkId: "user_PHONE123456" })).toBe(
            1,
        );
    });

    it("deletes the user's data, and a repeated delivery still succeeds", async () => {
        const user = clerkUser("user_A", { email: "a@x.com" });
        signIn(user);
        await ensureUser();
        await LearnerProgress.create({ clerkId: "user_A", lessons: {} });

        const first = await deliver("user.deleted", {
            id: "user_A",
            deleted: true,
        });
        const again = await deliver("user.deleted", {
            id: "user_A",
            deleted: true,
        });

        expect(first.status).toBe(200);
        expect(again.status).toBe(200);
        expect(await User.countDocuments()).toBe(0);
        expect(await LearnerProgress.countDocuments()).toBe(0);
    });

    it("rejects a forged request", async () => {
        const response = await clerkWebhook(
            new Request("http://localhost/api/webhook/clerk", {
                method: "POST",
                body: JSON.stringify({
                    type: "user.deleted",
                    data: { id: "user_A" },
                }),
            }),
        );
        expect(response.status).toBe(400);
    });
});

// ---- The migration -------------------------------------------------------

describe("drop-user-unique-indexes migration", () => {
    it("runs by itself on every cold start", async () => {
        await addLegacyUniqueIndexes();
        // A cold start: the app's connection cache is empty
        Object.assign((global as any).mongoose, { conn: null, promise: null });
        const logged = vi.spyOn(console, "log").mockImplementation(() => {});

        await connectToDatabase();

        const names = (await User.collection.indexes()).map(
            (index) => index.name,
        );
        expect(names).not.toContain("email_1");
        expect(names).not.toContain("username_1");
        expect(names).toContain("clerkId_1");
        expect(logged).toHaveBeenCalledWith(
            "Dropped stale user indexes: email_1,username_1",
        );
    });

    it("drops only the stale unique indexes, and only with --apply", async () => {
        await addLegacyUniqueIndexes();
        const users = mongoose.connection.db!.collection("users");

        const planned = await dropUserUniqueIndexes(users, { apply: false });
        expect(planned.sort()).toEqual(["email_1", "username_1"]);
        expect((await users.indexes()).map((index) => index.name)).toContain(
            "email_1",
        );

        await dropUserUniqueIndexes(users, { apply: true });
        const names = (await users.indexes()).map((index) => index.name);
        expect(names).not.toContain("email_1");
        expect(names).not.toContain("username_1");
        expect(names).toContain("clerkId_1");
    });
});
