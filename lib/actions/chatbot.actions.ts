"use server";
import OpenAI from "openai";
import { checkRateLimit } from "../RateLimiter";
import { auth } from "@clerk/nextjs/server";
import { chatbotInstructions } from "@/utils/conversation_config";

// Module-level lazy singleton so requests reuse one client and its
// keep-alive connection pool
let openaiClient: OpenAI | null = null;
const getOpenAIClient = () => (openaiClient ??= new OpenAI());

export async function getChatbotResponse(history: ChatMessageType[]) {
    // Get the current user's Clerk ID for rate limiting
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Authentication required");
    }

    // Check rate limit before processing the request
    const rateLimitResult = await checkRateLimit(userId, "chatbot");

    if (!rateLimitResult.success) {
        throw new Error(rateLimitResult.error || "Rate limit exceeded");
    }

    const client = getOpenAIClient();

    // The instruction prompt lives server-side so it is neither shipped in
    // the client bundle nor round-tripped with every message
    const openAIMessages = [
        { role: "system" as const, content: chatbotInstructions },
        ...history.map((message) => ({
            role:
                message.role === "model"
                    ? ("assistant" as const)
                    : ("user" as const),
            content: message.text,
        })),
    ];

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages,
    });

    return response.choices[0].message.content;
}
