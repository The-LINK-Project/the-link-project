// Server-only helpers. Kept out of lib/utils.ts on purpose: that file exports
// cn() to dozens of "use client" components, and anything imported here (the
// tutor system prompt, the server-action modules) would otherwise be pulled
// into the public client bundle along with it.
import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getLessonByIndex } from "./actions/Lesson.actions";

const MAX_CONVO_HISTORY_MESSAGES = 20;
const MAX_PROMPT_NAME_LENGTH = 60;
const MAX_HISTORY_MESSAGE_LENGTH = 2000;

// "System" is the only stored role that means the tutor. Whitelisting it (as
// opposed to echoing whatever the document holds) means a forged role can
// never make learner text speak with the tutor's voice.
export const TUTOR_ROLE = "System";
export const LEARNER_ROLE = "User";

export function normalizeStoredRole(role: unknown): string {
    return role === TUTOR_ROLE ? TUTOR_ROLE : LEARNER_ROLE;
}

// Untrusted text is about to sit inside the model's system prompt. Strip
// newlines and control characters so it cannot forge a new prompt section,
// collapse runs of whitespace, and cap the length.
export function sanitizePromptText(value: unknown, maxLength: number): string {
    if (typeof value !== "string") return "";
    return value
        .replace(/[\u0000-\u001f\u007f]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, maxLength);
}

// String.replace with a string pattern honours $&, $` and $' in the
// replacement, so a chosen first name could splice surrounding prompt text
// back into itself. A function replacement is inert.
function fillToken(template: string, token: string, value: string): string {
    return template.replace(token, () => value);
}

// Prior turns are passed to Gemini as real conversation turns rather than
// concatenated into the system instruction, so learner speech is data the
// model replies to and can never read as part of its own instructions.
export function buildConversationContents(convoHistory: Message[]) {
    const recentMessages = (
        Array.isArray(convoHistory) ? convoHistory : []
    ).slice(-MAX_CONVO_HISTORY_MESSAGES);

    return recentMessages
        .map((message) => ({
            role:
                normalizeStoredRole(message?.role) === TUTOR_ROLE
                    ? "model"
                    : "user",
            parts: [
                {
                    text:
                        typeof message?.message === "string"
                            ? message.message.slice(0, MAX_HISTORY_MESSAGE_LENGTH)
                            : "",
                },
            ],
        }))
        .filter((entry) => entry.parts[0].text.trim().length > 0);
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
    // The learner picks their own Clerk first name, so it is untrusted text
    const userName = sanitizePromptText(
        user?.firstName,
        MAX_PROMPT_NAME_LENGTH,
    );
    // info from lesson progress
    const lessonObjectivesMet = LessonProgress.objectivesMet;

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

    // fillToken, never String.replace with a string replacement — see above
    generatedInstructions = fillToken(
        generatedInstructions,
        "<<NAME>>",
        userName || "the student",
    );
    generatedInstructions = fillToken(
        generatedInstructions,
        "<<LESSON_TITLE>>",
        lessonTitle,
    );
    generatedInstructions = fillToken(
        generatedInstructions,
        "<<LESSON_DESCRIPTION>>",
        lessonDescription,
    );
    generatedInstructions = fillToken(
        generatedInstructions,
        "<<OBJECTIVES_MET>>",
        lessonObjectivesAndCompletionStatus,
    );

    return generatedInstructions;
}
