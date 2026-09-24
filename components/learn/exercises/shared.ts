import type { TileState } from "../Tile";
import type { AnswerFor, Exercise, GradeResult, Lesson } from "@/lib/lessons/types";

/**
 * The contract every exercise component implements.
 *
 * An exercise never grades itself against the answer key and never advances the
 * session. It reports a draft answer upwards and the shell decides what happens,
 * which is what keeps grading rules in one testable module.
 *
 * The exception is a self-grading exercise such as matching, where each pair is
 * judged as it is tapped. Those call `onSelfSubmit` once the whole exercise is
 * done, and the shell hides the Check button for them.
 *
 * The answer type is derived from the exercise type, so a multiple-choice
 * exercise cannot report a sentence answer — the compiler rejects it.
 */
export type ExerciseProps<E extends Exercise> = {
    exercise: E;
    /**
     * The lesson this exercise belongs to, for resolving vocabulary references.
     * Exercises point at vocabulary by id rather than restating it.
     */
    lesson: Lesson;
    /** The answer built so far, or null if the learner has not answered yet. */
    draft: AnswerFor<E["type"]> | null;
    onDraftChange: (answer: AnswerFor<E["type"]> | null) => void;
    onSelfSubmit: (answer: AnswerFor<E["type"]>) => void;
    /** Set once graded, so the exercise can show which answer was given. */
    result: GradeResult | null;
    /** True after grading: inputs must stop responding. */
    locked: boolean;
};

/** Exercise types that grade themselves and need no Check button. */
export const SELF_GRADING: ReadonlySet<Exercise["type"]> = new Set(["matchPairs"]);

/**
 * How one option in a multiple-choice exercise should look.
 *
 * Before grading, only the learner's selection stands out. After grading, the
 * right answer is always shown as correct — including when they missed it — and
 * a wrong selection is marked too, so the two are visible side by side.
 */
export function choiceTileState({
    graded,
    isChosen,
    isAnswer,
}: {
    graded: boolean;
    isChosen: boolean;
    isAnswer: boolean;
}): TileState {
    if (!graded) return isChosen ? "selected" : "default";
    if (isAnswer) return "correct";
    return isChosen ? "incorrect" : "default";
}

/**
 * Rebuild tile indices from a stored answer.
 *
 * The session stores a built sentence as words, not tile indices, because that
 * is what grading needs. Mapping back has to consume each tile at most once, so
 * a sentence that repeats a word ("tap in and tap out") lights up two separate
 * tiles rather than the same one twice.
 *
 * A word with no matching tile is dropped. That can only happen if a stored
 * answer and the current tiles disagree, and dropping it keeps the answer row
 * renderable instead of producing a tile with no label.
 */
export function tokenIndices(words: string[], tokens: string[]): number[] {
    const taken = new Set<number>();
    const indices: number[] = [];

    for (const word of words) {
        const index = tokens.findIndex((token, i) => token === word && !taken.has(i));
        if (index === -1) continue;
        taken.add(index);
        indices.push(index);
    }

    return indices;
}
