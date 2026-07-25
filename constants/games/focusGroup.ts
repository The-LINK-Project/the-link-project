// Focus Group July 2026 — the time-trial run.
//
// 10 stages, played straight through with no menus: 5 Word Match rounds then
// 5 Picture Story questions.
//
// The sequence is FIXED and identical for every team. Both teams play the same
// stages in the same order, so the only variable is how fast they get through
// it. Do not randomise this list.
//
// NO GRAMMAR MINIMAL-PAIR QUESTIONS. Questions whose four options are near
// identical sentences differing by one word ("in / on / under / at the
// machine", "is cooking / cooked / will cook") are deliberately excluded — in
// a race they cost repeated 5-second freezes on a subtle distinction, which
// frustrates rather than teaches. Those questions still exist in the full
// Picture Story game; they are just not used here.
//
// What is left is meaning-based: ordering a sequence of pictures, and working
// out what happens next. Each stage is a different topic.

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

export const FOCUS_GROUP_TITLE = "Focus Group July 2026";

export const FOCUS_GROUP_STAGES: FocusGroupStage[] = [
    // --- Part 1: five Word Match rounds, five different categories ---------
    { kind: "word-match", label: "Kitchen", round: round("kitchen-things") },
    { kind: "word-match", label: "Laundry", round: round("laundry-things") },
    { kind: "word-match", label: "Market", round: round("market-things") },
    {
        kind: "word-match",
        label: "Getting around",
        round: round("transport-going-out"),
    },
    {
        kind: "word-match",
        label: "Cleaning",
        round: round("cleaning-actions"),
    },

    // --- Part 2: five picture questions, ordering and what-happens-next ----
    { kind: "picture", label: "Kitchen", question: question("morning-kitchen", 3) },
    { kind: "picture", label: "Laundry", question: question("laundry-day", 4) },
    { kind: "picture", label: "Hawker centre", question: question("market-hawker", 7) },
    { kind: "picture", label: "Getting around", question: question("out-and-about", 2) },
    { kind: "picture", label: "At the doctor", question: question("out-and-about", 9) },
];

/** Seconds the screen stays red and locked after a wrong answer. */
export const FREEZE_MS = 5000;

/** Wrong answers on one stage before the answer is shown, to avoid stalling. */
export const REVEAL_AFTER_WRONG = 5;
