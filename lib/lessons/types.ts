/**
 * Lesson domain types.
 *
 * These shapes are deliberately written as if they had come back from
 * `GET /v1/lessons/:id`, so swapping the dummy data in `data/` for a real API
 * response is a change of source only — no screen or component needs to know.
 *
 * Adding a new exercise type means: add a variant to `Exercise`, add a grader
 * branch in `grading.ts`, and register a component in `ExerciseRenderer`.
 * Nothing else in the app should switch on exercise type.
 */

import type { LessonIcon, PictureKey } from "./icons";

/**
 * A language lesson content can be written in. Hindi is wider than the app's
 * own locales: only speaking practice uses it so far.
 */
export type LearnerLanguage = "en" | "bn" | "ta" | "hi";

/**
 * Text the learner reads in their own language. `en` is required because it is
 * the fallback; the rest are filled in as translations land.
 */
export type Localized = { en: string } & Partial<Record<LearnerLanguage, string>>;

/** A vocabulary item the lesson teaches. */
export type VocabItem = {
    id: string;
    /** The English term being taught. */
    term: string;
    /** Plain-words gloss, shown on the intro screen and in feedback. */
    meaning: Localized;
    /**
     * Which picture stands for this word, when one can. Only words a single
     * picture can carry get a key; everything else is taught through text.
     */
    picture?: PictureKey;
    /**
     * False until a native speaker has checked the non-English strings on this
     * item. Surfaced in dev so untrusted copy cannot quietly ship.
     */
    reviewed: boolean;
};

/** A phrase the lesson wants the learner to be able to say. */
export type Phrase = {
    id: string;
    /** The target English phrase, in the register it is actually said in. */
    text: string;
    meaning: Localized;
    reviewed: boolean;
};

/**
 * How a built sentence is judged.
 *
 * Only these two are offered to sentence exercises. Choice and pair grading are
 * declared inline on the exercises that use them, so a sentence exercise cannot
 * be given a rule that could never run against a list of words.
 */
export type SentenceGradingRule =
    /**
     * Lenient: correct when all `keywords` appear and every other content word
     * belongs in the model sentence, ignoring order, articles, filler words and
     * small spelling slips. This lets "I want top up ten dollar" count without
     * allowing an unrelated decoy such as "exit" into the answer.
     */
    | {
          mode: "keywords";
          keywords: string[];
          /** Extra filler words that are explicitly allowed. */ ignore?: string[];
      }
    /**
     * Strict: the same words in the same order, ignoring punctuation, case and
     * filler. Use only where the order carries the meaning on its own.
     */
    | { mode: "exactSentence" };

type ExerciseBase = {
    id: string;
    /** Instruction shown above the exercise. */
    instruction: Localized;
    /** Vocab this exercise practises, used by the end-of-lesson summary. */
    practises: string[];
};

/**
 * Tap the pairs. Two columns; English on one side, the learner's language on
 * the other. Self-grading: each pair is judged the moment it is completed, so
 * this type never uses the Check button.
 */
export type MatchPairsExercise = ExerciseBase & {
    type: "matchPairs";
    /**
     * The vocabulary to pair up, by id. Terms and meanings are looked up in
     * `Lesson.vocab` rather than restated here, so a corrected translation
     * cannot go stale in one place while staying right in another.
     */
    vocabIds: string[];
    grading: { mode: "pairs" };
};

/**
 * Hear a term, choose what it means. Choices are in the learner's language,
 * so this tests comprehension rather than reading English.
 */
/**
 * One option in a meaning question.
 *
 * A meaning the lesson actually teaches references vocabulary by id, for the
 * same reason matching does. A distractor is not taught anywhere, so it carries
 * its own text. The two forms are mutually exclusive.
 */
export type MeaningChoice = { id: string } & (
    { vocabId: string; label?: never } | { label: Localized; vocabId?: never }
);

export type ListenChooseMeaningExercise = ExerciseBase & {
    type: "listenChooseMeaning";
    /** Text handed to text-to-speech. Never shown on screen before answering. */
    audioText: string;
    choices: MeaningChoice[];
    correctChoiceId: string;
    grading: { mode: "choice" };
};

/**
 * Put a shuffled English sentence back in order by tapping tiles.
 *
 * This type never has decoys. The task is ordering, so a leftover tile is not a
 * harder puzzle, it is a contradiction: the learner is told to arrange the words
 * and then finds a word that does not belong anywhere.
 */
export type ArrangeWordsExercise = ExerciseBase & {
    type: "arrangeWords";
    /**
     * The sentence being built, by id. Taken from `Lesson.phrases` rather than
     * restated, so the summary can promise a learner only the sentences the run
     * actually taught them.
     */
    phraseId: string;
    /** Exactly the words of the phrase, presented shuffled. No extras. */
    tokens: string[];
    grading: SentenceGradingRule;
};

/**
 * Prompt in the learner's language; build the English sentence from tiles.
 *
 * Only shown to a learner whose language the prompt is translated into. With no
 * translation the prompt falls back to English, and the exercise degenerates
 * into copying the sentence already on screen — it would ask the learner to say
 * in English something that is already in English.
 *
 * Unlike `arrangeWords`, this type does use decoys: the learner is producing a
 * sentence rather than reordering a known one, so tiles that do not belong are
 * a real part of the task.
 */
export type TranslateWordBankExercise = ExerciseBase & {
    type: "translateWordBank";
    prompt: Localized;
    /** The sentence being built, by id, from `Lesson.phrases`. */
    phraseId: string;
    /** Tiles offered, including decoys. Presented shuffled. */
    tokens: string[];
    grading: SentenceGradingRule;
};

/** A sentence with one gap, filled by tapping one of a few tiles. */
export type FillBlankExercise = ExerciseBase & {
    type: "fillBlank";
    /** Sentence split into parts; `null` marks where the gap sits. */
    sentence: (string | null)[];
    choices: { id: string; label: string }[];
    correctChoiceId: string;
    grading: { mode: "choice" };
};

/**
 * A word, and pictures to choose between.
 *
 * Duolingo's version puts the prompt in the learner's own language and captions
 * each picture with the target word, so reading the caption does not give the
 * answer away. This one shows the English word and leaves the pictures
 * uncaptioned: with the prompt already in English, a caption would turn the
 * exercise into matching two identical strings.
 *
 * Meaning has to come from the picture, which is what makes this the one
 * exercise that asks nothing of a learner's reading at all.
 */
export type SelectPictureExercise = ExerciseBase & {
    type: "selectPicture";
    /** The word being asked about. Must have a picture of its own. */
    vocabId: string;
    /**
     * Every option, including the answer. Each must have a picture. Duolingo
     * draws distractors from words the lesson already taught, which gives them
     * free retrieval practice rather than wasting the tiles.
     */
    choiceVocabIds: string[];
    grading: { mode: "choice" };
};

/**
 * A picture, and English words to choose between: the reverse of
 * `selectPicture`. Seeing the thing and finding its name is recall, which is
 * what a learner needs at a real counter, where nobody shows them the word.
 *
 * Like the picture-choice exercise it is left out under a screen reader,
 * because naming the picture would read the answer aloud.
 */
export type PictureToWordExercise = ExerciseBase & {
    type: "pictureToWord";
    /** The word being asked about. Must have a picture of its own. */
    vocabId: string;
    /** Every option, including the answer, by vocabulary id. */
    choiceVocabIds: string[];
    grading: { mode: "choice" };
};

/**
 * Hear a sentence, then build it from tiles. Nothing is written on screen
 * before the answer, so this is listening practice for the whole sentence
 * rather than one word. Decoy tiles are allowed, as in translation.
 */
export type ListenArrangeWordsExercise = ExerciseBase & {
    type: "listenArrangeWords";
    /** The sentence being built, by id, from `Lesson.phrases`. It is what is spoken. */
    phraseId: string;
    /** Tiles offered, including any decoys. Presented shuffled. */
    tokens: string[];
    grading: SentenceGradingRule;
};

/**
 * Somebody says something to the learner; they pick what to say back.
 *
 * The other person's line is English, spoken aloud and shown with its meaning,
 * so the learner is never stuck on a line they cannot read. Each reply carries
 * its meaning too. This is the exercise closest to a real exchange short of the
 * spoken practice, and it teaches which sentence fits which moment.
 */
export type DialogueReply = { id: string } & (
    | { phraseId: string; text?: never; meaning?: never }
    | { text: string; meaning: Localized; phraseId?: never }
);

export type DialogueChoiceExercise = ExerciseBase & {
    type: "dialogueChoice";
    /** Where this is happening, in the learner's language. */
    situation: Localized;
    /** What the other person says, in English. Spoken aloud. */
    line: string;
    lineMeaning: Localized;
    /**
     * The right reply, by id from `Lesson.phrases`. It is the sentence this
     * exercise teaches, and its id is the answer's choice id.
     */
    phraseId: string;
    /**
     * Wrong replies, shown shuffled together with the right one. A reply the
     * lesson teaches elsewhere is referenced; one it does not carries its own
     * text. Ids must differ from `phraseId`.
     */
    distractors: DialogueReply[];
    grading: { mode: "choice" };
};

export type Exercise =
    | SelectPictureExercise
    | PictureToWordExercise
    | MatchPairsExercise
    | ListenChooseMeaningExercise
    | ArrangeWordsExercise
    | ListenArrangeWordsExercise
    | TranslateWordBankExercise
    | FillBlankExercise
    | DialogueChoiceExercise;

export type ExerciseType = Exercise["type"];

/** A note about how something works in Singapore, shown before the exercises. */
export type TopicNote = { id: string; text: Localized; reviewed: boolean };

/**
 * One thing to say aloud in speaking practice: a sentence the lesson taught, or
 * a single word. The tutor asks for it by its meaning, so that meaning has to
 * exist in the learner's language.
 */
export type SpeakingGoal = {
    id: string;
    /** English that must be heard for the goal to count. */
    keywords: string[];
} & ({ phraseId: string; vocabId?: never } | { vocabId: string; phraseId?: never });

/**
 * The spoken role-play after the exercises. Only goals the run taught are
 * practised, so a learner is never asked for something they skipped.
 */
export type SpeakingPractice = {
    /** The role-play, in English, for the tutor. Never shown to the learner. */
    scene: string;
    /** English the tutor may say without it being taught, such as place names. */
    names: string[];
    goals: SpeakingGoal[];
};

export type Lesson = {
    id: string;
    title: Localized;
    /** One line on what the learner will be able to do afterwards. */
    goal: Localized;
    /** What the lesson is about, as a picture, for a learner who reads little. */
    icon: LessonIcon;
    level: "beginner" | "intermediate";
    estimatedMinutes: number;
    notes: TopicNote[];
    vocab: VocabItem[];
    phrases: Phrase[];
    exercises: Exercise[];
    speaking?: SpeakingPractice;
};

/**
 * Which answer shape belongs to which exercise type.
 *
 * Exercise components are typed through `AnswerFor`, so a multiple-choice
 * exercise cannot produce a sentence answer or the reverse — the compiler
 * rejects it. The session reducer still stores the wider `Answer` union, since
 * it handles whatever is on screen, and validates the shape at runtime.
 */
export type AnswerByExercise = {
    /** The chosen option's vocabulary id. */
    selectPicture: { kind: "choice"; choiceId: string };
    pictureToWord: { kind: "choice"; choiceId: string };
    matchPairs: {
        kind: "pairs";
        /** Wrong pairings before finishing. Never fails the exercise. */
        wrongAttempts: number;
    };
    listenChooseMeaning: { kind: "choice"; choiceId: string };
    fillBlank: { kind: "choice"; choiceId: string };
    dialogueChoice: { kind: "choice"; choiceId: string };
    /** Ordered list of the tiles the learner placed. */
    arrangeWords: { kind: "tokens"; tokens: string[] };
    listenArrangeWords: { kind: "tokens"; tokens: string[] };
    translateWordBank: { kind: "tokens"; tokens: string[] };
};

export type AnswerFor<T extends ExerciseType> = AnswerByExercise[T];

/** Any answer, as stored by the session. */
export type Answer = AnswerByExercise[ExerciseType];

export type GradeResult = {
    correct: boolean;
    /** The model answer, always shown after grading. */
    modelAnswer: string;
    /**
     * What `modelAnswer` actually is, so feedback can label it correctly.
     *
     * For a listening exercise it is the English that was spoken, which the
     * learner never saw — revealing it teaches the word. Calling that "another
     * way to say it" would be wrong, since it is not a rephrasing of anything.
     */
    modelAnswerKind?: "answer" | "audio";
    /**
     * False when the exercise was completed but not cleanly, so the summary can
     * stop counting it as right first time. Matching sets this after a wrong
     * pairing: the exercise still passes, because a rejected pair is corrected
     * in the moment rather than failing the learner.
     */
    firstPassClean?: boolean;
    /**
     * Keywords the learner missed. Lets feedback say what was absent rather than
     * only restating the whole sentence.
     */
    missing?: string[];
    /**
     * True when the answer was accepted but not word-perfect, e.g. right words
     * in a different order. Feedback can acknowledge this without failing them.
     */
    accepted?: boolean;
};
