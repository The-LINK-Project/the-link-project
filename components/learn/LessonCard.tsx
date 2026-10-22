"use client";

import { Mic } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useLessonLocalized } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import { lessonStage, type LessonStatus } from "@/lib/progress/model";
import { speakingOwed } from "@/lib/speaking/context";
import { cn } from "@/lib/utils";

import { Medallion, STAGE_COLORS } from "./Medallion";

export { LESSON_ICONS } from "./Medallion";

type Props = {
    lesson: Lesson;
    status: LessonStatus;
    /** The lesson to take next. Marked, never enforced: nothing is locked. */
    next?: boolean;
    /** Shown instead of the usual status, e.g. the daily mix done for today. */
    doneLabel?: string;
    /** Present when the exercises are finished and the lesson can be said aloud. */
    speakHref?: string;
};

/**
 * Entry point for a lesson on the dashboard.
 *
 * Drawn like a key that can be pressed: a thick outline with a heavier lower
 * edge that sinks under the finger. Where the lesson stands is said three ways
 * at once, for a learner who cannot tell the colours apart or reads little:
 * the outline's colour (grey, blue for the one to start with, yellow under
 * way, green done), the ring round the lesson's picture filling up, and the
 * words above the title.
 *
 * No lesson is ever locked. Somebody who is going to the clinic tomorrow needs
 * the clinic lesson today, whatever order the list is in.
 */
export function LessonCard({ lesson, status, next = false, doneLabel, speakHref }: Props) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const { run, talk } = status;
    // Said by `doneLabel` for the daily mix, which is new again every morning.
    const stage = doneLabel ? "done" : lessonStage(status);
    const tone = STAGE_COLORS[next && stage === "new" ? "next" : stage];

    const stageLabel =
        doneLabel ??
        (stage === "done"
            ? t("statusDone")
            : stage === "progress"
              ? t("statusInProgress")
              : next
                ? t("statusNext")
                : t("statusNotStarted"));
    const detail = run
        ? t("statusStarted", run)
        : status.finished !== "learned"
          ? ""
          : talk
            ? t("continueTalk", talk)
            : t("statusSpeakingLeft");

    const fraction = progressShare(status, speakingOwed(lesson));
    // Owed, not optional, until the talk is done: it is the way to finish.
    const speakOwed = stage !== "done";

    return (
        <div
            className={cn(
                "flex flex-col rounded-2xl border-2 bg-white shadow-[0_4px_0_var(--lip)] transition-[transform,box-shadow] duration-75",
                // The whole key sinks when its main part is pressed.
                "has-[[data-card-main]:active]:translate-y-1 has-[[data-card-main]:active]:shadow-none",
            )}
            style={{ borderColor: tone.ring, ["--lip" as string]: tone.lip }}
        >
            <Link
                data-card-main
                href={`/lessons/${lesson.id}`}
                aria-label={[localized(lesson.title), stageLabel, detail].filter(Boolean).join(". ")}
                title={localized(lesson.goal)}
                className="flex items-center gap-4 rounded-2xl p-4 outline-offset-4"
            >
                <Medallion icon={lesson.icon} fraction={fraction} done={stage === "done"} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: tone.text }}>
                        {stageLabel}
                        {detail ? <span className="font-bold normal-case tracking-normal"> · {detail}</span> : null}
                    </span>
                    <span className="text-lg font-extrabold leading-6 text-[#3c3c3c]">{localized(lesson.title)}</span>
                    <span className="text-[15px] leading-5 text-[#6b6b6b]">{localized(lesson.goal)}</span>
                    {stage === "new" ? (
                        <span className="pt-1 text-[13px] font-bold text-[#8a8a8a]">
                            {t("minutes", { count: lesson.estimatedMinutes })} · {t(`level.${lesson.level}`)}
                        </span>
                    ) : null}
                </span>
            </Link>

            {speakHref ? (
                <div className="px-4 pb-4">
                    <Link
                        href={speakHref}
                        aria-label={`${t("summarySpeak")}. ${localized(lesson.title)}`}
                        className={cn(
                            "flex min-h-12 items-center justify-center gap-2 rounded-xl text-[15px] font-extrabold uppercase tracking-wide transition-[transform,box-shadow] duration-75 active:translate-y-1 active:shadow-none",
                            speakOwed
                                ? "bg-[#ffc800] text-[#4d3500] shadow-[0_4px_0_#e5a800]"
                                : // Once done, another go is an offer, not a second loud button.
                                  "border-2 border-[#e5e5e5] bg-white text-[#0b6fa4] shadow-[0_4px_0_#e5e5e5]",
                        )}
                    >
                        <Mic className="size-5" strokeWidth={3} />
                        {t("summarySpeak")}
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

/**
 * How much of the lesson is behind the learner, for the ring. A lesson with a
 * talk is two halves: the exercises, then the talk. A lesson under way always
 * shows a sliver, so it never looks the same as one not started.
 */
function progressShare({ finished, run, talk }: LessonStatus, twoStages: boolean): number {
    if (finished === "done") return 1;
    const half = twoStages ? 0.5 : 1;
    let share = 0;
    if (finished === "learned") share = half + (talk ? (1 - half) * (talk.done / talk.total) : 0);
    else if (run) share = half * (run.done / run.total);
    else if (talk) share = (1 - half) * (talk.done / talk.total);
    const started = finished !== "none" || run || talk;
    return started ? Math.max(share, 0.05) : 0;
}
