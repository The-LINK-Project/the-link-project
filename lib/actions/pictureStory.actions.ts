"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import PictureStorySet from "@/lib/database/models/pictureStorySet.model";
import PictureStoryResult from "@/lib/database/models/pictureStoryResult.model";
import { ensureUser } from "./user.actions";

const OPTIONS_PER_QUESTION = 4;
const MAX_SEQUENCE_LENGTH = 8;

export async function createPictureStorySet(setData: PictureStorySetData) {
    try {
        await connectToDatabase();

        if (!setData.title?.trim()) {
            throw new Error("The set needs a title");
        }
        if (!setData.questions || setData.questions.length === 0) {
            throw new Error("The set needs at least one question");
        }

        for (const question of setData.questions) {
            const sequence = question.sequence
                .map((item) => item.trim())
                .filter(Boolean);
            if (
                sequence.length === 0 ||
                sequence.length > MAX_SEQUENCE_LENGTH
            ) {
                throw new Error(
                    `Every question needs 1 to ${MAX_SEQUENCE_LENGTH} pictures/emojis`,
                );
            }
            if (question.options.length !== OPTIONS_PER_QUESTION) {
                throw new Error(
                    `Every question must have exactly ${OPTIONS_PER_QUESTION} sentence options`,
                );
            }
            if (question.options.some((option) => !option.trim())) {
                throw new Error("All sentence options must be filled");
            }
            if (
                question.correctAnswerIndex < 0 ||
                question.correctAnswerIndex >= OPTIONS_PER_QUESTION
            ) {
                throw new Error("Invalid correct answer index");
            }
        }

        const newSet = await PictureStorySet.create({
            title: setData.title.trim(),
            questions: setData.questions.map((question) => ({
                sequence: question.sequence
                    .map((item) => item.trim())
                    .filter(Boolean),
                options: question.options.map((option) => option.trim()),
                correctAnswerIndex: question.correctAnswerIndex,
            })),
        });

        revalidatePath("/games/picture-story");
        revalidatePath("/admin/games/picture-story");

        return {
            success: true,
            setId: newSet._id.toString(),
            message: "Question set created successfully",
        };
    } catch (error) {
        console.error("Error creating picture story set:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

export async function getAllPictureStorySets(): Promise<
    PictureStorySetAdmin[]
> {
    try {
        await connectToDatabase();

        const sets = await PictureStorySet.find({})
            .sort({ createdAt: 1 })
            .lean();

        return sets.map((set: any) => ({
            _id: set._id.toString(),
            title: set.title,
            questions: set.questions.map((question: any) => ({
                sequence: [...question.sequence],
                options: [...question.options],
                correctAnswerIndex: question.correctAnswerIndex,
            })),
            createdAt: set.createdAt
                ? set.createdAt.toISOString()
                : new Date().toISOString(),
            updatedAt: set.updatedAt
                ? set.updatedAt.toISOString()
                : new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching picture story sets:", error);
        return [];
    }
}

export async function deletePictureStorySet(setId: string) {
    try {
        await connectToDatabase();

        if (!mongoose.Types.ObjectId.isValid(setId)) {
            throw new Error("Invalid set ID format");
        }

        const deletedSet = await PictureStorySet.findByIdAndDelete(setId);

        if (!deletedSet) {
            throw new Error("Question set not found");
        }

        revalidatePath("/games/picture-story");
        revalidatePath("/admin/games/picture-story");

        return {
            success: true,
            message: "Question set deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting picture story set:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

export async function getPictureStoryStats() {
    try {
        await connectToDatabase();

        const totalSets = await PictureStorySet.countDocuments();

        const [aggregate] = await PictureStoryResult.aggregate([
            {
                $group: {
                    _id: null,
                    totalPlays: { $sum: 1 },
                    totalScore: { $sum: "$score" },
                    totalQuestions: { $sum: "$totalQuestions" },
                },
            },
        ]);

        const totalQuestions = aggregate?.totalQuestions ?? 0;

        return {
            totalSets,
            totalPlays: aggregate?.totalPlays ?? 0,
            averageAccuracy: totalQuestions
                ? Math.round(
                      ((aggregate?.totalScore ?? 0) / totalQuestions) * 100,
                  )
                : 0,
        };
    } catch (error) {
        console.error("Error getting picture story stats:", error);
        return {
            totalSets: 0,
            totalPlays: 0,
            averageAccuracy: 0,
        };
    }
}

export async function savePictureStoryResult(resultData: {
    setId: string;
    score: number;
    totalQuestions: number;
}) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        if (!mongoose.Types.ObjectId.isValid(resultData.setId)) {
            throw new Error("Invalid set ID format");
        }
        if (
            isNaN(resultData.score) ||
            resultData.score < 0 ||
            resultData.score > resultData.totalQuestions
        ) {
            throw new Error("Invalid score");
        }

        const result = await PictureStoryResult.create({
            userId,
            setId: resultData.setId,
            score: resultData.score,
            totalQuestions: resultData.totalQuestions,
        });

        return {
            success: true,
            id: result._id.toString(),
            message: "Result saved successfully",
        };
    } catch (error) {
        console.error("Error saving picture story result:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}
