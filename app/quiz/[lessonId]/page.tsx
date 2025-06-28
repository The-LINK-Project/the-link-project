'use client';
import { useState, useEffect, use } from "react";  // Add the use import
import { useRouter } from "next/navigation";
import {getQuizByLessonId} from "@/lib/actions/quiz.actions";
import {saveQuizResult} from "@/lib/actions/results.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Skeleton } from "@/components/ui/skeleton"


interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Quiz {
  _id: string; 
  lessonId: string;
  title: string;
  questions: Question[];
}

// Updated type to handle both current and future implementations
type QuizPageProps = {
  params: { lessonId: string } | Promise<{ lessonId: string }>;
};

export default function QuizPage({ params }: QuizPageProps) {
  // Hybrid approach that works with both current and future Next.js
  const lessonId = params instanceof Promise 
    ? use(params).lessonId 
    : params.lessonId;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await getQuizByLessonId(lessonId);
        setQuiz(quizData);
        setSelectedAnswers(new Array(quizData.questions.length).fill(-1));
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [lessonId]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => {
    const newAnswers = [...prev];
    newAnswers[questionIndex] = answerIndex;
    return newAnswers;
  });
  };
  const handleSubmit = async () => {
    if (!quiz) return;

    // calculating score 
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswerIndex) {
        correctAnswers++;
      }
    })
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // save results
    const formData = new FormData();
    formData.append("lessonId", lessonId);
    formData.append("quizId", quiz._id.toString());
    formData.append("score", calculatedScore.toString());
    formData.append("answers", JSON.stringify(selectedAnswers));
    try {
      await saveQuizResult(formData);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }


  }
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            {/* Question title skeleton */}
            <Skeleton className="h-6 w-2/3 rounded-md" />
  
            {/* Options skeletons */}
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-10 w-full rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!quiz) {
    return <div className="flex justify-center items-center min-h-screen">Quiz not found</div>;
  }

  return (
    
    <div className="w-full max-w-4xl mx-auto px-6 py-10" style={{ overflowAnchor: 'none' }}>

      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">{quiz.title}</h1>
  
      {/* Progress bar */}
      {!isSubmitted && (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(selectedAnswers.filter(a => a !== -1).length / quiz.questions.length) * 100}%` }}
          />
        </div>
      )}
  
      {!isSubmitted ? (
        <>
          {quiz.questions.map((q, qIndex) => (
            <Card key={qIndex} className="mb-10 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{qIndex + 1}. {q.questionText}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {q.options.map((opt, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-3 border rounded-xl transition-all duration-200 cursor-pointer text-sm font-medium ${
                      selectedAnswers[qIndex] === optIndex
                        ? 'bg-blue-100 border-blue-600 text-blue-800'
                        : 'hover:bg-gray-50 border-gray-300'
                    }`}
                    onClick={() => handleAnswerSelect(qIndex, optIndex)}
                  >
                    {opt}
                  </div>
                ))}
              </CardContent>
            </Card>
          
          ))}
  
          <div className="text-center mt-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                disabled={selectedAnswers.includes(-1)}
                className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-sm ${
                  selectedAnswers.includes(-1)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit Quiz
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit your quiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  You won’t be able to change your answers after submitting.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Yes, Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        </>
      ) : (
        <div className="text-center p-10 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Submitted!</h2>
          <p className="text-5xl font-extrabold text-gray-800 mb-6">{score}%</p>
          <p className="text-lg mb-8 text-gray-600">
            You got {selectedAnswers.filter((ans, idx) =>
              ans === quiz.questions[idx].correctAnswerIndex
            ).length} out of {quiz.questions.length} questions correct.
          </p>
          <button
            onClick={() => router.push('/quiz')}
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Return to Quiz Home Page
          </button>
        </div>
      )}
    </div>
  );
  

};