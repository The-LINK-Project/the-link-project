import React from "react";
import QuizQuestion from "./QuizQuestion";
import QuizProgressBar from "./QuizProgressBar";

type QuizIncompleteProps = {
    quiz: PublicQuizData;
    selectedAnswers: number[];
    handleAnswerSelect: (questionIndex: number, answerIndex: number) => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
};

const QuizIncomplete = ({
    quiz,
    selectedAnswers,
    handleAnswerSelect,
    handleSubmit,
    isSubmitting,
}: QuizIncompleteProps) => {
    return (
        <>
            <QuizProgressBar selectedAnswers={selectedAnswers} quiz={quiz} />
            <div className="space-y-6">
                {quiz.questions.map((q: PublicQuizQuestion, qIndex: number) => (
                    <QuizQuestion
                        key={qIndex}
                        q={q}
                        qIndex={qIndex}
                        selectedAnswers={selectedAnswers}
                        handleAnswerSelect={handleAnswerSelect}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <button
                    disabled={selectedAnswers.includes(-1) || isSubmitting}
                    onClick={handleSubmit}
                    className={`px-10 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg ${selectedAnswers.includes(-1) || isSubmitting
                        ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl transform hover:scale-105"
                        }`}
                >
                    {isSubmitting
                        ? "Submitting..."
                        : selectedAnswers.includes(-1)
                            ? "Answer All Questions"
                            : "Submit Quiz"}
                </button>
            </div>
        </>
    );
};

export default QuizIncomplete;
