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
//
// Four rounds, about 15 minutes with a group round each laptop:
//   1. Sort      eight situations into Good or Problem, one at a time
//   2. Match     eight situations against their reasons
//   3. Build     six stem sentences from word tiles
//   4. Dilemmas  three trade-offs with no right answer, said aloud to the teacher

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

/** Round 3: a stem sentence built from word tiles, with two decoys mixed in. */
export type EthicsBuildItem = {
    id: string;
    /** The situation the sentence answers. */
    situation: string;
    /** The sentence, in order, one tile per word. */
    answer: string[];
    /** Extra tiles that do not belong, so the order is not the only thing to find. */
    decoys: string[];
};

/** Round 4: two defensible sides. Nothing is graded; the team must say why. */
export type EthicsDilemma = {
    id: string;
    situation: string;
    sides: [EthicsSide, EthicsSide];
};

export type EthicsSide = { label: string; reason: string };

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
    {
        id: "subtitles",
        situation: "AI subtitles let me watch the news in my own language.",
        answer: "good",
        reason: "AI is good because it helps me understand.",
    },
    {
        id: "medical",
        situation: "A chatbot tells me which medicine to take, but it is not a doctor.",
        answer: "problem",
        reason: "AI is a problem because it is not a real expert.",
        tip: "Ask a doctor or a pharmacist before taking anything.",
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
    {
        id: "scam-warning",
        situation: "My bank app warns me when a message looks like a scam.",
        verdict: "good",
        reason: "It helps keep my money safe.",
    },
    {
        id: "speaker",
        situation: "A smart speaker listens all day, even when I do not talk to it.",
        verdict: "problem",
        reason: "It collects more than it needs.",
    },
];

export const ETHICS_BUILD_ITEMS: EthicsBuildItem[] = [
    {
        id: "b-map",
        situation: "A map app finds the fastest route.",
        answer: ["AI", "is", "good", "because", "it", "saves", "time."],
        decoys: ["wastes", "problem"],
    },
    {
        id: "b-chatbot",
        situation: "A chatbot sounds sure, but it is wrong.",
        answer: ["AI", "is", "a", "problem", "because", "it", "makes", "mistakes."],
        decoys: ["good", "never"],
    },
    {
        id: "b-translate",
        situation: "A translate app helps me at the clinic.",
        answer: ["AI", "is", "good", "because", "it", "helps", "me", "communicate."],
        decoys: ["problem", "hides"],
    },
    {
        id: "b-photos",
        situation: "An app shares my photos without asking.",
        answer: ["AI", "is", "a", "problem", "because", "it", "is", "not", "private."],
        decoys: ["good", "always"],
    },
    {
        id: "b-voice",
        situation: "A call copies my brother's voice to ask for money.",
        answer: ["AI", "is", "a", "problem", "because", "it", "can", "trick", "people."],
        decoys: ["helps", "good"],
    },
    {
        id: "b-tutor",
        situation: "A tutor app is open at midnight.",
        answer: ["AI", "is", "good", "because", "it", "is", "available", "any", "time."],
        decoys: ["problem", "closed"],
    },
];

export const ETHICS_DILEMMAS: EthicsDilemma[] = [
    {
        id: "d-translate",
        situation: "A free translate app is very useful, but it keeps everything you type.",
        sides: [
            { label: "Use it", reason: "It helps me every day." },
            { label: "Do not use it", reason: "My messages are private." },
        ],
    },
    {
        id: "d-camera",
        situation: "An AI camera at the lift stops theft, but it records everyone, all day.",
        sides: [
            { label: "Good", reason: "It keeps everyone safe." },
            { label: "Problem", reason: "It watches us all the time." },
        ],
    },
    {
        id: "d-tutor",
        situation: "An AI tutor corrects your English, but sometimes it is wrong.",
        sides: [
            { label: "Trust it", reason: "It is right most of the time." },
            { label: "Check it", reason: "A teacher is more accurate." },
        ],
    },
];

/** Same scoring as Word Match: start at 100, lose 10 for each wrong tap. */
export const POINTS_PER_WRONG = 10;

export function ethicsScore(wrongAttempts: number): number {
    return Math.max(0, 100 - wrongAttempts * POINTS_PER_WRONG);
}
