import React from "react";
import { useTranslations } from "next-intl";
import { ImageAutoSlider } from "../ui/image-auto-slider";
import { migrantsDayPhotos } from "../../constants";

const EventsSection = () => {
    const t = useTranslations("events");

    return (
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-ink-deep py-24">
            <div className="mx-auto mb-11 flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-end">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {t("subtitle")}
                    </p>
                    <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                        {t("title")}
                    </h2>
                </div>
                <p className="max-w-xs text-base leading-relaxed text-[#a9bcb2]">
                    {t("description")}
                </p>
            </div>

            <ImageAutoSlider images={migrantsDayPhotos} />

            <p className="mt-10 text-center text-sm text-[#7c8d84]">
                {t("caption")}
            </p>
        </section>
    );
};

export default EventsSection;
