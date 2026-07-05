import mongoose from "mongoose";

const pictureStoryQuestionSchema = new mongoose.Schema(
    {
        sequence: { type: [String], required: true },
        options: { type: [String], required: true },
        correctAnswerIndex: { type: Number, required: true },
    },
    { _id: false },
);

const pictureStorySetSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        questions: { type: [pictureStoryQuestionSchema], required: true },
    },
    {
        timestamps: true,
    },
);

const PictureStorySet =
    mongoose.models.PictureStorySet ||
    mongoose.model("PictureStorySet", pictureStorySetSchema);

export default PictureStorySet;
