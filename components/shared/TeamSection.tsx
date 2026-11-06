import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Left to right in the group photo, and where each one stands across it (the
// middle of their face, as a share of the photo's width). Names stay as the
// About page writes them, in every language.
const TEAM = [
    { name: "Ruhan", at: "28%", tilt: "-rotate-3" },
    { name: "Alexandre", at: "42.8%", tilt: "rotate-2" },
    { name: "Adrish", at: "57.4%", tilt: "-rotate-1" },
    { name: "Videep", at: "72.4%", tilt: "rotate-3" },
];

/** A strip of the same mint tape as the hero's wordmark, holding a print down. */
const Tape = ({ className }: { className: string }) => (
    <span
        aria-hidden
        className={`absolute z-10 h-6 w-20 bg-primary/80 shadow-[0_2px_6px_rgba(30,39,35,0.14)] sm:h-8 sm:w-28 ${className}`}
    />
);

const TeamSection = () => {
    const t = useTranslations("team");
    const about = useTranslations("aboutUs");

    return (
        // overflow-clip, not overflow-hidden: the prints' scroll animation
        // follows the page, and a hidden box would be a scroller of its own.
        <section className="overflow-clip">
            <div className="mx-auto max-w-6xl px-6 pb-28 pt-24 lg:pb-32">
                <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
                    <div className="lg:pb-20">
                        {/* The tape behind the words echoes the hero's
                            wordmark, as the mobile app section's does. */}
                        <h2 className="isolate max-w-xl text-balance font-heading text-[clamp(2.125rem,9vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[3.25rem] [&:lang(bu)]:leading-[1.45]">
                            {t.rich("title", {
                                tape: (chunks) => (
                                    <span className="relative inline-block whitespace-nowrap">
                                        <span
                                            aria-hidden
                                            className="absolute -left-2 -right-2 top-1/2 -z-10 h-[0.62em] -translate-y-1/2 -rotate-2 bg-primary shadow-[0_8px_16px_rgba(30,39,35,0.14)]"
                                        />
                                        {chunks}
                                    </span>
                                ),
                            })}
                        </h2>
                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                            {t("description")}
                        </p>
                        <Link
                            href="/about"
                            className="group mt-7 inline-flex items-center gap-2 text-lg font-bold text-[#1b7a50] underline decoration-primary decoration-[3px] underline-offset-[6px] transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b7a50]"
                        >
                            {about("headerCall")}
                            <ArrowRight
                                aria-hidden
                                className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-1"
                            />
                        </Link>
                    </div>

                    {/* The four of them on the move, pinned over the corner of
                        the group photo. Only where there is room beside the
                        words; on anything smaller it would only repeat it. */}
                    <figure
                        data-team-print="small"
                        className="relative z-20 hidden w-full max-w-[20rem] justify-self-end rotate-3 bg-white p-2.5 shadow-[0_22px_44px_-14px_rgba(30,39,35,0.42)] lg:-mb-16 lg:block"
                    >
                        <Tape className="-top-4 left-1/2 -translate-x-1/2 -rotate-3" />
                        <Image
                            src="/assets/team/team-walking.webp"
                            alt={t("altWalking")}
                            width={1200}
                            height={900}
                            sizes="320px"
                            className="block h-auto w-full"
                        />
                    </figure>
                </div>

                {/* The group photo, as a print taped to the page, each name on
                    a strip of tape across its lower edge. */}
                <figure
                    data-team-print="group"
                    className="relative mt-12 -rotate-1 bg-white p-2 shadow-[0_28px_56px_-18px_rgba(30,39,35,0.4)] sm:p-3 lg:mt-0"
                >
                    <Tape className="-left-3 -top-3 -rotate-[28deg] sm:-left-5" />
                    {/* Where the small print sits on this corner, it holds it down instead. */}
                    <Tape className="-right-3 -top-3 rotate-[28deg] sm:-right-5 lg:hidden" />
                    <div className="relative">
                        <Image
                            src="/assets/team/team-group.webp"
                            alt={t("altGroup")}
                            width={1333}
                            height={750}
                            sizes="(min-width: 1152px) 1104px, 100vw"
                            className="block h-auto w-full"
                        />
                        <ul aria-hidden className="hidden md:block">
                            {TEAM.map(({ name, at, tilt }) => (
                                <li
                                    key={name}
                                    style={{ left: at }}
                                    className="absolute bottom-0 -translate-x-1/2 translate-y-1/2"
                                >
                                    <span
                                        className={`block bg-primary px-3 py-1 font-heading text-base font-bold text-ink shadow-[0_6px_14px_-4px_rgba(30,39,35,0.3)] lg:text-lg ${tilt}`}
                                    >
                                        {name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* On a phone the names are too close together to tape on,
                        so they are written underneath. */}
                    <figcaption className="px-1 pb-1 pt-3 text-[15px] font-semibold text-ink-soft md:sr-only">
                        {t("names")}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default TeamSection;
