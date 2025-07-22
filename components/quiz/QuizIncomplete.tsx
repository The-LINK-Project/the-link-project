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
  const isDisabled = selectedAnswers.includes(-1);
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
          disabled={isDisabled}
          onClick={handleSubmit}
          className={
            `rounded-xl font-semibold text-lg shadow-lg px-10 py-3 transition-all duration-300 ` +
            (isDisabled
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
              : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl")
          }
        >
          {isDisabled ? "Answer All Questions" : "Submit Quiz"}
        </button>
      </div>
    </>
  );
};

export default QuizIncomplete;
