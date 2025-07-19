import React from "react";

type QuizProgressBarProps = {
  selectedAnswers: number[];
  quiz: QuizData;
};

const QuizProgressBar = ({ selectedAnswers, quiz }: QuizProgressBarProps) => {
  const primary = "var(--primary)";
  const muted = "var(--muted)";
  const mutedFg = "var(--muted-foreground)";
  const border = "var(--border)";
  const card = "var(--card)";
  const cardFg = "var(--card-foreground)";

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium" style={{ color: cardFg }}>
          Progress
        </span>
        <span className="text-sm font-medium" style={{ color: primary }}>
          {selectedAnswers.filter((a) => a !== -1).length} of{" "}
          {quiz.questions.length} answered
        </span>
      </div>
      <div
        style={{
          width: "100%",
          background: muted,
          borderRadius: "9999px",
          height: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: primary,
            height: 12,
            borderRadius: "9999px",
            width: `${
              (selectedAnswers.filter((a) => a !== -1).length /
                quiz.questions.length) *
              100
            }%`,
            transition: "width 0.5s ease-out",
            boxShadow: "var(--shadow-sm)",
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgressBar;
