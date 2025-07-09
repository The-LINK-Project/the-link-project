"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  getResponse,
  getUserTranscription,
} from "@/lib/actions/conversation.actions";
import {
  initLessonProgress,
  updateLessonProgress,
} from "@/lib/actions/LessonProgress.actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ObjectivesMet from "./ObjectivesMet";
import { toast } from "sonner";
import {
  Mic,
  MicOff,
  Play,
  User,
  Bot,
  Brain,
  BookOpen,
  Loader2,
  ChevronDown,
} from "lucide-react";
import LessonCompleteModal from "./LessonCompleteModal";

type LessonProps = {
  initialInstructions: string;
  lessonIndex: number;
  previousConvoHistory: Message[];
  previousLessonObjectivesProgress: boolean[];
  lessonObjectives: string[];
  isLessonProgress: boolean;
};

const Lesson = ({
  initialInstructions,
  lessonIndex,
  previousConvoHistory,
  previousLessonObjectivesProgress,
  lessonObjectives,
  isLessonProgress,
}: LessonProps) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [instructions, setInstructions] = useState<string | null>(
    initialInstructions
  );
  const instructionsRef = useRef<string>(initialInstructions);
  const [objectivesMet, setObjectivesMet] = useState<boolean[]>(
    previousLessonObjectivesProgress
  );
  const [convoHistory, setConvoHistory] = useState<Message[] | []>(
    previousConvoHistory ?? []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // lesson compleeed status
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Scroll state
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // prevents a double creation in mongodb
  const hasRunRef = useRef(false);

  // Audio management refs
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const allAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());

  // Function to stop all currently playing audio
  const stopAllAudio = () => {
    // Stop the current main audio if playing
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    
    // Stop all registered audio elements
    allAudioElementsRef.current.forEach(audio => {
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
      audioElement.removeEventListener('ended', handleEnded);
    };
    
    audioElement.addEventListener('ended', handleEnded);
    audioElement.play().catch(error => {
      console.warn('Audio play failed:', error);
      currentAudioRef.current = null;
    });
  };

  useEffect(() => {
    if (!hasRunRef.current) {
      const runInit = async () => {
        console.log(`Is previous progress? ${isLessonProgress}`);
        if (isLessonProgress === false) {
          console.log("NEWTOMAKe");
          const startLessonProgress = await initLessonProgress({
            lessonIndex: lessonIndex,
            objectives: lessonObjectives,
          });
          console.log("✅ Lesson progress initialized");
        }
      };
      runInit();
      hasRunRef.current = true; // Set the ref so no repeat
    }
  }, [isLessonProgress, lessonIndex, lessonObjectives]);

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
  }, [convoHistory]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [convoHistory]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const router = useRouter();
  // checking if all objectives are met and can end the lesson and if they are then maybe have a quick end of lesson progress popup and continue to qiuz
  useEffect(() => {
    if (objectivesMet.every((objective) => objective)) {
      console.log("All objectives met, ending lesson");
      // router.push(`/learn/${lessonIndex}/quiz`);
      setIsComplete(true);
    }
  }, [objectivesMet]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const convoHistoryRef = useRef<Message[]>(previousConvoHistory ?? []);
  useEffect(() => {
    if (!audioURL) return; // exit early if not set

    const handleResponse = async () => {
      setIsLoading(true);
      // 1. Convert recorded audio to base64
      const base64 = await urlToBase64(audioURL);

      const transcriptionUser = await getUserTranscription(base64 || "null");
      if (transcriptionUser.success) {
        const userTranscription = transcriptionUser.userTranscription;

        // use ref to keep the value up to date between renders.
        convoHistoryRef.current = [
          ...convoHistoryRef.current,
          {
            role: "User",
            message: userTranscription ?? "",
            audioURL: audioURL,
          },
        ];
        setConvoHistory(convoHistoryRef.current);

        const updatedUserInstructions =
          (instructionsRef.current ?? "") + "\nUser: " + userTranscription;
        setInstructions(updatedUserInstructions);
        instructionsRef.current = updatedUserInstructions;
      }
      // 2. Send to gemini and openai for audio
      const audioResponse = await getResponse(
        base64 || "null",
        instructionsRef.current || "",
        lessonObjectives,
        objectivesMet
      );

      // Track the current objectives state for database update
      let currentObjectivesMet = objectivesMet;

      // 3. If it returns a successful response, play the result
      if (audioResponse.success) {
        const ttsBase64 = audioResponse.audioBase64Response;
        const audioSrc = `data:audio/wav;base64,${ttsBase64}`;
        const audio = new Audio(audioSrc);
        playAudioSafely(audio);
        const systemTranscription = audioResponse.systemTranscription;
        convoHistoryRef.current = [
          ...convoHistoryRef.current,
          {
            role: "System",
            message: systemTranscription ?? "",
            audioURL: audioSrc,
          },
        ];
        setConvoHistory(convoHistoryRef.current);

        const updatedSystemInstructions =
          instructionsRef.current + "\nSystem: " + systemTranscription;
        setInstructions(updatedSystemInstructions);
        instructionsRef.current = updatedSystemInstructions;

        // if objective index was returned by function call update objectivesMet
        const objectiveIndex = audioResponse.objectiveIndex;

        if (objectiveIndex !== undefined) {
          currentObjectivesMet = updateObjectivesMet(objectiveIndex);
          setObjectivesMet(currentObjectivesMet);
        }
      }

      // removing audio for db
      const convoHistoryWithoutAudio = convoHistoryRef.current.map(
        (message) => {
          // Use object destructuring with rest property to remove audioURL from each message
          const { audioURL, ...messageWithoutAudio } = message;
          return messageWithoutAudio;
        }
      );

      // update lesson progress in mongodb
      await updateLessonProgress({
        lessonIndex,
        objectivesMet: currentObjectivesMet,
        convoHistory: convoHistoryWithoutAudio,
      });

      setIsLoading(false);
    };

    handleResponse(); // Trigger the async function
  }, [audioURL]);

  async function urlToBase64(audioUrl: string): Promise<string> {
    const response = await fetch(audioUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1]; // strip the "data:audio/webm;base64,"
        resolve(base64);
      };
      reader.onerror = reject;
    });
  }

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

  // not needed for now, maybe reuse some of this code later
  const disconnect = async () => {
    console.log("🔌 Disconnecting and saving lesson progress...");

    // here I destructure each message and remove audioURL because it is not needed in the database and takes too much storage data
    const convoHistoryWithoutAudio = convoHistory.map((message) => {
      // Use object destructuring with rest property to remove audioURL from each message
      const { audioURL, ...messageWithoutAudio } = message;
      return messageWithoutAudio;
    });
    console.log("FLUSHING THE TOILET");
    console.log(lessonIndex);
    console.log(objectivesMet);
    console.log(convoHistoryWithoutAudio);
    await updateLessonProgress({
      lessonIndex,
      objectivesMet,
      convoHistory: convoHistoryWithoutAudio,
    });

    console.log("💾 Lesson progress saved");
  };

  const updateObjectivesMet = (index: number) => {
    const updatedObjectivesMet = [...objectivesMet];
    updatedObjectivesMet[index] = true;
    setObjectivesMet(updatedObjectivesMet);
    
    // Show success toast when objective is completed
    toast.success("Objective completed!", {
      description: lessonObjectives[index],
      duration: 3000,
    });
    // here i return it to get the most up to date objectivesMet for adding to the mongodb
    return updatedObjectivesMet;
  };

  return (
    <>
    <TooltipProvider>
      <div className="min-h-screen bg-white relative">
        {/* Header with Real-time Objectives */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <ObjectivesMet
              lessonObjectives={lessonObjectives}
              lessonObjectivesProgress={objectivesMet}
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
                        {convoHistory.length === 0 ? (
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
                        ) : (
                          <div className="space-y-6">
                            {convoHistory.map((message, index) => (
                              <div
                                key={index}
                                className={`flex gap-4 ${
                                  message.role === "User"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <div
                                  className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${
                                    message.role === "User"
                                      ? "bg-[rgb(90,199,219)] text-white"
                                      : "bg-gray-50 text-gray-800 border border-gray-100"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-3">
                                    {message.role === "User" ? (
                                      <User className="h-4 w-4" />
                                    ) : (
                                      <Bot className="h-4 w-4" />
                                    )}
                                    <span className="font-medium text-sm">
                                      {message.role}
                                    </span>
                                  </div>
                                  <p className="text-sm leading-relaxed mb-3">
                                    {message.message}
                                  </p>
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
                                            allAudioElementsRef.current.forEach(audio => {
                                              if (audio !== audioElement && !audio.paused) {
                                                audio.pause();
                                                audio.currentTime = 0;
                                              }
                                            });
                                            
                                            // Stop main audio if playing
                                            if (currentAudioRef.current && currentAudioRef.current !== audioElement) {
                                              currentAudioRef.current.pause();
                                              currentAudioRef.current.currentTime = 0;
                                              currentAudioRef.current = null;
                                            }
                                          };
                                          
                                          audioElement.addEventListener('play', handlePlay);
                                          
                                          // Cleanup on unmount
                                          return () => {
                                            allAudioElementsRef.current.delete(audioElement);
                                            audioElement.removeEventListener('play', handlePlay);
                                          };
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
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

                  {/* Chat Input Bar */}
                  <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      {/* Record Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={
                              recording ? handleStopRecording : handleStartRecording
                            }
                            size="lg"
                            className={`w-12 h-12 rounded-full transition-all duration-300 shadow-lg ${
                              recording
                                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                                : "bg-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)]/90"
                            }`}
                            disabled={isLoading}
                          >
                            {recording ? (
                              <MicOff className="h-5 w-5" />
                            ) : (
                              <Mic className="h-5 w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {recording ? "Stop recording" : "Click this to speak"}
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Status Area */}
                      <div className="flex-1 flex justify-center">
                        {recording && (
                          <Badge
                            variant="secondary"
                            className="bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium"
                          >
                            Recording...
                          </Badge>
                        )}
                        {isLoading && !recording && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium flex items-center gap-2"
                          >
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Loading...
                          </Badge>
                        )}
                        {!recording && !isLoading && (
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm font-medium"
                          >
                            Ready to record
                          </Badge>
                        )}
                      </div>

                      {/* Play Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              if (audioURL) {
                                const audio = new Audio(audioURL);
                                playAudioSafely(audio);
                              }
                            }}
                            disabled={!audioURL || isLoading}
                            variant="outline"
                            size="lg"
                            className="w-12 h-12 rounded-full border-[rgb(90,199,219)] text-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)] hover:text-white disabled:opacity-30 shadow-lg"
                          >
                            <Play className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Hear your recording</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Left - Skip to Quiz Button */}
        <div className="fixed bottom-6 left-6">
          <Button
            variant="outline"
            className="border-[rgb(90,199,219)] text-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)] hover:text-white shadow-lg"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Skip to Quiz
          </Button>
        </div>

        {/* Bottom Right - AI Icon */}
        <div className="fixed bottom-6 right-6">
          <div className="w-14 h-14 bg-gradient-to-r from-[rgb(90,199,219)] to-[rgb(70,179,199)] rounded-full flex items-center justify-center shadow-xl">
            <Brain className="h-7 w-7 text-white" />
          </div>
        </div>





        <div className="flex flex-col items-center text-blue-700">
            <div className="flex flex-col items-center text-blue-700">
              <Link href={`/learn/${lessonIndex}/quiz`}>
                Already know this? Test your knowledge with this quiz!
              </Link>
            </div>
        </div>

        {/* Hidden Debug Section - Keeping for functionality */}
        <div className="hidden">
          <div className="pt-10 mb-8">
            <Button
              onClick={disconnect}
              variant="outline"
              className="mb-4 border-[rgb(90,199,219)] text-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)] hover:text-white"
            >
              Exit Lesson
            </Button>
            <div className="text-sm text-gray-600">
              <h1>Objectives Status: {JSON.stringify(objectivesMet)}</h1>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
    <LessonCompleteModal
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          lessonIndex={lessonIndex}
          lessonObjectives={lessonObjectives}
          setObjectivesMet={setObjectivesMet}
          setConvoHistory={setConvoHistory}
        />
    </>
  );
};

export default Lesson;
