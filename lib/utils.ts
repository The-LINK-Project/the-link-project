import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatConvoHistory(convoHistory: { role: string; message: string }[]): string {
  return convoHistory
    .map(message => `${(message.role)}: ${message.message}`)
    .join('\n');
}

// export function formatLessonObjectives()