import React, { useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";

type Props = {
  lessonObjectives: string[];
  lessonObjectivesProgress: boolean[];
};

const LessonObjectivesMet = ({
  lessonObjectives,
  lessonObjectivesProgress,
}: Props) => {
  // Debug logging for objective state changes
  useEffect(() => {
    console.log("Objectives UI Update:", {
      objectives: lessonObjectives,
      progress: lessonObjectivesProgress,
      completedCount: lessonObjectivesProgress.filter(Boolean).length,
    });
  }, [lessonObjectives, lessonObjectivesProgress]);

  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
      {lessonObjectives.map((objective: string, index: number) => {
        const isCompleted = lessonObjectivesProgress[index];

        return (
          <div
            key={`objective-${index}`}
            className={`flex items-center gap-2 transition-all duration-300 ${
              isCompleted ? "animate-pulse" : ""
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 animate-bounce" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
            )}
            <span
              className={`text-sm transition-all duration-300 ${
                isCompleted
                  ? "text-green-700 line-through font-medium"
                  : "text-gray-700"
              }`}
            >
              {objective}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default LessonObjectivesMet;
