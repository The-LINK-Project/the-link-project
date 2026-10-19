"use client";

import type { ReactNode } from "react";

import type { PictureKey } from "@/lib/lessons/icons";

import { VocabularyVisual } from "./LessonVisual";
import { LessonCardBox } from "./ui";

/**
 * What the learner is being asked to say, with the picture of what it is about.
 *
 * Only for exercises where the meaning is already on the card in words. There
 * the picture gives nothing away. A listening exercise must not use this: the
 * picture would answer it.
 */
export function PromptCard({
    picture,
    tone,
    children,
}: {
    /** Left out when no word in the exercise has a picture. */
    picture?: PictureKey;
    tone?: "default" | "muted";
    children: ReactNode;
}) {
    return (
        <LessonCardBox tone={tone} className="flex items-center gap-3">
            {picture ? (
                <span aria-hidden className="size-24 shrink-0">
                    <VocabularyVisual picture={picture} size="fill" />
                </span>
            ) : null}
            <div className="flex-1">{children}</div>
        </LessonCardBox>
    );
}
