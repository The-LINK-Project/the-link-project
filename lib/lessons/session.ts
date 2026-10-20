/**
 * Lesson session state.
 *
 * One reducer owns the whole run: which exercise is on screen, the draft
 * answer, the grade, and the mistake queue. Screens and exercise components
 * hold no session state of their own, so the flow stays testable without
 * rendering anything.
 *
 * Design decisions worth knowing:
 * - There are no hearts or energy. A wrong answer never blocks progress; the
 *   exercise is put back on the end of the queue instead. That is Duolingo's
 *   own spaced-repetition reasoning, minus the part that locks people out.
 * - Progress never moves backwards. The bar is `reached / queue.length`, and
 *   the queue only ever grows, so a mistake slows the bar rather than undoing it.
 * - A learner can step back to an exercise they have already answered, to look
 *   at it again or try it again. That is practice, not a second attempt: the
 *   grade still shows, but the records, the mistake queue and the progress bar
 *   are left as they were, and Next walks forward again without answering.
 * - A run can be saved and picked up again. What is saved is the queue, the
 *   position and the records: never the answer being built, because an exercise
 *   keeps the look of its half-built answer to itself and would come back
 *   disagreeing with it. A learner returns to the start of the exercise they
 *   were on. A run is thrown away when the lesson's exercises have changed
 *   underneath it, which `fingerprint` detects.
 * - A learner who changes their language between leaving a run and coming back
 *   keeps their place. Only the exercises still ahead of them are chosen again,
 *   for the language they read now.
 */

import { useCallback, useMemo, useReducer } from "react";

import { gradeAnswer } from "./grading";
import { isFirstLanguage, type FirstLanguage } from "./languages";
import { hasTranslation } from "./localized";
import type { Answer, Exercise, GradeResult, Lesson, Phrase } from "./types";

/** Per-exercise outcome, keyed by exercise id. */
export type ExerciseRecord = {
    attempts: number;
    /** True when the learner got it right without ever getting it wrong. */
    firstTryCorrect: boolean;
};

export type SessionPhase = "answering" | "graded" | "finished";

export type SessionState = {
    lesson: Lesson;
    /**
     * The language the run was built for. Captured once at the start: switching
     * language mid-lesson changes the words on screen, but must not rebuild the
     * queue under the learner.
     */
    locale: FirstLanguage;
    /** Whether a screen reader was running when the run was built. */
    screenReader: boolean;
    /** Exercise ids in the order they will be shown. Grows when a mistake is re-queued. */
    queue: string[];
    /** The exercise on screen. Behind `reached` after the learner steps back. */
    position: number;
    /** The first exercise not answered yet: how far the learner has really got. */
    reached: number;
    phase: SessionPhase;
    /** The answer in progress, before the learner submits it. */
    draft: Answer | null;
    /** The grade for the submitted answer, while the feedback footer is up. */
    result: GradeResult | null;
    records: Record<string, ExerciseRecord>;
    /** Ids already put back on the queue, so one item cannot loop forever. */
    requeued: string[];
};

/**
 * Is this a real answer?
 *
 * Guards the one place a value from outside can reach the grader. A React press
 * handler passes its event as the first argument, and an event graded as an
 * answer silently fails every exercise — which is exactly what happened when
 * the Check button was wired straight to `submit`. Cheap to check, and the
 * failure it prevents is invisible rather than loud.
 */
function isAnswer(value: unknown): value is Answer {
    if (typeof value !== "object" || value === null) return false;
    const kind = (value as { kind?: unknown }).kind;
    return kind === "choice" || kind === "tokens" || kind === "pairs";
}

/** The part of a run worth keeping between app launches. */
export type RunSnapshot = {
    fingerprint: string;
    locale: string;
    screenReader: boolean;
    queue: string[];
    position: number;
    records: Record<string, ExerciseRecord>;
    requeued: string[];
};

/**
 * Identifies the exercises a run was built from. Ids and types, in order: a
 * corrected translation leaves a saved run valid, a reordered or replaced
 * exercise does not. The daily mix changes every day and so invalidates itself.
 */
export function fingerprint(lesson: Lesson): string {
    return lesson.exercises.map((exercise) => `${exercise.id}:${exercise.type}`).join("|");
}

export function snapshotOf(state: SessionState): RunSnapshot {
    return {
        fingerprint: fingerprint(state.lesson),
        locale: state.locale,
        screenReader: state.screenReader,
        queue: state.queue,
        // The first exercise not answered yet, so a learner who stepped back to
        // look at an earlier one comes back to where they had got to.
        position: state.reached,
        records: state.records,
        requeued: state.requeued,
    };
}

function isRunLanguage(value: string): value is FirstLanguage {
    return isFirstLanguage(value);
}

/**
 * Pick a saved run back up, or null when it no longer fits: the lesson changed,
 * the run was already over, or a screen reader has been switched on since and
 * the queue holds picture exercises it cannot do.
 *
 * `language` is the one the learner reads now. When it is not the one the run
 * was built for, what they have answered stands and the rest of the queue is
 * chosen again: a translation exercise whose prompt would fall back to English
 * is dropped, and one that has become possible is added at the end.
 */
export function restoreSession(
    lesson: Lesson,
    saved: RunSnapshot,
    screenReader: boolean,
    language: FirstLanguage,
): SessionState | null {
    if (saved.fingerprint !== fingerprint(lesson)) return null;
    if (saved.screenReader !== screenReader) return null;
    if (!isRunLanguage(saved.locale)) return null;
    if (saved.position < 0 || saved.position >= saved.queue.length) return null;
    const exercises = new Map(lesson.exercises.map((exercise) => [exercise.id, exercise]));
    const fits = (id: string, locale: FirstLanguage) => {
        const exercise = exercises.get(id);
        return exercise !== undefined && appliesToLearner(exercise, locale, screenReader);
    };
    if (!saved.queue.every((id) => fits(id, saved.locale as FirstLanguage))) return null;

    let queue = saved.queue;
    if (language !== saved.locale) {
        const queued = new Set(saved.queue);
        queue = [
            ...saved.queue.slice(0, saved.position),
            ...saved.queue.slice(saved.position).filter((id) => fits(id, language)),
            ...buildQueue(
                lesson.exercises.filter((exercise) => !queued.has(exercise.id)),
                language,
                screenReader,
            ),
        ];
        // Nothing left that this learner can do: the run is over, not resumable.
        if (saved.position >= queue.length) return null;
    }
    return {
        lesson,
        locale: language,
        screenReader,
        queue,
        position: saved.position,
        reached: saved.position,
        phase: "answering",
        draft: null,
        result: null,
        records: saved.records,
        requeued: saved.requeued,
    };
}

type SessionAction =
    | { type: "draft"; answer: Answer | null }
    | { type: "submit"; answer?: Answer }
    | { type: "next" }
    | { type: "back" }
    | { type: "restart" };

/**
 * Can this exercise teach anything to a learner reading in `locale`?
 *
 * Translating into English only makes sense from another language. A learner
 * whose language is English, or whose language the prompt has not been
 * translated into, would see the prompt fall back to English and be asked to
 * build the sentence already displayed above the tiles. That is not a hard
 * exercise, it is an incoherent one, so it is left out of the run entirely.
 */
export function appliesToLearner(
    exercise: Exercise,
    locale: FirstLanguage,
    screenReader = false,
): boolean {
    // A picture exercise cannot be done without seeing the pictures, and the
    // tiles deliberately do not name themselves — a label would read the answer
    // aloud. Rather than present an exercise that can only be guessed at, it is
    // left out, the same way an inapplicable translation is.
    if (exercise.type === "selectPicture" || exercise.type === "pictureToWord") {
        return !screenReader;
    }
    if (exercise.type !== "translateWordBank") return true;
    return hasTranslation(exercise.prompt, locale);
}

/**
 * Order the exercises for one run.
 *
 * Keeps the authored order, but avoids showing the same exercise type twice in
 * a row where another type is available. That is all it does — it is not a cap
 * on how often a type may appear in total. Duolingo limits repeats after
 * learners complained about repetitive runs of one type; a real limit only
 * becomes worth building once lessons are generated rather than hand-written,
 * and this is deliberately the cheap version until then.
 */
export function buildQueue(
    exercises: Exercise[],
    locale: FirstLanguage,
    screenReader = false,
): string[] {
    const remaining = exercises.filter((exercise) =>
        appliesToLearner(exercise, locale, screenReader),
    );
    const ordered: Exercise[] = [];

    while (remaining.length > 0) {
        const previousType = ordered[ordered.length - 1]?.type;
        const index = remaining.findIndex((exercise) => exercise.type !== previousType);
        // Every remaining exercise is the same type as the last one placed; there
        // is nothing to interleave, so keep the authored order.
        ordered.push(...remaining.splice(index === -1 ? 0 : index, 1));
    }

    return ordered.map((exercise) => exercise.id);
}

export function initSession(
    lesson: Lesson,
    locale: FirstLanguage,
    screenReader = false,
): SessionState {
    const queue = buildQueue(lesson.exercises, locale, screenReader);
    return {
        lesson,
        locale,
        screenReader,
        queue,
        position: 0,
        reached: 0,
        phase: queue.length === 0 ? "finished" : "answering",
        draft: null,
        result: null,
        records: {},
        requeued: [],
    };
}

function exerciseById(lesson: Lesson, id: string | undefined): Exercise | undefined {
    return lesson.exercises.find((exercise) => exercise.id === id);
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
    switch (action.type) {
        case "draft":
            if (state.phase !== "answering") return state;
            return { ...state, draft: action.answer };

        case "submit": {
            if (state.phase !== "answering") return state;
            // A submitted answer wins over the draft, but only if it really is
            // an answer; otherwise fall back to what the learner built.
            const answer = isAnswer(action.answer) ? action.answer : state.draft;
            const exercise = exerciseById(state.lesson, state.queue[state.position]);
            if (!answer || !exercise) return state;

            const result = gradeAnswer(state.lesson, exercise, answer);

            // Trying an earlier exercise again: show the grade, record nothing.
            if (isRevisit(state)) return { ...state, phase: "graded", draft: answer, result };

            const previous = state.records[exercise.id];
            const attempts = (previous?.attempts ?? 0) + 1;

            return {
                ...state,
                phase: "graded",
                reached: state.position + 1,
                draft: answer,
                result,
                records: {
                    ...state.records,
                    [exercise.id]: {
                        attempts,
                        // Only a clean first attempt counts. An existing record
                        // means this is a retry, and `firstPassClean: false`
                        // means the exercise passed but not cleanly — a matching
                        // run with a wrong pairing in it.
                        firstTryCorrect:
                            result.correct && !previous && result.firstPassClean !== false,
                    },
                },
                // Re-queue a missed exercise once, at the end, so it comes back after
                // some distance rather than immediately.
                queue:
                    result.correct || state.requeued.includes(exercise.id)
                        ? state.queue
                        : [...state.queue, exercise.id],
                requeued:
                    result.correct || state.requeued.includes(exercise.id)
                        ? state.requeued
                        : [...state.requeued, exercise.id],
            };
        }

        case "next": {
            // An exercise already answered can be passed without answering it again.
            if (state.phase !== "graded" && !(state.phase === "answering" && isRevisit(state))) {
                return state;
            }
            const position = state.position + 1;
            return {
                ...state,
                position,
                phase: position >= state.queue.length ? "finished" : "answering",
                draft: null,
                result: null,
            };
        }

        case "back":
            // From the results, this is the last exercise.
            if (state.position === 0) return state;
            return { ...state, position: state.position - 1, phase: "answering", draft: null, result: null };

        case "restart":
            return initSession(state.lesson, state.locale, state.screenReader);
    }
}

/** Is the exercise on screen one the learner has already answered? */
export function isRevisit(state: SessionState): boolean {
    return state.position < state.reached;
}

export type SessionSummary = {
    /** Distinct exercises in the lesson, ignoring re-queued repeats. */
    total: number;
    /** How many were right the first time they were seen. */
    firstTryCorrect: number;
    /** Exercises that needed a second look. */
    reviewed: number;
    /** Vocabulary terms this run practised. */
    practisedTerms: string[];
    /** Ids of the same vocabulary, for anything that has to look it up again. */
    practisedVocabIds: string[];
    /**
     * Sentences the run actually taught.
     *
     * Only phrases built by an exercise the learner was shown. Listing every
     * phrase in the lesson would promise a learner sentences they never
     * practised — including ones skipped because they do not apply to their
     * language.
     */
    phrases: Phrase[];
};

export function summarize(state: SessionState): SessionSummary {
    // The queue is the run: exercises that do not apply to this learner were
    // never put on it, so counting them would report a score out of a total
    // they never saw. Counting what is queued, rather than asking again what
    // applies, also keeps the score honest for a learner who changed language
    // part-way: every answer on record is for an exercise that is counted.
    const queued = new Set(state.queue);
    const shown = state.lesson.exercises.filter((exercise) => queued.has(exercise.id));
    const total = shown.length;
    const records = Object.values(state.records);
    const firstTryCorrect = records.filter((record) => record.firstTryCorrect).length;

    // Only exercises the learner actually reached. Identical to `shown` at the
    // end of a run, but a summary taken mid-lesson should not credit words from
    // exercises still ahead of them.
    const attempted = shown.filter((exercise) => state.records[exercise.id] !== undefined);
    const practisedIds = new Set(attempted.flatMap((exercise) => exercise.practises));
    const practised = state.lesson.vocab.filter((item) => practisedIds.has(item.id));

    const taughtPhraseIds = new Set(
        attempted.flatMap((exercise) => ("phraseId" in exercise ? [exercise.phraseId] : [])),
    );
    const phrases = state.lesson.phrases.filter((phrase) => taughtPhraseIds.has(phrase.id));

    return {
        total,
        firstTryCorrect,
        reviewed: state.requeued.length,
        practisedTerms: practised.map((item) => item.term),
        practisedVocabIds: practised.map((item) => item.id),
        phrases,
    };
}

/** Session state plus the handlers a screen needs. */
export function useLessonSession(
    lesson: Lesson,
    /** The language the learner reads, which decides which exercises apply. */
    locale: FirstLanguage,
    screenReader = false,
    /** A run saved earlier, to continue instead of starting again. */
    saved?: RunSnapshot,
) {
    // Initialised once; a later language change does not rebuild the queue.
    const [state, dispatch] = useReducer(
        sessionReducer,
        { lesson, locale, screenReader, saved },
        (initial) =>
            (initial.saved &&
                restoreSession(
                    initial.lesson,
                    initial.saved,
                    initial.screenReader,
                    initial.locale,
                )) ||
            initSession(initial.lesson, initial.locale, initial.screenReader),
    );

    const exercise = useMemo(
        () => exerciseById(state.lesson, state.queue[state.position]),
        [state.lesson, state.queue, state.position],
    );

    return {
        state,
        exercise,
        /**
         * 0 to 1, for the progress bar. Never decreases within a run.
         *
         * A graded exercise counts as done while its feedback is still on
         * screen, so the bar moves on the answer rather than waiting for the
         * learner to press Continue. Re-queuing a missed exercise lengthens the
         * queue at the same moment, which slows the bar but cannot rewind it,
         * and stepping back to an earlier exercise leaves it where it was.
         */
        progress: state.queue.length === 0 ? 1 : state.reached / state.queue.length,
        isLastStep: state.position === state.queue.length - 1,
        /** On an exercise already answered, after stepping back. */
        revisiting: isRevisit(state),
        setDraft: useCallback((answer: Answer | null) => dispatch({ type: "draft", answer }), []),
        /**
         * Grade whatever the learner has built. Takes no arguments on purpose:
         * it is wired to a press handler, and an optional first parameter would
         * quietly receive the press event instead.
         */
        submit: useCallback(() => dispatch({ type: "submit" }), []),
        /** Grade an answer handed over by a self-grading exercise such as matching. */
        submitAnswer: useCallback((answer: Answer) => dispatch({ type: "submit", answer }), []),
        next: useCallback(() => dispatch({ type: "next" }), []),
        back: useCallback(() => dispatch({ type: "back" }), []),
        restart: useCallback(() => dispatch({ type: "restart" }), []),
        summary: useMemo(() => summarize(state), [state]),
    };
}
