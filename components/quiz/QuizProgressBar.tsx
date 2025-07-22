import React from "react";

type QuizProgressBarProps = {
  selectedAnswers: number[];
  quiz: QuizData;
};

const QuizProgressBar = ({ selectedAnswers, quiz }: QuizProgressBarProps) => {
  const answered = selectedAnswers.filter((a) => a !== -1).length;
  const percent = (answered / quiz.questions.length) * 100;
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-card-foreground">
          Progress
        </span>
        <span className="text-sm font-medium text-primary">
          {answered} of {quiz.questions.length} answered
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgressBar;
