import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import OpenAI from "openai";
import { connectToDatabase } from "@/lib/database";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import User from "@/lib/database/models/user.model";
import { consumeTtsRateLimit } from "@/lib/ttsRateLimiter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TTS_INPUT_CHARS = 4096;

let openaiClient: OpenAI | null = null;
const getOpenAIClient = () => (openaiClient ??= new OpenAI());

export async function GET(request: Request) {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const progressId = searchParams.get("progressId");
    const messageIndexParam = searchParams.get("messageIndex");

    if (!progressId || !mongoose.isValidObjectId(progressId)) {
        return new Response("Invalid progressId", { status: 400 });
    }

    if (!messageIndexParam || !/^\d+$/.test(messageIndexParam)) {
        return new Response("Invalid messageIndex", { status: 400 });
    }

    const messageIndex = Number(messageIndexParam);
    if (!Number.isSafeInteger(messageIndex)) {
        return new Response("Invalid messageIndex", { status: 400 });
    }

    let requestedMessage: Message | undefined;

    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: clerkUserId })
            .select("_id")
            .lean<{ _id: unknown }>();

        if (!user) {
            return new Response("Unknown user", { status: 403 });
        }

        // Read exactly the tutor message returned by the preceding Server
        // Action. The progress ID and owner check prevent another user's text
        // from being synthesized, while the exact index avoids cross-tab races.
        const progress = await LessonProgress.findOne({
            _id: progressId,
            userId: user._id,
        })
            .select({ convoHistory: { $slice: [messageIndex, 1] } })
            .lean<{ convoHistory?: Message[] }>();

        requestedMessage = progress?.convoHistory?.[0];
    } catch (error) {
        console.error("Unable to prepare TTS request:", error);
        return new Response("Speech service unavailable", { status: 503 });
    }

    if (
        !requestedMessage ||
        requestedMessage.role !== "System" ||
        !requestedMessage.message.trim()
    ) {
        return new Response("No tutor reply to speak", { status: 404 });
    }

    try {
        const rateLimit = await consumeTtsRateLimit(clerkUserId);
        if (!rateLimit.allowed) {
            return new Response("Too many requests", {
                status: 429,
                headers: {
                    "Retry-After": rateLimit.retryAfterSeconds.toString(),
                    "Cache-Control": "private, no-store, max-age=0",
                },
            });
        }
    } catch (error) {
        console.error("Unable to check TTS rate limit:", error);
        return new Response("Speech service unavailable", { status: 503 });
    }

    try {
        const speech = await getOpenAIClient().audio.speech.create(
            {
                model: "gpt-4o-mini-tts",
                voice: "shimmer",
                input: requestedMessage.message.slice(0, MAX_TTS_INPUT_CHARS),
                instructions:
                    "Speak in an enthusiastic but calm and positive tone.",
                response_format: "mp3",
            },
            { signal: request.signal },
        );

        if (!speech.body) {
            return new Response("Speech synthesis failed", { status: 502 });
        }

        // Forward OpenAI's response body directly so playback can start before
        // synthesis finishes. MP3 is also substantially smaller than the WAV
        // that was previously base64-encoded inside the Server Action result.
        return new Response(speech.body, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Cache-Control": "private, no-store, max-age=0",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        if (request.signal.aborted) {
            return new Response(null, { status: 499 });
        }

        console.error("TTS synthesis failed:", error);
        return new Response("Speech synthesis failed", { status: 502 });
    }
}
