"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useLessonLocalized } from "@/lib/lessons/localized";
import { vocabByIds } from "@/lib/lessons/lookup";
import { retryOrder, seededDerangement, seededShuffle } from "@/lib/lessons/shuffle";
import type { MatchPairsExercise } from "@/lib/lessons/types";

import { Tile } from "../Tile";
import type { ExerciseProps } from "./shared";

/**
 * Tap the pairs. English terms in the left column, their meanings in the
 * learner's language on the right.
 *
 * Self-grading: a pair is judged the moment the second tile is tapped, so there
 * is no Check button. Matched pairs stay in place as dimmed tiles rather than
 * vanishing, which keeps the columns aligned and the tap targets still.
 */
const WRONG_PAIR_FEEDBACK_MS = 600;

type Side = "term" | "meaning";
type Selection = { side: Side; pairId: string } | null;
/**
 * A rejected pair, stored per side. Both columns are keyed by the same pair id,
 * so highlighting by id alone would light up a tile's own translation and hand
 * the learner the answer.
 */
type WrongPair = Record<Side, string> | null;

export function TapThePairs({
    exercise,
    lesson,
    onSelfSubmit,
    locked,
    again = false,
}: ExerciseProps<MatchPairsExercise>) {
    const localized = useLessonLocalized();
    const pairs = useMemo(() => vocabByIds(lesson, exercise.vocabIds), [lesson, exercise.vocabIds]);
    const terms = useMemo(
        () => retryOrder(seededShuffle(pairs, `${exercise.id}-terms`), `${exercise.id}-terms`, again),
        [pairs, exercise.id, again],
    );
    // Never on the same row as its term, or reading straight across gives it away.
    const meanings = useMemo(() => seededDerangement(terms, `${exercise.id}-meanings`), [terms, exercise.id]);

    const [matched, setMatched] = useState<string[]>([]);
    const [selected, setSelected] = useState<Selection>(null);
    const [wrongPair, setWrongPair] = useState<WrongPair>(null);
    const wrongAttempts = useRef(0);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current);
        },
        [],
    );

    const tap = useCallback(
        (side: Side, pairId: string) => {
            if (matched.includes(pairId)) return;

            // Nothing chosen yet, or re-choosing on the same side: just select.
            if (!selected || selected.side === side) {
                setSelected({ side, pairId });
                return;
            }

            if (selected.pairId === pairId) {
                const nextMatched = [...matched, pairId];
                setMatched(nextMatched);
                setSelected(null);
                // Every pair placed: hand the outcome to the session on the tap
                // that finished it.
                if (nextMatched.length === pairs.length) {
                    onSelfSubmit({ kind: "pairs", wrongAttempts: wrongAttempts.current });
                }
                return;
            }

            // Wrong pair: show both halves as rejected, then clear. It costs
            // nothing beyond the pause, and is counted only so the summary can
            // tell a clean run from a messy one.
            wrongAttempts.current += 1;
            setWrongPair(
                side === "meaning"
                    ? { term: selected.pairId, meaning: pairId }
                    : { term: pairId, meaning: selected.pairId },
            );
            timer.current = setTimeout(() => {
                setWrongPair(null);
                setSelected(null);
            }, WRONG_PAIR_FEEDBACK_MS);
        },
        [matched, selected, pairs.length, onSelfSubmit],
    );

    // Side-aware: a tile is only lit when it is the tile that was tapped.
    const stateFor = (side: Side, pairId: string) => {
        if (matched.includes(pairId)) return "used" as const;
        if (wrongPair?.[side] === pairId) return "incorrect" as const;
        if (selected?.side === side && selected.pairId === pairId) return "selected" as const;
        return "default" as const;
    };

    return (
        <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-3">
                {terms.map((pair) => (
                    <Tile
                        key={pair.id}
                        label={pair.term}
                        block
                        className="flex-1"
                        state={stateFor("term", pair.id)}
                        disabled={locked || !!wrongPair}
                        onPress={() => tap("term", pair.id)}
                    />
                ))}
            </div>
            <div className="flex flex-1 flex-col gap-3">
                {meanings.map((pair) => (
                    <Tile
                        key={pair.id}
                        label={localized(pair.meaning)}
                        block
                        className="flex-1"
                        state={stateFor("meaning", pair.id)}
                        disabled={locked || !!wrongPair}
                        onPress={() => tap("meaning", pair.id)}
                    />
                ))}
            </div>
        </div>
    );
}
