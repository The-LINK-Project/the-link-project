"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Normal is slightly under natural pace, because learners are hearing these
 * words for the first time. Slow leaves room between the words.
 */
const RATE = { normal: 0.85, slow: 0.5 } as const;

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

/**
 * Speak English aloud with the browser's own voice.
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

    useEffect(() => {
        mounted.current = true;
        const speech = synth();
        const requests = generation;
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
        };
    }, []);

    const speak = useCallback((text: string, speed: SpeechSpeed = "normal") => {
        const speech = synth();
        if (!speech || !text.trim()) return;
        const request = ++generation.current;
        const current = () => mounted.current && request === generation.current;
        // A second tap restarts rather than queues.
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

    const stop = useCallback(() => {
        ++generation.current;
        synth()?.cancel();
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
