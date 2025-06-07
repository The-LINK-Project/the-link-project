"use server"; 

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import User from "@/lib/database/models/user.model";
import LessonProgress from "../database/models/lessonProgress.model";
import { auth } from "@clerk/nextjs/server";

interface Message {
    role: string;
    message: string;
    audioURL?: string;
  }
  export async function createLessonProgress({
    lessonIndex,
    objectivesMet,
    convoHistory,
  }: {
    lessonIndex: number;
    objectivesMet: boolean[];
    convoHistory: Message[];
  }){
    try {
        await connectToDatabase();

        const {sessionClaims} = await auth();

        const userId = sessionClaims?.userId as string;

        if (!userId) {
            throw new Error ("User not found");
        }

        const payload = {
            userId: userId,
            lessonIndex: lessonIndex,
            objectivesMet: objectivesMet,
            convoHistory: convoHistory
        }

        const newLessonProgress = await LessonProgress.create(payload);

        if (!newLessonProgress)
            throw Error ("Failed to create new lesson progress")

        return JSON.parse(JSON.stringify(newLessonProgress));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLessonProgress({
    lessonIndex,
}: {
    lessonIndex: number
}){
    try {
        await connectToDatabase()

        const {sessionClaims} = await auth();

        const userId = sessionClaims?.userId as string;

        if (!userId) {
            throw new Error ("User not found");
        }

        const lessonProgress = await LessonProgress.find({userId: userId, lessonIndex: lessonIndex})
        
        if (!lessonProgress) {
            console.log("No Lesson Progress found")
        }

        return JSON.parse(JSON.stringify(lessonProgress));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateLessonProgress({
    updatedObjectivesMet,
    lessonIndex,
}: {
    updatedObjectivesMet: boolean[],
    lessonIndex: number,
}){
    try {
        await connectToDatabase();

        const {sessionClaims} = await auth();

        const userId = sessionClaims?.userId as string;

        if (!userId) {
            throw new Error ("User not found");
        }

        // const lessonProgress= await LessonProgress.find({userId: userId, lessonIndex: lessonIndex})
        const updatedLessonProgress = await LessonProgress.findOneAndUpdate(
            { userId, lessonIndex},
            { $set: {objectivesMet: updatedObjectivesMet}},
            { new: true},
        )

    } catch (error) {
        console.log(error);
        throw error;
    }
}
