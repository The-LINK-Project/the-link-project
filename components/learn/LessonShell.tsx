"use client";

import { X } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import type { LessonIcon } from "@/lib/lessons/icons";
import { cn } from "@/lib/utils";

import { LESSON_HUES } from "./Medallion";
import { RestartButton, RestartConfirm } from "./RestartLesson";

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
 * How long a tap on a footer that has just changed is let fall (see below).
 * Long enough for the second tap of a double tap, too short to wait out.
 */
const SETTLE_MS = 400;

/**
 * The frame every lesson and talk sits in: a close button and whatever runs
 * alongside it at the top, the page in the middle, and the way forward pinned
 * to the bottom so it is always in view.
 *
 * On a phone, either way up, it is the whole screen: the site header is put
 * away for it (see globals.css), and Close is the way back to the rest of
 * the site. With room to spare it is a card on a stage in the lesson's own
 * colour, so a lesson reads as a place of its own rather than a narrow column
 * on an empty page. `roomy` and `cramped` are defined in globals.css.
 *
 * A phone's gestures are kept to the lesson: a pull down cannot reload the page
 * (see globals.css), nothing drags it sideways, and a quick second tap on a
 * tile is a tap rather than a zoom.
 *
 * With `onRestart`, the top bar also has a way to start again, which asks
 * first in place of the footer (see RestartLesson).
 */
export function LessonShell({
    closeLabel,
    onClose,
    icon,
    header,
    footer,
    children,
    scrollRef,
    step,
    footerKey,
    onRestart,
}: {
    closeLabel: string;
    onClose: () => void;
    /** The lesson's picture, which also gives the stage its colour. */
    icon?: LessonIcon;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    scrollRef?: React.Ref<HTMLDivElement>;
    /**
     * Which page of the lesson is in the middle. A new one opens at its top:
     * on a phone the answers sit low and get scrolled to, and the next page
     * would otherwise open scrolled past its own instruction.
     */
    step?: string | number;
    /** What the footer offers, where that changes within a page (an answer graded). Defaults to `step`. */
    footerKey?: string | number;
    /** Starts the lesson again. Absent while there is nothing to lose. */
    onRestart?: () => void;
}) {
    const [confirming, setConfirming] = useState(false);
    const asking = confirming && onRestart;

    // A question asked about one page is not left open over the next.
    useEffect(() => {
        setConfirming(false);
    }, [step]);

    // A tap on the footer just after it changed is the second half of a double
    // tap on the button that changed it, not a choice: Continue under the last
    // dilemma sits exactly where Play again appears, and Check where Continue
    // does. Such taps are let fall for a moment.
    const settleKey = footerKey ?? step;
    const [settling, setSettling] = useState(false);
    useEffect(() => {
        if (settleKey === undefined) return;
        setSettling(true);
        const timer = setTimeout(() => setSettling(false), SETTLE_MS);
        return () => clearTimeout(timer);
    }, [settleKey]);

    return (
        <div data-lesson-shell className="roomy:px-4 roomy:pb-4">
            <div className="roomy:rounded-[2rem] roomy:px-4 roomy:py-6" style={stageStyle(icon)}>
                <div className="mx-auto flex h-dvh w-full max-w-2xl touch-manipulation flex-col overflow-hidden bg-white roomy:h-[calc(100dvh-9rem)] roomy:rounded-3xl roomy:border-2 roomy:border-lesson-key roomy:shadow-[0_4px_0_var(--color-lesson-key)]">
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
                        {onRestart ? (
                            <RestartButton open={!!asking} onClick={() => setConfirming(!asking)} />
                        ) : null}
                    </div>
                    <div
                        key={step}
                        ref={scrollRef}
                        className="flex-1 touch-manipulation overflow-y-auto overflow-x-hidden overscroll-contain"
                    >
                        <div className="flex min-h-full flex-col gap-6 p-4 pb-8">{children}</div>
                    </div>
                    {asking ? (
                        <div className="shrink-0">
                            <RestartConfirm
                                onRestart={() => {
                                    setConfirming(false);
                                    onRestart();
                                }}
                                onCancel={() => setConfirming(false)}
                            />
                        </div>
                    ) : footer ? (
                        <div className={cn("shrink-0", settling && "pointer-events-none")}>{footer}</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

/** The pinned area under a page that is not an exercise. */
export function ShellActions({ children }: { children: ReactNode }) {
    return <div className="bg-white px-4 pb-6 pt-4">{children}</div>;
}
