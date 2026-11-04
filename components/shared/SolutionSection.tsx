import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SolutionSection = () => {
    const t = useTranslations("solutionsection");

    const steps = [t("part1"), t("part2"), t("part3")];

    return (
        <div className="w-full bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
                    {/* Editorial copy + numbered objectives */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                            {t("subtitle")}
                        </p>
                        <h2 className="mt-4 max-w-md font-heading [overflow-wrap:anywhere] text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl [&:lang(bu)]:leading-[1.45]">
                            {t("title")}
                        </h2>

                        <div className="mt-8 flex flex-col gap-6">
                            {steps.map((step, i) => (
                                <div
                                    key={step}
                                    className="flex items-baseline gap-5"
                                >
                                    <span className="w-11 shrink-0 font-heading text-3xl font-bold text-primary">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="min-w-0 break-words text-lg font-semibold text-ink">
                                        {step}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product imagery */}
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.45fr_1fr]">
                            <div className="flex items-center rounded-2xl border border-[#e7e5dd] bg-surface p-2.5 shadow-[0_18px_44px_rgba(30,39,35,0.1)]">
                                <Image
                                    src="/assets/lesson-exercise.webp"
                                    alt={t("altExercise")}
                                    width={1336}
                                    height={1504}
                                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 55vw, 90vw"
                                    className="block w-full rounded-lg object-contain"
                                />
                            </div>
                            <div className="flex items-center rounded-2xl border border-[#e7e5dd] bg-surface p-2.5 shadow-[0_18px_44px_rgba(30,39,35,0.1)]">
                                <Image
                                    src="/assets/Chatbot.png"
                                    alt="AI Chatbot"
                                    width={594}
                                    height={996}
                                    sizes="(min-width: 1024px) 25vw, 60vw"
                                    className="block w-full rounded-lg object-contain"
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-[#e7e5dd] bg-surface p-2.5 shadow-[0_18px_44px_rgba(30,39,35,0.1)]">
                            <Image
                                src="/assets/lesson-speaking.webp"
                                alt={t("altSpeaking")}
                                width={1306}
                                height={460}
                                sizes="(min-width: 1024px) 620px, 90vw"
                                className="block w-full rounded-lg object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionSection;
