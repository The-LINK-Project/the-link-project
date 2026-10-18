"use client";

import { X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import type { LessonIcon } from "@/lib/lessons/icons";

import { LESSON_HUES } from "./Medallion";

/**
 * The lesson's colour, faint, with the lattice of diamonds the dashboard
 * draws on its cards. Only shown on wider screens, around the lesson.
 */
function stageStyle(icon: LessonIcon | undefined): CSSProperties {
    const hue = icon ? LESSON_HUES[icon].base : "#72e3ad";
    const diamond = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 11l5 5-5 5-5-5z" fill="${hue}" fill-opacity="0.13"/></svg>`,
    );
    return {
        backgroundColor: `color-mix(in srgb, ${hue} 7%, white)`,
        backgroundImage: `url("data:image/svg+xml,${diamond}")`,
    };
}

/**
 * The frame every lesson and talk sits in: a close button and whatever runs
 * alongside it at the top, the page in the middle, and the way forward pinned
 * to the bottom so it is always in view.
 *
 * On a phone it is the whole screen. On anything wider it is a card on a stage
 * in the lesson's own colour, so a lesson reads as a place of its own rather
 * than a narrow column on an empty page.
 */
export function LessonShell({
    closeLabel,
    onClose,
    icon,
    header,
    footer,
    children,
    scrollRef,
}: {
    closeLabel: string;
    onClose: () => void;
    /** The lesson's picture, which also gives the stage its colour. */
    icon?: LessonIcon;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    scrollRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <div className="sm:px-4 sm:pb-4">
            <div className="sm:rounded-[2rem] sm:px-4 sm:py-6" style={stageStyle(icon)}>
                <div className="mx-auto flex h-[calc(100dvh-4.5rem)] w-full max-w-2xl flex-col overflow-hidden bg-white sm:h-[calc(100dvh-9rem)] sm:rounded-3xl sm:border-2 sm:border-lesson-key sm:shadow-[0_4px_0_var(--color-lesson-key)]">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <button
                            type="button"
                            aria-label={closeLabel}
                            onClick={onClose}
                            className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-lesson-muted hover:bg-lesson-muted-surface"
                        >
                            <X className="size-7" strokeWidth={2.5} />
                        </button>
                        {header}
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto">
                        <div className="flex min-h-full flex-col gap-6 p-4 pb-8">{children}</div>
                    </div>
                    {footer ? <div className="shrink-0">{footer}</div> : null}
                </div>
            </div>
        </div>
    );
}

/** The pinned area under a page that is not an exercise. */
export function ShellActions({ children }: { children: ReactNode }) {
    return <div className="bg-white px-4 pb-6 pt-4">{children}</div>;
}
