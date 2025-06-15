"use client"; 

import React, { useRef, useState, useEffect } from 'react';
import { getResponse, getUserTranscription } from '@/lib/actions/conversation.actions';
import { initLessonProgress, updateLessonProgress } from '@/lib/actions/LessonProgress.actions';
import { Button } from './ui/button';
import { lessons } from '../constants';
import ObjectivesMet from './ObjectivesMet';
type Message = {
    role: string;
    message: string;
    audioURL?: string;
  }

type Props = {
    initialInstructions: string;
    lessonIndex: number;
    previousConvoHistory: Message[];
    previousLessonObjectivesProgress: boolean[];
    lessonObjectives: string[];
    isLessonProgress: boolean;
}
const Lesson = ({initialInstructions, lessonIndex, previousConvoHistory, previousLessonObjectivesProgress, lessonObjectives, isLessonProgress}: Props) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [instructions, setInstructions] = useState<string | null>(initialInstructions);
  const instructionsRef = useRef<string>(initialInstructions);
  const [objectivesMet, setObjectivesMet] = useState<boolean[]>(previousLessonObjectivesProgress);
  const [convoHistory, setConvoHistory] = useState<Message[] | []>(previousConvoHistory ?? []);

  console.log("OBJECTIVES MET");
  console.log(objectivesMet)

// prevents a double creation in mongodb
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasRunRef.current) {
      console.log(`Lesson Progress?: ${isLessonProgress}`);
      console.log("TO INITIALISE");
      const runInit = async () => {
        if (isLessonProgress === false) {
          const startLessonProgress = await initLessonProgress({lessonIndex: lessonIndex, objectives: lessonObjectives});
        }
        console.log("DONE INITIALISING");
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
  
      const transcriptionUser = await getUserTranscription(base64 || "null")
      if (transcriptionUser.success) {
        const userTranscription = transcriptionUser.userTranscription;
        
        console.log(userTranscription)
        // use ref to keep the value up to date between renders.
        convoHistoryRef.current = [...convoHistoryRef.current, {role: "User", message: userTranscription?? "", audioURL: audioURL}]
        setConvoHistory(convoHistoryRef.current);

        const updatedUserInstructions = (instructionsRef.current ?? "") + "\nUser: " + userTranscription;
        setInstructions(updatedUserInstructions);
        console.log("TEST")
        console.log(instructions)
        instructionsRef.current = updatedUserInstructions;
      }
      // 2. Send to gemini and openai for audio
      const audioResponse = await getResponse(base64 || "null", instructionsRef.current || "", convoHistoryRef.current, objectivesMet);
  
      // 3. If it returns a successful response, play the result
      if (audioResponse.success) {
        const ttsBase64 = audioResponse.audioBase64Response;
        const audioSrc = `data:audio/wav;base64,${ttsBase64}`;
        const audio = new Audio(audioSrc);
        audio.play();
        const systemTranscription = audioResponse.systemTranscription;
        convoHistoryRef.current = [...convoHistoryRef.current, {role: "System", message: systemTranscription ?? "", audioURL: audioSrc}]
        setConvoHistory(convoHistoryRef.current)

        const updatedSystemInstructions = instructionsRef.current + "\nSystem: " + systemTranscription;
        setInstructions(updatedSystemInstructions);
        instructionsRef.current = updatedSystemInstructions;
        // console.log("Instructions: ")
        // console.log(instructions)

        // if objective index was returned by function call update objectivesMet
        const objectiveIndex = audioResponse.objectiveIndex;
        console.log (">>>>>>>>>>>>>>>>>>>>>˘")
        console.log (JSON.stringify(audioResponse, null, 2))
        console.log (">>>>>>>>>>>>>>>>>>>>>˘")
        console.log ("objectiveIndex: ")
        console.log (objectiveIndex); 
        console.log (">>>>>>>>>>>>>>>>>>>>>˘")

        if (objectiveIndex !== undefined) {

          updateObjectivesMet(objectiveIndex)
        }
      }
    };
  
    handleResponse(); // Trigger the async function
  
  }, [audioURL]);
  
  // Call disonnect when the user disonnects unnaturally e.g closing tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnect();
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

async function urlToBase64(audioUrl: string): Promise<string> {
const response = await fetch(audioUrl);
const blob = await response.blob();

return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
    const result = reader.result as string;
    const base64 = result.split(',')[1]; // strip the "data:audio/webm;base64,"
    resolve(base64);
    };
    reader.onerror = reject;
});
}

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('MediaDevices API not supported.');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(audioBlob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = async() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const disconnect = async() => {
    console.log("GONNA DISCONNECT")

    // const lessonObj = lessons[lessonIndex]; 
    // const objectivesMet = Array(lessonObj.objectives.length).fill(false);

    // here I destructure each message and remove audioURL because it is not needed in the database and takes too much storage data
    const convoHistoryWithoutAudio = convoHistory.map(message => {
      // Use object destructuring with rest property to remove audioURL from each message
      const { audioURL, ...messageWithoutAudio } = message;
      return messageWithoutAudio;
    });

    const newLessonProgress = await updateLessonProgress({
        lessonIndex,
        objectivesMet,
        convoHistory: convoHistoryWithoutAudio
    })
  };

  const updateObjectivesMet = (index: number) => {
    console.log ("UPDATING OBJECTIVES MET")

    console.log ("1. previous objectives met:")
    console.log (objectivesMet); 

    // makin a copy here so rerender works
    const updatedObjectivesMet = [...objectivesMet]; 
    updatedObjectivesMet[index] = true;
    setObjectivesMet(updatedObjectivesMet);    

    console.log ("2. after objectives met updated:")
    console.log (updatedObjectivesMet); 
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Audio Recorder Playground</h2>
      <button
        onClick={recording ? handleStopRecording : handleStartRecording}
        style={{ fontSize: 24, padding: '10px 20px', marginRight: 10 }}
      >
        {recording ? 'Stop 🎤' : 'Record 🎤'}
      </button>
      <button
        onClick={() => {
          if (audioURL) {
            const audio = new Audio(audioURL);
            audio.play();
          }
        }}
        disabled={!audioURL}
        style={{ fontSize: 24, padding: '10px 20px' }}
      >
        Play ▶️
      </button>
      <div style={{ marginTop: 20 }}>
        {audioURL && (
          <audio src={audioURL} controls />
        )}
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
      <div className='pt-10'>
        <Button onClick={disconnect}>
            Exit Lesson
        </Button>
        {/* <Button onClick = {updateObjectivesMet}>
            Change Lesson Progress
        </Button> */}
        <h1>{objectivesMet}</h1>
      </div>
        <ObjectivesMet lessonObjectives={lessonObjectives} lessonObjectivesProgress={objectivesMet}></ObjectivesMet>
    </div>
  );
};

export default Lesson;

