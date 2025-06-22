'use client';
import { useState, useEffect, use } from "react";  // Add the use import
import { useRouter } from "next/navigation";
import {getQuizByLessonId} from "@/lib/actions/quiz.actions";
import {saveQuizResult} from "@/lib/actions/results.actions";

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
    return <div className="flex justify-center items-center min-h-screen">Loading quiz...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!quiz) {
    return <div className="flex justify-center items-center min-h-screen">Quiz not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
      
      {!isSubmitted ? (
        // this part displays the quiz questions and options
        <>

          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-8 p-4 border rounded-lg shadow-sm">
              <p className="font-medium mb-4">{q.questionText}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => (
                  <div 
                    key={optIndex}
                    className={`p-3 border rounded cursor-pointer ${
                      selectedAnswers[qIndex] === optIndex 
                        ? 'bg-blue-100 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(qIndex, optIndex)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.includes(-1)}
            className={`px-6 py-2 rounded-md ${
              selectedAnswers.includes(-1)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit Quiz
          </button>
        </>
      ) : (
        // ruhan this part displays that mini results page after submission
        <div className="text-center p-8 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-4xl font-bold mb-6">{score}%</p>
          <p className="mb-6">
            You got {selectedAnswers.filter((ans, idx) => 
              ans === quiz.questions[idx].correctAnswerIndex
            ).length} out of {quiz.questions.length} questions correct.
          </p>
          <button
            onClick={() => router.push('/quiz')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Quiz Home Page
          </button>
        </div>
      )}
    </div>
  )
  

};