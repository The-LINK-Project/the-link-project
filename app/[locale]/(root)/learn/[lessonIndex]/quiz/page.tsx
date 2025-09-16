import React from "react";
import QuizClient from "@/components/quiz/QuizClient";
import { getQuizByLessonId } from "@/lib/actions/quiz.actions";

type QuizPageProps = {
    params: Promise<{
        lessonIndex: string
    }>;
};
const QuizPage = async ({ params }: QuizPageProps) => {
    const { lessonIndex } = await params;
    const index = parseInt(lessonIndex, 10);
    const quiz = await getQuizByLessonId(index);

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="max-w-4xl w-full px-6 py-12">
                <div className="text-center mb-4">
                    <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-primary text-sm font-medium mb-4">
                        Interactive Quiz
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">{quiz.title}</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Test your knowledge and track your progress
                    </p>
                </div>
                <QuizClient params={{ quiz: quiz, lessonIndex: index }} />
            </div>
        </div>
    );
};

export default QuizPage;
