"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import QuizResult from "@/lib/database/models/quizResult.model";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import { ensureUser } from "./user.actions";

// submitting and sending over the quiz results to mongodb
export async function saveQuizResult(formData: FormData) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        const lessonId = parseInt(formData.get("lessonId") as string);
        const score = parseInt(formData.get("score") as string);
        const answersJson = formData.get("answers") as string;
        const answers = JSON.parse(answersJson);

        if (!lessonId || isNaN(score) || !answers) {
            throw new Error("Missing required fields");
        }

        if (isNaN(score) || score < 0 || score > 100) {
            throw new Error("Score must be a number between 0 and 100");
        }

        const result = await QuizResult.create({
            userId: userId,
            lessonId: lessonId,
            score,
            answers,
        });

        console.log(result);

        // here I am adding the quiz result to the lesson progress
        const lessonProgress = await LessonProgress.findOneAndUpdate(
            { userId: userId, lessonIndex: lessonId },
            { $push: { quizResult: result._id } },
        );

        revalidatePath("/quiz/results");
        return {
            success: true,
            id: result._id.toString(),
            score: result.score,
            message: "Quiz result saved successfully",
        };
    } catch (error) {
        console.error("Error saving quiz result:", error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}

export async function getUserResults() {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        // Ensure Quiz model is registered before populate
        if (!mongoose.models.Quiz) {
            require("@/lib/database/models/quiz.model");
        }

        const results = await QuizResult.find({ userId: userId }).sort({
            completedAt: -1,
        });

        const serializedResults = results.map((result) => {
            const plainResult = result.toObject();
            return {
                ...plainResult,
                _id: plainResult._id.toString(),
                userId: plainResult.userId.toString(),
                lessonId: plainResult.lessonId,
                createdAt: plainResult.createdAt
                    ? plainResult.createdAt.toISOString()
                    : undefined,
                updatedAt: plainResult.updatedAt
                    ? plainResult.updatedAt.toISOString()
                    : undefined,
                completedAt: plainResult.completedAt
                    ? plainResult.completedAt.toISOString()
                    : undefined,
            };
        });

        return serializedResults;
    } catch (error) {
        console.error("Error fetching user results:", error);
        throw error;
    }
}
