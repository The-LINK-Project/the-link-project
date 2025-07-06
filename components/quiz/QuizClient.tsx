"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveQuizResult } from "@/lib/actions/quizResults.actions";
import { getQuizByLessonId } from "@/lib/actions/quiz.actions";

type LessonPageProps = {
  params: {
      lessonIndex: number;
  };
};

export default function QuizClient({params}: LessonPageProps) {
  const lessonIndex = params.lessonIndex;
  const [quiz, setQuiz] = useState<any>({
    _id: "",
    title: "",
    lessonId: 0,
    questions: [],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizByLessonId(lessonIndex);
        setQuiz(data);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, []);

  const lessonId = quiz.lessonId;

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quiz.questions.length).fill(-1)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

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
    console.log(calculatedScore);
    console.log("TESTING");
    console.log(lessonId);
    const formData = new FormData();
    formData.append("lessonId", lessonId.toString());
    formData.append("quizId", quiz._id.toString());
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
                <div
                  key={qIndex}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(90,199,219)] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                        {q.questionText}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-2 ml-11">
                    {q.options.map((opt, optIndex) => (
                      <button
                        key={optIndex}
                        className={`group p-3 border-2 rounded-lg transition-all duration-200 text-left font-medium ${
                          selectedAnswers[qIndex] === optIndex
                            ? "bg-[rgb(90,199,219)]/10 border-[rgb(90,199,219)] text-[rgb(90,199,219)] shadow-md transform scale-[1.01]"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-[rgb(90,199,219)]/5 hover:border-[rgb(90,199,219)]/50 hover:shadow-sm"
                        }`}
                        onClick={() => handleAnswerSelect(qIndex, optIndex)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                              selectedAnswers[qIndex] === optIndex
                                ? "bg-[rgb(90,199,219)] border-[rgb(90,199,219)]"
                                : "border-slate-300 group-hover:border-[rgb(90,199,219)]"
                            }`}
                          >
                            {selectedAnswers[qIndex] === optIndex && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <span>{opt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
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

                <button
                  onClick={() => router.push("/quiz")}
                  className="px-6 py-3 bg-[rgb(90,199,219)] text-white text-lg font-semibold rounded-xl hover:bg-[rgb(90,199,219)]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Return to Quiz Hub
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
