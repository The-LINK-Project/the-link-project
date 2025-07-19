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

    console.log(`PAYLOAD: `, JSON.stringify(payload, null, 2));

    const newLesson = await Lesson.create(payload);

    if (!newLesson) throw Error("Failed to create new lesson");

    console.log(`New Lesson Created: `, JSON.stringify(newLesson, null, 2));
    return JSON.parse(JSON.stringify(newLesson));
  } catch (error) {
    console.log("Error creating lesson:", error);
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

export async function deleteLesson(
  lessonId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await connectToDatabase();

    console.log("Deleting lesson with ID:", lessonId);

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return {
        success: false,
        message: "Lesson not found",
      };
    }

    console.log("Lesson deleted successfully");
    revalidatePath("/admin/lessons");

    return {
      success: true,
      message: "Lesson deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete lesson",
    };
  }
}
