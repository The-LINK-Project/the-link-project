import { getQuizByLessonId } from "@/lib/actions/quiz.actions";
import QuizClient from "@/components/quiz/QuizClient";

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

type QuizPageProps = {
  params: { lessonId: string } | Promise<{ lessonId: string }>;
};

export default async function QuizPage({ params }: QuizPageProps) {
  const lessonId =
    params instanceof Promise ? (await params).lessonId : params.lessonId;

  try {
    const quiz = await getQuizByLessonId(lessonId);
    return <QuizClient quiz={quiz} lessonId={lessonId} />;
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
