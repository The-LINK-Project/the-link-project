import type { TranslationLanguage } from "@/lib/lessons/languages";

/** One turn of speaking practice. Mirrors `TurnRequest` in `lib/speaking/tutor.ts`. */
export type TutorTurnRequest = {
    language: TranslationLanguage;
    scene: string;
    words: string[];
    phrases: string[];
    names: string[];
    goals: { id: string; target: string; keywords: string[]; ask: string }[];
    goalIndex: number;
    attempt: number;
    /** Turns on the current goal that were questions rather than attempts. */
    asides: number;
    history: { role: "tutor" | "learner"; text: string }[];
    audio?: { mimeType: "audio/wav"; data: string };
};

export type TutorTurnResponse = {
    heard: string;
    reply: string;
    /** `aside`: the learner asked something instead of trying, which costs no try. */
    outcome: "opening" | "aside" | "retry" | "met" | "moveOn";
    finished: boolean;
    audio: { mimeType: "audio/wav"; data: string } | null;
};
