"use client";

import { Check, HardHat, Shuffle, Sparkles, Stethoscope, TrainFront, Utensils, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { LessonIcon } from "@/lib/lessons/icons";
import { cn } from "@/lib/utils";

/** One picture per lesson, so a learner can find the lesson without reading. */
export const LESSON_ICONS: Record<LessonIcon, LucideIcon> = {
    train: TrainFront,
    clinic: Stethoscope,
    food: Utensils,
    work: HardHat,
    ai: Sparkles,
    mix: Shuffle,
};

/**
 * One colour per lesson, taken from the MRT lines, so each lesson is known by
 * its colour as well as its picture. `dark` is the coin's lower edge.
 */
export const LESSON_HUES: Record<LessonIcon, { base: string; dark: string }> = {
    train: { base: "#009645", dark: "#006b31" },
    food: { base: "#fa9e0d", dark: "#b86e00" },
    clinic: { base: "#005ec4", dark: "#003f85" },
    work: { base: "#9900aa", dark: "#6a0076" },
    ai: { base: "#9d5b25", dark: "#6e3f1a" },
    mix: { base: "#d42e12", dark: "#98200c" },
};

/** Where the lesson stands, in the colours the whole lesson kit uses for it. */
export const STAGE_COLORS = {
    done: { ring: "#58cc02", lip: "#46a302", text: "#2b7a00" },
    progress: { ring: "#ffc800", lip: "#e5a800", text: "#946300" },
    next: { ring: "#1cb0f6", lip: "#1899d6", text: "#0b6fa4" },
    new: { ring: "#e5e5e5", lip: "#e5e5e5", text: "#737373" },
} as const;

const RADIUS = 35;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * The lesson's picture on a solid coin in its own colour, with a ring round it
 * that fills as the lesson is gone through: yellow while it is under way,
 * green once it is done, with a tick on top.
 */
export function Medallion({
    icon,
    fraction,
    done,
    size = "md",
    children,
}: {
    icon: LessonIcon;
    /** How much of the lesson is behind the learner, from 0 to 1. */
    fraction: number;
    done: boolean;
    size?: "sm" | "md";
    /** Drawn instead of the lesson's picture. */
    children?: ReactNode;
}) {
    const hue = LESSON_HUES[icon];
    const Icon = LESSON_ICONS[icon];
    const ring = done ? STAGE_COLORS.done.ring : STAGE_COLORS.progress.ring;
    const shown = done ? 1 : fraction;

    return (
        <span
            aria-hidden
            className={cn(
                "relative flex shrink-0 items-center justify-center",
                size === "md" ? "size-[78px]" : "size-16",
            )}
        >
            <svg viewBox="0 0 78 78" className="absolute inset-0 -rotate-90">
                <circle cx="39" cy="39" r={RADIUS} fill="none" stroke="#e5e5e5" strokeWidth="6" />
                {shown > 0 ? (
                    <circle
                        cx="39"
                        cy="39"
                        r={RADIUS}
                        fill="none"
                        stroke={ring}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${CIRCUMFERENCE * shown} ${CIRCUMFERENCE}`}
                    />
                ) : null}
            </svg>
            <span
                className={cn(
                    "flex items-center justify-center rounded-full text-white",
                    size === "md" ? "size-[58px] [&>svg]:size-8" : "size-12 [&>svg]:size-6",
                )}
                style={{ background: hue.base, boxShadow: `inset 0 -5px 0 ${hue.dark}` }}
            >
                {children ?? <Icon strokeWidth={2.5} />}
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
