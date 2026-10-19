"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Natural pace, and a slower replay for words heard for the first time. */
const RATE = { normal: 1, slow: 0.75 } as const;

export type PlaybackSpeed = keyof typeof RATE;

/** Plays one audio URL at a time. Starting another replaces it, and stop always works. */
export function usePlayback() {
    const player = useRef<HTMLAudioElement | null>(null);
    const [current, setCurrent] = useState<string | null>(null);
    const mounted = useRef(true);

    const stop = useCallback(() => {
        const audio = player.current;
        player.current = null;
        if (audio) {
            audio.onended = null;
            audio.onerror = null;
            audio.pause();
        }
        if (mounted.current) setCurrent(null);
    }, []);

    const play = useCallback(
        (uri: string, speed: PlaybackSpeed = "normal") => {
            stop();
            const audio = new Audio(uri);
            audio.playbackRate = RATE[speed];
            // Slowed speech keeps its pitch, where the browser allows it.
            (audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
            const done = () => {
                if (player.current !== audio) return;
                player.current = null;
                if (mounted.current) setCurrent(null);
            };
            audio.onended = done;
            audio.onerror = done;
            player.current = audio;
            setCurrent(uri);
            // A browser that blocks sound before a tap refuses here; the learner
            // can still press play on the line.
            void audio.play().catch(done);
        },
        [stop],
    );

    useEffect(() => {
        mounted.current = true;
        const onHide = () => {
            if (document.visibilityState === "hidden") stop();
        };
        document.addEventListener("visibilitychange", onHide);
        return () => {
            mounted.current = false;
            document.removeEventListener("visibilitychange", onHide);
            stop();
        };
    }, [stop]);

    return { play, stop, playingUri: current };
}
