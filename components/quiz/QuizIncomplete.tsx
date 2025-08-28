import React from "react";
import QuizQuestion from "./QuizQuestion";
import QuizProgressBar from "./QuizProgressBar";

type QuizIncompleteProps = {
    quiz: QuizData;
    selectedAnswers: number[];
    handleAnswerSelect: (questionIndex: number, answerIndex: number) => void;
    handleSubmit: () => void;
};

const QuizIncomplete = ({
    quiz,
    selectedAnswers,
    handleAnswerSelect,
    handleSubmit,
}: QuizIncompleteProps) => {
    return (
        <>
            <QuizProgressBar selectedAnswers={selectedAnswers} quiz={quiz} />
            <div className="space-y-6">
                {quiz.questions.map((q: Question, qIndex: number) => (
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
                    disabled={selectedAnswers.includes(-1)}
                    onClick={handleSubmit}
                    className={`px-10 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg ${selectedAnswers.includes(-1)
                        ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl transform hover:scale-105"
                        }`}
                >
                    {selectedAnswers.includes(-1)
                        ? "Answer All Questions"
                        : "Submit Quiz"}
                </button>
            </div>
        </>
    );
};

export default QuizIncomplete;
