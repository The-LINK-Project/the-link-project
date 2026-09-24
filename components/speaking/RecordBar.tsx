"use client";

import { Loader2, Mic, Play, Send, Square, Trash2, X, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { LessonButton, text } from "@/components/learn/ui";
import type { RecorderStatus } from "@/lib/speaking/recorder";
import { cn } from "@/lib/utils";

function clock(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

type Props = {
    status: RecorderStatus;
    durationMs: number;
    /** Input level while recording, from 0 to 1. */
    level: number;
    /** Shown while the tutor is working, which also locks the controls. */
    busyLabel: string | null;
    notice: string | null;
    reviewPlaying: boolean;
    onRecord: () => void;
    onStop: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onPlayRecording: () => void;
    onStopPlayback: () => void;
    onSend: () => void;
};

/** The microphone controls: record, then cancel, or listen back, delete or send. */
export function RecordBar(props: Props) {
    const t = useTranslations("speaking");
    const { status, busyLabel } = props;
    const busy = busyLabel !== null;
    const caption = busyLabel ?? props.notice;

    return (
        <div className="flex flex-col gap-3 border-t border-lesson-hairline bg-white p-4 pb-6">
            {caption && status !== "idle" ? <p className={`${text.caption} text-center`}>{caption}</p> : null}

            {status === "recording" ? (
                <div className="flex items-center gap-3">
                    <RoundButton icon={X} label={t("cancel")} onPress={props.onCancel} />
                    <div
                        className="flex flex-1 items-center gap-2"
                        aria-live="polite"
                        aria-label={t("recording", { time: clock(props.durationMs) })}
                    >
                        <span className="size-2.5 animate-pulse rounded-full bg-lesson-destructive" />
                        <span className={text.bodyStrong}>{clock(props.durationMs)}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-lesson-muted-surface">
                            <span
                                className="block h-full bg-lesson-primary transition-[width] duration-100"
                                style={{ width: `${Math.round(props.level * 100)}%` }}
                            />
                        </span>
                    </div>
                    <RoundButton icon={Square} label={t("stop")} tone="danger" onPress={props.onStop} />
                </div>
            ) : status === "recorded" ? (
                <div className="flex items-center gap-3">
                    <RoundButton icon={Trash2} label={t("delete")} onPress={props.onDelete} disabled={busy} />
                    <LessonButton
                        className="flex-1"
                        variant="outline"
                        title={props.reviewPlaying ? t("stopPlayback") : t("playRecording")}
                        icon={props.reviewPlaying ? <Square className="size-[18px]" /> : <Play className="size-[18px]" />}
                        onClick={props.reviewPlaying ? props.onStopPlayback : props.onPlayRecording}
                        disabled={busy}
                    />
                    <RoundButton
                        icon={Send}
                        label={t("send")}
                        tone="primary"
                        onPress={props.onSend}
                        disabled={busy}
                        busy={busy}
                    />
                </div>
            ) : busy ? (
                <div className="flex min-h-20 items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin text-lesson-primary-dark" />
                    <p className={text.caption}>{busyLabel}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    {props.notice ? <p className={`${text.caption} text-center`}>{props.notice}</p> : null}
                    <RoundButton icon={Mic} label={t("record")} tone="primary" large onPress={props.onRecord} />
                    <p className={text.caption}>{t("tapToSpeak")}</p>
                </div>
            )}
        </div>
    );
}

function RoundButton({
    icon: Icon,
    label,
    tone = "plain",
    large = false,
    disabled = false,
    busy = false,
    onPress,
}: {
    icon: LucideIcon;
    label: string;
    tone?: "plain" | "primary" | "danger";
    large?: boolean;
    disabled?: boolean;
    busy?: boolean;
    onPress: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-busy={busy}
            disabled={disabled}
            onClick={onPress}
            className={cn(
                "flex shrink-0 cursor-pointer items-center justify-center rounded-full active:opacity-80 disabled:cursor-not-allowed",
                large ? "size-20" : "size-14",
                tone === "plain" && "bg-lesson-muted-surface text-lesson-fg",
                tone === "primary" && "bg-lesson-primary text-lesson-on-primary",
                tone === "danger" && "bg-lesson-destructive text-white",
                disabled && !busy && "opacity-50",
            )}
        >
            {busy ? (
                <Loader2 className="size-6 animate-spin" />
            ) : (
                <Icon className={large ? "size-9" : "size-6"} />
            )}
        </button>
    );
}
