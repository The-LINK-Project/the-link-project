"use server";

import { connectToDatabase } from "@/lib/database";
import LessonProgress from "../database/models/lessonProgress.model";
import { auth } from "@clerk/nextjs/server";
import { getAllLessons } from "./Lesson.actions";
import { formatInitialObjectives } from "../utils";

const lessons = await getAllLessons();

// when user has never done the lesson before and goes to it make a mongoDB item with convoHistory and objectives met default empty array and false array respectively
export async function initLessonProgress({
  lessonIndex,
  objectives,
}: {
  lessonIndex: number;
  objectives: string[];
}) {
  try {
    await connectToDatabase();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
      throw new Error("User not found");
    }

    const objectivesMet = formatInitialObjectives(objectives);

    console.log(`TOINK: ${objectivesMet}`);

    const payload = {
      userId: userId,
      lessonIndex: lessonIndex,
      objectivesMet: objectivesMet,
      convoHistory: [],
      quizResult: [],
    };
    console.log(`PAYLOAD: ${payload}`);
    const newLessonProgress = await LessonProgress.create(payload);

    if (!newLessonProgress) throw Error("Failed to create new lesson progress");

    console.log(`NEWLESSONPROG: ${newLessonProgress}`);
    return JSON.parse(JSON.stringify(newLessonProgress));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLessonProgress({
  lessonIndex,
}: {
  lessonIndex: number;
}): Promise<LessonProgress> {
  try {
    await connectToDatabase();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
      throw new Error("User not found");
    }

    const lessonProgress = await LessonProgress.findOne({
      userId: userId,
      lessonIndex: lessonIndex,
    });
    console.log(`PROOG: ${lessonProgress}`);

    if (!lessonProgress) {
      console.log("No Lesson Progress found");
    }
    console.log(`PARSED: ${JSON.stringify(lessonProgress, null, 4)}`);
    return JSON.parse(JSON.stringify(lessonProgress));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// this is used right when the user first opens the lesson, checks if they've done any part of the lesson before
export async function checkIfLessonProgress({
  lessonIndex,
}: {
  lessonIndex: number;
}) {
  try {
    await connectToDatabase();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
      throw new Error("User not found");
    }

    const lessonProgress = await LessonProgress.findOne({
      userId,
      lessonIndex,
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
}) {
  try {
    await connectToDatabase();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
      throw new Error("User not found");
    }
    const updatedLessonProgress = await LessonProgress.findOneAndUpdate(
      {
        userId: userId,
        lessonIndex: lessonIndex,
      },
      {
        $set: {
          objectivesMet: objectivesMet,
          convoHistory: convoHistory,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!updatedLessonProgress)
      throw Error("Failed to create new lesson progress");

    return JSON.parse(JSON.stringify(updatedLessonProgress));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllLessonStatuses(): Promise<LessonStatus[]> {
  try {
    await connectToDatabase();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
      throw new Error("User not found");
    }

    let completionStatuses: LessonStatus[] = [];
    for (let i = 0; i < lessons.length; i++) {
      console.log(i);

      const lessonProgress = await LessonProgress.findOne({
        userId: userId,
        lessonIndex: i + 1,
      });

      if (lessonProgress) {
        if (lessonProgress.objectivesMet.every((met: boolean) => met)) {
          completionStatuses[i] = "Completed";
        } else {
          completionStatuses[i] = "In Progress";
        }
      } else {
        completionStatuses[i] = "Not Started";
      }
    }
    console.log(`Completion Statuses: ${completionStatuses}`);
    return completionStatuses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLessonProgressStats() {
  try {
    await connectToDatabase();

    const allProgress = await LessonProgress.find({});

    const totalSessions = allProgress.length;
    const completedObjectives = allProgress.reduce((total, progress) => {
      return (
        total + progress.objectivesMet.filter((met: boolean) => met).length
      );
    }, 0);

    const completedLessons = allProgress.filter((progress) =>
      progress.objectivesMet.every((met: boolean) => met)
    ).length;

    const completionRate =
      totalSessions > 0
        ? Math.round((completedLessons / totalSessions) * 100)
        : 0;

    return {
      totalSessions,
      completedObjectives,
      completionRate,
    };
  } catch (error) {
    console.log(error);
    // Return default values if error
    return {
      totalSessions: 0,
      completedObjectives: 0,
      completionRate: 0,
    };
  }
}
