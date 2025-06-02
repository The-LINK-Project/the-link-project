"use server"
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { playAudio } from "openai/helpers/audio";
import * as fs from "node:fs";

export async function getResponse(audioUrlBase64: string, instructions: string) {
    console.log(instructions)
    const openai = new OpenAI();
    const geminiKey = process.env.GEMINI_KEY
  
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    
    
    const contents = [
        {
          role: "user",
          parts: [
            { text: "This is the next audio recorded by the user." },
            {
              inlineData: {
                mimeType: "audio/webm",
                data: audioUrlBase64,
              },
            },
          ],
        },
      ];
    
    try{

    const response = await ai.models.generateContent({
      // Use a model that supports audio input, like gemini-1.5-flash
      model: "gemini-2.0-flash", 
      contents: contents,
      config: {
        systemInstruction: instructions
      }
    });
    
    console.log(response.text);
    const transcriptionSystem = response.text;

    const verbalResponse = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "coral",
        input: response.text || "",
        instructions: "Speak in a cheerful and positive tone.",
        response_format: "wav",
      });
      
    const audioBuffer = Buffer.from(await verbalResponse.arrayBuffer());
    const audioBase64 = audioBuffer.toString('base64');
    return {
        success: true,
        audioBase64Response: audioBase64,
        systemTranscription: transcriptionSystem

      };
    }catch (error) {
        console.error("Error in getResponse:", error);
        // Return an error object if something goes wrong
        return {
          success: false,
        };
    
}
}


export async function getUserTranscription(audioUrlBase64: string,) {
    const geminiKey = process.env.GEMINI_KEY
  
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    
    
    const contents = [
        {
          role: "user",
          parts: [
            { text: "This is the audio recorded by the user." },
            {
              inlineData: {
                mimeType: "audio/webm",
                data: audioUrlBase64,
              },
            },
          ],
        },
      ];
    
    try{
    const transcription = await ai.models.generateContent({
        // Use a model that supports audio input, like gemini-1.5-flash
        model: "gemini-2.0-flash", 
        contents: contents,
        config: {
            systemInstruction: "Transcribe this speech to text accurately."
        }
        });
    const transcriptionUser = transcription.text;
    console.log(transcriptionUser)

    return {
        success: true,
        userTranscription: transcriptionUser,

      };
    }catch (error) {
        console.error("Error Transcribing User Speech:", error);
        // Return an error object if something goes wrong
        return {
          success: false,
        };
    
}
}

