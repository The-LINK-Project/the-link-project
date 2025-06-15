"use server"
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { playAudio } from "openai/helpers/audio";
import * as fs from "node:fs";
import { Type } from "@google/genai";

type Message = {
  role: string;
  message: string;
  audioURL?: string;
}

function setLessonObjectiveToTrue({objectiveIndex}: {objectiveIndex: number})
{
  return objectiveIndex;
}

export async function getResponse(audioUrlBase64: string, instructions: string, convoHistory: Message[], lessonObjectivesProgress: boolean[]) {
    // console.log(instructions)
    // console.log(`OINK CONVOHIS: ${convoHistory}`)
    const openai = new OpenAI();
    const geminiKey = process.env.GEMINI_KEY
  
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    // Defining the function the model can call to update lesson objectives
    const setLessonObjectiveToTrueFunctionDeclaration = {
      name: "setLessonObjectiveToTrue",
      description: "Sets one lesson objective to true based on the conversation history",
      parameters: {
        type: Type.OBJECT,
        properties: {
          objectiveIndex: {
            type: Type.NUMBER,
            description: "The index of the objective that should be marked as completed"
          }
        },
        required: ["objectiveIndex"]
      }
    };
    
    
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
        systemInstruction: instructions,
        tools: [
          {
            functionDeclarations: [setLessonObjectiveToTrueFunctionDeclaration]
          }]
      },
    });

    let objectiveIndex = undefined; 

    // Check for function calls in the response
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0]; // Assuming one function call
      console.log(`Function to call: ${functionCall.name}`);
      console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
      // In a real app, you would call your actual function here:
      // const result = await scheduleMeeting(functionCall.args);

      objectiveIndex = setLessonObjectiveToTrue(functionCall.args as { objectiveIndex: number }); 
    } else {
      console.log("No function call found in the response.");
      console.log(response.text);
    }

    // Test code:
    // objectiveIndex = setLessonObjectiveToTrue({ objectiveIndex: 0 }); 
    
    // const toolCalls = (response.candidates?.[0]?.content as any).toolCalls;
    // console.log(`TOOL CALL OCCURING: ${toolCalls}`)

    // let objectiveIndex = undefined;

    // // extract objective index from the tool call
    // if (toolCalls && toolCalls.length > 0) {
    //   for (const toolCall of toolCalls) {
    //     const functionName = toolCall.functionCall.name;
    //     const args = JSON.parse(toolCall.functionCall.args);

    //     if (functionName === "setLessonObjectiveToTrue") {
    //       objectiveIndex = args.objectiveIndex;
    //       console.log("Gemini selected objective index:", objectiveIndex);
    //     }
    //   }
    // }

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
        systemTranscription: transcriptionSystem,
        objectiveIndex: objectiveIndex

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

