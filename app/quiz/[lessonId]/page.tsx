"use server"

import { getQuizByLessonId } from "@/lib/actions/quiz.actions";
import QuizClient from "@/components/quiz/QuizClient";


type QuizPageProps = {
  params: { lessonId: number } | Promise<{ lessonId: number }>;
};

export default async function QuizPage({ params }: QuizPageProps) {
  const lessonId =
    params instanceof Promise ? (await params).lessonId : params.lessonId;

  try {
    return <QuizClient params={{ lessonIndex: lessonId }}></QuizClient>;
  } catch (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="text-red-600 text-xl font-semibold text-center">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </div>
        </div>
      </div>
    );
  }
}
