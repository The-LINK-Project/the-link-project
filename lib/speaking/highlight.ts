import type { TutorTurnRequest } from "./types";

/**
 * Picking the English out of a tutor's line, so it can be shown in colour.
 *
 * In a language with a script of its own, every run of Latin letters is
 * English. In one written in Latin letters that rule paints the whole line, and
 * stops at the first accent (French "répondrez" came out half green). Those
 * languages instead mark only the English the lesson taught, which is all the
 * tutor is told it may use.
 *
 * The same file is in the mobile app. It uses no lookbehind and no Unicode
 * property escapes, so it runs the same on every engine either app meets.
 */

/** A run of English words, kept together across the spaces between them. */
const ENGLISH_RUN = /([A-Za-z][A-Za-z'’ ]*[A-Za-z]|[A-Za-z])/;

/** The same set as `LATIN_SCRIPT_LANGUAGES` in `tutor.ts`, which is server-only. */
const LATIN_SCRIPT = new Set<string>(["fi", "in", "ms", "vi", "fr", "es"]);

type Lexicon = Pick<TutorTurnRequest, "language" | "words" | "phrases" | "names" | "goals">;

/** Splits a line into plain and English parts: English at the odd indices. */
export type EnglishSplitter = (text: string) => string[];

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A letter of any Latin-script language, accents and apostrophes included. */
function isWordChar(char: string | undefined): boolean {
    if (!char) return false;
    return char.toLowerCase() !== char.toUpperCase() || /[\u0300-\u036f'’]/.test(char);
}

export function englishSplitter(lexicon: Lexicon | null): EnglishSplitter {
    if (!lexicon || !LATIN_SCRIPT.has(lexicon.language)) return (text) => text.split(ENGLISH_RUN);

    const terms = [
        ...lexicon.phrases,
        ...lexicon.words,
        ...lexicon.names,
        ...lexicon.goals.flatMap((goal) => [goal.target, ...goal.keywords]),
    ]
        .map((term) => term.trim().replace(/[.,!?]+$/, ""))
        .filter(Boolean);
    if (terms.length === 0) return (text) => [text];

    // Longest first, so a phrase wins over a word inside it.
    const alternatives = [...new Set(terms.map((term) => term.toLowerCase()))]
        .sort((a, b) => b.length - a.length)
        .map((term) => escape(term).replace(/\s+/g, "\\s+").replace(/['’]/g, "['’]"));
    const source = `(?:${alternatives.join("|")})`;

    return (text) => {
        const pattern = new RegExp(source, "gi");
        const parts: string[] = [];
        let last = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(text)) !== null) {
            const start = match.index;
            const end = start + match[0].length;
            // Whole words only: "top up" inside "stop upstairs" is not English.
            if (isWordChar(text[start - 1]) || isWordChar(text[end])) {
                pattern.lastIndex = start + 1;
                continue;
            }
            parts.push(text.slice(last, start), match[0]);
            last = end;
        }
        parts.push(text.slice(last));
        return parts;
    };
}
