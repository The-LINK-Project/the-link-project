"use client";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    FLASH_DURATION_MS,
    MAX_FLASH_CARDS,
    MIN_CARD_MS,
    type SnapshotItem,
} from "@/constants/games/snapshot";
import { DrainBar, SecondsLeft } from "./PhaseTimer";

export default function SnapshotFlash({
    card,
    index,
    startedAt,
    topic,
    onNext,
}: {
    card: SnapshotItem;
    index: number;
    startedAt: number;
    topic: string;
    onNext: () => void;
}) {
    const shownAt = useRef(0);
    useEffect(() => {
        shownAt.current = Date.now();
    }, [index]);

    const advance = useCallback(() => {
        if (Date.now() - shownAt.current < MIN_CARD_MS) return;
        onNext();
    }, [onNext]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.repeat) return;
            if (
                event.key === " " ||
                event.key === "Enter" ||
                event.key === "ArrowRight"
            ) {
                event.preventDefault();
                advance();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [advance]);

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
            <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                            {topic}
                        </p>
                        <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-ink">
                            Remember what you see
                        </p>
                    </div>
                    <div className="text-right">
                        <SecondsLeft
                            startedAt={startedAt}
                            durationMs={FLASH_DURATION_MS}
                            className="text-3xl font-bold"
                        />
                    </div>
                </div>
                <DrainBar durationMs={FLASH_DURATION_MS} />
            </div>

            <button
                type="button"
                onClick={advance}
                aria-label="Next photo"
                className="group relative mx-auto block w-full max-w-[max(18rem,calc((100dvh-24rem)*4/3))] outline-none"
            >
                {/* Two offset sheets behind the photo read as a deck of cards */}
                <span
                    aria-hidden
                    className="absolute inset-x-6 -bottom-3 top-3 rounded-2xl border border-hairline bg-surface"
                />
                <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-2xl border border-hairline bg-surface"
                />
                <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink shadow-[0_24px_60px_rgba(30,39,35,0.18)] ring-1 ring-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        key={card.slug}
                        src={card.image}
                        alt="Photo to remember"
                        draggable={false}
                        className="size-full select-none object-cover animate-in fade-in-0 zoom-in-[0.98] duration-300 motion-reduce:animate-none"
                    />
                </span>
            </button>

            <div className="mt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5" aria-label={`Photo ${index + 1} of up to ${MAX_FLASH_CARDS}`}>
                    {Array.from({ length: MAX_FLASH_CARDS }, (_, i) => (
                        <span
                            key={i}
                            className={
                                i <= index
                                    ? "h-1.5 w-4 rounded-full bg-ink transition-all duration-300"
                                    : "h-1.5 w-1.5 rounded-full bg-ink/15 transition-all duration-300"
                            }
                        />
                    ))}
                </div>
                <Button
                    onClick={advance}
                    className="h-auto gap-2 rounded-lg bg-ink px-6 py-3 text-base font-semibold text-white hover:bg-ink/90"
                >
                    Next photo
                    <kbd className="ml-1 hidden rounded border border-white/25 px-1.5 py-0.5 font-sans text-[11px] font-medium text-white/70 sm:inline">
                        Space
                    </kbd>
                    <ArrowRight className="!size-4 sm:hidden" strokeWidth={2.5} />
                </Button>
            </div>
        </div>
    );
}
