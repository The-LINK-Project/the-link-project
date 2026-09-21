"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LOW_TIME_MS = 5_000;

// Seconds label that ticks on its own, so the parent phase (and its photos)
// never re-renders just because the clock moved.
export function SecondsLeft({
    startedAt,
    durationMs,
    className,
}: {
    startedAt: number;
    durationMs: number;
    className?: string;
}) {
    const [remaining, setRemaining] = useState(durationMs);

    useEffect(() => {
        const tick = () =>
            setRemaining(Math.max(0, durationMs - (Date.now() - startedAt)));
        tick();
        const id = setInterval(tick, 200);
        return () => clearInterval(id);
    }, [startedAt, durationMs]);

    const low = remaining <= LOW_TIME_MS;

    return (
        <span
            className={cn(
                "font-heading tabular-nums transition-colors duration-300",
                low ? "text-[#c2410c]" : "text-ink",
                className,
            )}
            aria-live="off"
        >
            {Math.ceil(remaining / 1000)}s
        </span>
    );
}

// Thin bar that drains over the phase. Remount it (via key) to restart.
export function DrainBar({ durationMs }: { durationMs: number }) {
    return (
        <div className="h-1 w-full overflow-hidden rounded-full bg-hairline">
            <div
                className="snapshot-drain h-full w-full rounded-full bg-ink"
                style={
                    {
                        "--snapshot-duration": `${durationMs}ms`,
                    } as React.CSSProperties
                }
            />
        </div>
    );
}
