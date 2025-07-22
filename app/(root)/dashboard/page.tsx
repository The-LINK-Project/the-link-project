import React from "react";
import { getAllLessonStatuses } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import DashboardLessonItem from "@/components/dashboard/DashboardLessonItem";

const DashboardPage = async () => {
  const lessons = await getAllLessons();
  const lessonStatuses = await getAllLessonStatuses();

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Learning Journey
        </h1>
        <p className="text-gray-600">
          Continue where you left off or start a new lesson
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          return (
            <DashboardLessonItem
              key={index + 1}
              lesson={lesson}
              lessonNum={index + 1}
              lessonStatus={lessonStatuses[index]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default DashboardPage;
