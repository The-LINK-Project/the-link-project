"use client";

import { CircleCheck, CircleX, ThumbsUp, Timer, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GameTimer, { formatTime } from "@/components/games/GameTimer";
import { LessonProgress } from "@/components/learn/LessonProgress";
import { LessonShell, ShellActions } from "@/components/learn/LessonShell";
import { Tile } from "@/components/learn/Tile";
import { LessonBadge, LessonButton, LessonCardBox, text } from "@/components/learn/ui";
import { useRouter } from "@/i18n/navigation";
import {
    ETHICS_MATCH_PAIRS,
    ETHICS_SORT_CARDS,
    ETHICS_WORDS,
    ethicsScore,
    type EthicsMatchPair,
    type EthicsSortCard,
    type EthicsVerdict,
} from "@/constants/games/aiEthics";
import { seededShuffle } from "@/lib/lessons/shuffle";
import { cn } from "@/lib/utils";

import { ETHICS_HUE, EthicsCoin } from "./EthicsCoin";

/**
 * Ethics of AI: a two-round team game for the workshop, played on a laptop
 * with a group round it. Round 1 sorts six situations into Good or Problem,
 * one card at a time, and teaches the reason after every tap. Round 2 is
 * Tap-the-pairs, situations against reasons.
 *
 * Built from the lesson kit so it looks like every other lesson. Nothing is
 * saved: the finish screen is the result, and teams compare out loud.
 */
type Phase = "intro" | "sort" | "recap" | "match" | "finished";

const WRONG_PAIR_FEEDBACK_MS = 600;

type Side = "situation" | "reason";
type Selection = { side: Side; pairId: string } | null;
type WrongPair = Record<Side, string> | null;

export function AiEthicsGame() {
    const t = useTranslations("ethics");
    const router = useRouter();

    const [phase, setPhase] = useState<Phase>("intro");
    const [wrongAttempts, setWrongAttempts] = useState(0);

    // Round 1
    const [sortIndex, setSortIndex] = useState(0);
    const [picked, setPicked] = useState<EthicsVerdict | null>(null);

    // Round 2
    const situations = useMemo(() => seededShuffle(ETHICS_MATCH_PAIRS, "ethics-situations"), []);
    const reasons = useMemo(() => seededShuffle(ETHICS_MATCH_PAIRS, "ethics-reasons"), []);
    const [matched, setMatched] = useState<string[]>([]);
    const [selected, setSelected] = useState<Selection>(null);
    const [wrongPair, setWrongPair] = useState<WrongPair>(null);
    const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // The clock runs during the two rounds and pauses on the recap, where the
    // facilitator talks. `clockStart` is set so that Date.now() - clockStart is
    // the total time played so far.
    const [clockStart, setClockStart] = useState(0);
    const playedMs = useRef(0);
    const [finalMs, setFinalMs] = useState(0);
    const timed = phase === "sort" || phase === "match";

    useEffect(
        () => () => {
            if (wrongTimer.current) clearTimeout(wrongTimer.current);
        },
        [],
    );

    const resumeClock = useCallback(() => setClockStart(Date.now() - playedMs.current), []);
    const pauseClock = useCallback(() => {
        playedMs.current = Date.now() - clockStart;
    }, [clockStart]);

    const start = () => {
        playedMs.current = 0;
        setWrongAttempts(0);
        setSortIndex(0);
        setPicked(null);
        setMatched([]);
        setSelected(null);
        setWrongPair(null);
        resumeClock();
        setPhase("sort");
    };

    // ------------------------------------------------------------- round 1

    const card = ETHICS_SORT_CARDS[sortIndex];
    const sortTotal = ETHICS_SORT_CARDS.length;

    const pick = (verdict: EthicsVerdict) => {
        if (picked) return;
        setPicked(verdict);
        if (verdict !== card.answer) setWrongAttempts((n) => n + 1);
    };

    const nextCard = () => {
        setPicked(null);
        if (sortIndex + 1 < sortTotal) {
            setSortIndex(sortIndex + 1);
        } else {
            pauseClock();
            setPhase("recap");
        }
    };

    const startRound2 = () => {
        resumeClock();
        setPhase("match");
    };

    // ------------------------------------------------------------- round 2

    const tap = (side: Side, pairId: string) => {
        if (matched.includes(pairId)) return;
        if (!selected || selected.side === side) {
            setSelected({ side, pairId });
            return;
        }
        if (selected.pairId === pairId) {
            const next = [...matched, pairId];
            setMatched(next);
            setSelected(null);
            if (next.length === ETHICS_MATCH_PAIRS.length) {
                setFinalMs(Date.now() - clockStart);
                setPhase("finished");
            }
            return;
        }
        setWrongAttempts((n) => n + 1);
        setWrongPair(
            side === "reason"
                ? { situation: selected.pairId, reason: pairId }
                : { situation: pairId, reason: selected.pairId },
        );
        wrongTimer.current = setTimeout(() => {
            setWrongPair(null);
            setSelected(null);
        }, WRONG_PAIR_FEEDBACK_MS);
    };

    const stateFor = (side: Side, pairId: string) => {
        if (matched.includes(pairId)) return "used" as const;
        if (wrongPair?.[side] === pairId) return "incorrect" as const;
        if (selected?.side === side && selected.pairId === pairId) return "selected" as const;
        return "default" as const;
    };

    // --------------------------------------------------------------- frame

    // Round 1 is the first half of the bar, round 2 the second.
    const progress =
        phase === "intro"
            ? 0
            : phase === "sort"
              ? (sortIndex + (picked ? 1 : 0)) / sortTotal / 2
              : phase === "recap"
                ? 0.5
                : phase === "match"
                  ? 0.5 + matched.length / ETHICS_MATCH_PAIRS.length / 2
                  : 1;

    const header =
        phase === "intro" || phase === "finished" ? null : (
            <>
                <LessonProgress value={progress} />
                <span className="flex shrink-0 items-center gap-1 text-base font-bold tabular-nums text-lesson-muted">
                    <Timer className="size-5" />
                    <GameTimer startTime={clockStart} running={timed} />
                </span>
            </>
        );

    const footer = (() => {
        if (phase === "intro") {
            return (
                <ShellActions>
                    <LessonButton title={t("start")} size="lg" onClick={start} />
                </ShellActions>
            );
        }
        if (phase === "sort" && picked) {
            const correct = picked === card.answer;
            return <Verdict correct={correct} card={card} onNext={nextCard} />;
        }
        if (phase === "recap") {
            return (
                <ShellActions>
                    <LessonButton title={t("startRound2")} size="lg" onClick={startRound2} />
                </ShellActions>
            );
        }
        if (phase === "finished") {
            return (
                <ShellActions>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <LessonButton title={t("home")} size="lg" variant="outline" onClick={() => router.push("/dashboard")} />
                        <LessonButton title={t("playAgain")} size="lg" onClick={start} />
                    </div>
                </ShellActions>
            );
        }
        return null;
    })();

    return (
        <LessonShell closeLabel={t("close")} onClose={() => router.push("/dashboard")} header={header} footer={footer}>
            {phase === "intro" ? <Intro /> : null}
            {phase === "sort" ? (
                <SortRound card={card} index={sortIndex} total={sortTotal} picked={picked} onPick={pick} />
            ) : null}
            {phase === "recap" ? <Recap /> : null}
            {phase === "match" ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className={text.label}>{t("round2Label")}</p>
                        <h1 className={text.heading}>{t("round2Title")}</h1>
                        <p className={text.caption}>{t("round2Hint")}</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-1 flex-col gap-3">
                            {situations.map((pair) => (
                                <Tile
                                    key={pair.id}
                                    label={pair.situation}
                                    block
                                    className="flex-1"
                                    state={stateFor("situation", pair.id)}
                                    disabled={!!wrongPair}
                                    onPress={() => tap("situation", pair.id)}
                                />
                            ))}
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            {reasons.map((pair) => (
                                <Tile
                                    key={pair.id}
                                    label={pair.reason}
                                    block
                                    className="flex-1"
                                    state={stateFor("reason", pair.id)}
                                    disabled={!!wrongPair}
                                    onPress={() => tap("reason", pair.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
            {phase === "finished" ? <Finished timeMs={finalMs} wrongAttempts={wrongAttempts} /> : null}
        </LessonShell>
    );
}

// ------------------------------------------------------------------ screens

/** The top of a game page, as LessonHeading is for a lesson's pages. */
function GameHeading({ title, done = false, children }: { title: string; done?: boolean; children?: React.ReactNode }) {
    const t = useTranslations("ethics");
    return (
        <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-4">
                <EthicsCoin done={done} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h1 className="text-balance text-[26px] font-extrabold leading-8 text-lesson-ink">{title}</h1>
                    <p className="text-[15px] font-bold leading-5" style={{ color: ETHICS_HUE.ink }}>
                        {t("title")}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}

/** Good and Problem as line icons, like every other mark in the lesson kit. */
function VerdictIcon({ verdict }: { verdict: EthicsVerdict }) {
    return verdict === "good" ? (
        <ThumbsUp className="size-5 shrink-0 text-lesson-success" strokeWidth={2.5} />
    ) : (
        <TriangleAlert className="size-5 shrink-0 text-lesson-warning" strokeWidth={2.5} />
    );
}

function Intro() {
    const t = useTranslations("ethics");
    return (
        <div className="flex flex-col gap-6">
            <GameHeading title={t("introWords")}>
                <p className={text.caption}>{t("introBody")}</p>
            </GameHeading>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    {ETHICS_WORDS.map((item) => (
                        <div key={item.word} className="flex items-baseline gap-3 border-b border-lesson-hairline py-2">
                            <p className={cn(text.bodyStrong, "w-24 shrink-0")}>{item.word}</p>
                            <p className={text.caption}>{item.meaning}</p>
                        </div>
                    ))}
                </div>
            </div>
            <LessonCardBox tone="muted" className="flex flex-col gap-1">
                <p className={text.bodyStrong}>{t("stemGood")}</p>
                <p className={text.bodyStrong}>{t("stemProblem")}</p>
            </LessonCardBox>
        </div>
    );
}

function SortRound({
    card,
    index,
    total,
    picked,
    onPick,
}: {
    card: EthicsSortCard;
    index: number;
    total: number;
    picked: EthicsVerdict | null;
    onPick: (verdict: EthicsVerdict) => void;
}) {
    const t = useTranslations("ethics");
    const stateFor = (verdict: EthicsVerdict) => {
        if (!picked) return "default" as const;
        if (verdict === card.answer) return "correct" as const;
        if (verdict === picked) return "incorrect" as const;
        return "default" as const;
    };

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <p className={text.label}>{t("round1Label")}</p>
                <h1 className={text.heading}>{t("round1Title")}</h1>
                <p className={text.caption}>{t("round1Hint")}</p>
            </div>

            <LessonCardBox className="flex flex-col gap-2">
                <p className={text.label}>{t("cardOf", { index: index + 1, total })}</p>
                <p className="text-[22px] font-bold leading-8 text-lesson-ink">{card.situation}</p>
            </LessonCardBox>

            {/* The choices sit low, where a lesson keeps its answer tiles. Once
                answered they go inert without `disabled`, which would dim them:
                the green one is the lesson. */}
            <div className="mt-auto grid grid-cols-2 gap-3">
                <Tile
                    label={t("good")}
                    icon={<VerdictIcon verdict="good" />}
                    caption={t("goodSub")}
                    block
                    className="min-h-28"
                    state={stateFor("good")}
                    onPress={picked ? undefined : () => onPick("good")}
                />
                <Tile
                    label={t("problem")}
                    icon={<VerdictIcon verdict="problem" />}
                    caption={t("problemSub")}
                    block
                    className="min-h-28"
                    state={stateFor("problem")}
                    onPress={picked ? undefined : () => onPick("problem")}
                />
            </div>
        </div>
    );
}

/** The graded banner under a sorted card, drawn like the lesson footer. */
function Verdict({ correct, card, onNext }: { correct: boolean; card: EthicsSortCard; onNext: () => void }) {
    const t = useTranslations("ethics");
    useEffect(() => {
        try {
            navigator.vibrate?.(correct ? 30 : [40, 60, 40]);
        } catch {
            // Reinforcement only.
        }
    }, [correct]);

    return (
        <div
            role="status"
            className={cn(
                "flex flex-col gap-3 border-t p-4",
                correct ? "border-lesson-success bg-lesson-success-soft" : "border-lesson-destructive bg-lesson-destructive-soft",
            )}
        >
            <div className="flex items-center gap-2">
                {correct ? (
                    <CircleCheck className="size-7 text-lesson-success" />
                ) : (
                    <CircleX className="size-7 text-lesson-destructive" />
                )}
                <p className={cn(text.subheading, correct ? "text-lesson-success" : "text-lesson-destructive")}>
                    {correct ? t("correct") : t("notQuite")}
                </p>
            </div>
            <p className={text.bodyStrong}>{card.reason}</p>
            {card.tip ? <p className={text.caption}>{card.tip}</p> : null}
            <LessonButton
                autoFocus
                title={t("continue")}
                size="lg"
                variant={correct ? "primary" : "destructive"}
                onClick={onNext}
            />
        </div>
    );
}

/** All six cards in their right columns, for the facilitator's debrief. */
function Recap() {
    const t = useTranslations("ethics");
    const column = (verdict: EthicsVerdict) => (
        <div className="flex flex-1 flex-col gap-2">
            <p className={cn(text.subheading, "flex items-center gap-2")}>
                <VerdictIcon verdict={verdict} />
                {t(verdict)}
            </p>
            {ETHICS_SORT_CARDS.filter((item) => item.answer === verdict).map((item) => (
                <LessonCardBox key={item.id} tone="muted" className="flex flex-col gap-1 p-3">
                    <p className={text.bodyStrong}>{item.situation}</p>
                    <p className={text.caption}>{item.reason}</p>
                </LessonCardBox>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className={text.heading}>{t("recapTitle")}</h1>
                <p className={text.body}>{t("recapBody")}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                {column("good")}
                {column("problem")}
            </div>
        </div>
    );
}

function Finished({ timeMs, wrongAttempts }: { timeMs: number; wrongAttempts: number }) {
    const t = useTranslations("ethics");
    const score = ethicsScore(wrongAttempts);

    return (
        <div className="flex flex-col gap-6">
            <GameHeading title={t("finishedTitle")} done>
                <p className={text.caption}>{t("showTeacher")}</p>
            </GameHeading>

            <div className="grid grid-cols-2 gap-3">
                <LessonCardBox className="text-center">
                    <p className={text.label}>{t("time")}</p>
                    <p className="text-[44px] font-extrabold leading-tight tabular-nums text-lesson-ink">{formatTime(timeMs)}</p>
                </LessonCardBox>
                <LessonCardBox className="text-center">
                    <p className={text.label}>{t("score")}</p>
                    <p className="text-[44px] font-extrabold leading-tight tabular-nums text-lesson-success">{score}</p>
                    <LessonBadge label={t("wrongTaps", { count: wrongAttempts })} tone={wrongAttempts === 0 ? "success" : "neutral"} />
                </LessonCardBox>
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("sayIt")}</p>
                <LessonCardBox tone="muted" className="flex flex-col gap-2">
                    <p className={text.bodyStrong}>{t("stemGood")}</p>
                    <p className={text.bodyStrong}>{t("stemProblem")}</p>
                </LessonCardBox>
            </div>
        </div>
    );
}

export type { EthicsMatchPair };
