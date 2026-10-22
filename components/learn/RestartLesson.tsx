"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";

import { LessonButton, text } from "./ui";

/*
 * Starting a lesson again, from anywhere in it. It sits at the top right as a
 * quiet key opposite Close, so it is there when wanted and out of the way of
 * the answer the rest of the time. Starting again throws answers away, so it
 * asks first, in the footer where the learner's thumb already is, with keeping
 * going as the easy choice.
 */

/** The key in the lesson's top bar. */
export function RestartButton({ open, onClick }: { open: boolean; onClick: () => void }) {
    const t = useTranslations("lessons");
    return (
        <button
            type="button"
            aria-label={t("restart")}
            title={t("restart")}
            aria-expanded={open}
            onClick={onClick}
            className="ml-auto flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-lesson-muted hover:bg-lesson-muted-surface aria-expanded:bg-lesson-muted-surface aria-expanded:text-lesson-ink"
        >
            <RotateCcw className="size-6" strokeWidth={2.5} />
        </button>
    );
}

/** Asked in place of the footer. `labels` word it for something other than a lesson. */
export function RestartConfirm({
    onRestart,
    onCancel,
    labels,
}: {
    onRestart: () => void;
    onCancel: () => void;
    labels?: { title: string; body: string; confirm: string; keep: string };
}) {
    const t = useTranslations("lessons");
    const title = useId();
    const body = useId();
    return (
        <div
            role="alertdialog"
            aria-labelledby={title}
            aria-describedby={body}
            onKeyDown={(event) => {
                if (event.key === "Escape") onCancel();
            }}
            className="flex flex-col gap-3 border-t-2 border-lesson-key bg-lesson-muted-surface p-4"
        >
            <div className="flex items-center gap-2">
                <RotateCcw className="size-6 shrink-0 text-lesson-ink" strokeWidth={2.5} />
                <p id={title} className={text.subheading}>
                    {labels?.title ?? t("restartTitle")}
                </p>
            </div>
            <p id={body} className={text.body}>
                {labels?.body ?? t("restartBody")}
            </p>
            <div className="flex gap-3">
                <LessonButton
                    title={labels?.confirm ?? t("restartConfirm")}
                    size="lg"
                    variant="outline"
                    className="min-w-0 flex-1"
                    onClick={onRestart}
                />
                <LessonButton
                    autoFocus
                    title={labels?.keep ?? t("restartKeep")}
                    size="lg"
                    className="min-w-0 flex-1"
                    onClick={onCancel}
                />
            </div>
        </div>
    );
}
