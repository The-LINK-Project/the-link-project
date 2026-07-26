import QuizForm from "@/components/admin/quiz/QuizForm";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function CreateQuizPage() {
    return (
        <AdminPageShell
            title="Create New Quiz"
            description="Build a custom quiz with multiple-choice questions"
            backHref="/admin/quiz"
            backLabel="Back to Quiz Management"
            width="narrow"
        >
            <QuizForm />
        </AdminPageShell>
    );
}
