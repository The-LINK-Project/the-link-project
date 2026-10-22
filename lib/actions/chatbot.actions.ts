"use server";
import OpenAI from "openai";
import { checkRateLimit } from "../RateLimiter";
import { auth } from "@clerk/nextjs/server";
import { chatbotInstructions, promptPracticeInstructions } from "@/utils/conversation_config";

// Module-level lazy singleton so requests reuse one client and its
// keep-alive connection pool
let openaiClient: OpenAI | null = null;
const getOpenAIClient = () => (openaiClient ??= new OpenAI());

// Returned instead of thrown: Next.js redacts server-action error messages
// in production, so the client can only branch on a structured result
export type ChatbotResult =
    | { success: true; text: string }
    | {
          success: false;
          error: "auth" | "rate_limit" | "invalid" | "unknown";
      };

// history crosses the wire, so its size is caller-controlled and the type
// annotation is erased at runtime: bound it before it reaches the paid model.
//
// The caller can still label a turn as the assistant's, which means a
// determined user can steer this chatbot off-topic. That is accepted: it is a
// one-to-one tutor bot, so the blast radius is their own conversation, and the
// thing worth defending — the API bill — is covered by these caps, the token
// ceiling, and the rate limits.
const MAX_HISTORY_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 2000;
const MAX_RESPONSE_TOKENS = 800;

/**
 * Which LINK Assistant is talking.
 *
 * - tutor: the floating English tutor on every page.
 * - practice: prompting practice after the AI lesson, for fluent adults trying
 *   out a chatbot. It answers any safe everyday request and coaches vague
 *   prompts, where the tutor only helps with English.
 */
export type ChatbotMode = "tutor" | "practice";

const MODES: Record<ChatbotMode, { instructions: string; maxTokens: number }> = {
    tutor: { instructions: chatbotInstructions, maxTokens: MAX_RESPONSE_TOKENS },
    // Short replies: a team reads them together on one screen, and the
    // prompt asks for under ~120 words anyway.
    practice: { instructions: promptPracticeInstructions, maxTokens: 500 },
};

export async function getChatbotResponse(
    history: ChatMessageType[],
    mode: ChatbotMode = "tutor",
): Promise<ChatbotResult> {
    try {
        // Get the current user's Clerk ID for rate limiting
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "auth" };
        }

        if (!Array.isArray(history)) {
            return { success: false, error: "invalid" };
        }

        // Also caller-controlled, so anything but "practice" is the tutor
        const practice = mode === "practice";
        const settings = practice ? MODES.practice : MODES.tutor;

        // Check rate limit before processing the request
        const rateLimitResult = await checkRateLimit(userId, practice ? "practice" : "chatbot");

        if (!rateLimitResult.success) {
            return { success: false, error: "rate_limit" };
        }

        // Error notes (signing in, the rate limit) were shown to the learner,
        // never said by the model, so they are not passed off as its replies
        const safeHistory = history
            .filter((message) => typeof message?.text === "string" && !message.isError)
            .slice(-MAX_HISTORY_MESSAGES);

        if (safeHistory.length === 0) {
            return { success: false, error: "invalid" };
        }

        const client = getOpenAIClient();

        // The instruction prompt lives server-side so it is neither shipped in
        // the client bundle nor round-tripped with every message
        const openAIMessages = [
            { role: "system" as const, content: settings.instructions },
            ...safeHistory.map((message) => ({
                role:
                    message.role === "model"
                        ? ("assistant" as const)
                        : ("user" as const),
                content: message.text.slice(0, MAX_MESSAGE_CHARS),
            })),
        ];

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: openAIMessages,
            max_tokens: settings.maxTokens,
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
