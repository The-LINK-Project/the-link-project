"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronRight,
    Play,
    RotateCcw,
    Timer,
    Trophy,
} from "lucide-react";

type GameTile = {
    id: string;
    pairIndex: number;
    text?: string;
    imageUrl?: string;
    /** The other half of the pair, revealed on a picture tile once matched. */
    partnerText?: string;
};

type WordMatchGameProps = {
    rounds: WordMatchGameRound[];
    categories: WordMatchCategory[];
};

type GamePhase = "categories" | "rounds" | "playing" | "finished";

const WRONG_FLASH_MS = 700;

const DIFFICULTY_STYLES: Record<GameDifficulty, string> = {
    easy: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-rose-100 text-rose-700",
};

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function buildTiles(round: WordMatchGameRound): GameTile[] {
    const tiles: GameTile[] = [];
    round.pairs.forEach((pair, pairIndex) => {
        tiles.push({
            id: `${pairIndex}-left`,
            pairIndex,
            ...pair.left,
            partnerText: pair.right.text,
        });
        tiles.push({
            id: `${pairIndex}-right`,
            pairIndex,
            ...pair.right,
            partnerText: pair.left.text,
        });
    });
    return shuffle(tiles);
}

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function DifficultyBadge({ difficulty }: { difficulty: GameDifficulty }) {
    return (
        <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${DIFFICULTY_STYLES[difficulty]}`}
        >
            {difficulty}
        </span>
    );
}

export default function WordMatchGame({
    rounds,
    categories,
}: WordMatchGameProps) {
    const [phase, setPhase] = useState<GamePhase>("categories");
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [roundIndex, setRoundIndex] = useState(0);

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

    const categoryRounds = categoryId
        ? rounds.filter((round) => round.category === categoryId)
        : [];
    const round = categoryRounds[roundIndex];
    const category = categories.find((item) => item.id === categoryId);
    const hasNextRound = roundIndex + 1 < categoryRounds.length;

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
        const next = categoryRounds[index];
        if (!next) return;
        setRoundIndex(index);
        setTiles(buildTiles(next));
        setSelectedId(null);
        setMatchedPairs([]);
        setWrongIds([]);
        setWrongAttempts(0);
        setElapsedMs(0);
        startTimeRef.current = Date.now();
        setPhase("playing");
    };

    const finishRound = (finalWrongAttempts: number) => {
        setFinalTimeMs(Date.now() - startTimeRef.current);
        setScore(Math.max(0, 100 - finalWrongAttempts * 10));
        setPhase("finished");
        // Nothing is saved — results are not stored for the focus group.
    };

    const handleTileTap = (tile: GameTile) => {
        if (phase !== "playing" || !round) return;
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

    // ---------------------------------------------------------- category grid

    if (phase === "categories") {
        return (
            <div>
                <p className="mb-4 text-center text-lg font-medium text-foreground">
                    👇 Choose a topic.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {categories.map((item) => {
                        const count = rounds.filter(
                            (r) => r.category === item.id,
                        ).length;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setCategoryId(item.id);
                                    setRoundIndex(0);
                                    setPhase("rounds");
                                }}
                                className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card p-4 text-center shadow-sm transition-all hover:border-primary active:scale-95"
                            >
                                <span className="text-4xl">{item.emoji}</span>
                                <span className="text-base font-semibold leading-snug text-foreground">
                                    {item.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {count} {count === 1 ? "round" : "rounds"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------- round picker

    if (phase === "rounds") {
        return (
            <div>
                <button
                    type="button"
                    onClick={() => setPhase("categories")}
                    className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All topics
                </button>

                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                    <span>{category?.emoji}</span>
                    {category?.label}
                </h2>

                <div className="space-y-3">
                    {categoryRounds.map((item, index) => (
                        <button
                            key={item._id}
                            type="button"
                            onClick={() => startRound(index)}
                            className="group flex w-full items-center gap-4 rounded-2xl border-2 border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary active:scale-[0.98]"
                        >
                            <span className="flex-1">
                                <span className="mb-1 flex items-center gap-2">
                                    <span className="text-lg font-semibold text-foreground">
                                        {item.title}
                                    </span>
                                    <DifficultyBadge
                                        difficulty={item.difficulty}
                                    />
                                </span>
                                <span className="block text-sm text-muted-foreground">
                                    {item.pairs.length} pairs
                                </span>
                            </span>
                            <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (!round) return null;

    // -------------------------------------------------------- results screen

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
                    {hasNextRound ? (
                        <Button
                            size="lg"
                            className="h-14 text-lg font-semibold"
                            onClick={() => startRound(roundIndex + 1)}
                        >
                            Next round
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            className="h-14 text-lg font-semibold"
                            onClick={() => setPhase("categories")}
                        >
                            More topics
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // --------------------------------------------------------------- playing

    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                <button
                    type="button"
                    onClick={() => setPhase("rounds")}
                    className="flex min-w-0 items-center gap-2 text-left"
                >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate font-semibold text-foreground">
                        {round.title}
                    </span>
                </button>
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

            <p className="mb-4 text-center text-lg font-medium text-foreground">
                👆 Tap two cards that match.
            </p>

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
                            className={`flex min-h-28 w-full select-none flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition-all duration-200 sm:min-h-32 ${stateClasses}`}
                        >
                            {tile.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={tile.imageUrl}
                                    alt={tile.partnerText || "Picture"}
                                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                                />
                            )}
                            {tile.text && (
                                <span className="break-words text-base font-semibold leading-snug sm:text-lg">
                                    {tile.text}
                                </span>
                            )}
                            {/* The word is revealed only once the pair is
                                matched — captioning a picture tile up front
                                would print the answer on the card. */}
                            {isMatched && tile.imageUrl && tile.partnerText && (
                                <span className="break-words text-sm font-semibold leading-tight text-emerald-700 sm:text-base">
                                    {tile.partnerText}
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
