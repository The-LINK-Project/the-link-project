"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    POINTS_PER_HIT,
    POINTS_PER_WRONG_PICK,
    RECALL_DURATION_MS,
    type SnapshotItem,
} from "@/constants/games/snapshot";
import { DrainBar, SecondsLeft } from "./PhaseTimer";

export default function SnapshotRecall({
    options,
    picked,
    seenCount,
    startedAt,
    onToggle,
    onSubmit,
}: {
    options: SnapshotItem[];
    picked: Set<string>;
    seenCount: number;
    startedAt: number;
    onToggle: (slug: string) => void;
    onSubmit: () => void;
}) {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                            You saw {seenCount} photo{seenCount === 1 ? "" : "s"}
                        </p>
                        <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                            Which words match what you saw?
                        </h2>
                    </div>
                    <SecondsLeft
                        startedAt={startedAt}
                        durationMs={RECALL_DURATION_MS}
                        className="text-3xl font-bold"
                    />
                </div>
                <DrainBar durationMs={RECALL_DURATION_MS} />
                <p className="text-sm text-ink-soft">
                    +{POINTS_PER_HIT} for each right word · −{POINTS_PER_WRONG_PICK}{" "}
                    for a word that wasn&apos;t there
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {options.map((option, index) => {
                    const selected = picked.has(option.slug);
                    return (
                        <button
                            key={option.slug}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onToggle(option.slug)}
                            style={{ animationDelay: `${index * 25}ms` }}
                            className={cn(
                                "flex min-h-13 items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-base font-semibold outline-none transition-all duration-150",
                                "animate-in fade-in-0 slide-in-from-bottom-1 fill-mode-both motion-reduce:animate-none",
                                "focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98]",
                                selected
                                    ? "border-ink bg-ink text-white shadow-[0_8px_20px_rgba(30,39,35,0.18)]"
                                    : "border-hairline bg-surface text-ink hover:border-ink/30",
                            )}
                        >
                            <span className="leading-snug">{option.word}</span>
                            <span
                                className={cn(
                                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
                                    selected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-ink/15",
                                )}
                            >
                                {selected && (
                                    <Check className="size-3" strokeWidth={3.5} />
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-hairline pt-5">
                <span className="text-sm text-ink-soft">
                    <span className="font-semibold tabular-nums text-ink">
                        {picked.size}
                    </span>{" "}
                    selected
                </span>
                <Button
                    onClick={onSubmit}
                    className="h-auto rounded-lg bg-ink px-6 py-3 text-base font-semibold text-white hover:bg-ink/90"
                >
                    Check my answers
                </Button>
            </div>
        </div>
    );
}
