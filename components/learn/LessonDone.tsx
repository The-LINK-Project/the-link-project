"use client";

import { CircleCheck, Clock, MessageCircle, Mic } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Lesson } from "@/lib/lessons/types";
import type { LessonRecord } from "@/lib/progress/model";

import { LessonHeading } from "./LessonHeading";
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
            <LessonHeading
                lesson={lesson}
                title={speakingLeft ? t("summaryStageTitle") : t("summaryTitle")}
                fraction={speakingLeft ? 0.5 : 1}
                done={!speakingLeft}
            >
                {speakingLeft || lesson.chatPractice ? (
                    <p className={text.caption}>
                        {lesson.chatPractice ? t("summaryChatNext") : t("summarySpeakNext")}
                    </p>
                ) : null}
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
            </LessonHeading>

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
/**
 * A step's buttons, one under another; side by side on a phone held sideways,
 * where stacked they would leave the page above them no room.
 */
export const ACTIONS = "flex flex-col gap-2 short:flex-row short:*:min-w-0 short:*:flex-1";

export function LessonDoneActions({
    onAgain,
    resuming = false,
    onSpeak,
    onChat,
}: {
    onAgain: () => void;
    /** Another go is already part-way through, and `onAgain` carries on with it. */
    resuming?: boolean;
    onSpeak?: () => void;
    /** Present when the lesson ends in prompting practice with LINK Assistant. */
    onChat?: () => void;
}) {
    const t = useTranslations("lessons");
    if (onChat) {
        return (
            <div className={ACTIONS}>
                <LessonButton
                    title={t("summaryChat")}
                    size="lg"
                    icon={<MessageCircle className="size-5" />}
                    onClick={onChat}
                />
                <LessonButton title={t(resuming ? "continue" : "summaryRetry")} variant="outline" onClick={onAgain} />
                {onSpeak ? (
                    <LessonButton
                        title={t("summarySpeak")}
                        variant="ghost"
                        icon={<Mic className="size-5" />}
                        onClick={onSpeak}
                    />
                ) : null}
            </div>
        );
    }
    if (!onSpeak) return <LessonButton title={t(resuming ? "continue" : "summaryRetry")} size="lg" onClick={onAgain} />;
    return (
        <div className={ACTIONS}>
            <LessonButton title={t("summarySpeak")} size="lg" icon={<Mic className="size-5" />} onClick={onSpeak} />
            <LessonButton title={t(resuming ? "continue" : "summaryRetry")} variant="outline" onClick={onAgain} />
        </div>
    );
}
