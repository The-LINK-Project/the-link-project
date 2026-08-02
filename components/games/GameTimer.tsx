"use client";
import { useEffect, useState } from "react";

export function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
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

    useEffect(() => {
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
