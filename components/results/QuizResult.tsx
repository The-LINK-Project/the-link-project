import React from "react";

type QuizResultProps = {
  result: QuizResult;
  lessons: Lesson[];
};

const QuizResult = ({ result, lessons }: QuizResultProps) => {
  return (
    <div
      key={result._id.toString()}
      className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <div className="col-span-4">
        <div className="text-sm text-gray-900 font-medium">
          {new Date(result.completedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(result.completedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="col-span-5">
        <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
          {lessons[result.lessonId].title}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Lesson {result.lessonId + 1}
        </div>
      </div>

      <div className="col-span-2">
        <div className="text-lg font-bold text-gray-900">{result.score}%</div>
      </div>

      <div className="col-span-1">
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium  text-white ${
            result.score >= 80
              ? "bg-primary "
              : result.score >= 70
                ? "bg-blue-300 text-gray-800"
                : result.score >= 50
                  ? "bg-yellow-300 text-gray-700"
                  : result.score >= 40
                    ? "bg-orange-300 text-gray-700"
                    : result.score >= 30
                      ? "bg-red-300 text-gray-600"
                      : "bg-red-500 text-white"
          }`}
        >
          {result.score >= 80
            ? "A"
            : result.score >= 70
              ? "B"
              : result.score >= 50
                ? "C"
                : result.score >= 40
                  ? "D"
                  : result.score >= 30
                    ? "E"
                    : "F"}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
