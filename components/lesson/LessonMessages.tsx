import React from "react";
import { User, Bot } from "lucide-react";

type LessonMessagesProps = {
    convoHistory: Message[];
    allAudioElementsRef: React.RefObject<Set<HTMLAudioElement>>;
    currentAudioRef: React.RefObject<HTMLAudioElement | null>;
};

const LessonMessages = ({
    convoHistory,
    allAudioElementsRef,
    currentAudioRef,
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
                        <p className="text-sm leading-relaxed mb-3">{message.message}</p>
                        {message.audioURL && (
                            <audio
                                src={message.audioURL}
                                controls
                                className="w-full h-8 rounded-lg"
                                ref={(audioElement) => {
                                    if (audioElement) {
                                        allAudioElementsRef.current.add(audioElement);

                                        // Add event listener to manage playback
                                        const handlePlay = () => {
                                            // Stop other audio when this one starts playing
                                            allAudioElementsRef.current.forEach((audio) => {
                                                if (audio !== audioElement && !audio.paused) {
                                                    audio.pause();
                                                    audio.currentTime = 0;
                                                }
                                            });

                                            // Stop main audio if playing
                                            if (
                                                currentAudioRef.current &&
                                                currentAudioRef.current !== audioElement
                                            ) {
                                                currentAudioRef.current.pause();
                                                currentAudioRef.current.currentTime = 0;
                                                currentAudioRef.current = null;
                                            }
                                        };

                                        audioElement.addEventListener("play", handlePlay);

                                        // Cleanup on unmount
                                        return () => {
                                            allAudioElementsRef.current.delete(audioElement);
                                            audioElement.removeEventListener("play", handlePlay);
                                        };
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonMessages;
