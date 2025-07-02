import { ActionButton } from "@/components/ui/actionbutton";
import { CheckCircle2, Settings, Database, Plus } from "lucide-react";
import { createTestQuiz } from "@/lib/actions/quiz.actions";

export default function AdminQuizPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Quiz Administration
          </h1>
          <p className="text-lg text-slate-600">
            Manage and create quizzes for the platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[rgb(90,199,219)]">
              Create New Quiz
            </h2>
            <ActionButton
              label="Create Quiz"
              icon={<Plus className="h-5 w-5" />}
              href="/admin/quiz/create"
              variant="default"
            />
            <p className="text-sm text-slate-500 mt-3">
              Create a custom quiz with your own questions
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Quick Test Quiz
            </h2>
            <form action={createTestQuiz}>
              <ActionButton
                label="Create Test Quiz"
                icon={<CheckCircle2 className="h-5 w-5" />}
                type="submit"
                variant="outline"
              />
            </form>
            <p className="text-sm text-slate-500 mt-3">
              Creates a sample English grammar quiz for testing
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Quiz Database
            </h2>
            <ActionButton
              label="View All Quizzes"
              icon={<Database className="h-5 w-5" />}
              href="/admin/quiz/manage"
              variant="secondary"
            />
            <p className="text-sm text-slate-500 mt-3">
              View and manage existing quizzes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
