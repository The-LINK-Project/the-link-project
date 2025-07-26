import ChatbotIcon from "./ChatbotIcon";
import type { FC } from "react";

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
    const hide = chat.hideInChat ?? false;
    const isError = chat.isError ?? false;

    if (hide) return null;

    if (chat.role === "model") {
        return (
            <div className="message bot-message flex gap-[11px] items-center">
                <span className="h-[35px] w-[35px] p-[6px] rounded-full flex items-center justify-center">
                    <ChatbotIcon />
                </span>
                <p
                    className={`message-text p-[12px_16px] max-w-[75%] break-words whitespace-pre-line text-[0.85rem] bg-green-50 rounded-[13px_13px_13px_3px] ${isError ? "text-red-500" : ""}`}
                >
                    {chat.text}
                </p>
            </div>
        );
    }

    return (
        <div className="message user-message flex justify-end">
            <p className="message-text p-[12px_16px] max-w-[75%] break-words whitespace-pre-line text-[0.85rem] bg-sidebar-accent rounded-[13px_13px_3px_13px]">
                {chat.text}
            </p>
        </div>
    );
};

export default ChatMessage;
