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
import { Button } from "./ui/button";
import ObjectivesMet from "./ObjectivesMet";

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

    // prevents a double creation in mongodb
    const hasRunRef = useRef(false);

    useEffect(() => {
        if (!hasRunRef.current) {
            const runInit = async () => {
                console.log(`Is previous progress? ${isLessonProgress}`)
                if (isLessonProgress === false) {
                    console.log("NEWTOMAKe")
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

    const convoHistoryRef = useRef<Message[]>(previousConvoHistory ?? []);
    useEffect(() => {
        if (!audioURL) return; // exit early if not set

        const handleResponse = async () => {
            // 1. Convert recorded audio to base64
            const base64 = await urlToBase64(audioURL);

            const transcriptionUser = await getUserTranscription(
                base64 || "null"
            );
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
                    (instructionsRef.current ?? "") +
                    "\nUser: " +
                    userTranscription;
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

            // 3. If it returns a successful response, play the result
            if (audioResponse.success) {
                const ttsBase64 = audioResponse.audioBase64Response;
                const audioSrc = `data:audio/wav;base64,${ttsBase64}`;
                const audio = new Audio(audioSrc);
                audio.play();
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
                    instructionsRef.current +
                    "\nSystem: " +
                    systemTranscription;
                setInstructions(updatedSystemInstructions);
                instructionsRef.current = updatedSystemInstructions;

                // if objective index was returned by function call update objectivesMet
                const objectiveIndex = audioResponse.objectiveIndex;

                if (objectiveIndex !== undefined) {
                    updateObjectivesMet(objectiveIndex);
                }
            }

            // removing audio for db
            const convoHistoryWithoutAudio = convoHistoryRef.current.map((message) => {
                // Use object destructuring with rest property to remove audioURL from each message
                const { audioURL, ...messageWithoutAudio } = message;
                return messageWithoutAudio;
            });
            
            // update lesson progress in mongodb
            await updateLessonProgress({
                lessonIndex,
                objectivesMet,
                convoHistory: convoHistoryWithoutAudio
            })
       
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
        console.log("FLUSHING THE TOILET")
        console.log(lessonIndex)
        console.log(objectivesMet)
        console.log(convoHistoryWithoutAudio)
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
    };

    return (
        <div className="text-center mt-4">
            <h2>Audio Recorder Playground</h2>
            <button
                onClick={recording ? handleStopRecording : handleStartRecording}
                className="text-2xl p-2 mr-2"
            >
                {recording ? "Stop 🎤" : "Record 🎤"}
            </button>
            <button
                onClick={() => {
                    if (audioURL) {
                        const audio = new Audio(audioURL);
                        audio.play();
                    }
                }}
                disabled={!audioURL}
                className="text-2xl p-2"
            >
                Play ▶️
            </button>
            <div className="mt-5">
                {audioURL && <audio src={audioURL} controls />}
            </div>
            <div>
                <h1>Conversation</h1>
                {convoHistory.map((message, index) => (
                    <div key={index}>
                        <p key={index}>
                            <strong>{message.role}: </strong> {message.message}
                        </p>
                        {message.audioURL && (
                            <audio src={message.audioURL} controls></audio>
                        )}
                    </div>
                ))}
            </div>
            <div className="pt-10">
                <Button onClick={disconnect}>Exit Lesson</Button>
                <h1>{objectivesMet}</h1>
            </div>
            <ObjectivesMet
                lessonObjectives={lessonObjectives}
                lessonObjectivesProgress={objectivesMet}
            ></ObjectivesMet>
        </div>
    );
};

export default Lesson;
