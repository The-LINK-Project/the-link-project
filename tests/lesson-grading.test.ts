import { describe, expect, it } from "vitest";

import { getLesson } from "@/lib/lessons/data";
import { gradeAnswer } from "@/lib/lessons/grading";

// What a learner is told after an answer (lib/lessons/grading.ts).

const lesson = getLesson("ai-basics")!;
const pairs = lesson.exercises.find((exercise) => exercise.type === "matchPairs")!;

describe("grading a matching round", () => {
    it("is right first time with no wrong pairing", () => {
        const result = gradeAnswer(lesson, pairs, { kind: "pairs", wrongAttempts: 0 });
        expect(result).toMatchObject({ correct: true, firstPassClean: true });
        expect(result.accepted).toBeFalsy();
    });

    // "Good, we understand you" is for a sentence put another way; a matching
    // round with a slip in it is right, just not right first time.
    it("is right, but not right first time, after a wrong pairing", () => {
        const result = gradeAnswer(lesson, pairs, { kind: "pairs", wrongAttempts: 2 });
        expect(result).toMatchObject({ correct: true, firstPassClean: false });
        expect(result.accepted).toBeFalsy();
    });
});
