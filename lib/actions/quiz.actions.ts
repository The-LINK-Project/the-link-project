"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose, { Model, Document } from "mongoose";
import Quiz from "@/lib/database/models/quiz.model";

// // Define interfaces for TypeScript
// interface IQuestion {
//   questionText: string;
//   options: string[];
//   correctAnswerIndex: number;
// }

// // Better model registration pattern for Quiz with proper typing
// let Quiz: Model<IQuiz>;
// try {
//   Quiz = mongoose.model<IQuiz>("Quiz");
// } catch {
//   // If model doesn't exist, import and register it
//   const quizModel = require("@/lib/database/models/quiz.model").default;
//   Quiz = quizModel;
// }

export async function getQuizByLessonId(lessonId: number) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    const quiz = await Quiz.findOne({
      lessonId: lessonId,
    });
    if (!quiz) {
      throw new Error("Quiz not found for this lesson");
    }

    // Alternative quick fix with JSON serialization
    const safeQuiz = JSON.parse(JSON.stringify(quiz));
    return safeQuiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
}

export async function createCustomQuiz(quizData: QuizData) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    // Validate input
    if (!quizData.title || !quizData.lessonId || !quizData.questions.length) {
      throw new Error("Missing required fields");
    }

    // Validate questions
    for (const question of quizData.questions) {
      if (!question.questionText.trim()) {
        throw new Error("All questions must have text");
      }
      if (question.options.length !== 4) {
        throw new Error("All questions must have exactly 4 options");
      }
      if (question.options.some((opt) => !opt.trim())) {
        throw new Error("All answer options must be filled");
      }
      if (question.correctAnswerIndex < 0 || question.correctAnswerIndex > 3) {
        throw new Error("Invalid correct answer index");
      }
    }

    // Check if quiz already exists for this lesson
    const existingQuiz = await Quiz.findOne({
      lessonId: quizData.lessonId,
    });

    if (existingQuiz) {
      throw new Error("A quiz already exists for this lesson ID");
    }

    // Create the quiz
    const newQuiz = await Quiz.create({
      lessonId: quizData.lessonId,
      title: quizData.title,
      questions: quizData.questions,
    });

    revalidatePath(`/quiz/${quizData.lessonId}`);
    revalidatePath(`/admin/quiz`);

    return {
      success: true,
      quizId: newQuiz._id.toString(),
      message: "Quiz created successfully",
    };
  } catch (error) {
    console.error("Error creating custom quiz:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getAllQuizzes() {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    const quizzes = await Quiz.find({}).sort({ createdAt: -1 }).lean();

    const serializedQuizzes = quizzes.map((quiz: any) => {
      return {
        _id: quiz._id.toString(),
        lessonId: quiz.lessonId.toString(),
        title: quiz.title,
        questions: quiz.questions.map((question: any) => ({
          questionText: question.questionText,
          options: [...question.options],
          correctAnswerIndex: question.correctAnswerIndex,
        })),
        createdAt: quiz.createdAt
          ? quiz.createdAt.toISOString()
          : new Date().toISOString(),
        updatedAt: quiz.updatedAt
          ? quiz.updatedAt.toISOString()
          : new Date().toISOString(),
      };
    });

    return serializedQuizzes;
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    return [];
  }
}

export async function deleteQuiz(quizId: string) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      throw new Error("Invalid Quiz ID format");
    }

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      throw new Error("Quiz not found");
    }

    revalidatePath("/admin/quiz/manage");
    revalidatePath("/admin/quiz");

    return {
      success: true,
      message: "Quiz deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getQuizResultStats() {
  try {
    await connectToDatabase();

    if (!mongoose.models.UserResult) {
      require("@/lib/database/models/userResult.model");
    }

    const UserResult = mongoose.models.UserResult;
    const allResults = await UserResult.find({});

    if (allResults.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        highPerformers: 0,
        needSupport: 0,
      };
    }

    const totalAttempts = allResults.length;
    const averageScore = Math.round(
      allResults.reduce((sum: number, result: any) => sum + result.score, 0) /
        totalAttempts
    );

    const highPerformers = allResults.filter(
      (result: any) => result.score >= 80
    ).length;
    const needSupport = allResults.filter(
      (result: any) => result.score < 60
    ).length;

    return {
      totalAttempts,
      averageScore,
      highPerformers,
      needSupport,
    };
  } catch (error) {
    console.log("Error getting quiz stats:", error);
    return {
      totalAttempts: 0,
      averageScore: 0,
      highPerformers: 0,
      needSupport: 0,
    };
  }
}
