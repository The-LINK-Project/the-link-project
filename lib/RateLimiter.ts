import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiters = {
    chatbot: new RateLimiterMemory({
        points: 5, // Number of requests
        duration: 60 // Per minute
    })
};

export async function checkRateLimit(userId: string, type: keyof typeof rateLimiters = "chatbot"): Promise<{ success: boolean; error?: string }> {
    try {
        await rateLimiters[type].consume(userId);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: type === "chatbot" ? "Rate limit exceeded. Please wait a minute before trying again." : undefined
        };
    }
}