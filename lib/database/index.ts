import mongoose from "mongoose";

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
            .then((conn) => {
                console.log("Connected to database");
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
