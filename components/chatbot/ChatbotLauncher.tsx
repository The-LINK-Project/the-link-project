"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "@/i18n/navigation";
import ChatbotIcontoggle from "./ChatbotIcontoggle";
import XIcon from "./XIcon";

// The full chatbot panel (and its dependencies) only loads when the user
// first opens it — no page pays for it up front
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

// Pages that are already a full-screen LINK Assistant chat, where a second
// floating one would cover the send button and confuse whoever is typing
const FULL_PAGE_CHAT = /^\/lessons\/[^/]+\/chat\/?$/;

// The assistant needs an account, so on the sign-in and sign-up pages it could
// only say so, from on top of the form's Continue button on a phone
const AUTH_PAGE = /^\/sign-(in|up)(\/.*)?$/;

const ChatbotLauncher = () => {
    const [showChatbot, setShowChatbot] = useState<boolean>(false);
    const [hasOpened, setHasOpened] = useState<boolean>(false);
    const pathname = usePathname();

    if (FULL_PAGE_CHAT.test(pathname) || AUTH_PAGE.test(pathname)) return null;

    return (
        // Put away while a lesson is on show on anything smaller than a laptop,
        // where Check and Continue sit right where it floats (see globals.css)
        <div data-chat-launcher>
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
        </div>
    );
};

export default ChatbotLauncher;
