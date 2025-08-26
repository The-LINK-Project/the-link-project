import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <div className="bg-white rounded-xl p-6 shadow-xl text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
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

          <h2 className="text-2xl font-bold text-primary mb-4">
            Quiz Complete!
          </h2>

          <div className="bg-primary/15 rounded-xl p-4 mb-4">
            <div className="text-4xl font-extrabold text-primary mb-2">
              {score ?? 0}%
            </div>
            <p className="text-base text-slate-700 font-medium">
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

          <div className="mb-4">
            {(score ?? 0) >= 90 ? (
              <p className="text-primary text-base font-semibold">
                Outstanding performance!
              </p>
            ) : (score ?? 0) >= 70 ? (
              <p className="text-primary text-base font-semibold">
                Great job! Keep it up!
              </p>
            ) : (score ?? 0) >= 50 ? (
              <p className="text-yellow-600 text-base font-semibold">
                Good effort! Room for improvement
              </p>
            ) : (
              <p className="text-destructive/50 text-base font-semibold">
                Keep studying and try again!
              </p>
            )}
          </div>

          <Link href="/results">
            <Button className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 hover:cursor-grabbing transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              See All Quiz Results
            </Button>
          </Link>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <Link href={`/learn/${lessonIndex}`}>
            <Button
              variant="outline"
              className="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              disabled={lessonIndex < 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Previous Lesson
            </Button>
          </Link>

          <Link href={`/learn/${lessonIndex + 1}`}>
            <Button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              Next Lesson
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
