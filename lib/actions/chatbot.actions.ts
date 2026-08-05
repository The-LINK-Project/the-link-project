"use server";
import OpenAI from "openai";
import { checkRateLimit } from "../RateLimiter";
import { auth } from "@clerk/nextjs/server";
import { chatbotInstructions } from "@/utils/conversation_config";

// Module-level lazy singleton so requests reuse one client and its
// keep-alive connection pool
let openaiClient: OpenAI | null = null;
const getOpenAIClient = () => (openaiClient ??= new OpenAI());

// Returned instead of thrown: Next.js redacts server-action error messages
// in production, so the client can only branch on a structured result
export type ChatbotResult =
    | { success: true; text: string }
    | { success: false; error: "auth" | "rate_limit" | "unknown" };

export async function getChatbotResponse(
    history: ChatMessageType[],
): Promise<ChatbotResult> {
    try {
        // Get the current user's Clerk ID for rate limiting
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "auth" };
        }

        // Check rate limit before processing the request
        const rateLimitResult = await checkRateLimit(userId, "chatbot");

        if (!rateLimitResult.success) {
            return { success: false, error: "rate_limit" };
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

        return {
            success: true,
            text: response.choices[0].message.content ?? "",
        };
    } catch (error) {
        console.error("Error generating chatbot response:", error);
        return { success: false, error: "unknown" };
    }
}
