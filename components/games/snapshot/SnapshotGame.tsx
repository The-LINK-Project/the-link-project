"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    FLASH_DURATION_MS,
    MAX_FLASH_CARDS,
    MIN_DECOYS,
    POINTS_PER_HIT,
    POINTS_PER_WRONG_PICK,
    RECALL_DURATION_MS,
    SNAPSHOT_ITEMS,
    SNAPSHOT_TOPIC,
    type SnapshotItem,
} from "@/constants/games/snapshot";
import { useSnapshotLeaderboard } from "@/lib/snapshotLeaderboard";
import SnapshotIntro from "./SnapshotIntro";
import SnapshotFlash from "./SnapshotFlash";
import SnapshotRecall from "./SnapshotRecall";
import SnapshotResults, { type SnapshotResult } from "./SnapshotResults";

type Phase = "intro" | "countdown" | "flash" | "recall" | "results";

const COUNTDOWN_STEP_MS = 800;

const shuffle = <T,>(items: T[]) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

// Warm the browser cache so photos appear instantly during the flash phase.
const preload = (items: { image: string }[]) => {
    for (const item of items) {
        const img = new window.Image();
        img.src = item.image;
    }
};

export default function SnapshotGame() {
    const { scores, addScore, reset } = useSnapshotLeaderboard();

    const [phase, setPhase] = useState<Phase>("intro");

    const [deck, setDeck] = useState<SnapshotItem[]>([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [count, setCount] = useState(3);
    const [phaseStartedAt, setPhaseStartedAt] = useState(0);
    const [options, setOptions] = useState<SnapshotItem[]>([]);
    const [picked, setPicked] = useState<Set<string>>(new Set());
    const [result, setResult] = useState<SnapshotResult | null>(null);
    const [savedId, setSavedId] = useState<string>();

    // Latest values for the phase timers, which fire outside React's render.
    const latest = useRef({ deck, cardIndex, options, picked, phaseStartedAt });
    latest.current = { deck, cardIndex, options, picked, phaseStartedAt };

    useEffect(() => {
        preload(SNAPSHOT_ITEMS);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [phase]);

    const start = () => {
        setDeck(shuffle(SNAPSHOT_ITEMS));
        setCardIndex(0);
        setPicked(new Set());
        setResult(null);
        setSavedId(undefined);
        setCount(3);
        setPhase("countdown");
    };

    const quit = () => setPhase("intro");

    // 3, 2, 1, Go, then the photos start
    useEffect(() => {
        if (phase !== "countdown") return;
        const id = setTimeout(
            () => {
                if (count > 0) {
                    setCount(count - 1);
                    return;
                }
                setPhaseStartedAt(Date.now());
                setPhase("flash");
            },
            count > 0 ? COUNTDOWN_STEP_MS : COUNTDOWN_STEP_MS / 2,
        );
        return () => clearTimeout(id);
    }, [phase, count]);

    const endFlash = useCallback(() => {
        const { deck, cardIndex } = latest.current;
        const seen = deck.slice(0, cardIndex + 1);
        const unseen = deck.slice(cardIndex + 1);
        const decoyCount = Math.min(
            unseen.length,
            Math.max(MIN_DECOYS, seen.length),
        );
        setOptions(shuffle([...seen, ...unseen.slice(0, decoyCount)]));
        setPicked(new Set());
        setPhaseStartedAt(Date.now());
        setPhase("recall");
    }, []);

    const nextCard = useCallback(() => {
        const { cardIndex, deck } = latest.current;
        const last = Math.min(MAX_FLASH_CARDS, deck.length) - 1;
        if (cardIndex >= last) endFlash();
        else setCardIndex(cardIndex + 1);
    }, [endFlash]);

    useEffect(() => {
        if (phase !== "flash") return;
        const id = setTimeout(endFlash, FLASH_DURATION_MS);
        return () => clearTimeout(id);
    }, [phase, endFlash]);

    const submitRecall = useCallback(() => {
        const { deck, cardIndex, options, picked, phaseStartedAt } =
            latest.current;
        const seen = deck.slice(0, cardIndex + 1);
        const seenSlugs = new Set(seen.map((item) => item.slug));
        const remembered = new Set(
            [...picked].filter((slug) => seenSlugs.has(slug)),
        );
        const wrongPicks = options.filter(
            (item) => picked.has(item.slug) && !seenSlugs.has(item.slug),
        );
        setResult({
            seen,
            remembered,
            wrongPicks,
            score: Math.max(
                0,
                remembered.size * POINTS_PER_HIT -
                    wrongPicks.length * POINTS_PER_WRONG_PICK,
            ),
            recallMs: Math.min(RECALL_DURATION_MS, Date.now() - phaseStartedAt),
        });
        setPhase("results");
    }, []);

    useEffect(() => {
        if (phase !== "recall") return;
        const id = setTimeout(submitRecall, RECALL_DURATION_MS);
        return () => clearTimeout(id);
    }, [phase, submitRecall]);

    const togglePick = (slug: string) =>
        setPicked((prev) => {
            const next = new Set(prev);
            if (next.has(slug)) next.delete(slug);
            else next.add(slug);
            return next;
        });

    const saveScore = (name: string) => {
        if (!result || savedId) return;
        const saved = addScore({
            name,
            score: result.score,
            hits: result.remembered.size,
            seen: result.seen.length,
            recallMs: result.recallMs,
        });
        setSavedId(saved.id);
    };

    const inGame = phase === "countdown" || phase === "flash" || phase === "recall";

    return (
        <div className="relative">
            {inGame && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={quit}
                    className="absolute -top-2 right-0 z-10 gap-1 text-ink-soft sm:-top-4"
                >
                    <X className="size-4" />
                    Quit
                </Button>
            )}

            {phase === "intro" && (
                <SnapshotIntro
                    onStart={start}
                    scores={scores}
                    onResetScores={reset}
                />
            )}

            {phase === "countdown" && (
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                        {SNAPSHOT_TOPIC}
                    </p>
                    <p className="mt-2 text-lg text-ink-soft">
                        Get ready. Tap or press Space to go faster.
                    </p>
                    <span
                        key={count}
                        className="mt-6 font-heading text-[9rem] font-extrabold leading-none tracking-[-0.04em] text-ink animate-in fade-in-0 zoom-in-90 duration-300 motion-reduce:animate-none"
                    >
                        {count > 0 ? count : "Go"}
                    </span>
                </div>
            )}

            {phase === "flash" && deck[cardIndex] && (
                <div className="pt-8 sm:pt-6">
                    <SnapshotFlash
                        card={deck[cardIndex]}
                        index={cardIndex}
                        startedAt={phaseStartedAt}
                        topic={SNAPSHOT_TOPIC}
                        onNext={nextCard}
                    />
                </div>
            )}

            {phase === "recall" && (
                <div className="pt-8 sm:pt-6">
                    <SnapshotRecall
                        options={options}
                        picked={picked}
                        seenCount={cardIndex + 1}
                        startedAt={phaseStartedAt}
                        onToggle={togglePick}
                        onSubmit={submitRecall}
                    />
                </div>
            )}

            {phase === "results" && result && (
                <SnapshotResults
                    result={result}
                    scores={scores}
                    savedId={savedId}
                    onSave={saveScore}
                    onPlayAgain={() => setPhase("intro")}
                />
            )}
        </div>
    );
}
