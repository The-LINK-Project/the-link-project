"use server"; 

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import User from "@/lib/database/models/user.model";
import LessonProgress from "../database/models/lessonProgress.model";
import { auth } from "@clerk/nextjs/server";
import { formatInitialObjectives } from "../utils";

interface Message {
    role: string;
    message: string;
    audioURL?: string;
  }

// when user has never done the lesson before and goes to it make a mongoDB item with convoHistory and objectives met default empty array and false array respectively
  export async function initLessonProgress({
    lessonIndex,
    objectives
  }: {
    lessonIndex: number;
    objectives: string[]

  }){
    try {
        await connectToDatabase();

        const {sessionClaims} = await auth();

        const userId = sessionClaims?.userId as string;

        if (!userId) {
            throw new Error ("User not found");
        }

        const objectivesMet = formatInitialObjectives(objectives)

        console.log(`TOINK: ${objectivesMet}`)

        const payload = {
            userId: userId,
            lessonIndex: lessonIndex,
            objectivesMet: objectivesMet,
            convoHistory: []
        }
        console.log(`PAYLOAD: ${payload}`)
        const newLessonProgress = await LessonProgress.create(payload);

        if (!newLessonProgress)
            throw Error ("Failed to create new lesson progress")

        console.log(`NEWLESSONPROG: ${newLessonProgress}`)
        return JSON.parse(JSON.stringify(newLessonProgress));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// export async function createLessonProgress({
// lessonIndex,
// objectivesMet,
// convoHistory,
// }: {
// lessonIndex: number;
// objectivesMet: boolean[];
// convoHistory: Message[];
// }){
// try {
//     await connectToDatabase();

//     const {sessionClaims} = await auth();

//     const userId = sessionClaims?.userId as string;

//     if (!userId) {
//         throw new Error ("User not found");
//     }

//     const payload = {
//         userId: userId,
//         lessonIndex: lessonIndex,
//         objectivesMet: objectivesMet,
//         convoHistory: convoHistory
//     }

//     const newLessonProgress = await LessonProgress.create(payload);

//     if (!newLessonProgress)
//         throw Error ("Failed to create new lesson progress")

//     return JSON.parse(JSON.stringify(newLessonProgress));

// } catch (error) {
//     console.log(error);
//     throw error;
// }
// }

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

// export async function updateLessonProgress({
//     updatedObjectivesMet,
//     lessonIndex,
// }: {
//     updatedObjectivesMet: boolean[],
//     lessonIndex: number,
// }){
//     try {
//         await connectToDatabase();

//         const {sessionClaims} = await auth();

//         const userId = sessionClaims?.userId as string;

//         if (!userId) {
//             throw new Error ("User not found");
//         }

//         // const lessonProgress= await LessonProgress.find({userId: userId, lessonIndex: lessonIndex})
//         const updatedLessonProgress = await LessonProgress.findOneAndUpdate(
//             { userId, lessonIndex},
//             { $set: {objectivesMet: updatedObjectivesMet}},
//             { new: true},
//         )

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// this is used right when the user first opens the lesson, checks if they've done any part of the lesson before 
export async function checkIfLessonProgress({
    lessonIndex,
}: {
    lessonIndex: number
}){
    try {
        await connectToDatabase();

        const {sessionClaims} = await auth();

        const userId = sessionClaims?.userId as string;

        if (!userId) {
            throw new Error ("User not found");
        }

        const lessonProgress = await LessonProgress.findOne({
            userId, 
            lessonIndex
          });

        // will return true if user has touched the lesson b4
        return !!lessonProgress;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// this runs when the user clicks disconnect or unnaturally disconnects such as exiting tab
export async function updateLessonProgress({
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
        const updatedLessonProgress = await LessonProgress.findOneAndUpdate(
            {
                userId: userId, lessonIndex: lessonIndex
            },
            {
                $set: {
                    objectivesMet: objectivesMet,
                    convoHistory: convoHistory
                }
            },
            {
                upsert: true, new: true
            }
        );
    
        if (!updatedLessonProgress)
            throw Error ("Failed to create new lesson progress")
    
        return JSON.parse(JSON.stringify(updatedLessonProgress));
    
    } catch (error) {
        console.log(error);
        throw error;
    }
    }