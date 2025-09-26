import React from "react";
import { useTranslations } from "next-intl";

type QuizProgressBarProps = {
    selectedAnswers: number[];
    quiz: QuizData;
};

const QuizProgressBar = ({ selectedAnswers, quiz }: QuizProgressBarProps) => {
    const t = useTranslations("quizProgressBar");
    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium ">{t("title")}</span>
                <span className="text-sm font-medium text-primary">
                    {selectedAnswers.filter((a) => a !== -1).length} of{" "}
                    {quiz.questions.length} {t("answered")}
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-primary h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{
                        width: `${(selectedAnswers.filter((a) => a !== -1).length /
                            quiz.questions.length) *
                            100
                            }%`,
                    }}
                />
            </div>
        </div>
    );
};

export default QuizProgressBar;
