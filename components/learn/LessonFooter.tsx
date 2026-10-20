"use client";

import { ArrowLeft, CircleCheck, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import type { GradeResult } from "@/lib/lessons/types";
import { cn } from "@/lib/utils";

import { LessonButton, text } from "./ui";

/**
 * The footer that grades the lesson: Check while answering, then the outcome
 * banner and Continue, with Back beside them to step to the exercise before.
 *
 * Correctness is carried by an icon and a word as well as colour. Green and
 * red look nearly identical under the common forms of colour blindness, so hue
 * is reinforcement rather than the message.
 */
type Props = {
    phase: "answering" | "graded";
    /** Whether a draft answer exists, so Check can be enabled. */
    canSubmit: boolean;
    result: GradeResult | null;
    onSubmit: () => void;
    onNext: () => void;
    /** Changes Continue to Finish on the final step. */
    isLastStep: boolean;
    /** Hidden for self-grading exercises, which advance on their own. */
    hideSubmit?: boolean;
    /** Steps back to the exercise before. Absent where there is nothing to go back to. */
    onBack?: () => void;
    /**
     * On an exercise already answered, after stepping back. It can be passed
     * without answering it again.
     */
    revisiting?: boolean;
};

export function LessonFooter({
    phase,
    canSubmit,
    result,
    onSubmit,
    onNext,
    isLastStep,
    hideSubmit,
    onBack,
    revisiting,
}: Props) {
    const t = useTranslations("lessons");
    const graded = phase === "graded" && result;

    // A short buzz on phones that support it, standing in for the mobile
    // app's haptic on the moment of grading.
    useEffect(() => {
        if (!graded) return;
        try {
            navigator.vibrate?.(result.correct ? 30 : [40, 60, 40]);
        } catch {
            // Not every browser allows it; it is only reinforcement.
        }
    }, [graded, result?.correct]);

    const back = onBack ? (
        <LessonButton
            title={t("back")}
            size="lg"
            variant="outline"
            icon={<ArrowLeft className="size-5" />}
            className="w-auto shrink-0 px-4"
            onClick={() => onBack()}
        />
    ) : null;

    if (!graded) {
        if (hideSubmit && !back && !revisiting) return null;
        return (
            <div className="flex gap-3 bg-white p-4">
                {back}
                {hideSubmit ? (
                    <div className="flex-1" />
                ) : (
                    <LessonButton
                        title={t("check")}
                        size="lg"
                        disabled={!canSubmit}
                        onClick={() => onSubmit()}
                        aria-description={canSubmit ? undefined : t("checkHint")}
                        className="min-w-0 flex-1"
                    />
                )}
                {revisiting ? (
                    <LessonButton
                        title={t("next")}
                        size="lg"
                        variant="outline"
                        className="w-auto shrink-0 px-4"
                        onClick={() => onNext()}
                    />
                ) : null}
            </div>
        );
    }

    return (
        <div
            role="status"
            className={cn(
                "flex flex-col gap-3 border-t p-4",
                result.correct
                    ? "border-lesson-success bg-lesson-success-soft"
                    : "border-lesson-destructive bg-lesson-destructive-soft",
            )}
        >
            <div className="flex items-center gap-2">
                {result.correct ? (
                    <CircleCheck className="size-7 text-lesson-success" />
                ) : (
                    <CircleX className="size-7 text-lesson-destructive" />
                )}
                <p
                    className={cn(
                        text.subheading,
                        result.correct ? "text-lesson-success" : "text-lesson-destructive",
                    )}
                >
                    {result.correct
                        ? result.accepted
                            ? t("acceptedTitle")
                            : t("correctTitle")
                        : t("incorrectTitle")}
                </p>
            </div>

            {/* The model answer is shown after a miss, and when the learner was
                right but phrased it differently. What was spoken in a listening
                exercise is shown every time: this is where the sound and the
                written word are joined. */}
            {!result.modelAnswer ||
            (result.correct && !result.accepted && result.modelAnswerKind !== "audio") ? null : (
                <p className={text.caption}>
                    {t(result.modelAnswerKind === "audio" ? "audioWas" : "modelAnswer")}{" "}
                    <span className={text.bodyStrong}>{result.modelAnswer}</span>
                </p>
            )}

            {result.missing?.length ? (
                <p className={text.caption}>{t("missingWords", { words: result.missing.join(", ") })}</p>
            ) : null}

            <div className="flex gap-3">
                {back}
                <LessonButton
                    autoFocus
                    title={isLastStep ? t("finish") : result.correct ? t("continue") : t("gotIt")}
                    size="lg"
                    variant={result.correct ? "primary" : "destructive"}
                    onClick={() => onNext()}
                    className="min-w-0 flex-1"
                />
            </div>
        </div>
    );
}
