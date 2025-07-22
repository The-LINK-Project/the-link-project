import React from "react";

type QuizQuestionProps = {
  q: Question;
  qIndex: number;
  selectedAnswers: number[];
  handleAnswerSelect: (questionIndex: number, answerIndex: number) => void;
};

const QuizQuestion = ({
  q,
  qIndex,
  selectedAnswers,
  handleAnswerSelect,
}: QuizQuestionProps) => {
  const isSelected = (optIndex: number) => selectedAnswers[qIndex] === optIndex;
  return (
    <div
      key={qIndex}
      className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-card text-card-foreground"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-md bg-primary text-primary-foreground">
          {qIndex + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-relaxed text-card-foreground">
            {q.questionText}
          </h3>
        </div>
      </div>

      <div className="grid gap-2 ml-11">
        {q.options.map((opt, optIndex) => {
          const selected = isSelected(optIndex);
          return (
            <button
              key={optIndex}
              className={
                `group p-3 border-2 rounded-lg transition-all duration-200 text-left font-medium ` +
                (selected
                  ? "bg-primary/10 border-primary text-primary shadow-md scale-[1.01]"
                  : "bg-card border-border text-muted-foreground")
              }
              onClick={() => handleAnswerSelect(qIndex, optIndex)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    `w-4 h-4 rounded-full border-2 transition-all duration-200 ` +
                    (selected ? "bg-primary border-primary" : "border-border")
                  }
                >
                  {selected && (
                    <div className="w-full h-full rounded-full bg-card" />
                  )}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
