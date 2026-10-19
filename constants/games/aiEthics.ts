// Ethics of AI — the workshop game. Static repo content, like Word Match, so
// it has no database or network dependency on the day.
//
// Written for migrant workers with basic English: short sentences, everyday
// situations from life in Singapore, and nothing that touches work contracts,
// employers, money lending or immigration. Every "problem" card is paired with
// what to do about it, so the game never leaves a worry without an answer.
//
// The two sentence stems the whole game teaches:
//     "AI is good because it ..."  /  "AI is a problem because it ..."

export type EthicsVerdict = "good" | "problem";

/** Round 1: one situation, sorted into Good or Problem. */
export type EthicsSortCard = {
    id: string;
    /** The situation, read aloud by the team. */
    situation: string;
    answer: EthicsVerdict;
    /** The full stem sentence, shown after the tap whether right or wrong. */
    reason: string;
    /** A one-line tip, only on problem cards: what a person can do. */
    tip?: string;
};

/** Round 2: a situation matched with its reason. */
export type EthicsMatchPair = {
    id: string;
    situation: string;
    verdict: EthicsVerdict;
    /** No emoji hint here: the team has to read both halves. */
    reason: string;
};

export type EthicsWord = { word: string; meaning: string };

/** Taught on the start screen and used on the cards. */
export const ETHICS_WORDS: EthicsWord[] = [
    { word: "AI", meaning: "a computer program that learns from data" },
    { word: "privacy", meaning: "keeping my information to myself" },
    { word: "accurate", meaning: "correct, with no mistakes" },
    { word: "bias", meaning: "treating some people better than others" },
    { word: "deepfake", meaning: "a fake video or voice made by AI" },
    { word: "permission", meaning: "saying yes before something happens" },
];

export const ETHICS_SORT_CARDS: EthicsSortCard[] = [
    {
        id: "translate",
        situation: "A translate app helps me explain my symptoms to the doctor.",
        answer: "good",
        reason: "AI is good because it helps me communicate clearly.",
    },
    {
        id: "map",
        situation: "A map app finds the fastest route to the MRT when it is raining.",
        answer: "good",
        reason: "AI is good because it saves time and effort.",
    },
    {
        id: "voice",
        situation: "A voice assistant reads my messages aloud while I am cooking.",
        answer: "good",
        reason: "AI is good because it is convenient and hands-free.",
    },
    {
        id: "bus",
        situation: "A chatbot sounds very confident, but gives me the wrong bus timing.",
        answer: "problem",
        reason: "AI is a problem because it can make mistakes while sounding sure.",
        tip: "Always check important information with a second source.",
    },
    {
        id: "scam-call",
        situation: "A video call looks and sounds like my family, but it is a scam for money.",
        answer: "problem",
        reason: "AI is a problem because it can copy faces and voices to trick people.",
        tip: "Hang up. Call your family back on their real number.",
    },
    {
        id: "photos",
        situation: "A photo app uploads my pictures online without asking my permission.",
        answer: "problem",
        reason: "AI is a problem because it does not respect my privacy.",
        tip: "Check the app permissions and switch off sharing.",
    },
];

export const ETHICS_MATCH_PAIRS: EthicsMatchPair[] = [
    {
        id: "read-aloud",
        situation: "An app reads street signs aloud for people who cannot see well.",
        verdict: "good",
        reason: "It makes everyday life more accessible.",
    },
    {
        id: "practise",
        situation: "A chatbot lets me practise English at midnight after work.",
        verdict: "good",
        reason: "It is available at any time.",
    },
    {
        id: "weather",
        situation: "A weather app warns me an hour before a heavy storm.",
        verdict: "good",
        reason: "It helps me plan ahead.",
    },
    {
        id: "accent",
        situation: "Voice AI understands some accents much better than others.",
        verdict: "problem",
        reason: "It is biased and not fair to everyone.",
    },
    {
        id: "fake-photo",
        situation: "A viral photo of a flood turns out to be made by AI.",
        verdict: "problem",
        reason: "Do not believe everything you see online.",
    },
    {
        id: "my-words",
        situation: "AI writes my whole message in words I would never use.",
        verdict: "problem",
        reason: "It is not my own voice.",
    },
];

export const VERDICT_EMOJI: Record<EthicsVerdict, string> = { good: "👍", problem: "⚠️" };

/** Same scoring as Word Match: start at 100, lose 10 for each wrong tap. */
export const POINTS_PER_WRONG = 10;

export function ethicsScore(wrongAttempts: number): number {
    return Math.max(0, 100 - wrongAttempts * POINTS_PER_WRONG);
}
