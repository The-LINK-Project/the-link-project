/**
 * Speaking practice state.
 *
 * Like the lesson session, one pure reducer owns the conversation. The server
 * decides what each turn meant (a question, said it, try again, move on) and
 * this only applies that outcome, so the rule for moving on lives in one place.
 */

import type { TutorTurnRequest, TutorTurnResponse } from "./types";

import type { SpeakingContext } from "./context";

/** Every turn uploads the history again, and the tutor only needs recent turns. */
const HISTORY_LIMIT = 16;

export type ChatMessage = {
    id: string;
    role: "tutor" | "learner";
    /** Empty for a learner recording the tutor could not make out. */
    text: string;
    /** The tutor's voice for this line, on the device. Absent when speech failed. */
    audioUri?: string;
};

/** How a goal ended: said by the learner, or said for them after the last try. */
export type GoalResult = "said" | "helped";

export type ConversationState = {
    /** `opening` until the tutor's first line arrives. */
    phase: "opening" | "ready" | "sending" | "finished";
    messages: ChatMessage[];
    goalIndex: number;
    attempt: number;
    /** Questions asked on the current goal, which the server limits. */
    asides: number;
    /** One entry per finished goal, in order. */
    results: GoalResult[];
    goalCount: number;
    error: string | null;
};

export type ConversationAction =
    | { type: "send" }
    | { type: "replied"; response: TutorTurnResponse; audioUri?: string }
    | { type: "failed"; error: string };

export function initConversation(context: SpeakingContext): ConversationState {
    return {
        phase: "opening",
        messages: [],
        goalIndex: 0,
        attempt: 1,
        asides: 0,
        results: [],
        goalCount: context.goals.length,
        error: null,
    };
}

/**
 * A talk picked up again after the app went away, or null when there is
 * nothing in it worth keeping.
 *
 * The tutor's voice files are gone by then, so the lines come back as words
 * only. A turn that was on its way to the server is treated as never sent: the
 * learner records it again, which costs them a sentence rather than a session.
 */
export function restoreConversation(
    context: SpeakingContext,
    saved: ConversationState,
): ConversationState | null {
    if (saved.goalCount !== context.goals.length) return null;
    if (saved.phase === "opening" || saved.messages.length === 0) return null;
    if (saved.goalIndex < 0 || saved.goalIndex >= saved.goalCount) return null;
    return {
        ...saved,
        phase: saved.phase === "finished" ? "finished" : "ready",
        messages: saved.messages.map(({ id, role, text }) => ({ id, role, text })),
        error: null,
    };
}

/** Goals the learner said themselves. */
export function saidCount(state: ConversationState): number {
    return state.results.filter((result) => result === "said").length;
}

export function conversationReducer(
    state: ConversationState,
    action: ConversationAction,
): ConversationState {
    switch (action.type) {
        case "send":
            if (state.phase === "finished" || state.phase === "sending") return state;
            return {
                ...state,
                phase: state.phase === "opening" ? "opening" : "sending",
                error: null,
            };

        case "failed":
            return {
                ...state,
                phase: state.phase === "sending" ? "ready" : state.phase,
                error: action.error,
            };

        case "replied": {
            if (state.phase === "finished") return state;
            const { response } = action;
            const messages = [...state.messages];
            if (response.outcome !== "opening") {
                messages.push({
                    id: `learner-${messages.length}`,
                    role: "learner",
                    text: response.heard,
                });
            }
            messages.push({
                id: `tutor-${messages.length}`,
                role: "tutor",
                text: response.reply,
                audioUri: action.audioUri,
            });

            const done = response.outcome === "met" || response.outcome === "moveOn";
            const result: GoalResult = response.outcome === "met" ? "said" : "helped";
            const goalIndex = done ? state.goalIndex + 1 : state.goalIndex;
            const finished = response.finished || goalIndex >= state.goalCount;

            return {
                ...state,
                messages,
                results: done ? [...state.results, result] : state.results,
                goalIndex: finished ? state.goalIndex : goalIndex,
                attempt: done
                    ? 1
                    : response.outcome === "retry"
                      ? state.attempt + 1
                      : state.attempt,
                asides: done ? 0 : response.outcome === "aside" ? state.asides + 1 : state.asides,
                phase: finished ? "finished" : "ready",
                error: null,
            };
        }
    }
}

export function turnRequest(
    context: SpeakingContext,
    state: ConversationState,
    audio?: TutorTurnRequest["audio"],
): TutorTurnRequest {
    return {
        ...context,
        goalIndex: state.goalIndex,
        attempt: state.attempt,
        asides: state.asides,
        history: state.messages.slice(-HISTORY_LIMIT).map((message) => ({
            role: message.role,
            text: message.text || "(the recording could not be heard)",
        })),
        audio,
    };
}
