"use client";

import { MessageCircle, Mic } from "lucide-react";
import { useTranslations } from "next-intl";

import { useLessonLocalized } from "@/lib/lessons/localized";
import type { SessionSummary } from "@/lib/lessons/session";
import type { Lesson } from "@/lib/lessons/types";

import { LessonHeading } from "./LessonHeading";
import { LessonStages } from "./LessonStages";
import { LessonBadge, LessonButton, LessonCardBox, text } from "./ui";

/**
 * End of the exercises.
 *
 * Reports what was practised rather than a score out of five. For a lesson
 * with a talk, this is the end of the first stage and not of the lesson, and
 * it must not congratulate the learner on a lesson they have half done.
 */
export function LessonSummary({
    lesson,
    summary,
    speakingLeft,
    onRetry,
}: {
    lesson: Lesson;
    summary: SessionSummary;
    /** The talk with the tutor is still to come before the lesson is done. */
    speakingLeft: boolean;
    onRetry: () => void;
}) {
    const t = useTranslations("lessons");
    const native = useLessonLocalized();
    // Every exercise right the first time. Nothing coming round again is not
    // enough: a matching round with a wrong pairing in it passes, but not cleanly.
    const perfect = summary.firstTryCorrect === summary.total;

    return (
        <div className="flex flex-col gap-6 pb-6">
            <LessonHeading
                lesson={lesson}
                title={speakingLeft ? t("summaryStageTitle") : t("summaryTitle")}
                fraction={speakingLeft ? 0.5 : 1}
                done={!speakingLeft}
            >
                {perfect || summary.reviewed > 0 ? (
                    <p className={text.caption}>
                        {perfect ? t("summaryPerfect") : t("summaryReviewed", { count: summary.reviewed })}
                    </p>
                ) : null}
                {speakingLeft ? (
                    <div className="flex flex-col gap-2 pt-3">
                        <LessonStages learn="done" speak="current" size="lg" />
                        <p className={text.bodyStrong}>
                            {lesson.chatPractice ? t("summaryChatNext") : t("summarySpeakNext")}
                        </p>
                    </div>
                ) : null}
            </LessonHeading>

            <LessonCardBox>
                <p className={text.label}>{t("summaryFirstTry")}</p>
                <p className={text.heading}>
                    {t("summaryOutOf", { correct: summary.firstTryCorrect, total: summary.total })}
                </p>
            </LessonCardBox>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("summaryPractised")}</p>
                <div className="flex flex-wrap gap-2">
                    {summary.practisedTerms.map((term) => (
                        <LessonBadge key={term} label={term} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("summaryNextTime")}</p>
                {/* Ending on the phrases makes the point of the lesson concrete. */}
                {summary.phrases.map((phrase) => (
                    <div key={phrase.id} className="flex flex-col gap-1 border-b border-lesson-hairline py-2">
                        <p className={text.bodyStrong}>{phrase.text}</p>
                        <p className={text.caption}>{native(phrase.meaning)}</p>
                    </div>
                ))}
            </div>

            {/* The Singapore notes land here rather than before the exercises:
                after practising the words, the advice is about something the
                learner now has language for. */}
            {lesson.notes.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <p className={text.label}>{t("summaryGoodToKnow")}</p>
                    {lesson.notes.map((note) => (
                        <div key={note.id} className="flex gap-2 py-1">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lesson-primary-dark" />
                            <p className={`${text.caption} flex-1`}>{native(note.text)}</p>
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Doing it again is a real choice but never the next step, so it
                waits at the end of the page rather than beside the way forward. */}
            <LessonButton title={t("summaryRetry")} variant="outline" onClick={onRetry} />
        </div>
    );
}

/**
 * The way forward, pinned to the bottom of the screen. Saying the sentences
 * aloud is the second half of the lesson, so it leads. A learner who cannot
 * speak out loud right now can put it off, and the lesson waits for them, in
 * progress, until they come back to it.
 */
export function LessonSummaryActions({
    speakingLeft,
    onDone,
    onSpeak,
    onChat,
}: {
    speakingLeft: boolean;
    onDone: () => void;
    /** Present when the lesson can be said aloud. */
    onSpeak?: () => void;
    /** Present when the lesson ends in prompting practice with LINK Assistant. */
    onChat?: () => void;
}) {
    const t = useTranslations("lessons");
    // A lesson about AI goes on to a real chatbot first. Speaking stays on
    // offer underneath, in place of putting the lesson off.
    if (onChat) {
        return (
            <div className="flex flex-col gap-1">
                <LessonButton
                    title={t("summaryChat")}
                    size="lg"
                    icon={<MessageCircle className="size-5" />}
                    onClick={onChat}
                />
                {onSpeak ? (
                    <LessonButton
                        title={t("summarySpeak")}
                        variant="ghost"
                        icon={<Mic className="size-5" />}
                        onClick={onSpeak}
                    />
                ) : (
                    <LessonButton title={t("summaryDone")} variant="ghost" onClick={onDone} />
                )}
            </div>
        );
    }
    if (!onSpeak) return <LessonButton title={t("summaryDone")} size="lg" onClick={onDone} />;
    if (!speakingLeft) {
        return (
            <div className="flex flex-col gap-1">
                <LessonButton title={t("summaryDone")} size="lg" onClick={onDone} />
                <LessonButton
                    title={t("summarySpeak")}
                    variant="outline"
                    icon={<Mic className="size-5" />}
                    onClick={onSpeak}
                />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-1">
            <LessonButton title={t("summarySpeak")} size="lg" icon={<Mic className="size-5" />} onClick={onSpeak} />
            <LessonButton title={t("summarySpeakLater")} variant="ghost" onClick={onDone} />
        </div>
    );
}
