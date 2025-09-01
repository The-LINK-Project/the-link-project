"use server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { Type } from "@google/genai";
import { generateInstructions } from "@/lib/utils";
import { updateLessonProgress } from "@/lib/actions/LessonProgress.actions";

function setLessonObjectiveToTrue({
  objectiveIndex,
}: {
  objectiveIndex: number;
}) {
  // Validate the index
  if (typeof objectiveIndex !== "number" || objectiveIndex < 0) {
    console.warn(`Invalid objective index: ${objectiveIndex}`);
    return null;
  }

  return objectiveIndex;
}

export async function getResponse(
  audioUrlBase64: string,
  instructions: string
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
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: instructions,
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
        objectiveIndex = setLessonObjectiveToTrue(
          functionCall.args as { objectiveIndex: number }
        );
      } else {
        console.warn("Function call found but no args provided");
      }
    }

    const transcriptionSystem = response.text || "";

    // Only create TTS if there's actual text content
    let audioBase64 = "";
    let finalTranscription = transcriptionSystem;

    if (transcriptionSystem.trim()) {
      const verbalResponse = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "shimmer",
        input: transcriptionSystem,
        instructions: "Speak in an enthusiastic but calm and positive tone.",
        response_format: "wav",
      });

      const audioBuffer = Buffer.from(await verbalResponse.arrayBuffer());
      audioBase64 = audioBuffer.toString("base64");
    } else {
      // Generate a simple confirmation audio when objective is marked but no text response
      if (objectiveIndex !== undefined) {
        const confirmationText = "Great work! That objective is now complete.";

        // Update the final transcription to include our confirmation
        finalTranscription = confirmationText;

        const confirmationResponse = await openai.audio.speech.create({
          model: "gpt-4o-mini-tts",
          voice: "shimmer",
          input: confirmationText,
          instructions: "Speak in an enthusiastic but calm and positive tone.",
          response_format: "wav",
        });

        const audioBuffer = Buffer.from(
          await confirmationResponse.arrayBuffer()
        );
        audioBase64 = audioBuffer.toString("base64");
      }
    }

    return {
      success: true,
      audioBase64Response: audioBase64,
      systemTranscription: finalTranscription,
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

export async function getInitialResponse(instructions: string) {
  const openai = new OpenAI();
  const geminiKey = process.env.GEMINI_KEY;

  const ai = new GoogleGenAI({ apiKey: geminiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "",
      config: {
        systemInstruction: instructions,
      },
    });

    const transcriptionSystem = response.text;

    const verbalResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "shimmer",
      input: response.text || "",
      instructions: "Speak in an enthusiastic but calm and positive tone.",
      response_format: "wav",
    });

    const audioBuffer = Buffer.from(await verbalResponse.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");
    return {
      success: true,
      audioBase64Response: audioBase64,
      systemTranscription: transcriptionSystem,
    };
  } catch (error) {
    console.error("Error in getResponse:", error);
    // Return an error object if something goes wrong
    return {
      success: false,
    };
  }
}

export async function processInitialMessage({
  lessonProgress,
}: {
  lessonProgress: LessonProgress;
}) {
  const newConvoHistory = [
    {
      role: "User",
      message: "Hello",
    },
  ];

  const updatedLessonProgress = {
    ...lessonProgress,
    convoHistory: newConvoHistory,
  };
  const instructions = await generateInstructions(updatedLessonProgress);

  const audioResponse = await getInitialResponse(instructions);

  return {
    success: audioResponse.success,
    audioBase64: audioResponse.audioBase64Response,
    systemTranscription: audioResponse.systemTranscription,
  };
}

// gets the audio from the user and processes it and sends it to gemini and openai for the response
export async function processAudioMessage({
  audioBase64,
  lessonProgress,
}: {
  audioBase64: string;
  lessonProgress: LessonProgress;
}) {
  // get transcription
  const transcriptionUser = await getUserTranscription(audioBase64);

  // get up-to-date convo history w/ new user message
  const newConvoHistory = [
    ...lessonProgress.convoHistory,
    {
      role: "User",
      message: transcriptionUser.userTranscription ?? "",
    },
  ];

  // generate insturcions
  const updatedLessonProgress = {
    ...lessonProgress,
    convoHistory: newConvoHistory,
  };

  const instructions = await generateInstructions(updatedLessonProgress);

  // get the response from the model
  const audioResponse = await getResponse(audioBase64, instructions);

  // update objectives if there was a tool call used by the model
  let currentObjectivesMet = [...lessonProgress.objectivesMet]; // Create new array

  if (
    audioResponse.objectiveIndex !== undefined &&
    audioResponse.objectiveIndex !== null
  ) {
    // Validate index bounds
    if (
      audioResponse.objectiveIndex >= 0 &&
      audioResponse.objectiveIndex < currentObjectivesMet.length
    ) {
      currentObjectivesMet[audioResponse.objectiveIndex] = true;
    } else {
      console.warn(
        `Invalid objective index: ${audioResponse.objectiveIndex}. Valid range: 0-${currentObjectivesMet.length - 1}`
      );
    }
  }

  // most up to date convo history
  const finalConvoHistory = audioResponse.success
    ? [
        ...newConvoHistory,
        {
          role: "System",
          message: audioResponse.systemTranscription ?? "",
        },
      ]
    : newConvoHistory;

  // update database and first removing the audioURL from the message object
  const convoHistoryWithoutAudio = finalConvoHistory.map(
    ({ audioURL, ...message }) => message
  );
  await updateLessonProgress({
    lessonIndex: lessonProgress.lessonIndex,
    objectivesMet: currentObjectivesMet,
    convoHistory: convoHistoryWithoutAudio,
  });

  // output is the audio that can be played, and updated lessonProgress that will be used to update the state
  return {
    success: audioResponse.success,
    audioBase64: audioResponse.audioBase64Response,
    systemTranscription: audioResponse.systemTranscription,
    updatedLessonProgress: {
      ...lessonProgress,
      convoHistory: finalConvoHistory,
      objectivesMet: currentObjectivesMet,
    },
  };
}
