"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import WordMatchRound from "@/lib/database/models/wordMatchRound.model";
import WordMatchResult from "@/lib/database/models/wordMatchResult.model";
import { ensureUser } from "./user.actions";
import { requireAdmin } from "@/lib/auth";

const MIN_PAIRS = 2;
const MAX_PAIRS = 8;

function hasContent(tile: WordMatchTileContent) {
    return Boolean(tile?.text?.trim() || tile?.imageUrl?.trim());
}

export async function createWordMatchRound(roundData: WordMatchRoundData) {
    await requireAdmin();
    try {
        await connectToDatabase();

        if (!roundData.title?.trim()) {
            throw new Error("The round needs a title");
        }
        if (
            !roundData.pairs ||
            roundData.pairs.length < MIN_PAIRS ||
            roundData.pairs.length > MAX_PAIRS
        ) {
            throw new Error(
                `A round must have between ${MIN_PAIRS} and ${MAX_PAIRS} pairs`,
            );
        }
        for (const pair of roundData.pairs) {
            if (!hasContent(pair.left) || !hasContent(pair.right)) {
                throw new Error(
                    "Every tile needs a word/phrase or an image URL",
                );
            }
        }

        const newRound = await WordMatchRound.create({
            title: roundData.title.trim(),
            pairs: roundData.pairs.map((pair) => ({
                left: {
                    text: pair.left.text?.trim() || "",
                    imageUrl: pair.left.imageUrl?.trim() || "",
                },
                right: {
                    text: pair.right.text?.trim() || "",
                    imageUrl: pair.right.imageUrl?.trim() || "",
                },
            })),
        });

        revalidatePath("/games/word-match");
        revalidatePath("/admin/games/word-match");

        return {
            success: true,
            roundId: newRound._id.toString(),
            message: "Round created successfully",
        };
    } catch (error) {
        console.error("Error creating word match round:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

export async function getAllWordMatchRounds(): Promise<WordMatchRoundAdmin[]> {
    try {
        await connectToDatabase();

        const rounds = await WordMatchRound.find({})
            .sort({ createdAt: 1 })
            .lean();

        return rounds.map((round: any) => ({
            _id: round._id.toString(),
            title: round.title,
            pairs: round.pairs.map((pair: any) => ({
                left: {
                    text: pair.left?.text || "",
                    imageUrl: pair.left?.imageUrl || "",
                },
                right: {
                    text: pair.right?.text || "",
                    imageUrl: pair.right?.imageUrl || "",
                },
            })),
            createdAt: round.createdAt
                ? round.createdAt.toISOString()
                : new Date().toISOString(),
            updatedAt: round.updatedAt
                ? round.updatedAt.toISOString()
                : new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching word match rounds:", error);
        return [];
    }
}

export async function deleteWordMatchRound(roundId: string) {
    await requireAdmin();
    try {
        await connectToDatabase();

        if (!mongoose.Types.ObjectId.isValid(roundId)) {
            throw new Error("Invalid round ID format");
        }

        const deletedRound = await WordMatchRound.findByIdAndDelete(roundId);

        if (!deletedRound) {
            throw new Error("Round not found");
        }

        revalidatePath("/games/word-match");
        revalidatePath("/admin/games/word-match");

        return {
            success: true,
            message: "Round deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting word match round:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

export async function getWordMatchStats() {
    try {
        await connectToDatabase();

        const totalRounds = await WordMatchRound.countDocuments();

        const [aggregate] = await WordMatchResult.aggregate([
            {
                $group: {
                    _id: null,
                    totalPlays: { $sum: 1 },
                    averageScore: { $avg: "$score" },
                    averageTimeMs: { $avg: "$timeMs" },
                    averageWrongAttempts: { $avg: "$wrongAttempts" },
                },
            },
        ]);

        return {
            totalRounds,
            totalPlays: aggregate?.totalPlays ?? 0,
            averageScore: Math.round(aggregate?.averageScore ?? 0),
            averageTimeMs: Math.round(aggregate?.averageTimeMs ?? 0),
            averageWrongAttempts:
                Math.round((aggregate?.averageWrongAttempts ?? 0) * 10) / 10,
        };
    } catch (error) {
        console.error("Error getting word match stats:", error);
        return {
            totalRounds: 0,
            totalPlays: 0,
            averageScore: 0,
            averageTimeMs: 0,
            averageWrongAttempts: 0,
        };
    }
}

export async function saveWordMatchResult(resultData: {
    roundId: string;
    score: number;
    timeMs: number;
    wrongAttempts: number;
}) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        if (!mongoose.Types.ObjectId.isValid(resultData.roundId)) {
            throw new Error("Invalid round ID format");
        }
        if (
            isNaN(resultData.score) ||
            resultData.score < 0 ||
            resultData.score > 100
        ) {
            throw new Error("Score must be a number between 0 and 100");
        }

        const result = await WordMatchResult.create({
            userId,
            roundId: resultData.roundId,
            score: resultData.score,
            timeMs: Math.max(0, Math.round(resultData.timeMs)),
            wrongAttempts: Math.max(0, Math.round(resultData.wrongAttempts)),
        });

        return {
            success: true,
            id: result._id.toString(),
            message: "Result saved successfully",
        };
    } catch (error) {
        console.error("Error saving word match result:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}
