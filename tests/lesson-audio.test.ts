import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import manifest from "@/lib/lessons/audio-manifest.json";
import { audioId, lessonSpokenTexts, recordingUrl } from "@/lib/lessons/audio";
import { listLessons, listWorkshopLessons } from "@/lib/lessons/data";

// Lesson recordings (lib/lessons/audio.ts). A text without one still plays in
// the browser's voice, so a forgotten recording would go unnoticed in the app:
// this is where it shows up instead. Fix with `npm run record:audio`.

const AUDIO_DIR = path.join(process.cwd(), "public/lessons/audio");
const lessons = [...listLessons(), ...listWorkshopLessons()];

describe("lesson recordings", () => {
    it("has a recording for everything a lesson reads aloud", () => {
        const missing = lessons.flatMap((lesson) =>
            lessonSpokenTexts(lesson)
                .filter((text) => !recordingUrl(text))
                .map((text) => `${lesson.id}: ${text}`),
        );
        expect(missing).toEqual([]);
    });

    it("lists only recordings that exist, and only ones a lesson uses", () => {
        const used = new Set(lessons.flatMap((lesson) => lessonSpokenTexts(lesson).map(audioId)));
        expect(manifest.clips.filter((id) => !existsSync(path.join(AUDIO_DIR, `${id}.mp3`)))).toEqual([]);
        expect(manifest.clips.filter((id) => !used.has(id))).toEqual([]);
        const files = readdirSync(AUDIO_DIR).filter((file) => file.endsWith(".mp3"));
        expect(files.filter((file) => !manifest.clips.includes(file.slice(0, -4)))).toEqual([]);
    });
});
