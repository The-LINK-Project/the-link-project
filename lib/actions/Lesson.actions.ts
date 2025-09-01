"use server";

import { connectToDatabase } from "@/lib/database";
import Lesson from "../database/models/lesson.model";
import { revalidatePath } from "next/cache";

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

    const payload = {
      title: title,
      description: description,
      objectives: objectives,
      lessonIndex: lessonIndex,
      difficulty: difficulty,
    };

    const newLesson = await Lesson.create(payload);

    if (!newLesson) throw Error("Failed to create new lesson");

    return JSON.parse(JSON.stringify(newLesson));
  } catch (error) {
    console.log("Error creating lesson:", error);
    throw error;
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  try {
    await connectToDatabase();

    const lessons = await Lesson.find();

    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLessonByIndex(lessonIndex: number): Promise<Lesson> {
  try {
    await connectToDatabase();

    const lesson = await Lesson.findOne({ lessonIndex: lessonIndex });

    if (!lesson) throw Error("Lesson not found");

    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteLesson(lessonId: string): Promise<void> {
  try {
    await connectToDatabase();

    if (!mongoose.isValidObjectId(lessonId)) {
      throw new Error("Invalid lesson ID format");
    }

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      throw new Error("Lesson not found");
    }

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
