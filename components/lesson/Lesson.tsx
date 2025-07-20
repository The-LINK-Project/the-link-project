"use client";

import React, { useRef, useState, useEffect } from "react";

import { getResponse, getUserTranscription } from "@/lib/actions/conversation.actions";
import { initLessonProgress, updateLessonProgress } from "@/lib/actions/LessonProgress.actions";

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
import { toast } from "sonner";
import { Loader2, ChevronDown } from "lucide-react";

import Link from "next/link";

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
  const [objectivesMet, setObjectivesMet] = useState<boolean[]>(previousLessonObjectivesProgress);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [convoHistory, setConvoHistory] = useState<Message[] | []>(previousConvoHistory ?? []);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const instructionsRef = useRef<string>(initialInstructions);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const allAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());
  const convoHistoryRef = useRef<Message[]>(previousConvoHistory ?? []);
  
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
        instructionsRef.current = updatedUserInstructions;
      }
      // 2. Send to gemini and openai for audio
      const audioResponse = await getResponse(
        base64 || "null",
        instructionsRef.current || ""
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
          // Use object destructuring with rest property to remove audioURL from each message cuz it takes crazy db space
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
        {/* Lesson Objectives */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <LessonObjectivesMet
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
                          <LessonNotStarted />
                        ) : (
                          <LessonMessages
                            convoHistory={convoHistory}
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
              <Link href={`/learn/${lessonIndex}/quiz`}>
                Already know this? Test your knowledge with this quiz!
              </Link>
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
