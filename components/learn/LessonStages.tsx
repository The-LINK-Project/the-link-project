"use client";

import { BookOpen, Check, Mic } from "lucide-react";
import { useTranslations } from "next-intl";

import type { LessonStatus } from "@/lib/progress/model";
import { cn } from "@/lib/utils";

type StageState = "todo" | "current" | "done";

/** Which of a lesson's two stages are behind the learner, and which is next. */
export function stagesOf(status: LessonStatus): { learn: StageState; speak: StageState } {
    if (status.finished === "done") return { learn: "done", speak: "done" };
    if (status.finished === "learned") return { learn: "done", speak: "current" };
    // A talk opened from a link, with no exercises on record, is still a start.
    return { learn: status.run ? "current" : "todo", speak: status.talk ? "current" : "todo" };
}

const PALETTE: Record<StageState, string> = {
    todo: "bg-white text-lesson-muted border-lesson-border",
    current: "bg-lesson-warning-soft text-lesson-warning border-lesson-warning-fill",
    done: "bg-lesson-success text-white border-lesson-success",
};

/**
 * The two stages of a lesson, side by side: the exercises, then the talk.
 *
 * Showing both stages wherever the lesson is shown is what says the talk is
 * part of the lesson, not an extra after it.
 */
export function LessonStages({
    learn,
    speak,
    size = "sm",
}: {
    learn: StageState;
    speak: StageState;
    size?: "sm" | "lg";
}) {
    const t = useTranslations("lessons");
    return (
        // Read out by whatever holds it, which already says where the lesson stands.
        <div aria-hidden className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Stage state={learn} icon="book" label={t("stageLearn")} size={size} />
            <span className={cn("h-0.5 w-4 shrink-0 rounded-sm", learn === "done" ? "bg-lesson-success" : "bg-lesson-border")} />
            <Stage state={speak} icon="mic" label={t("stageSpeak")} size={size} />
        </div>
    );
}

function Stage({
    state,
    icon,
    label,
    size,
}: {
    state: StageState;
    icon: "book" | "mic";
    label: string;
    size: "sm" | "lg";
}) {
    const Icon = state === "done" ? Check : icon === "book" ? BookOpen : Mic;
    return (
        <span className="flex min-w-0 shrink items-center gap-1">
            <span
                className={cn(
                    "flex shrink-0 items-center justify-center rounded-full border-[1.5px]",
                    size === "lg" ? "size-9" : "size-6",
                    PALETTE[state],
                )}
            >
                <Icon className={size === "lg" ? "size-5" : "size-3.5"} strokeWidth={2.5} />
            </span>
            <span
                className={cn(
                    size === "lg" ? "text-base font-semibold leading-6" : "text-sm leading-5",
                    state === "todo" ? "text-lesson-muted" : "text-lesson-fg",
                )}
            >
                {label}
            </span>
        </span>
    );
}
