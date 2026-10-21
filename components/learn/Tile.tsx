"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The one tappable surface every exercise is built from: word-bank words,
 * multiple-choice options, matching pairs.
 *
 * `used` is the state a word-bank tile takes once it has been placed in the
 * answer row. It stays in the grid at full size and is only dimmed, so the
 * bank never reflows and no tap target moves under the learner's finger while
 * they are working.
 */
export type TileState = "default" | "selected" | "correct" | "incorrect" | "used";

const STATE: Record<TileState, string> = {
    default: "bg-white border-lesson-border text-lesson-fg",
    selected: "bg-lesson-primary-soft border-lesson-primary-dark text-lesson-on-primary",
    correct: "bg-lesson-success-soft border-lesson-success text-lesson-success",
    incorrect: "bg-lesson-destructive-soft border-lesson-destructive text-lesson-destructive",
    // Kept visible rather than hidden: the learner can still read what they used.
    used: "bg-lesson-muted-surface border-lesson-hairline text-lesson-border",
};

type Props = {
    label: string;
    /** A small line icon drawn before the label, for choices that are not words. */
    icon?: ReactNode;
    /**
     * A second, quieter line under the label: the meaning of an English option
     * in the learner's own language, so choosing between English sentences
     * never depends on being able to read them.
     */
    caption?: string;
    onPress?: () => void;
    state?: TileState;
    disabled?: boolean;
    /** Fill the available width, for full-width answer choices. */
    block?: boolean;
    className?: string;
    hint?: string;
};

export function Tile({ label, icon, caption, onPress, state = "default", disabled, block, className, hint }: Props) {
    const isUsed = state === "used";
    const inert = disabled || isUsed || !onPress;

    return (
        <button
            type="button"
            aria-label={caption ? `${label}. ${caption}` : label}
            aria-description={hint}
            aria-pressed={state === "selected" ? true : undefined}
            disabled={inert}
            onClick={onPress}
            className={cn(
                // The 4px bottom edge collapses as the tile moves down, so a press
                // reads as physical even without sound.
                // `items-center` is explicit: WebKit does not stretch a button's flex
                // children, so centred text would sit left without it.
                "flex min-h-12 flex-col items-center justify-center rounded-xl border-2 border-b-[6px] px-3 py-2 transition-transform",
                !inert && "cursor-pointer active:mb-1 active:translate-y-1 active:border-b-2",
                block && "w-full",
                STATE[state],
                disabled && !isUsed && "opacity-50",
                className,
            )}
        >
            <span
                className={cn(
                    // A word too long for a narrow tile (Tamil, on a small phone)
                    // breaks inside it rather than pushing the page sideways.
                    "inline-flex items-center justify-center gap-2 text-center text-base font-semibold leading-6 [overflow-wrap:anywhere]",
                    isUsed && "opacity-55",
                )}
            >
                {icon}
                {label}
            </span>
            {caption ? (
                <span className="text-center text-sm leading-5 text-lesson-muted [overflow-wrap:anywhere]">
                    {caption}
                </span>
            ) : null}
        </button>
    );
}
