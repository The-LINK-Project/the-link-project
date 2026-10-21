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
// Four slides first, then four rounds, about 18 minutes with a group round
// each laptop. The slides come straight after the workshop's "AI exploration"
// and "AI vs human" segments, so they turn what the team just did (talked to a
// chatbot, made pictures, took photos) into three questions to ask of any AI:
// Is it true? Did they say yes? Is it fair? Each slide ends with one tap.
//   1. Sort      eight situations into Good or Problem, one at a time
//   2. Match     eight situations against their reasons
//   3. Build     six stem sentences from word tiles
//   4. Dilemmas  four trade-offs with no right answer, said aloud to the room

export type EthicsVerdict = "good" | "problem";

/**
 * The ethics idea a card is really about, named so it is said out loud rather
 * than left implicit. Each is one word a learner can take away.
 */
export type EthicsConcept = "privacy" | "accuracy" | "deepfakes" | "bias" | "consent" | "safety" | "access";

export const ETHICS_CONCEPT_LABEL: Record<EthicsConcept, string> = {
    privacy: "Privacy",
    accuracy: "Accuracy",
    deepfakes: "Deepfakes",
    bias: "Bias",
    consent: "Permission",
    safety: "Safety",
    access: "Access",
};

/**
 * The three questions the slides teach. Every concept the cards name sits
 * under one of them, so the finish screen can hand the team back the same
 * three questions they started with.
 */
export type EthicsQuestion = "true" | "permission" | "fair";

export const ETHICS_QUESTION_LABEL: Record<EthicsQuestion, string> = {
    true: "Is it true?",
    permission: "Did they say yes?",
    fair: "Is it fair?",
};

export const ETHICS_CONCEPT_QUESTION: Record<EthicsConcept, EthicsQuestion> = {
    accuracy: "true",
    deepfakes: "true",
    privacy: "permission",
    consent: "permission",
    bias: "fair",
    safety: "fair",
    access: "fair",
};

/**
 * One slide shown before the game. `check` is the single tap that ends it:
 * the right option gets the green banner, either way the reason is read out.
 */
export type EthicsSlide = {
    id: string;
    title: string;
    /** Short lines, read aloud by the facilitator. */
    lines: string[];
    /** What the team did earlier in the workshop that this slide is about. */
    earlier: string;
    question?: EthicsQuestion;
    check: {
        prompt: string;
        options: [string, string];
        answer: 0 | 1;
        reason: string;
    };
};

/** Round 1: one situation, sorted into Good or Problem. */
export type EthicsSortCard = {
    id: string;
    /** The situation, read aloud by the team. */
    situation: string;
    answer: EthicsVerdict;
    concept: EthicsConcept;
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
    concept: EthicsConcept;
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

export const ETHICS_SLIDES: EthicsSlide[] = [
    {
        id: "s-tool",
        title: "AI is a tool",
        lines: [
            "Today you talked to AI, made pictures and used your voice.",
            "AI did what you asked. It does not know if it is right or kind.",
            "AI is a tool. The person using it is responsible.",
        ],
        earlier: "You asked AI to make something. It made it. You decided what.",
        check: {
            prompt: "AI makes a picture for you. Who is responsible for how it is used?",
            options: ["The person", "The AI"],
            answer: 0,
            reason: "AI is a tool. The person using it is responsible, like a knife or a car.",
        },
    },
    {
        id: "s-true",
        title: "Is it true?",
        lines: [
            "The chatbot sounded sure. It can still be wrong.",
            "For medicine, money or official letters, ask a real person.",
            "If a call or message looks strange, check with ScamShield on 1799.",
        ],
        earlier: "You asked the chatbot questions. Was every answer correct?",
        question: "true",
        check: {
            prompt: "A chatbot says: take two tablets. What do you do?",
            options: ["Take them", "Ask the pharmacist"],
            answer: 1,
            reason: "The chatbot is not a doctor. It can be wrong and still sound sure.",
        },
    },
    {
        id: "s-permission",
        title: "Did they say yes?",
        lines: [
            "You made a picture with AI. A picture or voice of a real person needs their permission.",
            "Photos you upload go to a company. They may keep them.",
            "Never upload your FIN, work permit or passport to a chatbot or an unknown app.",
        ],
        earlier: "You took photos today. Whose face was in them? Did you ask?",
        question: "permission",
        check: {
            prompt: "Your friend's photo is funny. Can you make an AI picture of him?",
            options: ["Ask him first", "Yes, it is a joke"],
            answer: 0,
            reason: "His face is his. A joke for you can be a problem for him.",
        },
    },
    {
        id: "s-fair",
        title: "Is it fair?",
        lines: [
            "AI learns from examples. It often works better for some people than others.",
            "A copied voice asking for money. A fake flood photo. These hurt people.",
            "Good use helps people. Bad use tricks people or leaves them out.",
        ],
        earlier: "Did the voice AI understand everyone in your group equally well?",
        question: "fair",
        check: {
            prompt: "A translate app works well for English, but badly for Bengali and Tamil. Is that fair?",
            options: ["Fair", "Not fair"],
            answer: 1,
            reason: "That is bias. AI should work for everyone, not only for some.",
        },
    },
];

export const ETHICS_SORT_CARDS: EthicsSortCard[] = [
    {
        id: "translate",
        situation: "A translate app helps me explain my symptoms to the doctor.",
        answer: "good",
        concept: "access",
        reason: "AI is good because it helps me communicate clearly.",
    },
    {
        id: "map",
        situation: "A map app finds the fastest route to the MRT when it is raining.",
        answer: "good",
        concept: "access",
        reason: "AI is good because it saves time and effort.",
    },
    {
        id: "voice",
        situation: "A voice assistant reads my messages aloud while I am cooking.",
        answer: "good",
        concept: "access",
        reason: "AI is good because it is convenient and hands-free.",
    },
    {
        id: "bus",
        situation: "A chatbot sounds very confident, but gives me the wrong bus timing.",
        answer: "problem",
        concept: "accuracy",
        reason: "AI is a problem because it can make mistakes while sounding sure.",
        tip: "Always check important information with a second source.",
    },
    {
        id: "scam-call",
        situation: "A video call looks and sounds like my family, but it is a scam for money.",
        answer: "problem",
        concept: "deepfakes",
        reason: "AI is a problem because it can copy faces and voices to trick people.",
        tip: "Hang up. Call your family back on their real number. Not sure? Call ScamShield on 1799.",
    },
    {
        id: "photos",
        situation: "A photo app uploads my pictures online without asking my permission.",
        answer: "problem",
        concept: "privacy",
        reason: "AI is a problem because it does not respect my privacy.",
        tip: "Check the app permissions and switch off sharing.",
    },
    {
        id: "subtitles",
        situation: "AI subtitles let me watch the news in my own language.",
        answer: "good",
        concept: "access",
        reason: "AI is good because it helps me understand.",
    },
    {
        id: "medical",
        situation: "A chatbot tells me which medicine to take, but it is not a doctor.",
        answer: "problem",
        concept: "accuracy",
        reason: "AI is a problem because it is not a real expert.",
        tip: "Ask a doctor or a pharmacist before taking anything.",
    },
];

export const ETHICS_MATCH_PAIRS: EthicsMatchPair[] = [
    {
        id: "read-aloud",
        situation: "An app reads street signs aloud for people who cannot see well.",
        verdict: "good",
        concept: "access",
        reason: "It makes everyday life more accessible.",
    },
    {
        id: "practise",
        situation: "A chatbot lets me practise English at midnight after work.",
        verdict: "good",
        concept: "access",
        reason: "It is available at any time.",
    },
    {
        id: "weather",
        situation: "A weather app warns me an hour before a heavy storm.",
        verdict: "good",
        concept: "safety",
        reason: "It helps me plan ahead.",
    },
    {
        id: "accent",
        situation: "Voice AI understands some accents much better than others.",
        verdict: "problem",
        concept: "bias",
        reason: "It is biased and not fair to everyone.",
    },
    {
        id: "fake-photo",
        situation: "A viral photo of a flood turns out to be made by AI.",
        verdict: "problem",
        concept: "deepfakes",
        reason: "Do not believe everything you see online.",
    },
    {
        id: "my-words",
        situation: "AI writes my whole message in words I would never use.",
        verdict: "problem",
        concept: "consent",
        reason: "It is not my own voice.",
    },
    {
        id: "scam-warning",
        situation: "My bank app warns me when a message looks like a scam.",
        verdict: "good",
        concept: "safety",
        reason: "It helps keep my money safe.",
    },
    {
        id: "speaker",
        situation: "A smart speaker listens all day, even when I do not talk to it.",
        verdict: "problem",
        concept: "privacy",
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
        id: "d-location",
        situation: "A bus app shows exact arrival times, but it keeps a record of everywhere you go.",
        sides: [
            { label: "Use it", reason: "It saves me time every day." },
            { label: "Switch off location", reason: "Where I go is my business." },
        ],
    },
    {
        id: "d-tutor",
        situation: "An AI tutor corrects your English, but sometimes it is wrong.",
        sides: [
            { label: "Trust it", reason: "It is right most of the time." },
            { label: "Check it", reason: "A real person is more accurate." },
        ],
    },
    {
        id: "d-write",
        situation: "An app can write all your English messages for you, perfectly.",
        sides: [
            { label: "Let it write", reason: "My messages are clear." },
            { label: "Write myself", reason: "I want to learn English." },
        ],
    },
];

/**
 * The three things to do, one per question, shown on the finish screen and
 * meant to be the part of the lesson that leaves the room with them.
 */
export const ETHICS_TAKEAWAYS: Record<EthicsQuestion, string> = {
    true: "Check important things with a real person. Not sure about a call or message? ScamShield: 1799.",
    permission: "Ask before you use someone's face or voice. Never upload your FIN, work permit or passport.",
    fair: "If AI works badly for you or your language, it is the AI that is wrong, not you. Say so.",
};

/** Same scoring as Word Match: start at 100, lose 10 for each wrong tap. */
export const POINTS_PER_WRONG = 10;

export function ethicsScore(wrongAttempts: number): number {
    return Math.max(0, 100 - wrongAttempts * POINTS_PER_WRONG);
}
