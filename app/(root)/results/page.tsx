import { getUserResults } from "@/lib/actions/quizResults.actions";
import QuizResults from "@/components/results/QuizResults";
import { QuizStats } from "@/components/results/QuizStats";
import QuizNoResults from "@/components/results/QuizNoResults";

export default async function ResultsPage() {
  const results = await getUserResults();

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce((sum, result) => sum + result.score, 0) /
            results.length
        )
      : 0;

  const totalQuizzes = results.length;
  const highestScore =
    results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Quiz Results
          </h1>
          <p className="text-lg text-gray-600">
            Track your learning progress and performance
          </p>
        </div>
        {results.length > 0 && (
          <QuizStats
            highestScore={highestScore}
            averageScore={averageScore}
            totalQuizzes={totalQuizzes}
          />
        )}

        {/* Results Table */}
        {results.length === 0 ? (
          <QuizNoResults />
        ) : (
          <QuizResults results={results} />
        )}

        {/* Footer Stats */}
        {results.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {results.length} result{results.length !== 1 ? "s" : ""} •
              Keep practicing to improve your scores!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
