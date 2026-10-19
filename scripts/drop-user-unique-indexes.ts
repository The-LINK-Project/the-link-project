import { config } from "dotenv";
import mongoose from "mongoose";

// Load .env.local before reading process.env
config({ path: ".env.local" });
config();

// Drops the unique email and username indexes from the users collection.
// user.model.ts no longer declares them (clerkId is the only identity, see the
// note there), but mongoose never drops an index on its own, so the live
// database keeps enforcing them until this runs.
//
// Run it AFTER the schema change is deployed. Until then every cold start of
// the old code asks mongoose to build the indexes again, and it would.
//
// DRY RUN by default: prints what it would drop. Run with --apply to drop.

const STALE_UNIQUE_FIELDS = ["email", "username"];

export async function dropUserUniqueIndexes(
    users: mongoose.mongo.Collection,
    { apply }: { apply: boolean },
) {
    const dropped: string[] = [];

    for (const index of await users.indexes()) {
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

async function run() {
    const apply = process.argv.includes("--apply");

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing");

    // Same dbName the app uses in lib/database/index.ts
    await mongoose.connect(uri, { dbName: "Users" });
    const users = mongoose.connection.db!.collection("users");

    const dropped = await dropUserUniqueIndexes(users, { apply });

    if (dropped.length === 0) {
        console.log("No unique email/username indexes left. Nothing to do.");
    } else if (apply) {
        console.log(`Dropped: ${dropped.join(", ")}`);
    } else {
        console.log(
            `Would drop: ${dropped.join(", ")}\nDry run — nothing written. Re-run with \`npm run migration:drop-user-unique-indexes -- --apply\` to drop them.`,
        );
    }

    console.log(JSON.stringify(await users.indexes()));
    await mongoose.disconnect();
}

if (process.argv[1]?.endsWith("drop-user-unique-indexes.ts")) {
    run()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error("Dropping indexes failed:", error);
            process.exit(1);
        });
}
