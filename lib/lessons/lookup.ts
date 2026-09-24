/**
 * Resolving references inside a lesson.
 *
 * Exercises point at vocabulary by id instead of restating terms and meanings.
 * That keeps one authored copy of every translation, and these functions turn a
 * reference back into content when a component needs to draw it.
 */

import type { PictureKey } from "./icons";
import type {
    DialogueChoiceExercise,
    Exercise,
    Lesson,
    Localized,
    MeaningChoice,
    Phrase,
    VocabItem,
} from "./types";

/**
 * Vocabulary items for the given ids, in the order asked for.
 *
 * An id that matches nothing is dropped rather than rendered as a blank tile.
 * In development this also throws, because a dangling reference is an authoring
 * mistake that should be caught while writing the lesson, not shipped as a
 * silently shorter exercise.
 */
export function vocabByIds(lesson: Lesson, ids: string[]): VocabItem[] {
    const byId = new Map(lesson.vocab.map((item) => [item.id, item]));
    const missing = ids.filter((id) => !byId.has(id));

    if (missing.length > 0) {
        const message = `Lesson "${lesson.id}" references unknown vocabulary: ${missing.join(", ")}`;
        if (process.env.NODE_ENV !== "production") throw new Error(message);
        console.warn(message);
    }

    return ids.map((id) => byId.get(id)).filter((item): item is VocabItem => item !== undefined);
}

/**
 * Vocabulary for a picture exercise, checked for drawable options.
 *
 * A word with no picture would render as an empty tile, silently reducing the
 * number of options and sometimes removing the answer itself. That is an
 * authoring mistake, so it fails loudly while the lesson is being written.
 */
export function picturableVocab(lesson: Lesson, ids: string[]): VocabItem[] {
    const items = vocabByIds(lesson, ids);
    const missing = items.filter((item) => !item.picture).map((item) => item.id);

    if (missing.length > 0) {
        const message = `Lesson "${lesson.id}" uses a picture exercise for vocabulary with no picture: ${missing.join(", ")}`;
        if (process.env.NODE_ENV !== "production") throw new Error(message);
        console.warn(message);
    }

    return items.filter((item) => item.picture);
}

/**
 * The picture to show beside an exercise's prompt: that of the first word it
 * practises that has one. Undefined when none does, as for a sentence made
 * only of words no single picture can carry.
 */
export function exercisePicture(lesson: Lesson, exercise: Exercise): PictureKey | undefined {
    return vocabByIds(lesson, exercise.practises).find((item) => item.picture)?.picture;
}

/**
 * The phrase an exercise builds towards.
 *
 * Like vocabulary, a dangling reference is an authoring mistake and fails while
 * the lesson is being written rather than showing a blank sentence to a learner.
 */
export function phraseById(lesson: Lesson, id: string): Phrase | undefined {
    const phrase = lesson.phrases.find((item) => item.id === id);

    if (!phrase) {
        const message = `Lesson "${lesson.id}" references unknown phrase: ${id}`;
        if (process.env.NODE_ENV !== "production") throw new Error(message);
        console.warn(message);
    }

    return phrase;
}

/**
 * The text to show for one meaning choice.
 *
 * Returns the localizable value; the caller resolves it into a language. A
 * taught meaning comes from vocabulary, a distractor carries its own text.
 */
export function choiceText(lesson: Lesson, choice: MeaningChoice) {
    if (choice.label) return choice.label;

    const [item] = vocabByIds(lesson, [choice.vocabId]);
    // Falls back to the id only if the reference is dangling, which already
    // threw in development.
    return item?.meaning ?? { en: choice.vocabId };
}

/** One reply the learner can pick in a dialogue exercise, with its text resolved. */
export type ResolvedReply = { id: string; text: string; meaning: Localized };

/**
 * Every reply in a dialogue exercise, the right one first, unshuffled.
 *
 * The right reply is the taught phrase and is keyed by its phrase id, which is
 * what makes the answer gradable without a separate correct-choice field. A
 * distractor that references a phrase resolves the same way; one that carries
 * its own text is used as written. A dangling reference fails in development.
 */
export function dialogueReplies(lesson: Lesson, exercise: DialogueChoiceExercise): ResolvedReply[] {
    const correct = phraseById(lesson, exercise.phraseId);
    const replies: ResolvedReply[] = correct
        ? [{ id: exercise.phraseId, text: correct.text, meaning: correct.meaning }]
        : [];
    for (const reply of exercise.distractors) {
        if (reply.phraseId !== undefined) {
            const phrase = phraseById(lesson, reply.phraseId);
            if (phrase) replies.push({ id: reply.id, text: phrase.text, meaning: phrase.meaning });
        } else {
            replies.push({ id: reply.id, text: reply.text, meaning: reply.meaning });
        }
    }
    return replies;
}
