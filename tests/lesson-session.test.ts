import { describe, expect, it } from "vitest";

import {
    initSession,
    isRevisit,
    restoreSession,
    reviewSession,
    sessionReducer,
    snapshotOf,
    type SessionState,
} from "@/lib/lessons/session";
import type { Exercise, Lesson } from "@/lib/lessons/types";

// Stepping back through a lesson (lib/lessons/session.ts): going back is for
// looking again, so it must never change the score, the mistake queue, how
// far the learner has got, or where a saved run picks up.

function fill(id: string): Exercise {
    return {
        id,
        type: "fillBlank",
        instruction: { en: "Which word fits?" },
        practises: [],
        sentence: ["It is a", null],
        choices: [
            { id: "right", label: "right" },
            { id: "wrong", label: "wrong" },
        ],
        correctChoiceId: "right",
        grading: { mode: "choice" },
    };
}

const lesson: Lesson = {
    id: "test-lesson",
    title: { en: "Test" },
    goal: { en: "Test" },
    icon: "work",
    level: "beginner",
    estimatedMinutes: 1,
    notes: [],
    vocab: [],
    phrases: [],
    exercises: [fill("a"), fill("b"), fill("c")],
};

const right = { type: "submit", answer: { kind: "choice", choiceId: "right" } } as const;
const wrong = { type: "submit", answer: { kind: "choice", choiceId: "wrong" } } as const;

function run(...actions: Parameters<typeof sessionReducer>[1][]): SessionState {
    return actions.reduce(sessionReducer, initSession(lesson, "en"));
}

describe("stepping back through a lesson", () => {
    it("has nothing to go back to on the first exercise", () => {
        const start = initSession(lesson, "en");
        expect(sessionReducer(start, { type: "back" })).toBe(start);
    });

    it("goes back to the exercise before, ready to answer again", () => {
        const state = run(right, { type: "next" }, { type: "back" });
        expect(state.position).toBe(0);
        expect(state.phase).toBe("answering");
        expect(state.draft).toBeNull();
        expect(isRevisit(state)).toBe(true);
        expect(state.reached).toBe(1);
    });

    it("can go back from the feedback of an answer just given", () => {
        const state = run(right, { type: "next" }, right, { type: "back" });
        expect(state.position).toBe(0);
        expect(state.reached).toBe(2);
    });

    it("grades a second try but records nothing and queues nothing", () => {
        const before = run(right, { type: "next" }, { type: "back" });
        const after = sessionReducer(before, wrong);
        expect(after.phase).toBe("graded");
        expect(after.result?.correct).toBe(false);
        expect(after.records).toEqual(before.records);
        expect(after.queue).toEqual(before.queue);
        expect(after.requeued).toEqual(before.requeued);
        expect(after.reached).toBe(1);
    });

    it("passes an answered exercise without answering it again", () => {
        const state = run(right, { type: "next" }, right, { type: "next" }, { type: "back" }, { type: "back" });
        expect(state.position).toBe(0);
        const forward = sessionReducer(sessionReducer(state, { type: "next" }), { type: "next" });
        expect(forward.position).toBe(2);
        expect(forward.phase).toBe("answering");
        expect(isRevisit(forward)).toBe(false);
    });

    it("goes back from the results to the last exercise, and on to the results again", () => {
        const finished = run(right, { type: "next" }, right, { type: "next" }, right, { type: "next" });
        expect(finished.phase).toBe("finished");
        const back = sessionReducer(finished, { type: "back" });
        expect(back.position).toBe(2);
        expect(back.phase).toBe("answering");
        expect(isRevisit(back)).toBe(true);
        const again = sessionReducer(back, { type: "next" });
        expect(again.phase).toBe("finished");
        expect(again.records).toEqual(finished.records);
    });

    it("opens a finished lesson on its last exercise, with every one counted as answered", () => {
        const review = reviewSession(lesson, "en");
        expect(review.position).toBe(2);
        expect(review.phase).toBe("answering");
        expect(isRevisit(review)).toBe(true);
        // Back all the way, and forward again without answering anything.
        const first = [{ type: "back" } as const, { type: "back" } as const].reduce(sessionReducer, review);
        expect(first.position).toBe(0);
        expect(isRevisit(first)).toBe(true);
        const end = [{ type: "next" } as const, { type: "next" } as const, { type: "next" } as const].reduce(
            sessionReducer,
            first,
        );
        expect(end.phase).toBe("finished");
        expect(end.records).toEqual({});
    });

    it("does not let an unanswered exercise be skipped", () => {
        const state = run(right, { type: "next" });
        expect(sessionReducer(state, { type: "next" })).toBe(state);
    });

    it("saves the run where the learner had got to, not where they looked back to", () => {
        const state = run(right, { type: "next" }, right, { type: "next" }, { type: "back" }, { type: "back" });
        expect(snapshotOf(state).position).toBe(2);
    });

    it("still finishes, and a miss before stepping back still comes round again", () => {
        const state = run(
            wrong,
            { type: "next" },
            { type: "back" },
            right,
            { type: "next" },
            right,
            { type: "next" },
            right,
            { type: "next" },
        );
        // The miss on "a" put it back on the end; getting it right on a look
        // back does not take it off again.
        expect(state.queue).toEqual(["a", "b", "c", "a"]);
        expect(state.records.a.firstTryCorrect).toBe(false);
        expect(state.position).toBe(3);
        expect(state.phase).toBe("answering");
        const done = [right, { type: "next" } as const].reduce(sessionReducer, state);
        expect(done.phase).toBe("finished");
        expect(done.reached).toBe(4);
    });
});

// Starting a lesson again from its top bar (components/learn/RestartLesson.tsx)
// is the session's `restart`: a fresh run that keeps nothing of the old one.
describe("starting a lesson again", () => {
    it("forgets the answers, the mistakes and how far the learner had got", () => {
        const midway = run(wrong, { type: "next" }, right, { type: "next" }, { type: "back" });
        expect(midway.queue).toHaveLength(4);
        const fresh = sessionReducer(midway, { type: "restart" });
        expect(fresh).toEqual(initSession(lesson, "en"));
        expect(fresh.reached).toBe(0);
        expect(snapshotOf(fresh).position).toBe(0);
    });
});

// Coming back to a run after changing language (restoreSession). What a learner
// has answered stands even when it would not be offered in the new language,
// so it must not stop the run being picked up again the time after.
describe("picking a run up again in another language", () => {
    const translate: Exercise = {
        id: "t",
        type: "translateWordBank",
        instruction: { en: "Say it in English" },
        practises: [],
        prompt: { en: "It is right", ta: "அது சரி" },
        phraseId: "p",
        tokens: ["It", "is", "right", "wrong"],
        grading: { mode: "keywords", keywords: ["right"] },
    } as Exercise;
    const mixed: Lesson = {
        ...lesson,
        phrases: [{ id: "p", text: "It is right", meaning: { en: "It is right" } }],
        exercises: [translate, fill("a"), fill("b"), fill("c")],
    } as Lesson;
    const said: Parameters<typeof sessionReducer>[1] = {
        type: "submit",
        answer: { kind: "tokens", tokens: ["It", "is", "right"] },
    };

    it("keeps an answered translation that the new language would not offer", () => {
        // Tamil: the translation is on the queue and gets answered.
        let state = [said, { type: "next" } as const, right, { type: "next" } as const].reduce(
            sessionReducer,
            initSession(mixed, "ta"),
        );
        expect(state.queue[0]).toBe("t");
        // Back in English, which has no translation to offer.
        const english = restoreSession(mixed, snapshotOf(state), false, "en");
        expect(english?.position).toBe(2);
        // An answer more, then away and back again in English.
        state = [right, { type: "next" } as const].reduce(sessionReducer, english!);
        const again = restoreSession(mixed, snapshotOf(state), false, "en");
        expect(again?.position).toBe(3);
        expect(again?.queue.slice(0, 3)).toEqual(state.queue.slice(0, 3));
    });
});
