import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConvoHistory(
  convoHistory: Message[]
): string {
  return convoHistory
    .map((message) => `${message.role}: ${message.message}`)
    .join("\n");
}

export function formatInitialObjectives(objectives: any[]) {
  const initialObjectives = Array(objectives.length).fill(false);
  console.log(`INITIAL OBJECRIVES: ${initialObjectives}`);
  return initialObjectives;
}

export async function urlToBase64(audioUrl: string): Promise<string> {
  const response = await fetch(audioUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // strip the "data:audio/webm;base64,"
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

export async function generateInstructions(LessonProgress: LessonProgress, Lesson: Lesson) {
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
        `OBJECTIVE INDEX ${index}: ${objective} [${
          lessonObjectivesMet[index] ? "COMPLETED" : "TO BE DONE"
        }]`
    )
    .join(", ");

  generatedInstructions = generatedInstructions.replace("<<NAME>>", userName);
  generatedInstructions = generatedInstructions.replace("<<LESSON_TITLE>>", lessonTitle);
  generatedInstructions = generatedInstructions.replace("<<LESSON_DESCRIPTION>>", lessonDescription);
  generatedInstructions = generatedInstructions.replace("<<OBJECTIVES_MET>>", lessonObjectivesAndCompletionStatus);
  generatedInstructions = generatedInstructions.replace("<<PREVIOUS_CONVERSATION>>", convoHistory.toString());

  return generatedInstructions;
}


