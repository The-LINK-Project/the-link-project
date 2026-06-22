"use client";
import React from "react";
import { useTranslations } from "next-intl";

/**
 * Full-bleed keyword strip shown between the product preview and the
 * "Challenge" section on the landing page. The phrases scroll horizontally
 * using the shared `marquee` keyframe (see globals.css). The track is split
 * into two identical halves so the -50% translate loops seamlessly; motion is
 * disabled for users who prefer reduced motion.
 */
const ObjectivesMarquee = () => {
    const t = useTranslations("objectives");

    const sequence = `${t("item1")}  ✦  ${t("item2")}  ✦  ${t("item3")}  ✦  `;
    // Repeat within each half so the strip stays full on wide viewports.
    const half = sequence.repeat(4);

    return (
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-hairline bg-surface py-5">
            <div className="objectives-marquee-track flex w-max">
                {[0, 1].map((i) => (
                    <span
                        key={i}
                        aria-hidden={i === 1}
                        className="whitespace-nowrap font-heading text-2xl font-semibold tracking-wide text-[#aeb6b1]"
                    >
                        {half}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ObjectivesMarquee;
