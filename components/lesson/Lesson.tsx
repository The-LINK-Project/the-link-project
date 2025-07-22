"use client";

import React, { useRef, useState, useEffect } from "react";

import { processAudioMessage } from "@/lib/actions/conversation.actions";

import LessonInputBar from "./LessonInputBar";
import LessonMessages from "./LessonMessages";
import LessonObjectivesMet from "./LessonObjectivesMet";
import LessonNotStarted from "./LessonNotStarted";
import LessonCompleteModal from "./LessonCompleteModal";

import { urlToBase64 } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Loader2, ChevronDown } from "lucide-react";

import Link from "next/link";

type LessonProps = {
    previousLessonProgress: LessonProgress;
    lessonInfo: Lesson;
};

const Lesson = ({ previousLessonProgress, lessonInfo }: LessonProps) => {
    const [lessonProgress, setLessonProgress] = useState<LessonProgress>(
        previousLessonProgress,
    );
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);
    const allAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());
    // const convoHistoryRef = useRef<Message[]>(previousConvoHistory ?? []);

    // Function to stop all currently playing audio
    const stopAllAudio = () => {
        // Stop the current main audio if playing
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current = null;
        }

        // Stop all registered audio elements
        allAudioElementsRef.current.forEach((audio) => {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    };

    // Function to play audio safely (stops others first)
    const playAudioSafely = (audioElement: HTMLAudioElement) => {
        stopAllAudio();
        currentAudioRef.current = audioElement;

        // Add event listener to clear ref when audio ends
        const handleEnded = () => {
            if (currentAudioRef.current === audioElement) {
                currentAudioRef.current = null;
            }
            audioElement.removeEventListener("ended", handleEnded);
        };

        audioElement.addEventListener("ended", handleEnded);
        audioElement.play().catch((error) => {
            console.warn("Audio play failed:", error);
            currentAudioRef.current = null;
        });
    };

    // Scroll detection
    useEffect(() => {
        const scrollArea = scrollAreaRef.current;
        if (!scrollArea) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollArea;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!isNearBottom && scrollHeight > clientHeight);
        };

        scrollArea.addEventListener("scroll", handleScroll);
        return () => scrollArea.removeEventListener("scroll", handleScroll);
    }, [lessonProgress.convoHistory]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [lessonProgress.convoHistory]);

    // Cleanup audio on component unmount
    useEffect(() => {
        return () => {
            stopAllAudio();
        };
    }, []);

    // checking if all objectives are met and can end the lesson and if they are then maybe have a quick end of lesson progress popup and continue to qiuz
    useEffect(() => {
        if (lessonProgress.objectivesMet.every((objective) => objective)) {
            console.log("All objectives met, ending lesson");
            setIsComplete(true);
        }
    }, [lessonProgress.objectivesMet]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (!audioURL) return;

        const handleResponse = async () => {
            setIsLoading(true);

            const base64 = await urlToBase64(audioURL);
            // server action that gets the audio from the user and processes it and sends it to gemini and openai for the response
            const result = await processAudioMessage({
                audioBase64: base64,
                lessonProgress,
            });

            if (result.success) {
                // Play audio
                const audioSrc = `data:audio/wav;base64,${result.audioBase64}`;
                const audio = new Audio(audioSrc);
                playAudioSafely(audio);

                // Update state
                setLessonProgress(result.updatedLessonProgress);
            }

            setIsLoading(false);
        };

        handleResponse();
    }, [audioURL]);

    const handleStartRecording = async () => {
        if (!navigator.mediaDevices) {
            alert("MediaDevices API not supported.");
            return;
        }

        // Stop all currently playing audio before starting recording
        stopAllAudio();

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, {
                type: "audio/webm",
            });
            setAudioURL(URL.createObjectURL(audioBlob));
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const handleStopRecording = async () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    return (
        <>
            <TooltipProvider>
                <div className="min-h-screen bg-white relative">
                    {/* Lesson Objectives */}
                    <div className="bg-white px-6 py-4 border-b border-gray-100">
                        <div className="max-w-4xl mx-auto">
                            <LessonObjectivesMet
                                lessonObjectives={lessonInfo.objectives}
                                lessonObjectivesProgress={lessonProgress.objectivesMet}
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex flex-col items-center px-6 py-8">
                        <div className="w-full max-w-4xl">
                            {/* Main Conversation Area */}
                            <Card className="shadow-xl border-[rgb(90,199,219)]/20 relative">
                                <CardContent className="p-0">
                                    <div className="flex flex-col h-[600px]">
                                        {/* Messages Area */}
                                        <div className="flex-1 relative overflow-hidden">
                                            <ScrollArea className="h-full" ref={scrollAreaRef}>
                                                <div className="p-6">
                                                    {lessonProgress.convoHistory.length === 0 ? (
                                                        <LessonNotStarted />
                                                    ) : (
                                                        <LessonMessages
                                                            convoHistory={lessonProgress.convoHistory}
                                                            allAudioElementsRef={allAudioElementsRef}
                                                            currentAudioRef={currentAudioRef}
                                                        />
                                                    )}
                                                    {isLoading && (
                                                        <div className="flex justify-center mt-6">
                                                            <div className="flex items-center gap-3 text-gray-600">
                                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                                <span className="text-sm font-medium">
                                                                    Processing your response...
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </ScrollArea>

                                            {/* Scroll to Bottom Button */}
                                            {showScrollButton && (
                                                <Button
                                                    onClick={scrollToBottom}
                                                    size="sm"
                                                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)]/90 text-white shadow-lg z-10"
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <LessonInputBar
                                            recording={recording}
                                            isLoading={isLoading}
                                            audioURL={audioURL ?? ""}
                                            handleStopRecording={handleStopRecording}
                                            handleStartRecording={handleStartRecording}
                                            playAudioSafely={playAudioSafely}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-blue-700">
                        <div className="flex flex-col items-center text-blue-700">
                            <Link href={`/learn/${lessonProgress.lessonIndex}/quiz`}>
                                Already know this? Test your knowledge with this quiz!
                            </Link>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
            <LessonCompleteModal
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                lessonIndex={lessonProgress.lessonIndex}
                lessonObjectives={lessonInfo.objectives}
            />
        </>
    );
};

export default Lesson;
