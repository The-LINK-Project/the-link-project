import { HourglassIcon, Speech, BookOpenCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const ProblemSection = () => {
    const t = useTranslations("problemsection");
    return (
        <div className="container mx-auto pt-32 pb-20 px-4">
            <div className="text-center mb-16">
                <p className="text-primary uppercase tracking-wide mb-4">
                    {t("subtitle")}
                </p>
                <h2 className="text-5xl font-semibold tracking-tight mb-12">
                    {t("title")}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ml-16 pt-10">
                <div className="flex flex-col items-start">
                    <div className="bg-primary p-4 rounded-full mb-4">
                        <Speech className="text-white h-6 w-6"></Speech>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t("part1title")}</h3>
                    <p className="text-gray-600 text-lg mr-20 font-light">
                        {t("part1body")}
                    </p>
                </div>
                <div className="flex flex-col items-start">
                    <div className="bg-primary p-4 rounded-full mb-4">
                        <HourglassIcon className="text-white h-6 w-6"></HourglassIcon>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t("part2title")}</h3>
                    <p className="text-gray-600 text-lg mr-20 font-light">
                        {t("part2body")}
                    </p>
                </div>

                <div className="flex flex-col items-start">
                    <div className="bg-primary p-4 rounded-full mb-4">
                        <BookOpenCheck className="text-white w-6 h-6"></BookOpenCheck>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                        {t("part3title")}
                    </h3>
                    <p className="text-gray-600 text-lg mr-20 font-light">
                        {t("part3body")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProblemSection;
