"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { recordingUrl } from "./audio";

/**
 * Normal is slightly under natural pace, because learners are hearing these
 * words for the first time. Slow leaves room between the words.
 */
const RATE = { normal: 0.85, slow: 0.5 } as const;

/**
 * The same, for a recording, which is already spoken clearly for a learner.
 * Stretched further than this a recording starts to sound wrong.
 */
const RECORDING_RATE = { normal: 0.9, slow: 0.7 } as const;

/** Prefer a local accent when available, then other installed English voices. */
const LANGUAGE_PREFERENCE = ["en-SG", "en-AU", "en-GB", "en-IN", "en-US"];

export type SpeechSpeed = keyof typeof RATE;

function synth(): SpeechSynthesis | null {
    return typeof window !== "undefined" && "speechSynthesis" in window
        ? window.speechSynthesis
        : null;
}

/** Prefer an installed high-quality voice, then accent. */
function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    const english = voices.filter((voice) => voice.lang?.replace("_", "-").startsWith("en"));
    if (english.length === 0) return undefined;
    const score = (voice: SpeechSynthesisVoice) => {
        const accent = LANGUAGE_PREFERENCE.indexOf(voice.lang.replace("_", "-"));
        return {
            // Network and "enhanced" voices sound far better than the compact ones.
            quality: /enhanced|premium|natural|google/i.test(voice.name) || !voice.localService ? 0 : 1,
            accent: accent === -1 ? LANGUAGE_PREFERENCE.length : accent,
        };
    };
    return english.reduce((a, b) => {
        const left = score(a);
        const right = score(b);
        if (left.quality !== right.quality) return left.quality < right.quality ? a : b;
        return left.accent <= right.accent ? a : b;
    });
}

const prefetched = new Set<string>();

/**
 * Fetch the recordings a screen is about to play, so a tap plays at once even
 * on a slow connection. Each is a few kilobytes and cached for good after.
 */
export function prefetchSpeech(texts: string[]) {
    for (const text of texts) {
        const url = recordingUrl(text);
        if (!url || prefetched.has(url)) continue;
        prefetched.add(url);
        fetch(url, { priority: "low" }).catch(() => prefetched.delete(url));
    }
}

/**
 * Speak English aloud: the recording in the tutor's voice when there is one
 * (see `audio.ts`), and the browser's own voice otherwise.
 *
 * `hasPlayed` turns true once a phrase has finished at normal speed, so the
 * slow replay only appears after the learner has heard natural pace first.
 */
export function useSpeech() {
    const [speaking, setSpeaking] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const mounted = useRef(true);
    const generation = useRef(0);
    const voice = useRef<SpeechSynthesisVoice | undefined>(undefined);
    const player = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        mounted.current = true;
        const speech = synth();
        const requests = generation;
        const audio = player;
        const load = () => {
            voice.current = pickVoice(speech?.getVoices() ?? []);
        };
        load();
        speech?.addEventListener?.("voiceschanged", load);
        return () => {
            mounted.current = false;
            ++requests.current;
            speech?.removeEventListener?.("voiceschanged", load);
            speech?.cancel();
            audio.current?.pause();
        };
    }, []);

    const speakWithVoice = useCallback((text: string, speed: SpeechSpeed, current: () => boolean) => {
        const speech = synth();
        if (!speech) {
            setSpeaking(false);
            return;
        }
        speech.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (voice.current) utterance.voice = voice.current;
        utterance.lang = voice.current?.lang ?? "en-US";
        utterance.rate = RATE[speed];
        utterance.onend = () => {
            if (!current()) return;
            setSpeaking(false);
            if (speed === "normal") setHasPlayed(true);
        };
        utterance.onerror = () => {
            if (current()) setSpeaking(false);
        };
        setSpeaking(true);
        speech.speak(utterance);
    }, []);

    const speak = useCallback(
        (text: string, speed: SpeechSpeed = "normal") => {
            if (!text.trim()) return;
            const request = ++generation.current;
            const current = () => mounted.current && request === generation.current;
            // A second tap restarts rather than queues.
            synth()?.cancel();
            player.current?.pause();

            const url = recordingUrl(text);
            if (!url) {
                speakWithVoice(text, speed, current);
                return;
            }
            // Started here, inside the tap: Safari only lets sound begin from
            // one, so nothing may be awaited before play().
            const audio = (player.current ??= new Audio());
            audio.src = url;
            // Loading a new file resets the rate to the default, so set both.
            audio.defaultPlaybackRate = RECORDING_RATE[speed];
            audio.playbackRate = RECORDING_RATE[speed];
            audio.preservesPitch = true;
            audio.onended = () => {
                if (!current()) return;
                setSpeaking(false);
                if (speed === "normal") setHasPlayed(true);
            };
            // A file that will not load or play is read by the browser instead.
            audio.onerror = () => {
                if (current()) speakWithVoice(text, speed, current);
            };
            setSpeaking(true);
            audio.play().catch((error: DOMException) => {
                // Interrupted by the next tap, which has taken over.
                if (error.name === "AbortError") return;
                if (current()) speakWithVoice(text, speed, current);
            });
        },
        [speakWithVoice],
    );

    const stop = useCallback(() => {
        ++generation.current;
        synth()?.cancel();
        player.current?.pause();
        setSpeaking(false);
    }, []);

    // Leaving the tab stops speech, the way leaving the app does on a phone.
    useEffect(() => {
        const onHide = () => {
            if (document.visibilityState === "hidden") stop();
        };
        document.addEventListener("visibilitychange", onHide);
        return () => document.removeEventListener("visibilitychange", onHide);
    }, [stop]);

    return { speak, stop, speaking, hasPlayed };
}
