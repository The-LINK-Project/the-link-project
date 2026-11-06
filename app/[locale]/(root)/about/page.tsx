import React from "react";
import Image from "next/image";
import { aboutUsInformation } from "@/constants";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("aboutUs");
    return (
        <div className="min-h-screen px-5 pb-24 pt-20 font-body text-ink">
            <div className="mx-auto max-w-6xl">
                <header className="mx-auto max-w-2xl text-center">
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                        {t("headerTitle")}
                    </h1>
                    <p className="mt-5 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                        {t("headerDescription")}
                    </p>
                </header>

                <section aria-labelledby="team-heading" className="mt-16 sm:mt-20">
                    <h2
                        id="team-heading"
                        className="text-center font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                    >
                        {t("headerCall")}
                    </h2>

                    {/* Team cards, in the same style as the landing page's.
                        Card radius = photo radius (12px) + padding (8px), so
                        the corners run parallel. */}
                    <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4">
                        {aboutUsInformation.map((person) => (
                            <li
                                key={person.name}
                                className="rounded-[20px] border border-hairline bg-surface p-2 shadow-[0_10px_30px_rgba(30,39,35,0.05)]"
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
                                <div className="px-2 pb-4 pt-4 text-center sm:pb-5">
                                    <h3 className="font-heading text-lg font-bold leading-tight text-ink sm:text-xl">
                                        {person.name}
                                    </h3>
                                    <p className="mt-1 text-sm leading-snug text-ink-soft sm:text-[15px]">
                                        {t("role")}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
