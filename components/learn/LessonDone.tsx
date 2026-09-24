"use client";

import { Check, CircleCheck, Clock, Ellipsis, Mic } from "lucide-react";
import { useTranslations } from "next-intl";

import { localized } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import type { LessonRecord } from "@/lib/progress/model";
import { cn } from "@/lib/utils";

import { LessonWords } from "./LessonIntro";
import { LessonStages } from "./LessonStages";
import { LessonHero } from "./LessonVisual";
import { LessonBadge, LessonButton, LessonCardBox, text } from "./ui";

/**
 * A lesson whose exercises are finished, opened again.
 *
 * It says what is done and how it went, keeps the words there to look over,
 * and leaves going through it again as a choice. With the talk still to do
 * (`speakingLeft`) the lesson is not done, and this says so.
 */
export function LessonDone({
    lesson,
    record,
    speakingLeft,
}: {
    lesson: Lesson;
    record: LessonRecord;
    /** The lesson has a talk with the tutor, and it has not been had yet. */
    speakingLeft: boolean;
}) {
    const t = useTranslations("lessons");
    const twoStages = speakingLeft || record.speaking !== undefined;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <p className={text.label}>{localized(lesson.title, "en")}</p>
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full",
                            speakingLeft ? "bg-lesson-warning-fill" : "bg-lesson-success",
                        )}
                    >
                        {speakingLeft ? (
                            <Ellipsis className="size-5 text-white" />
                        ) : (
                            <Check className="size-5 text-white" strokeWidth={3} />
                        )}
                    </span>
                    <h1 className={text.title}>{speakingLeft ? t("summaryStageTitle") : t("summaryTitle")}</h1>
                </div>
                {speakingLeft ? <p className={text.caption}>{t("summarySpeakNext")}</p> : null}
                <LessonHero lesson={lesson} />
                <div className="flex">
                    {speakingLeft ? (
                        <LessonBadge label={t("statusInProgress")} tone="warning" icon={<Clock className="size-3.5" />} />
                    ) : (
                        <LessonBadge label={t("statusDone")} tone="success" icon={<CircleCheck className="size-3.5" />} />
                    )}
                </div>
                {twoStages ? (
                    <LessonStages learn="done" speak={speakingLeft ? "current" : "done"} size="lg" />
                ) : null}
            </div>

            <LessonCardBox>
                <p className={text.label}>{t("summaryFirstTry")}</p>
                <p className={text.heading}>
                    {t("summaryOutOf", { correct: record.bestFirstTry, total: record.total })}
                </p>
            </LessonCardBox>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("introTitle")}</p>
                <LessonWords lesson={lesson} />
            </div>
        </div>
    );
}

/** Pinned to the bottom, like every other way forward in a lesson. */
export function LessonDoneActions({ onAgain, onSpeak }: { onAgain: () => void; onSpeak?: () => void }) {
    const t = useTranslations("lessons");
    if (!onSpeak) return <LessonButton title={t("summaryRetry")} size="lg" onClick={onAgain} />;
    return (
        <div className="flex flex-col gap-2">
            <LessonButton title={t("summarySpeak")} size="lg" icon={<Mic className="size-5" />} onClick={onSpeak} />
            <LessonButton title={t("summaryRetry")} variant="outline" onClick={onAgain} />
        </div>
    );
}
