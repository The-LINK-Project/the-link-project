import mongoose from "mongoose";

const wordMatchResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roundId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WordMatchRound",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        timeMs: {
            type: Number,
            required: true,
        },
        wrongAttempts: {
            type: Number,
            required: true,
        },
        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: "wordmatchresults",
    },
);

const WordMatchResult =
    mongoose.models.WordMatchResult ||
    mongoose.model("WordMatchResult", wordMatchResultSchema);

export default WordMatchResult;
