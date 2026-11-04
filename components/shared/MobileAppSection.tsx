import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type PhoneProps = {
    src: string;
    alt: string;
    sizes: string;
    className: string;
    fan?: "left" | "right";
};

// A real screen from the app in a phone frame, the same frame as the Google
// Play listing's graphics. Everything is sized in cqw, so it scales with the
// phone. `fan` is what globals.css hooks the scroll animation on to.
const Phone = ({ src, alt, sizes, className, fan }: PhoneProps) => (
    <div data-app-phone={fan} className={`@container absolute ${className}`}>
        <div className="rounded-[11.5cqw] bg-[#10231a] p-[2.5cqw] shadow-[0_28px_56px_-12px_rgba(11,61,39,0.42)]">
            <div className="relative overflow-hidden rounded-[9cqw] bg-[#fcfcfc]">
                <div
                    aria-hidden
                    className="flex h-[6cqw] items-center justify-between px-[6cqw] text-[3.4cqw] font-medium text-[#171717]"
                >
                    <span>9:41</span>
                    <span className="absolute left-1/2 top-[0.9cqw] size-[3.8cqw] -translate-x-1/2 rounded-full bg-[#0d0d0d]" />
                    <svg
                        viewBox="0 0 64 16"
                        className="h-[3.2cqw] fill-[#171717]"
                    >
                        <path d="M0 15 L12 3 L12 15 Z" />
                        <path d="M22 13.5 L14.2 5.2 A11.2 11.2 0 0 1 29.8 5.2 Z" />
                        <rect x="40" y="3" width="8" height="12" rx="1.6" />
                        <rect x="42.2" y="1.4" width="3.6" height="2" rx=".6" />
                    </svg>
                </div>
                <Image
                    src={src}
                    alt={alt}
                    width={900}
                    height={1795}
                    sizes={sizes}
                    className="block h-auto w-full"
                />
            </div>
        </div>
    </div>
);

const MobileAppSection = () => {
    const t = useTranslations("mobileapp");

    const lessons = [
        t("lessonMrt"),
        t("lessonFood"),
        t("lessonDoctor"),
        t("lessonWork"),
    ];

    return (
        // overflow-clip, not overflow-hidden: a hidden box is a scroll
        // container, and the phones' scroll animation would watch it instead
        // of the page.
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-clip bg-[#e8faf1]">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pt-24">
                <div className="lg:self-center lg:pb-24">
                    {/* The tape behind the words echoes the hero's wordmark. The
                        size is what lets the longest taped phrase, the Tamil
                        one, stay on one line. Burmese stacks its marks above
                        and below the line, so it needs more room between lines. */}
                    <h2 className="isolate text-balance font-heading text-[clamp(2.125rem,10vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[3.25rem] lg:text-[clamp(3rem,4.4vw,3.4rem)] [&:lang(bu)]:leading-[1.45]">
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

                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#2c4a3a]">
                        {t("description")}
                    </p>

                    {/* The lessons as stops on an MRT line, the map every
                        learner here already reads. */}
                    <ol className="mt-9 flex flex-col gap-3.5">
                        {lessons.map((lesson, i) => (
                            <li
                                key={lesson}
                                className="relative flex items-center gap-4 text-lg font-bold text-ink"
                            >
                                {i < lessons.length - 1 && (
                                    <span
                                        aria-hidden
                                        className="absolute left-[7px] top-1/2 h-[calc(100%+0.875rem)] w-1 bg-[#1b7a50]"
                                    />
                                )}
                                <span
                                    aria-hidden
                                    className="relative size-[18px] shrink-0 rounded-full border-4 border-[#1b7a50] bg-white"
                                />
                                {lesson}
                            </li>
                        ))}
                    </ol>

                    <p className="mt-6 text-base text-[#2c4a3a]">
                        {t("lessonNote")}
                    </p>
                </div>

                {/* The phones stand on the section's bottom edge and run off
                    it, and on a small screen off its sides too. The middle one
                    stops just below "Tap, then speak". */}
                <div className="relative -mx-6 aspect-[1/1.08] sm:mx-auto sm:w-full sm:max-w-[560px] lg:aspect-auto lg:min-h-[36rem] lg:max-w-none">
                    <Phone
                        src="/assets/mobile-app/home.webp"
                        alt={t("altHome")}
                        sizes="(min-width: 640px) 250px, 44vw"
                        fan="left"
                        className="-left-[6%] bottom-0 w-[44%] origin-bottom translate-y-[11%] -rotate-[4deg] lg:left-0 lg:w-[40%]"
                    />
                    <Phone
                        src="/assets/mobile-app/lesson.webp"
                        alt={t("altLesson")}
                        sizes="(min-width: 640px) 250px, 44vw"
                        fan="right"
                        className="-right-[6%] bottom-0 w-[44%] origin-bottom translate-y-[11%] rotate-[4deg] lg:right-0 lg:w-[40%]"
                    />
                    <Phone
                        src="/assets/mobile-app/tutor.webp"
                        alt={t("altTutor")}
                        sizes="(min-width: 640px) 320px, 56vw"
                        className="bottom-0 left-1/2 w-[56%] -translate-x-1/2 translate-y-[4.5%] lg:w-[48%]"
                    />
                </div>
            </div>
        </section>
    );
};

export default MobileAppSection;
