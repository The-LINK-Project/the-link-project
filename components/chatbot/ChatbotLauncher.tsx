"use client";
import { MessagesSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// The full chatbot panel (and its dependencies) only loads when the user
// first opens it, or reaches for its button: no page pays for it up front
const loadChatbot = () => import("./Chatbot");
const Chatbot = dynamic(loadChatbot, { ssr: false });

// Pages that are already a full-screen LINK Assistant chat, where a second
// floating one would cover the send button and confuse whoever is typing
const FULL_PAGE_CHAT = /^\/lessons\/[^/]+\/chat\/?$/;

// The assistant needs an account, so on the sign-in and sign-up pages it could
// only say so, from on top of the form's Continue button on a phone
const AUTH_PAGE = /^\/sign-(in|up)(\/.*)?$/;

const ChatbotLauncher = () => {
    const t = useTranslations("assistant");
    const [open, setOpen] = useState<boolean>(false);
    const [hasOpened, setHasOpened] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    if (FULL_PAGE_CHAT.test(pathname) || AUTH_PAGE.test(pathname)) return null;

    const close = () => {
        setOpen(false);
        // Back to the button, once a phone has drawn it again
        requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }));
    };

    return (
        // Put away while a lesson is on show on anything smaller than a laptop,
        // where Check and Continue sit right where it floats (see globals.css).
        // While open on a phone it fills the screen, and the page behind it
        // stays still.
        <div data-chat-launcher data-assistant-open={open || undefined}>
            <button
                ref={buttonRef}
                type="button"
                aria-label={open ? t("close") : t("open")}
                aria-expanded={open}
                aria-controls={hasOpened ? "link-assistant" : undefined}
                onPointerEnter={() => void loadChatbot()}
                onFocus={() => void loadChatbot()}
                onClick={() => {
                    if (open) return close();
                    setHasOpened(true);
                    setOpen(true);
                }}
                className={cn(
                    "fixed bottom-5 right-5 z-[100] flex size-14 cursor-pointer items-center justify-center rounded-full bg-lesson-primary text-lesson-on-primary",
                    "shadow-[0_4px_0_var(--color-lesson-primary-lip),0_14px_28px_-10px_rgba(11,61,39,0.5)] transition-[translate,box-shadow] duration-75",
                    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lesson-primary-dark",
                    "active:translate-y-1 active:shadow-[0_0_0_var(--color-lesson-primary-lip),0_8px_18px_-10px_rgba(11,61,39,0.5)]",
                    // On a phone the open assistant has its own Close
                    open && "cramped:hidden",
                )}
                style={{ WebkitTapHighlightColor: "transparent" }}
            >
                <MessagesSquare
                    aria-hidden
                    className={cn(
                        "absolute size-7 transition-[opacity,rotate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity",
                        open ? "rotate-90 scale-50 opacity-0" : "opacity-100",
                    )}
                />
                <X
                    aria-hidden
                    className={cn(
                        "absolute size-7 transition-[opacity,rotate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity",
                        open ? "opacity-100" : "-rotate-90 scale-50 opacity-0",
                    )}
                />
            </button>

            {hasOpened && <Chatbot open={open} onClose={close} />}
        </div>
    );
};

export default ChatbotLauncher;
