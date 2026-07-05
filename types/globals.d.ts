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
};

declare type WordMatchRoundAdmin = WordMatchRoundData & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

// PICTURE STORY GAME TYPES

declare type PictureStoryQuestion = {
    sequence: string[];
    options: string[];
    correctAnswerIndex: number;
};

declare type PictureStorySetData = {
    title: string;
    questions: PictureStoryQuestion[];
};

declare type PictureStorySetAdmin = PictureStorySetData & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};
