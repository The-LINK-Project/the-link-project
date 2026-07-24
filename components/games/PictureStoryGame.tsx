"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import PicturePanel from "@/components/games/PicturePanel";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronRight,
    RotateCcw,
    Trophy,
    X,
} from "lucide-react";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

type PictureStoryGameProps = {
    sets: PictureStoryGameSet[];
};

const DIFFICULTY_STYLES: Record<GameDifficulty, string> = {
    easy: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-rose-100 text-rose-700",
};

export default function PictureStoryGame({ sets }: PictureStoryGameProps) {
    const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [orderPicks, setOrderPicks] = useState<number[]>([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    // Bumped on replay so the shuffles below recompute
    const [nonce, setNonce] = useState(0);

    const activeSet = activeSetIndex !== null ? sets[activeSetIndex] : null;
    const question = activeSet?.questions[questionIndex];

    // The content bank always stores the correct answer at index 0, so the
    // options MUST be shuffled here or the answer is always the first button.
    const shuffledOptions = useMemo(() => {
        if (!question) return [];
        return shuffle(
            question.options.map((text, originalIndex) => ({
                text,
                originalIndex,
            })),
        );
    }, [question, nonce]);

    // For "order" questions the sequence is stored in the CORRECT order.
    const shuffledPanels = useMemo(() => {
        if (!question || question.type !== "order") return [];
        return shuffle(
            question.sequence.map((src, correctIndex) => ({
                src,
                correctIndex,
            })),
        );
    }, [question, nonce]);

    const isOrder = question?.type === "order";
    const hasAnswered = isOrder
        ? orderPicks.length === shuffledPanels.length && shuffledPanels.length > 0
        : selectedOption !== null;

    const isCorrect = isOrder
        ? orderPicks.every(
              (panelIndex, position) =>
                  shuffledPanels[panelIndex]?.correctIndex === position,
          )
        : selectedOption !== null &&
          shuffledOptions[selectedOption]?.originalIndex ===
              question?.correctAnswerIndex;

    const startSet = (index: number) => {
        setActiveSetIndex(index);
        setQuestionIndex(0);
        setSelectedOption(null);
        setOrderPicks([]);
        setCorrectCount(0);
        setIsFinished(false);
        setNonce((n) => n + 1);
    };

    const handleOptionTap = (shuffledIndex: number) => {
        if (!question || hasAnswered) return;
        setSelectedOption(shuffledIndex);
        if (
            shuffledOptions[shuffledIndex]?.originalIndex ===
            question.correctAnswerIndex
        ) {
            setCorrectCount((prev) => prev + 1);
        }
    };

    const handlePanelTap = (panelIndex: number) => {
        if (hasAnswered || orderPicks.includes(panelIndex)) return;
        const next = [...orderPicks, panelIndex];
        setOrderPicks(next);
        if (next.length === shuffledPanels.length) {
            const allRight = next.every(
                (idx, position) =>
                    shuffledPanels[idx]?.correctIndex === position,
            );
            if (allRight) setCorrectCount((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (!activeSet) return;
        if (questionIndex + 1 < activeSet.questions.length) {
            setQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setOrderPicks([]);
        } else {
            setIsFinished(true);
            // Nothing is saved — results are not stored for the focus group.
        }
    };

    // ------------------------------------------------------------ set picker

    if (!activeSet) {
        return (
            <div className="space-y-4">
                <p className="mb-4 text-center text-lg font-medium text-foreground">
                    👇 Choose a story.
                </p>
                {sets.map((set, index) => (
                    <button
                        key={set._id}
                        type="button"
                        onClick={() => startSet(index)}
                        className="group flex w-full items-center gap-4 rounded-2xl border-2 border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary active:scale-[0.98]"
                    >
                        <span className="text-4xl">📖</span>
                        <span className="flex-1">
                            <span className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="text-lg font-semibold text-foreground">
                                    {set.title}
                                </span>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${DIFFICULTY_STYLES[set.difficulty]}`}
                                >
                                    {set.difficulty}
                                </span>
                            </span>
                            <span className="block text-sm text-muted-foreground">
                                {set.questions.length} questions
                            </span>
                        </span>
                        <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </button>
                ))}
            </div>
        );
    }

    // ----------------------------------------------------------- score screen

    if (isFinished) {
        const total = activeSet.questions.length;
        const percentage = Math.round((correctCount / total) * 100);
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <Trophy className="mx-auto mb-4 h-14 w-14 text-amber-500" />
                <h2 className="mb-2 text-3xl font-bold text-foreground">
                    {percentage >= 70 ? "Great job! 🎉" : "Good try! 💪"}
                </h2>
                <p className="mb-8 text-xl text-muted-foreground">
                    You got{" "}
                    <span className="font-bold text-emerald-600">
                        {correctCount} / {total}
                    </span>{" "}
                    correct
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 text-lg font-semibold"
                        onClick={() => startSet(activeSetIndex!)}
                    >
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Play again
                    </Button>
                    {sets.length > 1 && (
                        <Button
                            size="lg"
                            className="h-14 text-lg font-semibold"
                            onClick={() => setActiveSetIndex(null)}
                        >
                            More stories
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    if (!question) return null;

    const total = activeSet.questions.length;
    const isLastQuestion = questionIndex + 1 === total;

    return (
        <div>
            {/* Progress */}
            <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                    <button
                        type="button"
                        onClick={() => setActiveSetIndex(null)}
                        className="flex items-center gap-1 hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Stories
                    </button>
                    <span>
                        Question {questionIndex + 1} / {total}
                    </span>
                    <span className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-emerald-600" />
                        {correctCount}
                    </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{
                            width: `${((questionIndex + (hasAnswered ? 1 : 0)) / total) * 100}%`,
                        }}
                    />
                </div>
            </div>

            {isOrder ? (
                /* ---------------------------------------- order-the-pictures */
                <>
                    <p className="mb-4 text-center text-lg font-medium text-foreground">
                        👆 {question.prompt ?? "Put the pictures in the right order."}
                    </p>

                    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {shuffledPanels.map((panel, panelIndex) => {
                            const position = orderPicks.indexOf(panelIndex);
                            const picked = position !== -1;
                            const rightSpot =
                                hasAnswered && panel.correctIndex === position;

                            let stateClasses =
                                "border-border bg-card hover:border-primary/60 active:scale-95";
                            if (hasAnswered) {
                                stateClasses = rightSpot
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-red-400 bg-red-50";
                            } else if (picked) {
                                stateClasses =
                                    "border-primary bg-primary/10 ring-2 ring-primary";
                            }

                            return (
                                <button
                                    key={panelIndex}
                                    type="button"
                                    onClick={() => handlePanelTap(panelIndex)}
                                    disabled={hasAnswered || picked}
                                    className={`relative flex min-h-36 items-center justify-center rounded-2xl border-2 p-3 pt-8 shadow-sm transition-all duration-200 ${stateClasses}`}
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

                    {!hasAnswered && orderPicks.length > 0 && (
                        <div className="mb-4 text-center">
                            <Button
                                variant="outline"
                                onClick={() => setOrderPicks([])}
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Start again
                            </Button>
                        </div>
                    )}

                    {hasAnswered && !isCorrect && (
                        <div className="mb-4 rounded-2xl border border-border bg-muted/50 p-4">
                            <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">
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
                                                className="mt-5 text-xl text-muted-foreground sm:mt-6"
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
                </>
            ) : (
                /* ------------------------------------------- multiple choice */
                <>
                    <div className="mb-5 flex flex-wrap items-start justify-center gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm sm:gap-3 sm:p-8">
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

                    <p className="mb-4 text-center text-lg font-medium text-foreground">
                        👆 {question.prompt ?? "Tap the correct sentence."}
                    </p>

                    <div className="space-y-3">
                        {shuffledOptions.map((option, shuffledIndex) => {
                            const isCorrectOption =
                                option.originalIndex ===
                                question.correctAnswerIndex;
                            const isSelectedOption =
                                shuffledIndex === selectedOption;

                            let stateClasses =
                                "border-border bg-card shadow-sm hover:border-primary/60 active:scale-[0.98]";
                            if (hasAnswered) {
                                if (isCorrectOption) {
                                    stateClasses =
                                        "border-emerald-500 bg-emerald-50 text-emerald-800";
                                } else if (isSelectedOption) {
                                    stateClasses =
                                        "border-red-400 bg-red-50 text-red-700 game-shake";
                                } else {
                                    stateClasses =
                                        "border-border bg-card opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={shuffledIndex}
                                    type="button"
                                    onClick={() =>
                                        handleOptionTap(shuffledIndex)
                                    }
                                    disabled={hasAnswered}
                                    className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left text-lg font-medium transition-all duration-200 ${stateClasses}`}
                                >
                                    <span>{option.text}</span>
                                    {hasAnswered && isCorrectOption && (
                                        <Check className="h-6 w-6 shrink-0 text-emerald-600" />
                                    )}
                                    {hasAnswered &&
                                        isSelectedOption &&
                                        !isCorrectOption && (
                                            <X className="h-6 w-6 shrink-0 text-red-500" />
                                        )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Feedback + explanation + next */}
            {hasAnswered && (
                <div className="mt-5">
                    <p className="mb-3 text-center text-xl font-semibold">
                        {isCorrect ? (
                            <span className="text-emerald-600">
                                ✅ Correct!
                            </span>
                        ) : (
                            <span className="text-red-500">
                                ❌ Not quite.
                            </span>
                        )}
                    </p>

                    {question.explanation && (
                        <div className="mb-5 rounded-2xl border border-border bg-muted/50 p-5 text-center">
                            <p className="text-base leading-relaxed text-foreground sm:text-lg">
                                💡 {question.explanation}
                            </p>
                        </div>
                    )}

                    <div className="text-center">
                        <Button
                            size="lg"
                            className="h-14 w-full text-lg font-semibold sm:w-auto sm:px-12"
                            onClick={handleNext}
                        >
                            {isLastQuestion ? "See score" : "Next"}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
