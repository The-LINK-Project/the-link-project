import { useTranslations } from "next-intl";

const ProblemSection = () => {
    const t = useTranslations("problemsection");

    const obstacles = [
        { title: t("part1title"), body: t("part1body") },
        { title: t("part2title"), body: t("part2body") },
        { title: t("part3title"), body: t("part3body") },
    ];

    return (
        // The page's one dark beat before the Solution section opens up again:
        // the same ink as the Migrants Day band further down.
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-clip bg-ink-deep selection:bg-primary selection:text-ink">
            <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-24 lg:pb-24 lg:pt-28">
                {/* The two things the sentence says are missing are the only
                    mint in the band. Burmese stacks its marks above and below
                    the line, so it needs more room between lines. */}
                <h2 className="text-balance font-heading text-[clamp(1.75rem,10vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white [overflow-wrap:anywhere] lg:text-[clamp(3.5rem,8vw,5.5rem)] [&:lang(bu)]:leading-[1.5]">
                    {t.rich("title", {
                        key: (chunks) => (
                            <span className="text-primary">{chunks}</span>
                        ),
                    })}
                </h2>

                <ul className="mt-12 sm:mt-16 lg:mt-20">
                    {obstacles.map(({ title, body }) => (
                        <li
                            key={title}
                            className="grid gap-x-12 gap-y-3 border-t border-white/15 py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-baseline md:py-9 lg:gap-x-20"
                        >
                            <h3 className="text-balance font-heading text-[1.375rem] font-bold leading-[1.2] tracking-tight text-white md:text-[1.75rem] lg:text-[2rem] [&:lang(bu)]:leading-[1.55]">
                                {title}
                            </h3>
                            <p className="max-w-[34rem] text-[17px] leading-relaxed text-[#a9bcb2] lg:text-lg">
                                {body}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ProblemSection;
