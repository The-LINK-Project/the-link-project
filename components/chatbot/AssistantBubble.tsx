"use client";

import { Bot } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * One turn of a conversation with LINK Assistant: the floating assistant and
 * the prompting practice after the AI lesson draw their turns alike.
 */
export function AssistantBubble({
    role,
    text: body,
    error = false,
    thinking = false,
}: {
    role: ChatMessageType["role"];
    text: string;
    error?: boolean;
    /** The reply on its way: three dots, with `text` said to screen readers. */
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
            {thinking ? (
                <p className="flex h-12 items-center gap-1.5 rounded-2xl rounded-tl-sm bg-lesson-muted-surface px-4">
                    <span className="sr-only">{body}</span>
                    {[0, 1, 2].map((dot) => (
                        <span
                            key={dot}
                            aria-hidden
                            data-thinking-dot
                            style={{ animationDelay: `${dot * 160}ms` }}
                            className="size-2 rounded-full bg-lesson-muted"
                        />
                    ))}
                </p>
            ) : (
                <p
                    className={cn(
                        "whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm px-4 py-3 text-base leading-6",
                        error ? "bg-lesson-destructive-soft text-lesson-destructive" : "bg-lesson-muted-surface text-lesson-fg",
                    )}
                >
                    {error ? body : <Formatted text={body} />}
                </p>
            )}
        </div>
    );
}

/**
 * The model is asked for plain text but still reaches for markdown now and
 * then. Bold is kept as bold, list marks become bullets, and heading marks,
 * dividers and italic stars are dropped. Nothing else is interpreted: the
 * reply is never rendered as HTML.
 */
function Formatted({ text: reply }: { text: string }) {
    const cleaned = reply
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^\s*([*_-])(\s*\1){2,}\s*$/gm, "")
        .replace(/^(\s*)[*+-]\s+/gm, "$1• ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    return (
        <>
            {cleaned.split(/\*\*(.+?)\*\*/g).map((part, index) =>
                index % 2 === 1 ? (
                    <strong key={index}>{part}</strong>
                ) : (
                    part.replace(/\*(\S(?:[^*\n]*\S)?)\*/g, "$1")
                ),
            )}
        </>
    );
}
