"use client";
import { useRef } from "react";
import type { FC } from "react";
import SendIcon from "./ChatbotIconsend";

type ChatRole = "user" | "model";

interface ChatMessageType {
  role: ChatRole;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}

import type { Dispatch, SetStateAction } from "react";

interface ChatFormProps {
  chatHistory: ChatMessageType[];
  setChatHistory: Dispatch<SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => void | Promise<void>;
}

const ChatForm: FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;

    if (inputRef.current) inputRef.current.value = "";

    const updatedHistory: ChatMessageType[] = [
      ...chatHistory,
      { role: "user", text: userMessage },
    ];

    setChatHistory(updatedHistory);

    setTimeout(() => {
      const thinkingMessage: ChatMessageType = {
        role: "model",
        text: "Thinking...",
      };

      const thinkingHistory: ChatMessageType[] = [
        ...updatedHistory,
        thinkingMessage,
      ];

      setChatHistory(thinkingHistory);

      generateBotResponse([
        ...updatedHistory,
        {
          role: "user",
          text: ` Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form
      action="#"
      className="flex items-center rounded-[32px] shadow-[0_0_8px_rgba(0,0,0,0.06)]"
      style={{
        background: "var(--chatbot-input-bg)",
        outline: "1px solid var(--border)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid var(--chatbot-outline)`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = `1px solid var(--border)`;
      }}
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="border-none outline-none w-full bg-transparent h-[47px] px-[17px] text-[0.95rem]"
        required
      />
      <button
        type="submit"
        className="h-[35px] w-[35px] flex items-center justify-center border-none hidden outline-none cursor-pointer flex-shrink-0 mr-1.5 rounded-full transition-all duration-200 peer-valid:block [input:valid~&]:block"
        style={{ background: "var(--chatbot-send-bg)" }}
      >
        <span className="flex items-center justify-center">
          <SendIcon />
        </span>
      </button>
    </form>
  );
};

export default ChatForm;
