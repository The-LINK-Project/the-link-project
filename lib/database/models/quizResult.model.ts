import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lessonId: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        answers: {
            type: [Number],
            required: true,
        },
        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: "quizresults",
    },
);

quizResultSchema.index({ userId: 1, lessonId: 1, score: 1 });

const QuizResult =
    mongoose.models.QuizResult || mongoose.model("QuizResult", quizResultSchema);
export default QuizResult;
