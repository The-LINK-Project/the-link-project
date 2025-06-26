"use client";
import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./ChatbotIcon";
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
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    // const formattedHistory = history.map(({ role, text }) => ({
    //   role,
    //   parts: [{ text }],
    // }));

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ contents: formattedHistory }),
    // };

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
    <div className={`container${showChatbot ? " show-chatbot" : ""} font-[Inter,sans-serif]`}>
      {/* Toggle Button */}
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
        className={`
          fixed flex items-center justify-center bottom-[30px] right-[20px]
          h-[50px] w-[50px] border-none cursor-pointer rounded-full
          bg-[#6D4FC2] transition-all duration-200 outline-none z-[100]
          ${showChatbot ? "rotate-90" : ""}
        `}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Open/Close text */}
        <span
          className={`
            absolute text-white pointer-events-none transition-opacity duration-200
            ${showChatbot ? "opacity-0" : "opacity-100"}
          `}
        >
          open
        </span>
        <span
          className={`
            absolute text-white pointer-events-none transition-opacity duration-200
            ${showChatbot ? "opacity-100" : "opacity-0"}
          `}
        >
          close
        </span>
      </button>
  
      {/* Popup */}
      <div
        className={`
          chatbot-popup
          fixed z-50 bottom-[90px] right-[20px] w-[95vw] max-w-[420px] bg-white
          rounded-[15px] shadow-[0_0_128px_0_rgba(0,0,0,0.1),0_32px_64px_-48px_rgba(0,0,0,0.5)]
          transition-all duration-100 origin-bottom-right overflow-hidden
          ${showChatbot
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.2] pointer-events-none"}
          sm:w-[420px] sm:right-[35px] sm:bottom-[90px]
        `}
      >
        {/* Header */}
        <div className="chat-header flex items-center justify-between bg-[#6D4FC2] p-[15px_22px]">
          <div className="header-info flex gap-[10px] items-center">
            <span className="h-[35px] w-[35px] p-[6px] bg-white rounded-full flex items-center justify-center">
              <ChatbotIcon />
            </span>
            <span className="logo-text text-white text-[1.31rem] font-semibold">Chatbot</span>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="
              h-10 w-10 border-none outline-none text-white cursor-pointer
              text-[1.9rem] pt-[2px] rounded-full -mr-2.5 bg-transparent
              transition-all duration-200 hover:bg-[#593bab]
            "
          >
            Close
          </button>
        </div>
  
        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="
            chat-body flex flex-col gap-[20px] h-[460px] mb-[82px] overflow-y-auto
            p-[25px_22px] scrollbar-thin scrollbar-thumb-[#DDD3F9] scrollbar-track-transparent
          "
        >
          <div className="message bot-message flex gap-[11px] items-center">
            <span className="h-[35px] w-[35px] p-[6px] bg-[#6D4FC2] rounded-full flex items-center justify-center">
              <ChatbotIcon />
            </span>
            <p className="message-text p-[12px_16px] max-w-[75%] break-words whitespace-pre-line text-[0.95rem] bg-[#F6F2FF] rounded-[13px_13px_13px_3px]">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;