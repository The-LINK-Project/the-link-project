"use client";

import type { ReactNode } from "react";

import type { Lesson } from "@/lib/lessons/types";
import { localized } from "@/lib/lessons/localized";

import { Medallion } from "./Medallion";

/**
 * Each lesson's colour, dark enough to carry the lesson's name on white
 * (4.5:1 or more). The MRT orange cannot, so it takes a deeper brown.
 */
const LESSON_INK: Record<Lesson["icon"], string> = {
    train: "#006b31",
    food: "#8a5200",
    clinic: "#003f85",
    work: "#6a0076",
    ai: "#6e3f1a",
    mix: "#98200c",
};

/**
 * The top of a lesson's own pages: its medallion, as on the dashboard card,
 * the page's title, and the lesson's name under it in the lesson's colour. The
 * ring says how far through the lesson this page is.
 */
export function LessonHeading({
    lesson,
    title,
    fraction = 0,
    done = false,
    children,
}: {
    lesson: Lesson;
    title: string;
    /** How much of the lesson is behind the learner, from 0 to 1. */
    fraction?: number;
    done?: boolean;
    /** Anything that belongs with the heading, under it. */
    children?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center gap-4">
                <Medallion icon={lesson.icon} fraction={fraction} done={done} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h1 className="text-balance text-[26px] font-extrabold leading-8 text-lesson-ink">{title}</h1>
                    <p className="text-[15px] font-bold leading-5" style={{ color: LESSON_INK[lesson.icon] }}>
                        {localized(lesson.title, "en")}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}
