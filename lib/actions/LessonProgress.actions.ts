"use server";

import { connectToDatabase } from "@/lib/database";
import LessonProgress from "../database/models/lessonProgress.model";
import QuizResult from "../database/models/quizResult.model";
import { getAllLessons } from "./Lesson.actions";
import { formatInitialObjectives } from "../utils";
import { ensureUser } from "./user.actions";

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

        const { _id: userId } = await ensureUser();

        // this part is a repeat to be removed later
        const objectivesMet = formatInitialObjectives(objectives);

        const payload = {
            userId: userId,
            lessonIndex: lessonIndex,
            objectivesMet: objectivesMet,
            completed: objectivesMet.every((met: boolean) => met),
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
}): Promise<LessonProgress | null> {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        const lessonProgress = await LessonProgress.findOne({
            userId: userId,
            lessonIndex: lessonIndex,
        });

        return JSON.parse(JSON.stringify(lessonProgress));
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

        const { _id: userId } = await ensureUser();

        // Merge with the existing document so objectives can never regress —
        // an objective already true in the DB stays true even if the incoming
        // array says false
        const existingLessonProgress = await LessonProgress.findOne({
            userId: userId,
            lessonIndex: lessonIndex,
        });

        const existingObjectivesMet: boolean[] =
            existingLessonProgress?.objectivesMet ?? [];

        const mergedObjectivesMet = objectivesMet.map(
            (met: boolean, index: number) =>
                met || !!existingObjectivesMet[index],
        );

        const setUpdates: {
            objectivesMet: boolean[];
            convoHistory: Message[];
            completed?: boolean;
        } = {
            objectivesMet: mergedObjectivesMet,
            convoHistory: convoHistory,
        };

        if (mergedObjectivesMet.every((met: boolean) => met)) {
            setUpdates.completed = true;
        }

        // MongoDB rejects updates where the same path appears in both $set and
        // $setOnInsert, so only default `completed` when $set doesn't carry it
        const update: {
            $set: typeof setUpdates;
            $setOnInsert?: { completed: boolean };
        } = { $set: setUpdates };
        if (setUpdates.completed === undefined) {
            update.$setOnInsert = { completed: false };
        }

        const updatedLessonProgress = await LessonProgress.findOneAndUpdate(
            {
                userId: userId,
                lessonIndex: lessonIndex,
            },
            update,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
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

        const { _id: userId } = await ensureUser();

        const [lessons, progressDocs, passedQuizzes] = await Promise.all([
            getAllLessons(),
            LessonProgress.find({ userId })
                .select("lessonIndex objectivesMet completed")
                .lean<
                    {
                        lessonIndex: number;
                        objectivesMet: boolean[];
                        completed?: boolean;
                    }[]
                >(),
            QuizResult.find({ userId, score: { $gte: 80 } })
                .select("lessonId")
                .lean<{ lessonId: number }[]>(),
        ]);

        const progressByLessonIndex = new Map(
            progressDocs.map((progress) => [progress.lessonIndex, progress]),
        );
        const passedQuizLessonIds = new Set(
            passedQuizzes.map((quiz) => quiz.lessonId),
        );

        const completionStatuses: LessonStatus[] = [];
        for (let i = 0; i < lessons.length; i++) {
            const lessonProgress = progressByLessonIndex.get(i + 1);
            const quizPassed = passedQuizLessonIds.has(i + 1);

            if (lessonProgress) {
                const objectivesCompleted = lessonProgress.objectivesMet.every(
                    (met: boolean) => met,
                );
                const hasCompletedFlag = !!lessonProgress.completed;

                if (hasCompletedFlag || objectivesCompleted || quizPassed) {
                    completionStatuses[i] = "Completed";
                } else {
                    completionStatuses[i] = "In Progress";
                }
            } else {
                completionStatuses[i] = quizPassed ? "Completed" : "Not Started";
            }
        }
        return completionStatuses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLessonProgressStats() {
    try {
        await connectToDatabase();

        const [allProgress, passingQuizzes] = await Promise.all([
            LessonProgress.find({})
                .select("userId lessonIndex objectivesMet completed")
                .lean<
                    {
                        userId: unknown;
                        lessonIndex: number;
                        objectivesMet: boolean[];
                        completed?: boolean;
                    }[]
                >(),
            QuizResult.find({ score: { $gte: 80 } })
                .select("userId lessonId")
                .lean<{ userId: unknown; lessonId: number }[]>(),
        ]);

        const totalSessions = allProgress.length;
        const completedObjectives = allProgress.reduce((total, progress) => {
            return (
                total + progress.objectivesMet.filter((met: boolean) => met).length
            );
        }, 0);

        const passedQuizKeys = new Set(
            passingQuizzes.map((quiz) => `${quiz.userId}:${quiz.lessonId}`),
        );

        const completedLessons = allProgress.filter((progress) => {
            if (progress.completed) return true;
            if (progress.objectivesMet.every((met: boolean) => met)) {
                return true;
            }
            return passedQuizKeys.has(
                `${progress.userId}:${progress.lessonIndex}`,
            );
        }).length;

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

export async function deleteLessonProgress({
    lessonIndex,
}: {
    lessonIndex: number;
}) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

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
