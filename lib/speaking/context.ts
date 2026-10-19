/**
 * What one speaking session practises, and the English the tutor may use.
 *
 * Speaking goals are built from the run: a learner is only asked to say a
 * sentence an exercise actually taught them. The tutor's vocabulary comes
 * from `lesson.vocab`, which is the exact list shown on the lesson intro, so it
 * may reuse every word the learner was introduced to without inventing new
 * English.
 */

import type { TutorTurnRequest } from "./types";
import { TRANSLATION_LANGUAGES } from "@/lib/lessons/languages";
import { localized } from "@/lib/lessons/localized";
import { phraseById, vocabByIds } from "@/lib/lessons/lookup";
import type { Lesson, Localized, SpeakingGoal } from "@/lib/lessons/types";

export type TutorLanguage = TutorTurnRequest["language"];

/**
 * Languages the tutor teaches from. Where one is written in a script of its
 * own, the server picks out every English word the tutor wrote and checks it
 * was taught; for those in Latin letters (French and Spanish among them) it
 * cannot tell the two apart, and the instructions alone hold the tutor to the
 * lesson's words. English is not one of them: the tutor explains English from
 * another language.
 */
export const TUTOR_LANGUAGES: readonly TutorLanguage[] = TRANSLATION_LANGUAGES;

/** What a finished run covered. */
export type PractisedRun = { vocabIds: string[]; phraseIds: string[] };

export type SpeakingContext = Omit<
    TutorTurnRequest,
    "goalIndex" | "attempt" | "asides" | "history" | "audio"
>;

function goalContent(
    lesson: Lesson,
    goal: SpeakingGoal,
): { target: string; meaning: Localized } | undefined {
    if (goal.phraseId !== undefined) {
        const phrase = phraseById(lesson, goal.phraseId);
        return phrase && { target: phrase.text, meaning: phrase.meaning };
    }
    const [item] = vocabByIds(lesson, [goal.vocabId]);
    return item && { target: item.term, meaning: item.meaning };
}

function wasTaught(goal: SpeakingGoal, run: PractisedRun): boolean {
    return goal.phraseId !== undefined
        ? run.phraseIds.includes(goal.phraseId)
        : run.vocabIds.includes(goal.vocabId);
}

/** Null when nothing in this run can be practised aloud in `language`. */
export function buildSpeakingContext(
    lesson: Lesson,
    run: PractisedRun,
    language: TutorLanguage,
): SpeakingContext | null {
    const practice = lesson.speaking;
    if (!practice) return null;

    const goals = practice.goals.flatMap((goal) => {
        const content = wasTaught(goal, run) ? goalContent(lesson, goal) : undefined;
        // The meaning is what the tutor asks for, and its line of last resort.
        // Falling back to English would be exactly the English this avoids.
        if (!content) return [];
        return [
            {
                id: goal.id,
                target: content.target,
                keywords: goal.keywords,
                // Every tutor language has the meaning in that language: three
                // are authored in the lesson and the rest come from the lesson
                // copy table, which a test keeps complete. Sending the English
                // target here instead would hand the learner the answer as the
                // question, and as the tutor's line of last resort.
                ask: localized(content.meaning, language),
            },
        ];
    });
    if (goals.length === 0) return null;

    return {
        language,
        scene: practice.scene,
        // This is intentionally the same list, in the same order, as
        // LessonIntro. Even if an exercise did not happen to drill a word, the
        // learner already met it before starting the lesson.
        words: lesson.vocab.map((item) => item.term),
        phrases: lesson.phrases
            .filter((phrase) => run.phraseIds.includes(phrase.id))
            .map((phrase) => phrase.text),
        names: practice.names,
        goals,
    };
}

export function practiceLanguages(lesson: Lesson, run: PractisedRun): TutorLanguage[] {
    return TUTOR_LANGUAGES.filter((language) => buildSpeakingContext(lesson, run, language));
}

/** Whether a finished lesson has anything to say aloud, taking every exercise as done. */
export function canPractiseSpeaking(lesson: Lesson): boolean {
    return practiceLanguages(lesson, runFromParams(lesson, {})).length > 0;
}

/** Route params can only carry strings. */
export function runToParams(run: PractisedRun) {
    return { words: run.vocabIds.join(","), phrases: run.phraseIds.join(",") };
}

export function runFromParams(
    lesson: Lesson,
    params: { words?: string; phrases?: string },
): PractisedRun {
    // Opened without a run, from a deep link or a restored stack: treat every
    // exercise as done rather than refusing to practise.
    if (params.words === undefined && params.phrases === undefined) {
        return {
            vocabIds: [...new Set(lesson.exercises.flatMap((exercise) => exercise.practises))],
            phraseIds: lesson.exercises.flatMap((exercise) =>
                "phraseId" in exercise ? [exercise.phraseId] : [],
            ),
        };
    }
    const ids = (value?: string) => (value ? value.split(",").filter(Boolean) : []);
    return { vocabIds: ids(params.words), phraseIds: ids(params.phrases) };
}
