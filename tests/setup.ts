import { afterAll, afterEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

// A real mongod per test file, so unique indexes, upserts and E11000 races
// behave exactly like Atlas — mocks would hide the very bugs these tests are
// for. Set before any app module reads MONGODB_URI.
const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
process.env.MONGODB_URI = mongo.getUri();
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
