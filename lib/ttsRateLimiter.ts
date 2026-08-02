import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

const ttsRateLimitSchema = new mongoose.Schema({
    // Bucket keys use MongoDB's built-in unique _id index, so correctness does
    // not depend on a separately-created application index.
    _id: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
});

ttsRateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const TtsRateLimit =
    mongoose.models.TtsRateLimit ||
    mongoose.model("TtsRateLimit", ttsRateLimitSchema);

const isDuplicateKeyError = (error: unknown) =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000;

export async function consumeTtsRateLimit(userId: string): Promise<{
    allowed: boolean;
    retryAfterSeconds: number;
}> {
    await connectToDatabase();

    const now = Date.now();
    const bucket = Math.floor(now / WINDOW_MS);
    const windowEnd = (bucket + 1) * WINDOW_MS;
    const bucketId = `${userId}:${bucket}`;
    const retryAfterSeconds = Math.max(
        1,
        Math.ceil((windowEnd - now) / 1000),
    );

    const update = {
        $inc: { count: 1 },
        $setOnInsert: { expiresAt: new Date(windowEnd + WINDOW_MS) },
    };

    let document;
    try {
        document = await TtsRateLimit.findOneAndUpdate(
            { _id: bucketId },
            update,
            { upsert: true, new: true },
        );
    } catch (error) {
        if (!isDuplicateKeyError(error)) throw error;

        // Two first requests can race the upsert. Once one creates the bucket,
        // the loser retries as a plain atomic increment.
        document = await TtsRateLimit.findOneAndUpdate(
            { _id: bucketId },
            { $inc: { count: 1 } },
            { new: true },
        );
    }

    if (!document) {
        throw new Error("Failed to update the TTS rate-limit bucket");
    }

    return {
        allowed: document.count <= MAX_REQUESTS_PER_WINDOW,
        retryAfterSeconds,
    };
}
