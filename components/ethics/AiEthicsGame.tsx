"use client";

import { CircleCheck, CircleX, ThumbsUp, Timer, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GameTimer, { formatTime } from "@/components/games/GameTimer";
import { LessonProgress } from "@/components/learn/LessonProgress";
import { LessonShell, ShellActions } from "@/components/learn/LessonShell";
import { Tile } from "@/components/learn/Tile";
import { LessonBadge, LessonButton, LessonCardBox, text } from "@/components/learn/ui";
import { WordBank } from "@/components/learn/WordBank";
import { useRouter } from "@/i18n/navigation";
import {
    ETHICS_BUILD_ITEMS,
    ETHICS_CONCEPT_LABEL,
    ETHICS_CONCEPT_QUESTION,
    ETHICS_DILEMMAS,
    ETHICS_MATCH_PAIRS,
    ETHICS_QUESTION_LABEL,
    ETHICS_SLIDES,
    ETHICS_SORT_CARDS,
    ETHICS_TAKEAWAYS,
    ETHICS_WORDS,
    ethicsScore,
    type EthicsBuildItem,
    type EthicsConcept,
    type EthicsDilemma,
    type EthicsQuestion,
    type EthicsSlide,
    type EthicsSortCard,
    type EthicsVerdict,
} from "@/constants/games/aiEthics";
import { seededDerangement, seededShuffle } from "@/lib/lessons/shuffle";
import { cn } from "@/lib/utils";

import { ETHICS_HUE, EthicsCoin } from "./EthicsCoin";

/**
 * Ethics of AI: four slides, then a four-round team game for the workshop,
 * played on a laptop with a group round it. The slides are the lesson, each
 * ending in one tap that is not scored. Sort, Match and Build are timed and
 * scored like Word Match. The Dilemmas are not: the clock stops, the team
 * picks a side, and says why to the teacher.
 *
 * Built from the lesson kit so it looks like every other lesson. Nothing is
 * saved: the finish screen is the result, and teams compare out loud.
 */
type Phase = "learn" | "intro" | "sort" | "recap" | "match" | "build" | "dilemma" | "finished";

const ROUNDS = 4;
const WRONG_PAIR_FEEDBACK_MS = 600;

type Side = "situation" | "reason";
type Selection = { side: Side; pairId: string } | null;
type WrongPair = Record<Side, string> | null;

export function AiEthicsGame() {
    const t = useTranslations("ethics");
    const router = useRouter();

    const [phase, setPhase] = useState<Phase>("learn");
    const [wrongAttempts, setWrongAttempts] = useState(0);

    // Slides
    const [slideIndex, setSlideIndex] = useState(0);
    const [slidePick, setSlidePick] = useState<0 | 1 | null>(null);

    // Round 1
    const [sortIndex, setSortIndex] = useState(0);
    const [picked, setPicked] = useState<EthicsVerdict | null>(null);

    // Round 2
    const situations = useMemo(() => seededShuffle(ETHICS_MATCH_PAIRS, "ethics-situations"), []);
    // Never the same row as its situation, or the pair reads straight across.
    const reasons = useMemo(() => seededDerangement(situations, "ethics-reasons"), [situations]);
    const [matched, setMatched] = useState<string[]>([]);
    const [selected, setSelected] = useState<Selection>(null);
    const [wrongPair, setWrongPair] = useState<WrongPair>(null);
    const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Round 3
    const [buildIndex, setBuildIndex] = useState(0);
    const [placed, setPlaced] = useState<number[]>([]);
    const [buildResult, setBuildResult] = useState<boolean | null>(null);

    // Round 4
    const [dilemmaIndex, setDilemmaIndex] = useState(0);
    const [chosen, setChosen] = useState<Record<string, 0 | 1>>({});

    // The clock runs through the three scored rounds and stops on the recap
    // and for the dilemmas, where the team talks. `clockStart` is set so that
    // Date.now() - clockStart is the total time played so far.
    const [clockStart, setClockStart] = useState(0);
    const playedMs = useRef(0);
    const [finalMs, setFinalMs] = useState(0);
    const timed = phase === "sort" || phase === "match" || phase === "build";

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
        setBuildIndex(0);
        setPlaced([]);
        setBuildResult(null);
        setDilemmaIndex(0);
        setChosen({});
        resumeClock();
        setPhase("sort");
    };

    // -------------------------------------------------------------- slides

    const slide = ETHICS_SLIDES[slideIndex];

    const nextSlide = () => {
        setSlidePick(null);
        if (slideIndex + 1 < ETHICS_SLIDES.length) setSlideIndex(slideIndex + 1);
        else setPhase("intro");
    };

    // ------------------------------------------------------------- round 1

    const card = ETHICS_SORT_CARDS[sortIndex];

    const pick = (verdict: EthicsVerdict) => {
        if (picked) return;
        setPicked(verdict);
        if (verdict !== card.answer) setWrongAttempts((n) => n + 1);
    };

    const nextCard = () => {
        setPicked(null);
        if (sortIndex + 1 < ETHICS_SORT_CARDS.length) {
            setSortIndex(sortIndex + 1);
        } else {
            pauseClock();
            setPhase("recap");
        }
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
            if (next.length === ETHICS_MATCH_PAIRS.length) setPhase("build");
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

    // ------------------------------------------------------------- round 3

    const buildItem = ETHICS_BUILD_ITEMS[buildIndex];
    const buildTokens = useMemo(
        () => seededShuffle([...buildItem.answer, ...buildItem.decoys], buildItem.id),
        [buildItem],
    );

    const checkBuild = () => {
        const sentence = placed.map((i) => buildTokens[i]);
        const correct =
            sentence.length === buildItem.answer.length && sentence.every((word, i) => word === buildItem.answer[i]);
        if (!correct) setWrongAttempts((n) => n + 1);
        setBuildResult(correct);
    };

    const nextBuild = () => {
        setPlaced([]);
        setBuildResult(null);
        if (buildIndex + 1 < ETHICS_BUILD_ITEMS.length) {
            setBuildIndex(buildIndex + 1);
        } else {
            // The scored part ends here; the dilemmas are talk, not a race.
            pauseClock();
            setFinalMs(Date.now() - clockStart);
            setPhase("dilemma");
        }
    };

    // ------------------------------------------------------------- round 4

    const dilemma = ETHICS_DILEMMAS[dilemmaIndex];
    const dilemmaChoice = chosen[dilemma.id];

    const nextDilemma = () => {
        if (dilemmaIndex + 1 < ETHICS_DILEMMAS.length) setDilemmaIndex(dilemmaIndex + 1);
        else setPhase("finished");
    };

    // --------------------------------------------------------------- frame

    const roundShare = (round: number, within: number) => (round - 1 + within) / ROUNDS;
    const progress =
        phase === "learn" || phase === "intro"
            ? 0
            : phase === "sort"
              ? roundShare(1, (sortIndex + (picked ? 1 : 0)) / ETHICS_SORT_CARDS.length)
              : phase === "recap"
                ? roundShare(2, 0)
                : phase === "match"
                  ? roundShare(2, matched.length / ETHICS_MATCH_PAIRS.length)
                  : phase === "build"
                    ? roundShare(3, (buildIndex + (buildResult !== null ? 1 : 0)) / ETHICS_BUILD_ITEMS.length)
                    : phase === "dilemma"
                      ? roundShare(4, (dilemmaIndex + (dilemmaChoice !== undefined ? 1 : 0)) / ETHICS_DILEMMAS.length)
                      : 1;

    // The slides show how far through them the team is, with no clock: the
    // clock belongs to the game and only starts on the word screen's Start.
    const header =
        phase === "learn" ? (
            <LessonProgress value={(slideIndex + (slidePick === null ? 0 : 1)) / ETHICS_SLIDES.length} />
        ) : phase === "intro" || phase === "finished" ? null : (
            <>
                <LessonProgress value={progress} />
                <span className="flex shrink-0 items-center gap-1 text-base font-bold tabular-nums text-lesson-muted">
                    <Timer className="size-5" />
                    {phase === "dilemma" ? formatTime(finalMs) : <GameTimer startTime={clockStart} running={timed} />}
                </span>
            </>
        );

    const footer = (() => {
        switch (phase) {
            case "learn":
                return slidePick === null ? null : (
                    <Outcome correct={slidePick === slide.check.answer} onNext={nextSlide}>
                        <p className={text.bodyStrong}>{slide.check.reason}</p>
                    </Outcome>
                );
            case "intro":
                return (
                    <ShellActions>
                        <LessonButton title={t("start")} size="lg" onClick={start} />
                    </ShellActions>
                );
            case "sort":
                return picked ? (
                    <Outcome correct={picked === card.answer} onNext={nextCard}>
                        <div>
                            <LessonBadge label={ETHICS_CONCEPT_LABEL[card.concept]} tone="accent" />
                        </div>
                        <p className={text.bodyStrong}>{card.reason}</p>
                        {card.tip ? <p className={text.caption}>{card.tip}</p> : null}
                    </Outcome>
                ) : null;
            case "recap":
                return (
                    <ShellActions>
                        <LessonButton
                            title={t("startRound2")}
                            size="lg"
                            onClick={() => {
                                resumeClock();
                                setPhase("match");
                            }}
                        />
                    </ShellActions>
                );
            case "build":
                return buildResult === null ? (
                    <ShellActions>
                        <LessonButton title={t("check")} size="lg" disabled={placed.length === 0} onClick={checkBuild} />
                    </ShellActions>
                ) : (
                    <Outcome correct={buildResult} onNext={nextBuild}>
                        {buildResult ? null : (
                            <p className={text.caption}>
                                {t("modelAnswer")} <span className={text.bodyStrong}>{buildItem.answer.join(" ")}</span>
                            </p>
                        )}
                    </Outcome>
                );
            case "dilemma":
                return dilemmaChoice === undefined ? null : (
                    <ShellActions>
                        <p className={cn(text.bodyStrong, "pb-3 text-center")}>{t("dilemmaSay")}</p>
                        <LessonButton title={t("continue")} size="lg" onClick={nextDilemma} />
                    </ShellActions>
                );
            case "finished":
                return (
                    <ShellActions>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <LessonButton title={t("home")} size="lg" variant="outline" onClick={() => router.push("/dashboard")} />
                            <LessonButton title={t("playAgain")} size="lg" onClick={start} />
                        </div>
                    </ShellActions>
                );
        }
    })();

    return (
        <LessonShell closeLabel={t("close")} onClose={() => router.push("/dashboard")} header={header} footer={footer}>
            {phase === "learn" ? (
                <Slide
                    slide={slide}
                    index={slideIndex}
                    total={ETHICS_SLIDES.length}
                    picked={slidePick}
                    onPick={(i) => {
                        if (slidePick === null) setSlidePick(i);
                    }}
                />
            ) : null}

            {phase === "intro" ? <Intro /> : null}

            {phase === "sort" ? (
                <SortRound card={card} index={sortIndex} total={ETHICS_SORT_CARDS.length} picked={picked} onPick={pick} />
            ) : null}

            {phase === "recap" ? <Recap /> : null}

            {phase === "match" ? (
                <div className="flex flex-col gap-4">
                    <RoundHeading label={t("round2Label")} title={t("round2Title")} hint={t("round2Hint")} />
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

            {phase === "build" ? (
                <BuildRound
                    item={buildItem}
                    index={buildIndex}
                    total={ETHICS_BUILD_ITEMS.length}
                    tokens={buildTokens}
                    placed={placed}
                    onChange={setPlaced}
                    result={buildResult}
                />
            ) : null}

            {phase === "dilemma" ? (
                <DilemmaRound
                    dilemma={dilemma}
                    index={dilemmaIndex}
                    total={ETHICS_DILEMMAS.length}
                    choice={dilemmaChoice}
                    onChoose={(side) => setChosen((prev) => ({ ...prev, [dilemma.id]: side }))}
                />
            ) : null}

            {phase === "finished" ? <Finished timeMs={finalMs} wrongAttempts={wrongAttempts} chosen={chosen} /> : null}
        </LessonShell>
    );
}

// ------------------------------------------------------------------ pieces

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

function RoundHeading({ label, title, hint }: { label: string; title: string; hint: string }) {
    return (
        <div className="flex flex-col gap-1">
            <p className={text.label}>{label}</p>
            <h1 className={text.heading}>{title}</h1>
            <p className={text.caption}>{hint}</p>
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

/** The graded banner under an answer, drawn like the lesson footer. */
function Outcome({ correct, onNext, children }: { correct: boolean; onNext: () => void; children?: React.ReactNode }) {
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
            {children}
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

// ------------------------------------------------------------------ screens

/**
 * One slide of the lesson: a title, three lines the facilitator reads aloud,
 * the thing the team did earlier that it is about, and a single tap. The tap
 * tells the facilitator how much the room already knows.
 */
function Slide({
    slide,
    index,
    total,
    picked,
    onPick,
}: {
    slide: EthicsSlide;
    index: number;
    total: number;
    picked: 0 | 1 | null;
    onPick: (i: 0 | 1) => void;
}) {
    const t = useTranslations("ethics");
    const stateFor = (i: 0 | 1) => {
        if (picked === null) return "default" as const;
        if (i === slide.check.answer) return "correct" as const;
        if (i === picked) return "incorrect" as const;
        return "default" as const;
    };

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <EthicsCoin />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className={text.label}>{t("learnOf", { index: index + 1, total })}</p>
                        <h1 className="text-balance text-[26px] font-extrabold leading-8 text-lesson-ink">{slide.title}</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {slide.lines.map((line) => (
                        <p key={line} className="text-[19px] font-semibold leading-7 text-lesson-ink">
                            {line}
                        </p>
                    ))}
                </div>
            </div>

            <LessonCardBox tone="muted" className="flex flex-col gap-1">
                <p className={text.label}>{t("learnEarlier")}</p>
                <p className={text.body}>{slide.earlier}</p>
            </LessonCardBox>

            <div className="mt-auto flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <p className={text.label}>{t("learnAsk")}</p>
                    <p className={text.subheading}>{slide.check.prompt}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {slide.check.options.map((option, i) => (
                        <Tile
                            key={option}
                            label={option}
                            block
                            className="min-h-20"
                            state={stateFor(i as 0 | 1)}
                            onPress={picked === null ? () => onPick(i as 0 | 1) : undefined}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Intro() {
    const t = useTranslations("ethics");
    return (
        <div className="flex flex-col gap-6">
            <GameHeading title={t("introWords")}>
                <p className={text.caption}>{t("introBody")}</p>
            </GameHeading>
            <div className="flex flex-col">
                {ETHICS_WORDS.map((item) => (
                    <div key={item.word} className="flex items-baseline gap-3 border-b border-lesson-hairline py-2">
                        <p className={cn(text.bodyStrong, "w-28 shrink-0")}>{item.word}</p>
                        <p className={text.caption}>{item.meaning}</p>
                    </div>
                ))}
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
            <RoundHeading label={t("round1Label")} title={t("round1Title")} hint={t("round1Hint")} />

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

/** All the sorted cards in their right columns, for the facilitator's debrief. */
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
                    <div className="pt-1">
                        <LessonBadge label={ETHICS_CONCEPT_LABEL[item.concept]} tone="accent" />
                    </div>
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

function BuildRound({
    item,
    index,
    total,
    tokens,
    placed,
    onChange,
    result,
}: {
    item: EthicsBuildItem;
    index: number;
    total: number;
    tokens: string[];
    placed: number[];
    onChange: (placed: number[]) => void;
    result: boolean | null;
}) {
    const t = useTranslations("ethics");
    return (
        <div className="flex flex-col gap-6">
            <RoundHeading label={t("round3Label")} title={t("round3Title")} hint={t("round3Hint")} />
            <LessonCardBox tone="muted" className="flex flex-col gap-1">
                <p className={text.label}>{t("cardOf", { index: index + 1, total })}</p>
                <p className={text.bodyStrong}>{item.situation}</p>
            </LessonCardBox>
            <WordBank
                tokens={tokens}
                placed={placed}
                onChange={onChange}
                disabled={result !== null}
                placeholder={t("buildPlaceholder")}
                outcome={result === null ? undefined : result ? "correct" : "incorrect"}
            />
        </div>
    );
}

function DilemmaRound({
    dilemma,
    index,
    total,
    choice,
    onChoose,
}: {
    dilemma: EthicsDilemma;
    index: number;
    total: number;
    choice: 0 | 1 | undefined;
    onChoose: (side: 0 | 1) => void;
}) {
    const t = useTranslations("ethics");
    return (
        <div className="flex flex-1 flex-col gap-6">
            <RoundHeading label={t("round4Label")} title={t("round4Title")} hint={t("round4Hint")} />
            <LessonCardBox className="flex flex-col gap-2">
                <p className={text.label}>{t("dilemmaOf", { index: index + 1, total })}</p>
                <p className="text-[22px] font-bold leading-8 text-lesson-ink">{dilemma.situation}</p>
            </LessonCardBox>
            {/* Neither side is marked right: the chosen one simply stays lit. */}
            <div className="mt-auto grid grid-cols-2 gap-3">
                {dilemma.sides.map((side, i) => (
                    <Tile
                        key={side.label}
                        label={side.label}
                        caption={side.reason}
                        block
                        className="min-h-28"
                        state={choice === i ? "selected" : "default"}
                        onPress={() => onChoose(i as 0 | 1)}
                    />
                ))}
            </div>
        </div>
    );
}

const QUESTIONS: EthicsQuestion[] = ["true", "permission", "fair"];

/**
 * Every idea the cards touched, once each, grouped under the three questions
 * the slides taught, so the end of the game hands back its beginning.
 */
function conceptsMet(): Record<EthicsQuestion, EthicsConcept[]> {
    const groups: Record<EthicsQuestion, EthicsConcept[]> = { true: [], permission: [], fair: [] };
    for (const item of [...ETHICS_SORT_CARDS, ...ETHICS_MATCH_PAIRS]) {
        const group = groups[ETHICS_CONCEPT_QUESTION[item.concept]];
        if (!group.includes(item.concept)) group.push(item.concept);
    }
    return groups;
}

function Finished({ timeMs, wrongAttempts, chosen }: { timeMs: number; wrongAttempts: number; chosen: Record<string, 0 | 1> }) {
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
                <p className={text.label}>{t("conceptsTitle")}</p>
                {QUESTIONS.map((question) => (
                    <div key={question} className="flex items-center gap-3 border-b border-lesson-hairline py-2">
                        <p className={cn(text.bodyStrong, "w-40 shrink-0")}>{ETHICS_QUESTION_LABEL[question]}</p>
                        <div className="flex flex-wrap gap-2">
                            {conceptsMet()[question].map((concept) => (
                                <LessonBadge key={concept} label={ETHICS_CONCEPT_LABEL[concept]} tone="accent" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("takeHomeTitle")}</p>
                <LessonCardBox tone="muted" className="flex flex-col gap-3">
                    {QUESTIONS.map((question) => (
                        <div key={question} className="flex flex-col gap-0.5">
                            <p className={text.bodyStrong}>{ETHICS_QUESTION_LABEL[question]}</p>
                            <p className={text.body}>{ETHICS_TAKEAWAYS[question]}</p>
                        </div>
                    ))}
                </LessonCardBox>
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("choicesTitle")}</p>
                {ETHICS_DILEMMAS.map((item) => {
                    const side = chosen[item.id];
                    return (
                        <div key={item.id} className="flex flex-col gap-1 border-b border-lesson-hairline py-2">
                            <p className={text.caption}>{item.situation}</p>
                            <p className={text.bodyStrong}>{side === undefined ? "—" : item.sides[side].label}</p>
                        </div>
                    );
                })}
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
