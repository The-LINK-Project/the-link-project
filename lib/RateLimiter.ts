import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiters = {
    chatbot: new RateLimiterMemory({
        points: 5, // Number of requests
        duration: 60 // Per minute
    }),
    // Lesson conversation turns are the most expensive calls in the app
    // (Gemini + TTS); 20/min is far above any honest speaking pace
    conversation: new RateLimiterMemory({
        points: 20,
        duration: 60
    })
};

export async function checkRateLimit(userId: string, type: keyof typeof rateLimiters = "chatbot"): Promise<{ success: boolean; error?: string }> {
    try {
        await rateLimiters[type].consume(userId);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: "Rate limit exceeded. Please wait a minute before trying again."
        };
    }
}