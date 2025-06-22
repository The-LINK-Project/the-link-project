
import Link from "next/link";
import { createTestQuiz } from "@/lib/actions/quiz.actions";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Quiz Application</h1>

      <div className="flex flex-col gap-6 items-center">
        <form action={createTestQuiz} className="mb-4">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Create Test Quiz
          </button>
        </form>

        <Link
          href="/quiz/60f8a8d5287f1e00203b5f9b"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Take Quiz
        </Link>

        <Link
          href="/quiz/results"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          View Results
        </Link>
      </div>
    </div>
  );
}
