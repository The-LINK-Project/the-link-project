"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { STAGE_COLORS } from "@/components/learn/Medallion";
import { Link } from "@/i18n/navigation";

import { EthicsCoin } from "./EthicsCoin";

/**
 * Remembered on this laptop once a team reaches the finish screen, so the
 * card can say Done the way a lesson card does. Nothing else is tracked.
 */
export const ETHICS_PLAYED_KEY = "ethics-played";

export function markEthicsPlayed() {
    try {
        window.localStorage.setItem(ETHICS_PLAYED_KEY, "1");
    } catch {
        // Private mode or blocked storage: the card just stays "Not started".
    }
}

/**
 * The Ethics of AI game on the dashboard, laid out exactly like a lesson key
 * beside the workshop lessons: status, title, goal, then length.
 */
export function EthicsCard() {
    const t = useTranslations("ethics");
    const lessons = useTranslations("lessons");
    // Read after mount: the server does not know this laptop's storage.
    const [played, setPlayed] = useState(false);
    useEffect(() => {
        try {
            setPlayed(window.localStorage.getItem(ETHICS_PLAYED_KEY) === "1");
        } catch {
            // Leave it unplayed.
        }
    }, []);

    const tone = played ? STAGE_COLORS.done : STAGE_COLORS.new;
    const stageLabel = played ? lessons("statusDone") : lessons("statusNotStarted");

    return (
        <div
            className="flex flex-col rounded-2xl border-2 bg-white shadow-[0_4px_0_var(--lip)] transition-[transform,box-shadow] duration-75 has-[[data-card-main]:active]:translate-y-1 has-[[data-card-main]:active]:shadow-none"
            style={{ borderColor: tone.ring, ["--lip" as string]: tone.lip }}
        >
            <Link
                data-card-main
                href="/ethics"
                aria-label={`${t("title")}. ${stageLabel}. ${t("cardGoal")}`}
                title={t("cardGoal")}
                className="flex items-center gap-4 rounded-2xl p-4 outline-offset-4"
            >
                <EthicsCoin done={played} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: tone.text }}>
                        {stageLabel}
                    </span>
                    <span className="text-lg font-extrabold leading-6 text-[#3c3c3c]">{t("title")}</span>
                    <span className="text-[15px] leading-5 text-[#6b6b6b]">{t("cardGoal")}</span>
                    {played ? null : <span className="pt-1 text-[13px] font-bold text-[#8a8a8a]">{t("cardMeta")}</span>}
                </span>
            </Link>
        </div>
    );
}
