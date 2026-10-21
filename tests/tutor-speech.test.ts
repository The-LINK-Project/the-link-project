import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { pcmToWav } from "@/lib/speaking/audio";
import { createGeminiTutor } from "@/lib/speaking/gemini";

const samples = Buffer.from([1, 0, 2, 0, 3, 0, 4, 0]);

/** A Gemini speech response carrying this audio. */
function answer(data: Buffer, mimeType: string) {
    return new Response(
        JSON.stringify({
            candidates: [{ content: { parts: [{ inlineData: { mimeType, data: data.toString("base64") } }] } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
    );
}

function tutorWith(...responses: (() => Response)[]) {
    const calls: string[] = [];
    vi.stubGlobal("fetch", async (url: string) => {
        calls.push(url);
        const next = responses.shift();
        if (!next) throw new Error("Unexpected request");
        return next();
    });
    const tutor = createGeminiTutor({
        apiKey: "test-key",
        tutorModels: ["text-model"],
        speechModels: ["new-voice", "old-voice"],
    });
    return { tutor, calls };
}

afterEach(() => {
    vi.stubGlobal("fetch", () => {
        throw new Error("Tests may not make network requests");
    });
});

describe("tutor speech", () => {
    it("reads the WAV file the 3.8 voices return", async () => {
        const { tutor } = tutorWith(() => answer(pcmToWav(samples, 24_000), "audio/wav"));
        const wav = await tutor.speak({ text: "Hello.", language: "hi" }, 10_000);
        // Rewrapped once, not a header inside a header
        expect(wav).toEqual(pcmToWav(samples, 24_000));
    });

    it("still wraps the bare PCM older voices return", async () => {
        const { tutor } = tutorWith(() => answer(samples, "audio/L16;codec=pcm;rate=24000"));
        const wav = await tutor.speak({ text: "Hello.", language: "hi" }, 10_000);
        expect(wav).toEqual(pcmToWav(samples, 24_000));
    });

    it("sends the 3.8 voices the reply bare and the older ones under the read-aloud instruction", async () => {
        const sent: Record<string, string> = {};
        const respond = async (url: string, init: RequestInit) => {
            const model = url.split("/").pop()!.split(":")[0];
            sent[model] = JSON.parse(String(init.body)).contents[0].parts[0].text;
            if (model.startsWith("gemini-3.8")) {
                return new Response(JSON.stringify({ error: { message: "quota" } }), { status: 429 });
            }
            return answer(samples, "audio/L16;codec=pcm;rate=24000");
        };
        vi.stubGlobal("fetch", respond);
        const tutor = createGeminiTutor({
            apiKey: "test-key",
            tutorModels: ["text-model"],
            speechModels: ["gemini-3.8-flash-lite-tts", "gemini-3.1-flash-tts-preview"],
        });
        await tutor.speak({ text: "Hello.", language: "hi" }, 10_000);
        // One 3.8 voice read the instruction out loud before the reply
        expect(sent["gemini-3.8-flash-lite-tts"]).toBe("Hello.");
        expect(sent["gemini-3.1-flash-tts-preview"]).toMatch(/^Read the text aloud[\s\S]*TRANSCRIPT:\nHello\.$/);
    });

    it("moves to the next voice when the first is out of quota", async () => {
        const { tutor, calls } = tutorWith(
            () => new Response(JSON.stringify({ error: { message: "quota" } }), { status: 429 }),
            () => answer(samples, "audio/L16;codec=pcm;rate=24000"),
        );
        const wav = await tutor.speak({ text: "Hello.", language: "hi" }, 10_000);
        expect(wav).toEqual(pcmToWav(samples, 24_000));
        expect(calls.map((url) => url.split("/").pop())).toEqual([
            "new-voice:generateContent",
            "old-voice:generateContent",
        ]);
    });
});
