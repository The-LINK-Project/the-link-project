import React from 'react';
import { Bot } from 'lucide-react';

const LessonNotStarted = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px] text-gray-500">
        <div className="text-center">
            <Bot className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Ready to start your lesson!
            </h3>
            <p className="text-sm text-gray-500">
            Click the microphone below to begin speaking
            </p>
        </div>
    </div>
  )
}

export default LessonNotStarted