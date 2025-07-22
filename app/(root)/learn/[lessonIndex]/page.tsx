import React from "react";

import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { formatConvoHistory, formatInitialObjectives } from "@/lib/utils";
import { checkIfLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import Lesson from "@/components/lesson/Lesson";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Server component wrapper (NO "use client", CAN be async)
const LessonPage = async ({ params }: { params: { lessonIndex: string } }) => {
  const lessons = await getAllLessons();
  const user = await getCurrentUser();
  const index = parseInt(params.lessonIndex, 10);
  const lesson = lessons[index - 1];

  if (!lesson) {
    return <div>Lesson not found.</div>;
  }

  const lessonTitle = lesson.title;
  const lessonDescription = lesson.description;
  const lessonObjectives = lesson.objectives;

  let lessonConvoHistory: Message[] = [];
  let lessonObjectivesProgress = [];
  let formattedConvoHistory: string | null = null;

  const isLessonProgress = await checkIfLessonProgress({
    lessonIndex: index,
  });

  if (isLessonProgress) {
    const lessonProgress = await getLessonProgress({
      lessonIndex: index,
    });
    lessonObjectivesProgress = lessonProgress.objectivesMet;
    lessonConvoHistory = lessonProgress.convoHistory;

    if (lessonConvoHistory && lessonConvoHistory.length > 0) {
      formattedConvoHistory = formatConvoHistory(lessonConvoHistory);
    }
  } else {
    lessonObjectivesProgress = formatInitialObjectives(lessonObjectives);
  }

  let specificInstructions = instructions
    .replace("<<NAME>>", user?.firstName)
    .replace("<<LESSON_TITLE>>", lessonTitle)
    .replace("<<LESSON_DESCRIPTION>>", lessonDescription)
    .replace("<<PREVIOUS_CONVERSATION>>", formattedConvoHistory ?? "");

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
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Objectives
            </h2>

            <Lesson
              initialInstructions={specificInstructions}
              lessonIndex={index}
              previousConvoHistory={lessonConvoHistory}
              previousLessonObjectivesProgress={lessonObjectivesProgress}
              lessonObjectives={lessonObjectives}
              isLessonProgress={isLessonProgress}
            />

            <div className="mt-8 flex justify-between">
              <div>
                {index > 1 && (
                  <Link href={`/learn/${index - 1}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      ← Previous Lesson
                    </button>
                  </Link>
                )}
              </div>
              <div>
                {index < lessons.length && (
                  <Link href={`/learn/${index + 1}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
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
