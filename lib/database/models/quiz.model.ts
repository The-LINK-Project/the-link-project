import { Schema, model, models } from "mongoose"; 

const questionSchema = new Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
});

const quizSchema = new Schema({
    lessonId: {
        type: Number,
        required: true,
    },
    title: { type: String, required: true },
    questions: [questionSchema],
}, {
    timestamps: true
});

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;