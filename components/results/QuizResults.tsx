import React from 'react';
import { Calendar } from 'lucide-react';
import QuizResult from './QuizResult';

type QuizResultsProps = {
  results: QuizResult[];
};

const QuizResults = ({ results }: QuizResultsProps) => {
  return (
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
            <QuizResult result={result} index={index} key={result._id.toString()} />
            ))}
        </div>
    </div>
  )
}

export default QuizResults