import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConvoHistory(
  convoHistory: { role: string; message: string }[]
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
