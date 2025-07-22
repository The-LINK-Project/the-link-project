"use client";
import { useState } from "react";
import { Trash2, Check } from "lucide-react";

interface Question {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
}

interface QuestionBuilderProps {
    question: Question;
    questionNumber: number;
    onUpdate: (question: Question) => void;
    onRemove: () => void;
}

export default function QuestionBuilder({
    question,
    questionNumber,
    onUpdate,
    onRemove,
}: QuestionBuilderProps) {
    const updateQuestionText = (text: string) => {
        onUpdate({ ...question, questionText: text });
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...question.options];
        newOptions[index] = value;
        onUpdate({ ...question, options: newOptions });
    };

    const setCorrectAnswer = (index: number) => {
        onUpdate({ ...question, correctAnswerIndex: index });
    };

    return (
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                    Question {questionNumber}
                </h3>
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove question"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            {/* Question Text */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Question Text *
                </label>
                <textarea
                    value={question.questionText}
                    onChange={(e) => updateQuestionText(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter your question..."
                />
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                    Answer Options * (Click the checkmark to set correct answer)
                </label>
                {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <button
                            onClick={() => setCorrectAnswer(index)}
                            className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${question.correctAnswerIndex === index
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-slate-300 hover:border-green-400"
                                }`}
                            title={`Set as correct answer`}
                        >
                            {question.correctAnswerIndex === index && (
                                <Check className="h-4 w-4" />
                            )}
                        </button>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                                placeholder={`Option ${index + 1}...`}
                            />
                        </div>
                        <span className="text-sm text-slate-500 w-16">
                            Option {index + 1}
                        </span>
                    </div>
                ))}
            </div>

            {/* Correct Answer Indicator */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                    <strong>Correct Answer:</strong> Option{" "}
                    {question.correctAnswerIndex + 1}
                    {question.options[question.correctAnswerIndex] &&
                        ` - "${question.options[question.correctAnswerIndex]}"`}
                </p>
            </div>
        </div>
    );
}
