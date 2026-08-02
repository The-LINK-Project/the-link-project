// LESSON TYPES

declare type LessonProgress = {
    _id: string;
    userId: string;
    lessonIndex: number;
    objectivesMet: boolean[];
    completed: boolean;
    convoHistory: Message[];
    quizResult: QuizResult[];
};

declare type Lesson = {
    title: string;
    description: string;
    objectives: string[];
    lessonIndex: number;
    difficulty: string;
};

declare type LessonStatus = "Completed" | "In Progress" | "Not Started";

declare type Message = {
    role: string;
    message: string;
    audioURL?: string;
};

declare type ChatMessageType = {
    role: ChatRole;
    text: string;
    isError?: boolean;
    hideInChat?: boolean;
};

declare type Question = {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
};

declare type QuizData = {
    title: string;
    lessonId: number;
    questions: Question[];
};

declare type QuizAdmin = {
    _id: string;
    title: string;
    lessonId: number;
    questions: Question[];
    createdAt: string;
    updatedAt: string;
};

declare type QuizResult = {
    _id: string;
    userId: string;
    lessonId: number;
    score: number;
    answers: number[];
    completedAt: string;
};

// SHARED GAME TYPES

declare type GameDifficulty = "easy" | "medium" | "hard";

// Static, repo-hosted game content (constants/games/*). Deliberately separate
// from the *Admin types below, which describe MongoDB documents.
declare type WordMatchGameRound = {
    _id: string;
    title: string;
    category: string;
    difficulty: GameDifficulty;
    pairs: WordMatchPair[];
};

declare type WordMatchCategory = {
    id: string;
    label: string;
    emoji: string;
};

/** One stage of the Focus Group time-trial run. */
declare type FocusGroupStage =
    | {
          kind: "word-match";
          label: string;
          round: WordMatchGameRound;
      }
    | {
          kind: "picture";
          label: string;
          question: PictureStoryQuestion;
      };

declare type PictureStoryGameSet = {
    _id: string;
    title: string;
    difficulty: GameDifficulty;
    questions: PictureStoryQuestion[];
};

// WORD MATCH GAME TYPES

declare type WordMatchTileContent = {
    text?: string;
    imageUrl?: string;
};

declare type WordMatchPair = {
    left: WordMatchTileContent;
    right: WordMatchTileContent;
};

declare type WordMatchRoundData = {
    title: string;
    pairs: WordMatchPair[];
    // Optional so existing admin/database rounds still satisfy the type
    category?: string;
    difficulty?: GameDifficulty;
    order?: number;
};

declare type WordMatchRoundAdmin = WordMatchRoundData & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

// PICTURE STORY GAME TYPES

declare type PictureStoryQuestionType = "sentence" | "order" | "next" | "say";

declare type PictureStoryQuestion = {
    sequence: string[];
    options: string[];
    correctAnswerIndex: number;
    // Optional so existing admin/database questions still satisfy the type
    type?: PictureStoryQuestionType;
    prompt?: string;
    explanation?: string;
    /**
     * Per-panel captions, parallel to `sequence`. Overrides the generic icon
     * label from constants/games/iconLabels.ts. Used by "order" questions,
     * where each panel is a step ("register at the counter") rather than just
     * an object ("counter").
     */
    captions?: string[];
};

declare type PictureStorySetData = {
    title: string;
    questions: PictureStoryQuestion[];
    difficulty?: GameDifficulty;
};

declare type PictureStorySetAdmin = PictureStorySetData & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

// FEEDBACK SURVEY TYPES
//
// The survey itself is plain data in constants/survey/feedbackSurvey.ts — see
// the notes at the top of that file before editing a session's questions.

declare type SurveyOption = {
    /**
     * Stored in the database, so it must stay stable. Rewording `label` is
     * always safe; changing `value` orphans every answer already collected.
     */
    value: string;
    label: string;
    /** Reveals a free-text box when chosen. */
    isOther?: boolean;
    /** Multi-select only: cannot be ticked together with anything else. */
    exclusive?: boolean;
};

declare type SurveyQuestionBase = {
    id: string;
    prompt: string;
    /** Column-name stem in the CSV export, e.g. "q1_country". */
    exportKey: string;
    /** Small grey line under the prompt. */
    help?: string;
    required?: boolean;
};

declare type SurveyQuestion =
    | (SurveyQuestionBase & { kind: "single"; options: SurveyOption[] })
    | (SurveyQuestionBase & { kind: "scale"; labels: string[] })
    | (SurveyQuestionBase & {
          kind: "multi";
          options: SurveyOption[];
          /** Enforced with an explanation, never a silent failure. */
          maxSelections?: number;
      })
    | (SurveyQuestionBase & {
          kind: "split";
          total: number;
          step: number;
          leftLabel: string;
          rightLabel: string;
          unit: string;
      })
    | (SurveyQuestionBase & {
          kind: "text";
          hint?: string;
          maxLength?: number;
      });

declare type SurveySection = {
    id: string;
    title: string;
    questions: SurveyQuestion[];
};

declare type SurveyDefinition = {
    /** Bump this for a new session; responses are keyed on it. */
    id: string;
    title: string;
    /** Shown on the banner, e.g. "about 10 minutes". */
    timeEstimate: string;
    consent: {
        heading: string;
        body: string;
        startLabel: string;
        declineLabel: string;
    };
    sections: SurveySection[];
};

declare type SurveyAnswer =
    | { kind: "single"; value: string; otherText?: string }
    | { kind: "scale"; value: number }
    | { kind: "multi"; values: string[]; otherText?: string }
    | { kind: "split"; left: number; right: number }
    | { kind: "text"; text: string };

declare type SurveyAnswers = Record<string, SurveyAnswer>;

declare type SurveyResponseStatus = "not_started" | "in_progress" | "submitted";

declare type SurveyStateForUser = {
    surveyId: string;
    status: SurveyResponseStatus;
    answers: SurveyAnswers;
    lastQuestionId: string | null;
    /** ISO string; used to decide whether a phone's local copy is newer. */
    updatedAt: string | null;
};

declare type SurveyBannerState =
    | { show: false }
    | {
          show: true;
          variant: "invite" | "resume" | "thanks";
          surveyId: string;
          timeEstimate: string;
          answeredCount: number;
          questionCount: number;
      };

declare type SurveySaveResult = {
    success: boolean;
    status?: SurveyResponseStatus;
    /** Set when the person had already submitted, so nothing was written. */
    alreadySubmitted?: boolean;
    message?: string;
};

declare type SurveyQuestionStat = {
    id: string;
    exportKey: string;
    prompt: string;
    answered: number;
};

/** One anonymized submitted response for the admin results view. */
declare type SurveyResponseRow = {
    /** Position in submission order — the only identifier the UI ever shows. */
    number: number;
    submittedAt: string | null;
    answers: SurveyAnswers;
};

declare type SurveyResults = {
    surveyId: string;
    started: number;
    submitted: number;
    completionRate: number;
    responses: SurveyResponseRow[];
};

declare type SurveyStats = {
    surveyId: string;
    started: number;
    submitted: number;
    completionRate: number;
    questionCount: number;
    questions: SurveyQuestionStat[];
};
