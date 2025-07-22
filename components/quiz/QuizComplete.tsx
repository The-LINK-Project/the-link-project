import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type QuizCompleteProps = {
  score: number | null;
  selectedAnswers: number[];
  quiz: QuizData;
};

const QuizComplete = ({ score, selectedAnswers, quiz }: QuizCompleteProps) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="rounded-xl p-10 shadow-xl text-center bg-card text-card-foreground">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg bg-primary">
            <svg
              className="w-10 h-10 text-primary-foreground"
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

          <h2 className="text-3xl font-bold mb-6 text-primary">
            Quiz Complete!
          </h2>

          <div className="rounded-xl p-6 mb-6 bg-primary/10">
            <div className="text-5xl font-extrabold mb-2 text-primary">
              {score ?? 0}%
            </div>
            <p className="text-lg font-medium text-muted-foreground">
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
              <p className="text-lg font-semibold text-primary">
                Outstanding performance!
              </p>
            ) : (score ?? 0) >= 70 ? (
              <p className="text-lg font-semibold text-primary">
                Great job! Keep it up!
              </p>
            ) : (score ?? 0) >= 50 ? (
              <p className="text-lg font-semibold text-yellow-600">
                Good effort! Room for improvement
              </p>
            ) : (
              <p className="text-lg font-semibold text-orange-600">
                Keep studying and try again!
              </p>
            )}
          </div>

          <Link href="/results">
            <Button className="px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 bg-primary text-primary-foreground">
              See All Quiz Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
