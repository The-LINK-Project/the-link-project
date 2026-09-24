"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { TutorTurnRequest } from "./types";

export type Recording = NonNullable<TutorTurnRequest["audio"]>;
export type RecorderStatus = "idle" | "recording" | "recorded";

/** Longer than any sentence in a lesson, and short enough to keep uploads small. */
const MAX_RECORDING_MS = 30_000;
/** Anything shorter is an accidental tap rather than an attempt. */
const MIN_RECORDING_MS = 700;
/**
 * Loudest level, in dBFS, a recording may peak at and still count as silent.
 * Speech near a microphone peaks around -20; a quiet room sits near -60. A
 * silent clip sent to the tutor comes back as invented words, so it is not sent.
 */
const SILENCE_DB = -45;
/** Speech needs no more; it keeps a 30-second clip near a megabyte. */
const TARGET_RATE = 16_000;

function toDb(amplitude: number): number {
    return amplitude > 0 ? 20 * Math.log10(amplitude) : -Infinity;
}

/** Averages each output sample's share of the input: good enough for speech. */
function downsample(input: Float32Array, from: number, to: number): Float32Array {
    if (to >= from) return input;
    const ratio = from / to;
    const output = new Float32Array(Math.floor(input.length / ratio));
    for (let i = 0; i < output.length; i++) {
        const start = Math.floor(i * ratio);
        const end = Math.min(input.length, Math.floor((i + 1) * ratio));
        let sum = 0;
        for (let j = start; j < end; j++) sum += input[j];
        output[i] = sum / Math.max(1, end - start);
    }
    return output;
}

/** Mono, 16-bit PCM WAV. */
function encodeWav(samples: Float32Array, rate: number): Blob {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const write = (offset: number, value: string) => {
        for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
    };
    write(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    write(8, "WAVE");
    write(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, rate, true);
    view.setUint32(28, rate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    write(36, "data");
    view.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return new Blob([buffer], { type: "audio/wav" });
}

async function blobToBase64(blob: Blob): Promise<string> {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(binary);
}

type Capture = {
    stream: MediaStream;
    context: AudioContext;
    source: MediaStreamAudioSourceNode;
    processor: ScriptProcessorNode;
    chunks: Float32Array[];
    startedAt: number;
};

/**
 * The microphone, for one recording at a time.
 *
 * Samples are taken straight from the microphone and written as WAV here,
 * rather than recorded in whatever compressed format the browser prefers:
 * every browser records something different, and WAV is what the tutor reads.
 */
export function useRecorder() {
    const [status, setStatus] = useState<RecorderStatus>("idle");
    const [uri, setUri] = useState<string | null>(null);
    const [durationMs, setDurationMs] = useState(0);
    const [level, setLevel] = useState(0);
    const [tooShort, setTooShort] = useState(false);
    const [tooQuiet, setTooQuiet] = useState(false);
    const [failed, setFailed] = useState(false);
    const capture = useRef<Capture | null>(null);
    const recording = useRef<Blob | null>(null);
    const peak = useRef(-Infinity);
    const busy = useRef(false);
    const mounted = useRef(true);
    const phase = useRef<RecorderStatus>("idle");

    const release = useCallback(() => {
        const current = capture.current;
        capture.current = null;
        if (!current) return;
        current.processor.disconnect();
        current.source.disconnect();
        current.stream.getTracks().forEach((track) => track.stop());
        void current.context.close().catch(() => undefined);
    }, []);

    const reset = useCallback(() => {
        release();
        recording.current = null;
        phase.current = "idle";
        if (!mounted.current) return;
        setUri((previous) => {
            if (previous) URL.revokeObjectURL(previous);
            return null;
        });
        setStatus("idle");
        setDurationMs(0);
        setLevel(0);
    }, [release]);

    const start = useCallback(async (): Promise<"started" | "denied" | "failed"> => {
        if (!mounted.current || busy.current || phase.current !== "idle") return "failed";
        busy.current = true;
        setFailed(false);
        try {
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
                });
            } catch (error) {
                const name = (error as DOMException)?.name;
                return name === "NotAllowedError" || name === "SecurityError" ? "denied" : "failed";
            }
            if (!mounted.current) {
                stream.getTracks().forEach((track) => track.stop());
                return "failed";
            }
            const context = new AudioContext();
            await context.resume().catch(() => undefined);
            const source = context.createMediaStreamSource(stream);
            const processor = context.createScriptProcessor(4096, 1, 1);
            const chunks: Float32Array[] = [];
            processor.onaudioprocess = (event) => {
                const input = event.inputBuffer.getChannelData(0);
                chunks.push(new Float32Array(input));
                let loudest = 0;
                for (let i = 0; i < input.length; i++) loudest = Math.max(loudest, Math.abs(input[i]));
                const db = toDb(loudest);
                peak.current = Math.max(peak.current, db);
                if (!mounted.current || !capture.current) return;
                // Decibels, roughly -60 for a quiet room up to 0 at full scale.
                setLevel(Math.max(0, Math.min(1, (db + 60) / 60)));
                setDurationMs(Date.now() - capture.current.startedAt);
            };
            source.connect(processor);
            // A processor only runs while connected to the output; it writes silence.
            processor.connect(context.destination);
            capture.current = { stream, context, source, processor, chunks, startedAt: Date.now() };
            peak.current = -Infinity;
            phase.current = "recording";
            setTooShort(false);
            setTooQuiet(false);
            setDurationMs(0);
            setStatus("recording");
            return "started";
        } catch {
            reset();
            return "failed";
        } finally {
            busy.current = false;
        }
    }, [reset]);

    const finish = useCallback(
        (keep: boolean) => {
            const current = capture.current;
            if (busy.current || phase.current !== "recording" || !current) return;
            busy.current = true;
            try {
                const duration = Date.now() - current.startedAt;
                const rate = current.context.sampleRate;
                const total = current.chunks.reduce((sum, chunk) => sum + chunk.length, 0);
                const samples = new Float32Array(total);
                let offset = 0;
                for (const chunk of current.chunks) {
                    samples.set(chunk, offset);
                    offset += chunk.length;
                }
                release();
                const silent = peak.current < SILENCE_DB;
                if (keep && mounted.current && duration >= MIN_RECORDING_MS && !silent) {
                    const wav = encodeWav(downsample(samples, rate, TARGET_RATE), Math.min(rate, TARGET_RATE));
                    recording.current = wav;
                    phase.current = "recorded";
                    setUri(URL.createObjectURL(wav));
                    setDurationMs(duration);
                    setLevel(0);
                    setStatus("recorded");
                } else {
                    reset();
                    if (mounted.current) {
                        setTooShort(keep && duration < MIN_RECORDING_MS);
                        setTooQuiet(keep && duration >= MIN_RECORDING_MS && silent);
                    }
                }
            } catch {
                if (mounted.current) setFailed(true);
                reset();
            } finally {
                busy.current = false;
            }
        },
        [release, reset],
    );

    const stop = useCallback(() => finish(true), [finish]);
    const cancel = useCallback(() => finish(false), [finish]);
    const discard = useCallback(() => {
        if (phase.current !== "recorded" || busy.current) return;
        reset();
        setTooShort(false);
        setTooQuiet(false);
    }, [reset]);

    const read = useCallback(async (): Promise<Recording | null> => {
        if (phase.current !== "recorded" || !recording.current) return null;
        return { mimeType: "audio/wav", data: await blobToBase64(recording.current) };
    }, []);

    useEffect(() => {
        if (status === "recording" && durationMs >= MAX_RECORDING_MS) finish(true);
    }, [status, durationMs, finish]);

    // Leaving the tab mid-recording keeps what was said, the way the phone does.
    useEffect(() => {
        const onHide = () => {
            if (document.visibilityState === "hidden") finish(true);
        };
        document.addEventListener("visibilitychange", onHide);
        return () => document.removeEventListener("visibilitychange", onHide);
    }, [finish]);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            release();
        };
    }, [release]);

    useEffect(() => () => {
        if (uri) URL.revokeObjectURL(uri);
    }, [uri]);

    return { status, durationMs, level, tooShort, tooQuiet, failed, uri, start, stop, cancel, discard, read };
}
