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
    /** Shown with a 👍 or ⚠️ in front, so the emoji narrows the choice. */
    reason: string;
};

export type EthicsWord = { word: string; meaning: string };

/** Taught on the start screen and used on the cards. */
export const ETHICS_WORDS: EthicsWord[] = [
    { word: "AI", meaning: "a computer program that learns" },
    { word: "private", meaning: "only for me" },
    { word: "mistake", meaning: "something wrong" },
    { word: "scam", meaning: "a trick to take your money" },
    { word: "fake", meaning: "not real" },
    { word: "fair", meaning: "the same for everyone" },
];

export const ETHICS_SORT_CARDS: EthicsSortCard[] = [
    {
        id: "translate",
        situation: "A translate app helps me talk to the doctor.",
        answer: "good",
        reason: "AI is good because it helps me say what I need.",
    },
    {
        id: "map",
        situation: "A map app shows me the way to the MRT.",
        answer: "good",
        reason: "AI is good because it saves time.",
    },
    {
        id: "face",
        situation: "My phone opens when it sees my face.",
        answer: "good",
        reason: "AI is good because it is fast and easy.",
    },
    {
        id: "bus",
        situation: "A chatbot tells me the wrong bus time.",
        answer: "problem",
        reason: "AI is a problem because it can make mistakes.",
        tip: "Check again on the bus app or the sign.",
    },
    {
        id: "scam-call",
        situation: "A video call looks like my family, but it is a scam.",
        answer: "problem",
        reason: "AI is a problem because it can trick people.",
        tip: "Hang up. Call your family back on the real number.",
    },
    {
        id: "photos",
        situation: "An app shares my photos without asking me.",
        answer: "problem",
        reason: "AI is a problem because it is not private.",
        tip: "Check the app settings. Say no to sharing.",
    },
];

export const ETHICS_MATCH_PAIRS: EthicsMatchPair[] = [
    {
        id: "read-aloud",
        situation: "AI reads the words out loud for me.",
        verdict: "good",
        reason: "It helps people who cannot see well.",
    },
    {
        id: "practise",
        situation: "A chatbot helps me practise English.",
        verdict: "good",
        reason: "I can practise any time.",
    },
    {
        id: "weather",
        situation: "A weather app says: bring an umbrella.",
        verdict: "good",
        reason: "It helps me plan my day.",
    },
    {
        id: "accent",
        situation: "AI does not understand my accent.",
        verdict: "problem",
        reason: "It is not fair to everyone.",
    },
    {
        id: "fake-photo",
        situation: "A photo online looks real, but it is fake.",
        verdict: "problem",
        reason: "Do not believe everything you see.",
    },
    {
        id: "my-words",
        situation: "AI writes my message for me.",
        verdict: "problem",
        reason: "It is not my own words.",
    },
];

export const VERDICT_EMOJI: Record<EthicsVerdict, string> = { good: "👍", problem: "⚠️" };

/** Same scoring as Word Match: start at 100, lose 10 for each wrong tap. */
export const POINTS_PER_WRONG = 10;

export function ethicsScore(wrongAttempts: number): number {
    return Math.max(0, 100 - wrongAttempts * POINTS_PER_WRONG);
}
