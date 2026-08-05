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
            validate: {
                // [].every() is true, so a lesson without objectives would be
                // instantly complete for everyone
                validator: (objectives: string[]) => objectives.length > 0,
                message: "A lesson needs at least one objective",
            },
        },
        lessonIndex: {
            type: Number,
            required: true,
            // Duplicate lesson numbers make lookups return an arbitrary copy
            unique: true,
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
    },
);

const Lesson = models.Lesson || model("Lesson", LessonSchema);

export default Lesson;
