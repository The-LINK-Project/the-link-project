/**
 * Records every piece of English the lesson activities read aloud, in the
 * speaking tutor's voice, as small MP3s in `public/lessons/audio/`.
 *
 *     npm run record:audio
 *
 * Needs GEMINI_API_KEY (read from .env.local). Commit the new files and
 * `lib/lessons/audio-manifest.json` afterwards; learners then hear these
 * recordings and nothing is generated while they listen (see lib/lessons/audio.ts).
 *
 * Safe to run any time: only texts with no recording yet are sent, so adding a
 * lesson costs a request per new word or phrase. Recordings that no lesson
 * uses any more are deleted once everything else is recorded.
 *
 * Google limits the speech model per minute and per day, and the live speaking
 * tutor draws on the same limits, so run this outside a workshop. Requests are
 * spaced out to stay under a per-minute limit; when Google still says to wait,
 * the script waits. When the day's limit is used up it stops, keeps what it
 * has, and can be run again after the limit resets at midnight Pacific time.
 */

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { Mp3Encoder } from "@breezystack/lamejs";

import { audioId, lessonSpokenTexts, RECORDING, spokenForm } from "@/lib/lessons/audio";
import { listLessons, listWorkshopLessons } from "@/lib/lessons/data";
import { sampleRateOf } from "@/lib/speaking/audio";
import { GoogleError, QuotaError, responseError, send } from "@/lib/speaking/google";

const OUT_DIR = path.join(process.cwd(), "public/lessons/audio");
const MANIFEST = path.join(process.cwd(), "lib/lessons/audio-manifest.json");
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

/** Request starts are at least this far apart: under 10 a minute. */
const MIN_GAP_MS = 6_500;
/** A wait longer than this is a daily limit, not a per-minute one. */
const LONGEST_WAIT_MS = 2 * 60_000;
const TIMEOUT_MS = 60_000;
/** 48 kbps mono is clear for speech at about 6 KB a second. */
const KBPS = 48;

type GenerateResponse = {
    candidates?: { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function say(apiKey: string, text: string): Promise<{ pcm: Int16Array; rate: number }> {
    const response = await send(
        "Gemini",
        `${ENDPOINT}/${RECORDING.model}:generateContent`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: RECORDING.voice } } },
                },
            }),
        },
        TIMEOUT_MS,
    );
    if (!response.ok) throw await responseError("Gemini", response);
    const body = (await response.json()) as GenerateResponse;
    const inline = body.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data)?.inlineData;
    const bytes = Buffer.from(inline?.data ?? "", "base64");
    if (bytes.length < 2) throw new GoogleError("Gemini returned no audio");
    // Little-endian 16-bit PCM; copied so the samples are aligned.
    const pcm = new Int16Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + (bytes.length & ~1)));
    return { pcm, rate: sampleRateOf(inline?.mimeType) };
}

/** Cut the silence either side, keeping a little so the word doesn't start abruptly. */
function trim(pcm: Int16Array, rate: number): Int16Array {
    let peak = 0;
    for (const sample of pcm) peak = Math.max(peak, Math.abs(sample));
    const threshold = peak * 0.03;
    let start = pcm.findIndex((sample) => Math.abs(sample) > threshold);
    let end = pcm.length - 1;
    while (end > start && Math.abs(pcm[end]) <= threshold) end--;
    if (start < 0) return pcm;
    const pad = Math.round(rate * 0.08);
    start = Math.max(0, start - pad);
    end = Math.min(pcm.length, end + pad);
    return pcm.subarray(start, end);
}

function mp3(pcm: Int16Array, rate: number): Buffer {
    const encoder = new Mp3Encoder(1, rate, KBPS);
    const chunks: Uint8Array[] = [];
    for (let i = 0; i < pcm.length; i += 1152) chunks.push(encoder.encodeBuffer(pcm.subarray(i, i + 1152)));
    chunks.push(encoder.flush());
    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

function writeManifest(needed: Map<string, string>) {
    const clips = [...needed.keys()].filter((id) => existsSync(path.join(OUT_DIR, `${id}.mp3`))).sort();
    writeFileSync(MANIFEST, `${JSON.stringify({ clips }, null, 4)}\n`);
    return clips.length;
}

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set (put it in .env.local)");
    mkdirSync(OUT_DIR, { recursive: true });

    // Every lesson on Home; the daily mix is drawn from these, so it is covered.
    const needed = new Map<string, string>();
    for (const lesson of [...listLessons(), ...listWorkshopLessons()]) {
        for (const text of lessonSpokenTexts(lesson)) needed.set(audioId(text), text);
    }
    const missing = [...needed].filter(([id]) => !existsSync(path.join(OUT_DIR, `${id}.mp3`)));
    console.log(`${needed.size} texts are read aloud; ${missing.length} still need recording.`);

    let recorded = 0;
    let lastStart = 0;
    const failed: string[] = [];
    for (const [id, text] of missing) {
        for (let attempt = 1; ; attempt++) {
            await sleep(Math.max(0, lastStart + MIN_GAP_MS - Date.now()));
            lastStart = Date.now();
            try {
                const { pcm, rate } = await say(apiKey, spokenForm(text));
                writeFileSync(path.join(OUT_DIR, `${id}.mp3`), mp3(trim(pcm, rate), rate));
                recorded++;
                console.log(`  [${recorded}/${missing.length}] ${text}`);
                writeManifest(needed);
                break;
            } catch (error) {
                if (error instanceof QuotaError && error.retryAfterMs <= LONGEST_WAIT_MS && attempt <= 5) {
                    console.log(`  Google asked to wait ${Math.ceil(error.retryAfterMs / 1000)}s; waiting.`);
                    await sleep(error.retryAfterMs + 1_000);
                    continue;
                }
                if (error instanceof QuotaError) {
                    const reset = new Date(Date.now() + error.retryAfterMs);
                    console.log(
                        `\nGoogle's limit for ${RECORDING.model} is used up for now. Recorded ${recorded} of ${missing.length}.` +
                            `\nRun this again after ${reset.toLocaleString()} to record the rest.`,
                    );
                    return;
                }
                if (attempt < 3) {
                    console.log(`  Retrying "${text}": ${(error as Error).message}`);
                    continue;
                }
                // Left for the browser's voice; the rest still gets recorded.
                console.log(`  Skipping "${text}": ${(error as Error).message}`);
                failed.push(text);
                break;
            }
        }
    }

    if (failed.length > 0) {
        console.log(
            `\nRecorded ${recorded} of ${missing.length}. Gemini gave no audio for: ${failed.map((text) => `"${text}"`).join(", ")}.` +
                `\nGive each a spoken form in SPOKEN_AS (lib/lessons/audio.ts), then run this again.`,
        );
        process.exitCode = 1;
        return;
    }

    // Everything is recorded, so anything else in the folder belongs to a text
    // no lesson reads any more.
    const unused = readdirSync(OUT_DIR).filter((file) => file.endsWith(".mp3") && !needed.has(file.slice(0, -4)));
    for (const file of unused) rmSync(path.join(OUT_DIR, file));
    const total = writeManifest(needed);
    console.log(
        `\nDone: ${total} recordings, ${recorded} new` +
            (unused.length ? `, ${unused.length} no longer used and deleted.` : "."),
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
