"use server";

import { connectToDatabase } from "@/lib/database";
import Lesson from "../database/models/lesson.model";
import Quiz from "../database/models/quiz.model";
import QuizResult from "../database/models/quizResult.model";
import LessonProgress from "../database/models/lessonProgress.model";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/auth";

// Lessons are admin-authored and change rarely, so the reads below are cached
// with the "lessons" tag. Admin mutations call revalidateTag("lessons") so
// edits show up immediately. connectToDatabase happens inside the cached
// functions, and none of them touch auth/cookies or user-specific data.
const getCachedLessons = unstable_cache(
    async () => {
        await connectToDatabase();

        const lessons = await Lesson.find().lean();

        return JSON.parse(JSON.stringify(lessons));
    },
    ["get-all-lessons"],
    { tags: ["lessons"], revalidate: 3600 },
);

const getCachedLessonCount = unstable_cache(
    async () => {
        await connectToDatabase();

        return await Lesson.countDocuments();
    },
    ["get-lesson-count"],
    { tags: ["lessons"], revalidate: 3600 },
);

const getCachedLessonByIndex = unstable_cache(
    async (lessonIndex: number) => {
        await connectToDatabase();

        const lesson = await Lesson.findOne({ lessonIndex: lessonIndex }).lean();

        if (!lesson) throw Error("Lesson not found");

        return JSON.parse(JSON.stringify(lesson));
    },
    ["get-lesson-by-index"],
    { tags: ["lessons"], revalidate: 3600 },
);

// Returns a structured result instead of throwing: Next.js redacts thrown
// server-action error messages in production, so the admin form could never
// show WHY creation failed (duplicate lesson number, missing objectives)
export async function createLesson({
    title,
    description,
    objectives,
    lessonIndex,
    difficulty,
}: {
    title: string;
    description: string;
    objectives: string[];
    lessonIndex: Number;
    difficulty: string;
}): Promise<{ success: boolean; message: string; lesson?: Lesson }> {
    await requireAdmin();
    try {
        await connectToDatabase();

        // A lesson with no objectives would be instantly "complete" for every
        // learner ([].every() is true), so objectives are mandatory
        const trimmedObjectives = objectives
            .map((objective) => objective.trim())
            .filter((objective) => objective !== "");

        if (trimmedObjectives.length === 0) {
            return {
                success: false,
                message: "At least one learning objective is required",
            };
        }

        // Explicit check for a friendly message; the unique index on
        // lessonIndex is the real guarantee against the race
        const existingLesson = await Lesson.findOne({
            lessonIndex: lessonIndex,
        });
        if (existingLesson) {
            return {
                success: false,
                message: `A lesson with number ${lessonIndex} already exists`,
            };
        }

        const payload = {
            title: title,
            description: description,
            objectives: trimmedObjectives,
            lessonIndex: lessonIndex,
            difficulty: difficulty,
        };

        const newLesson = await Lesson.create(payload);

        revalidateTag("lessons");

        return {
            success: true,
            message: "Lesson created successfully",
            lesson: JSON.parse(JSON.stringify(newLesson)),
        };
    } catch (error: any) {
        console.log("Error creating lesson:", error);
        // Duplicate-key race: another admin created the same number between
        // the check above and the insert
        if (error?.code === 11000) {
            return {
                success: false,
                message: `A lesson with number ${lessonIndex} already exists`,
            };
        }
        return { success: false, message: "Failed to create lesson" };
    }
}

export async function getAllLessons(): Promise<Lesson[]> {
    try {
        return await getCachedLessons();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLessonCount(): Promise<number> {
    try {
        return await getCachedLessonCount();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLessonByIndex(lessonIndex: number): Promise<Lesson> {
    try {
        return await getCachedLessonByIndex(lessonIndex);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteLesson(lessonId: string): Promise<{ success: boolean; message: string }> {
    await requireAdmin();
    try {
        await connectToDatabase();

        if (!mongoose.isValidObjectId(lessonId)) {
            return { success: false, message: "Invalid lesson ID format" };
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return { success: false, message: "Lesson not found" };
        }

        // Remove everything keyed to this lesson number, otherwise a ghost
        // quiz blocks re-creating one for a reused lessonIndex and orphaned
        // progress/results keep inflating stats. Children are deleted first
        // and the lesson last, so a failed cleanup leaves the lesson in
        // place and the whole delete can simply be retried.
        const lessonIndex = lesson.lessonIndex;

        // The cascade keys on the lesson NUMBER, not on this document's id.
        // While two lessons share a number, deleting one would also erase the
        // conversation history, progress and quiz results belonging to the
        // one that stays. Refuse rather than guess which rows were meant —
        // the duplicates have to be resolved by hand first.
        const lessonsWithSameIndex = await Lesson.countDocuments({
            lessonIndex,
        });
        if (lessonsWithSameIndex > 1) {
            return {
                success: false,
                message: `Another lesson also uses lesson number ${lessonIndex}. Deleting this one would erase learner progress and quiz results for that lesson too. Please fix the duplicate lesson numbers first.`,
            };
        }

        await Promise.all([
            Quiz.deleteMany({ lessonId: lessonIndex }),
            QuizResult.deleteMany({ lessonId: lessonIndex }),
            LessonProgress.deleteMany({ lessonIndex: lessonIndex }),
        ]);

        await Lesson.findByIdAndDelete(lessonId);

        revalidateTag("lessons");
        revalidateTag("quizzes");
        revalidatePath("/admin/lessons/manage");
        revalidatePath("/admin/quiz/manage");
        return { success: true, message: "Lesson deleted successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to delete lesson" };
    }
}
