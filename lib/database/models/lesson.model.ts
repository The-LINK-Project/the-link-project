import { Schema, model, models } from "mongoose";

const LessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    objectives: {
      type: [String],
      required: true,
    },
    lessonIndex: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = models.Lesson || model("Lesson", LessonSchema);

export default Lesson;
