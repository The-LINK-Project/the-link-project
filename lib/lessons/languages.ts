/**
 * The languages lesson content can be explained in.
 *
 * Mirrors the mobile app's first-language list, so lesson content, its copy
 * table and the speaking tutor agree on one set of codes. The website's own
 * locales (en, bn, ta, bu, fi, in) are all on it, which is what lets a lesson
 * explain itself in whatever language the site is being read in.
 *
 * English is on the list, last. There is nothing to translate an English word
 * into, and the speaking tutor explains English from another language, so both
 * of those work from `TRANSLATION_LANGUAGES`, which leaves it out.
 */

export const FIRST_LANGUAGES = [
    "bn",
    "ta",
    "hi",
    "te",
    "ml",
    "bu",
    "fi",
    "in",
    "ms",
    "zh",
    "th",
    "vi",
    "fr",
    "es",
    "en",
] as const;

export type FirstLanguage = (typeof FIRST_LANGUAGES)[number];

/** A language English can be translated into and explained from. */
export type TranslationLanguage = Exclude<FirstLanguage, "en">;

export const TRANSLATION_LANGUAGES = FIRST_LANGUAGES.filter(
    (language): language is TranslationLanguage => language !== "en",
);

export function isFirstLanguage(value: unknown): value is FirstLanguage {
    return typeof value === "string" && (FIRST_LANGUAGES as readonly string[]).includes(value);
}

export function isTranslationLanguage(value: unknown): value is TranslationLanguage {
    return isFirstLanguage(value) && value !== "en";
}

/** What each language calls itself. A learner finds their own name fastest. */
export const FIRST_LANGUAGE_LABELS: Record<FirstLanguage, string> = {
    bn: "বাংলা",
    ta: "தமிழ்",
    hi: "हिन्दी",
    te: "తెలుగు",
    ml: "മലയാളം",
    bu: "မြန်မာ",
    fi: "Filipino",
    in: "Bahasa Indonesia",
    ms: "Bahasa Melayu",
    zh: "中文",
    th: "ไทย",
    vi: "Tiếng Việt",
    fr: "Français",
    es: "Español",
    en: "English",
};

/** For the secondary line under a language's own name. */
export const FIRST_LANGUAGE_ENGLISH_NAMES: Record<FirstLanguage, string> = {
    bn: "Bengali",
    ta: "Tamil",
    hi: "Hindi",
    te: "Telugu",
    ml: "Malayalam",
    bu: "Burmese",
    fi: "Filipino",
    in: "Indonesian",
    ms: "Malay",
    zh: "Chinese (Simplified)",
    th: "Thai",
    vi: "Vietnamese",
    fr: "French",
    es: "Spanish",
    en: "English",
};
