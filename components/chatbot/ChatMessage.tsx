import ChatbotIcon from './ChatbotIcon';
import type { FC } from 'react';

type ChatRole = "user" | "model";

type ChatMessageType = {
  role: ChatRole;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
};

interface ChatMessageProps {
  chat: ChatMessageType;
}

const ChatMessage: FC<ChatMessageProps> = ({ chat }) => {
  // Default hideInChat and isError to false if undefined
  const hide = chat.hideInChat ?? false;
  const isError = chat.isError ?? false;

  if (hide) return null;

  return (
    <div className={`flex gap-3 items-center ${
      chat.role === "model" ? "" : "flex-col items-end"
    } ${chat.role === "model" && chat.isError ? "error" : ""}`}>
      
      {chat.role === "model" && <ChatbotIcon />}
      
      <p className={`py-3 px-4 max-w-[75%] break-words whitespace-pre-line text-sm ${
        chat.role === "model" 
          ? "bg-purple-50 rounded-[13px_13px_13px_3px]" 
          : "text-white bg-purple-600 rounded-[13px_13px_3px_13px]"
      } ${chat.role === "model" && chat.isError ? "text-red-500" : ""}`}>
        {chat.text}
      </p>
    </div>
  );
};
export default ChatMessage;