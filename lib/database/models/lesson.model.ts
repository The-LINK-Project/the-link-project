import { Schema, model, models } from "mongoose"; 

const LessonSchema = new Schema({
    title: { type: String, required: true, unique: false },
    description: { type: String, required: true, unique: false },
    objectives: { type: [String], required: true, unique: false }
})

const Lesson = models.Lesson || model ("Lesson", LessonSchema);

export default Lesson
