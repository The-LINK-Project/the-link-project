/**
 * What the app remembers about a learner's learning.
 *
 * Two kinds of thing, kept apart on purpose:
 *
 * - `Progress` is what was finished: which lessons, how well, and whether they
 *   were said aloud. It is small, it only ever grows, and it is what gets
 *   copied to the server so a new phone starts where the old one stopped.
 *   A lesson has two stages, the exercises and then the talk with the tutor,
 *   and it is done when both are: see `lessonStatus`.
 * - A saved run or talk is where the learner is *right now* inside one lesson.
 *   It stays on the phone. It is only worth anything for a little while, and a
 *   half-built answer is not something a second device should inherit.
 *
 * Everything here is pure, so the rules can be tested without storage.
 */

import type { ConversationState } from "@/lib/speaking/conversation";
import type { SpeakingContext } from "@/lib/speaking/context";
import type { ExerciseRecord } from "@/lib/lessons/session";

export type SpeakingRecord = {
    completedAt: string;
    /** Goals the learner said themselves, out of `total`, on their best talk. */
    said: number;
    total: number;
};

export type LessonRecord = {
    /** When the lesson was last finished. ISO 8601. */
    completedAt: string;
    /** Times the lesson has been finished. */
    runs: number;
    /** Best count of exercises right on the first try, out of `total`. */
    bestFirstTry: number;
    total: number;
    speaking?: SpeakingRecord;
};

export type Progress = { lessons: Record<string, LessonRecord> };

/** A lesson run in flight. Mirrors the session state, minus the lesson itself. */
export type SavedRun = {
    /** The exercises this run was built from. A changed lesson discards the run. */
    fingerprint: string;
    locale: string;
    screenReader: boolean;
    queue: string[];
    position: number;
    records: Record<string, ExerciseRecord>;
    requeued: string[];
    savedAt: string;
};

/** A talk with the tutor in flight. The tutor's audio is not kept, only the words. */
export type SavedTalk = {
    context: SpeakingContext;
    state: ConversationState;
    savedAt: string;
};

/** Where the learner was when the app last went away, for reopening there. */
export type ResumePoint = { href: string; at: string };

export type ProgressData = {
    version: 1;
    progress: Progress;
    runs: Record<string, SavedRun>;
    talks: Record<string, SavedTalk>;
    resume: ResumePoint | null;
};

/** A half-finished lesson is still worth continuing two weeks on. */
export const RUN_TTL_MS = 14 * 24 * 60 * 60 * 1000;
/** A conversation is not: by tomorrow nobody remembers what was being asked. */
export const TALK_TTL_MS = 24 * 60 * 60 * 1000;
/**
 * Reopen the app inside the lesson only if it went away moments ago, which is
 * what it looks like when the phone closes the app behind a phone call. Later
 * than this, Home with a Continue card is the less surprising place to land.
 */
export const RESUME_TTL_MS = 30 * 60 * 1000;

export function emptyData(): ProgressData {
    return { version: 1, progress: { lessons: {} }, runs: {}, talks: {}, resume: null };
}

const LESSON_ID = /^[a-z0-9-]{1,64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function count(value: unknown, max = 10_000): number | undefined {
    return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= max
        ? value
        : undefined;
}

function isoDate(value: unknown): string | undefined {
    if (typeof value !== "string" || Number.isNaN(Date.parse(value))) return undefined;
    return new Date(value).toISOString();
}

function readSpeaking(value: unknown): SpeakingRecord | undefined {
    if (!isRecord(value)) return undefined;
    const completedAt = isoDate(value.completedAt);
    const said = count(value.said);
    const total = count(value.total);
    if (!completedAt || said === undefined || total === undefined || said > total) return undefined;
    return { completedAt, said, total };
}

/**
 * Progress from outside the app's own memory: a file on disk, or the server.
 * Anything that does not look right is dropped rather than trusted, so a bad
 * record costs one lesson's tick and not the whole screen.
 */
export function readProgress(value: unknown): Progress {
    const lessons: Record<string, LessonRecord> = {};
    const source = isRecord(value) && isRecord(value.lessons) ? value.lessons : {};
    for (const [id, raw] of Object.entries(source)) {
        if (!LESSON_ID.test(id) || !isRecord(raw)) continue;
        const completedAt = isoDate(raw.completedAt);
        const runs = count(raw.runs);
        const bestFirstTry = count(raw.bestFirstTry);
        const total = count(raw.total);
        if (!completedAt || !runs || bestFirstTry === undefined || total === undefined) continue;
        if (bestFirstTry > total) continue;
        const speaking = readSpeaking(raw.speaking);
        lessons[id] = { completedAt, runs, bestFirstTry, total, ...(speaking ? { speaking } : {}) };
    }
    return { lessons };
}

function readRun(value: unknown): SavedRun | undefined {
    if (!isRecord(value)) return undefined;
    const { fingerprint, locale, screenReader, queue, position, records, requeued } = value;
    const savedAt = isoDate(value.savedAt);
    const strings = (list: unknown): list is string[] =>
        Array.isArray(list) && list.every((item) => typeof item === "string");
    if (
        typeof fingerprint !== "string" ||
        typeof locale !== "string" ||
        typeof screenReader !== "boolean" ||
        !strings(queue) ||
        !strings(requeued) ||
        count(position) === undefined ||
        !isRecord(records) ||
        !savedAt
    ) {
        return undefined;
    }
    const kept: Record<string, ExerciseRecord> = {};
    for (const [id, record] of Object.entries(records)) {
        if (!isRecord(record)) return undefined;
        const attempts = count(record.attempts);
        if (!attempts || typeof record.firstTryCorrect !== "boolean") return undefined;
        kept[id] = { attempts, firstTryCorrect: record.firstTryCorrect };
    }
    return {
        fingerprint,
        locale,
        screenReader,
        queue,
        position: position as number,
        records: kept,
        requeued,
        savedAt,
    };
}

function readTalk(value: unknown): SavedTalk | undefined {
    if (!isRecord(value) || !isRecord(value.context) || !isRecord(value.state)) return undefined;
    const savedAt = isoDate(value.savedAt);
    const state = value.state as Partial<ConversationState>;
    const context = value.context as Partial<SpeakingContext>;
    if (
        !savedAt ||
        !Array.isArray(state.messages) ||
        !Array.isArray(state.results) ||
        !Array.isArray(context.goals) ||
        count(state.goalIndex) === undefined ||
        state.goalCount !== context.goals.length
    ) {
        return undefined;
    }
    return {
        context: value.context as SpeakingContext,
        state: value.state as ConversationState,
        savedAt,
    };
}

/** Everything the phone kept, read back defensively and with the stale parts gone. */
export function readData(value: unknown, now: Date = new Date()): ProgressData {
    const data = emptyData();
    if (!isRecord(value) || value.version !== 1) return data;
    data.progress = readProgress(value.progress);

    const fresh = (savedAt: string, ttl: number) => now.getTime() - Date.parse(savedAt) < ttl;
    for (const [id, raw] of Object.entries(isRecord(value.runs) ? value.runs : {})) {
        const run = readRun(raw);
        if (run && LESSON_ID.test(id) && fresh(run.savedAt, RUN_TTL_MS)) data.runs[id] = run;
    }
    for (const [id, raw] of Object.entries(isRecord(value.talks) ? value.talks : {})) {
        const talk = readTalk(raw);
        if (talk && LESSON_ID.test(id) && fresh(talk.savedAt, TALK_TTL_MS)) data.talks[id] = talk;
    }
    if (isRecord(value.resume) && typeof value.resume.href === "string") {
        const at = isoDate(value.resume.at);
        if (at && fresh(at, RESUME_TTL_MS)) data.resume = { href: value.resume.href, at };
    }
    return data;
}

function later(a: string, b: string): string {
    return Date.parse(a) >= Date.parse(b) ? a : b;
}

/**
 * The better of two results, each `got` out of `total`. Equal shares are
 * settled by the numbers themselves and never by which side was passed first,
 * or the phone and the server would each keep their own copy and swap them on
 * every sync.
 */
function better<T>(a: T, b: T, score: (value: T) => { got: number; total: number }): T {
    const [x, y] = [score(a), score(b)];
    const share = x.got / Math.max(x.total, 1) - y.got / Math.max(y.total, 1);
    if (share !== 0) return share > 0 ? a : b;
    if (x.total !== y.total) return x.total > y.total ? a : b;
    return x.got >= y.got ? a : b;
}

function mergeSpeaking(a?: SpeakingRecord, b?: SpeakingRecord): SpeakingRecord | undefined {
    if (!a || !b) return a ?? b;
    // The better talk is the one worth showing; the date is simply the latest.
    const best = better(a, b, (talk) => ({ got: talk.said, total: talk.total }));
    return { said: best.said, total: best.total, completedAt: later(a.completedAt, b.completedAt) };
}

/**
 * Two copies of a learner's progress, from the phone and from the server, made
 * into one. Nothing is ever taken away: a lesson finished anywhere is finished,
 * and the best result stands. The same two inputs give the same answer in
 * either order, so it does not matter which side merges.
 */
export function mergeProgress(a: Progress, b: Progress): Progress {
    const lessons: Record<string, LessonRecord> = { ...a.lessons };
    for (const [id, theirs] of Object.entries(b.lessons)) {
        const ours = lessons[id];
        if (!ours) {
            lessons[id] = theirs;
            continue;
        }
        const best = better(ours, theirs, (lesson) => ({
            got: lesson.bestFirstTry,
            total: lesson.total,
        }));
        const speaking = mergeSpeaking(ours.speaking, theirs.speaking);
        lessons[id] = {
            completedAt: later(ours.completedAt, theirs.completedAt),
            runs: Math.max(ours.runs, theirs.runs),
            bestFirstTry: best.bestFirstTry,
            total: best.total,
            ...(speaking ? { speaking } : {}),
        };
    }
    return { lessons };
}

export function sameProgress(a: Progress, b: Progress): boolean {
    return JSON.stringify(sortKeys(a.lessons)) === JSON.stringify(sortKeys(b.lessons));
}

function sortKeys(lessons: Record<string, LessonRecord>) {
    return Object.keys(lessons)
        .sort()
        .map((id) => {
            const { completedAt, runs, bestFirstTry, total, speaking } = lessons[id];
            return [
                id,
                completedAt,
                runs,
                bestFirstTry,
                total,
                speaking?.completedAt,
                speaking?.said,
                speaking?.total,
            ];
        });
}

export function withLessonDone(
    progress: Progress,
    lessonId: string,
    result: { firstTryCorrect: number; total: number },
    now: Date = new Date(),
): Progress {
    const done: LessonRecord = {
        completedAt: now.toISOString(),
        runs: 1,
        bestFirstTry: result.firstTryCorrect,
        total: result.total,
    };
    const previous = progress.lessons[lessonId];
    const merged = previous
        ? mergeProgress({ lessons: { [lessonId]: previous } }, { lessons: { [lessonId]: done } })
              .lessons[lessonId]
        : done;
    return {
        lessons: {
            ...progress.lessons,
            [lessonId]: { ...merged, runs: (previous?.runs ?? 0) + 1 },
        },
    };
}

export function withSpeakingDone(
    progress: Progress,
    lessonId: string,
    result: { said: number; total: number },
    now: Date = new Date(),
): Progress {
    const stamp = now.toISOString();
    // Speaking can be reached without the lesson's exercises on record (a talk
    // opened from a link). Saying the sentences aloud is the harder half, so it
    // is never thrown away for want of the easier one.
    const lesson: LessonRecord = progress.lessons[lessonId] ?? {
        completedAt: stamp,
        runs: 1,
        bestFirstTry: 0,
        total: 0,
    };
    const speaking = mergeSpeaking(lesson.speaking, { completedAt: stamp, ...result });
    return { lessons: { ...progress.lessons, [lessonId]: { ...lesson, speaking } } };
}

/**
 * Where a lesson stands for this learner, as the Home screen shows it.
 *
 * A lesson is two stages: the exercises, then saying it aloud with the tutor.
 * The talk is not an extra. The exercises teach what the words mean, and the
 * lesson exists so that they get said, so a lesson whose talk is still to come
 * is a lesson in progress and not a lesson done.
 *
 * What has been finished is kept apart from what is in flight, and is only
 * ever added to: a learner who opens a finished lesson to go through it again
 * has not unlearned it, so its tick stays while the new run is part-way through.
 */
export type LessonStatus = {
    /**
     * - `none`: no stage finished.
     * - `learned`: exercises finished, the talk still to do.
     * - `done`: every stage the lesson has. For a lesson with nothing to say
     *   aloud, that is the exercises alone.
     */
    finished: "none" | "learned" | "done";
    /** A run in flight: `done` of `total` exercises are behind them. */
    run: { done: number; total: number } | null;
    /** A talk in flight: `done` of `total` sentences are behind them. */
    talk: { done: number; total: number } | null;
};

/** The one word for it: what colour the lesson is on Home. */
export type LessonStage = "new" | "progress" | "done";

export function lessonStage(status: LessonStatus): LessonStage {
    if (status.finished === "done") return "done";
    return status.finished === "learned" || status.run || status.talk ? "progress" : "new";
}

/** A run somebody can actually come back to. */
function liveRun(data: ProgressData, lessonId: string, fingerprint: string): SavedRun | undefined {
    const run = data.runs[lessonId];
    // A run built from other exercises (yesterday's daily mix, or a lesson that
    // has since been edited) will be thrown away on opening, so it must not be
    // advertised as something to continue.
    if (!run || run.fingerprint !== fingerprint) return undefined;
    return run.position > 0 && run.position < run.queue.length ? run : undefined;
}

/** A talk somebody can actually come back to. */
function liveTalk(data: ProgressData, lessonId: string): SavedTalk | undefined {
    const talk = data.talks[lessonId];
    return talk && talk.state.phase !== "finished" && talk.state.messages.length > 0
        ? talk
        : undefined;
}

/** What Home needs to know about a lesson that exists now. */
export type LessonRef = {
    id: string;
    /** Of the lesson as it is now; see `fingerprint` in the lesson session. */
    fingerprint: string;
    /** Whether the lesson has a talk with the tutor as its second stage. */
    speakable: boolean;
};

export function lessonStatus(data: ProgressData, lesson: LessonRef): LessonStatus {
    const run = liveRun(data, lesson.id, lesson.fingerprint);
    const talk = liveTalk(data, lesson.id);
    const record = data.progress.lessons[lesson.id];
    return {
        finished: !record ? "none" : record.speaking || !lesson.speakable ? "done" : "learned",
        run: run ? { done: run.position, total: run.queue.length } : null,
        talk:
            talk && lesson.speakable
                ? { done: talk.state.results.length, total: talk.state.goalCount }
                : null,
    };
}

/** The unfinished thing most recently worked on, for the Continue card. */
export type ContinuePoint =
    | { kind: "lesson"; lessonId: string; done: number; total: number }
    | { kind: "talk"; lessonId: string; done: number; total: number }
    /** Exercises finished and the talk not yet begun: the lesson is half done. */
    | { kind: "speak"; lessonId: string };

export function continuePoint(data: ProgressData, lessons: LessonRef[]): ContinuePoint | null {
    let best: { at: number; point: ContinuePoint } | null = null;
    const offer = (savedAt: string, point: ContinuePoint) => {
        const at = Date.parse(savedAt);
        if (!best || at > best.at) best = { at, point };
    };
    for (const { id, fingerprint, speakable } of lessons) {
        const run = liveRun(data, id, fingerprint);
        if (run) {
            offer(run.savedAt, {
                kind: "lesson",
                lessonId: id,
                done: run.position,
                total: run.queue.length,
            });
        }
        const talk = liveTalk(data, id);
        if (talk) {
            offer(talk.savedAt, {
                kind: "talk",
                lessonId: id,
                done: talk.state.results.length,
                total: talk.state.goalCount,
            });
        }
        const record = data.progress.lessons[id];
        if (speakable && record && !record.speaking && !talk) {
            offer(record.completedAt, { kind: "speak", lessonId: id });
        }
    }
    return (best as { at: number; point: ContinuePoint } | null)?.point ?? null;
}

/** Finished today, by the learner's own calendar. For the daily mix. */
export function doneToday(record: LessonRecord | undefined, now: Date = new Date()): boolean {
    if (!record) return false;
    const done = new Date(record.completedAt);
    return (
        done.getFullYear() === now.getFullYear() &&
        done.getMonth() === now.getMonth() &&
        done.getDate() === now.getDate()
    );
}
