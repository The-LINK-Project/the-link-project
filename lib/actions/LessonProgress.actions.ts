"use server";

import { connectToDatabase } from "@/lib/database";
import LessonProgress from "../database/models/lessonProgress.model";
import QuizResult from "../database/models/quizResult.model";
import { getAllLessons } from "./Lesson.actions";
import { formatInitialObjectives, normalizeStoredRole } from "../serverUtils";
import { ensureUser } from "./user.actions";
import { requireAdmin } from "@/lib/auth";

const MAX_STORED_MESSAGE_LENGTH = 4000;

// lessonIndex is interpolated into a Mongoose filter, where a non-numeric
// value raises a CastError naming the model and schema path. Validating here
// means that error is never reachable, whatever the caller sends.
function assertLessonIndex(lessonIndex: number): number {
    if (!Number.isInteger(lessonIndex) || lessonIndex < 0) {
        throw new Error("Invalid lesson index");
    }
    return lessonIndex;
}

// Every export of a "use server" file is a POST endpoint, so these arguments
// are caller-controlled regardless of what the UI sends. Coerce the objective
// flags to real booleans and whitelist stored roles, so a forged role can
// never make learner text replay as the tutor's own turn in a later prompt.
function sanitizeObjectivesMet(objectivesMet: boolean[]): boolean[] {
    if (!Array.isArray(objectivesMet)) return [];
    return objectivesMet.map((met) => met === true);
}

function sanitizeMessages(messages: Message[]): Message[] {
    if (!Array.isArray(messages)) return [];
    return messages.map((message) => ({
        role: normalizeStoredRole(message?.role),
        message:
            typeof message?.message === "string"
                ? message.message.slice(0, MAX_STORED_MESSAGE_LENGTH)
                : "",
    }));
}

// when user has never done the lesson before and goes to it make a mongoDB item with convoHistory and objectives met default empty array and false array respectively
// Upsert-based and idempotent: two tabs opening a fresh lesson at once used
// to both create() and mint duplicate (userId, lessonIndex) documents.
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

        assertLessonIndex(lessonIndex);

        // this part is a repeat to be removed later
        const objectivesMet = formatInitialObjectives(objectives);

        const filter = { userId: userId, lessonIndex: lessonIndex };
        const insertDefaults = {
            objectivesMet: objectivesMet,
            // objectivesMet starts all-false, so fresh progress is never
            // completed (and an empty objectives array must not count either)
            completed: false,
            convoHistory: [],
            quizResult: [],
        };

        try {
            const lessonProgress = await LessonProgress.findOneAndUpdate(
                filter,
                { $setOnInsert: insertDefaults },
                { upsert: true, new: true },
            );
            return JSON.parse(JSON.stringify(lessonProgress));
        } catch (error: any) {
            // Upsert race against the unique index: the other request's
            // insert won, so the document exists now — read it
            if (error?.code === 11000) {
                const existing = await LessonProgress.findOne(filter);
                if (existing) return JSON.parse(JSON.stringify(existing));
            }
            throw error;
        }
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

        assertLessonIndex(lessonIndex);

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
// Pass `convoHistory` to replace the stored history, or `appendMessages` to
// atomically $push new messages without rewriting what's already stored
export async function updateLessonProgress({
    lessonIndex,
    objectivesMet,
    convoHistory,
    appendMessages,
}: {
    lessonIndex: number;
    objectivesMet: boolean[];
    convoHistory?: Message[];
    appendMessages?: Message[];
}) {
    try {
        await connectToDatabase();

        const { _id: userId } = await ensureUser();

        assertLessonIndex(lessonIndex);
        objectivesMet = sanitizeObjectivesMet(objectivesMet);
        if (convoHistory !== undefined) {
            convoHistory = sanitizeMessages(convoHistory);
        }
        if (appendMessages !== undefined) {
            appendMessages = sanitizeMessages(appendMessages);
        }

        // Single atomic pipeline update: the merge with the stored document
        // (objectives can never regress — an objective already true in the DB
        // stays true even if the incoming array says false) happens inside
        // MongoDB, so there is no read-before-write round trip or race window
        const firstStage: {
            objectivesMet: unknown;
            convoHistory?: unknown;
        } = {
            objectivesMet: {
                $map: {
                    input: { $range: [0, objectivesMet.length] },
                    as: "i",
                    in: {
                        $or: [
                            {
                                $ifNull: [
                                    {
                                        $arrayElemAt: [
                                            { $literal: objectivesMet },
                                            "$$i",
                                        ],
                                    },
                                    false,
                                ],
                            },
                            {
                                $eq: [
                                    {
                                        $ifNull: [
                                            {
                                                $arrayElemAt: [
                                                    {
                                                        $ifNull: [
                                                            "$objectivesMet",
                                                            [],
                                                        ],
                                                    },
                                                    "$$i",
                                                ],
                                            },
                                            false,
                                        ],
                                    },
                                    true,
                                ],
                            },
                        ],
                    },
                },
            },
        };

        if (convoHistory !== undefined) {
            firstStage.convoHistory = { $literal: convoHistory };
        } else if (appendMessages !== undefined) {
            firstStage.convoHistory = {
                $concatArrays: [
                    { $ifNull: ["$convoHistory", []] },
                    { $literal: appendMessages },
                ],
            };
        }

        const update = [
            { $set: firstStage },
            // Second stage reads the merged objectivesMet from the first:
            // completed flips to true when every objective is met and is
            // otherwise preserved (false on a fresh upsert). The $size guard
            // matters: $allElementsTrue on an empty array is true.
            {
                $set: {
                    completed: {
                        $cond: [
                            {
                                $and: [
                                    { $gt: [{ $size: "$objectivesMet" }, 0] },
                                    { $allElementsTrue: ["$objectivesMet"] },
                                ],
                            },
                            true,
                            { $eq: [{ $ifNull: ["$completed", false] }, true] },
                        ],
                    },
                },
            },
        ];

        const filter = { userId: userId, lessonIndex: lessonIndex };
        const options = { upsert: true, new: true };

        let updatedLessonProgress;
        try {
            updatedLessonProgress = await LessonProgress.findOneAndUpdate(
                filter,
                update,
                options
            );
        } catch (error: any) {
            // Upsert race against the unique (userId, lessonIndex) index:
            // another request inserted the doc between lookup and insert.
            // It exists now, so the retry takes the plain update path.
            if (error?.code !== 11000) throw error;
            updatedLessonProgress = await LessonProgress.findOneAndUpdate(
                filter,
                update,
                options
            );
        }

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
                const objectivesCompleted =
                    lessonProgress.objectivesMet.length > 0 &&
                    lessonProgress.objectivesMet.every((met: boolean) => met);
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
    // Cross-user aggregate for the admin dashboard: a server action is a bare
    // POST endpoint, so the page guard alone never protects it
    await requireAdmin();

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
            if (
                progress.objectivesMet.length > 0 &&
                progress.objectivesMet.every((met: boolean) => met)
            ) {
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

        assertLessonIndex(lessonIndex);

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
