"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomQuiz } from "@/lib/actions/quiz.actions";
import QuestionBuilder from "./QuestionBuilder";
import QuizPreview from "./QuizPreview";
import { Plus, Save, Eye, EyeOff } from "lucide-react";

interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizData {
  title: string;
  lessonId: string;
  questions: Question[];
}

export default function QuizForm() {
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    lessonId: "",
    questions: [],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const addQuestion = () => {
    const newQuestion: Question = {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
    };
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? updatedQuestion : q
      ),
    }));
  };

  const removeQuestion = (index: number) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (
      !quizData.title ||
      !quizData.lessonId ||
      quizData.questions.length === 0
    ) {
      alert(
        "Please fill in all required fields and add at least one question."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createCustomQuiz(quizData);
      if (result.success) {
        alert("Quiz created successfully!");
        router.push("/admin/quiz");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while creating the quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quiz Metadata */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Quiz Information
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              value={quizData.title}
              onChange={(e) =>
                setQuizData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
              placeholder="Enter quiz title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lesson ID *
            </label>
            <input
              type="text"
              value={quizData.lessonId}
              onChange={(e) =>
                setQuizData((prev) => ({ ...prev, lessonId: e.target.value }))
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
              placeholder="Enter lesson ID..."
            />
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Questions ({quizData.questions.length})
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              {showPreview ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          </div>
        </div>

        {quizData.questions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
            <p className="text-slate-500 text-lg mb-4">
              No questions added yet
            </p>
            <button
              onClick={addQuestion}
              className="px-6 py-3 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 transition-colors"
            >
              Add Your First Question
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {quizData.questions.map((question, index) => (
              <QuestionBuilder
                key={index}
                question={question}
                questionNumber={index + 1}
                onUpdate={(updatedQuestion) =>
                  updateQuestion(index, updatedQuestion)
                }
                onRemove={() => removeQuestion(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {showPreview && quizData.questions.length > 0 && (
        <QuizPreview quizData={quizData} />
      )}

      {/* Submit Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Ready to create your quiz?
            </h3>
            <p className="text-slate-600">
              Make sure all questions are complete before saving.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !quizData.title ||
              !quizData.lessonId ||
              quizData.questions.length === 0
            }
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Creating Quiz..." : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}
