"use client";

import { Square, UserRound, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { LESSON_HUES } from "@/components/learn/Medallion";
import { LessonButton, text } from "@/components/learn/ui";
import type { LessonIcon } from "@/lib/lessons/icons";
import type { ChatMessage } from "@/lib/speaking/conversation";
import type { EnglishSplitter } from "@/lib/speaking/highlight";
import type { PlaybackSpeed } from "@/lib/speaking/playback";
import { cn } from "@/lib/utils";

export function ChatBubble({
    message,
    english,
    icon,
    playing,
    disabled,
    onPlay,
    onStop,
}: {
    message: ChatMessage;
    /** From `englishSplitter`: what counts as English in this talk's language. */
    english: EnglishSplitter;
    /** The lesson's picture, whose colour the tutor wears. */
    icon: LessonIcon;
    playing: boolean;
    disabled?: boolean;
    onPlay: (speed: PlaybackSpeed) => void;
    onStop: () => void;
}) {
    const t = useTranslations("speaking");
    const tutor = message.role === "tutor";
    const hue = LESSON_HUES[icon];

    return (
        <div className={cn("flex items-end gap-2", tutor ? "justify-start" : "justify-end")}>
            {tutor ? (
                // The tutor plays someone in the lesson's scene, so they wear
                // the lesson's colour, on a coin like the lesson's own.
                <span
                    aria-hidden
                    className="mb-1 flex size-10 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: hue.base, boxShadow: `inset 0 -3px 0 ${hue.dark}` }}
                >
                    <UserRound className="size-5" strokeWidth={2.5} />
                </span>
            ) : null}
            <div
                className={cn(
                    "flex max-w-[85%] flex-col gap-1 rounded-2xl border-2 px-4 py-3",
                    tutor
                        ? "rounded-bl-md border-lesson-key bg-white shadow-[0_4px_0_var(--color-lesson-key)]"
                        : "rounded-br-md border-[#c3efd9] bg-lesson-primary-soft shadow-[0_4px_0_#c3efd9]",
                )}
            >
                <p className="sr-only">{tutor ? t("tutor") : t("you")}</p>

                {tutor ? (
                    <Highlighted value={message.text} english={english} />
                ) : (
                    <p className={cn(text.body, !message.text && "text-lesson-muted")}>
                        {message.text || t("notHeard")}
                    </p>
                )}

                {tutor && message.audioUri ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                        <LessonButton
                            className="w-auto"
                            disabled={disabled}
                            size="sm"
                            variant="outline"
                            title={playing ? t("stopPlayback") : t("play")}
                            icon={playing ? <Square className="size-4" /> : <Volume2 className="size-4" />}
                            onClick={playing ? onStop : () => onPlay("normal")}
                        />
                        <LessonButton
                            className="w-auto"
                            disabled={disabled}
                            size="sm"
                            variant="outline"
                            title={t("playSlow")}
                            onClick={() => onPlay("slow")}
                        />
                    </div>
                ) : null}
                {tutor && !message.audioUri ? <p className={text.caption}>{t("noAudio")}</p> : null}
            </div>
        </div>
    );
}

/**
 * The tutor's line with its English picked out. That English is what the
 * learner is here to learn, so it carries weight as well as colour.
 */
function Highlighted({ value, english }: { value: string; english: EnglishSplitter }) {
    return (
        <p className={text.body}>
            {english(value).map((part, index) =>
                index % 2 === 1 ? (
                    <strong key={index} className="font-bold text-lesson-primary-dark">
                        {part}
                    </strong>
                ) : (
                    part
                ),
            )}
        </p>
    );
}
