"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ChatbotIcontoggle from "./ChatbotIcontoggle";
import XIcon from "./XIcon";

// The full chatbot panel (and its dependencies) only loads when the user
// first opens it — no page pays for it up front
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

const ChatbotLauncher = () => {
    const [showChatbot, setShowChatbot] = useState<boolean>(false);
    const [hasOpened, setHasOpened] = useState<boolean>(false);

    return (
        <>
            {/* Toggle Button */}
            <button
                id="chatbot-toggler"
                onClick={() => {
                    setHasOpened(true);
                    setShowChatbot((prev) => !prev);
                }}
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

            {hasOpened && <Chatbot showChatbot={showChatbot} />}
        </>
    );
};

export default ChatbotLauncher;
