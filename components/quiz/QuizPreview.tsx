"use client";

interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizData {
  title: string;
  lessonId: string;
  questions: Question[];
}

interface QuizPreviewProps {
  quizData: QuizData;
}

export default function QuizPreview({ quizData }: QuizPreviewProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[rgb(90,199,219)]">
      <h2 className="text-2xl font-semibold text-[rgb(90,199,219)] mb-6">
        Quiz Preview
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {quizData.title}
        </h3>
        <p className="text-slate-600">Lesson ID: {quizData.lessonId}</p>
      </div>

      <div className="space-y-6">
        {quizData.questions.map((question, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[rgb(90,199,219)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <h4 className="text-lg font-semibold text-slate-800 flex-1">
                {question.questionText || "Question text not set"}
              </h4>
            </div>

            <div className="ml-11 space-y-2">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-3 border-2 rounded-lg ${
                    optIndex === question.correctAnswerIndex
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        optIndex === question.correctAnswerIndex
                          ? "bg-green-500 border-green-500"
                          : "border-slate-300"
                      }`}
                    >
                      {optIndex === question.correctAnswerIndex && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span>{option || `Option ${optIndex + 1} not set`}</span>
                    {optIndex === question.correctAnswerIndex && (
                      <span className="text-xs font-medium text-green-600 ml-auto">
                        ✓ Correct Answer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
