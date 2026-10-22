import { describe, expect, it } from "vitest";

import { typedLineBreak } from "@/lib/chat/typedLineBreak";
import { getLesson, isWorkshopLesson, listLessons, listWorkshopLessons } from "@/lib/lessons/data";
import { fingerprint } from "@/lib/lessons/session";
import { retryOrder, seededShuffle } from "@/lib/lessons/shuffle";
import { lessonStatus } from "@/lib/progress/model";
import { canPractiseSpeaking, speakingOwed } from "@/lib/speaking/context";

describe("a workshop lesson's talk", () => {
    it("is on offer but not owed", () => {
        for (const lesson of listWorkshopLessons()) {
            expect(isWorkshopLesson(lesson.id)).toBe(true);
            expect(speakingOwed(lesson)).toBe(false);
        }
        // AI Words can still be said aloud, from its card and its results.
        expect(canPractiseSpeaking(getLesson("ai-basics")!)).toBe(true);
    });

    it("is still owed in an English lesson that has one", () => {
        for (const lesson of listLessons()) {
            expect(isWorkshopLesson(lesson.id)).toBe(false);
            expect(speakingOwed(lesson)).toBe(canPractiseSpeaking(lesson));
        }
    });

    it("leaves a finished AI Words done, not in progress", () => {
        const lesson = getLesson("ai-basics")!;
        const data = {
            progress: {
                lessons: {
                    "ai-basics": { completedAt: "2026-10-22T05:00:00.000Z", runs: 1, bestFirstTry: 10, total: 10 },
                },
            },
            runs: {},
            talks: {},
        };
        const ref = { id: lesson.id, fingerprint: fingerprint(lesson), speakable: speakingOwed(lesson) };
        expect(lessonStatus(data as never, ref).finished).toBe("done");
    });
});

describe("the options of an exercise shown again after a miss", () => {
    const sets = [
        ["a", "b"],
        ["a", "b", "c"],
        ["one", "two", "three", "four"],
        ["x", "y", "z", "w", "v", "u"],
    ];

    it("keep their order the first time", () => {
        for (const items of sets) expect(retryOrder(items, "ex-1", false)).toEqual(items);
    });

    it("always come in a different order the second time, and the same one each time", () => {
        for (const items of sets) {
            for (let n = 0; n < 200; n++) {
                const seed = `ex-${n}`;
                const first = seededShuffle(items, seed);
                const again = retryOrder(first, seed, true);
                expect(again).not.toEqual(first);
                expect([...again].sort()).toEqual([...first].sort());
                expect(retryOrder(first, seed, true)).toEqual(again);
            }
        }
    });

    it("leave a single option alone", () => {
        expect(retryOrder(["only"], "ex", true)).toEqual(["only"]);
    });
});

describe("Enter in the chat box on an Android keyboard", () => {
    const typed = { inputType: "insertCompositionText", newLineAsked: false };

    it("sends what was typed, without the line break", () => {
        expect(typedLineBreak("hi", "hi\n", { ...typed, caret: 3 })).toBe("hi");
        expect(
            typedLineBreak("hello there", "hello\n there", {
                inputType: "insertLineBreak",
                newLineAsked: false,
                caret: 6,
            }),
        ).toBe("hello there");
    });

    it("finds the break when the caret is not just after it", () => {
        expect(typedLineBreak("hi", "hi\n", { ...typed, caret: 0 })).toBe("hi");
    });

    it("keeps a line break that was pasted or asked for with Shift+Enter", () => {
        expect(typedLineBreak("a", "a\nb", { inputType: "insertFromPaste", newLineAsked: false, caret: 3 })).toBeNull();
        expect(typedLineBreak("a", "a\n", { inputType: "insertLineBreak", newLineAsked: true, caret: 2 })).toBeNull();
    });

    it("leaves ordinary typing and deleting alone", () => {
        expect(typedLineBreak("h", "hi", { ...typed, caret: 2 })).toBeNull();
        expect(
            typedLineBreak("a\nb", "a\n", { inputType: "deleteContentBackward", newLineAsked: false, caret: 2 }),
        ).toBeNull();
        expect(typedLineBreak("a\nb", "a\nbc", { inputType: "insertText", newLineAsked: false, caret: 4 })).toBeNull();
    });
});
