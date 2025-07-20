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
      isError: false, // ✅ Add this
    },
  ]);

  const [showChatbot, setShowChatbot] = useState<boolean>(false);

  const chatBodyRef = useRef<HTMLDivElement>(null); // <-- useRef instead of useState

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const updateHistory = (text: string, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    try {
      const apiResponseText = await getChatbotResponse(history);
      updateHistory(apiResponseText ?? "Sorry, no response.");
    } catch (error: any) {
      updateHistory(error.message, true);
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
        className={`fixed flex items-center justify-center bottom-[30px] right-[20px] h-[50px] w-[50px] border-none cursor-pointer rounded-full transition-all duration-200 outline-none z-[100] ${showChatbot ? "rotate-90" : ""}`}
        style={{
          background: "var(--primary)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* Open/Close text */}
        <span
          className={`absolute text-white pointer-events-none transition-opacity duration-200 ${showChatbot ? "opacity-0" : "opacity-100"}`}
        >
          <ChatbotIcontoggle />
        </span>
        <span
          className={`absolute text-white pointer-events-none transition-opacity duration-200 ${showChatbot ? "opacity-100" : "opacity-0"}`}
        >
          <XIcon />
        </span>
      </button>

      {/* Popup */}
      <div
        className={`chatbot-popup fixed z-50 bottom-[90px] right-[20px] w-[95vw] max-w-[320px] bg-[var(--chatbot-primary-bg)] rounded-[10px] shadow-[0_4px_32px_0_rgba(0,0,0,0.10)] transition-all duration-100 origin-bottom-right overflow-hidden border border-[var(--border)] ${showChatbot ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-[0.3] pointer-events-none"} sm:w-[320px] sm:right-[35px] sm:bottom-[90px]`}
      >
        {/* Header */}
        <div
          className="chat-header flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--chatbot-header-bg)]"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <div className="header-info flex items-center gap-2">
            <span className="h-8 w-8 p-1 rounded-full flex items-center justify-center bg-white border border-[var(--primary)]">
              <img
                src="/assets/link_green.png"
                alt="LINK Project Logo"
                className="h-6 w-6 object-contain"
              />
            </span>
            <span
              className="logo-text font-semibold"
              style={{
                color: "#fff",
                fontSize: "1.05rem",
                marginLeft: "0.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              LINK Assistant
            </span>
          </div>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="chat-body flex flex-col gap-4 h-[340px] mb-[70px] overflow-y-auto px-4 py-4 bg-[var(--chatbot-primary-bg)]"
        >
          <div className="message bot-message flex gap-3 items-center">
            <span className="h-8 w-8 p-1 rounded-full flex items-center justify-center bg-white border border-[var(--primary)]">
              <img
                src="/assets/link_green.png"
                alt="LINK Project Logo"
                className="h-6 w-6 object-contain"
              />
            </span>
            <p
              className="message-text p-3 max-w-[75%] break-words whitespace-pre-line text-[0.95rem] rounded-[8px_8px_8px_3px]"
              style={{ background: "var(--chatbot-bot-bubble-green-bg)" }}
            >
              Hey there <br /> how can I help you today
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="chat-footer absolute bottom-0 w-full px-3 py-2 border-t border-[var(--border)] bg-[var(--chatbot-primary-bg)]"
          style={{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
