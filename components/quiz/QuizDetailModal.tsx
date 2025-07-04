"use client";
import { X, BookOpen, Calendar, Clock, CheckCircle } from "lucide-react";

interface QuizDetailModalProps {
  quiz: QuizAdmin;
  onClose: () => void;
}

export default function QuizDetailModal({
  quiz,
  onClose,
}: QuizDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - like Shadcn does it */}
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{quiz.title}</h2>
            <p className="text-slate-600">Quiz ID: {quiz._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Quiz Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[rgb(90,199,219)]" />
                <div>
                  <p className="text-sm text-slate-600">Lesson ID</p>
                  <p className="font-semibold">{quiz.lessonId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[rgb(90,199,219)]" />
                <div>
                  <p className="text-sm text-slate-600">Created</p>
                  <p className="font-semibold">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[rgb(90,199,219)]" />
                <div>
                  <p className="text-sm text-slate-600">Last Updated</p>
                  <p className="font-semibold">
                    {new Date(quiz.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Questions ({quiz.questions.length})
            </h3>

            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(90,199,219)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-3">
                        {question.questionText}
                      </h4>

                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-default ${
                              optIndex === question.correctAnswerIndex
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                optIndex === question.correctAnswerIndex
                                  ? "bg-green-500 border-green-500"
                                  : "border-slate-300"
                              }`}
                            >
                              {optIndex === question.correctAnswerIndex && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <span className="flex-1">{option}</span>
                            {optIndex === question.correctAnswerIndex && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-600">
              Quiz contains {quiz.questions.length} questions
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
