"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import UserResult from "@/lib/database/models/userResult.model";
import mongoose from "mongoose";

const TEST_USER_ID = new mongoose.Types.ObjectId("000000000000000000000001");

// submitting and sending over the quiz results to mongodb
export async function saveQuizResult(formData: FormData) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    const lessonId = formData.get("lessonId") as string;
    const quizId = formData.get("quizId") as string;
    const score = parseInt(formData.get("score") as string);
    const answersJson = formData.get("answers") as string;
    const answers = JSON.parse(answersJson);

    if (!lessonId || !quizId || isNaN(score) || !answers) {
      throw new Error("Missing required fields");
    }
    if (
      !mongoose.Types.ObjectId.isValid(lessonId) ||
      !mongoose.Types.ObjectId.isValid(quizId)
    ) {
      throw new Error("Invalid ID format");
    }
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error("Score must be a number between 0 and 100");
    }

    const result = await UserResult.create({
      userId: TEST_USER_ID,
      lessonId: new mongoose.Types.ObjectId(lessonId),
      quizId: new mongoose.Types.ObjectId(quizId),
      score,
      answers,
    });

    revalidatePath("/quiz/results");
    return {
      success: true,
      id: result._id.toString(),
      score: result.score,
      message: "Quiz result saved successfully",
    };
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getUserResults(lessonId?: string) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered before populate
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    const query: any = { userId: TEST_USER_ID };

    if (lessonId) {
      query.lessonId = new mongoose.Types.ObjectId(lessonId);
    }

    const results = await UserResult.find(query)
      .populate("quizId")
      .sort({ completedAt: -1 });

    const serializedResults = results.map((result) => {
      const plainResult = result.toObject();
      return {
        ...plainResult,
        _id: plainResult._id.toString(),
        userId: plainResult.userId.toString(),
        lessonId: plainResult.lessonId.toString(),
        quizId: plainResult.quizId
          ? plainResult.quizId._id
            ? { ...plainResult.quizId, _id: plainResult.quizId._id.toString() }
            : plainResult.quizId.toString()
          : null,
        createdAt: plainResult.createdAt
          ? plainResult.createdAt.toISOString()
          : undefined,
        updatedAt: plainResult.updatedAt
          ? plainResult.updatedAt.toISOString()
          : undefined,
        completedAt: plainResult.completedAt
          ? plainResult.completedAt.toISOString()
          : undefined,
      };
    });

    return serializedResults;
  } catch (error) {
    console.error("Error fetching user results:", error);
    throw error;
  }
}
