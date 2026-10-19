"use client";

import { Check, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { LessonHeading } from "@/components/learn/LessonHeading";
import { LessonStages } from "@/components/learn/LessonStages";
import { text } from "@/components/learn/ui";
import type { Lesson } from "@/lib/lessons/types";
import type { GoalResult } from "@/lib/speaking/conversation";
import { cn } from "@/lib/utils";

/**
 * What the learner said aloud. A goal the tutor had to say for them is shown as
 * practised, not failed: they still heard it and tried it.
 *
 * This is where a lesson ends. The talk is its second stage, so finishing it is
 * what finishes the lesson, and this is the screen that says "Lesson done!".
 */
export function SpeakingSummary({
    lesson,
    goals,
}: {
    lesson: Lesson;
    goals: { id: string; target: string; result: GoalResult }[];
}) {
    const t = useTranslations("speaking");
    const l = useTranslations("lessons");

    return (
        <div className="flex flex-col gap-6 pb-6">
            <LessonHeading lesson={lesson} title={l("summaryTitle")} fraction={1} done>
                <LessonStages learn="done" speak="done" size="lg" />
                <p className={text.caption}>
                    {t("summaryCount", {
                        said: goals.filter((goal) => goal.result === "said").length,
                        total: goals.length,
                    })}
                </p>
            </LessonHeading>

            <div className="flex flex-col gap-3">
                {goals.map((goal) => {
                    const said = goal.result === "said";
                    return (
                        <div
                            key={goal.id}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl border-2 bg-white p-3",
                                said
                                    ? "border-[#58cc02] shadow-[0_4px_0_#46a302]"
                                    : "border-lesson-key shadow-[0_4px_0_var(--color-lesson-key)]",
                            )}
                        >
                            {/* Said: a green coin with a tick. Said for them: the
                                tutor's voice, heard and tried, never a cross. */}
                            <span
                                aria-hidden
                                className={cn(
                                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                                    said
                                        ? "bg-[#58cc02] text-white shadow-[inset_0_-3px_0_#46a302]"
                                        : "bg-lesson-muted-surface text-lesson-muted shadow-[inset_0_-3px_0_var(--color-lesson-key-lip)]",
                                )}
                            >
                                {said ? <Check className="size-5" strokeWidth={4} /> : <Volume2 className="size-5" />}
                            </span>
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
