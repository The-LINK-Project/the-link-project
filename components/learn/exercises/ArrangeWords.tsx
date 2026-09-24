"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useLessonLocalized } from "@/lib/lessons/localized";
import { exercisePicture, phraseById } from "@/lib/lessons/lookup";
import { seededShuffle } from "@/lib/lessons/shuffle";
import type { ArrangeWordsExercise } from "@/lib/lessons/types";

import { PromptCard } from "../PromptCard";
import { text } from "../ui";
import { WordBank } from "../WordBank";
import { tokenIndices, type ExerciseProps } from "./shared";

/**
 * Put a shuffled English sentence back in order.
 *
 * What the sentence is for is shown above the tiles, in the learner's language,
 * so the task is the real one: I know what I want to say, how does English say
 * it? Graded on keywords, so a different arrangement that still communicates
 * passes.
 */
export function ArrangeWords({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
}: ExerciseProps<ArrangeWordsExercise>) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const phrase = phraseById(lesson, exercise.phraseId);
    const tokens = useMemo(
        () => seededShuffle(exercise.tokens, exercise.id),
        [exercise.id, exercise.tokens],
    );
    const placed = draft?.kind === "tokens" ? tokenIndices(draft.tokens, tokens) : [];

    return (
        <div className="flex flex-col gap-6">
            {phrase ? (
                <PromptCard tone="muted" picture={exercisePicture(lesson, exercise)}>
                    <p className={text.body}>{localized(phrase.meaning)}</p>
                </PromptCard>
            ) : null}
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
