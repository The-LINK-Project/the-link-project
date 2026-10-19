"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { EthicsCoin } from "./EthicsCoin";

/**
 * The Ethics of AI game on the dashboard, drawn like a lesson key so it sits
 * naturally under Quick practice. Nothing is tracked, so the ring is empty
 * and the coin's colour is its own.
 */
const RING = "#e5e5e5";

export function EthicsCard() {
    const t = useTranslations("ethics");

    return (
        <div
            className="flex flex-col rounded-2xl border-2 bg-white shadow-[0_4px_0_var(--lip)] transition-[transform,box-shadow] duration-75 has-[[data-card-main]:active]:translate-y-1 has-[[data-card-main]:active]:shadow-none"
            style={{ borderColor: RING, ["--lip" as string]: RING }}
        >
            <Link
                data-card-main
                href="/ethics"
                aria-label={`${t("title")}. ${t("cardGoal")}`}
                className="flex items-center gap-4 rounded-2xl p-4 outline-offset-4"
            >
                <EthicsCoin />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[13px] font-extrabold uppercase tracking-wide text-[#737373]">{t("cardMeta")}</span>
                    <span className="text-lg font-extrabold leading-6 text-[#3c3c3c]">{t("title")}</span>
                    <span className="text-[15px] leading-5 text-[#6b6b6b]">{t("cardGoal")}</span>
                </span>
            </Link>
        </div>
    );
}
