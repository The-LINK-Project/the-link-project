import { afterAll, afterEach, vi } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

// A real mongod per test file, so unique indexes, upserts and E11000 races
// behave exactly like Atlas — mocks would hide the very bugs these tests are
// for. Set before any app module reads MONGODB_URI.
const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
process.env.MONGODB_URI = mongo.getUri();

// Nothing under test may reach a real database or service: no .env.local, and
// no network at all
vi.mock("dotenv", () => ({ config: () => ({ parsed: {} }) }));
if (
    !/^mongodb:\/\/(127\.0\.0\.1|localhost):\d+\//.test(process.env.MONGODB_URI)
) {
    throw new Error("Tests must run against the local in-memory MongoDB");
}
vi.stubGlobal("fetch", () => {
    throw new Error("Tests may not make network requests");
});
process.env.WEBHOOK_SECRET =
    "whsec_" + Buffer.from("test-webhook-secret").toString("base64");

afterEach(async () => {
    const db = mongoose.connection.db;
    if (!db) return;
    for (const collection of await db.collections()) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    (global as any).mongoose = { conn: null, promise: null };
    await mongo.stop();
});
