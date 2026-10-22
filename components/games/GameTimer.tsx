"use client";
import { useLayoutEffect, useState } from "react";

export function formatTime(ms: number) {
    // A phone clock set back mid-game must not show a negative time.
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Self-contained running clock. The interval lives in this leaf so the tick
// re-renders a single text node instead of the whole game tree.
const GameTimer = ({
    startTime,
    running,
    intervalMs = 500,
}: {
    startTime: number;
    running: boolean;
    intervalMs?: number;
}) => {
    const [elapsedMs, setElapsedMs] = useState(0);

    // Before the browser paints, so a clock picked up part-way (a game resumed,
    // the page back from hiding) never shows 0:00 or a stale time first.
    useLayoutEffect(() => {
        if (!running) return;
        setElapsedMs(Date.now() - startTime);
        const id = setInterval(() => {
            setElapsedMs(Date.now() - startTime);
        }, intervalMs);
        return () => clearInterval(id);
    }, [running, startTime, intervalMs]);

    return <>{formatTime(elapsedMs)}</>;
};

export default GameTimer;
