"use client";

import React, { useRef, useState, useEffect } from "react";

import {
  processAudioMessage,
  processInitialMessage,
} from "@/lib/actions/conversation.actions";

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
    previousLessonProgress
  );
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingCancelledRef = useRef<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const allAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());
  const initialMessageSentRef = useRef<boolean>(false);
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

  useEffect(() => {
    const handleInitialMessage = async () => {
      // if the lesson hasn't been started (no conversation history) and we haven't sent initial message yet
      if (
        lessonProgress.convoHistory.length === 0 &&
        !initialMessageSentRef.current
      ) {
        initialMessageSentRef.current = true; // Prevent multiple calls
        setIsLoading(true);

        // server action that gets the audio from the user and processes it and sends it to gemini and openai for the response
        const result = await processInitialMessage({
          lessonProgress,
        });

        if (result.success) {
          // Play audio
          const audioSrc = `data:audio/wav;base64,${result.audioBase64}`;
          const audio = new Audio(audioSrc);
          playAudioSafely(audio);

          // Update state with initial message
          setLessonProgress((prev) => ({
            ...prev,
            convoHistory: [
              { role: "User", message: "Hello" },
              { role: "System", message: result.systemTranscription ?? "" },
            ],
          }));
        }

        setIsLoading(false);
      }
    };
    handleInitialMessage();
  }, [lessonProgress.lessonIndex]); // Only run when lesson index changes
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
    console.log("useEffect triggered, audioURL:", audioURL);
    if (!audioURL) {
      console.log("No audioURL, skipping processing");
      return;
    }

    console.log("Audio URL created:", audioURL);
    console.log("Starting audio processing...");

    const handleResponse = async () => {
      setIsLoading(true);

      try {
        console.log("Converting URL to base64...");
        const base64 = await urlToBase64(audioURL);
        console.log("Converted audio to base64, length:", base64.length);

        if (!base64 || base64.length === 0) {
          throw new Error(
            "Failed to convert audio to base64 or audio is empty"
          );
        }

        // server action that gets the audio from the user and processes it and sends it to gemini and openai for the response
        console.log("Calling processAudioMessage...");
        const result = await processAudioMessage({
          audioBase64: base64,
          lessonProgress,
        });

        console.log("processAudioMessage result:", result);

        if (result.success) {
          // Play audio only if we have audio response
          if (result.audioBase64) {
            const audioSrc = `data:audio/wav;base64,${result.audioBase64}`;
            const audio = new Audio(audioSrc);
            playAudioSafely(audio);
          } else {
            console.log("No audio response from server");
          }

          // Force state update with new object reference
          console.log("Updating lesson progress state...");
          console.log(
            "Updated objectives:",
            result.updatedLessonProgress.objectivesMet
          );

          setLessonProgress((prevProgress) => ({
            ...prevProgress,
            ...result.updatedLessonProgress,
            // Ensure objectives array is a new reference
            objectivesMet: [...result.updatedLessonProgress.objectivesMet],
            // Ensure convoHistory is a new reference
            convoHistory: [...result.updatedLessonProgress.convoHistory],
          }));
        } else {
          console.error("processAudioMessage failed:", result);
        }
      } catch (error) {
        console.error("Error in handleResponse:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleResponse();
  }, [audioURL]);

  const handleStartRecording = async () => {
    console.log("Starting recording...");

    if (!navigator.mediaDevices) {
      alert("MediaDevices API not supported.");
      return;
    }

    // Clear any previous audio URL
    if (audioURL) {
      console.log("Clearing previous audio URL");
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }

    // Stop all currently playing audio before starting recording
    stopAllAudio();

    // Reset cancelled flag
    recordingCancelledRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log("Got media stream:", stream);

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Audio chunk received, size:", event.data.size);
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("MediaRecorder stopped");
        console.log("Recording cancelled?", recordingCancelledRef.current);
        console.log("Audio chunks count:", audioChunks.current.length);

        // Only process the audio if recording wasn't cancelled
        if (!recordingCancelledRef.current && audioChunks.current.length > 0) {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/webm",
          });
          console.log("Created audio blob, size:", audioBlob.size, "bytes");

          // Validate that the blob has content
          if (audioBlob.size > 0) {
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log("Created audio URL:", audioUrl);
            setAudioURL(audioUrl);
          } else {
            console.error("Audio blob is empty, not setting audioURL");
          }
        } else {
          console.log(
            "Skipping audio processing - recording was cancelled or no audio data"
          );
        }
        // Reset the cancelled flag
        recordingCancelledRef.current = false;
      };

      mediaRecorderRef.current.start();
      console.log("MediaRecorder started");
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleStopRecording = async () => {
    console.log("Stopping recording...");
    mediaRecorderRef.current?.stop();
    setRecording(false);
    console.log("Recording stopped");
  };

  const handleCancelRecording = async () => {
    if (mediaRecorderRef.current && recording) {
      // Set cancelled flag to prevent processing
      recordingCancelledRef.current = true;

      // Stop the media recorder
      mediaRecorderRef.current.stop();

      // Stop all tracks to release microphone access
      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Clear audio chunks to prevent processing
      audioChunks.current = [];

      // Reset recording state
      setRecording(false);

      // Clear any existing audio URL
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL(null);
      }
    }
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
                      handleCancelRecording={handleCancelRecording}
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
