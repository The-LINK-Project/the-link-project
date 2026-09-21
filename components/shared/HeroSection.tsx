import React from "react";
import GetStartedButton from "./GetStartedButton";
import AwardBadge from "./AwardBadge";
import { Link } from "@/i18n/navigation";
import { Gamepad2 } from "lucide-react";
import { useTranslations } from "next-intl";

const HeroSection = () => {
    const t = useTranslations("herosection");

    // The wordmark gets a hand-torn "tape" highlight behind the word LINK.
    // We split the translated name on that word so non-Latin locales (which
    // localise the brand) simply render the plain wordmark with no markup.
    const name = t("name");
    const [before, after, ...rest] = name.split("LINK");
    const hasLink = rest.length === 0 && after !== undefined;

    return (
        <section className="flex min-h-[68vh] flex-col items-center justify-center px-6 pb-6 pt-16 text-center sm:pb-8 sm:pt-20">
            <AwardBadge />

            <h1 className="mt-8 font-heading text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold leading-none tracking-[-0.035em] text-ink">
                {hasLink ? (
                    <>
                        {before}
                        <span className="relative inline-block">
                            <span
                                aria-hidden
                                className="absolute -left-3 -right-3 top-1/2 -z-0 h-[0.62em] -translate-y-1/2 -rotate-3 bg-primary shadow-[0_9px_20px_rgba(30,39,35,0.18)]"
                            />
                            <span className="relative z-[1]">LINK</span>
                        </span>
                        {after}
                    </>
                ) : (
                    name
                )}
            </h1>

            <p className="mt-9 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {t("header1")} {t("header2")}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <GetStartedButton />
                <Link
                    href="/snapshot"
                    className="inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-surface px-8 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:border-ink/40 hover:shadow-[0_10px_24px_rgba(30,39,35,0.1)]"
                >
                    <Gamepad2 className="size-4" strokeWidth={2.25} />
                    Play the memory game
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
