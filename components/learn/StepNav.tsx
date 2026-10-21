"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { LessonButton } from "./ui";

/*
 * Every step of a lesson has a way back, and a way on where there is one: the
 * word list, each exercise, the results, the chat and the talk. Workshop
 * facilitators walk a room through a lesson together and need to go back to
 * explain something without leaving it.
 */

/** Back, beside a step's main button. `compact` is an arrow alone on a phone (see LessonButton). */
export function BackButton({ onClick, compact = false }: { onClick: () => void; compact?: boolean }) {
    const t = useTranslations("lessons");
    return (
        <LessonButton
            title={t("back")}
            size="lg"
            variant="outline"
            icon={<ArrowLeft className="size-5" />}
            compact={compact}
            className="w-auto shrink-0 px-4"
            onClick={() => onClick()}
        />
    );
}

/** Back on the left, and the step's own way forward taking the rest of the row. */
export function WithBack({ onBack, children }: { onBack?: () => void; children: ReactNode }) {
    if (!onBack) return <>{children}</>;
    return (
        <div className="flex items-start gap-3">
            <BackButton onClick={onBack} />
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}

/**
 * Back and Next on a row of their own, for a step whose footer is busy with
 * something else: the chat's message box, the talk's record bar.
 */
export function StepNav({
    onBack,
    onNext,
    nextLabel,
}: {
    onBack: () => void;
    onNext?: () => void;
    nextLabel?: string;
}) {
    const t = useTranslations("lessons");
    return (
        <div className="flex items-center justify-between gap-3 bg-white px-4 pb-4">
            <LessonButton
                title={t("back")}
                size="sm"
                variant="outline"
                icon={<ArrowLeft className="size-4" />}
                className="w-auto px-4"
                onClick={() => onBack()}
            />
            {onNext ? (
                <LessonButton
                    title={nextLabel ?? t("next")}
                    size="sm"
                    variant="outline"
                    className="w-auto px-4"
                    onClick={() => onNext()}
                />
            ) : null}
        </div>
    );
}
