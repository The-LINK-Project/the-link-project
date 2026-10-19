"use client";

import { Bot, Check } from "lucide-react";

import { STAGE_COLORS } from "@/components/learn/Medallion";

/** The game's own colour, alongside the lessons' MRT-line hues. */
export const ETHICS_HUE = { base: "#5ac7db", dark: "#2a9db3", ink: "#0e6b7b" };

/**
 * The game's coin, drawn like a lesson Medallion: a ring that is empty
 * (nothing about the game is tracked) until the team finishes, when it fills
 * green and takes the tick.
 */
export function EthicsCoin({ done = false }: { done?: boolean }) {
    return (
        <span aria-hidden className="relative flex size-[78px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 78 78" className="absolute inset-0">
                <circle cx="39" cy="39" r="35" fill="none" stroke={done ? STAGE_COLORS.done.ring : "#e5e5e5"} strokeWidth="6" />
            </svg>
            <span
                className="flex size-[58px] items-center justify-center rounded-full text-white [&>svg]:size-8"
                style={{ background: ETHICS_HUE.base, boxShadow: `inset 0 -5px 0 ${ETHICS_HUE.dark}` }}
            >
                <Bot strokeWidth={2.5} />
            </span>
            {done ? (
                <span
                    className="absolute -right-0.5 -top-0.5 flex size-6 items-center justify-center rounded-full border-[3px] border-white"
                    style={{ background: STAGE_COLORS.done.ring }}
                >
                    <Check className="size-3.5 text-white" strokeWidth={4} />
                </span>
            ) : null}
        </span>
    );
}
