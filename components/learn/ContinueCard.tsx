"use client";

import { Mic, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useLessonLocalized } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import type { ContinuePoint } from "@/lib/progress/model";

import { LESSON_ICONS } from "./LessonCard";
import { text } from "./ui";

/**
 * The one thing at the top of the dashboard when something was left unfinished.
 *
 * A learner who was interrupted should not have to find their lesson in a list
 * and wonder whether it will start again. This says what it was, how far they
 * got, and goes there.
 */
export function ContinueCard({ lesson, point, href }: { lesson: Lesson; point: ContinuePoint; href: string }) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const where =
        point.kind === "speak"
            ? t("statusSpeakingLeft")
            : point.kind === "talk"
              ? t("continueTalk", { done: point.done, total: point.total })
              : t("statusStarted", { done: point.done, total: point.total });
    // With the exercises behind them and the talk ahead, the lesson is half done.
    const share = point.kind === "speak" ? 0.5 : point.done / point.total;
    const Icon = point.kind === "lesson" ? LESSON_ICONS[lesson.icon] : Mic;

    return (
        <Link
            href={href}
            aria-label={`${t("continueTitle")}. ${localized(lesson.title)}. ${where}`}
            className="flex items-center gap-3 rounded-2xl bg-lesson-primary p-4 shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-opacity active:opacity-90"
        >
            <span className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-lesson-primary-soft">
                <Icon className="size-[26px] text-lesson-on-primary" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={`${text.label} text-lesson-on-primary`}>{t("continueTitle")}</span>
                <span className={`${text.subheading} text-lesson-on-primary`}>{localized(lesson.title)}</span>
                <span className="mt-1 block h-2 overflow-hidden rounded-full bg-lesson-primary-soft">
                    <span
                        className="block h-full rounded-full bg-lesson-primary-dark"
                        style={{ width: `${share * 100}%` }}
                    />
                </span>
                <span className={`${text.caption} text-lesson-on-primary`}>{where}</span>
            </span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-lesson-primary-dark">
                <Play className="size-[22px] fill-white text-white" />
            </span>
        </Link>
    );
}
