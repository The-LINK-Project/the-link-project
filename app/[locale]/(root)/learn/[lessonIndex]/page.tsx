import React from "react";

import {
    getLessonProgress,
    initLessonProgress,
} from "@/lib/actions/LessonProgress.actions";
import { getLessonByIndex, getLessonCount } from "@/lib/actions/Lesson.actions";
import { getQuizByLessonId } from "@/lib/actions/quiz.actions";
import Lesson from "@/components/lesson/Lesson";
import Link from "next/link";

const LessonPage = async ({ params }: { params: Promise<{ lessonIndex: string }> }) => {
    const { lessonIndex } = await params;
    const index = parseInt(lessonIndex, 10);

    // Must match what the actions accept: a negative index now throws rather
    // than reaching Mongo, so screen it here instead of serving a 500
    if (!Number.isInteger(index) || index < 0) {
        return <div>Lesson not found.</div>;
    }

    const [lesson, lessonCount, existingLessonProgress, quiz] =
        await Promise.all([
            getLessonByIndex(index).catch(() => null),
            getLessonCount(),
            getLessonProgress({ lessonIndex: index }),
            getQuizByLessonId(index).catch(() => null),
        ]);

    if (!lesson) {
        return <div>Lesson not found.</div>;
    }

    const lessonObjectives = lesson.objectives;

    const lessonProgress: LessonProgress =
        existingLessonProgress ??
        (await initLessonProgress({
            lessonIndex: index,
            objectives: lessonObjectives,
        }));

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
                            key={index}
                            previousLessonProgress={lessonProgress}
                            lessonInfo={lesson}
                            hasQuiz={!!quiz}
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
                                {index < lessonCount && (
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
