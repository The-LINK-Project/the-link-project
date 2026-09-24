"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

import type { SpeakingContext } from "./context";
import {
    conversationReducer,
    initConversation,
    restoreConversation,
    turnRequest,
    type ConversationState,
} from "./conversation";
import type { Recording } from "./recorder";
import type { TutorTurnResponse } from "./types";

class TurnError extends Error {
    constructor(readonly status: number) {
        super(`Tutor answered ${status}`);
    }
}

async function tutorTurn(body: unknown): Promise<TutorTurnResponse> {
    const response = await fetch("/api/tutor/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
    });
    if (!response.ok) throw new TurnError(response.status);
    return (await response.json()) as TutorTurnResponse;
}

function wavUrl(base64: string): string {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }));
}

/**
 * Drives a conversation with the tutor. The tutor speaks first, as soon as the
 * page opens; after that, each call sends one learner recording.
 */
export function useSpeakingSession(
    context: SpeakingContext,
    /** A talk saved earlier, to carry on with instead of starting again. */
    earlier?: ConversationState,
) {
    const [state, dispatch] = useReducer(
        conversationReducer,
        { context, saved: earlier },
        (initial) =>
            (initial.saved && restoreConversation(initial.context, initial.saved)) ||
            initConversation(initial.context),
    );
    const urls = useRef<string[]>([]);
    const pending = useRef(false);
    const mounted = useRef(true);

    /** Resolves true when the tutor answered, so the caller can drop the recording. */
    const takeTurn = useCallback(
        async (audio?: Recording): Promise<boolean> => {
            if (!mounted.current || pending.current || state.phase === "finished") return false;
            pending.current = true;
            dispatch({ type: "send" });
            try {
                const response = await tutorTurn(turnRequest(context, state, audio));
                if (!mounted.current) return false;
                const audioUri = response.audio ? wavUrl(response.audio.data) : undefined;
                if (audioUri) urls.current.push(audioUri);
                dispatch({ type: "replied", response, audioUri });
                return true;
            } catch (error) {
                if (!mounted.current) return false;
                const busy = error instanceof TurnError && error.status === 429;
                dispatch({ type: "failed", error: busy ? "tooMany" : "sendFailed" });
                return false;
            } finally {
                pending.current = false;
            }
        },
        [context, state],
    );

    // A talk being carried on has had its opening already.
    const opened = useRef(state.phase !== "opening");
    useEffect(() => {
        if (opened.current) return;
        opened.current = true;
        void takeTurn();
    }, [takeTurn]);

    useEffect(() => {
        mounted.current = true;
        const created = urls.current;
        return () => {
            mounted.current = false;
            created.forEach((url) => URL.revokeObjectURL(url));
            created.length = 0;
        };
    }, []);

    return { state, takeTurn };
}
