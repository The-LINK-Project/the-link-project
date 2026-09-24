"use client";

import { Loader2, Play, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/**
 * Play button for listening exercises, with an optional slow replay.
 *
 * The slow button only becomes usable once the phrase has played at normal
 * speed, so the learner's first exposure is natural pace. Its space is
 * reserved from the start: appearing later would push every tile below it
 * down under a finger that is about to tap. Nothing autoplays.
 */
export function SpeakerButton({
    onPlay,
    onPlaySlow,
    speaking,
    hasPlayed,
    disabled,
}: {
    onPlay: () => void;
    onPlaySlow: () => void;
    speaking: boolean;
    /** True once a normal-speed playback has finished. Enables the slow button. */
    hasPlayed: boolean;
    disabled?: boolean;
}) {
    const t = useTranslations("lessons");
    const slowDisabled = disabled || !hasPlayed;

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                aria-label={t("play")}
                aria-busy={speaking}
                disabled={disabled}
                onClick={onPlay}
                className={cn(
                    "flex size-24 items-center justify-center rounded-full border-b-4 border-lesson-primary-dark bg-lesson-accent transition-transform",
                    !disabled && "cursor-pointer active:mb-1 active:translate-y-1 active:border-b-0",
                    disabled && "opacity-50",
                )}
            >
                {speaking ? (
                    <Loader2 className="size-9 animate-spin text-white" />
                ) : (
                    <Volume2 className="size-10 text-white" />
                )}
            </button>

            <button
                type="button"
                aria-label={t("playSlow")}
                aria-hidden={!hasPlayed}
                tabIndex={hasPlayed ? 0 : -1}
                disabled={slowDisabled}
                onClick={onPlaySlow}
                className={cn(
                    "flex min-h-12 items-center gap-1 rounded-xl border-2 border-b-[6px] border-lesson-accent-soft bg-white px-4 transition-transform",
                    !slowDisabled && "cursor-pointer active:mb-1 active:translate-y-1 active:border-b-0",
                    !hasPlayed && "opacity-0",
                    disabled && hasPlayed && "opacity-50",
                )}
            >
                <Play className="size-5 text-lesson-accent" />
                <span className="text-sm leading-5 text-lesson-accent">{t("playSlow")}</span>
            </button>
        </div>
    );
}
