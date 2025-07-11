"use client";
import { useState, useEffect } from "react";
import { saveQuizResult } from "@/lib/actions/quizResults.actions";
import { getQuizByLessonId } from "@/lib/actions/quiz.actions";
import QuizComplete from "@/components/quiz/QuizComplete";
import QuizIncomplete from "@/components/quiz/QuizIncomplete";

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

        {!isSubmitted ? (
          <QuizIncomplete quiz={quiz} selectedAnswers={selectedAnswers} handleAnswerSelect={handleAnswerSelect} handleSubmit={handleSubmit} />
        ) : (
          <QuizComplete score={score} selectedAnswers={selectedAnswers} quiz={quiz} />
        )}
      </div>
    </div>
  );
}
