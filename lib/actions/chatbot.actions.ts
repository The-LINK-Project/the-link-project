"use server";
import OpenAI from "openai";
import { checkRateLimit } from "../RateLimiter";
import { auth } from "@clerk/nextjs/server";

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

    const client = new OpenAI();

    // converting role of model to assistant for openai
    const openAIMessages = history.map((message) => ({
        role: message.role === "model" ? "assistant" : message.role,
        content: message.text,
    }));

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages,
    });

    console.log(`history: ${history}`);
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
}
