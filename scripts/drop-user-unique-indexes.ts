import { config } from "dotenv";
import mongoose from "mongoose";
import { dropUserUniqueIndexes } from "../lib/database/userIndexes";

// Load .env.local before reading process.env
config({ path: ".env.local" });
config();

// Drops the unique email and username indexes from the users collection, the
// same check connectToDatabase runs on every cold start (lib/database/
// userIndexes.ts). The app heals itself; this is for doing it by hand, or for
// checking what's there.
//
// DRY RUN by default: prints what it would drop. Run with --apply to drop.

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

run()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("Dropping indexes failed:", error);
        process.exit(1);
    });
