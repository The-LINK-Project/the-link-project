"use client";
import { useState } from "react";
import { savePictureStoryResult } from "@/lib/actions/pictureStory.actions";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Check,
    ChevronRight,
    RotateCcw,
    Trophy,
    X,
} from "lucide-react";

type PictureStoryGameProps = {
    sets: PictureStorySetAdmin[];
};

const isImageUrl = (item: string) => /^https?:\/\//.test(item);

export default function PictureStoryGame({ sets }: PictureStoryGameProps) {
    const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const activeSet = activeSetIndex !== null ? sets[activeSetIndex] : null;

    const startSet = (index: number) => {
        setActiveSetIndex(index);
        setQuestionIndex(0);
        setSelectedOption(null);
        setCorrectCount(0);
        setIsFinished(false);
    };

    const handleOptionTap = (optionIndex: number) => {
        if (!activeSet || selectedOption !== null) return;
        setSelectedOption(optionIndex);
        const question = activeSet.questions[questionIndex];
        if (optionIndex === question.correctAnswerIndex) {
            setCorrectCount((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (!activeSet) return;
        if (questionIndex + 1 < activeSet.questions.length) {
            setQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);

            // Fire-and-forget: the game keeps working even if saving fails
            savePictureStoryResult({
                setId: activeSet._id,
                score: correctCount,
                totalQuestions: activeSet.questions.length,
            }).catch((error) => {
                console.error("Error saving picture story result:", error);
            });
        }
    };

    // Set picker / start screen
    if (!activeSet) {
        return (
            <div className="space-y-4">
                {sets.map((set, index) => (
                    <button
                        key={set._id}
                        type="button"
                        onClick={() => startSet(index)}
                        className="group flex w-full items-center gap-4 rounded-2xl border-2 border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary active:scale-[0.98]"
                    >
                        <span className="text-4xl">📖</span>
                        <span className="flex-1">
                            <span className="block text-lg font-semibold text-foreground">
                                {set.title}
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

    // Final score screen
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

    const question = activeSet.questions[questionIndex];
    const total = activeSet.questions.length;
    const hasAnswered = selectedOption !== null;
    const isCorrect = selectedOption === question.correctAnswerIndex;
    const isLastQuestion = questionIndex + 1 === total;

    return (
        <div>
            {/* Progress */}
            <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
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

            {/* Picture / emoji sequence */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm sm:gap-3 sm:p-8">
                {question.sequence.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        {index > 0 && (
                            <span
                                aria-hidden="true"
                                className="text-2xl text-muted-foreground"
                            >
                                →
                            </span>
                        )}
                        {isImageUrl(item) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={item}
                                alt="Story picture"
                                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                            />
                        ) : (
                            <span className="text-5xl sm:text-6xl">{item}</span>
                        )}
                    </span>
                ))}
            </div>

            <p className="mb-4 text-center text-lg font-medium text-foreground">
                👆 Tap the correct sentence.
            </p>

            {/* Answer options */}
            <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                    const isCorrectOption =
                        optionIndex === question.correctAnswerIndex;
                    const isSelectedOption = optionIndex === selectedOption;

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
                            stateClasses = "border-border bg-card opacity-50";
                        }
                    }

                    return (
                        <button
                            key={optionIndex}
                            type="button"
                            onClick={() => handleOptionTap(optionIndex)}
                            disabled={hasAnswered}
                            className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left text-lg font-medium transition-all duration-200 ${stateClasses}`}
                        >
                            <span>{option}</span>
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

            {/* Feedback + next */}
            {hasAnswered && (
                <div className="mt-5 text-center">
                    <p className="mb-4 text-xl font-semibold">
                        {isCorrect ? (
                            <span className="text-emerald-600">
                                ✅ Correct!
                            </span>
                        ) : (
                            <span className="text-red-500">
                                ❌ The green one is correct.
                            </span>
                        )}
                    </p>
                    <Button
                        size="lg"
                        className="h-14 w-full text-lg font-semibold sm:w-auto sm:px-12"
                        onClick={handleNext}
                    >
                        {isLastQuestion ? "See score" : "Next"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
