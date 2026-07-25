// Focus Group July 2026 — the time-trial run.
//
// TWO sets, A and B, of the SAME game. Each is 10 stages played straight
// through with no menus: 5 Word Match rounds then 5 Picture Story questions.
// Set B exists so a second group (or a re-run, if there is time) plays entirely
// different words and stories — there is no content overlap with Set A.
//
// Each set's sequence is FIXED and identical for every team that plays it. Do
// not randomise these lists — the only variable is how fast a team gets
// through it.
//
// NO GRAMMAR MINIMAL-PAIR QUESTIONS. Questions whose four options are near
// identical sentences differing by one word ("in / on / under / at the
// machine", "is cooking / cooked / will cook") are deliberately excluded — in
// a race they cost repeated 5-second freezes on a subtle distinction. Both
// sets use only meaning-based picture questions: ordering a sequence, and
// working out what happens next.

import { WORD_MATCH_ROUNDS } from "./wordMatch";
import { PICTURE_STORY_SETS } from "./pictureStory";

const round = (id: string): WordMatchGameRound => {
    const found = WORD_MATCH_ROUNDS.find((item) => item._id === id);
    if (!found) throw new Error(`Focus Group: unknown Word Match round "${id}"`);
    return found;
};

/** `position` is 1-based, matching the numbering used in content-bank.md. */
const question = (setId: string, position: number): PictureStoryQuestion => {
    const set = PICTURE_STORY_SETS.find((item) => item._id === setId);
    if (!set) throw new Error(`Focus Group: unknown story set "${setId}"`);
    const found = set.questions[position - 1];
    if (!found) {
        throw new Error(`Focus Group: ${setId} has no question ${position}`);
    }
    return found;
};

// --- Set A ---------------------------------------------------------------
// Word Match: kitchen, laundry, market, transport, cleaning.
// Pictures: kitchen order, laundry next, hawker next, MRT order, clinic order.
const SET_A_STAGES: FocusGroupStage[] = [
    { kind: "word-match", label: "Kitchen", round: round("kitchen-things") },
    { kind: "word-match", label: "Laundry", round: round("laundry-things") },
    { kind: "word-match", label: "Market", round: round("market-things") },
    {
        kind: "word-match",
        label: "Getting around",
        round: round("transport-going-out"),
    },
    { kind: "word-match", label: "Cleaning", round: round("cleaning-actions") },

    { kind: "picture", label: "Kitchen", question: question("morning-kitchen", 3) },
    { kind: "picture", label: "Laundry", question: question("laundry-day", 4) },
    { kind: "picture", label: "Hawker centre", question: question("market-hawker", 7) },
    { kind: "picture", label: "Getting around", question: question("out-and-about", 2) },
    { kind: "picture", label: "At the doctor", question: question("out-and-about", 9) },
];

// --- Set B ---------------------------------------------------------------
// Entirely different content from Set A — no shared words or questions.
// Word Match: hawker, the flat, weather, fresh food, time.
// Pictures: boil water, cook, wash clothes, put away, market shop.
const SET_B_STAGES: FocusGroupStage[] = [
    { kind: "word-match", label: "Hawker centre", round: round("hawker-things") },
    { kind: "word-match", label: "The flat", round: round("flat-rooms") },
    { kind: "word-match", label: "Weather", round: round("weather-today") },
    { kind: "word-match", label: "Fresh food", round: round("market-food") },
    { kind: "word-match", label: "Time", round: round("time-clock") },

    { kind: "picture", label: "Boiling water", question: question("morning-kitchen", 4) },
    { kind: "picture", label: "Cooking", question: question("morning-kitchen", 9) },
    { kind: "picture", label: "Washing", question: question("laundry-day", 2) },
    { kind: "picture", label: "Folding", question: question("laundry-day", 10) },
    { kind: "picture", label: "At the market", question: question("market-hawker", 3) },
];

export type FocusGroupSet = {
    slug: string;
    title: string;
    stages: FocusGroupStage[];
};

export const FOCUS_GROUP_SETS: FocusGroupSet[] = [
    { slug: "a", title: "Focus Group Set A", stages: SET_A_STAGES },
    { slug: "b", title: "Focus Group Set B", stages: SET_B_STAGES },
];

export const getFocusGroupSet = (slug: string): FocusGroupSet | undefined =>
    FOCUS_GROUP_SETS.find((set) => set.slug === slug);

/** Seconds the screen stays red and locked after a wrong answer. */
export const FREEZE_MS = 5000;

/** Wrong answers on one stage before the answer is shown, to avoid stalling. */
export const REVEAL_AFTER_WRONG = 5;
