"use client"; 

import React, { useRef, useState, useEffect } from 'react';
import { getResponse, getUserTranscription } from '@/lib/actions/playground.actions';

type Props = {
    initialInstructions: string;
}
const Lesson = ({initialInstructions}: Props) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [instructions, setInstructions] = useState<string | null>(initialInstructions);
  const [conversation, setConversation] = useState<string[] | []>([]);
  useEffect(() => {
    if (!audioURL) return; // exit early if not set
  
    const handleResponse = async () => {
      // 1. Convert recorded audio to base64
      const base64 = await urlToBase64(audioURL);
  
      const transcriptionUser = await getUserTranscription(base64 || "null")
      if (transcriptionUser.success) {
        const userTranscription = transcriptionUser.userTranscription;
        console.log(userTranscription)
        setConversation(prevConversation => [...(prevConversation ?? []), userTranscription ?? ""])
        setInstructions(prev => (prev ?? "") + "\nUser: " + userTranscription);
        console.log("TEST")
        console.log(instructions)
      }
      // 2. Send to OpenAI/Gemini or whatever your `getResponse` is
      const audioResponse = await getResponse(base64 || "null", instructions || "");
  
      // 3. If it returns a successful response, play the result
      if (audioResponse.success) {
        const ttsBase64 = audioResponse.audioBase64Response;
        const audioSrc = `data:audio/wav;base64,${ttsBase64}`;
        const audio = new Audio(audioSrc);
        audio.play();
        const systemTranscription = audioResponse.systemTranscription;
        setConversation(prevConversation => [...(prevConversation ?? []), systemTranscription ?? ""])
        setInstructions(prev => (prev ?? "") + "\nSystem: " + systemTranscription);
        console.log("Instructions: ")
        console.log(instructions)
      }
    };
  
    handleResponse(); // Trigger the async function
  
  }, [audioURL]); // 🔁 This whole effect re-runs when `audioURL` changes
  

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
        <h1>{conversation}</h1>
      </div>
    </div>
  );
};

export default Lesson;

