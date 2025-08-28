"use client";
import { useState } from "react";
import {
    Eye,
    Trash2,
    Search,
    Filter,
    Calendar,
    BookOpen,
    Users,
} from "lucide-react";
import QuizDetailModal from "@/components/admin/quiz/QuizDetailModal";
import { deleteQuiz } from "@/lib/actions/quiz.actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QuizListProps {
    quizzes: QuizAdmin[];
}

export default function QuizList({ quizzes: initialQuizzes }: QuizListProps) {
    const [quizzes, setQuizzes] = useState(initialQuizzes);
    const [selectedQuiz, setSelectedQuiz] = useState<QuizAdmin | null>(null);
    const [deletingQuiz, setDeletingQuiz] = useState<QuizAdmin | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"title" | "createdAt" | "questions">(
        "createdAt",
    );
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredQuizzes = quizzes
        .filter(
            (quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.lessonId
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title);
                case "createdAt":
                    return (
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                case "questions":
                    return b.questions.length - a.questions.length;
                default:
                    return 0;
            }
        });

    const handleDelete = async () => {
        if (!deletingQuiz) return;

        setIsDeleting(true);
        try {
            const result = await deleteQuiz(deletingQuiz._id);
            if (result.success) {
                // Remove the deleted quiz from state
                setQuizzes((prev) =>
                    prev.filter((quiz) => quiz._id !== deletingQuiz._id),
                );
                alert("Quiz deleted successfully!");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while deleting the quiz.");
        } finally {
            setIsDeleting(false);
            setDeletingQuiz(null);
        }
    };

    return (
        <>
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search quizzes or lesson IDs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Filter className="h-4 w-4 text-slate-600" />
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "title" | "createdAt" | "questions")
                            }
                            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                        >
                            <option value="createdAt">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                            <option value="questions">Sort by Questions</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Quiz Cards */}
            {filteredQuizzes.length === 0 ? (
                <div className="bg-white rounded-xl p-12 shadow-lg text-center">
                    <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">
                        {searchTerm ? "No quizzes found" : "No quizzes available"}
                    </h3>
                    <p className="text-slate-500">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "Create your first quiz to get started"}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quiz Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                                    {quiz.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Lesson: {quiz.lessonId}</span>
                                </div>
                            </div>

                            {/* Quiz Stats */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Questions:</span>
                                    <span className="font-semibold text-[rgb(90,199,219)]">
                                        {quiz.questions.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Created:</span>
                                    <span className="text-slate-700">
                                        {new Date(quiz.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Updated:</span>
                                    <span className="text-slate-700">
                                        {new Date(quiz.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Question Preview */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-slate-700 mb-2">
                                    Sample Question:
                                </h4>
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        {quiz.questions[0]?.questionText ||
                                            "No questions available"}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons - Only View and Delete */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedQuiz(quiz)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 transition-colors text-sm cursor-pointer"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                </button>

                                <button
                                    onClick={() => setDeletingQuiz(quiz)}
                                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                                    title="Delete Quiz"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quiz Detail Modal */}
            {selectedQuiz && (
                <QuizDetailModal
                    quiz={selectedQuiz}
                    onClose={() => setSelectedQuiz(null)}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!deletingQuiz}
                onOpenChange={(open) => !open && setDeletingQuiz(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{deletingQuiz?.title}"? This
                            action cannot be undone. All quiz data and associated results will
                            be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? "Deleting..." : "Delete Quiz"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
