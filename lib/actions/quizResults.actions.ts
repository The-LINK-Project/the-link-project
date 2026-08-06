"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import QuizResult from "@/lib/database/models/quizResult.model";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import Quiz from "@/lib/database/models/quiz.model";
import { ensureUser } from "./user.actions";

const PASSING_SCORE = 80;

// Grades the submitted answers server-side against the quiz stored in the
// database. The browser never sees the answer key and never sends a score —
// a forged request can't mark a lesson complete.
export async function submitQuiz({
    lessonId,
    answers,
}: {
    lessonId: number;
    answers: number[];
}) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        if (
            !Number.isInteger(lessonId) ||
            !Array.isArray(answers) ||
            answers.some((answer) => !Number.isInteger(answer))
        ) {
            throw new Error("Missing required fields");
        }

        const quiz = await Quiz.findOne({ lessonId: lessonId }).lean<{
            questions: Question[];
        }>();

        if (!quiz || quiz.questions.length === 0) {
            throw new Error("Quiz not found for this lesson");
        }

        if (answers.length !== quiz.questions.length) {
            throw new Error("Answer every question before submitting");
        }

        const correctCount = quiz.questions.reduce(
            (count, question, index) =>
                count + (answers[index] === question.correctAnswerIndex ? 1 : 0),
            0,
        );
        const score = Math.round((correctCount / quiz.questions.length) * 100);

        const result = await QuizResult.create({
            userId: userId,
            lessonId: lessonId,
            score,
            answers,
        });

        // add quiz result to lesson progress and mark completed if score >= 80
        const lessonProgress = await LessonProgress.findOne({
            userId: userId,
            lessonIndex: lessonId,
        });
        const updatePayload: {
            $push: { quizResult: mongoose.Types.ObjectId };
            $set?: { completed: boolean };
        } = {
            $push: { quizResult: result._id },
        };

        if (score >= PASSING_SCORE) {
            updatePayload.$set = {
                completed: true,
            };
        }

        if (lessonProgress) {
            await LessonProgress.findOneAndUpdate(
                { userId: userId, lessonIndex: lessonId },
                updatePayload,
            );
        }

        revalidatePath("/quiz/results");
        return {
            success: true as const,
            id: result._id.toString(),
            score,
            correctCount,
            totalQuestions: quiz.questions.length,
            message: "Quiz result saved successfully",
        };
    } catch (error) {
        console.error("Error saving quiz result:", error);
        return {
            success: false as const,
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
