"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import SurveyQuestionInput from "@/components/survey/SurveyQuestionInput";
import {
    declineSurvey,
    saveSurveyAnswer,
    submitSurvey,
} from "@/lib/actions/survey.actions";
import { getSurveyQuestions } from "@/constants/survey/feedbackSurvey";
import {
    clearSurveyDraft,
    readSurveyDraft,
    writeSurveyDraft,
} from "@/lib/surveyDraft";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";

// The survey runner. Design intent, in order of importance:
//
//   1. Nobody loses answers. Every change lands in localStorage immediately,
//      then syncs to the server in the background. A failed save retries
//      quietly and NEVER interrupts the person or shows an error dialog.
//   2. Skipping is normal. Only questions marked `required` (nationality and
//      the written questions) block moving on, and even that is a gentle
//      note, not a scolding.
//   3. One question per screen, big targets, works at 320px and by keyboard.

type SurveyClientProps = {
    survey: SurveyDefinition;
    initialState: SurveyStateForUser | null;
    ownerId: string | null;
};

type Screen = "consent" | "questions" | "review" | "done";

/** Human-readable answer for the review screen. Null means skipped. */
function answerSummary(
    question: SurveyQuestion,
    answer: SurveyAnswer | undefined,
): string | null {
    if (!answer) return null;
    switch (question.kind) {
        case "single": {
            if (answer.kind !== "single") return null;
            const option = question.options.find(
                (item) => item.value === answer.value,
            );
            if (!option) return null;
            return option.isOther && answer.otherText
                ? `${option.label}: ${answer.otherText}`
                : option.label;
        }
        case "scale": {
            if (answer.kind !== "scale") return null;
            return question.labels[answer.value - 1] ?? null;
        }
        case "multi": {
            if (answer.kind !== "multi" || answer.values.length === 0)
                return null;
            return answer.values
                .map((value) => {
                    const option = question.options.find(
                        (item) => item.value === value,
                    );
                    if (!option) return value;
                    return option.isOther && answer.otherText
                        ? `${option.label}: ${answer.otherText}`
                        : option.label;
                })
                .join(", ");
        }
        case "split": {
            if (answer.kind !== "split") return null;
            return `${question.leftLabel}: ${answer.left} ${question.unit} · ${question.rightLabel}: ${answer.right} ${question.unit}`;
        }
        case "text": {
            if (answer.kind !== "text" || !answer.text.trim()) return null;
            return answer.text;
        }
    }
}

export default function SurveyClient({
    survey,
    initialState,
    ownerId,
}: SurveyClientProps) {
    const router = useRouter();
    const questions = useMemo(() => getSurveyQuestions(survey), [survey]);

    const [answers, setAnswers] = useState<SurveyAnswers>(
        initialState?.answers ?? {},
    );
    const [screen, setScreen] = useState<Screen>(
        initialState?.status === "submitted" ? "done" : "consent",
    );
    const [questionIndex, setQuestionIndex] = useState(0);
    const [returnToReview, setReturnToReview] = useState(false);
    const [gentleNote, setGentleNote] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitNote, setSubmitNote] = useState<string | null>(null);
    const [isLeaving, setIsLeaving] = useState(false);

    // Answers waiting to reach the server. Failures stay queued and retry;
    // the person never sees them.
    const pendingRef = useRef<Map<string, SurveyAnswer | null>>(new Map());
    const flushChainRef = useRef<Promise<void>>(Promise.resolve());
    const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const answersRef = useRef(answers);
    answersRef.current = answers;
    const currentQuestionIdRef = useRef<string | null>(null);

    // ------------------------------------------------------------------
    // Background sync. Calls are chained, never skipped: an answer queued
    // while an earlier flush is mid-flight is picked up by the next link in
    // the chain, so `await flush()` always means "everything queued so far
    // has been attempted".
    // ------------------------------------------------------------------
    const flush = useCallback(() => {
        const run = async () => {
            try {
                while (pendingRef.current.size > 0) {
                    const [questionId, answer] = pendingRef.current
                        .entries()
                        .next().value as [string, SurveyAnswer | null];
                    const result = await saveSurveyAnswer(
                        survey.id,
                        questionId,
                        answer,
                        currentQuestionIdRef.current ?? questionId,
                    );
                    if (result.success) {
                        // Only clear if not re-queued with a newer value.
                        if (pendingRef.current.get(questionId) === answer) {
                            pendingRef.current.delete(questionId);
                        }
                    } else if (result.alreadySubmitted) {
                        pendingRef.current.clear();
                        clearSurveyDraft(survey.id);
                        setScreen("done");
                        return;
                    } else if (
                        result.message === "Invalid answer" ||
                        result.message === "Unknown question"
                    ) {
                        // Definitive rejection (e.g. a corrupted local
                        // draft): retrying can never succeed, so drop it
                        // rather than knock on the server forever.
                        if (pendingRef.current.get(questionId) === answer) {
                            pendingRef.current.delete(questionId);
                        }
                    } else {
                        // Transient failure ("Could not save"): stop this
                        // round, leave the queue for the retry loop.
                        return;
                    }
                }
            } catch {
                // Offline. The retry loop below will try again.
            }
        };
        flushChainRef.current = flushChainRef.current.then(run, run);
        return flushChainRef.current;
    }, [survey.id]);

    const scheduleFlush = useCallback(() => {
        if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
        flushTimerRef.current = setTimeout(() => {
            void flush();
        }, 500);
    }, [flush]);

    // ------------------------------------------------------------------
    // Restore: merge whichever copy (server / this phone) is newer, and
    // land people who were partway through back on their question.
    // ------------------------------------------------------------------
    useEffect(() => {
        if (initialState?.status === "submitted") {
            clearSurveyDraft(survey.id);
            return;
        }
        const stored = readSurveyDraft(survey.id);
        // Only the person who wrote a draft may restore it.
        const local = ownerId && stored?.userId === ownerId ? stored : null;
        const serverTime = initialState?.updatedAt
            ? new Date(initialState.updatedAt).getTime()
            : 0;
        const localTime = local?.updatedAt
            ? new Date(local.updatedAt).getTime()
            : 0;

        const merged: SurveyAnswers = { ...(initialState?.answers ?? {}) };
        let resumeId: string | null = initialState?.lastQuestionId ?? null;

        if (local) {
            // Per-question overlay: a local answer wins if the server has
            // nothing for that question, or if this phone's copy is newer
            // overall. Anything overlaid is queued so the server catches up.
            let queued = false;
            for (const [questionId, answer] of Object.entries(local.answers)) {
                if (!(questionId in merged) || localTime > serverTime) {
                    merged[questionId] = answer;
                    pendingRef.current.set(questionId, answer);
                    queued = true;
                }
            }
            if (localTime > serverTime && local.lastQuestionId) {
                resumeId = local.lastQuestionId;
            }
            if (queued) scheduleFlush();
        }

        if (Object.keys(merged).length > 0) {
            setAnswers(merged);
            const index = questions.findIndex((item) => item.id === resumeId);
            setQuestionIndex(index >= 0 ? index : 0);
            setScreen("questions");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const retry = setInterval(() => {
            if (pendingRef.current.size > 0) void flush();
        }, 15000);
        const onOnline = () => void flush();
        window.addEventListener("online", onOnline);
        return () => {
            clearInterval(retry);
            window.removeEventListener("online", onOnline);
            if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
            // One last attempt on the way out; localStorage still has a copy
            // if this cannot complete.
            if (pendingRef.current.size > 0) void flush();
        };
    }, [flush]);

    // ------------------------------------------------------------------
    // Answer changes
    // ------------------------------------------------------------------
    const currentQuestion = questions[questionIndex];
    currentQuestionIdRef.current =
        screen === "questions" ? (currentQuestion?.id ?? null) : null;

    const handleAnswerChange = (
        questionId: string,
        answer: SurveyAnswer | null,
    ) => {
        setGentleNote(null);
        const next = { ...answersRef.current };
        if (answer === null) {
            delete next[questionId];
        } else {
            next[questionId] = answer;
        }
        setAnswers(next);
        writeSurveyDraft(survey.id, {
            answers: next,
            lastQuestionId: questionId,
            updatedAt: new Date().toISOString(),
            userId: ownerId,
        });
        pendingRef.current.set(questionId, answer);
        scheduleFlush();
    };

    // ------------------------------------------------------------------
    // Navigation
    // ------------------------------------------------------------------
    const goToQuestion = (index: number) => {
        setGentleNote(null);
        setQuestionIndex(index);
        window.scrollTo(0, 0);
    };

    const handleNext = () => {
        if (!currentQuestion) return;
        if (currentQuestion.required && !answers[currentQuestion.id]) {
            setGentleNote("We need an answer to this one before you move on.");
            return;
        }
        void flush();
        if (returnToReview) {
            setReturnToReview(false);
            setScreen("review");
            window.scrollTo(0, 0);
            return;
        }
        if (questionIndex + 1 < questions.length) {
            goToQuestion(questionIndex + 1);
        } else {
            setScreen("review");
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        setGentleNote(null);
        if (returnToReview) {
            setReturnToReview(false);
            setScreen("review");
            window.scrollTo(0, 0);
            return;
        }
        if (questionIndex === 0) {
            setScreen("consent");
        } else {
            goToQuestion(questionIndex - 1);
        }
        window.scrollTo(0, 0);
    };

    const handleDecline = async () => {
        setIsLeaving(true);
        try {
            await declineSurvey();
        } catch {
            // Even if this fails, leave quietly as asked.
        }
        router.push("/dashboard");
    };

    const handleSubmit = async () => {
        const requiredMissing = questions.find(
            (question) => question.required && !answers[question.id],
        );
        if (requiredMissing) {
            const index = questions.findIndex(
                (question) => question.id === requiredMissing.id,
            );
            setSubmitNote(
                "A question still needs an answer. We will take you to it.",
            );
            setTimeout(() => {
                setSubmitNote(null);
                setReturnToReview(true);
                setScreen("questions");
                goToQuestion(index);
            }, 1200);
            return;
        }

        setIsSubmitting(true);
        setSubmitNote(null);
        try {
            await flush();
            if (pendingRef.current.size > 0) {
                setSubmitNote(
                    "No connection right now. Your answers are saved on this phone — please try again in a moment.",
                );
                return;
            }
            const result = await submitSurvey();
            if (result.success) {
                clearSurveyDraft(survey.id);
                setScreen("done");
                window.scrollTo(0, 0);
            } else {
                setSubmitNote(
                    result.message ??
                        "That did not go through. Your answers are safe — please try again.",
                );
            }
        } catch {
            setSubmitNote(
                "No connection right now. Your answers are saved on this phone — please try again in a moment.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ------------------------------------------------------------------
    // Screens
    // ------------------------------------------------------------------

    if (screen === "done") {
        return (
            <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
                <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20"
                >
                    <Check className="h-10 w-10" strokeWidth={3} />
                </span>
                <h1 className="text-3xl font-bold">Thank you!</h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                    Your answers were sent. They are anonymous. They help us
                    make the next workshop better.
                </p>
                <Button
                    size="lg"
                    className="min-h-[56px] w-full max-w-xs text-lg"
                    onClick={() => router.push("/dashboard")}
                >
                    Back to my lessons
                </Button>
            </div>
        );
    }

    if (screen === "consent") {
        const hasProgress = Object.keys(answers).length > 0;
        return (
            <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center gap-6 px-4 py-10">
                <h1 className="text-3xl font-bold leading-snug">
                    {survey.consent.heading}
                </h1>
                <p className="text-xl leading-relaxed">{survey.consent.body}</p>
                <p className="text-lg text-muted-foreground">
                    It takes {survey.timeEstimate}.
                </p>
                <div className="flex flex-col gap-3">
                    <Button
                        size="lg"
                        className="min-h-[64px] w-full text-xl"
                        onClick={() => {
                            setScreen("questions");
                            window.scrollTo(0, 0);
                        }}
                    >
                        {hasProgress
                            ? "Continue where I stopped"
                            : survey.consent.startLabel}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-h-[64px] w-full text-xl"
                        disabled={isLeaving}
                        onClick={handleDecline}
                    >
                        {survey.consent.declineLabel}
                    </Button>
                </div>
            </div>
        );
    }

    if (screen === "review") {
        return (
            <div className="mx-auto w-full max-w-xl px-4 py-8">
                <h1 className="mb-2 text-2xl font-bold">Check your answers</h1>
                <p className="mb-6 text-lg text-muted-foreground">
                    You can change anything. When it looks right, press Send at
                    the bottom.
                </p>

                <div className="space-y-8">
                    {survey.sections.map((section) => (
                        <section key={section.id} aria-label={section.title}>
                            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.questions.map((question) => {
                                    const summary = answerSummary(
                                        question,
                                        answers[question.id],
                                    );
                                    const index = questions.findIndex(
                                        (item) => item.id === question.id,
                                    );
                                    return (
                                        <li
                                            key={question.id}
                                            className="rounded-xl border border-border bg-card p-4"
                                        >
                                            <div className="text-base text-muted-foreground">
                                                {question.prompt}
                                            </div>
                                            <div className="mt-1 flex items-center justify-between gap-3">
                                                <div
                                                    className={
                                                        summary
                                                            ? "whitespace-pre-wrap text-lg font-medium"
                                                            : "text-lg italic text-muted-foreground"
                                                    }
                                                >
                                                    {summary ??
                                                        (question.required
                                                            ? "Needs an answer"
                                                            : "Skipped")}
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="min-h-[44px] shrink-0"
                                                    onClick={() => {
                                                        setReturnToReview(true);
                                                        setScreen("questions");
                                                        goToQuestion(index);
                                                    }}
                                                >
                                                    <Pencil
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                    Change
                                                    <span className="sr-only">
                                                        : {question.prompt}
                                                    </span>
                                                </Button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </div>

                <div className="mt-8 space-y-3">
                    <p
                        aria-live="polite"
                        className="min-h-[1.5rem] text-lg font-medium"
                    >
                        {submitNote}
                    </p>
                    <Button
                        size="lg"
                        className="min-h-[64px] w-full text-xl"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Sending…" : "Send my answers"}
                    </Button>
                    <p className="text-center text-base text-muted-foreground">
                        After you send, you cannot change your answers.
                    </p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-h-[56px] w-full text-lg"
                        onClick={() => {
                            setScreen("questions");
                            goToQuestion(questions.length - 1);
                        }}
                    >
                        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                        Go back
                    </Button>
                </div>
            </div>
        );
    }

    // Questions screen
    if (!currentQuestion) return null;
    const section = survey.sections.find((item) =>
        item.questions.some((question) => question.id === currentQuestion.id),
    );
    const answeredThis = Boolean(answers[currentQuestion.id]);
    const progressPercent = Math.round(
        ((questionIndex + 1) / questions.length) * 100,
    );

    return (
        <div className="mx-auto w-full max-w-xl px-4 py-6">
            <div className="mb-6">
                <div className="mb-1 flex items-baseline justify-between gap-2 text-base text-muted-foreground">
                    <span>
                        Question {questionIndex + 1} of {questions.length}
                    </span>
                    <span>{section?.title}</span>
                </div>
                <div
                    role="progressbar"
                    aria-valuenow={questionIndex + 1}
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-label={`Question ${questionIndex + 1} of ${questions.length}`}
                    className="h-2 w-full overflow-hidden rounded-full bg-muted"
                >
                    <div
                        className="h-full rounded-full bg-foreground transition-all"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold leading-snug">
                {currentQuestion.prompt}
            </h1>
            {currentQuestion.help && (
                <p className="mb-4 text-lg text-muted-foreground">
                    {currentQuestion.help}
                </p>
            )}
            <p className="mb-4 text-base text-muted-foreground">
                {currentQuestion.required
                    ? "This one needs an answer."
                    : "You can skip this question."}
            </p>

            <div className="mb-6">
                <SurveyQuestionInput
                    key={currentQuestion.id}
                    question={currentQuestion}
                    value={answers[currentQuestion.id]}
                    onChange={(answer) =>
                        handleAnswerChange(currentQuestion.id, answer)
                    }
                />
            </div>

            <p
                aria-live="polite"
                className="mb-3 min-h-[1.5rem] text-lg font-medium"
            >
                {gentleNote}
            </p>

            <div className="flex gap-3">
                <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[56px] flex-1 text-lg"
                    onClick={handleBack}
                >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    Back
                </Button>
                <Button
                    size="lg"
                    className="min-h-[56px] flex-1 text-lg"
                    onClick={handleNext}
                >
                    {answeredThis || currentQuestion.required ? "Next" : "Skip"}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
}
