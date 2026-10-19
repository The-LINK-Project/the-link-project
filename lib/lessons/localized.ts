import { useLocale } from "next-intl";

import { isContentLanguage, LESSON_CONTENT_COPY } from "./contentCopy";
import { isFirstLanguage, type FirstLanguage } from "./languages";
import type { LearnerLanguage, Localized } from "./types";

/**
 * Languages lesson content is authored in. Listed rather than derived, so
 * adding one is a deliberate edit in one place.
 */
function isTranslated(language: string): language is Exclude<LearnerLanguage, "en"> {
    return language === "bn" || language === "ta" || language === "hi";
}

/**
 * Resolve lesson content into one language.
 *
 * Lesson content is authored in English, Bengali, Tamil and Hindi. The other
 * languages are served from `LESSON_CONTENT_COPY`, keyed by the English.
 * Anything still missing falls back to English rather than showing an empty
 * string.
 *
 * Pure, and takes the language explicitly. Components should use
 * `useLessonLocalized` instead; this form is for grading and anything outside React.
 */
export function localized(value: Localized, language: string): string {
    if (isTranslated(language)) {
        const translated = value[language];
        if (translated) return translated;
    }
    if (isContentLanguage(language)) {
        const translated = LESSON_CONTENT_COPY[language][value.en];
        if (translated) return translated;
    }
    return value.en;
}

/**
 * Is this content actually written in the learner's language?
 *
 * Distinct from `localized`, which always returns something: for a language
 * with no content authored it returns the English fallback. Deciding whether a
 * translation exercise can teach anything must ask this instead of comparing
 * strings.
 */
export function hasTranslation(value: Localized, language: string): boolean {
    // English is the fallback, so it is never a translation of itself.
    if (isTranslated(language)) return Boolean(value[language]);
    return isContentLanguage(language) && Boolean(LESSON_CONTENT_COPY[language][value.en]);
}

/**
 * The language lessons explain themselves in: the language the site is being
 * read in. English is the subject of the lesson; this is what explains it.
 */
export function useLearnerLanguage(): FirstLanguage {
    const locale = useLocale();
    return isFirstLanguage(locale) ? locale : "en";
}

/**
 * Resolve lesson content in the learner's language. Components use this rather
 * than calling `localized` with a language read once, so a change of language
 * re-renders them.
 */
export function useLessonLocalized() {
    const language = useLearnerLanguage();
    return (value: Localized) => localized(value, language);
}
