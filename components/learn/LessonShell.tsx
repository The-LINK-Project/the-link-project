"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The frame every lesson and talk sits in: a close button and whatever runs
 * alongside it at the top, the page in the middle, and the way forward pinned
 * to the bottom so it is always in view.
 */
export function LessonShell({
    closeLabel,
    onClose,
    header,
    footer,
    children,
    scrollRef,
}: {
    closeLabel: string;
    onClose: () => void;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    scrollRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <div className="mx-auto flex h-[calc(100dvh-4.5rem)] w-full max-w-2xl flex-col bg-[#fcfcfc] sm:h-[calc(100dvh-5rem)]">
            <div className="flex items-center gap-3 px-4 py-3">
                <button
                    type="button"
                    aria-label={closeLabel}
                    onClick={onClose}
                    className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-lesson-muted hover:bg-lesson-muted-surface"
                >
                    <X className="size-7" />
                </button>
                {header}
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
                <div className="flex min-h-full flex-col gap-6 p-4 pb-8">{children}</div>
            </div>
            {footer ? <div className="shrink-0">{footer}</div> : null}
        </div>
    );
}

/** The pinned area under a page that is not an exercise. */
export function ShellActions({ children }: { children: ReactNode }) {
    return <div className="border-t border-lesson-hairline bg-white px-4 pb-6 pt-4">{children}</div>;
}
