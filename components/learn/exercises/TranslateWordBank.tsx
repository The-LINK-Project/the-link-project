"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useLessonLocalized } from "@/lib/lessons/localized";
import { exercisePicture } from "@/lib/lessons/lookup";
import { seededShuffle } from "@/lib/lessons/shuffle";
import type { TranslateWordBankExercise } from "@/lib/lessons/types";

import { PromptCard } from "../PromptCard";
import { text } from "../ui";
import { WordBank } from "../WordBank";
import { tokenIndices, type ExerciseProps } from "./shared";

/**
 * Say something in English, prompted in the learner's own language.
 *
 * The hardest thing in the lesson: full production with no English on screen
 * to copy from. Answered with tiles, and graded on keywords so word order and
 * articles do not decide the outcome while decoy tiles are still rejected.
 */
export function TranslateWordBank({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
}: ExerciseProps<TranslateWordBankExercise>) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const tokens = useMemo(
        () => seededShuffle(exercise.tokens, exercise.id),
        [exercise.id, exercise.tokens],
    );
    const placed = draft?.kind === "tokens" ? tokenIndices(draft.tokens, tokens) : [];

    return (
        <div className="flex flex-col gap-6">
            <PromptCard picture={exercisePicture(lesson, exercise)}>
                <p className={text.heading}>{localized(exercise.prompt)}</p>
            </PromptCard>
            <WordBank
                tokens={tokens}
                placed={placed}
                disabled={locked}
                placeholder={t("buildSentence")}
                outcome={result ? (result.correct ? "correct" : "incorrect") : undefined}
                onChange={(next) =>
                    onDraftChange(
                        next.length === 0 ? null : { kind: "tokens", tokens: next.map((i) => tokens[i]) },
                    )
                }
            />
        </div>
    );
}
