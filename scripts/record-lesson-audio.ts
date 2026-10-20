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
 * Every new recording is listened back to before it is kept: the tutor's text
 * model transcribes it, and one that does not say its text is deleted and
 * reported. The voice is a language model, and given a bare word it has made
 * up a sentence ("prompt") and acted one out ("cough" came back as a cough).
 *
 * Google limits the speech model per minute and per day, and the live speaking
 * tutor draws on the same limits, so run this outside a workshop. Requests are
 * spaced out to stay under a per-minute limit; when Google still says to wait,
 * the script waits. When the day's limit is used up it stops, keeps what it
 * has, and can be run again after the limit resets at midnight Pacific time.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { Mp3Encoder } from "@breezystack/lamejs";

import { audioId, lessonSpokenTexts, RECORDING, spokenForm } from "@/lib/lessons/audio";
import { listLessons, listWorkshopLessons } from "@/lib/lessons/data";
import { sampleRateOf } from "@/lib/speaking/audio";
import { GoogleError, QuotaError, READ_ALOUD, responseError, send } from "@/lib/speaking/google";

const OUT_DIR = path.join(process.cwd(), "public/lessons/audio");
const MANIFEST = path.join(process.cwd(), "lib/lessons/audio-manifest.json");
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
/** Listens back to the recordings: the tutor's own text model, with a quota of its own. */
const CHECK_MODEL = "gemini-3.8-flash";
/** Clips sent for checking in one request: a few kilobytes each. */
const CHECK_BATCH = 50;

/** Request starts are at least this far apart: under 10 a minute. */
const MIN_GAP_MS = 6_500;
/** A wait longer than this is a daily limit, not a per-minute one. */
const LONGEST_WAIT_MS = 2 * 60_000;
const TIMEOUT_MS = 60_000;
/** 48 kbps mono is clear for speech at about 6 KB a second. */
const KBPS = 48;

type GenerateResponse = {
    candidates?: {
        content?: { parts?: { text?: string; thought?: boolean; inlineData?: { mimeType?: string; data?: string } }[] };
    }[];
};

const clipPath = (id: string) => path.join(OUT_DIR, `${id}.mp3`);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function say(apiKey: string, text: string): Promise<{ pcm: Int16Array; rate: number }> {
    const response = await send(
        "Gemini",
        `${ENDPOINT}/${RECORDING.model}:generateContent`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
                // Set out as a script under the tutor's read-aloud instruction, as
                // readAloud() in lib/speaking/gemini.ts does (that file is server-only).
                contents: [{ role: "user", parts: [{ text: `${READ_ALOUD}\n\nTRANSCRIPT:\n${text}` }] }],
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

/**
 * Letters and digits only, so "take away" matches "Takeaway" and "MC" matches
 * "M.C.", but brackets are kept: a transcript of "[cough]" is a sound, not the word.
 */
const letters = (text: string) => text.toLowerCase().replace(/[^a-z0-9[\]]+/g, "");

/** The recordings among these that do not say their text, with what they say instead. */
async function check(apiKey: string, clips: [string, string][]) {
    const wrong: { id: string; text: string; heard: string }[] = [];
    for (let start = 0; start < clips.length; start += CHECK_BATCH) {
        const batch = clips.slice(start, start + CHECK_BATCH);
        const parts = [
            {
                text:
                    `You will hear ${batch.length} short audio clips, numbered in order. Transcribe exactly what is ` +
                    `spoken in each, word for word. Write a sound that is not speech in square brackets, like ` +
                    `[laughs]. Return a JSON array of ${batch.length} strings, one per clip, in order.`,
            },
            ...batch.flatMap(([id], index) => [
                { text: `Clip ${index + 1}:` },
                { inlineData: { mimeType: "audio/mp3", data: readFileSync(clipPath(id)).toString("base64") } },
            ]),
        ];
        const response = await send(
            "Gemini",
            `${ENDPOINT}/${CHECK_MODEL}:generateContent`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
                body: JSON.stringify({
                    contents: [{ role: "user", parts }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: { type: "ARRAY", items: { type: "STRING" } },
                    },
                }),
            },
            TIMEOUT_MS * 2,
        );
        if (!response.ok) throw await responseError("Gemini", response);
        const body = (await response.json()) as GenerateResponse;
        const answer = (body.candidates?.[0]?.content?.parts ?? [])
            .filter((part) => part.text && !part.thought)
            .map((part) => part.text)
            .join("");
        const heard = JSON.parse(answer) as string[];
        batch.forEach(([id, text], index) => {
            const said = heard[index] ?? "";
            if (letters(said) !== letters(text)) wrong.push({ id, text, heard: said });
        });
    }
    return wrong;
}

function writeManifest(needed: Map<string, string>) {
    const clips = [...needed.keys()].filter((id) => existsSync(clipPath(id))).sort();
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
    const missing = [...needed].filter(([id]) => !existsSync(clipPath(id)));
    console.log(`${needed.size} texts are read aloud; ${missing.length} still need recording.`);

    const recorded: [string, string][] = [];
    let lastStart = 0;
    const failed: string[] = [];
    let stopped: string | null = null;
    recording: for (const [id, text] of missing) {
        for (let attempt = 1; ; attempt++) {
            await sleep(Math.max(0, lastStart + MIN_GAP_MS - Date.now()));
            lastStart = Date.now();
            try {
                const { pcm, rate } = await say(apiKey, spokenForm(text));
                writeFileSync(clipPath(id), mp3(trim(pcm, rate), rate));
                recorded.push([id, text]);
                console.log(`  [${recorded.length}/${missing.length}] ${text}`);
                break;
            } catch (error) {
                if (error instanceof QuotaError && error.retryAfterMs <= LONGEST_WAIT_MS && attempt <= 5) {
                    console.log(`  Google asked to wait ${Math.ceil(error.retryAfterMs / 1000)}s; waiting.`);
                    await sleep(error.retryAfterMs + 1_000);
                    continue;
                }
                if (error instanceof QuotaError) {
                    const reset = new Date(Date.now() + error.retryAfterMs);
                    stopped =
                        `Google's limit for ${RECORDING.model} is used up for now.` +
                        ` Run this again after ${reset.toLocaleString()} to record the rest.`;
                    break recording;
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

    // Listen back before anything is kept.
    let wrong: Awaited<ReturnType<typeof check>> = [];
    try {
        wrong = await check(apiKey, recorded);
    } catch (error) {
        console.log(`\nCould not check the new recordings (${(error as Error).message}); they are kept unchecked.`);
        process.exitCode = 1;
    }
    for (const { id, text, heard } of wrong) {
        rmSync(clipPath(id));
        console.log(`  Deleted "${text}": it says "${heard}"`);
    }
    writeManifest(needed);
    const kept = recorded.length - wrong.length;

    if (stopped) {
        console.log(`\nKept ${kept} new recordings. ${stopped}`);
        return;
    }
    const problems = [...failed, ...wrong.map(({ text }) => text)];
    if (problems.length > 0) {
        console.log(
            `\nKept ${kept} new recordings. Not recorded: ${problems.map((text) => `"${text}"`).join(", ")}.` +
                `\nRun this again, or give a text a spoken form in SPOKEN_AS (lib/lessons/audio.ts) if it keeps failing.`,
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
        `\nDone: ${total} recordings, ${kept} new` +
            (unused.length ? `, ${unused.length} no longer used and deleted.` : "."),
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
