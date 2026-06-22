import { useTranslations } from "next-intl";

const ProblemSection = () => {
    const t = useTranslations("problemsection");

    const cards = [
        {
            chip: "bg-[#eafaf2] text-[#1d9d63]",
            title: t("part1title"),
            body: t("part1body"),
        },
        {
            chip: "bg-[#fff4e2] text-[#c98a1e]",
            title: t("part2title"),
            body: t("part2body"),
        },
        {
            chip: "bg-[#e7f0ff] text-[#3b6fd4]",
            title: t("part3title"),
            body: t("part3body"),
        },
    ];

    return (
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-28">
            <div className="mx-auto mb-14 max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                    {t("subtitle")}
                </p>
                <h2 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                    {t("title")}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {cards.map(({ chip, title, body }, i) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-hairline bg-surface p-8 shadow-[0_10px_30px_rgba(30,39,35,0.05)]"
                    >
                        <div
                            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl font-heading text-xl font-bold ${chip}`}
                        >
                            {i + 1}
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-ink">
                            {title}
                        </h3>
                        <p className="text-[15.5px] leading-relaxed text-ink-soft">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemSection;
