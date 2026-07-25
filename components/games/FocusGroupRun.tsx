"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PicturePanel from "@/components/games/PicturePanel";
import { FREEZE_MS, REVEAL_AFTER_WRONG } from "@/constants/games/focusGroup";
import { MATCH_COOLDOWN_MS } from "@/constants/games/wordMatch";
import { Check, Play, Timer, Trophy } from "lucide-react";

type RunPhase = "start" | "running" | "finished";

const CORRECT_FLASH_MS = 800;

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type StageProps = {
    locked: boolean;
    /** Increments each time the answer should be revealed for this stage. */
    revealNonce: number;
    onWrong: () => void;
    onHintUsed: () => void;
    onComplete: () => void;
};

// --------------------------------------------------------------- word match

type Tile = {
    id: string;
    pairIndex: number;
    text?: string;
    imageUrl?: string;
    partnerText?: string;
};

function WordMatchStage({
    round,
    locked,
    revealNonce,
    onWrong,
    onHintUsed,
    onComplete,
}: StageProps & { round: WordMatchGameRound }) {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [matched, setMatched] = useState<number[]>([]);
    const [hintPair, setHintPair] = useState<number | null>(null);

    // State is read through refs because taps can arrive faster than React
    // re-renders. Reading `selectedId` from state meant a tap landing straight
    // after a match still saw the just-matched tile as selected, compared
    // against it, and scored a wrong answer nobody had made.
    const selectedRef = useRef<string | null>(null);
    const matchedRef = useRef<number[]>([]);
    const coolingRef = useRef(false);
    const doneRef = useRef(false);
    const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const built: Tile[] = [];
        round.pairs.forEach((pair, pairIndex) => {
            built.push({
                id: `${pairIndex}-l`,
                pairIndex,
                ...pair.left,
                partnerText: pair.right.text,
            });
            built.push({
                id: `${pairIndex}-r`,
                pairIndex,
                ...pair.right,
                partnerText: pair.left.text,
            });
        });
        setTiles(shuffle(built));
        setSelectedId(null);
        setMatched([]);
        setHintPair(null);
        selectedRef.current = null;
        matchedRef.current = [];
        coolingRef.current = false;
        doneRef.current = false;
    }, [round]);

    useEffect(() => {
        return () => {
            if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
        };
    }, []);

    // Reveal shows ONE unmatched pair rather than solving the whole board.
    useEffect(() => {
        if (revealNonce === 0) return;
        setHintPair((current) => {
            if (current !== null) return current;
            const next = round.pairs.findIndex((_, i) => !matched.includes(i));
            return next === -1 ? null : next;
        });
        // matched is intentionally not a dependency: the hint is chosen once,
        // at the moment the reveal is triggered.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealNonce, round]);

    const tap = (tile: Tile) => {
        if (locked || doneRef.current || coolingRef.current) return;
        if (matchedRef.current.includes(tile.pairIndex)) return;

        if (selectedRef.current === tile.id) {
            selectedRef.current = null;
            setSelectedId(null);
            return;
        }
        if (!selectedRef.current) {
            selectedRef.current = tile.id;
            setSelectedId(tile.id);
            return;
        }

        const first = tiles.find((t) => t.id === selectedRef.current);
        selectedRef.current = null;
        setSelectedId(null);
        if (!first) return;

        if (first.pairIndex !== tile.pairIndex) {
            onWrong();
            return;
        }

        // Correct: briefly ignore input so a fast follow-up tap is not read as
        // the start of a new, mismatched pair.
        coolingRef.current = true;
        cooldownTimer.current = setTimeout(() => {
            coolingRef.current = false;
        }, MATCH_COOLDOWN_MS);

        const next = [...matchedRef.current, tile.pairIndex];
        matchedRef.current = next;
        setMatched(next);
        if (hintPair === tile.pairIndex) {
            setHintPair(null);
            onHintUsed();
        }
        if (next.length === round.pairs.length) {
            doneRef.current = true;
            onComplete();
        }
    };

    return (
        <div>
            <p className="mb-4 text-center text-xl font-semibold text-foreground">
                Tap the two cards that match.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {tiles.map((tile) => {
                    const isMatched = matched.includes(tile.pairIndex);
                    const isSelected = selectedId === tile.id;
                    const isHinted = hintPair === tile.pairIndex && !isMatched;

                    let frontClasses =
                        "border-border bg-card shadow-sm";
                    if (isHinted) {
                        frontClasses =
                            "border-amber-400 bg-amber-50 ring-2 ring-amber-400";
                    } else if (isSelected) {
                        frontClasses =
                            "border-primary bg-primary/10 ring-2 ring-primary shadow-md";
                    }

                    return (
                        <button
                            key={tile.id}
                            type="button"
                            onClick={() => tap(tile)}
                            disabled={isMatched || locked}
                            className="flip-scene h-28 w-full select-none sm:h-32"
                        >
                            <span
                                className={`flip-card ${isMatched ? "is-flipped" : ""}`}
                            >
                                {/* Front: the picture or the word */}
                                <span className={`flip-face ${frontClasses}`}>
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
                                </span>

                                {/* Back: the "Matched" face */}
                                <span className="flip-face flip-back border-emerald-400 bg-emerald-50 text-emerald-700">
                                    <Check className="h-6 w-6" />
                                    <span className="text-base font-bold sm:text-lg">
                                        Matched
                                    </span>
                                    {tile.imageUrl && tile.partnerText && (
                                        <span className="break-words text-sm font-semibold leading-tight">
                                            {tile.partnerText}
                                        </span>
                                    )}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
            {hintPair !== null && (
                <p className="mt-4 text-center text-base font-semibold text-amber-600">
                    👆 These two go together.
                </p>
            )}
        </div>
    );
}

// ------------------------------------------------------------- picture story

function PictureStage({
    question,
    locked,
    revealNonce,
    onWrong,
    onComplete,
}: StageProps & { question: PictureStoryQuestion }) {
    const isOrder = question.type === "order";
    const [selected, setSelected] = useState<number | null>(null);
    const [picks, setPicks] = useState<number[]>([]);
    const [wrongFlash, setWrongFlash] = useState<number | null>(null);
    // Set the moment the stage is answered, so a tap during the green
    // confirmation is not scored against the next stage.
    const doneRef = useRef(false);

    const options = useMemo(
        () =>
            shuffle(
                question.options.map((text, originalIndex) => ({
                    text,
                    originalIndex,
                })),
            ),
        [question],
    );

    const panels = useMemo(
        () =>
            isOrder
                ? shuffle(
                      question.sequence.map((src, correctIndex) => ({
                          src,
                          correctIndex,
                      })),
                  )
                : [],
        [question, isOrder],
    );

    const revealed = revealNonce > 0;

    useEffect(() => {
        setSelected(null);
        setPicks([]);
        setWrongFlash(null);
        doneRef.current = false;
    }, [question]);

    // Clear the red highlight on the wrong option once the freeze ends
    useEffect(() => {
        if (!locked) setWrongFlash(null);
    }, [locked]);

    const tapOption = (index: number) => {
        if (locked || doneRef.current) return;
        if (options[index].originalIndex === question.correctAnswerIndex) {
            setSelected(index);
            doneRef.current = true;
            onComplete();
        } else {
            setWrongFlash(index);
            onWrong();
        }
    };

    const tapPanel = (index: number) => {
        if (locked || doneRef.current || picks.includes(index)) return;
        const next = [...picks, index];
        // Wrong the moment a panel goes in the wrong slot — no waiting
        if (panels[index].correctIndex !== picks.length) {
            setPicks([]);
            onWrong();
            return;
        }
        setPicks(next);
        if (next.length === panels.length) {
            doneRef.current = true;
            onComplete();
        }
    };

    return (
        <div>
            {isOrder ? (
                <>
                    <p className="mb-4 text-center text-xl font-semibold text-foreground">
                        {question.prompt ?? "Put the pictures in the right order."}
                    </p>
                    {revealed && (
                        <div className="mb-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
                            <p className="mb-3 text-center text-sm font-semibold text-amber-700">
                                The right order is:
                            </p>
                            <div className="flex flex-wrap items-start justify-center gap-2">
                                {question.sequence.map((item, index) => (
                                    <span
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        {index > 0 && (
                                            <span
                                                aria-hidden="true"
                                                className="mt-5 text-xl text-muted-foreground"
                                            >
                                                →
                                            </span>
                                        )}
                                        <PicturePanel
                                            item={item}
                                            size="sm"
                                            caption={question.captions?.[index]}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {panels.map((panel, index) => {
                            const position = picks.indexOf(index);
                            const picked = position !== -1;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => tapPanel(index)}
                                    disabled={locked || picked}
                                    className={`relative flex min-h-36 items-center justify-center rounded-2xl border-2 p-3 pt-8 shadow-sm transition-all duration-200 ${
                                        picked
                                            ? "border-primary bg-primary/10 ring-2 ring-primary"
                                            : "border-border bg-card active:scale-95"
                                    }`}
                                >
                                    <PicturePanel
                                        item={panel.src}
                                        caption={
                                            question.captions?.[
                                                panel.correctIndex
                                            ]
                                        }
                                        wide
                                    />
                                    {picked && (
                                        <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            {position + 1}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-5 flex flex-wrap items-start justify-center gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm sm:gap-3">
                        {question.sequence.map((item, index) => (
                            <span
                                key={index}
                                className="flex items-start gap-2 sm:gap-3"
                            >
                                {index > 0 && (
                                    <span
                                        aria-hidden="true"
                                        className="mt-8 text-2xl text-muted-foreground sm:mt-10"
                                    >
                                        →
                                    </span>
                                )}
                                <PicturePanel item={item} />
                            </span>
                        ))}
                    </div>
                    <p className="mb-4 text-center text-xl font-semibold text-foreground">
                        {question.prompt ?? "Tap the correct sentence."}
                    </p>
                    <div className="space-y-3">
                        {options.map((option, index) => {
                            const isRight =
                                option.originalIndex ===
                                question.correctAnswerIndex;
                            let state =
                                "border-border bg-card shadow-sm active:scale-[0.98]";
                            if (selected === index) {
                                state =
                                    "border-emerald-500 bg-emerald-50 text-emerald-800";
                            } else if (wrongFlash === index) {
                                state =
                                    "border-red-500 bg-red-100 text-red-700 game-shake";
                            } else if (revealed && isRight) {
                                state =
                                    "border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-400";
                            }
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => tapOption(index)}
                                    disabled={locked}
                                    className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left text-lg font-medium transition-all duration-200 ${state}`}
                                >
                                    <span>{option.text}</span>
                                    {revealed && isRight && (
                                        <Check className="h-6 w-6 shrink-0 text-amber-600" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

// ------------------------------------------------------------------ the run

export default function FocusGroupRun({
    stages,
}: {
    stages: FocusGroupStage[];
}) {
    const [phase, setPhase] = useState<RunPhase>("start");
    const [teamName, setTeamName] = useState("");
    const [stageIndex, setStageIndex] = useState(0);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [finalMs, setFinalMs] = useState(0);
    const [mistakes, setMistakes] = useState(0);

    const [frozen, setFrozen] = useState(false);
    const [freezeLeft, setFreezeLeft] = useState(0);
    const [stageWrong, setStageWrong] = useState(0);
    const [revealNonce, setRevealNonce] = useState(0);
    const [correctFlash, setCorrectFlash] = useState(false);

    const startRef = useRef(0);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const stage = stages[stageIndex];
    const totalStages = stages.length;

    const later = (fn: () => void, ms: number) => {
        timers.current.push(setTimeout(fn, ms));
    };

    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
        };
    }, []);

    // The clock never stops — a freeze costs real seconds, and that is the
    // whole penalty.
    useEffect(() => {
        if (phase !== "running") return;
        const id = setInterval(() => {
            setElapsedMs(Date.now() - startRef.current);
        }, 250);
        return () => clearInterval(id);
    }, [phase]);

    const start = () => {
        startRef.current = Date.now();
        setElapsedMs(0);
        setStageIndex(0);
        setMistakes(0);
        setStageWrong(0);
        setRevealNonce(0);
        setFrozen(false);
        setPhase("running");
    };

    const handleWrong = useCallback(() => {
        setMistakes((n) => n + 1);
        setStageWrong((n) => {
            const next = n + 1;
            if (next >= REVEAL_AFTER_WRONG) setRevealNonce((r) => r + 1);
            return next;
        });

        setFrozen(true);
        setFreezeLeft(Math.ceil(FREEZE_MS / 1000));
        const tick = setInterval(() => {
            setFreezeLeft((s) => (s > 1 ? s - 1 : 0));
        }, 1000);
        later(() => {
            clearInterval(tick);
            setFrozen(false);
        }, FREEZE_MS);
    }, []);

    const handleHintUsed = useCallback(() => setStageWrong(0), []);

    const handleComplete = useCallback(() => {
        setCorrectFlash(true);
        later(() => {
            setCorrectFlash(false);
            // Stop the clock on the last stage, otherwise move on. Kept out of
            // a state updater so React never runs these twice.
            if (stageIndex + 1 >= totalStages) {
                setFinalMs(Date.now() - startRef.current);
                setPhase("finished");
                return;
            }
            setStageIndex(stageIndex + 1);
            setStageWrong(0);
            setRevealNonce(0);
        }, CORRECT_FLASH_MS);
    }, [stageIndex, totalStages]);

    // ------------------------------------------------------------ start card

    if (phase === "start") {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <div className="mb-4 text-6xl">🏁</div>
                <h2 className="mb-3 text-3xl font-bold text-foreground">
                    Ready?
                </h2>
                <p className="mx-auto mb-2 max-w-md text-lg text-muted-foreground">
                    {totalStages} stages, one after another.
                </p>
                <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
                    Go as fast as you can. A wrong answer stops you for{" "}
                    {Math.round(FREEZE_MS / 1000)} seconds.
                </p>

                <label className="mx-auto mb-6 block max-w-xs text-left">
                    <span className="mb-2 block text-sm font-semibold text-foreground">
                        Team name
                    </span>
                    <input
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                        placeholder="Team A"
                        className="h-14 w-full rounded-xl border-2 border-border bg-background px-4 text-lg outline-none focus:border-primary"
                    />
                </label>

                <Button
                    size="lg"
                    className="h-16 w-full max-w-xs text-xl font-bold"
                    onClick={start}
                >
                    <Play className="mr-2 h-6 w-6" />
                    Start
                </Button>
            </div>
        );
    }

    // ----------------------------------------------------------- final score

    if (phase === "finished") {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <Trophy className="mx-auto mb-4 h-16 w-16 text-amber-500" />
                <h2 className="mb-2 text-3xl font-bold text-foreground">
                    Finished! 🎉
                </h2>
                {teamName.trim() && (
                    <p className="mb-6 text-xl font-semibold text-primary">
                        {teamName.trim()}
                    </p>
                )}
                <div className="mx-auto mb-8 max-w-sm rounded-2xl bg-muted p-6">
                    <p className="text-sm font-medium text-muted-foreground">
                        Total time
                    </p>
                    <p className="text-6xl font-bold tabular-nums text-foreground">
                        {formatTime(finalMs)}
                    </p>
                    <p className="mt-4 text-base text-muted-foreground">
                        {mistakes} {mistakes === 1 ? "mistake" : "mistakes"} ·{" "}
                        {totalStages} stages
                    </p>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------------- run

    return (
        <div className="relative">
            {/* Header: stage counter and the running clock */}
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                <span className="text-base font-bold text-foreground">
                    Stage {stageIndex + 1} of {totalStages}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                    {stage.label}
                </span>
                <span className="flex items-center gap-1 text-lg font-bold tabular-nums text-foreground">
                    <Timer className="h-5 w-5" />
                    {formatTime(elapsedMs)}
                </span>
            </div>

            <div className="mb-5 h-3 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{
                        width: `${(stageIndex / totalStages) * 100}%`,
                    }}
                />
            </div>

            <div className={frozen ? "pointer-events-none" : undefined}>
                {stage.kind === "word-match" ? (
                    <WordMatchStage
                        key={stageIndex}
                        round={stage.round}
                        locked={frozen}
                        revealNonce={revealNonce}
                        onWrong={handleWrong}
                        onHintUsed={handleHintUsed}
                        onComplete={handleComplete}
                    />
                ) : (
                    <PictureStage
                        key={stageIndex}
                        question={stage.question}
                        locked={frozen}
                        revealNonce={revealNonce}
                        onWrong={handleWrong}
                        onHintUsed={handleHintUsed}
                        onComplete={handleComplete}
                    />
                )}
            </div>

            {/* Wrong answer: the whole screen goes red and locks */}
            {frozen && (
                <div
                    role="alert"
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-red-500/20"
                >
                    <div className="rounded-2xl bg-white/90 px-10 py-6 text-center shadow-lg ring-1 ring-red-200">
                        <p className="text-3xl font-bold text-red-600">
                            Wrong
                        </p>
                        <p className="mt-2 text-lg font-medium tabular-nums text-red-500/80">
                            {freezeLeft}
                        </p>
                    </div>
                </div>
            )}

            {/* Correct: a brief green confirmation before the next stage */}
            {correctFlash && (
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-emerald-500/20">
                    <div className="rounded-2xl bg-white/90 px-10 py-6 text-center shadow-lg ring-1 ring-emerald-200">
                        <p className="text-3xl font-bold text-emerald-600">
                            Correct
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
