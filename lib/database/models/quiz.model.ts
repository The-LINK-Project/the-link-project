import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  title: { type: String, required: true },
  questions: [questionSchema]
}, {
  timestamps: true,
  collection: 'quizzes'
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;