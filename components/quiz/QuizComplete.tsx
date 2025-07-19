import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type QuizCompleteProps = {
  score: number | null;
  selectedAnswers: number[];
  quiz: QuizData;
};

const QuizComplete = ({ score, selectedAnswers, quiz }: QuizCompleteProps) => {
  // color variables
  const primary = "var(--primary)";
  const primaryFg = "var(--primary-foreground)";
  const card = "var(--card)";
  const cardFg = "var(--card-foreground)";
  const muted = "var(--muted)";
  const mutedFg = "var(--muted-foreground)";
  const border = "var(--border)";
  const yellow = "#eab308"; // tailwind yellow-600
  const orange = "#ea580c"; // tailwind orange-600

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl w-full">
        <div
          className="rounded-xl p-10 shadow-xl text-center"
          style={{ background: card, color: cardFg }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{ background: primary }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: primaryFg }}
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

          <h2 className="text-3xl font-bold mb-6" style={{ color: primary }}>
            Quiz Complete!
          </h2>

          <div
            className="rounded-xl p-6 mb-6"
            style={{
              background:
                "color-mix(in srgb, " + primary + " 10%, transparent)",
            }}
          >
            <div
              className="text-5xl font-extrabold mb-2"
              style={{ color: primary }}
            >
              {score ?? 0}%
            </div>
            <p className="text-lg font-medium" style={{ color: mutedFg }}>
              You scored{" "}
              <span className="font-bold" style={{ color: primary }}>
                {
                  selectedAnswers.filter(
                    (ans, idx) => ans === quiz.questions[idx].correctAnswerIndex
                  ).length
                }
              </span>{" "}
              out of{" "}
              <span className="font-bold" style={{ color: primary }}>
                {quiz.questions.length}
              </span>{" "}
              questions correctly
            </p>
          </div>

          <div className="mb-6">
            {(score ?? 0) >= 90 ? (
              <p className="text-lg font-semibold" style={{ color: primary }}>
                Outstanding performance!
              </p>
            ) : (score ?? 0) >= 70 ? (
              <p className="text-lg font-semibold" style={{ color: primary }}>
                Great job! Keep it up!
              </p>
            ) : (score ?? 0) >= 50 ? (
              <p className="text-lg font-semibold" style={{ color: yellow }}>
                Good effort! Room for improvement
              </p>
            ) : (
              <p className="text-lg font-semibold" style={{ color: orange }}>
                Keep studying and try again!
              </p>
            )}
          </div>

          <Link href="/results">
            <Button
              className="px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ background: primary, color: primaryFg }}
            >
              See All Quiz Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
