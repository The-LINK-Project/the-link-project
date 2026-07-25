import React from "react";
import { getAllLessonStatuses } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import { ensureUser } from "@/lib/actions/user.actions";
import DashboardLessonItem from "@/components/dashboard/DashboardLessonItem";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FOCUS_GROUP_STAGES } from "@/constants/games/focusGroup";

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

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("gamesTitle")}
                </h2>
                <p className="text-gray-600 mb-4">{t("gamesSubtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href="/games/word-match"
                        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                    >
                        <span className="text-4xl">🃏</span>
                        <span className="flex-1">
                            <span className="block text-lg font-semibold text-foreground">
                                Word Match
                            </span>
                            <span className="block text-sm text-muted-foreground">
                                {t("wordMatchDescription")}
                            </span>
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                    <Link
                        href="/games/picture-story"
                        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                    >
                        <span className="text-4xl">📖</span>
                        <span className="flex-1">
                            <span className="block text-lg font-semibold text-foreground">
                                Picture Story
                            </span>
                            <span className="block text-sm text-muted-foreground">
                                {t("pictureStoryDescription")}
                            </span>
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                    <Link
                        href="/games/focus-group"
                        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md md:col-span-2"
                    >
                        <span className="text-4xl">🏁</span>
                        <span className="flex-1">
                            <span className="block text-lg font-semibold text-foreground">
                                Focus Group July 2026
                            </span>
                            <span className="block text-sm text-muted-foreground">
                                {FOCUS_GROUP_STAGES.length} stages, played
                                straight through. A time trial.
                            </span>
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;