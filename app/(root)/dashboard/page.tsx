import React from "react";
import { getAllLessonStatuses } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import DashboardLessonItem from "@/components/dashboard/DashboardLessonItem";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const DashboardPage = async () => {
  const lessons = await getAllLessons();
  const lessonStatuses = await getAllLessonStatuses();

  const getLessonsByDifficulty = (difficulty: string) => {
    return lessons
      .map((lesson, index) => ({
        lesson,
        status: lessonStatuses[index],
      }))
      .filter(({ lesson }) => lesson.difficulty?.toLowerCase() === difficulty)
      .map(({ lesson, status }, i) => (
        <DashboardLessonItem
          key={i}
          lesson={lesson}
          lessonNum={i + 1} 
          lessonStatus={status}
        />
      ));
  };

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Learning Journey
        </h1>
        <p className="text-gray-600">
          Continue where you left off or start a new lesson:
        </p>
      </div>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="beginner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getLessonsByDifficulty("beginner")}
          </div>
        </TabsContent>

        <TabsContent value="intermediate">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getLessonsByDifficulty("intermediate")}
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getLessonsByDifficulty("advanced")}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DashboardPage;
