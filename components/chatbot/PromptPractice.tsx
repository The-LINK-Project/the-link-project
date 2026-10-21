"use client";

import { Bot, RotateCcw, Send, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { LessonShell } from "@/components/learn/LessonShell";
import { StepNav } from "@/components/learn/StepNav";
import { LessonCardBox, text } from "@/components/learn/ui";
import { useRouter } from "@/i18n/navigation";
import { getChatbotResponse } from "@/lib/actions/chatbot.actions";
import { getLesson } from "@/lib/lessons/data";
import { useLessonLocalized } from "@/lib/lessons/localized";
import type { ChatTask } from "@/lib/lessons/types";
import { canPractiseSpeaking } from "@/lib/speaking/context";
import { cn } from "@/lib/utils";

/**
 * Prompting practice with LINK Assistant, after a lesson about AI.
 *
 * The whole page is the chat, not the small popup, because at a workshop a
 * team of four or five reads it together on one laptop. Tips and ideas sit
 * above the conversation; an idea fills the message box rather than sending,
 * so the team reads the prompt and can change it before it goes.
 *
 * The conversation is kept for the tab, as the Ethics game is. On a phone the
 * back swipe, or the browser reloading a tab that sat behind another app,
 * would otherwise throw it away. Back, Next and Close forget it, as New chat
 * does.
 */
const chatKey = (lessonId: string) => `link.chat.${lessonId}.v1`;

function readChat(lessonId: string): ChatMessageType[] {
    try {
        const saved: unknown = JSON.parse(window.sessionStorage.getItem(chatKey(lessonId)) ?? "[]");
        if (!Array.isArray(saved)) return [];
        return saved.filter(
            (message): message is ChatMessageType =>
                (message?.role === "user" || message?.role === "model") && typeof message.text === "string",
        );
    } catch {
        return [];
    }
}

function writeChat(lessonId: string, messages: ChatMessageType[]) {
    try {
        if (messages.length > 0) window.sessionStorage.setItem(chatKey(lessonId), JSON.stringify(messages));
        else window.sessionStorage.removeItem(chatKey(lessonId));
    } catch {
        // Private browsing or a full disk: the chat carries on, unkept.
    }
}

export default function PromptPractice({ lessonId }: { lessonId: string }) {
    const t = useTranslations("lessons");
    const native = useLessonLocalized();
    const router = useRouter();
    const lesson = getLesson(lessonId)!;
    const practice = lesson.chatPractice!;
    // The step after this one: speaking, where the lesson has a talk.
    const speakNext = canPractiseSpeaking(lesson);

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [draft, setDraft] = useState("");
    const [pending, setPending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Put back after the first draw, which the server makes without the tab's storage.
    const [restored, setRestored] = useState(false);
    useEffect(() => {
        setMessages(readChat(lessonId));
        setRestored(true);
    }, [lessonId]);

    const leaving = useRef(false);
    useEffect(() => {
        if (restored && !leaving.current) writeChat(lessonId, messages);
    }, [restored, lessonId, messages]);

    // The page's own ways out forget the conversation.
    const leave = (href: string) => {
        leaving.current = true;
        writeChat(lessonId, []);
        router.push(href);
    };

    // Follow the conversation as it grows.
    useEffect(() => {
        const scroller = scrollRef.current;
        if (messages.length > 0 && scroller) scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    }, [messages, pending]);

    const pickTask = (task: ChatTask) => {
        setDraft(task.starter);
        inputRef.current?.focus();
    };

    const send = async (event?: FormEvent) => {
        event?.preventDefault();
        const prompt = draft.trim();
        if (!prompt || pending) return;

        // Error notes are for the team to read, not part of the conversation
        // the model sees.
        const history: ChatMessageType[] = [
            ...messages.filter((message) => !message.isError),
            { role: "user", text: prompt },
        ];
        setMessages((previous) => [...previous, { role: "user", text: prompt }]);
        setDraft("");
        setPending(true);

        try {
            const result = await getChatbotResponse(history, "practice");
            const reply: ChatMessageType = result.success
                ? { role: "model", text: result.text || t("chatError") }
                : {
                      role: "model",
                      isError: true,
                      text:
                          result.error === "rate_limit"
                              ? t("chatErrorLimit")
                              : result.error === "auth"
                                ? t("chatErrorAuth")
                                : t("chatError"),
                  };
            setMessages((previous) => [...previous, reply]);
        } catch (error) {
            console.error("LINK Assistant request failed:", error);
            setMessages((previous) => [...previous, { role: "model", isError: true, text: t("chatError") }]);
        } finally {
            setPending(false);
        }
    };

    // Enter sends, as in any chat app. Shift+Enter starts a new line.
    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            void send();
        }
    };

    // Teams take turns on one laptop, so the next team can start clean.
    const restart = () => {
        setMessages([]);
        setDraft("");
        inputRef.current?.focus();
    };

    return (
        <LessonShell
            closeLabel={t("quit")}
            icon={lesson.icon}
            onClose={() => leave("/dashboard")}
            scrollRef={scrollRef}
            header={
                messages.length > 0 ? (
                    <button
                        type="button"
                        onClick={restart}
                        disabled={pending}
                        className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-lesson-muted hover:bg-lesson-muted-surface disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RotateCcw className="size-4" />
                        {t("chatNew")}
                    </button>
                ) : null
            }
            footer={
                <>
                    <form onSubmit={send} className="flex items-end gap-2 border-t border-lesson-hairline bg-white p-4">
                        <textarea
                            ref={inputRef}
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder={t("chatPlaceholder")}
                            aria-label={t("chatPlaceholder")}
                            rows={2}
                            maxLength={2000}
                            className="min-h-14 flex-1 resize-none rounded-2xl border-2 border-lesson-key bg-white px-4 py-3 text-base leading-6 text-lesson-fg outline-none focus:border-lesson-primary"
                        />
                        <button
                            type="submit"
                            aria-label={t("chatSend")}
                            disabled={pending || draft.trim().length === 0}
                            className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-lesson-primary text-lesson-on-primary shadow-[0_4px_0_var(--color-lesson-primary-lip)] transition-[transform,box-shadow] duration-75 enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:bg-lesson-key disabled:text-lesson-key-text disabled:shadow-none"
                        >
                            <Send className="size-6" />
                        </button>
                    </form>
                    {/* The message box fills the footer, so Back and Next have a row of their own. */}
                    <StepNav
                        onBack={() => leave(`/lessons/${lesson.id}`)}
                        onNext={() => leave(speakNext ? `/lessons/${lesson.id}/speak` : "/dashboard")}
                        nextLabel={speakNext ? t("next") : t("finish")}
                    />
                </>
            }
        >
            <div className="flex flex-col gap-2">
                <h1 className={text.title}>{t("chatTitle")}</h1>
                <p className={text.body}>{native(practice.intro)}</p>
            </div>

            <LessonCardBox tone="muted" className="shadow-none">
                <p className={cn(text.label, "pb-2")}>{t("chatTipsTitle")}</p>
                <ul className="flex flex-col gap-1.5">
                    {practice.tips.map((tip, index) => (
                        <li key={index} className="flex gap-2">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lesson-primary-dark" />
                            <span className={text.body}>{native(tip)}</span>
                        </li>
                    ))}
                </ul>
                <p className={cn(text.caption, "flex items-start gap-2 pt-3")}>
                    <ShieldAlert className="mt-0.5 size-4 shrink-0" />
                    {t("chatPrivacy")}
                </p>
            </LessonCardBox>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("chatTasksTitle")}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {practice.tasks.map((task, index) => (
                        <button
                            key={task.id}
                            type="button"
                            onClick={() => pickTask(task)}
                            className="flex cursor-pointer flex-col gap-1 rounded-2xl border-2 border-lesson-key bg-white p-3 text-left shadow-[0_4px_0_var(--color-lesson-key)] transition-[transform,box-shadow] duration-75 hover:bg-lesson-primary-soft/40 active:translate-y-1 active:shadow-none"
                        >
                            <span className={text.bodyStrong}>
                                {index + 1}. {native(task.title)}
                            </span>
                            <span className={text.caption}>{native(task.hint)}</span>
                            <span className="pt-1 text-sm italic leading-5 text-lesson-fg">“{task.starter}”</span>
                            <span className="pt-1 text-xs font-bold uppercase tracking-wide text-lesson-link">
                                {t("chatUseThis")}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-lesson-hairline pt-6" aria-live="polite">
                <Bubble role="model" text={t("chatGreeting")} />
                {messages.map((message, index) => (
                    <Bubble key={index} role={message.role} text={message.text} error={message.isError} />
                ))}
                {pending ? <Bubble role="model" text={t("chatThinking")} thinking /> : null}
            </div>
        </LessonShell>
    );
}

function Bubble({
    role,
    text: body,
    error = false,
    thinking = false,
}: {
    role: ChatMessageType["role"];
    text: string;
    error?: boolean;
    thinking?: boolean;
}) {
    if (role === "user") {
        return (
            <p className="ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-lesson-primary-soft px-4 py-3 text-base leading-6 text-lesson-fg">
                {body}
            </p>
        );
    }
    return (
        <div className="flex max-w-[90%] items-start gap-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lesson-primary-dark text-white">
                <Bot className="size-5" />
            </span>
            <p
                className={cn(
                    "whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm bg-lesson-muted-surface px-4 py-3 text-base leading-6",
                    error ? "text-lesson-destructive" : "text-lesson-fg",
                    thinking && "animate-pulse text-lesson-muted",
                )}
            >
                {thinking || error ? body : <Formatted text={body} />}
            </p>
        </div>
    );
}

/**
 * The model is asked for plain text but still reaches for markdown now and
 * then. Bold is kept as bold, heading marks are dropped, and nothing else is
 * interpreted: the reply is never rendered as HTML.
 */
function Formatted({ text: reply }: { text: string }) {
    const cleaned = reply.replace(/^#{1,6}\s+/gm, "");
    return (
        <>
            {cleaned.split(/\*\*(.+?)\*\*/g).map((part, index) =>
                index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
            )}
        </>
    );
}
