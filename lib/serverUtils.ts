// Server-only helpers. Kept out of lib/utils.ts on purpose: that file exports
// cn() to dozens of "use client" components, and anything imported here (the
// tutor system prompt, the server-action modules) would otherwise be pulled
// into the public client bundle along with it.
import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getLessonByIndex } from "./actions/Lesson.actions";

const MAX_CONVO_HISTORY_MESSAGES = 20;

export function formatConvoHistory(convoHistory: Message[]): string {
    // "System" is the stored role for the tutor's messages, but "Tutor" is a
    // clearer label for the model prompt
    const recentMessages = convoHistory.slice(-MAX_CONVO_HISTORY_MESSAGES);
    const lines = recentMessages.map(
        (message) =>
            `${message.role === "System" ? "Tutor" : message.role}: ${message.message}`,
    );

    if (convoHistory.length > MAX_CONVO_HISTORY_MESSAGES) {
        lines.unshift("[earlier conversation omitted]");
    }

    return lines.join("\n");
}

export function formatInitialObjectives(objectives: any[]) {
    const initialObjectives = Array(objectives.length).fill(false);
    console.log(`INITIAL OBJECRIVES: ${initialObjectives}`);
    return initialObjectives;
}

export async function generateInstructions(LessonProgress: LessonProgress) {
    const Lesson = await getLessonByIndex(LessonProgress.lessonIndex);
    let generatedInstructions = instructions;
    const user = await getCurrentUser();
    const userName = user?.firstName;
    // info from lesson progress
    const lessonObjectivesMet = LessonProgress.objectivesMet;
    const convoHistory = LessonProgress.convoHistory;

    // info from lesson
    const lessonTitle = Lesson.title;
    const lessonDescription = Lesson.description;
    const lessonObjectives = Lesson.objectives;

    const lessonObjectivesAndCompletionStatus = lessonObjectives
        .map(
            (objective, index) =>
                `OBJECTIVE INDEX ${index}: ${objective} [${lessonObjectivesMet[index] ? "COMPLETED" : "TO BE DONE"
                }]`,
        )
        .join(", ");

    const formattedConvoHistory = formatConvoHistory(convoHistory);

    generatedInstructions = generatedInstructions.replace("<<NAME>>", userName);
    generatedInstructions = generatedInstructions.replace(
        "<<LESSON_TITLE>>",
        lessonTitle,
    );
    generatedInstructions = generatedInstructions.replace(
        "<<LESSON_DESCRIPTION>>",
        lessonDescription,
    );
    generatedInstructions = generatedInstructions.replace(
        "<<OBJECTIVES_MET>>",
        lessonObjectivesAndCompletionStatus,
    );
    generatedInstructions = generatedInstructions.replace(
        "<<PREVIOUS_CONVERSATION>>",
        formattedConvoHistory,
    );

    return generatedInstructions;
}
