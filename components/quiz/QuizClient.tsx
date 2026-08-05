"use client";
import { useState } from "react";
import { submitQuiz } from "@/lib/actions/quizResults.actions";
import QuizComplete from "@/components/quiz/QuizComplete";
import QuizIncomplete from "@/components/quiz/QuizIncomplete";

type QuizClientProps = {
  params: {
    quiz: PublicQuizData;
    lessonIndex: number;
  };
};

export default function QuizClient({ params }: QuizClientProps) {
  const quiz = params.quiz;
  const lessonIndex = params.lessonIndex;
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quiz.questions.length).fill(-1)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
  } | null>(null);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  // Grading happens on the server (the answer key is never sent to the
  // browser), so the completion screen waits for the server's verdict
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitQuiz({
        lessonId: quiz.lessonId,
        answers: selectedAnswers,
      });

      if (response.success) {
        setResult({
          score: response.score,
          correctCount: response.correctCount,
          totalQuestions: response.totalQuestions,
        });
      } else {
        setSubmitError(response.message);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setSubmitError("Something went wrong submitting your quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-6 py-6">
        {!result ? (
          <>
            <QuizIncomplete
              quiz={quiz}
              selectedAnswers={selectedAnswers}
              handleAnswerSelect={handleAnswerSelect}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            {submitError && (
              <p className="mt-4 text-center text-sm font-medium text-red-600">
                {submitError}
              </p>
            )}
          </>
        ) : (
          <QuizComplete
            score={result.score}
            correctCount={result.correctCount}
            totalQuestions={result.totalQuestions}
            lessonIndex={lessonIndex}
          />
        )}
      </div>
    </div>
  );
}
