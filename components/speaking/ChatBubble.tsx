"use client";

import { Square, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { LessonButton, text } from "@/components/learn/ui";
import type { ChatMessage } from "@/lib/speaking/conversation";
import type { PlaybackSpeed } from "@/lib/speaking/playback";
import { cn } from "@/lib/utils";

/** A run of English words, kept together across the spaces between them. */
const ENGLISH_RUN = /([A-Za-z][A-Za-z'’ ]*[A-Za-z]|[A-Za-z])/;

export function ChatBubble({
    message,
    playing,
    disabled,
    onPlay,
    onStop,
}: {
    message: ChatMessage;
    playing: boolean;
    disabled?: boolean;
    onPlay: (speed: PlaybackSpeed) => void;
    onStop: () => void;
}) {
    const t = useTranslations("speaking");
    const tutor = message.role === "tutor";

    return (
        <div className={cn("flex", tutor ? "justify-start" : "justify-end")}>
            <div
                className={cn(
                    "flex max-w-[88%] flex-col gap-1 rounded-2xl p-3",
                    tutor
                        ? "rounded-tl-lg border border-lesson-border bg-white"
                        : "rounded-tr-lg bg-lesson-primary-soft",
                )}
            >
                <p className={text.label}>{tutor ? t("tutor") : t("you")}</p>

                {tutor ? (
                    <Highlighted value={message.text} />
                ) : (
                    <p className={cn(text.body, !message.text && "text-lesson-muted")}>
                        {message.text || t("notHeard")}
                    </p>
                )}

                {tutor && message.audioUri ? (
                    <div className="mt-1 flex flex-wrap gap-2">
                        <LessonButton
                            className="w-auto"
                            disabled={disabled}
                            size="sm"
                            variant="secondary"
                            title={playing ? t("stopPlayback") : t("play")}
                            icon={playing ? <Square className="size-4" /> : <Volume2 className="size-4" />}
                            onClick={playing ? onStop : () => onPlay("normal")}
                        />
                        <LessonButton
                            className="w-auto"
                            disabled={disabled}
                            size="sm"
                            variant="secondary"
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
function Highlighted({ value }: { value: string }) {
    return (
        <p className={text.body}>
            {value.split(ENGLISH_RUN).map((part, index) =>
                index % 2 === 1 ? (
                    <strong key={index} className="font-semibold text-lesson-primary-dark">
                        {part}
                    </strong>
                ) : (
                    part
                ),
            )}
        </p>
    );
}
