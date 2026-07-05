import mongoose from "mongoose";

const tileContentSchema = new mongoose.Schema(
    {
        text: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
    },
    { _id: false },
);

const pairSchema = new mongoose.Schema(
    {
        left: { type: tileContentSchema, required: true },
        right: { type: tileContentSchema, required: true },
    },
    { _id: false },
);

const wordMatchRoundSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        pairs: { type: [pairSchema], required: true },
    },
    {
        timestamps: true,
    },
);

const WordMatchRound =
    mongoose.models.WordMatchRound ||
    mongoose.model("WordMatchRound", wordMatchRoundSchema);

export default WordMatchRound;
