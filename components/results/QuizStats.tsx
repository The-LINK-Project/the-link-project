import React from "react";
import { Trophy, Target, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

type QuizStatsProps = {
    highestScore: number;
    averageScore: number;
    totalQuizzes: number;
};

export const QuizStats = ({
    highestScore,
    averageScore,
    totalQuizzes,
}: QuizStatsProps) => {
    const t = useTranslations("quizStats");
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/30 rounded-lg">
                        <Trophy className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("statHighest")}</p>
                        <p className="text-2xl font-bold text-gray-900">{highestScore}%</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/30 rounded-lg">
                        <Target className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("statAverage")}</p>
                        <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/30 rounded-lg">
                        <Clock className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("statQuizzes")}</p>
                        <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
