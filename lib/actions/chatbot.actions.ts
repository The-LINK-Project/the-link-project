"use server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { Type } from "@google/genai";


export async function getChatbotResponse(history: ChatMessageType[]) {
    const client = new OpenAI();

    // converting role of model to assistant for openai
    const openAIMessages = history.map(message => ({
        role: message.role === "model" ? "assistant" : message.role,
        content: message.text,
      }));

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages
    })

    console.log(`history: ${history}`)
    console.log(response.choices[0].message.content)
    return response.choices[0].message.content
  }