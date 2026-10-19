"use client";

import { useTranslations } from "next-intl";

/**
 * Progress through a lesson.
 *
 * Fed `position / queue.length`, which only ever rises: a missed exercise is
 * added to the end of the queue rather than rewinding the bar, so a mistake
 * slows progress instead of undoing it.
 */
export function LessonProgress({ value }: { value: number }) {
    const t = useTranslations("lessons");
    const clamped = Math.max(0, Math.min(1, value));

    return (
        <div
            role="progressbar"
            aria-label={t("progress")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(clamped * 100)}
            className="h-4 flex-1 overflow-hidden rounded-full bg-lesson-key"
        >
            <div
                className="relative h-full rounded-full bg-lesson-primary transition-[width] duration-500 ease-out"
                style={{ width: `${clamped * 100}%` }}
            >
                {/* The shine along the top, as on the dashboard's keys. */}
                {clamped > 0.04 ? (
                    <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/40" />
                ) : null}
            </div>
        </div>
    );
}
