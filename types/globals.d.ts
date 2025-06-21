declare type LessonData = {
    title: string;
    description: string;
    objectives: string[];
};

declare type LessonProgress = {
    userId: string;
    lessonIndex: number;
    objectivesMet: boolean[];
    convoHistory: Message[];
};

declare type Message = {
    role: string;
    message: string;
    audioURL?: string;
};

declare type Lesson = {
    title: string,
    description: string,
    objectives: string[]
}
