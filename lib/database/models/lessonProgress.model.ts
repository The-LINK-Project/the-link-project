// lessonProgress -> userId, lessonIndex, objectivesMet: [true, false, false, true], convoHistory: [{role, message}]
import { Schema, model, models } from "mongoose"; 

const LessonProgressSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: false },
    lessonIndex: {type: Number, required: true, unique: false },
    objectivesMet: {type: [Boolean], required: true, unique: false },
    convoHistory: {type: [{role: { type: String, required: true },message: { type: String, required: true }}],required: true, unique: false }
})

const LessonProgress = models.LessonProgress || model ("LessonsProgress", LessonProgressSchema);

export default LessonProgress


