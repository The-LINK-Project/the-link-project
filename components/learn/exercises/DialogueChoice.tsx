"use client";

import { Loader2, User, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useLessonLocalized } from "@/lib/lessons/localized";
import { dialogueReplies } from "@/lib/lessons/lookup";
import { retryOrder, seededShuffle } from "@/lib/lessons/shuffle";
import { useSpeech } from "@/lib/lessons/speech";
import type { DialogueChoiceExercise } from "@/lib/lessons/types";

import { Tile } from "../Tile";
import { text } from "../ui";
import { choiceTileState, type ExerciseProps } from "./shared";

/**
 * Somebody says something; the learner picks what to say back.
 *
 * The other person's line sits in a speech bubble with a speaker, its English
 * on top and its meaning underneath, so the learner is never stuck on a line
 * they cannot read. Every reply carries its meaning too.
 */
export function DialogueChoice({
    exercise,
    lesson,
    draft,
    onDraftChange,
    result,
    locked,
    again = false,
}: ExerciseProps<DialogueChoiceExercise>) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const { speak, speaking } = useSpeech();
    const chosen = draft?.kind === "choice" ? draft.choiceId : null;
    const replies = useMemo(
        () => retryOrder(seededShuffle(dialogueReplies(lesson, exercise), exercise.id), exercise.id, again),
        [lesson, exercise, again],
    );

    return (
        <div className="flex flex-col gap-4">
            <p className={text.caption}>{localized(exercise.situation)}</p>

            <div className="flex items-center gap-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lesson-primary-soft">
                    <User className="size-[22px] text-lesson-primary-dark" />
                </span>
                <div className="flex flex-1 flex-col gap-1 rounded-2xl rounded-tl-lg border border-lesson-border bg-white p-3">
                    <p className={text.bodyStrong}>{exercise.line}</p>
                    <p className={text.caption}>{localized(exercise.lineMeaning)}</p>
                </div>
                <button
                    type="button"
                    aria-label={t("play")}
                    aria-busy={speaking}
                    onClick={() => speak(exercise.line, "normal")}
                    className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-lesson-accent active:opacity-80"
                >
                    {speaking ? (
                        <Loader2 className="size-6 animate-spin text-white" />
                    ) : (
                        <Volume2 className="size-6 text-white" />
                    )}
                </button>
            </div>

            <p className={text.caption}>{t("yourReply")}</p>

            <div className="flex flex-col gap-3">
                {replies.map((reply) => (
                    <Tile
                        key={reply.id}
                        label={reply.text}
                        caption={localized(reply.meaning)}
                        block
                        state={choiceTileState({
                            graded: result !== null,
                            isChosen: chosen === reply.id,
                            isAnswer: reply.id === exercise.phraseId,
                        })}
                        disabled={locked}
                        onPress={() => onDraftChange({ kind: "choice", choiceId: reply.id })}
                    />
                ))}
            </div>
        </div>
    );
}
