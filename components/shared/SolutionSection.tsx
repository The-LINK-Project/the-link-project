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
                        <h2 className="mt-4 max-w-md font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                            {t("title")}
                        </h2>

                        <div className="mt-8 flex flex-col gap-6">
                            {steps.map((step, i) => (
                                <div
                                    key={step}
                                    className="flex items-baseline gap-5"
                                >
                                    <span className="font-heading text-3xl font-bold text-primary">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-lg font-semibold text-ink">
                                        {step}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product imagery */}
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
                            <div className="rounded-2xl border border-[#e7e5dd] bg-surface p-2.5 shadow-[0_18px_44px_rgba(30,39,35,0.1)]">
                                <Image
                                    src="/assets/Conversation.png"
                                    alt="Realtime Conversation"
                                    width={1480}
                                    height={1118}
                                    sizes="(min-width: 1024px) 40vw, 90vw"
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
                                src="/assets/Objectives.png"
                                alt="Learning Objectives"
                                width={2000}
                                height={302}
                                sizes="(min-width: 1024px) 55vw, 90vw"
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
