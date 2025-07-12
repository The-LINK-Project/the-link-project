import React from "react";
import { CheckCircle, Circle } from "lucide-react";

type Props = {
  lessonObjectives: string[];
  lessonObjectivesProgress: boolean[];
};

const LessonObjectivesMet = ({
  lessonObjectives,
  lessonObjectivesProgress,
}: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
      {lessonObjectives.map((objective: string, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {lessonObjectivesProgress[index] ? (
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          ) : (
            <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
          )}
          <span
            className={`text-sm ${
              lessonObjectivesProgress[index]
                ? "text-green-700 line-through"
                : "text-gray-700"
            }`}
          >
            {objective}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LessonObjectivesMet;
