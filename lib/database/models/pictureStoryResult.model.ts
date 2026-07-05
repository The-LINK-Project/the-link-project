import mongoose from "mongoose";

const pictureStoryResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        setId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PictureStorySet",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        totalQuestions: {
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
        collection: "picturestoryresults",
    },
);

const PictureStoryResult =
    mongoose.models.PictureStoryResult ||
    mongoose.model("PictureStoryResult", pictureStoryResultSchema);

export default PictureStoryResult;
