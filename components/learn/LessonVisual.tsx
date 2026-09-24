"use client";

import { Link2 } from "lucide-react";

import type { PictureKey } from "@/lib/lessons/icons";
import type { Lesson } from "@/lib/lessons/types";
import { lessonVisual, pictureVisual } from "@/lib/lessons/visuals";
import { cn } from "@/lib/utils";

/** A Singapore scene at the start of a lesson, framed in LINK green. */
export function LessonHero({ lesson }: { lesson: Lesson }) {
    const source = lessonVisual(lesson.id);
    if (!source) return null;

    return (
        <div
            aria-hidden
            className="relative mx-auto aspect-video w-full max-w-[640px] overflow-hidden rounded-3xl border-[3px] border-lesson-primary bg-lesson-primary-soft p-1"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={source} alt="" className="size-full rounded-2xl object-cover" />
            <span className="absolute bottom-3 right-3 flex size-[38px] items-center justify-center rounded-full border-[3px] border-white bg-lesson-primary-dark">
                <Link2 className="size-5 text-white" />
            </span>
        </div>
    );
}

/** The photograph that stands for a word, framed in LINK green. */
export function VocabularyVisual({
    picture,
    size = "sm",
}: {
    picture: PictureKey;
    /** `fill` takes the size of whatever holds it. */
    size?: "sm" | "lg" | "fill";
}) {
    return (
        <span
            className={cn(
                "block shrink-0 overflow-hidden border-2 border-lesson-primary bg-lesson-primary-soft p-[3px]",
                size === "sm" && "size-[68px] rounded-xl",
                size === "lg" && "size-[156px] rounded-3xl",
                size === "fill" && "size-full rounded-xl",
            )}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pictureVisual(picture)} alt="" className="size-full rounded-lg object-cover" />
        </span>
    );
}
