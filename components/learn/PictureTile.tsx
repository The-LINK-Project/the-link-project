"use client";

import { Check, X } from "lucide-react";

import type { PictureKey } from "@/lib/lessons/icons";
import { cn } from "@/lib/utils";

import { VocabularyVisual } from "./LessonVisual";
import type { TileState } from "./Tile";

const STATE: Record<TileState, string> = {
    default: "bg-white border-lesson-border",
    selected: "bg-lesson-primary-soft border-lesson-primary-dark",
    correct: "bg-lesson-success-soft border-lesson-success",
    incorrect: "bg-lesson-destructive-soft border-lesson-destructive",
    used: "bg-lesson-muted-surface border-lesson-hairline",
};

/**
 * A picture the learner can choose.
 *
 * Deliberately unnamed: naming the picture would hand a screen-reader user the
 * answer, so it is announced by its position instead.
 */
export function PictureTile({
    picture,
    onPress,
    state = "default",
    disabled,
    position,
}: {
    picture: PictureKey;
    onPress: () => void;
    state?: TileState;
    disabled?: boolean;
    /** Position in the row, read aloud instead of the word. */
    position: string;
}) {
    return (
        <button
            type="button"
            aria-label={position}
            aria-pressed={state === "selected" ? true : undefined}
            disabled={disabled}
            onClick={onPress}
            className={cn(
                "flex aspect-square min-w-0 flex-1 items-center justify-center rounded-2xl border-2 border-b-[6px] p-2 transition-transform",
                !disabled && "cursor-pointer active:mb-1 active:translate-y-1 active:border-b-2",
                STATE[state],
            )}
        >
            <span className="relative size-full">
                <VocabularyVisual picture={picture} size="fill" />
                {state === "correct" || state === "incorrect" ? (
                    <span
                        className={cn(
                            "absolute -bottom-0.5 -right-0.5 flex size-7 items-center justify-center rounded-full border-2 border-white",
                            state === "correct" ? "bg-lesson-success" : "bg-lesson-destructive",
                        )}
                    >
                        {state === "correct" ? (
                            <Check className="size-[18px] text-white" />
                        ) : (
                            <X className="size-[18px] text-white" />
                        )}
                    </span>
                ) : null}
            </span>
        </button>
    );
}

/**
 * A picture shown as a prompt rather than an option. Unlabelled for the same
 * reason the tiles are: it is the thing being asked about.
 */
export function PictureArt({ picture }: { picture: PictureKey }) {
    return (
        <div aria-hidden className="flex size-[164px] items-center justify-center">
            <VocabularyVisual picture={picture} size="lg" />
        </div>
    );
}
