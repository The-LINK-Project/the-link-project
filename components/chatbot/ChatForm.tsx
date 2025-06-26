"use client";
import { useRef } from 'react';
import type { FC } from 'react';

type ChatRole = "user" | "model";

interface ChatMessageType {
  role: ChatRole;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}


import type { Dispatch, SetStateAction} from "react";

interface ChatFormProps {
  chatHistory: ChatMessageType[];
  setChatHistory: Dispatch<SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => void | Promise<void>;
}


const ChatForm: FC<ChatFormProps> = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    
        const userMessage = inputRef.current?.value.trim();
        if (!userMessage) return;
    
        if (inputRef.current) inputRef.current.value = "";
    
        const updatedHistory: ChatMessageType[] = [
            ...chatHistory,
            { role: "user", text: userMessage }
        ];
          
    
        setChatHistory(updatedHistory);
    
        setTimeout(() => {
            const thinkingMessage: ChatMessageType = { role: "model", text: "Thinking..." };

            const thinkingHistory: ChatMessageType[] = [...updatedHistory, thinkingMessage];
            
            setChatHistory(thinkingHistory);
            
    
          generateBotResponse([
            ...updatedHistory,
            { role: "user", text: ` Using the details provided above, please address this query: ${userMessage}` }
          ]);
        }, 600);
    };
      

    return (
      <form action="#" className="flex items-center bg-white rounded-[32px] outline-1 outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)] focus-within:outline-2 focus-within:outline-[#6D4FC2]" onSubmit={handleFormSubmit}>
          <input 
              ref={inputRef} 
              type="text" 
              placeholder="Message..."
              className="border-none outline-none w-full bg-transparent h-[47px] px-[17px] text-[0.95rem]" 
              required 
          />
          <button className="h-[35px] w-[35px] border-none hidden outline-none cursor-pointer text-[1.15rem] text-white flex-shrink-0 mr-1.5 rounded-full bg-[#6D4FC2] transition-all duration-200 hover:bg-[#593bab] peer-valid:block [input:valid~&]:block">
              arrow_upward
          </button>
      </form>
  );
};

export default ChatForm;