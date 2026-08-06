"use server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import Quiz from "@/lib/database/models/quiz.model";
import QuizResult from "@/lib/database/models/quizResult.model";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import { requireAdmin } from "@/lib/auth";

// Quiz content is admin-authored and changes rarely, so the per-lesson read is
// cached with the "quizzes" tag. Admin mutations call revalidateTag("quizzes")
// so edits show up immediately. Quiz RESULTS are user-specific and are never
// cached here.
const getCachedQuizByLessonId = unstable_cache(
    async (lessonId: number) => {
        await connectToDatabase();

        // Ensure Quiz model is registered
        if (!mongoose.models.Quiz) {
            require("@/lib/database/models/quiz.model");
        }

        const quiz = await Quiz.findOne({
            lessonId: lessonId,
        }).lean();
        // Not every lesson has a quiz — callers render a "no quiz" state
        if (!quiz) {
            return null;
        }

        // Alternative quick fix with JSON serialization
        const safeQuiz = JSON.parse(JSON.stringify(quiz));

        // Strip the answer key: this payload is sent to the browser, and
        // grading happens server-side in submitQuiz against the DB copy
        const publicQuiz: PublicQuizData = {
            title: safeQuiz.title,
            lessonId: safeQuiz.lessonId,
            questions: safeQuiz.questions.map((question: Question) => ({
                questionText: question.questionText,
                options: question.options,
            })),
        };
        return publicQuiz;
    },
    ["get-quiz-by-lesson-id"],
    { tags: ["quizzes"], revalidate: 3600 },
);

export async function getQuizByLessonId(
    lessonId: number,
): Promise<PublicQuizData | null> {
    try {
        return await getCachedQuizByLessonId(lessonId);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
}

export async function createCustomQuiz(quizData: QuizData) {
    await requireAdmin();
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

        revalidateTag("quizzes");
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
    // Admin-only read: it returns every correctAnswerIndex, and as a server
    // action it is directly invokable — page-level guards don't cover it
    await requireAdmin();
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
    await requireAdmin();
    try {
        await connectToDatabase();

        // Ensure Quiz model is registered
        if (!mongoose.models.Quiz) {
            require("@/lib/database/models/quiz.model");
        }

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            throw new Error("Invalid Quiz ID format");
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw new Error("Quiz not found");
        }

        // Children first, parent last: if any cleanup step fails the quiz
        // still exists and the whole delete can simply be retried. Deleting
        // the parent first would strand orphans behind a "not found" error.
        //
        // The confirm dialog promises associated results are removed too —
        // orphaned results would keep inflating stats and block re-creating
        // a quiz for the same lesson number.
        await QuizResult.deleteMany({ lessonId: quiz.lessonId });

        // Results are only ever pushed onto progress docs with the same
        // lesson number, so this clears every stale reference. Completion is
        // recomputed from objectives alone: completion earned only through
        // the deleted quiz is revoked, completion earned by meeting the
        // objectives is preserved. ($size guard: $allElementsTrue([]) is true)
        await LessonProgress.updateMany({ lessonIndex: quiz.lessonId }, [
            {
                $set: {
                    quizResult: [],
                    completed: {
                        $and: [
                            {
                                $gt: [
                                    {
                                        $size: {
                                            $ifNull: ["$objectivesMet", []],
                                        },
                                    },
                                    0,
                                ],
                            },
                            {
                                $allElementsTrue: [
                                    { $ifNull: ["$objectivesMet", []] },
                                ],
                            },
                        ],
                    },
                },
            },
        ]);

        await Quiz.findByIdAndDelete(quizId);

        revalidateTag("quizzes");
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
    // Admin-only read, guarded like getAllQuizzes (outside the try so the
    // auth failure isn't swallowed into the default zero stats)
    await requireAdmin();
    try {
        await connectToDatabase();

        if (!mongoose.models.QuizResult) {
            require("@/lib/database/models/quizResult.model");
        }

        const QuizResult = mongoose.models.QuizResult;
        const allResults = await QuizResult.find({});

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
            totalAttempts,
        );

        const highPerformers = allResults.filter(
            (result: any) => result.score >= 80,
        ).length;
        const needSupport = allResults.filter(
            (result: any) => result.score < 60,
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
