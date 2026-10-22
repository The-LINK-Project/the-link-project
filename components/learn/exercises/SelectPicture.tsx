"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { picturableVocab, vocabByIds } from "@/lib/lessons/lookup";
import { retryOrder, seededShuffle } from "@/lib/lessons/shuffle";
import { useSpeech } from "@/lib/lessons/speech";
import type { SelectPictureExercise } from "@/lib/lessons/types";

import { PictureTile } from "../PictureTile";
import { SpeakerButton } from "../SpeakerButton";
import { text } from "../ui";
import { choiceTileState, type ExerciseProps } from "./shared";

/**
 * A word, and pictures to choose between.
 *
 * The one exercise that asks nothing of a learner's reading beyond the single
 * prompt word, which is also spoken. That makes it the right thing to open a
 * lesson with: recognition comes before production.
 */
export function SelectPicture({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
    again = false,
}: ExerciseProps<SelectPictureExercise>) {
    const t = useTranslations("lessons");
    const { speak, speaking, hasPlayed } = useSpeech();
    const [subject] = vocabByIds(lesson, [exercise.vocabId]);
    const choices = useMemo(
        () =>
            retryOrder(
                seededShuffle(picturableVocab(lesson, exercise.choiceVocabIds), exercise.id),
                exercise.id,
                again,
            ),
        [lesson, exercise.choiceVocabIds, exercise.id, again],
    );
    const chosen = draft?.kind === "choice" ? draft.choiceId : null;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
                <p className={`${text.display} text-center`}>{subject?.term}</p>
                <SpeakerButton
                    onPlay={() => speak(subject?.term ?? "", "normal")}
                    onPlaySlow={() => speak(subject?.term ?? "", "slow")}
                    speaking={speaking}
                    hasPlayed={hasPlayed}
                    disabled={locked}
                />
            </div>
            <div className="flex gap-3">
                {choices.map((choice, index) =>
                    choice.picture ? (
                        <PictureTile
                            key={choice.id}
                            picture={choice.picture}
                            state={choiceTileState({
                                graded: result !== null,
                                isChosen: chosen === choice.id,
                                isAnswer: choice.id === exercise.vocabId,
                            })}
                            disabled={locked}
                            position={t("optionPosition", { index: index + 1, total: choices.length })}
                            onPress={() => onDraftChange({ kind: "choice", choiceId: choice.id })}
                        />
                    ) : null,
                )}
            </div>
        </div>
    );
}
