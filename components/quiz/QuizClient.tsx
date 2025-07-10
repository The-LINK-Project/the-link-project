"use client";
import { useState, useEffect } from "react";
import { saveQuizResult } from "@/lib/actions/quizResults.actions";
import { getQuizByLessonId } from "@/lib/actions/quiz.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuizQuestion from "@/components/quiz/QuizQuestion";

type LessonPageProps = {
  params: {
    lessonIndex: number;
  };
};

export default function QuizClient({ params }: LessonPageProps) {
  const lessonIndex = params.lessonIndex;
  const [quiz, setQuiz] = useState<QuizData>({
    title: "",
    lessonId: 0,
    questions: [],
  });
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizByLessonId(lessonIndex);
        setQuiz(data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };

    fetchQuiz();
  }, []);


  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach((question: Question, index: number) => {
      if (selectedAnswers[index] === question.correctAnswerIndex) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
  
    const formData = new FormData();
    formData.append("lessonId", quiz.lessonId.toString());
    formData.append("score", calculatedScore.toString());
    formData.append("answers", JSON.stringify(selectedAnswers));

    try {
      await saveQuizResult(formData);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-[rgb(90,199,219)]/10 rounded-full text-[rgb(90,199,219)] text-sm font-medium mb-4">
            Interactive Quiz
          </div>
          <h1 className="text-4xl font-bold text-[rgb(90,199,219)] mb-4">
            {quiz.title}
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Test your knowledge and track your progress
          </p>
        </div>

        {!isSubmitted && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-700">
                Progress
              </span>
              <span className="text-sm font-medium text-[rgb(90,199,219)]">
                {selectedAnswers.filter((a) => a !== -1).length} of{" "}
                {quiz.questions.length} answered
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[rgb(90,199,219)] h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{
                  width: `${
                    (selectedAnswers.filter((a) => a !== -1).length /
                      quiz.questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        {!isSubmitted ? (
          <>
            <div className="space-y-6">
              {quiz.questions.map((q: Question, qIndex: number) => (
                <QuizQuestion
                  key={qIndex}
                  q={q}
                  qIndex={qIndex}
                  selectedAnswers={selectedAnswers}
                  handleAnswerSelect={handleAnswerSelect}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                disabled={selectedAnswers.includes(-1)}
                onClick={handleSubmit}
                className={`px-10 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg ${
                  selectedAnswers.includes(-1)
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-[rgb(90,199,219)] text-white hover:bg-[rgb(90,199,219)]/90 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {selectedAnswers.includes(-1)
                  ? "Answer All Questions"
                  : "Submit Quiz"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-xl p-10 shadow-xl text-center">
                <div className="w-20 h-20 bg-[rgb(90,199,219)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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

                <h2 className="text-3xl font-bold text-[rgb(90,199,219)] mb-6">
                  Quiz Complete!
                </h2>

                <div className="bg-[rgb(90,199,219)]/10 rounded-xl p-6 mb-6">
                  <div className="text-5xl font-extrabold text-[rgb(90,199,219)] mb-2">
                    {score}%
                  </div>
                  <p className="text-lg text-slate-700 font-medium">
                    You scored{" "}
                    <span className="font-bold text-[rgb(90,199,219)]">
                      {
                        selectedAnswers.filter(
                          (ans, idx) =>
                            ans === quiz.questions[idx].correctAnswerIndex
                        ).length
                      }
                    </span>{" "}
                    out of{" "}
                    <span className="font-bold text-[rgb(90,199,219)]">
                      {quiz.questions.length}
                    </span>{" "}
                    questions correctly
                  </p>
                </div>

                <div className="mb-6">
                  {score! >= 90 ? (
                    <p className="text-[rgb(90,199,219)] text-lg font-semibold">
                      Outstanding performance!
                    </p>
                  ) : score! >= 70 ? (
                    <p className="text-[rgb(90,199,219)] text-lg font-semibold">
                      Great job! Keep it up!
                    </p>
                  ) : score! >= 50 ? (
                    <p className="text-yellow-600 text-lg font-semibold">
                      Good effort! Room for improvement
                    </p>
                  ) : (
                    <p className="text-orange-600 text-lg font-semibold">
                      Keep studying and try again!
                    </p>
                  )}
                </div>

                <Link href="/quiz">
                  <Button
                    className="px-6 py-3 bg-[rgb(90,199,219)] text-white text-lg font-semibold rounded-xl hover:bg-[rgb(90,199,219)]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Return to Quiz Hub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
