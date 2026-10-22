"use client";

import { useMemo } from "react";

import { picturableVocab, vocabByIds } from "@/lib/lessons/lookup";
import { retryOrder, seededShuffle } from "@/lib/lessons/shuffle";
import type { PictureToWordExercise } from "@/lib/lessons/types";

import { PictureArt } from "../PictureTile";
import { Tile } from "../Tile";
import { choiceTileState, type ExerciseProps } from "./shared";

/**
 * A picture, and English words to choose between: the reverse of the
 * picture-choice exercise. Seeing the thing and finding its name is recall,
 * the direction a real counter demands.
 */
export function PictureToWord({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
    again = false,
}: ExerciseProps<PictureToWordExercise>) {
    const [subject] = picturableVocab(lesson, [exercise.vocabId]);
    const choices = useMemo(
        () => retryOrder(seededShuffle(vocabByIds(lesson, exercise.choiceVocabIds), exercise.id), exercise.id, again),
        [lesson, exercise.choiceVocabIds, exercise.id, again],
    );
    const chosen = draft?.kind === "choice" ? draft.choiceId : null;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-center">
                {subject?.picture ? <PictureArt picture={subject.picture} /> : null}
            </div>
            <div className="flex flex-col gap-3">
                {choices.map((choice) => (
                    <Tile
                        key={choice.id}
                        label={choice.term}
                        block
                        state={choiceTileState({
                            graded: result !== null,
                            isChosen: chosen === choice.id,
                            isAnswer: choice.id === exercise.vocabId,
                        })}
                        disabled={locked}
                        onPress={() => onDraftChange({ kind: "choice", choiceId: choice.id })}
                    />
                ))}
            </div>
        </div>
    );
}
