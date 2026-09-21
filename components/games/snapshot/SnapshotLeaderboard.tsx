"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SnapshotScore } from "@/lib/snapshotLeaderboard";

export default function SnapshotLeaderboard({
    scores,
    highlightId,
    limit = 10,
    onReset,
    className,
}: {
    scores: SnapshotScore[];
    highlightId?: string;
    limit?: number;
    onReset?: () => void;
    className?: string;
}) {
    const top = scores.slice(0, limit);
    const highlightRank = highlightId
        ? scores.findIndex((score) => score.id === highlightId)
        : -1;
    // A just-saved score outside the top list still gets shown, under a gap.
    const extra =
        highlightRank >= limit ? scores[highlightRank] : undefined;

    return (
        <section
            className={cn(
                "border-t-2 border-ink pt-4",
                className,
            )}
        >
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-ink">
                    Leaderboard
                </h2>
                {onReset && scores.length > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="-mr-2 h-7 px-2 text-xs text-ink-soft"
                            >
                                Reset
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Clear the leaderboard?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This removes{" "}
                                    {scores.length === 1
                                        ? "the 1 saved score"
                                        : `all ${scores.length} saved scores`}{" "}
                                    from this device. It can&apos;t be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Keep scores</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={onReset}
                                    className="bg-destructive text-white hover:bg-destructive/90"
                                >
                                    Clear board
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            {top.length === 0 ? (
                <p className="border-b border-hairline py-6 text-sm text-ink-soft">
                    No scores yet. Be the first on the board.
                </p>
            ) : (
                <ol className="divide-y divide-hairline border-b border-hairline">
                    {top.map((score, index) => (
                        <Row
                            key={score.id}
                            score={score}
                            rank={index + 1}
                            highlighted={score.id === highlightId}
                        />
                    ))}
                    {extra && (
                        <>
                            <li
                                aria-hidden
                                className="py-1.5 text-xs tracking-[0.3em] text-ink-soft"
                            >
                                ···
                            </li>
                            <Row score={extra} rank={highlightRank + 1} highlighted />
                        </>
                    )}
                </ol>
            )}
        </section>
    );
}

function Row({
    score,
    rank,
    highlighted,
}: {
    score: SnapshotScore;
    rank: number;
    highlighted: boolean;
}) {
    return (
        <li className="flex items-baseline gap-4 py-3">
            <span
                className={cn(
                    "w-6 shrink-0 font-heading text-sm font-bold tabular-nums",
                    rank <= 3 || highlighted ? "text-ink" : "text-ink-soft",
                )}
            >
                {String(rank).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                    <span className="truncate font-semibold text-ink">
                        {score.name}
                    </span>
                    {highlighted && (
                        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-eyebrow">
                            You
                        </span>
                    )}
                </span>
                <span className="block truncate text-xs text-ink-soft">
                    {score.hits} of {score.seen} photos remembered
                </span>
            </span>
            <span className="font-heading text-xl font-bold tabular-nums tracking-tight text-ink">
                {score.score}
            </span>
        </li>
    );
}
