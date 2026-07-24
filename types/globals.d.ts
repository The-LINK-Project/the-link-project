// LESSON TYPES

declare type LessonProgress = {
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
