import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/RateLimiter";
import { createGeminiTutor } from "@/lib/speaking/gemini";
import { parseTurnRequest, runTurn, type TutorModel } from "@/lib/speaking/tutor";

/**
 * One turn of speaking practice with the AI tutor.
 *
 * The same contract as the mobile API's `POST /v1/tutor/turn`: the browser
 * sends the lesson context and, after the opening, one recording; this answers
 * with what was heard, the tutor's reply, what the turn meant, and the reply as
 * speech. Nothing is stored. The recording travels inside the request, is
 * forwarded to the model, and is gone once the response is sent.
 */

// Transcribing, replying, checking the reply and speaking it happen in one
// request, which can take well over the default function limit.
export const maxDuration = 120;

const list = (value: string | undefined, fallback: string[]) => {
    const items = (value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    return items.length > 0 ? items : fallback;
};

// Built once per instance, so what the tutor learns about quotas is kept.
let tutor: TutorModel | null = null;
function getTutor(): TutorModel | null {
    // The mobile API's key, which carries the tutor's languages and billing.
    // Not GEMINI_KEY: that one is for the older conversation lessons only.
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) return null;
    tutor ??= createGeminiTutor({
        apiKey,
        // Ordered lists. Google limits each model separately, so when one is out
        // of quota the next answers instead of the tutor stopping.
        tutorModels: list(process.env.GEMINI_TUTOR_MODEL, ["gemini-3.8-flash", "gemini-3.7-flash"]),
        speechModels: list(process.env.GEMINI_SPEECH_MODEL, [
            "gemini-3.8-flash-lite-tts",
            "gemini-3.8-flash-tts",
            "gemini-3.1-flash-tts-preview",
            "gemini-2.5-flash-preview-tts",
            "gemini-2.5-pro-preview-tts",
        ]),
    });
    return tutor;
}

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    // The limiter throws when its storage is down: the same "not available"
    // as a tutor failure, not a bare 500
    const limit = await checkRateLimit(userId, "tutor").catch((error) => {
        console.error("Tutor rate limit check failed", {
            message: error instanceof Error ? error.message : String(error),
        });
        return null;
    });
    if (!limit) return NextResponse.json({ error: "The tutor is not available right now" }, { status: 503 });
    if (!limit.success) {
        return NextResponse.json({ error: limit.error }, { status: 429, headers: { "Retry-After": "60" } });
    }

    const body: unknown = await request.json().catch(() => null);
    const parsed = parseTurnRequest(body);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const model = getTutor();
    if (!model) return NextResponse.json({ error: "The tutor is not available right now" }, { status: 503 });

    try {
        return NextResponse.json(await runTurn(parsed.value, model));
    } catch (error) {
        console.error("Tutor turn failed", { message: error instanceof Error ? error.message : String(error) });
        return NextResponse.json({ error: "The tutor is not available right now" }, { status: 503 });
    }
}
