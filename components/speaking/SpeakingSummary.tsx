"use client";

import { Circle, CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { LessonStages } from "@/components/learn/LessonStages";
import { text } from "@/components/learn/ui";
import type { GoalResult } from "@/lib/speaking/conversation";

/**
 * What the learner said aloud. A goal the tutor had to say for them is shown as
 * practised, not failed: they still heard it and tried it.
 *
 * This is where a lesson ends. The talk is its second stage, so finishing it is
 * what finishes the lesson, and this is the screen that says "Lesson done!".
 */
export function SpeakingSummary({
    title,
    goals,
}: {
    title: string;
    goals: { id: string; target: string; result: GoalResult }[];
}) {
    const t = useTranslations("speaking");
    const l = useTranslations("lessons");

    return (
        <div className="flex flex-col gap-6 pb-6">
            <div className="flex flex-col gap-2 pt-2">
                <p className={text.label}>{title}</p>
                <h1 className={text.title}>{l("summaryTitle")}</h1>
                <LessonStages learn="done" speak="done" size="lg" />
                <p className={text.caption}>
                    {t("summaryCount", {
                        said: goals.filter((goal) => goal.result === "said").length,
                        total: goals.length,
                    })}
                </p>
            </div>

            <div>
                {goals.map((goal) => {
                    const said = goal.result === "said";
                    return (
                        <div key={goal.id} className="flex gap-3 border-b border-lesson-hairline py-3">
                            {said ? (
                                <CircleCheck className="size-6 shrink-0 text-lesson-success" />
                            ) : (
                                <Circle className="size-6 shrink-0 text-lesson-muted" />
                            )}
                            <div className="flex flex-1 flex-col gap-1">
                                <p className={text.bodyStrong}>{goal.target}</p>
                                <p className={text.caption}>{said ? t("summarySaid") : t("summaryHelped")}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
