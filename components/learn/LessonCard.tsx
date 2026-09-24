"use client";

import {
    Check,
    ChevronRight,
    Circle,
    CircleCheck,
    Clock,
    Ellipsis,
    HardHat,
    Mic,
    Shuffle,
    Stethoscope,
    TrainFront,
    Utensils,
    type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { LessonIcon } from "@/lib/lessons/icons";
import { useLessonLocalized } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import { lessonStage, type LessonStage, type LessonStatus } from "@/lib/progress/model";
import { canPractiseSpeaking } from "@/lib/speaking/context";
import { cn } from "@/lib/utils";

import { LessonStages, stagesOf } from "./LessonStages";
import { LessonBadge, text, type BadgeTone } from "./ui";

/** One picture per lesson, so a learner can find the lesson without reading. */
export const LESSON_ICONS: Record<LessonIcon, LucideIcon> = {
    train: TrainFront,
    clinic: Stethoscope,
    food: Utensils,
    work: HardHat,
    mix: Shuffle,
};

type Props = {
    lesson: Lesson;
    status: LessonStatus;
    /** The lesson to take next. Marked, never enforced: nothing is locked. */
    next?: boolean;
    /** Shown instead of the usual badges, e.g. the daily mix done for today. */
    doneLabel?: string;
    /** Present when the exercises are finished and the lesson can be said aloud. */
    speakHref?: string;
};

/**
 * Entry point for a lesson on the dashboard.
 *
 * Where the lesson stands is one of three things, and each looks like nothing
 * else: not started is an empty outline, in progress is yellow, done is a
 * white card with a green tick. Both of the last two have a faint lattice of
 * diamonds behind them in their colour, the way a certificate has a pattern in
 * its paper, so a card that has been touched looks different from one that has
 * not even before the colour is read. Every colour is said again by a picture
 * and by words, for a learner who cannot tell the colours apart or reads little.
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
    const twoStages = canPractiseSpeaking(lesson);

    const stageLabel =
        doneLabel ??
        (stage === "done"
            ? t("statusDone")
            : stage === "progress"
              ? t("statusInProgress")
              : next
                ? t("statusNext")
                : t("statusNotStarted"));
    // How far the stage in hand has got. A lesson being gone through again is
    // still a finished lesson: the tick stays, and the bar is the new run's.
    const bar = run ?? (status.finished === "learned" ? talk : null);
    const detail = run
        ? t("statusStarted", run)
        : status.finished !== "learned"
          ? ""
          : talk
            ? t("continueTalk", talk)
            : t("statusSpeakingLeft");

    const Icon = LESSON_ICONS[lesson.icon];
    const StageIcon = STAGE_ICON[stage];
    const tone: BadgeTone = STAGE_TONE[next && stage === "new" ? "next" : stage];

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                stage === "new" && !next && "border border-lesson-border",
                stage === "new" && next && "border-2 border-lesson-primary",
                stage === "progress" && "border-2 border-lesson-warning-fill",
                stage === "done" && "border-[1.5px] border-lesson-success",
            )}
        >
            {stage === "done" ? <Lattice color="#15803d" /> : null}
            {stage === "progress" ? <Lattice color="#eab308" /> : null}

            <Link
                href={`/lessons/${lesson.id}`}
                aria-label={[localized(lesson.title), stageLabel, detail].filter(Boolean).join(". ")}
                title={localized(lesson.goal)}
                className="relative flex items-center gap-3 p-4 transition-opacity active:opacity-85"
            >
                <span
                    className={cn(
                        "relative flex size-[52px] shrink-0 items-center justify-center rounded-xl border-[1.5px]",
                        TILE[stage],
                    )}
                >
                    <Icon className="size-[26px]" />
                    {stage === "new" ? null : (
                        <span
                            className={cn(
                                "absolute -bottom-1.5 -right-1.5 flex size-[22px] items-center justify-center rounded-full border-2 border-white",
                                stage === "done" ? "bg-lesson-success" : "bg-lesson-warning-fill",
                            )}
                        >
                            {stage === "done" ? (
                                <Check className="size-3.5 text-white" strokeWidth={3} />
                            ) : (
                                <Ellipsis className="size-3.5 text-white" strokeWidth={3} />
                            )}
                        </span>
                    )}
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={text.subheading}>{localized(lesson.title)}</span>
                    <span className={text.caption}>{localized(lesson.goal)}</span>

                    <span className="mt-1 flex flex-wrap gap-2">
                        <LessonBadge
                            label={stageLabel}
                            tone={tone}
                            icon={stage === "new" && next ? undefined : <StageIcon className="size-3.5" />}
                        />
                        {stage === "new" ? (
                            <>
                                <LessonBadge label={t("minutes", { count: lesson.estimatedMinutes })} tone="primary" />
                                {next ? null : <LessonBadge label={t(`level.${lesson.level}`)} />}
                            </>
                        ) : null}
                    </span>

                    {bar ? (
                        <span className="block h-2 overflow-hidden rounded-full bg-lesson-muted-surface">
                            <span
                                className={cn(
                                    "block h-full rounded-full",
                                    stage === "done" ? "bg-lesson-success" : "bg-lesson-warning-fill",
                                )}
                                style={{ width: `${(bar.done / bar.total) * 100}%` }}
                            />
                        </span>
                    ) : null}
                    {detail ? (
                        <span
                            className={cn(
                                "text-sm font-semibold leading-5",
                                stage === "done" ? "text-lesson-success" : "text-lesson-warning",
                            )}
                        >
                            {detail}
                        </span>
                    ) : null}
                </span>

                <ChevronRight className="size-5 shrink-0 text-lesson-muted" />
            </Link>

            {/* Under the row and as wide as the card: beside the picture there is
                no room for two labels in Bengali or Tamil. A done lesson has said
                all this with its tick. */}
            {twoStages && stage !== "done" ? (
                <div className="relative px-4 pb-3">
                    <LessonStages {...stagesOf(status)} />
                </div>
            ) : null}

            {speakHref ? (
                <Link
                    href={speakHref}
                    aria-label={`${t("summarySpeak")}. ${localized(lesson.title)}`}
                    className={cn(
                        "relative flex min-h-12 items-center justify-center gap-2 border-t px-4 transition-opacity active:opacity-85",
                        // Owed, not optional: it is the way to finish the lesson.
                        stage === "progress" && "border-lesson-warning-fill bg-lesson-warning-soft text-lesson-warning",
                        // Once done, another go is an offer, not a second green band.
                        stage === "done" && "border-lesson-success-soft bg-transparent text-lesson-primary-dark",
                        stage === "new" && "border-lesson-hairline bg-lesson-primary-soft text-lesson-primary-dark",
                    )}
                >
                    <Mic className="size-5" strokeWidth={stage === "done" ? 2 : 2.5} />
                    <span className="text-base font-semibold leading-6">{t("summarySpeak")}</span>
                </Link>
            ) : null}
        </div>
    );
}

/** Distance between diamonds in the lattice, and the half-width of one. */
const LATTICE_STEP = 26;
const DIAMOND = 3.5;

/**
 * The pattern behind a lesson that has been started or finished: small
 * diamonds in staggered rows, so faint they read as texture rather than as
 * something to look at, in the colour of the stage. Decoration only.
 */
function Lattice({ color }: { color: string }) {
    const s = LATTICE_STEP;
    const diamond = (cx: number, cy: number) =>
        `<polygon points='${cx},${cy - DIAMOND} ${cx + DIAMOND},${cy} ${cx},${cy + DIAMOND} ${cx - DIAMOND},${cy}'/>`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s * 2}'><g fill='${color}' fill-opacity='0.16'>${diamond(0, s / 2)}${diamond(s, s / 2)}${diamond(s / 2, s * 1.5)}</g></svg>`;
    return (
        <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }}
        />
    );
}

const TILE: Record<LessonStage, string> = {
    new: "bg-white text-lesson-primary-dark border-lesson-border",
    progress: "bg-lesson-warning-soft text-lesson-warning border-lesson-warning-fill",
    done: "bg-lesson-success text-white border-lesson-success",
};

const STAGE_TONE = {
    new: "neutral",
    next: "accent",
    progress: "warning",
    done: "success",
} as const;

const STAGE_ICON: Record<LessonStage, LucideIcon> = {
    new: Circle,
    progress: Clock,
    done: CircleCheck,
};
