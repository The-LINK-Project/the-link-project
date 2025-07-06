import { getUserResults } from "@/lib/actions/quizResults.actions";
import { Calendar, Trophy, Target, Clock } from "lucide-react";

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Trophy className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Highest Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {highestScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Target className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {averageScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Clock className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Quizzes Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalQuizzes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        {results.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results yet
            </h3>
            <p className="text-gray-600 mb-6">
              Complete your first quiz to see your results here
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
              Take a Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">
                    Date & Time
                  </span>
                </div>
                <div className="col-span-5">
                  <span className="font-semibold text-gray-900">
                    Quiz Title
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-900">Score</span>
                </div>
                <div className="col-span-1">
                  <span className="font-semibold text-gray-900">Grade</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {results.map((result, index) => (
                <div
                  key={result._id.toString()}
                  className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="col-span-4">
                    <div className="text-sm text-gray-900 font-medium">
                      {new Date(result.completedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(result.completedAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      Simple Present Tense Quiz
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Lesson {index + 1} • Grammar
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-lg font-bold text-gray-900">
                      {result.score}%
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        result.score >= 90
                          ? "bg-gray-900 text-white"
                          : result.score >= 80
                          ? "bg-gray-200 text-gray-800"
                          : result.score >= 70
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-50 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {result.score >= 90
                        ? "A"
                        : result.score >= 80
                        ? "B"
                        : result.score >= 70
                        ? "C"
                        : "D"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
