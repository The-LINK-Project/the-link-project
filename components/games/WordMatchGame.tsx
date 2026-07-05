"use client";
import { useEffect, useRef, useState } from "react";
import { saveWordMatchResult } from "@/lib/actions/wordMatch.actions";
import { Button } from "@/components/ui/button";
import {
    Check,
    Timer,
    RotateCcw,
    ArrowRight,
    Trophy,
    Play,
} from "lucide-react";

type GameTile = {
    id: string;
    pairIndex: number;
    text?: string;
    imageUrl?: string;
};

type WordMatchGameProps = {
    rounds: WordMatchRoundAdmin[];
};

type GamePhase = "start" | "playing" | "finished";

const WRONG_FLASH_MS = 700;

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function buildTiles(round: WordMatchRoundAdmin): GameTile[] {
    const tiles: GameTile[] = [];
    round.pairs.forEach((pair, pairIndex) => {
        tiles.push({ id: `${pairIndex}-left`, pairIndex, ...pair.left });
        tiles.push({ id: `${pairIndex}-right`, pairIndex, ...pair.right });
    });
    return shuffle(tiles);
}

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function WordMatchGame({ rounds }: WordMatchGameProps) {
    const [roundIndex, setRoundIndex] = useState(0);
    const [phase, setPhase] = useState<GamePhase>("start");
    const [tiles, setTiles] = useState<GameTile[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [wrongIds, setWrongIds] = useState<string[]>([]);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [finalTimeMs, setFinalTimeMs] = useState(0);
    const [score, setScore] = useState(0);
    const startTimeRef = useRef(0);
    const wrongTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const round = rounds[roundIndex];
    const hasNextRound = roundIndex + 1 < rounds.length;

    // Tick the visible timer while a round is being played
    useEffect(() => {
        if (phase !== "playing") return;
        const interval = setInterval(() => {
            setElapsedMs(Date.now() - startTimeRef.current);
        }, 500);
        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        return () => {
            if (wrongTimeoutRef.current) clearTimeout(wrongTimeoutRef.current);
        };
    }, []);

    const startRound = (index: number) => {
        if (wrongTimeoutRef.current) clearTimeout(wrongTimeoutRef.current);
        setRoundIndex(index);
        setTiles(buildTiles(rounds[index]));
        setSelectedId(null);
        setMatchedPairs([]);
        setWrongIds([]);
        setWrongAttempts(0);
        setElapsedMs(0);
        startTimeRef.current = Date.now();
        setPhase("playing");
    };

    const finishRound = (finalWrongAttempts: number) => {
        const timeMs = Date.now() - startTimeRef.current;
        const finalScore = Math.max(0, 100 - finalWrongAttempts * 10);
        setFinalTimeMs(timeMs);
        setScore(finalScore);
        setPhase("finished");

        // Fire-and-forget: the game keeps working even if saving fails
        saveWordMatchResult({
            roundId: round._id,
            score: finalScore,
            timeMs,
            wrongAttempts: finalWrongAttempts,
        }).catch((error) => {
            console.error("Error saving word match result:", error);
        });
    };

    const handleTileTap = (tile: GameTile) => {
        if (phase !== "playing") return;
        if (wrongIds.length > 0) return; // locked while the wrong flash is showing
        if (matchedPairs.includes(tile.pairIndex)) return;

        // Tapping the selected tile again deselects it
        if (selectedId === tile.id) {
            setSelectedId(null);
            return;
        }

        if (!selectedId) {
            setSelectedId(tile.id);
            return;
        }

        const firstTile = tiles.find((t) => t.id === selectedId);
        if (!firstTile) {
            setSelectedId(tile.id);
            return;
        }

        if (firstTile.pairIndex === tile.pairIndex) {
            const newMatched = [...matchedPairs, tile.pairIndex];
            setMatchedPairs(newMatched);
            setSelectedId(null);
            if (newMatched.length === round.pairs.length) {
                finishRound(wrongAttempts);
            }
        } else {
            setWrongIds([firstTile.id, tile.id]);
            setWrongAttempts((prev) => prev + 1);
            setSelectedId(null);
            wrongTimeoutRef.current = setTimeout(() => {
                setWrongIds([]);
            }, WRONG_FLASH_MS);
        }
    };

    if (!round) return null;

    if (phase === "start") {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <div className="mb-4 text-5xl">🃏</div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                    {round.title}
                </h2>
                <p className="mb-2 text-lg text-muted-foreground">
                    👆 Tap two cards that match.
                </p>
                <p className="mb-8 text-sm text-muted-foreground">
                    Round {roundIndex + 1} of {rounds.length} ·{" "}
                    {round.pairs.length} pairs
                </p>
                <Button
                    size="lg"
                    className="h-14 w-full max-w-xs text-lg font-semibold"
                    onClick={() => startRound(roundIndex)}
                >
                    <Play className="mr-2 h-5 w-5" />
                    Start
                </Button>
            </div>
        );
    }

    if (phase === "finished") {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <Trophy className="mx-auto mb-4 h-14 w-14 text-amber-500" />
                <h2 className="mb-6 text-3xl font-bold text-foreground">
                    Great job! 🎉
                </h2>
                <div className="mx-auto mb-8 grid max-w-sm grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="text-2xl font-bold text-foreground">
                            {formatTime(finalTimeMs)}
                        </p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {score}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 text-lg font-semibold"
                        onClick={() => startRound(roundIndex)}
                    >
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Play again
                    </Button>
                    {hasNextRound && (
                        <Button
                            size="lg"
                            className="h-14 text-lg font-semibold"
                            onClick={() => startRound(roundIndex + 1)}
                        >
                            Next round
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                <span className="truncate font-semibold text-foreground">
                    {round.title}
                </span>
                <div className="flex shrink-0 items-center gap-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-emerald-600" />
                        {matchedPairs.length} / {round.pairs.length}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                        <Timer className="h-4 w-4" />
                        {formatTime(elapsedMs)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {tiles.map((tile) => {
                    const isMatched = matchedPairs.includes(tile.pairIndex);
                    const isWrong = wrongIds.includes(tile.id);
                    const isSelected = selectedId === tile.id;

                    let stateClasses =
                        "border-border bg-card shadow-sm hover:border-primary/60 active:scale-95";
                    if (isMatched) {
                        stateClasses =
                            "border-emerald-400 bg-emerald-50 opacity-70 scale-95";
                    } else if (isWrong) {
                        stateClasses =
                            "border-red-400 bg-red-50 text-red-600 game-shake";
                    } else if (isSelected) {
                        stateClasses =
                            "border-primary bg-primary/10 ring-2 ring-primary shadow-md scale-[1.03]";
                    }

                    return (
                        <button
                            key={tile.id}
                            type="button"
                            onClick={() => handleTileTap(tile)}
                            disabled={isMatched}
                            aria-pressed={isSelected}
                            className={`flex min-h-24 w-full select-none flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition-all duration-200 sm:min-h-28 ${stateClasses}`}
                        >
                            {tile.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={tile.imageUrl}
                                    alt={tile.text || "Picture tile"}
                                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                                />
                            )}
                            {tile.text && (
                                <span className="break-words text-lg font-semibold leading-snug sm:text-xl">
                                    {tile.text}
                                </span>
                            )}
                            {isMatched && (
                                <Check className="h-5 w-5 text-emerald-600" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
