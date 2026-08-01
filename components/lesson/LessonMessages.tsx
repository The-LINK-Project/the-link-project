import React from "react";
import { User, Bot } from "lucide-react";

type LessonMessagesProps = {
    convoHistory: Message[];
};

const LessonMessages = ({ convoHistory }: LessonMessagesProps) => {
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
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonMessages;
