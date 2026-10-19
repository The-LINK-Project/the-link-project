import mongoose from "mongoose";
import { dropUserUniqueIndexes } from "./userIndexes";

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection on the global object so it survives module re-evaluation
// (Turbopack HMR, separate RSC / server-action module graphs).
if (!(global as any).mongoose) {
    (global as any).mongoose = { conn: null, promise: null };
}
const cached = (global as any).mongoose;

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn; // return cached connection if it exists
    }

    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    // connect to cached connection OR create a new connection
    cached.promise =
        cached.promise ||
        mongoose
            .connect(MONGODB_URI, {
                dbName: "Users",
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 10000,
                // bufferCommands: false,
            })
            .then(async (conn) => {
                console.log("Connected to database");

                // Once per cold start, so the indexes can't quietly come back.
                // Best effort: a failure here must not take the site down
                try {
                    const dropped = await dropUserUniqueIndexes(
                        conn.connection.db!.collection("users"),
                        { apply: true },
                    );
                    if (dropped.length > 0) {
                        console.log(`Dropped stale user indexes: ${dropped}`);
                    }
                } catch (error) {
                    console.error("Couldn't check user indexes:", error);
                }

                return conn;
            });

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset so a failed connect can be retried on the next call instead
        // of every future request re-awaiting the same rejected promise
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};
