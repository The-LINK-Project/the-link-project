// Client-safe utilities only. Server-only helpers (prompt building, convo
// formatting) live in lib/serverUtils.ts — importing them here would drag the
// tutor system prompt and the server-action modules into the client bundle,
// because cn() below is imported by dozens of "use client" components.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
