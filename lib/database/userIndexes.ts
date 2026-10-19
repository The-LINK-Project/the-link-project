import type mongoose from "mongoose";

// The users collection once had unique email and username indexes. Clerk ID is
// the only identity now (see user.model.ts), but mongoose never drops an
// index on its own, and an old branch run against this database would build
// them again. Any one of them back means stale rows block sign-ins again.

const STALE_UNIQUE_FIELDS = ["email", "username"];

export async function dropUserUniqueIndexes(
    users: mongoose.mongo.Collection,
    { apply }: { apply: boolean },
) {
    const dropped: string[] = [];

    // listIndexes fails on a collection that doesn't exist yet: nothing to drop
    const indexes = await users.indexes().catch(() => []);

    for (const index of indexes) {
        const fields = Object.keys(index.key);
        const isStale =
            index.unique &&
            fields.length === 1 &&
            STALE_UNIQUE_FIELDS.includes(fields[0]);

        if (!isStale || !index.name) continue;

        if (apply) await users.dropIndex(index.name);
        dropped.push(index.name);
    }

    return dropped;
}
