"use client";
import { useState } from "react";
import { saveQuizResult } from "@/lib/actions/quizResults.actions";
import QuizComplete from "@/components/quiz/QuizComplete";
import QuizIncomplete from "@/components/quiz/QuizIncomplete";

type QuizClientProps = {
    params: {
        quiz: QuizData;
    };
};

export default function QuizClient({ params }: QuizClientProps) {
    const quiz = params.quiz;
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
        new Array(quiz.questions.length).fill(-1),
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

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
                {!isSubmitted ? (
                    <QuizIncomplete
                        quiz={quiz}
                        selectedAnswers={selectedAnswers}
                        handleAnswerSelect={handleAnswerSelect}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <QuizComplete
                        score={score}
                        selectedAnswers={selectedAnswers}
                        quiz={quiz}
                    />
                )}
            </div>
        </div>
    );
}
