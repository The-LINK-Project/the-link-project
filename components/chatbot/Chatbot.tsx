"use client";
import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatbotIconteal from "./ChatbotIconteal";
import ChatbotIcontoggle from "./ChatbotIcontoggle";
import XIcon from "./XIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { chatbotInstructions } from "@/utils/conversation_config";
import { getChatbotResponse } from "@/lib/actions/chatbot.actions";
import { ArrowDownNarrowWideIcon } from "lucide-react";

// Type definitions
type ChatRole = "user" | "model";
type ChatMessageType = {
    role: ChatRole;
    text: string;
    isError?: boolean;
    hideInChat?: boolean;
};

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
        {
            hideInChat: true,
            role: "model",
            text: chatbotInstructions,
            isError: false,
        },
    ]);

    const [showChatbot, setShowChatbot] = useState<boolean>(false);
    const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(false); 

    const chatBodyRef = useRef<HTMLDivElement>(null);

    const generateBotResponse = async (history: ChatMessageType[]) => {
        setIsWaitingForResponse(true); 

        const updateHistory = (text: string, isError = false) => {
            setChatHistory((prev) => [
                ...prev.filter((msg) => msg.text !== "Thinking..."),
                { role: "model", text, isError },
            ]);
        };

        try {
            const apiResponseText = await getChatbotResponse(history);
            updateHistory(apiResponseText ?? "Sorry, no response.");
            setIsRateLimited(false);
        } catch (error: any) {
            if (error.message.includes("Rate limit exceeded")) {
                setIsRateLimited(true);
                updateHistory(
                    "⏰ You've reached the chat limit for this minute. Please wait a moment before sending another message.",
                    true
                );
                setTimeout(() => setIsRateLimited(false), 60000);
            } else if (error.message.includes("Authentication required")) {
                updateHistory("🔒 Please sign in to use the chatbot.", true);
            } else {
                updateHistory(`❌ Sorry, I encountered an error: ${error.message}`, true);
            }
        } finally {
            setIsWaitingForResponse(false); 
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    return (
        <div
            className={`container${showChatbot ? " show-chatbot" : ""} font-[Inter,sans-serif]`}
        >
            {/* Toggle Button */}
            <button
                id="chatbot-toggler"
                onClick={() => setShowChatbot((prev) => !prev)}
                className={`
                    fixed flex items-center justify-center bottom-[30px] right-[20px]
                    h-[50px] w-[50px] border-none cursor-pointer rounded-full
                    bg-primary transition-all duration-200 outline-none z-[100]
                    ${showChatbot ? "rotate-90" : ""}
                `}
                style={{ WebkitTapHighlightColor: "transparent" }}
            >
                {/* Open/Close text */}
                <span
                    className={`
                        absolute text-white pointer-events-none transition-opacity duration-200
                        ${showChatbot ? "opacity-0" : "opacity-100"}
                    `}
                >
                    <ChatbotIcontoggle />
                </span>
                <span
                    className={`
                        absolute text-white pointer-events-none transition-opacity duration-200
                        ${showChatbot ? "opacity-100" : "opacity-0"}
                    `}
                >
                    <XIcon />
                </span>
            </button>

            {/* Popup */}
            <div
                className={`
                    chatbot-popup
                    fixed z-50 bottom-[90px] right-[20px] w-[95vw] max-w-[320px] bg-white
                    rounded-[15px] shadow-[0_0_128px_0_rgba(0,0,0,0.1),0_32px_64px_-48px_rgba(0,0,0,0.5)]
                    transition-all duration-100 origin-bottom-right overflow-hidden
                    ${showChatbot
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-[0.3] pointer-events-none"
                    }
                    sm:w-[320px] sm:right-[35px] sm:bottom-[90px]
                `}
            >
                {/* Header */}
                <div className="chat-header flex items-center justify-between bg-primary p-[15px_22px]">
                    <div className="header-info flex gap-[10px] items-center">
                        <span className="h-[35px] w-[35px] p-[6px] bg-white rounded-full flex items-center justify-center">
                            <ChatbotIconteal />
                        </span>
                        <span className="logo-text text-white text-[1.31rem] font-semibold">
                            LINK Assistant
                        </span>
                    </div>
                </div>

                {/* Chat Body */}
                <div
                    ref={chatBodyRef}
                    className="
                        chat-body flex flex-col gap-[20px] h-[360px] mb-[82px] overflow-y-auto
                        p-[25px_22px] scrollbar-thin scrollbar-thumb-[#B2E8F1] scrollbar-track-transparent
                    "
                >
                    <div className="message bot-message flex gap-[11px] items-center">
                        <span className="h-[35px] w-[35px] p-[6px] bg-primary rounded-full flex items-center justify-center">
                            <ChatbotIcon />
                        </span>
                        <p className="message-text p-[12px_16px] max-w-[75%] break-words whitespace-pre-line text-[0.85rem] bg-green-50 rounded-[13px_13px_13px_3px]">
                            Hey there <br /> how can I help you today
                        </p>
                    </div>
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

                {/* Footer */}
                <div className="chat-footer absolute bottom-0 w-full bg-white p-[15px_22px_20px]">
                    <ChatForm
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        generateBotResponse={generateBotResponse}
                        isDisabled={isRateLimited || isWaitingForResponse} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
