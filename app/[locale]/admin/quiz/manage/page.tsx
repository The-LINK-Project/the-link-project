import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import QuizList from "@/components/admin/quiz/QuizList";

export default async function QuizManagePage() {
    const quizzes = await getAllQuizzes();

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto p-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold text-[rgb(90,199,219)]">
                            Quiz Database
                        </h1>
                        <div className="text-sm text-slate-600 bg-white px-4 py-2 rounded-lg shadow">
                            Total Quizzes:{" "}
                            <span className="font-semibold text-[rgb(90,199,219)]">
                                {quizzes.length}
                            </span>
                        </div>
                    </div>
                    <p className="text-lg text-slate-600">
                        Manage and view all quizzes in the system
                    </p>
                </div>

                <QuizList quizzes={quizzes} />
            </div>
        </div>
    );
}
