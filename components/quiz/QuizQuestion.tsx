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
  return (
    <div
      key={qIndex}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-[rgb(90,199,219)] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
          {qIndex + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
            {q.questionText}
          </h3>
        </div>
      </div>

      <div className="grid gap-2 ml-11">
        {q.options.map((opt, optIndex) => (
          <button
            key={optIndex}
            className={`group p-3 border-2 rounded-lg transition-all duration-200 text-left font-medium ${
              selectedAnswers[qIndex] === optIndex
                ? "bg-[rgb(90,199,219)]/10 border-[rgb(90,199,219)] text-[rgb(90,199,219)] shadow-md transform scale-[1.01]"
                : "bg-white border-slate-200 text-slate-700 hover:bg-[rgb(90,199,219)]/5 hover:border-[rgb(90,199,219)]/50 hover:shadow-sm"
            }`}
            onClick={() => handleAnswerSelect(qIndex, optIndex)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  selectedAnswers[qIndex] === optIndex
                    ? "bg-[rgb(90,199,219)] border-[rgb(90,199,219)]"
                    : "border-slate-300 group-hover:border-[rgb(90,199,219)]"
                }`}
              >
                {selectedAnswers[qIndex] === optIndex && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
              <span>{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
