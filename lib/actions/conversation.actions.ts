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

// Fallback conclusion for the turn that completes the final objective
const LESSON_COMPLETE_FALLBACK =
  "Fantastic work today! You've completed every part of this lesson — congratulations, and see you in the next one!";

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

// The model occasionally writes its tool calls out as pseudo-code text
// (e.g. "tool_code print(setLessonObjectiveToTrue(0))") instead of using the
// function-calling mechanism — strip those artifacts so they never reach the
// chat or the TTS voice. Patterns stay anchored to the tool name and known
// markers so legitimate tutor speech is untouched.
function stripToolSyntax(text: string): string {
  return text
    .replace(
      /```[\s\S]*?```|```[\s\S]*$|^[ \t]*(?:tool_code|tool_call)\b.*$|(?:tool_code|tool_call)[:\s]*|(?:print\s*\(\s*)?setLessonObjectiveToTrue\s*\([^)]*\)\)?/gim,
      ""
    )
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function getResponse(
  audioUrlBase64: string,
  instructions: string,
  currentObjectivesMet: boolean[]
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
    // Collect every function call — the model can emit several in one turn,
    // and dropping any of them desyncs its beliefs from the stored progress
    const objectiveIndices: number[] = [];
    for (const functionCall of response.functionCalls ?? []) {
      if (functionCall.args) {
        const objectiveIndex = setLessonObjectiveToTrue(
          functionCall.args as { objectiveIndex: number }
        );
        if (objectiveIndex !== null && objectiveIndex !== undefined) {
          objectiveIndices.push(objectiveIndex);
        }
      } else {
        console.warn("Function call found but no args provided");
      }
    }

    let transcriptionSystem = stripToolSyntax(response.text ?? "");

    // Does this turn's tool call complete the final objective? The model
    // generated its reply against the PRE-completion objective list (which
    // told it to keep teaching), so the reply for this turn must be replaced
    // with a proper conclusion instead of another practice question
    const objectivesAfterCalls = [...currentObjectivesMet];
    for (const objectiveIndex of objectiveIndices) {
      if (objectiveIndex >= 0 && objectiveIndex < objectivesAfterCalls.length) {
        objectivesAfterCalls[objectiveIndex] = true;
      }
    }
    const lessonJustCompleted =
      objectiveIndices.length > 0 &&
      objectivesAfterCalls.length > 0 &&
      objectivesAfterCalls.every((met) => met) &&
      !currentObjectivesMet.every((met) => met);

    if (lessonJustCompleted) {
      try {
        const conclusion = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents:
            "The student has now completed EVERY lesson objective — the lesson is finished. Give a warm, brief conclusion: congratulate them on what they practised today and say goodbye. Do NOT ask any question, do NOT start new practice, and never write code, code fences, 'tool_code', 'tool_call', or 'print(' in your reply — natural spoken English only.",
          config: {
            systemInstruction: instructions,
          },
        });
        transcriptionSystem = stripToolSyntax(conclusion.text ?? "");
      } catch (conclusionError) {
        console.error("Error in conclusion response:", conclusionError);
        transcriptionSystem = "";
      }

      if (!transcriptionSystem.trim()) {
        transcriptionSystem = LESSON_COMPLETE_FALLBACK;
      }
    } else if (objectiveIndices.length > 0 && !transcriptionSystem.trim()) {
      // The model made a tool call but returned no reply text — ask it once
      // (without tools) for a short acknowledgement that continues the lesson
      try {
        const followUp = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents:
            "The student just successfully demonstrated a lesson objective and it has already been recorded. Do NOT call any function or tool, and never write code, code fences, 'tool_code', 'tool_call', or 'print(' in your reply — natural spoken English only. Briefly acknowledge their success and continue the lesson by asking them the next question.",
          config: {
            systemInstruction: instructions,
          },
        });
        transcriptionSystem = stripToolSyntax(followUp.text ?? "");
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
      objectiveIndices: objectiveIndices,
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

    const transcriptionSystem = stripToolSyntax(response.text ?? "");

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

    // The lesson page creates the progress doc before rendering, so a
    // missing doc means something is wrong — never trust the client snapshot
    if (!currentProgress) {
      return {
        success: false,
        error: "Lesson progress not found",
      };
    }

    const instructions = await generateInstructions(currentProgress);

    const audioResponse = await getInitialResponse(instructions);

    if (!audioResponse.success) {
      return {
        success: false,
        error: audioResponse.error ?? "Failed to generate the greeting",
      };
    }

    const updatedLessonProgress = await updateLessonProgress({
      lessonIndex: lessonProgress.lessonIndex,
      objectivesMet: currentProgress.objectivesMet,
      // Persist only the tutor's greeting, appended atomically so a slow
      // concurrent tab can't wipe messages written after our empty check
      appendMessages: [
        {
          role: "System",
          message: audioResponse.systemTranscription ?? "",
        },
      ],
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
    // Re-read the authoritative progress server-side so a stale client
    // snapshot (second tab, restored page) can't overwrite newer history
    const currentProgress = await getLessonProgress({
      lessonIndex: lessonProgress.lessonIndex,
    });

    if (!currentProgress) {
      return {
        success: false,
        errorType: "response",
        error: "Lesson progress not found",
      };
    }

    // Instructions are built from the PRE-utterance history — the current
    // utterance is sent to the model as audio, so it must not also appear in
    // the prompt's previous conversation
    const instructions = await generateInstructions(currentProgress);

    // Transcription and tutor response don't depend on each other, so run
    // them concurrently
    const [transcriptionUser, audioResponse] = await Promise.all([
      getUserTranscription(audioBase64),
      getResponse(audioBase64, instructions, currentProgress.objectivesMet),
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

    // update objectives for every tool call the model made this turn
    const currentObjectivesMet = [...currentProgress.objectivesMet]; // Create new array

    for (const objectiveIndex of audioResponse.objectiveIndices ?? []) {
      // Validate index bounds
      if (
        objectiveIndex >= 0 &&
        objectiveIndex < currentObjectivesMet.length
      ) {
        currentObjectivesMet[objectiveIndex] = true;
      } else {
        console.warn(
          `Invalid objective index: ${objectiveIndex}. Valid range: 0-${currentObjectivesMet.length - 1}`
        );
      }
    }

    // persist only on full success; the new messages are appended atomically
    // ($push) so a concurrent turn can't clobber them, and the returned
    // document is authoritative (merged objectivesMet + completed flag)
    const updatedLessonProgress = await updateLessonProgress({
      lessonIndex: currentProgress.lessonIndex,
      objectivesMet: currentObjectivesMet,
      appendMessages: [
        {
          role: "User",
          message: userTranscription,
        },
        {
          role: "System",
          message: audioResponse.systemTranscription ?? "",
        },
      ],
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
