import { Database, Plus } from "lucide-react";
import { getAllQuizzes, getQuizResultStats } from "@/lib/actions/quiz.actions";
import {
    AdminPageShell,
    AdminManagementCard,
} from "@/components/admin/AdminPageShell";

// Quiz stats need an admin session, which only exists at request time —
// prerendering would permanently bake the empty fallbacks
export const dynamic = "force-dynamic";

export default async function AdminQuizPage() {
    const [quizzes, quizStats] = await Promise.all([
        getAllQuizzes().catch(() => []),
        getQuizResultStats().catch(() => ({
            totalAttempts: 0,
            averageScore: 0,
            highPerformers: 0,
            needSupport: 0,
        })),
    ]);

    return (
        <AdminPageShell
            title="Quiz Management"
            description="Create and manage comprehension quizzes for the platform"
            backHref="/admin"
            backLabel="Back to Dashboard"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <AdminManagementCard
                    href="/admin/quiz/create"
                    title="Create New Quiz"
                    description="Build a quiz with multiple-choice questions"
                    stat="Linked to a lesson on creation"
                    cta="Create"
                    icon={Plus}
                    accent="violet"
                />
                <AdminManagementCard
                    href="/admin/quiz/manage"
                    title="Quiz Database"
                    description="View, inspect and delete existing quizzes"
                    stat={`${quizzes.length} quizzes · ${quizStats.totalAttempts} attempts`}
                    cta="Manage"
                    icon={Database}
                    accent="blue"
                />
            </div>
        </AdminPageShell>
    );
}
