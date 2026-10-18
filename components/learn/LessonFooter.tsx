"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import type { GradeResult } from "@/lib/lessons/types";
import { cn } from "@/lib/utils";

import { LessonButton, text } from "./ui";

/**
 * The footer that grades the lesson: Check while answering, then the outcome
 * banner and Continue.
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
};

export function LessonFooter({ phase, canSubmit, result, onSubmit, onNext, isLastStep, hideSubmit }: Props) {
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

    if (!graded) {
        if (hideSubmit) return null;
        return (
            <div className="bg-white p-4">
                <LessonButton
                    title={t("check")}
                    size="lg"
                    disabled={!canSubmit}
                    onClick={() => onSubmit()}
                    aria-description={canSubmit ? undefined : t("checkHint")}
                />
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

            <LessonButton
                autoFocus
                title={isLastStep ? t("finish") : result.correct ? t("continue") : t("gotIt")}
                size="lg"
                variant={result.correct ? "primary" : "destructive"}
                onClick={() => onNext()}
            />
        </div>
    );
}
