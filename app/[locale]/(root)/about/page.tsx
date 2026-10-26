import React from "react";
import Image from "next/image";
import { aboutUsInformation } from "@/constants";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("aboutUs");
    return (
        <div className="min-h-screen px-5 pb-24 pt-20 font-body text-ink">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                        {t("headerCall")}
                    </p>
                    <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                        {t("headerTitle")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft">
                        {t("headerDescription")}
                    </p>
                </div>

                {/* Team cards, in the same style as the landing page's */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {aboutUsInformation.map((person) => (
                        <div
                            key={person.name}
                            className="rounded-2xl border border-hairline bg-surface p-3 shadow-[0_10px_30px_rgba(30,39,35,0.05)]"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#eafaf2]">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="px-1 pb-2 pt-4 text-center sm:px-2 sm:pb-3 sm:pt-5">
                                <h3 className="font-heading text-lg font-bold text-ink sm:text-xl">
                                    {person.name}
                                </h3>
                                <span className="mt-2 inline-block rounded-full bg-[#eafaf2] px-3 py-1 text-xs font-semibold text-eyebrow sm:text-sm">
                                    {t("role")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
