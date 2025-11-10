"use server";

import { connectToDatabase } from "@/lib/database";
import LessonProgress from "../database/models/lessonProgress.model";
import { auth } from "@clerk/nextjs/server";
import { getAllLessons } from "./Lesson.actions";
import { formatInitialObjectives } from "../utils";
import QuizResult from "../database/models/quizResult.model";

// Helper function to get highest quiz score for a lesson
async function getHighestQuizScore(userId: string, lessonIndex: number): Promise<number> {
    try {
        const quizResults = await QuizResult.find({
            userId: userId,
            lessonId: lessonIndex
        }).sort({ score: -1 }).limit(1);
        
        return quizResults.length > 0 ? quizResults[0].score : 0;
    } catch (error) {
        console.log("Error getting quiz score:", error);
        return 0;
    }
}

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

    // this part is a repeat to be removed later
    const objectivesMet = formatInitialObjectives(objectives);

    const payload = {
      userId: userId,
      lessonIndex: lessonIndex,
      objectivesMet: objectivesMet,
      convoHistory: [],
      quizResult: [],
    };

    const newLessonProgress = await LessonProgress.create(payload);

    if (!newLessonProgress) throw Error("Failed to create new lesson progress");

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

    if (!lessonProgress) {
      console.log("No Lesson Progress found");
    }

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

    if (!updatedLessonProgress) {
      throw Error("Failed to update lesson progress");
    }

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
      return [];
    }

    const lessons = await getAllLessons();

    let completionStatuses: LessonStatus[] = [];
    for (let i = 0; i < lessons.length; i++) {
      console.log(i);

      const lessonProgress = await LessonProgress.findOne({
        userId: userId,
        lessonIndex: i + 1,
      });

      if (lessonProgress) {
        const allObjectivesMet = lessonProgress.objectivesMet.every((met: boolean) => met);
        const highestQuizScore = await getHighestQuizScore(userId, i + 1);
        const passedQuiz = highestQuizScore >= 80;
        
        if (allObjectivesMet || passedQuiz) {
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

    const completedLessons = await Promise.all(
      allProgress.map(async (progress) => {
        const allObjectivesMet = progress.objectivesMet.every((met: boolean) => met);
        if (allObjectivesMet) return true;
        
        // Check if they passed the quiz
        const highestScore = await getHighestQuizScore(progress.userId.toString(), progress.lessonIndex);
        return highestScore >= 80;
      })
    );
    
    const completedCount = completedLessons.filter(Boolean).length;

    const completionRate =
      totalSessions > 0
        ? Math.round((completedCount / totalSessions) * 100)
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

export async function deleteLessonProgress({
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

    const deletedLessonProgress = await LessonProgress.findOneAndDelete({
      userId: userId,
      lessonIndex: lessonIndex,
    });

    if (!deletedLessonProgress) throw Error("Failed to delete lesson progress");

    return JSON.parse(JSON.stringify(deletedLessonProgress));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
