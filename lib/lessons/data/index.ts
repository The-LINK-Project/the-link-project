/**
 * Lesson catalogue.
 *
 * The single place the app looks up lesson content. Today it returns hand-written
 * lessons; when the API is ready these functions become queries in
 * `lib/queries.ts` and every caller stays the same.
 */

import type { Lesson } from "../types";
import { aiBasics } from "./ai-basics";
import { clinicVisit } from "./clinic-visit";
import { hawkerFood } from "./hawker-food";
import { mrtBasics } from "./mrt-basics";
import { DAILY_MIX_ID, dailyMix } from "./review";
import { workSafety } from "./work-safety";

/** The English lessons, in the order a new learner should take them. */
const LESSONS: Lesson[] = [mrtBasics, hawkerFood, clinicVisit, workSafety];

/**
 * Lessons for the workshops we run, shown above the English lessons on Home.
 * Add or remove one here as workshops come and go. They are kept out of the
 * daily mix and the lessons-done count, which are about the English lessons.
 */
const WORKSHOP_LESSONS: Lesson[] = [aiBasics];

/** Whether a lesson is one of the workshop lessons above. */
export function isWorkshopLesson(id: string): boolean {
    return WORKSHOP_LESSONS.some((lesson) => lesson.id === id);
}

export function listLessons(): Lesson[] {
    // A copy: this list stands in for an API response, and a caller sorting or
    // filtering it in place must not reorder the catalogue for everyone else.
    return [...LESSONS];
}

export function listWorkshopLessons(): Lesson[] {
    return [...WORKSHOP_LESSONS];
}

/** Today's short practice drawn from every lesson. */
export function getDailyMix(): Lesson {
    return dailyMix(LESSONS);
}

export function getLesson(id: string): Lesson | undefined {
    if (id === DAILY_MIX_ID) return getDailyMix();
    return [...LESSONS, ...WORKSHOP_LESSONS].find((lesson) => lesson.id === id);
}
