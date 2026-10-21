"use client";

import { CircleCheck, CircleX, ThumbsUp, Timer, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import GameTimer, { formatTime } from "@/components/games/GameTimer";
import { LessonFooter } from "@/components/learn/LessonFooter";
import { LessonProgress } from "@/components/learn/LessonProgress";
import { LessonShell, ShellActions } from "@/components/learn/LessonShell";
import { BackButton, WithBack } from "@/components/learn/StepNav";
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

import { markEthicsPlayed } from "./EthicsCard";
import { ETHICS_HUE, EthicsCoin } from "./EthicsCoin";

/**
 * Ethics of AI: four slides, then a four-round team game for the workshop,
 * played on a laptop with a group round it. The slides are the lesson, each
 * ending in one tap that is not scored. Sort, Match and Build are timed and
 * scored like Word Match. The Dilemmas are not: the clock stops, the team
 * picks a side, and says why out loud.
 *
 * Built from the lesson kit so it looks like every other lesson. Nothing is
 * saved: the finish screen is the result, and teams compare out loud.
 */
const ROUNDS = 4;
const WRONG_PAIR_FEEDBACK_MS = 600;

/**
 * Every screen of the game, in order. Back and Next walk it the way they walk
 * a lesson (see StepNav): a screen the team has passed can be looked at again
 * or tried again, but only as practice. The score, the clock and the progress
 * bar stay where the team had got to, and Next walks on without answering.
 */
type Step =
    | { kind: "learn"; index: number }
    | { kind: "intro" }
    | { kind: "sort"; index: number }
    | { kind: "recap" }
    | { kind: "match" }
    | { kind: "build"; index: number }
    | { kind: "dilemma"; index: number }
    | { kind: "finished" };

const STEPS: Step[] = [
    ...ETHICS_SLIDES.map((_, index): Step => ({ kind: "learn", index })),
    { kind: "intro" },
    ...ETHICS_SORT_CARDS.map((_, index): Step => ({ kind: "sort", index })),
    { kind: "recap" },
    { kind: "match" },
    ...ETHICS_BUILD_ITEMS.map((_, index): Step => ({ kind: "build", index })),
    ...ETHICS_DILEMMAS.map((_, index): Step => ({ kind: "dilemma", index })),
    { kind: "finished" },
];
const FIRST_ROUND = STEPS.findIndex((step) => step.kind === "sort");

/**
 * The clock runs through the three scored rounds, on the screen the team has
 * got to. It stops on the recap, for the dilemmas, and while the team looks back.
 */
const runsClock = (position: number, reached: number) =>
    position >= reached && ["sort", "match", "build"].includes(STEPS[position].kind);

/** Another go at a screen already passed: graded on screen, never scored. */
type Practice = { pick: 0 | 1 | null; verdict: EthicsVerdict | null; matched: string[]; built: boolean | null };
const NO_PRACTICE: Practice = { pick: null, verdict: null, matched: [], built: null };

type Side = "situation" | "reason";
type Selection = { side: Side; pairId: string } | null;
type WrongPair = Record<Side, string> | null;

export function AiEthicsGame() {
    const t = useTranslations("ethics");
    const router = useRouter();

    const [position, setPosition] = useState(0);
    // The furthest screen the team has got to. Anything before it is a revisit.
    const [reached, setReached] = useState(0);
    const step = STEPS[position];
    const revisiting = position < reached;
    const indexOf = (kind: Step["kind"]) => (step.kind === kind && "index" in step ? step.index : 0);

    // What the team answered on the way forward. Only these count.
    const [slidePicks, setSlidePicks] = useState<Record<number, 0 | 1>>({});
    const [sortPicks, setSortPicks] = useState<Record<string, EthicsVerdict>>({});
    const [matched, setMatched] = useState<string[]>([]);
    const [builds, setBuilds] = useState<Record<string, { placed: number[]; correct: boolean }>>({});
    const [chosen, setChosen] = useState<Record<string, 0 | 1>>({});
    const [wrongAttempts, setWrongAttempts] = useState(0);

    // The screen's own state, cleared on every move: a practice answer, the
    // sentence being built, and a half-made pair.
    const [practice, setPractice] = useState<Practice>(NO_PRACTICE);
    const [placed, setPlaced] = useState<number[]>([]);
    const [selected, setSelected] = useState<Selection>(null);
    const [wrongPair, setWrongPair] = useState<WrongPair>(null);
    const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const situations = useMemo(() => seededShuffle(ETHICS_MATCH_PAIRS, "ethics-situations"), []);
    // Never the same row as its situation, or the pair reads straight across.
    const reasons = useMemo(() => seededDerangement(situations, "ethics-reasons"), [situations]);

    // `clockStart` is set so that Date.now() - clockStart is the time played so
    // far; `playedMs` holds that time while the clock is stopped.
    const [clockStart, setClockStart] = useState(0);
    const [playedMs, setPlayedMs] = useState(0);
    const running = runsClock(position, reached);

    useEffect(
        () => () => {
            if (wrongTimer.current) clearTimeout(wrongTimer.current);
        },
        [],
    );

    const clearScreen = () => {
        if (wrongTimer.current) clearTimeout(wrongTimer.current);
        setPractice(NO_PRACTICE);
        setPlaced([]);
        setSelected(null);
        setWrongPair(null);
    };

    const go = (to: number) => {
        const nextReached = Math.max(reached, to);
        const willRun = runsClock(to, nextReached);
        if (running && !willRun) setPlayedMs(Date.now() - clockStart);
        if (!running && willRun) setClockStart(Date.now() - playedMs);
        clearScreen();
        setPosition(to);
        setReached(nextReached);
    };

    const next = () => go(position + 1);

    // Back from the first slide leaves, as Back from a lesson's word list does.
    const back = () => {
        if (position === 0) router.push("/dashboard");
        else go(position - 1);
    };

    const clearGame = () => {
        clearScreen();
        setWrongAttempts(0);
        setSortPicks({});
        setMatched([]);
        setBuilds({});
        setChosen({});
        setPlayedMs(0);
    };

    // The slides are not played again; they stay behind Back.
    const playAgain = () => {
        clearGame();
        setClockStart(Date.now());
        setPosition(FIRST_ROUND);
        setReached(FIRST_ROUND);
    };

    // Everything, slides too: the room starting over, or a new team sitting down.
    const startOver = () => {
        clearGame();
        setSlidePicks({});
        setPosition(0);
        setReached(0);
    };

    // -------------------------------------------------------------- slides

    const slide = ETHICS_SLIDES[indexOf("learn")];
    const slidePick = revisiting ? practice.pick : (slidePicks[indexOf("learn")] ?? null);

    const pickSlide = (i: 0 | 1) => {
        if (slidePick !== null) return;
        if (revisiting) setPractice((prev) => ({ ...prev, pick: i }));
        else setSlidePicks((prev) => ({ ...prev, [indexOf("learn")]: i }));
    };

    // ------------------------------------------------------------- round 1

    const card = ETHICS_SORT_CARDS[indexOf("sort")];
    const picked = revisiting ? practice.verdict : (sortPicks[card.id] ?? null);

    const pick = (verdict: EthicsVerdict) => {
        if (picked) return;
        if (revisiting) {
            setPractice((prev) => ({ ...prev, verdict }));
            return;
        }
        setSortPicks((prev) => ({ ...prev, [card.id]: verdict }));
        if (verdict !== card.answer) setWrongAttempts((n) => n + 1);
    };

    // ------------------------------------------------------------- round 2

    const board = revisiting ? practice.matched : matched;

    const tap = (side: Side, pairId: string) => {
        if (board.includes(pairId)) return;
        if (!selected || selected.side === side) {
            setSelected({ side, pairId });
            return;
        }
        if (selected.pairId === pairId) {
            const done = [...board, pairId];
            if (revisiting) setPractice((prev) => ({ ...prev, matched: done }));
            else setMatched(done);
            setSelected(null);
            if (done.length === ETHICS_MATCH_PAIRS.length) next();
            return;
        }
        if (!revisiting) setWrongAttempts((n) => n + 1);
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
        if (board.includes(pairId)) return "used" as const;
        if (wrongPair?.[side] === pairId) return "incorrect" as const;
        if (selected?.side === side && selected.pairId === pairId) return "selected" as const;
        return "default" as const;
    };

    // ------------------------------------------------------------- round 3

    const buildItem = ETHICS_BUILD_ITEMS[indexOf("build")];
    const buildTokens = useMemo(
        () => seededShuffle([...buildItem.answer, ...buildItem.decoys], buildItem.id),
        [buildItem],
    );
    const built = revisiting ? undefined : builds[buildItem.id];
    const buildPlaced = built?.placed ?? placed;
    const buildResult = revisiting ? practice.built : (built?.correct ?? null);

    const checkBuild = () => {
        const sentence = placed.map((i) => buildTokens[i]);
        const correct =
            sentence.length === buildItem.answer.length && sentence.every((word, i) => word === buildItem.answer[i]);
        if (revisiting) {
            setPractice((prev) => ({ ...prev, built: correct }));
            return;
        }
        if (!correct) setWrongAttempts((n) => n + 1);
        setBuilds((prev) => ({ ...prev, [buildItem.id]: { placed, correct } }));
    };

    // ------------------------------------------------------------- round 4

    const dilemma = ETHICS_DILEMMAS[indexOf("dilemma")];
    const dilemmaChoice = chosen[dilemma.id];

    // --------------------------------------------------------------- frame

    const count = (answers: object) => Object.keys(answers).length;

    // Once there is something to lose. The finish screen has its own Play again.
    const canRestart = (reached > 0 || count(slidePicks) > 0) && step.kind !== "finished";

    // Counted from the answers, not the screen, so the bar holds still while
    // the team looks back.
    const progress =
        (count(sortPicks) / ETHICS_SORT_CARDS.length +
            matched.length / ETHICS_MATCH_PAIRS.length +
            count(builds) / ETHICS_BUILD_ITEMS.length +
            count(chosen) / ETHICS_DILEMMAS.length) /
        ROUNDS;

    // The slides show how far through them the team is, with no clock: the
    // clock belongs to the game and only starts on the word screen's Start.
    const header =
        step.kind === "learn" ? (
            <LessonProgress value={count(slidePicks) / ETHICS_SLIDES.length} />
        ) : step.kind === "intro" || step.kind === "finished" ? null : (
            <>
                <LessonProgress value={progress} />
                <span className="flex shrink-0 items-center gap-1 text-base font-bold tabular-nums text-lesson-muted">
                    <Timer className="size-5" />
                    {running ? <GameTimer startTime={clockStart} running /> : formatTime(playedMs)}
                </span>
            </>
        );

    // A screen not answered yet: Back, and Check where there is one. Next only
    // once the team has been past it.
    const answering = (check?: { onCheck: () => void; ready: boolean }) => (
        <LessonFooter
            phase="answering"
            canSubmit={check?.ready ?? false}
            result={null}
            hideSubmit={!check}
            onSubmit={() => check?.onCheck()}
            onNext={next}
            isLastStep={false}
            onBack={back}
            revisiting={revisiting}
        />
    );

    const footer = (() => {
        switch (step.kind) {
            case "learn":
                return slidePick === null ? (
                    answering()
                ) : (
                    <Outcome correct={slidePick === slide.check.answer} onBack={back} onNext={next}>
                        <p className={text.bodyStrong}>{slide.check.reason}</p>
                    </Outcome>
                );
            case "intro":
                return (
                    <ShellActions>
                        <WithBack onBack={back}>
                            <LessonButton title={revisiting ? t("continue") : t("start")} size="lg" onClick={next} />
                        </WithBack>
                    </ShellActions>
                );
            case "sort":
                return picked ? (
                    <Outcome correct={picked === card.answer} onBack={back} onNext={next}>
                        <div>
                            <LessonBadge label={ETHICS_CONCEPT_LABEL[card.concept]} tone="accent" />
                        </div>
                        <p className={text.bodyStrong}>{card.reason}</p>
                        {card.tip ? <p className={text.caption}>{card.tip}</p> : null}
                    </Outcome>
                ) : (
                    answering()
                );
            case "recap":
                return (
                    <ShellActions>
                        <WithBack onBack={back}>
                            <LessonButton
                                title={revisiting ? t("continue") : t("startRound2")}
                                size="lg"
                                onClick={next}
                            />
                        </WithBack>
                    </ShellActions>
                );
            case "match":
                return answering();
            case "build":
                return buildResult === null ? (
                    answering({ onCheck: checkBuild, ready: placed.length > 0 })
                ) : (
                    <Outcome correct={buildResult} onBack={back} onNext={next}>
                        {buildResult ? null : (
                            <p className={text.caption}>
                                {t("modelAnswer")} <span className={text.bodyStrong}>{buildItem.answer.join(" ")}</span>
                            </p>
                        )}
                    </Outcome>
                );
            case "dilemma":
                return dilemmaChoice === undefined ? (
                    answering()
                ) : (
                    <ShellActions>
                        <p className={cn(text.bodyStrong, "pb-3 text-center")}>{t("dilemmaSay")}</p>
                        <WithBack onBack={back}>
                            <LessonButton title={t("continue")} size="lg" onClick={next} />
                        </WithBack>
                    </ShellActions>
                );
            case "finished":
                return (
                    <ShellActions>
                        {/* Back to the last dilemma, to look at it again. */}
                        <WithBack onBack={back}>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <LessonButton
                                    title={t("home")}
                                    size="lg"
                                    variant="outline"
                                    onClick={() => router.push("/dashboard")}
                                />
                                <LessonButton title={t("playAgain")} size="lg" onClick={playAgain} />
                            </div>
                        </WithBack>
                    </ShellActions>
                );
        }
    })();

    return (
        <LessonShell
            closeLabel={t("close")}
            onClose={() => router.push("/dashboard")}
            header={header}
            footer={footer}
            onRestart={canRestart ? startOver : undefined}
        >
            {step.kind === "learn" ? (
                <Slide
                    slide={slide}
                    index={step.index}
                    total={ETHICS_SLIDES.length}
                    picked={slidePick}
                    onPick={pickSlide}
                />
            ) : null}

            {step.kind === "intro" ? <Intro /> : null}

            {step.kind === "sort" ? (
                <SortRound card={card} index={step.index} total={ETHICS_SORT_CARDS.length} picked={picked} onPick={pick} />
            ) : null}

            {step.kind === "recap" ? <Recap /> : null}

            {step.kind === "match" ? (
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

            {step.kind === "build" ? (
                <BuildRound
                    item={buildItem}
                    index={step.index}
                    total={ETHICS_BUILD_ITEMS.length}
                    tokens={buildTokens}
                    placed={buildPlaced}
                    onChange={setPlaced}
                    result={buildResult}
                />
            ) : null}

            {step.kind === "dilemma" ? (
                <DilemmaRound
                    dilemma={dilemma}
                    index={step.index}
                    total={ETHICS_DILEMMAS.length}
                    choice={dilemmaChoice}
                    onChoose={(side) => setChosen((prev) => ({ ...prev, [dilemma.id]: side }))}
                />
            ) : null}

            {step.kind === "finished" ? <Finished timeMs={playedMs} wrongAttempts={wrongAttempts} chosen={chosen} /> : null}
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

/** The graded banner under an answer, drawn like the lesson footer, with Back beside Continue. */
function Outcome({
    correct,
    onBack,
    onNext,
    children,
}: {
    correct: boolean;
    onBack: () => void;
    onNext: () => void;
    children?: React.ReactNode;
}) {
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
            <div className="flex gap-3">
                <BackButton onClick={onBack} />
                <LessonButton
                    autoFocus
                    title={t("continue")}
                    size="lg"
                    variant={correct ? "primary" : "destructive"}
                    onClick={onNext}
                    className="min-w-0 flex-1"
                />
            </div>
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
            <LessonCardBox className="flex flex-col gap-1">
                <p className={text.label}>{t("cardOf", { index: index + 1, total })}</p>
                <p className={text.bodyStrong}>{item.situation}</p>
            </LessonCardBox>
            {/* The sentence always begins with one of the two stems; saying so
                here means the only thing to work out is which, and the ending. */}
            <LessonCardBox tone="muted" className="flex flex-col gap-1">
                <p className={text.label}>{t("buildStemsLabel")}</p>
                <p className={text.bodyStrong}>{t("stemGood")}</p>
                <p className={text.bodyStrong}>{t("stemProblem")}</p>
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
    useEffect(markEthicsPlayed, []);

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
