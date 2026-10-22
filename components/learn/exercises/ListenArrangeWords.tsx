"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { phraseById } from "@/lib/lessons/lookup";
import { retryOrder, seededShuffle } from "@/lib/lessons/shuffle";
import { useSpeech } from "@/lib/lessons/speech";
import type { ListenArrangeWordsExercise } from "@/lib/lessons/types";

import { SpeakerButton } from "../SpeakerButton";
import { text } from "../ui";
import { WordBank } from "../WordBank";
import { tokenIndices, type ExerciseProps } from "./shared";

/**
 * Hear a sentence, then build it from tiles.
 *
 * Nothing is written on screen before the answer, so this is listening
 * practice for a whole sentence. The sentence itself is only revealed by the
 * feedback footer, labelled as what was heard.
 */
export function ListenArrangeWords({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
    again = false,
}: ExerciseProps<ListenArrangeWordsExercise>) {
    const t = useTranslations("lessons");
    const { speak, speaking, hasPlayed } = useSpeech();
    const sentence = phraseById(lesson, exercise.phraseId)?.text ?? "";
    const tokens = useMemo(
        () => retryOrder(seededShuffle(exercise.tokens, exercise.id), exercise.id, again),
        [exercise.id, exercise.tokens, again],
    );
    const placed = draft?.kind === "tokens" ? tokenIndices(draft.tokens, tokens) : [];

    return (
        <div className="flex flex-col gap-6">
            <SpeakerButton
                onPlay={() => speak(sentence, "normal")}
                onPlaySlow={() => speak(sentence, "slow")}
                speaking={speaking}
                hasPlayed={hasPlayed}
            />
            {hasPlayed ? null : <p className={`${text.caption} text-center`}>{t("tapToListen")}</p>}
            <WordBank
                tokens={tokens}
                placed={placed}
                disabled={locked}
                placeholder={t("buildHeard")}
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
