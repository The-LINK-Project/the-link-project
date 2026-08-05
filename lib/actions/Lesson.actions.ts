"use server";

import { connectToDatabase } from "@/lib/database";
import Lesson from "../database/models/lesson.model";
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
}): Promise<Lesson> {
    await requireAdmin();
    try {
        await connectToDatabase();

        const payload = {
            title: title,
            description: description,
            objectives: objectives,
            lessonIndex: lessonIndex,
            difficulty: difficulty,
        };

        const newLesson = await Lesson.create(payload);

        if (!newLesson) throw Error("Failed to create new lesson");

        revalidateTag("lessons");

        return JSON.parse(JSON.stringify(newLesson));
    } catch (error) {
        console.log("Error creating lesson:", error);
        throw error;
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

        const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

        if (!deletedLesson) {
            return { success: false, message: "Lesson not found" };
        }

        revalidateTag("lessons");
        revalidatePath("/admin/lessons/manage");
        return { success: true, message: "Lesson deleted successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to delete lesson" };
    }
}
