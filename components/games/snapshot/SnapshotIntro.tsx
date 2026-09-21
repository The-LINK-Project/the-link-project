"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    FLASH_DURATION_MS,
    MAX_FLASH_CARDS,
    POINTS_PER_HIT,
    POINTS_PER_WRONG_PICK,
    SNAPSHOT_PREVIEW,
    SNAPSHOT_TOPIC,
} from "@/constants/games/snapshot";
import type { SnapshotScore } from "@/lib/snapshotLeaderboard";
import SnapshotLeaderboard from "./SnapshotLeaderboard";
import SnapshotCredits from "./SnapshotCredits";

const STEPS = [
    {
        title: "Look",
        body: `Photos flash up for ${FLASH_DURATION_MS / 1000} seconds. Tap or press Space for the next one (up to ${MAX_FLASH_CARDS}).`,
    },
    {
        title: "Remember",
        body: "More photos means more points to win, and more to remember.",
    },
    {
        title: "Find the words",
        body: `Pick the word for every photo you saw. +${POINTS_PER_HIT} for each one, −${POINTS_PER_WRONG_PICK} for a word you didn't see.`,
    },
];

export default function SnapshotIntro({
    onStart,
    scores,
    onResetScores,
}: {
    onStart: () => void;
    scores: SnapshotScore[];
    onResetScores: () => void;
}) {
    return (
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                    A LINK memory game
                </p>
                <h1 className="mt-3 font-heading text-5xl font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-6xl">
                    Snapshot
                </h1>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
                    See the picture, remember it, then find its word. It&apos;s
                    the same step our learners practise every day.
                </p>

                <ol className="mt-8 grid gap-5 sm:grid-cols-3">
                    {STEPS.map((step, index) => (
                        <li key={step.title}>
                            <span className="font-heading text-2xl font-bold text-primary">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-1 font-semibold text-ink">
                                {step.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>

                <div className="relative mt-8 grid h-56 grid-cols-[1.35fr_1fr_1fr] grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-64">
                    {SNAPSHOT_PREVIEW.map((src, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={src}
                            src={src}
                            alt=""
                            style={{ animationDelay: `${index * 70}ms` }}
                            className={cn(
                                "size-full rounded-lg object-cover animate-in fade-in-0 zoom-in-[0.98] fill-mode-both duration-500 motion-reduce:animate-none",
                                index === 0 && "row-span-2 rounded-l-2xl",
                            )}
                        />
                    ))}
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-ink shadow-[0_6px_18px_rgba(30,39,35,0.18)]">
                        Topic: {SNAPSHOT_TOPIC}
                    </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                        onClick={onStart}
                        className="h-auto gap-2 rounded-lg bg-ink px-8 py-3.5 text-base font-semibold text-white hover:bg-ink/90"
                    >
                        Start
                        <ArrowRight className="!size-4" strokeWidth={2.5} />
                    </Button>
                    <span className="text-sm text-ink-soft">
                        About a minute to play
                    </span>
                </div>
            </div>

            <aside className="flex flex-col gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 [animation-delay:120ms] fill-mode-both">
                <SnapshotLeaderboard scores={scores} onReset={onResetScores} />
                <SnapshotCredits />
            </aside>
        </div>
    );
}
