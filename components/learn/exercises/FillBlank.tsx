"use client";

import type { FillBlankExercise } from "@/lib/lessons/types";
import { cn } from "@/lib/utils";

import { Tile } from "../Tile";
import { text } from "../ui";
import { choiceTileState, type ExerciseProps } from "./shared";

/**
 * A sentence with one gap, filled by tapping one of a few words.
 *
 * The lesson closes on this type on purpose. It is the easiest thing in the
 * run, so the learner finishes on something they get right.
 */
export function FillBlank({ exercise, draft, onDraftChange, result, locked }: ExerciseProps<FillBlankExercise>) {
    const chosen = draft?.kind === "choice" ? draft.choiceId : null;
    const chosenLabel = exercise.choices.find((choice) => choice.id === chosen)?.label;

    return (
        <div className="flex flex-col gap-8">
            {/* The sentence reads as one line with the chosen word dropped into
                the gap, so the learner can check whether it sounds right. */}
            <p className={`${text.heading} leading-9`}>
                {exercise.sentence.map((part, index) =>
                    part === null ? (
                        <span
                            key={`blank-${index}`}
                            className={cn(
                                "inline-block min-w-16 border-b-2 border-lesson-border px-1 text-center",
                                // A missed word is marked as missed, not left in the
                                // brand green that reads as right.
                                result && !result.correct
                                    ? "text-lesson-destructive line-through"
                                    : "text-lesson-primary-dark",
                            )}
                        >
                            {chosenLabel ? ` ${chosenLabel} ` : " "}
                        </span>
                    ) : (
                        <span key={`part-${index}`}>{index === 0 ? part : ` ${part} `}</span>
                    ),
                )}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                {exercise.choices.map((choice) => (
                    <Tile
                        key={choice.id}
                        label={choice.label}
                        className="min-w-20"
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
