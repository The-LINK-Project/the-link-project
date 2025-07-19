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
  const primary = "var(--primary)";
  const primaryFg = "var(--primary-foreground)";
  const muted = "var(--muted)";
  const mutedFg = "var(--muted-foreground)";
  const border = "var(--border)";
  const card = "var(--card)";
  const cardFg = "var(--card-foreground)";
  const disabledBg = "var(--muted)";
  const disabledFg = "var(--muted-foreground)";

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
          style={
            selectedAnswers.includes(-1)
              ? {
                  background: disabledBg,
                  color: disabledFg,
                  cursor: "not-allowed",
                  borderRadius: "var(--radius-xl)",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  boxShadow: "var(--shadow-lg)",
                  padding: "0.75rem 2.5rem",
                  transition: "all 0.3s",
                }
              : {
                  background: primary,
                  color: primaryFg,
                  borderRadius: "var(--radius-xl)",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  boxShadow: "var(--shadow-lg)",
                  padding: "0.75rem 2.5rem",
                  transition: "all 0.3s",
                }
          }
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
