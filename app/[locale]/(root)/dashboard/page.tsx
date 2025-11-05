import React from "react";
import { getAllLessonStatuses } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import { ensureUser } from "@/lib/actions/user.actions";
import DashboardLessonItem from "@/components/dashboard/DashboardLessonItem";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

const DashboardPage = async () => {
    await ensureUser();

    const lessons = await getAllLessons();
    const lessonStatuses = await getAllLessonStatuses();
    const t = await getTranslations("dashboard");

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
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t("headerCall")}
                    </h1>
                    <p className="text-gray-600">
                        {t("headerCall2")}
                    </p>
                </div>
                <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="/results">
                        <BarChart3 className="h-4 w-4" />
                        {t("viewResultsButton")}
                    </Link>
                </Button>
            </div>

            <Tabs defaultValue="beginner" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="beginner">{t("beginnerTab")}</TabsTrigger>
                    <TabsTrigger value="intermediate">{t("intermediateTab")}</TabsTrigger>
                    <TabsTrigger value="advanced">{t("advancedTab")}</TabsTrigger>
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