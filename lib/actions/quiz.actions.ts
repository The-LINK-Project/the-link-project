"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose, { Model, Document } from "mongoose";

// Define interfaces for TypeScript
interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface IQuiz extends Document {
  lessonId: mongoose.Types.ObjectId;
  title: string;
  questions: IQuestion[];
}

// Better model registration pattern for Quiz with proper typing
let Quiz: Model<IQuiz>;
try {
  Quiz = mongoose.model<IQuiz>("Quiz");
} catch {
  // If model doesn't exist, import and register it
  const quizModel = require("@/lib/database/models/quiz.model").default;
  Quiz = quizModel;
}

export async function getQuizByLessonId(lessonId: string) {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      throw new Error("Invalid Lesson ID format");
    }

    const quiz = await Quiz.findOne({
      lessonId: new mongoose.Types.ObjectId(lessonId),
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

export async function createTestQuiz() {
  try {
    await connectToDatabase();

    // Ensure Quiz model is registered
    if (!mongoose.models.Quiz) {
      require("@/lib/database/models/quiz.model");
    }

    const lessonId = "60f8a8d5287f1e00203b5f9b"; // the fake lesson ID I made

    // check if quiz exists
    const existingQuiz = await Quiz.findOne({
      lessonId: new mongoose.Types.ObjectId(lessonId),
    });
    if (existingQuiz) {
      await Quiz.findByIdAndDelete(existingQuiz._id);
    }

    const testQuiz = {
      lessonId: new mongoose.Types.ObjectId(lessonId),
      title: "Simple Present Tense Quiz",
      questions: [
        {
          questionText:
            "What is the correct form of the verb in: She ___ to work at 8 AM?",
          options: ["go", "goes", "going", "gone"],
          correctAnswerIndex: 1,
        },
        {
          questionText: "Which sentence is correct?",
          options: [
            "He play football",
            "He plays football",
            "He playing football",
            "He played football",
          ],
          correctAnswerIndex: 1,
        },
        {
          questionText: "Choose the correct sentence:",
          options: [
            "They doesn't work here",
            "They don't works here",
            "They don't working here",
            "They don't work here",
          ],
          correctAnswerIndex: 3,
        },
      ],
    };

    await Quiz.create(testQuiz);
    revalidatePath(`/quiz/${lessonId}`);
    revalidatePath(`/quiz/results`);
  } catch (error) {
    console.error("Error creating test quiz:", error);
    throw error;
  }
}

export async function createCustomQuiz(quizData: {
  title: string;
  lessonId: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
}) {
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

    if (!mongoose.Types.ObjectId.isValid(quizData.lessonId)) {
      throw new Error("Invalid Lesson ID format");
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
      lessonId: new mongoose.Types.ObjectId(quizData.lessonId),
    });

    if (existingQuiz) {
      throw new Error("A quiz already exists for this lesson ID");
    }

    // Create the quiz
    const newQuiz = await Quiz.create({
      lessonId: new mongoose.Types.ObjectId(quizData.lessonId),
      title: quizData.title,
      questions: quizData.questions,
    });

    revalidatePath(`/quiz/${quizData.lessonId}`);
    revalidatePath(`/admin/quiz`);

    return {
      success: true,
      quizId: (newQuiz._id as mongoose.Types.ObjectId).toString(),
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
