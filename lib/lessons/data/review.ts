/**
 * The daily mix: a short run of exercises drawn from every lesson.
 *
 * Built rather than authored. Every exercise keeps its own lesson's vocabulary
 * and phrases, so the mix carries all of them; ids are unique across lessons,
 * which the content test enforces. The pick is seeded by the date, so the mix
 * is the same all day and different tomorrow, and a learner who quits halfway
 * can start the same mix again.
 */

import { seededShuffle } from "../shuffle";
import type { Lesson } from "../types";

export const DAILY_MIX_ID = "daily-mix";
/** Long enough to feel like practice, short enough for a bus ride. */
const MIX_SIZE = 8;

/** The local calendar date, so the mix changes at the learner's midnight. */
function daySeed(now: Date): string {
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function buildDailyMix(lessons: Lesson[], now: Date): Lesson {
    const seed = daySeed(now);
    const pool = lessons.flatMap((lesson) => lesson.exercises);
    return {
        id: DAILY_MIX_ID,
        title: {
            en: "Daily mix",
            bn: "আজকের মিশ্র অনুশীলন",
            ta: "இன்றைய கலவை",
            hi: "आज का मिक्स",
        },
        goal: {
            en: "A quick practice with words from every lesson. New every day.",
            bn: "সব পাঠের শব্দ নিয়ে ছোট অনুশীলন। প্রতিদিন নতুন।",
            ta: "எல்லா பாடங்களின் சொற்களுடன் ஒரு சிறிய பயிற்சி. ஒவ்வொரு நாளும் புதியது.",
            hi: "हर पाठ के शब्दों के साथ छोटा अभ्यास। हर दिन नया।",
        },
        icon: "mix",
        level: "beginner",
        estimatedMinutes: 4,
        notes: [],
        vocab: lessons.flatMap((lesson) => lesson.vocab),
        phrases: lessons.flatMap((lesson) => lesson.phrases),
        exercises: seededShuffle(pool, `daily-mix-${seed}`).slice(0, MIX_SIZE),
    };
}

let cached: { seed: string; lessons: Lesson[]; lesson: Lesson } | undefined;

/**
 * Today's mix, the same object for the whole day so screens that key on lesson
 * identity do not rebuild their tiles on every render.
 */
export function dailyMix(lessons: Lesson[], now: Date = new Date()): Lesson {
    const seed = daySeed(now);
    if (!cached || cached.seed !== seed || cached.lessons !== lessons) {
        cached = { seed, lessons, lesson: buildDailyMix(lessons, now) };
    }
    return cached.lesson;
}
