"use server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { Type } from "@google/genai";

type Message = {
  role: string;
  message: string;
  audioURL?: string;
};

function setLessonObjectiveToTrue({
  objectiveIndex,
}: {
  objectiveIndex: number;
}) {
  return objectiveIndex;
}

export async function getResponse(
  audioUrlBase64: string,
  instructions: string,
  lessonObjectives: string[],
  objectivesMet: boolean[]
) {
  const openai = new OpenAI();
  const geminiKey = process.env.GEMINI_KEY;

  const ai = new GoogleGenAI({ apiKey: geminiKey });

  // Defining the function the model can call to update lesson objectives
  const setLessonObjectiveToTrueFunctionDeclaration = {
    name: "setLessonObjectiveToTrue",
    description:
      "Sets one lesson objective to true based on the conversation history",
    parameters: {
      type: Type.OBJECT,
      properties: {
        objectiveIndex: {
          type: Type.NUMBER,
          description:
            "The index of the objective that should be marked as completed",
        },
      },
      required: ["objectiveIndex"],
    },
  };

  // Format current learning objectives with their status
  const formattedObjectives = lessonObjectives
    .map(
      (objective, index) =>
        `INDEX ${index}: ${objective} [${
          objectivesMet[index] ? "COMPLETED" : "TO BE DONE"
        }]`
    )
    .join(", ");

  // Add learning objectives to the instructions
  const instructionsWithObjectives = `${instructions}

Learning Objectives: 
${formattedObjectives}`;

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

  try {
    console.log("=== SYSTEM PROMPT ===");
    console.log(instructionsWithObjectives);
    console.log("=== END SYSTEM PROMPT ===\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: instructionsWithObjectives,
        tools: [
          {
            functionDeclarations: [setLessonObjectiveToTrueFunctionDeclaration],
          },
        ],
      },
    });
    let objectiveIndex = undefined;

    // Check for function calls in the response
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0]; // Assuming one function call
      if (functionCall.args) {
        console.log(
          `🎯 OBJECTIVE COMPLETED: Index ${functionCall.args.objectiveIndex}`
        );

        objectiveIndex = setLessonObjectiveToTrue(
          functionCall.args as { objectiveIndex: number }
        );
      }
    }

    const transcriptionSystem = response.text;

    const verbalResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      input: response.text || "",
      instructions: "Speak in a cheerful and positive tone.",
      response_format: "wav",
    });

    const audioBuffer = Buffer.from(await verbalResponse.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");
    return {
      success: true,
      audioBase64Response: audioBase64,
      systemTranscription: transcriptionSystem,
      objectiveIndex: objectiveIndex,
    };
  } catch (error) {
    console.error("Error in getResponse:", error);
    // Return an error object if something goes wrong
    return {
      success: false,
    };
  }
}

export async function getUserTranscription(audioUrlBase64: string) {
  const geminiKey = process.env.GEMINI_KEY;

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

  try {
    const transcription = await ai.models.generateContent({
      // Use a model that supports audio input, like gemini-1.5-flash
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: "Transcribe this speech to text accurately.",
      },
    });
    const transcriptionUser = transcription.text;

    console.log("=== USER TRANSCRIPTION ===");
    console.log(transcriptionUser);
    console.log("=== END USER TRANSCRIPTION ===\n");

    return {
      success: true,
      userTranscription: transcriptionUser,
    };
  } catch (error) {
    console.error("Error Transcribing User Speech:", error);
    // Return an error object if something goes wrong
    return {
      success: false,
    };
  }
}
