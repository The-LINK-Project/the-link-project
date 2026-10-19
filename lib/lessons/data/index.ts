/**
 * Lesson catalogue.
 *
 * The single place the app looks up lesson content. Today it returns hand-written
 * lessons; when the API is ready these functions become queries in
 * `lib/queries.ts` and every caller stays the same.
 */

import type { Lesson } from "../types";
import { clinicVisit } from "./clinic-visit";
import { hawkerFood } from "./hawker-food";
import { mrtBasics } from "./mrt-basics";
import { DAILY_MIX_ID, dailyMix } from "./review";
import { workSafety } from "./work-safety";

/** In the order a new learner should take them. */
const LESSONS: Lesson[] = [mrtBasics, hawkerFood, clinicVisit, workSafety];

export function listLessons(): Lesson[] {
    // A copy: this list stands in for an API response, and a caller sorting or
    // filtering it in place must not reorder the catalogue for everyone else.
    return [...LESSONS];
}

/** Today's short practice drawn from every lesson. */
export function getDailyMix(): Lesson {
    return dailyMix(LESSONS);
}

export function getLesson(id: string): Lesson | undefined {
    if (id === DAILY_MIX_ID) return getDailyMix();
    return LESSONS.find((lesson) => lesson.id === id);
}
