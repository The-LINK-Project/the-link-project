"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useLessonLocalized } from "@/lib/lessons/localized";
import { choiceText } from "@/lib/lessons/lookup";
import { retryOrder } from "@/lib/lessons/shuffle";
import { useSpeech } from "@/lib/lessons/speech";
import type { ListenChooseMeaningExercise } from "@/lib/lessons/types";

import { SpeakerButton } from "../SpeakerButton";
import { Tile } from "../Tile";
import { text } from "../ui";
import { choiceTileState, type ExerciseProps } from "./shared";

/**
 * Hear an English term, choose what it means. The choices are in the learner's
 * own language, so this tests whether the spoken word was understood rather
 * than whether they can read English. The English appears in the feedback
 * footer afterwards.
 */
export function ListenChooseMeaning({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
    again = false,
}: ExerciseProps<ListenChooseMeaningExercise>) {
    const choices = useMemo(() => retryOrder(exercise.choices, exercise.id, again), [exercise, again]);
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const { speak, speaking, hasPlayed } = useSpeech();
    const chosen = draft?.kind === "choice" ? draft.choiceId : null;

    return (
        <div className="flex flex-col gap-6">
            <SpeakerButton
                onPlay={() => speak(exercise.audioText, "normal")}
                onPlaySlow={() => speak(exercise.audioText, "slow")}
                speaking={speaking}
                hasPlayed={hasPlayed}
            />
            {/* Without this, a learner who has never used an app like this has
                no cue that the circle is the thing to press. */}
            {hasPlayed ? null : <p className={`${text.caption} text-center`}>{t("tapToListen")}</p>}
            <div className="flex flex-col gap-3">
                {choices.map((choice) => (
                    <Tile
                        key={choice.id}
                        label={localized(choiceText(lesson, choice))}
                        block
                        state={choiceTileState({
                            graded: result !== null,
                            isChosen: chosen === choice.id,
                            isAnswer: choice.id === exercise.correctChoiceId,
                        })}
                        disabled={locked}
                        onPress={() => onDraftChange({ kind: "choice", choiceId: choice.id })}
                    />
                ))}
            </div>
        </div>
    );
}
