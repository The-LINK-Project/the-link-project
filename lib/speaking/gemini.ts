import "server-only";

import { joinSpeech, sampleRateOf } from "./audio";
import {
    GoogleError,
    QuotaError,
    QuotaTracker,
    READ_ALOUD,
    responseError,
    send,
    VOICE,
    type Spoken,
} from "./google";
import type { TutorLanguage, TutorModel } from "./tutor";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

type Part = { text?: string; thought?: boolean; inlineData?: { mimeType?: string; data?: string } };
type GenerateResponse = {
    candidates?: { content?: { parts?: Part[] }; finishReason?: string }[];
    promptFeedback?: { blockReason?: string };
};

const DRAFT_SCHEMA = {
    type: "object",
    // The verdict comes first, so the reply is written knowing it.
    properties: {
        attempted: {
            type: "boolean",
            description: "False when the learner asked a question or talked about something else.",
        },
        goalMet: { type: "boolean" },
        reply: { type: "string", description: "What the teacher says next." },
    },
    required: ["attempted", "goalMet", "reply"],
};

const REWRITE_SCHEMA = {
    type: "object",
    properties: { reply: { type: "string" } },
    required: ["reply"],
};

async function generate(
    apiKey: string,
    model: string,
    body: unknown,
    timeoutMs: number,
): Promise<GenerateResponse> {
    const response = await send(
        "Gemini",
        `${ENDPOINT}/${model}:generateContent`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify(body),
        },
        timeoutMs,
    );
    if (!response.ok) throw await responseError("Gemini", response);
    try {
        return (await response.json()) as GenerateResponse;
    } catch {
        throw new GoogleError("Gemini returned an unreadable response");
    }
}

function parts(response: GenerateResponse): Part[] {
    return response.candidates?.[0]?.content?.parts ?? [];
}

/** The model's answer, without its thinking. */
function textOf(response: GenerateResponse): string {
    return parts(response)
        .filter((part) => typeof part.text === "string" && !part.thought)
        .map((part) => part.text)
        .join("");
}

function jsonOutput(response: GenerateResponse): Record<string, unknown> {
    const text = textOf(response);
    if (!text) {
        const reason =
            response.promptFeedback?.blockReason ?? response.candidates?.[0]?.finishReason;
        throw new GoogleError(`Gemini returned no text (${reason ?? "empty"})`);
    }
    try {
        const value: unknown = JSON.parse(text);
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            return value as Record<string, unknown>;
        }
    } catch {
        // Reported below.
    }
    throw new GoogleError("Gemini returned malformed JSON");
}

// Every second of thinking is a second the learner waits, and neither writing
// down a short clip, judging one sentence, nor glossing one word needs much of it.
const thinkingConfig = { thinkingLevel: "LOW" };

const jsonConfig = (schema: object) => ({
    responseMimeType: "application/json",
    responseJsonSchema: schema,
    thinkingConfig,
});

/**
 * A request to the first of these models with quota left. Only a quota error
 * moves on: any other failure would most likely repeat on the next model, and
 * the learner is already waiting.
 */
function modelChain(apiKey: string, models: string[], quota: QuotaTracker) {
    return async function generateText(body: unknown, timeoutMs: number) {
        const deadline = Date.now() + timeoutMs;
        let failure = new GoogleError("Every model is out of quota");
        for (const model of models) {
            if (!quota.hasQuota(model)) continue;
            try {
                return await generate(apiKey, model, body, deadline - Date.now());
            } catch (error) {
                if (!(error instanceof QuotaError)) throw error;
                quota.outOfQuota(model, error);
                console.warn("Gemini model out of quota, using the next one", { model });
                failure = error;
            }
        }
        throw failure;
    };
}

/**
 * How long a voice may go without answering before the next voice is started
 * alongside it. A normal reply takes 5 to 12 seconds; a stalled one took over 30.
 */
const HEDGE_AFTER_MS = 12_000;

/** One way to turn text into speech. Each has a quota of its own. */
type Voice = {
    name: string;
    say(text: string, language: TutorLanguage, timeoutMs: number): Promise<Spoken>;
};

export type TutorOptions = {
    apiKey: string;
    /**
     * Tried in order. Google limits each model separately, even on a billed
     * project, so when one is out of quota the next one answers.
     */
    tutorModels: string[];
    speechModels: string[];
    now?: () => number;
    hedgeAfterMs?: number;
};

export function createGeminiTutor(options: TutorOptions): TutorModel {
    const now = options.now ?? Date.now;
    const quota = new QuotaTracker(now);
    const generateText = modelChain(options.apiKey, options.tutorModels, quota);

    const voices: Voice[] = [];
    for (const model of options.speechModels) {
        voices.push({
            name: `gemini:${model}`,
            say: (text, _language, timeoutMs) => speakChunk(options.apiKey, model, text, timeoutMs),
        });
    }

    return {
        async transcribe({ system, prompt, audio }, timeoutMs) {
            const response = await generateText(
                {
                    systemInstruction: { parts: [{ text: system }] },
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { inlineData: { mimeType: audio.mimeType, data: audio.data } },
                                { text: prompt },
                            ],
                        },
                    ],
                    // Plain text, not JSON: told to fill in a field, the model
                    // invented sentences for noise it reports as empty in text.
                    generationConfig: { thinkingConfig },
                },
                timeoutMs,
            );
            // No text at all is read the same way as "no speech".
            return textOf(response);
        },

        async draft({ system, prompt }, timeoutMs) {
            const json = jsonOutput(
                await generateText(
                    {
                        systemInstruction: { parts: [{ text: system }] },
                        contents: [{ role: "user", parts: [{ text: prompt }] }],
                        generationConfig: jsonConfig(DRAFT_SCHEMA),
                    },
                    timeoutMs,
                ),
            );
            const { attempted, goalMet, reply } = json;
            if (
                typeof attempted !== "boolean" ||
                typeof goalMet !== "boolean" ||
                typeof reply !== "string"
            ) {
                throw new GoogleError("Gemini returned an unexpected shape");
            }
            return { attempted, goalMet, reply };
        },

        async rewrite({ system, prompt }, timeoutMs) {
            const json = jsonOutput(
                await generateText(
                    {
                        systemInstruction: { parts: [{ text: system }] },
                        contents: [{ role: "user", parts: [{ text: prompt }] }],
                        generationConfig: jsonConfig(REWRITE_SCHEMA),
                    },
                    timeoutMs,
                ),
            );
            if (typeof json.reply !== "string") {
                throw new GoogleError("Gemini returned an unexpected shape");
            }
            return json.reply;
        },

        async speak({ text, language }, timeoutMs) {
            const chunks = speechChunks(text);
            if (chunks.length === 0) return null;
            const deadline = Date.now() + timeoutMs;
            const hedgeAfterMs = options.hedgeAfterMs ?? HEDGE_AFTER_MS;

            // One voice for the whole reply, so it never changes mid-sentence.
            async function voiced(voice: Voice): Promise<Buffer> {
                try {
                    const pieces = await Promise.all(
                        chunks.map((chunk) => voice.say(chunk, language, deadline - Date.now())),
                    );
                    return joinSpeech(pieces);
                } catch (error) {
                    if (error instanceof QuotaError) quota.outOfQuota(voice.name, error);
                    console.warn("Tutor voice failed", {
                        voice: voice.name,
                        message: (error as Error).message,
                    });
                    throw error;
                }
            }

            // Unlike text, speech moves on after any failure: the reply is already
            // written, and a voice that is misconfigured, answers with text instead
            // of audio, or stalls is worth skipping. A stalled voice is left running
            // in case it still finishes first.
            const candidates = voices.filter((voice) => quota.hasQuota(voice.name));
            return new Promise<Buffer>((resolve, reject) => {
                let next = 0;
                let running = 0;
                let settled = false;
                let failure: unknown = new GoogleError("Every voice is out of quota");
                const hedges: ReturnType<typeof setTimeout>[] = [];
                const settle = () => {
                    settled = true;
                    hedges.forEach(clearTimeout);
                };

                const startNext = () => {
                    if (settled) return;
                    while (next < candidates.length && !quota.hasQuota(candidates[next].name)) {
                        next++;
                    }
                    if (next === candidates.length || deadline - Date.now() < 1_000) {
                        if (running === 0) {
                            settle();
                            reject(failure);
                        }
                        return;
                    }
                    const voice = candidates[next++];
                    running++;
                    hedges.push(setTimeout(startNext, hedgeAfterMs));
                    voiced(voice).then(
                        (wav) => {
                            settle();
                            resolve(wav);
                        },
                        (error: unknown) => {
                            running--;
                            failure = error;
                            // A voice started alongside it is still trying.
                            if (running === 0) startNext();
                        },
                    );
                };
                startNext();
            });
        },
    };
}

const SENTENCE_END = /(?<=[।.?!])\s+/;
/** A shorter sentence joins the next one, so a greeting is not a request of its own. */
const MIN_CHUNK_LENGTH = 60;
/** Every piece is a request against a quota, so a long reply is merged down to this many. */
const MAX_CHUNKS = 3;

/**
 * A reply split into whole sentences for speech.
 *
 * The voice model takes roughly as long as the audio it makes: a 24-second
 * opening took 18 seconds as one request and 8 seconds as six sentences at
 * once. Splitting only between sentences keeps the joins where a pause belongs.
 */
export function speechChunks(text: string): string[] {
    const chunks: string[] = [];
    for (const sentence of text.split(SENTENCE_END)) {
        const trimmed = sentence.trim();
        if (!trimmed) continue;
        const last = chunks.length - 1;
        if (last >= 0 && chunks[last].length < MIN_CHUNK_LENGTH) chunks[last] += ` ${trimmed}`;
        else chunks.push(trimmed);
    }
    while (chunks.length > MAX_CHUNKS) {
        // Join the neighbours that make the shortest piece, so the pieces stay even.
        let join = 0;
        for (let i = 1; i < chunks.length - 1; i++) {
            if (
                chunks[i].length + chunks[i + 1].length <
                chunks[join].length + chunks[join + 1].length
            ) {
                join = i;
            }
        }
        chunks.splice(join, 2, `${chunks[join]} ${chunks[join + 1]}`);
    }
    return chunks;
}

/** A piece of the tutor's reply, set out for the voice to read rather than answer. */
export function readAloud(text: string): string {
    return `${READ_ALOUD}\n\nTRANSCRIPT:\n${text}`;
}

async function speakChunk(
    apiKey: string,
    model: string,
    text: string,
    timeoutMs: number,
): Promise<Spoken> {
    // The Gemini API has no field for an instruction apart from the text, so the
    // reply is set out below one as a transcript. Sent bare, the voice acted on
    // the reply instead of reading it. The instruction itself is never spoken.
    const response = await generate(
        apiKey,
        model,
        {
            contents: [{ role: "user", parts: [{ text: readAloud(text) }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
            },
        },
        timeoutMs,
    );
    const inline = parts(response).find((part) => part.inlineData?.data)?.inlineData;
    const pcm = Buffer.from(inline?.data ?? "", "base64");
    if (pcm.length === 0) throw new GoogleError("Gemini returned no audio");
    return { pcm, rate: sampleRateOf(inline?.mimeType) };
}
