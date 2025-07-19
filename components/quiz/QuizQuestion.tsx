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
  const primary = "var(--primary)";
  const primaryFg = "var(--primary-foreground)";
  const card = "var(--card)";
  const cardFg = "var(--card-foreground)";
  const border = "var(--border)";
  const muted = "var(--muted)";
  const mutedFg = "var(--muted-foreground)";

  return (
    <div
      key={qIndex}
      className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{ background: card, color: cardFg }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-md"
          style={{ background: primary, color: primaryFg }}
        >
          {qIndex + 1}
        </div>
        <div className="flex-1">
          <h3
            className="text-lg font-semibold leading-relaxed"
            style={{ color: cardFg }}
          >
            {q.questionText}
          </h3>
        </div>
      </div>

      <div className="grid gap-2 ml-11">
        {q.options.map((opt, optIndex) => {
          const isSelected = selectedAnswers[qIndex] === optIndex;
          return (
            <button
              key={optIndex}
              className="group p-3 border-2 rounded-lg transition-all duration-200 text-left font-medium"
              style={
                isSelected
                  ? {
                      background:
                        "color-mix(in srgb, " + primary + " 10%, transparent)",
                      borderColor: primary,
                      color: primary,
                      boxShadow: "var(--shadow-md)",
                      transform: "scale(1.01)",
                    }
                  : {
                      background: card,
                      borderColor: border,
                      color: mutedFg,
                    }
              }
              onClick={() => handleAnswerSelect(qIndex, optIndex)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border-2 transition-all duration-200"
                  style={
                    isSelected
                      ? { background: primary, borderColor: primary }
                      : { borderColor: border }
                  }
                >
                  {isSelected && (
                    <div
                      className="w-full h-full rounded-full"
                      style={{ background: card }}
                    ></div>
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
