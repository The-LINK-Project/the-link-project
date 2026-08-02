import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Credibility line shown above the hero wordmark — celebrates the Young
 * Aurora Award win. Renders the Young Aurora mark alongside the award copy in
 * a flat, editorial treatment (no pill) to match the landing redesign.
 */
const AwardBadge = () => {
    const t = useTranslations("herosection");

    return (
        <div className="inline-flex items-center gap-3">
            <Image
                src="/assets/young-aurora-icon.png"
                alt="Young Aurora"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
            />
            <span className="text-base font-semibold tracking-[0.004em] text-[#9a6a00] sm:text-lg">
                {t("award")}
            </span>
        </div>
    );
};

export default AwardBadge;
