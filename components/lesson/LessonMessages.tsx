import React from "react";
import { User, Bot, Volume2 } from "lucide-react";

type LessonMessagesProps = {
    convoHistory: Message[];
    onPlayTutorMessage: (messageIndex: number) => void;
};

const LessonMessages = ({
    convoHistory,
    onPlayTutorMessage,
}: LessonMessagesProps) => {
    return (
        <div className="space-y-6">
            {convoHistory.map((message, index) => (
                <div
                    key={index}
                    className={`flex gap-4 ${message.role === "User" ? "justify-end" : "justify-start"
                        }`}
                >
                    <div
                        className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${message.role === "User"
                            ? "bg-primary text-white"
                            : "bg-gray-50 text-gray-800 border border-gray-100"
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            {message.role === "User" ? (
                                <User className="h-4 w-4" />
                            ) : (
                                <Bot className="h-4 w-4" />
                            )}
                            <span className="font-medium text-sm">{message.role}</span>
                        </div>
                        <p
                            className={`text-sm leading-relaxed mb-3 ${message.role === "User" ? "text-right" : "text-left"}`}
                            >
                            {message.message}
                        </p>
                        {message.role === "System" && (
                            <button
                                type="button"
                                onClick={() => onPlayTutorMessage(index)}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                                aria-label="Play tutor audio"
                            >
                                <Volume2 className="h-3.5 w-3.5" />
                                Hear teacher
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonMessages;
