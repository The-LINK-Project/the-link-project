import React from "react";
import DashboardLessons from "@/components/shared/DashboardLessons";
import Chatbot from "@/components/chatbot/Chatbot";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import { getAllLessonProgressesForDashboard } from "@/lib/actions/LessonProgress.actions";

const DashboardPage = async () => {
  const lessons = await getAllLessons();
  const lessonProgresses = await getAllLessonProgressesForDashboard();

  return (
    <div className="min-h-screen">
      <DashboardLessons lessons={lessons} lessonProgresses={lessonProgresses} />
      <div className="px-6 pb-6">
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardPage;
