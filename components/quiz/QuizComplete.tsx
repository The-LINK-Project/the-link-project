import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type QuizCompleteProps = {
  score: number | null;
  selectedAnswers: number[];
  quiz: QuizData;
  lessonIndex: number;
};

const QuizComplete = ({
  score,
  selectedAnswers,
  quiz,
  lessonIndex,
}: QuizCompleteProps) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl p-10 shadow-xl text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-6">
            Quiz Complete!
          </h2>

          <div className="bg-primary/15 rounded-xl p-6 mb-6">
            <div className="text-5xl font-extrabold text-primary mb-2">
              {score ?? 0}%
            </div>
            <p className="text-lg text-slate-700 font-medium">
              You scored{" "}
              <span className="font-bold text-primary">
                {
                  selectedAnswers.filter(
                    (ans, idx) => ans === quiz.questions[idx].correctAnswerIndex
                  ).length
                }
              </span>{" "}
              out of{" "}
              <span className="font-bold text-primary">
                {quiz.questions.length}
              </span>{" "}
              questions correctly
            </p>
          </div>

          <div className="mb-6">
            {(score ?? 0) >= 90 ? (
              <p className="text-primary text-lg font-semibold">
                Outstanding performance!
              </p>
            ) : (score ?? 0) >= 70 ? (
              <p className="text-primary text-lg font-semibold">
                Great job! Keep it up!
              </p>
            ) : (score ?? 0) >= 50 ? (
              <p className="text-yellow-600 text-lg font-semibold">
                Good effort! Room for improvement
              </p>
            ) : (
              <p className="text-destructive/50 text-lg font-semibold">
                Keep studying and try again!
              </p>
            )}
          </div>

          <Link href="/results">
            <Button className="px-6 py-3 bg-primary text-white text-md font-semibold rounded-xl hover:bg-primary/90 hover:cursor-grabbing transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              See All Quiz Results
            </Button>
          </Link>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <Link href={`/learn/${lessonIndex - 1}`}>
            <Button
              variant="outline"
              className="px-6 py-3 text-md font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
              disabled={lessonIndex <= 0}
            >
              ← Back to Previous Lesson
            </Button>
          </Link>

          <Link href={`/learn/${lessonIndex + 1}`}>
            <Button className="px-6 py-3 bg-primary text-white text-md font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Next Lesson →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
