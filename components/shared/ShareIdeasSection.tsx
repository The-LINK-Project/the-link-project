import React from "react";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ShareIdeasSection = () => {
    const t = useTranslations("shareideas");

    return (
        <section className="relative left-1/2 mt-24 w-screen -translate-x-1/2 overflow-hidden bg-primary py-20 text-center">
            {/* Hand-torn tape accent echoing the hero wordmark highlight. */}
            <div
                aria-hidden
                className="absolute left-1/2 top-9 h-8 w-52 -translate-x-1/2 -rotate-2 bg-white/50"
            />

            <div className="relative mx-auto max-w-2xl px-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#15301f]/70">
                    {t("tellUs")}
                </p>
                <h2 className="mb-8 font-heading text-4xl font-bold tracking-tight text-[#15301f] sm:text-5xl">
                    {t("makeBetter")}
                </h2>
                <Link href="/contact">
                    <Button className="h-auto cursor-pointer gap-2 rounded-lg bg-ink px-8 py-4 text-base font-bold text-white shadow-[0_6px_0_#0e1611] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-deep">
                        <Lightbulb className="!h-5 !w-5" strokeWidth={2} />
                        {t("shareIdeas")}
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default ShareIdeasSection;
