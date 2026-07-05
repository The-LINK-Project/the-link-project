"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    createPictureStorySet,
    deletePictureStorySet,
} from "@/lib/actions/pictureStory.actions";
import { Plus, Save, Trash2 } from "lucide-react";

const OPTIONS_PER_QUESTION = 4;

// The sequence is edited as one space-separated string (e.g. "🌧️ ☂️ 🚶"),
// so drafts keep it as a string until submit.
type QuestionDraft = {
    sequenceText: string;
    options: string[];
    correctAnswerIndex: number;
};

const emptyQuestion = (): QuestionDraft => ({
    sequenceText: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
});

type PictureStorySetManagerProps = {
    initialSets: PictureStorySetAdmin[];
};

export default function PictureStorySetManager({
    initialSets,
}: PictureStorySetManagerProps) {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<QuestionDraft[]>([
        emptyQuestion(),
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const updateQuestion = (
        index: number,
        updater: (question: QuestionDraft) => QuestionDraft,
    ) => {
        setQuestions((prev) =>
            prev.map((question, i) =>
                i === index ? updater(question) : question,
            ),
        );
    };

    const addQuestion = () => {
        setQuestions((prev) => [...prev, emptyQuestion()]);
    };

    const removeQuestion = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const isFormValid =
        title.trim().length > 0 &&
        questions.length > 0 &&
        questions.every(
            (question) =>
                question.sequenceText.trim().length > 0 &&
                question.options.every((option) => option.trim().length > 0),
        );

    const handleSubmit = async () => {
        if (!isFormValid) {
            alert(
                "Please add a title and fill in the pictures and all 4 sentences for every question.",
            );
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createPictureStorySet({
                title,
                questions: questions.map((question) => ({
                    sequence: question.sequenceText.trim().split(/\s+/),
                    options: question.options,
                    correctAnswerIndex: question.correctAnswerIndex,
                })),
            });
            if (result.success) {
                alert("Question set created successfully!");
                setTitle("");
                setQuestions([emptyQuestion()]);
                router.refresh();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while creating the question set.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (set: PictureStorySetAdmin) => {
        if (!confirm(`Delete the set "${set.title}"? This cannot be undone.`)) {
            return;
        }

        setDeletingId(set._id);
        try {
            const result = await deletePictureStorySet(set._id);
            if (result.success) {
                router.refresh();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while deleting the question set.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Set details */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                    Set Information
                </h2>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Set Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                        placeholder="e.g. Daily actions"
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Questions ({questions.length})
                    </h2>
                    <button
                        onClick={addQuestion}
                        className="flex items-center gap-2 px-4 py-2 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Question
                    </button>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                    Enter emojis separated by spaces (e.g. &quot;🌧️ ☂️
                    🚶&quot;), or paste image URLs. Keep the pictures simple,
                    literal, and culturally neutral, and use short sentences
                    with basic words.
                </p>

                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-slate-700">
                                    Question {index + 1}
                                </h3>
                                {questions.length > 1 && (
                                    <button
                                        onClick={() => removeQuestion(index)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        aria-label={`Remove question ${index + 1}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pictures / emojis (separated by spaces) *
                                </label>
                                <input
                                    type="text"
                                    value={question.sequenceText}
                                    onChange={(e) =>
                                        updateQuestion(index, (q) => ({
                                            ...q,
                                            sequenceText: e.target.value,
                                        }))
                                    }
                                    className="w-full p-3 border border-slate-300 rounded-lg text-2xl focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                                    placeholder="🌧️ ☂️ 🚶"
                                />
                                {question.sequenceText.trim() && (
                                    <p className="mt-2 text-3xl">
                                        {question.sequenceText
                                            .trim()
                                            .split(/\s+/)
                                            .join(" → ")}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-700">
                                    Sentence options (select the correct one) *
                                </p>
                                {question.options.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className="flex items-center gap-3"
                                    >
                                        <input
                                            type="radio"
                                            name={`correct-answer-${index}`}
                                            checked={
                                                question.correctAnswerIndex ===
                                                optionIndex
                                            }
                                            onChange={() =>
                                                updateQuestion(index, (q) => ({
                                                    ...q,
                                                    correctAnswerIndex:
                                                        optionIndex,
                                                }))
                                            }
                                            className="h-4 w-4 shrink-0 accent-green-600"
                                            aria-label={`Mark option ${optionIndex + 1} as correct`}
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) =>
                                                updateQuestion(index, (q) => ({
                                                    ...q,
                                                    options: q.options.map(
                                                        (o, i) =>
                                                            i === optionIndex
                                                                ? e.target.value
                                                                : o,
                                                    ),
                                                }))
                                            }
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                                            placeholder={`Sentence ${optionIndex + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Ready to create this set?
                        </h3>
                        <p className="text-slate-600">
                            Make sure every question is complete before saving.
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isFormValid}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Creating Set..." : "Create Set"}
                    </button>
                </div>
            </div>

            {/* Existing sets */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                    Existing Sets ({initialSets.length})
                </h2>
                {initialSets.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">
                        No question sets created yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {initialSets.map((set) => (
                            <div
                                key={set._id}
                                className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {set.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {set.questions.length} questions ·
                                        created{" "}
                                        {new Date(
                                            set.createdAt,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(set)}
                                    disabled={deletingId === set._id}
                                    className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {deletingId === set._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
