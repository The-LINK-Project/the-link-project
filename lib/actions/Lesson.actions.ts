"use server";

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { formatInitialObjectives } from "../utils";
import { lessons } from "@/constants";
import Lesson from "../database/models/lesson.model";

export async function createLesson({
    title,
    description,
    objectives,
    lessonIndex,
}: {
    title: string,
    description: string,
    objectives: string[],
    lessonIndex: Number
}): Promise<Lesson> {
    try {
        await connectToDatabase();

        console.log("Making new lesson")

        const payload = {
            title: title, 
            description: description,
            objectives: objectives,
            lessonIndex: lessonIndex
        };
        console.log(`PAYLOAD: ${payload}`);
        const newLesson = await Lesson.create(payload);

        if (!newLesson)
            throw Error("Failed to create new lesson progress");

        console.log(`New Lesson: ${newLesson}`);
        return JSON.parse(JSON.stringify(newLesson));
    } catch (error) {
        console.log(error);
        throw error;
    }
}
