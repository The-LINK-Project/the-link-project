import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null }; // attempt to retrieve cached connection

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn; // return cached connection if it exists
  }

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // connect to cached connection OR create a new connection
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "Users",
      // bufferCommands: false,
    });

  cached.conn = await cached.promise;

  console.log("Connected to database");

  return cached.conn;
};
