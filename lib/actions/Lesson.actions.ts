"use server";

import { connectToDatabase } from "@/lib/database";
import Lesson from "../database/models/lesson.model";

export async function createLesson({
  title,
  description,
  objectives,
  lessonIndex,
  difficulty,
}: {
  title: string;
  description: string;
  objectives: string[];
  lessonIndex: Number;
  difficulty: string;
}): Promise<Lesson> {
  try {
    await connectToDatabase();

    console.log("Making new lesson");

    const payload = {
      title: title,
      description: description,
      objectives: objectives,
      lessonIndex: lessonIndex,
      difficulty: difficulty,
    };
    console.log(`PAYLOAD: ${payload}`);
    const newLesson = await Lesson.create(payload);

    if (!newLesson) throw Error("Failed to create new lesson progress");

    console.log(`New Lesson: ${newLesson}`);
    return JSON.parse(JSON.stringify(newLesson));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  try {
    await connectToDatabase();

    console.log("Retrieving Lessons");

    const lessons = await Lesson.find({});

    console.log(`All Lessons Retrieved`);

    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
