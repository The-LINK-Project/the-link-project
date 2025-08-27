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
    isDisabled?: boolean;
}

const ChatForm: FC<ChatFormProps> = ({
    chatHistory,
    setChatHistory,
    generateBotResponse,
    isDisabled = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Prevent submission if rate limited
        if (isDisabled) return;

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
            className={`flex items-center bg-white rounded-[32px] outline-1 outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)] focus-within:outline-2 focus-within:outline-[#8FE0B1] ${isDisabled ? "opacity-50" : ""}`}
            onSubmit={handleFormSubmit}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder={isDisabled ? "Rate limited - please wait..." : "Message..."}
                className="border-none outline-none w-full bg-transparent h-[47px] px-[17px] text-[0.95rem]"
                required
                disabled={isDisabled}
            />
            <button
                type="submit"
                disabled={isDisabled}
                className={`h-[35px] w-[35px] items-center justify-center border-none hidden outline-none flex-shrink-0 mr-1.5 rounded-full transition-all duration-200 peer-valid:flex [input:valid~&]:flex ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#8FE0B1] cursor-pointer hover:bg-[#49BED4]"}`}
            >
                <span className="flex items-center justify-center">
                    <SendIcon />
                </span>
            </button>
        </form>
    );
};

export default ChatForm;
