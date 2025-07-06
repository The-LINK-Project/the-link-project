import React from "react";
import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { formatConvoHistory, formatInitialObjectives } from "@/lib/utils";
import { checkIfLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import Lesson from "@/components/Lesson";

// Server component wrapper (NO "use client", CAN be async)
const LessonPage = async ({ params }: { params: { lessonIndex: string } }) => {
  const lessons = await getAllLessons();
  const user = await getCurrentUser();
  const index = parseInt(params.lessonIndex, 10);
  const lesson = lessons[index];

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
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {lesson.description}
            </p>
          </div>
        </div>
      </div>

      <Lesson
        initialInstructions={specificInstructions}
        lessonIndex={index}
        previousConvoHistory={lessonConvoHistory}
        previousLessonObjectivesProgress={lessonObjectivesProgress}
        lessonObjectives={lessonObjectives}
        isLessonProgress={isLessonProgress}
      />
    </div>
  );
};

export default LessonPage;
