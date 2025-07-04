import React from "react";
import Link from "next/link";
import { getAllLessonProgressesForDashboard } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";

const DashboardLessons = async() => {
    const lessons = await getAllLessons()
    console.log(`lessons: ${lessons}`);
    const lessonProgresses = await getAllLessonProgressesForDashboard();

    // colour coding the tiles
    const getProgressColor = (progress: string) => {
        switch (progress) {
          case "Completed":
            return "bg-green-100 border-green-300";
          case "In Progress":
            return "bg-yellow-100 border-yellow-300"; 
          case "Not Started":
            return "bg-red-100 border-red-300"; 
          default:
            return "bg-gray-100 border-gray-300"; 
        }
      };

    return (
    <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson, index) => {
            const progressStatus = lessonProgresses[index];
            const colorClasses = getProgressColor(progressStatus);
            
            return (
            <Link href={`/learn/${index+1}`} key={index}>
                <div className={`${colorClasses} rounded-lg p-4 shadow-md h-full flex flex-col border-2 hover:shadow-lg transition-shadow`}>
                <h2 className="text-lg font-bold mb-2">
                    {index + 1}. {lesson.title}
                </h2>
                <p className="text-sm text-gray-600 flex-1">
                    {lesson.description}
                </p>
                <p className="mt-2 font-medium">
                    {lessonProgresses[index]}
                </p>
                </div>
            </Link>
            );
        })}
        </div>
    </section>
    );
};
export default DashboardLessons;
