import React from "react";

type QuizProgressBarProps = {
  selectedAnswers: number[];
  quiz: QuizData;
};

const QuizProgressBar = ({ selectedAnswers, quiz }: QuizProgressBarProps) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-slate-700">Progress</span>
        <span className="text-sm font-medium text-[rgb(90,199,219)]">
          {selectedAnswers.filter((a) => a !== -1).length} of{" "}
          {quiz.questions.length} answered
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-[rgb(90,199,219)] h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{
            width: `${
              (selectedAnswers.filter((a) => a !== -1).length /
                quiz.questions.length) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgressBar;
