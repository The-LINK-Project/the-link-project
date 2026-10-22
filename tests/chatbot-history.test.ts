import { describe, expect, it, vi } from "vitest";

// What LINK Assistant is shown of a conversation (lib/actions/chatbot.actions.ts).
// Notes the learner was shown when a request failed (sign in, too many
// prompts) were never said by the model, so they must not reach it dressed
// up as its own replies.

const sent = vi.hoisted(() => ({ messages: [] as { role: string; content: string }[] }));

vi.mock("@clerk/nextjs/server", () => ({ auth: async () => ({ userId: "user_A" }) }));
vi.mock("openai", () => ({
    default: class {
        chat = {
            completions: {
                create: async ({ messages }: { messages: { role: string; content: string }[] }) => {
                    sent.messages = messages;
                    return { choices: [{ message: { content: "A reply" } }] };
                },
            },
        };
    },
}));

const { getChatbotResponse } = await import("@/lib/actions/chatbot.actions");

describe("the conversation sent to LINK Assistant", () => {
    it("leaves out the error notes shown to the learner", async () => {
        const result = await getChatbotResponse(
            [
                { role: "user", text: "First prompt" },
                { role: "model", text: "Please sign in to use the chatbot.", isError: true },
                { role: "user", text: "Second prompt" },
                { role: "model", text: "A real reply" },
                { role: "user", text: "Third prompt" },
            ],
            "practice",
        );
        expect(result).toEqual({ success: true, text: "A reply" });
        const turns = sent.messages.filter((message) => message.role !== "system");
        expect(turns).toEqual([
            { role: "user", content: "First prompt" },
            { role: "user", content: "Second prompt" },
            { role: "assistant", content: "A real reply" },
            { role: "user", content: "Third prompt" },
        ]);
    });
});
