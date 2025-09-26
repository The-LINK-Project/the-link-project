import React from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

const QuizNoResults = () => {
    const t = useTranslations("quizNoResults");
    return (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("info1")}
            </h3>
            <p className="text-gray-600 mb-6">
                {t("info2")}
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                Take a Quiz
            </button>
        </div>
    );
};

export default QuizNoResults;
