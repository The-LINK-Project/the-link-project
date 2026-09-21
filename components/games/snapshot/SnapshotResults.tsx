"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SnapshotItem } from "@/constants/games/snapshot";
import type { SnapshotScore } from "@/lib/snapshotLeaderboard";
import SnapshotLeaderboard from "./SnapshotLeaderboard";

export interface SnapshotResult {
    score: number;
    seen: SnapshotItem[];
    remembered: Set<string>;
    wrongPicks: SnapshotItem[];
    recallMs: number;
}

const NAME_MAX = 16;

function useCountUp(target: number, durationMs = 900) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(target);
            return;
        }
        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        // rAF pauses in background tabs; never leave the score stuck at 0.
        const settle = setTimeout(() => setValue(target), durationMs + 100);
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(settle);
        };
    }, [target, durationMs]);
    return value;
}

export default function SnapshotResults({
    result,
    scores,
    savedId,
    onSave,
    onPlayAgain,
}: {
    result: SnapshotResult;
    scores: SnapshotScore[];
    savedId?: string;
    onSave: (name: string) => void;
    onPlayAgain: () => void;
}) {
    const [name, setName] = useState("");
    const shown = useCountUp(result.score);
    const hits = result.remembered.size;
    const total = result.seen.length;
    const wrong = result.wrongPicks.length;

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = name.trim().replace(/\s+/g, " ");
        if (trimmed) onSave(trimmed);
    };

    return (
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
            <div className="flex flex-col gap-8">
                <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                        Your score
                    </p>
                    <p className="mt-2 font-heading text-7xl font-extrabold leading-none tracking-[-0.04em] text-ink tabular-nums sm:text-8xl">
                        {shown}
                    </p>
                    <p className="mt-3 text-lg text-ink-soft">
                        You remembered{" "}
                        <span className="font-semibold text-ink">
                            {hits} of {total}
                        </span>{" "}
                        photo{total === 1 ? "" : "s"}
                        {wrong > 0 && (
                            <>
                                {" "}
                                with{" "}
                                <span className="font-semibold text-ink">
                                    {wrong} wrong pick{wrong === 1 ? "" : "s"}
                                </span>
                            </>
                        )}
                        .
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {result.seen.map((item, index) => {
                        const got = result.remembered.has(item.slug);
                        return (
                            <figure
                                key={item.slug}
                                style={{ animationDelay: `${200 + index * 45}ms` }}
                                className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-400 motion-reduce:animate-none"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-hairline">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.word}
                                        className={cn(
                                            "size-full object-cover transition-all",
                                            !got && "opacity-45 grayscale",
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "absolute right-2 top-2 flex size-6 items-center justify-center rounded-full",
                                            got
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-white/90 text-ink-soft",
                                        )}
                                    >
                                        {got ? (
                                            <Check className="size-3.5" strokeWidth={3} />
                                        ) : (
                                            <X className="size-3.5" strokeWidth={3} />
                                        )}
                                    </span>
                                </div>
                                <figcaption className="mt-1.5 flex items-baseline justify-between gap-2 text-sm">
                                    <span
                                        className={cn(
                                            "font-semibold",
                                            got ? "text-ink" : "text-ink-soft",
                                        )}
                                    >
                                        {item.word}
                                    </span>
                                    <span className="shrink-0 text-xs text-ink-soft">
                                        {got ? "Remembered" : "Missed"}
                                    </span>
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>

                {wrong > 0 && (
                    <div className="animate-in fade-in-0 duration-500 [animation-delay:500ms] fill-mode-both">
                        <p className="text-sm font-semibold text-ink">
                            Picked, but not in your photos
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {result.wrongPicks.map((item) => (
                                <span
                                    key={item.slug}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[#f3c9bd] bg-[#fdf3f0] px-3 py-1 text-sm font-medium text-[#a8321a]"
                                >
                                    <X className="size-3" strokeWidth={3} />
                                    {item.word}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="rounded-2xl bg-ink px-6 py-6 text-white sm:px-8 sm:py-7">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        How LINK teaches
                    </p>
                    <p className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl">
                        You just linked pictures to words in under a minute.
                    </p>
                    <p className="mt-2 max-w-xl leading-relaxed text-white/70">
                        Our learners do the same with English: real scenes from
                        everyday Singapore first, then the words for them, with
                        an AI tutor they can talk to out loud.
                    </p>
                </div>
            </div>

            <aside className="flex flex-col gap-4">
                {savedId ? (
                    <Button
                        onClick={onPlayAgain}
                        className="h-auto gap-2 rounded-lg bg-ink px-6 py-3.5 text-base font-semibold text-white hover:bg-ink/90"
                    >
                        Next player
                        <ArrowRight className="!size-4" strokeWidth={2.5} />
                    </Button>
                ) : (
                    <form
                        onSubmit={submit}
                        className="pb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                    >
                        <label
                            htmlFor="snapshot-name"
                            className="font-heading text-lg font-bold tracking-tight text-ink"
                        >
                            Add your score
                        </label>
                        <p className="mt-1 text-sm text-ink-soft">
                            Put a name or nickname on the board.
                        </p>
                        <div className="mt-4 flex gap-2">
                            <Input
                                id="snapshot-name"
                                autoFocus
                                autoComplete="off"
                                maxLength={NAME_MAX}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your name"
                                className="h-11 bg-white text-base"
                            />
                            <Button
                                type="submit"
                                disabled={!name.trim()}
                                className="h-11 rounded-lg bg-ink px-5 font-semibold text-white hover:bg-ink/90"
                            >
                                Save
                            </Button>
                        </div>
                        <button
                            type="button"
                            onClick={onPlayAgain}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                        >
                            <RotateCcw className="size-3.5" />
                            Skip and play again
                        </button>
                    </form>
                )}

                <SnapshotLeaderboard scores={scores} highlightId={savedId} />
            </aside>
        </div>
    );
}
