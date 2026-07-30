// lessonProgress -> userId, lessonIndex, objectivesMet: [true, false, false, true], convoHistory: [{role, message}]
import { Schema, model, models } from "mongoose";

const LessonProgressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    lessonIndex: { type: Number, required: true, unique: false },
    objectivesMet: { type: [Boolean], required: true, unique: false },
    completed: { type: Boolean, required: true, default: false },
    convoHistory: {
        type: [
            {
                role: { type: String, required: true },
                message: { type: String, required: true },
                audioURL: { type: String, required: false },
            },
        ],
        required: true,
        unique: false,
    },
    quizResult: {
        type: [{ type: Schema.Types.ObjectId, ref: "QuizResult" }],
        required: false,
        unique: false,
    },
});

LessonProgressSchema.index({ userId: 1, lessonIndex: 1 }, { unique: true });

const LessonProgress =
    models.LessonProgress || model("LessonProgress", LessonProgressSchema);

export default LessonProgress;
