import { ActionButton } from "@/components/ui/actionbutton";
import { PlayCircle, ListCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm text-center">
          Quiz Application
        </h1>
        <p className="mb-10 max-w-md mx-auto text-center text-lg text-slate-600 font-medium">
          Create, take, and review quizzes easily — improve your learning
          journey.
        </p>

        <div className="flex flex-col gap-6">
          <ActionButton
            label="Take Quiz"
            icon={<PlayCircle className="h-5 w-5" />}
            tooltip="Start answering quiz questions now."
            href="/quiz/60f8a8d5287f1e00203b5f9b"
            variant="outline"
          />

          <ActionButton
            label="View Results"
            icon={<ListCheck className="h-5 w-5" />}
            tooltip="Check your past quiz scores and stats."
            href="/quiz/results"
            variant="secondary"
          />
        </div>
      </div>
    </main>
  );
}
