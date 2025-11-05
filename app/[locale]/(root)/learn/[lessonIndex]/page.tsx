import React from "react";

import { getCurrentUser } from "@/lib/actions/user.actions";
import {
    getLessonProgress,
    initLessonProgress,
} from "@/lib/actions/LessonProgress.actions";
import { formatConvoHistory, formatInitialObjectives } from "@/lib/utils";
import { checkIfLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import Lesson from "@/components/lesson/Lesson";
import Link from "next/link";

const LessonPage = async ({ params }: { params: Promise<{ lessonIndex: string }> }) => {
    const { lessonIndex } = await params;
    const lessons = await getAllLessons();
    // const user = await getCurrentUser();
    const index = parseInt(lessonIndex, 10);
    const lesson = lessons[index - 1];

    if (!lesson) {
        return <div>Lesson not found.</div>;
    }

    const lessonObjectives = lesson.objectives;

    let lessonConvoHistory: Message[] = [];
    let lessonObjectivesProgress = [];
    let formattedConvoHistory: string | null = null;

    const isLessonProgress = await checkIfLessonProgress({
        lessonIndex: index,
    });

    let lessonProgress = {} as LessonProgress;
    if (isLessonProgress) {
        lessonProgress = await getLessonProgress({
            lessonIndex: index,
        });
        lessonObjectivesProgress = lessonProgress.objectivesMet;
        lessonConvoHistory = lessonProgress.convoHistory;

        if (lessonConvoHistory && lessonConvoHistory.length > 0) {
            formattedConvoHistory = formatConvoHistory(lessonConvoHistory);
        }
    } else {
        lessonObjectivesProgress = formatInitialObjectives(lessonObjectives);
        lessonProgress = await initLessonProgress({
            lessonIndex: index,
            objectives: lessonObjectives,
        });
    }

    // const previosuessonProgress: LessonProgress = {
    //   userId: user?.id,
    //   lessonIndex: index,
    //   objectivesMet: lessonObjectivesProgress,
    //   convoHistory: lessonConvoHistory,
    //   quizResult: [],
    // };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section with Lesson Info - REMOVED DUPLICATE OBJECTIVES */}
            <div className="bg-white px-6 py-6 border-b border-gray-100">
                <div className="max-w-6xl mx-auto">
                    {/* Lesson Title and Description */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {lesson.title}
                        </h1>

                        <p className="text-lg text-gray-700 mb-6">{lesson.description}</p>
                        <h2 className="text-xl font-semibold text-green-500 mb-3">
                            Objectives
                        </h2>

                        <Lesson
                            previousLessonProgress={lessonProgress}
                            lessonInfo={lesson}
                        />

                        <div className="mt-8 flex justify-between">
                            <div>
                                {index > 1 && (
                                    <Link href={`/learn/${index - 1}`}>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-primary hover:cursor-pointer transition">
                                            ← Previous Lesson
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <div>
                                {index < lessons.length && (
                                    <Link href={`/learn/${index + 1}`}>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-primary hover:cursor-pointer transition">
                                            Next Lesson →
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
