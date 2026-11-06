"use client";

import { useAuth } from "@clerk/nextjs";
import { Bot, RotateCcw, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";

import { AssistantBubble } from "./AssistantBubble";
import { Link } from "@/i18n/navigation";
import { getChatbotResponse } from "@/lib/actions/chatbot.actions";
import { typedLineBreak } from "@/lib/chat/typedLineBreak";
import { cn } from "@/lib/utils";

/** The questions a learner most often brings, in their own language. One fills the box, to finish and send. */
const SUGGESTIONS = ["suggestCheck", "suggestMeaning", "suggestSay"] as const;

/**
 * LINK Assistant, the English tutor on every page.
 *
 * On a computer or tablet it is a panel above its button; on a phone it fills
 * the screen, the way a chat app does, with its own Close. The conversation
 * lasts while the learner moves between pages, and New chat clears it. The
 * instructions the model follows are added on the server (getChatbotResponse).
 */
export default function Chatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
    const t = useTranslations("assistant");
    const { isLoaded, isSignedIn } = useAuth();
    // Until Clerk knows, the box is shown: most people who open it are signed in.
    const signedOut = isLoaded && !isSignedIn;

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [draft, setDraft] = useState("");
    const [pending, setPending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Follow the conversation as it grows.
    useEffect(() => {
        const scroller = scrollRef.current;
        if (scroller) scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    }, [messages, pending]);

    // The box grows with a longer question, up to its max-height. After a
    // suggestion fills it, the caret goes to the end, ready for the rest.
    const caretToEnd = useRef(false);
    useLayoutEffect(() => {
        const box = inputRef.current;
        if (!box) return;
        box.style.height = "auto";
        box.style.height = `${box.scrollHeight + box.offsetHeight - box.clientHeight}px`;
        if (caretToEnd.current) {
            caretToEnd.current = false;
            box.setSelectionRange(box.value.length, box.value.length);
        }
    }, [draft]);

    // Ready to type on a computer. Not on a phone, where the keyboard would
    // rise over the suggestions before they could be read.
    useEffect(() => {
        if (open && window.matchMedia("(min-width: 40rem) and (min-height: 36rem)").matches) {
            inputRef.current?.focus({ preventScroll: true });
        }
    }, [open]);

    const send = async (event?: FormEvent, text: string = draft) => {
        event?.preventDefault();
        const question = text.trim();
        if (!question || pending) return;

        // Error notes are for the learner to read, not part of the conversation
        // the model sees.
        const history: ChatMessageType[] = [
            ...messages.filter((message) => !message.isError),
            { role: "user", text: question },
        ];
        setMessages((previous) => [...previous, { role: "user", text: question }]);
        setDraft("");
        setPending(true);

        try {
            // The action returns a result rather than throwing: Next.js hides
            // a thrown error's message in production.
            const result = await getChatbotResponse(history);
            // An empty reply is a failure too, and is not sent back to the model.
            const reply: ChatMessageType =
                result.success && result.text
                    ? { role: "model", text: result.text }
                    : {
                          role: "model",
                          isError: true,
                          text:
                              !result.success && result.error === "rate_limit"
                                  ? t("errorLimit")
                                  : !result.success && result.error === "auth"
                                    ? t("errorAuth")
                                    : t("error"),
                      };
            setMessages((previous) => [...previous, reply]);
        } catch (error) {
            console.error("LINK Assistant request failed:", error);
            setMessages((previous) => [...previous, { role: "model", isError: true, text: t("error") }]);
        } finally {
            setPending(false);
        }
    };

    // Enter sends, as in any chat app. Shift+Enter starts a new line.
    const newLineAsked = useRef(false);
    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        newLineAsked.current = event.key === "Enter" && event.shiftKey;
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            void send();
        }
    };

    // Android keyboards (Gboard) often give no Enter key to catch above, only
    // the line break itself, so that sends too (see typedLineBreak).
    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const message = typedLineBreak(draft, value, {
            inputType: (event.nativeEvent as InputEvent).inputType ?? "",
            newLineAsked: newLineAsked.current,
            caret: event.target.selectionStart ?? value.length,
        });
        if (message === null) {
            setDraft(value);
            return;
        }
        setDraft(message);
        void send(undefined, message);
    };

    // Focused in the tap itself: a phone only raises its keyboard for that,
    // and nothing typed straight after is lost.
    const pick = (starter: string) => {
        caretToEnd.current = true;
        setDraft(`${starter} `);
        inputRef.current?.focus();
    };

    const restart = () => {
        setMessages([]);
        setDraft("");
        inputRef.current?.focus({ preventScroll: true });
    };

    return (
        <section
            id="link-assistant"
            role="dialog"
            aria-label="LINK Assistant"
            inert={!open}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    event.stopPropagation();
                    onClose();
                }
            }}
            className={cn(
                // A phone: the whole screen, like the lessons.
                "fixed inset-0 z-[110] flex h-dvh flex-col overflow-hidden bg-white",
                // Anything roomier: a panel standing on the button.
                "roomy:inset-auto roomy:bottom-[5.75rem] roomy:right-5 roomy:h-[min(40rem,calc(100dvh-7.5rem))] roomy:w-[24rem] roomy:rounded-3xl roomy:border-2 roomy:border-lesson-key roomy:shadow-[0_24px_48px_-12px_rgba(11,61,39,0.32)]",
                "origin-bottom-right transition-[opacity,translate,scale,visibility] motion-reduce:transition-opacity",
                open
                    ? "visible opacity-100 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] starting:translate-y-3 starting:scale-[0.96] starting:opacity-0 motion-reduce:starting:translate-y-0 motion-reduce:starting:scale-100"
                    : "invisible translate-y-3 scale-[0.96] opacity-0 duration-150 ease-in motion-reduce:translate-y-0 motion-reduce:scale-100",
            )}
        >
            <header className="flex shrink-0 items-center gap-3 border-b-2 border-lesson-hairline px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lesson-primary text-lesson-on-primary shadow-[0_3px_0_var(--color-lesson-primary-lip)]"
                >
                    <Bot className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-extrabold leading-6 text-lesson-ink">LINK Assistant</h2>
                    <p className="truncate text-sm leading-5 text-lesson-muted">{t("tagline")}</p>
                </div>
                {messages.length > 0 ? (
                    <HeaderButton label={t("newChat")} onClick={restart} disabled={pending}>
                        <RotateCcw className="size-5" />
                    </HeaderButton>
                ) : null}
                <HeaderButton label={t("close")} onClick={onClose}>
                    <X className="size-6" />
                </HeaderButton>
            </header>

            <div
                ref={scrollRef}
                aria-live="polite"
                className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-color:var(--color-lesson-key)_transparent] [scrollbar-width:thin]"
            >
                <AssistantBubble role="model" text={t("greeting")} />

                {messages.length === 0 && !signedOut ? (
                    <div className="flex flex-col items-start gap-2 pl-11">
                        {SUGGESTIONS.map((key) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => pick(t(key))}
                                className="cursor-pointer rounded-2xl border-2 border-lesson-key bg-white px-3.5 py-2 text-left text-[15px] font-bold leading-5 text-lesson-link shadow-[0_3px_0_var(--color-lesson-key)] transition-[translate,box-shadow,background-color] duration-75 hover:bg-lesson-primary-soft/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lesson-primary-dark active:translate-y-[3px] active:shadow-none"
                            >
                                {t(key)}
                            </button>
                        ))}
                    </div>
                ) : null}

                {messages.map((message, index) => (
                    <AssistantBubble key={index} role={message.role} text={message.text} error={message.isError} />
                ))}
                {pending ? <AssistantBubble role="model" text={t("thinking")} thinking /> : null}
            </div>

            {signedOut ? (
                <div className="flex shrink-0 flex-col gap-3 border-t-2 border-lesson-hairline px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <p className="text-base leading-6 text-lesson-fg">{t("signInPrompt")}</p>
                    <Link
                        href="/sign-in"
                        className="flex min-h-12 items-center justify-center rounded-2xl bg-lesson-primary px-4 text-[15px] font-extrabold uppercase tracking-wide text-lesson-on-primary shadow-[0_4px_0_var(--color-lesson-primary-lip)] transition-[translate,box-shadow] duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lesson-primary-dark active:translate-y-1 active:shadow-none"
                    >
                        {t("signIn")}
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={send}
                    className="flex shrink-0 items-end gap-2 border-t-2 border-lesson-hairline bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                >
                    <textarea
                        ref={inputRef}
                        value={draft}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        rows={1}
                        enterKeyHint="send"
                        maxLength={2000}
                        placeholder={t("placeholder")}
                        aria-label={t("placeholder")}
                        className="max-h-36 min-h-12 flex-1 resize-none rounded-2xl border-2 border-lesson-key bg-white px-4 py-2.5 text-base leading-6 text-lesson-fg caret-lesson-primary-dark outline-none transition-colors placeholder:text-lesson-muted focus:border-lesson-primary-dark"
                    />
                    <button
                        type="submit"
                        aria-label={t("send")}
                        disabled={pending || draft.trim().length === 0}
                        className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-lesson-primary text-lesson-on-primary shadow-[0_4px_0_var(--color-lesson-primary-lip)] transition-[translate,box-shadow,background-color] duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lesson-primary-dark enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:bg-lesson-key disabled:text-lesson-key-text disabled:shadow-none"
                    >
                        <Send className="size-5" />
                    </button>
                </form>
            )}
        </section>
    );
}

function HeaderButton({
    label,
    onClick,
    disabled,
    children,
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            disabled={disabled}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-lesson-muted transition-colors hover:bg-lesson-muted-surface hover:text-lesson-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lesson-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
            {children}
        </button>
    );
}
