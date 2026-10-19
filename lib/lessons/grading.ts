/**
 * Answer grading.
 *
 * The product goal is being understood, not textbook grammar. A learner who
 * says "I want top up ten dollar" has communicated successfully and is marked
 * correct. So the default for any produced sentence is keyword matching:
 * required words must be present, but order, articles, filler words and small
 * spelling slips are all forgiven.
 *
 * This module is pure and has no React or platform dependency, which is what
 * lets the same rules grade a spoken transcript later without changes.
 */

import { phraseById } from "./lookup";
import type { Answer, Exercise, GradeResult, Lesson, SentenceGradingRule } from "./types";

/**
 * Words never required for an answer to count. Includes the Singapore spoken
 * particles, which learners pick up early and which carry no meaning here.
 */
const IGNORED_WORDS = new Set([
    "a",
    "an",
    "the",
    "please",
    "sir",
    "madam",
    "ah",
    "lah",
    "lor",
    "hor",
    "uh",
    "um",
    "er",
]);

/**
 * Lowercase, strip punctuation, collapse whitespace.
 *
 * Combining marks (`\p{M}`) must be kept alongside letters. Bengali and Tamil
 * carry vowel signs and nuktas in that category, so dropping them turns
 * "ভাড়া" into "ভ ড" and would silently mangle every non-Latin answer.
 */
export function normalize(input: string): string {
    return input
        .toLowerCase()
        .normalize("NFC")
        .replace(/[^\p{L}\p{N}\p{M}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/** Normalized words with the ignorable ones removed. */
export function meaningfulWords(input: string, ignore: Set<string> = IGNORED_WORDS): string[] {
    return normalize(input)
        .split(" ")
        .filter((word) => word.length > 0 && !ignore.has(word));
}

/** Levenshtein distance, capped early once it exceeds `max`. */
function editDistance(a: string, b: string, max: number): number {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > max) return max + 1;

    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        let rowBest = i;
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
            rowBest = Math.min(rowBest, current[j]);
        }
        // Every remaining row can only add to the best value in this one.
        if (rowBest > max) return max + 1;
        previous = current;
    }
    return previous[b.length];
}

/**
 * How much misspelling to forgive in one word. Short words get no slack,
 * because "in" and "out" must stay distinguishable from each other.
 */
function allowedSlips(word: string): number {
    if (word.length >= 8) return 2;
    if (word.length >= 5) return 1;
    return 0;
}

function wordsMatch(spoken: string, expected: string): boolean {
    const max = allowedSlips(expected);
    return max === 0 ? spoken === expected : editDistance(spoken, expected, max) <= max;
}

/**
 * Is `keyword` present in `words`? Multi-word keywords such as "top up" must
 * appear as a contiguous run so "top" alone does not satisfy them.
 */
function containsKeyword(words: string[], keyword: string): boolean {
    const expected = meaningfulWords(keyword);
    if (expected.length === 0) return true;

    for (let start = 0; start + expected.length <= words.length; start++) {
        if (expected.every((part, offset) => wordsMatch(words[start + offset], part))) return true;
    }
    return false;
}

/** Which of `keywords` are missing from the learner's answer. */
export function missingKeywords(answer: string, keywords: string[], ignore?: string[]): string[] {
    const ignored = ignore ? new Set([...IGNORED_WORDS, ...ignore.map(normalize)]) : IGNORED_WORDS;
    const words = meaningfulWords(answer, ignored);
    return keywords.filter((keyword) => !containsKeyword(words, keyword));
}

/**
 * Content words in an answer that do not belong in the model sentence.
 *
 * Keyword grading deliberately allows learners to omit optional grammar and
 * rearrange the sentence. It must not, however, make the word bank's decoy
 * tiles meaningless: adding "exit" to a platform question changes the answer.
 * Match as a multiset so repeating a valid word is also caught, while the same
 * small spelling tolerance used by keyword matching remains available.
 */
export function unexpectedWords(answer: string, target: string, ignore?: string[]): string[] {
    const ignored = ignore ? new Set([...IGNORED_WORDS, ...ignore.map(normalize)]) : IGNORED_WORDS;
    const available = meaningfulWords(target, ignored);
    const unexpected: string[] = [];

    for (const word of meaningfulWords(answer, ignored)) {
        const match = available.findIndex((expected) => wordsMatch(word, expected));
        if (match === -1) unexpected.push(word);
        else available.splice(match, 1);
    }
    return unexpected;
}

/** The model answer string for an exercise, used in feedback. */
function modelAnswerFor(lesson: Lesson, exercise: Exercise): string {
    switch (exercise.type) {
        case "arrangeWords":
        case "listenArrangeWords":
        case "translateWordBank":
            return phraseById(lesson, exercise.phraseId)?.text ?? "";
        case "fillBlank":
            return (
                exercise.choices.find((choice) => choice.id === exercise.correctChoiceId)?.label ??
                ""
            );
        case "dialogueChoice":
            // The reply stays marked on its tile; the sentence is repeated here
            // so the footer can show it to a learner who chose wrongly.
            return phraseById(lesson, exercise.phraseId)?.text ?? "";
        case "listenChooseMeaning":
            return exercise.audioText;
        case "selectPicture":
        case "pictureToWord":
            // The word is already the prompt, on screen throughout. Repeating it
            // as a "correct solution" would tell the learner nothing; the tile
            // they should have picked is marked instead.
            return "";
        case "matchPairs":
            // Nothing useful to show: finishing means every pair was matched
            // correctly, so there is no better answer to offer. The footer
            // omits the line when this is empty.
            return "";
    }
}

function gradeTokens(
    tokens: string[],
    target: string,
    rule: SentenceGradingRule,
): Omit<GradeResult, "modelAnswer"> {
    const answer = tokens.join(" ");

    if (rule.mode === "exactSentence") {
        const given = meaningfulWords(answer).join(" ");
        const wanted = meaningfulWords(target).join(" ");
        return { correct: given === wanted };
    }

    const missing = missingKeywords(answer, rule.keywords, rule.ignore);
    if (missing.length > 0) return { correct: false, missing };

    // Required ideas are present, but an unrelated content word still makes
    // the constructed answer wrong. Ignored fillers such as "please" have
    // already been removed by `unexpectedWords`.
    if (unexpectedWords(answer, target, rule.ignore).length > 0) return { correct: false };

    // All required words present. Flag anything that is not word-perfect so the
    // feedback can show the model sentence without calling the learner wrong.
    const wordPerfect = normalize(answer) === normalize(target);
    return { correct: true, accepted: !wordPerfect };
}

/** Grade one answer. Pure: same inputs always give the same result. */
export function gradeAnswer(lesson: Lesson, exercise: Exercise, answer: Answer): GradeResult {
    const modelAnswer = modelAnswerFor(lesson, exercise);

    switch (exercise.type) {
        case "matchPairs": {
            // Pairs are judged as they are tapped; reaching the end is a pass. A
            // wrong pairing along the way does not fail the exercise, but it does
            // mean this was not a clean first pass.
            const clean = answer.kind === "pairs" && answer.wrongAttempts === 0;
            return { correct: true, modelAnswer, accepted: !clean, firstPassClean: clean };
        }

        case "selectPicture":
        case "pictureToWord":
            return {
                correct: answer.kind === "choice" && answer.choiceId === exercise.vocabId,
                modelAnswer,
            };

        case "listenChooseMeaning":
            return {
                correct: answer.kind === "choice" && answer.choiceId === exercise.correctChoiceId,
                modelAnswer,
                // The spoken English, not a rephrasing: the learner has not seen
                // this word yet, and the correct meaning is already on screen.
                modelAnswerKind: "audio",
            };

        case "fillBlank":
            return {
                correct: answer.kind === "choice" && answer.choiceId === exercise.correctChoiceId,
                modelAnswer,
            };

        case "dialogueChoice":
            return {
                correct: answer.kind === "choice" && answer.choiceId === exercise.phraseId,
                modelAnswer,
            };

        case "arrangeWords":
        case "translateWordBank": {
            if (answer.kind !== "tokens") return { correct: false, modelAnswer };
            return {
                ...gradeTokens(answer.tokens, modelAnswer, exercise.grading),
                modelAnswer,
            };
        }

        case "listenArrangeWords": {
            if (answer.kind !== "tokens") return { correct: false, modelAnswer };
            return {
                ...gradeTokens(answer.tokens, modelAnswer, exercise.grading),
                modelAnswer,
                // The sentence was only ever heard, so the reveal is what was said.
                modelAnswerKind: "audio",
            };
        }
    }
}
