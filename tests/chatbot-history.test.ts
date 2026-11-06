import { describe, expect, it, vi } from "vitest";

// What LINK Assistant is shown of a conversation (lib/actions/chatbot.actions.ts).
// Notes the learner was shown when a request failed (sign in, too many
// prompts) were never said by the model, so they must not reach it dressed
// up as its own replies.

type Turn = { role: string; parts: { text: string }[] };
const sent = vi.hoisted(() => ({ contents: [] as Turn[] }));

vi.mock("@clerk/nextjs/server", () => ({ auth: async () => ({ userId: "user_A" }) }));
vi.mock("@google/genai", () => ({
    GoogleGenAI: class {
        models = {
            generateContent: async ({ contents }: { contents: Turn[] }) => {
                sent.contents = contents;
                return { text: "A reply" };
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
        expect(sent.contents).toEqual([
            { role: "user", parts: [{ text: "First prompt" }] },
            { role: "user", parts: [{ text: "Second prompt" }] },
            { role: "model", parts: [{ text: "A real reply" }] },
            { role: "user", parts: [{ text: "Third prompt" }] },
        ]);
    });
});
