import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import QuizList from "@/components/admin/quiz/QuizList";
import { Badge } from "@/components/ui/badge";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

// Admin data (including answer keys) must never be baked into the static
// build; getAllQuizzes also requires an admin session, which only exists at
// request time
export const dynamic = "force-dynamic";

export default async function QuizManagePage() {
    const quizzes = await getAllQuizzes();

    return (
        <AdminPageShell
            title="Quiz Database"
            description="Manage and view all quizzes in the system"
            backHref="/admin/quiz"
            backLabel="Back to Quiz Management"
            actions={
                <Badge
                    variant="secondary"
                    className="bg-[rgb(90,199,219)]/10 text-[rgb(70,179,199)] border-[rgb(90,199,219)]/20"
                >
                    {quizzes.length} Total Quizzes
                </Badge>
            }
        >
            <QuizList quizzes={quizzes} />
        </AdminPageShell>
    );
}
