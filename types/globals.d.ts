// LESSON TYPES

declare type LessonProgress = {
    userId: string;
    lessonIndex: number;
    objectivesMet: boolean[];
    convoHistory: Message[];
    quizResult: QuizResult[];
};

declare type Lesson = {
    title: string;
    description: string;
    objectives: string[];
    lessonIndex: Number;
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
