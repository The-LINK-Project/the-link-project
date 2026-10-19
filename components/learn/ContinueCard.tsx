"use client";

import { Mic, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useLessonLocalized } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import type { ContinuePoint } from "@/lib/progress/model";
import { canPractiseSpeaking } from "@/lib/speaking/context";

import { Medallion } from "./Medallion";
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
    // How far through the stage in hand, for the bar.
    const share = point.kind === "speak" ? 0.5 : point.done / point.total;
    // How far through the whole lesson, for the ring, the same as on its card:
    // with the exercises behind them and the talk ahead, the lesson is half done.
    const half = canPractiseSpeaking(lesson) ? 0.5 : 1;
    const whole =
        point.kind === "speak" ? half : point.kind === "talk" ? half + (1 - half) * share : half * share;

    return (
        <Link
            href={href}
            aria-label={`${t("continueTitle")}. ${localized(lesson.title)}. ${where}`}
            // A key, like the lesson cards below it, in the site's own green.
            className="flex items-center gap-3 rounded-2xl border-2 border-lesson-primary-dark bg-lesson-primary p-4 shadow-[0_4px_0_#1b7a50] transition-[transform,box-shadow] duration-75 active:translate-y-1 active:shadow-none"
        >
            <span className="rounded-full bg-white">
                <Medallion icon={lesson.icon} fraction={Math.max(whole, 0.05)} done={false} size="sm">
                    {point.kind === "lesson" ? undefined : <Mic strokeWidth={2.5} />}
                </Medallion>
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
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-lesson-primary-dark shadow-[inset_0_-4px_0_#0b3d27]">
                <Play className="size-[22px] fill-white text-white" />
            </span>
        </Link>
    );
}
