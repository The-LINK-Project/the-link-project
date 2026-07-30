"use server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { Type } from "@google/genai";
import { generateInstructions } from "@/lib/utils";
import {
  getLessonProgress,
  updateLessonProgress,
} from "@/lib/actions/LessonProgress.actions";

// Fallback reply used when the model marks an objective complete but returns no text
const OBJECTIVE_COMPLETE_FALLBACK =
  "Great work! You've got that down. Shall we keep going with the next part of the lesson?";

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
      model: "gemini-3.1-flash-lite",
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

    let transcriptionSystem = response.text ?? "";

    // If the model made a tool call but returned no reply text, ask it once
    // (without tools) for a short acknowledgement that continues the lesson
    if (
      objectiveIndex !== undefined &&
      objectiveIndex !== null &&
      !transcriptionSystem.trim()
    ) {
      try {
        const followUp = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents:
            "The student just successfully demonstrated a lesson objective. Briefly acknowledge their success and continue the lesson by asking them the next question.",
          config: {
            systemInstruction: instructions,
          },
        });
        transcriptionSystem = followUp.text ?? "";
      } catch (followUpError) {
        console.error("Error in follow-up response:", followUpError);
      }

      if (!transcriptionSystem.trim()) {
        transcriptionSystem = OBJECTIVE_COMPLETE_FALLBACK;
      }
    }

    if (!transcriptionSystem.trim()) {
      return {
        success: false,
        error: "The model returned an empty response",
      };
    }

    const verbalResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "shimmer",
      input: transcriptionSystem,
      instructions: "Speak in an enthusiastic but calm and positive tone.",
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
      error: error instanceof Error ? error.message : String(error),
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
      model: "gemini-3.1-flash-lite",
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
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getInitialResponse(instructions: string) {
  const openai = new OpenAI();
  const geminiKey = process.env.GEMINI_KEY;

  const ai = new GoogleGenAI({ apiKey: geminiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents:
        "Hello, please greet me by name and start the lesson as instructed.",
      config: {
        systemInstruction: instructions,
      },
    });

    const transcriptionSystem = response.text ?? "";

    if (!transcriptionSystem.trim()) {
      return {
        success: false,
        error: "The model returned an empty greeting",
      };
    }

    const verbalResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "shimmer",
      input: transcriptionSystem,
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
    console.error("Error in getInitialResponse:", error);
    // Return an error object if something goes wrong
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function processInitialMessage({
  lessonProgress,
}: {
  lessonProgress: LessonProgress;
}): Promise<{
  success: boolean;
  error?: string;
  audioBase64?: string;
  updatedLessonProgress?: LessonProgress;
}> {
  try {
    // Re-read the progress server-side so a refresh / second tab doesn't
    // generate a duplicate greeting
    const currentProgress = await getLessonProgress({
      lessonIndex: lessonProgress.lessonIndex,
    });

    if (currentProgress && currentProgress.convoHistory?.length > 0) {
      return {
        success: true,
        updatedLessonProgress: currentProgress,
      };
    }

    const progressForInstructions = currentProgress ?? lessonProgress;
    const instructions = await generateInstructions(progressForInstructions);

    const audioResponse = await getInitialResponse(instructions);

    if (!audioResponse.success) {
      return {
        success: false,
        error: audioResponse.error ?? "Failed to generate the greeting",
      };
    }

    // Persist only the tutor's greeting
    const newConvoHistory = [
      {
        role: "System",
        message: audioResponse.systemTranscription ?? "",
      },
    ];

    const updatedLessonProgress = await updateLessonProgress({
      lessonIndex: lessonProgress.lessonIndex,
      objectivesMet: progressForInstructions.objectivesMet,
      convoHistory: newConvoHistory,
    });

    return {
      success: true,
      audioBase64: audioResponse.audioBase64Response,
      updatedLessonProgress: updatedLessonProgress,
    };
  } catch (error) {
    console.error("Error in processInitialMessage:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// gets the audio from the user and processes it and sends it to gemini and openai for the response
export async function processAudioMessage({
  audioBase64,
  lessonProgress,
}: {
  audioBase64: string;
  lessonProgress: LessonProgress;
}): Promise<{
  success: boolean;
  error?: string;
  errorType?: "transcription" | "response";
  audioBase64?: string;
  updatedLessonProgress?: LessonProgress;
}> {
  try {
    // Instructions are built from the PRE-utterance history — the current
    // utterance is sent to the model as audio, so it must not also appear in
    // the prompt's previous conversation
    const instructions = await generateInstructions(lessonProgress);

    // Transcription and tutor response don't depend on each other, so run
    // them concurrently
    const [transcriptionUser, audioResponse] = await Promise.all([
      getUserTranscription(audioBase64),
      getResponse(audioBase64, instructions),
    ]);

    const userTranscription = transcriptionUser.userTranscription ?? "";
    if (!transcriptionUser.success || !userTranscription.trim()) {
      return {
        success: false,
        errorType: "transcription",
        error:
          transcriptionUser.error ??
          "Could not transcribe the audio. Please try again.",
      };
    }

    if (!audioResponse.success) {
      return {
        success: false,
        errorType: "response",
        error: audioResponse.error ?? "Failed to generate a response",
      };
    }

    // update objectives if there was a tool call used by the model
    const currentObjectivesMet = [...lessonProgress.objectivesMet]; // Create new array

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
    const finalConvoHistory = [
      ...lessonProgress.convoHistory,
      {
        role: "User",
        message: userTranscription,
      },
      {
        role: "System",
        message: audioResponse.systemTranscription ?? "",
      },
    ];

    // persist only on full success; the returned document is authoritative
    // (merged objectivesMet + completed flag)
    const updatedLessonProgress = await updateLessonProgress({
      lessonIndex: lessonProgress.lessonIndex,
      objectivesMet: currentObjectivesMet,
      convoHistory: finalConvoHistory,
    });

    // output is the audio that can be played, and updated lessonProgress that will be used to update the state
    return {
      success: true,
      audioBase64: audioResponse.audioBase64Response,
      updatedLessonProgress: updatedLessonProgress,
    };
  } catch (error) {
    console.error("Error in processAudioMessage:", error);
    return {
      success: false,
      errorType: "response",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
