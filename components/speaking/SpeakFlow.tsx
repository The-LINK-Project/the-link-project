"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LessonProgress } from "@/components/learn/LessonProgress";
import { LessonShell, ShellActions } from "@/components/learn/LessonShell";
import { ProgressGate } from "@/components/learn/ProgressGate";
import { LessonButton, text } from "@/components/learn/ui";
import { useRouter } from "@/i18n/navigation";
import { getLesson } from "@/lib/lessons/data";
import { isTranslationLanguage, type TranslationLanguage } from "@/lib/lessons/languages";
import { useLearnerLanguage } from "@/lib/lessons/localized";
import type { Lesson } from "@/lib/lessons/types";
import type { SavedTalk } from "@/lib/progress/model";
import { clearTalk, completeSpeaking, getProgressData, saveTalk, setResume } from "@/lib/progress/store";
import {
    buildSpeakingContext,
    practiceLanguages,
    runFromParams,
    type PractisedRun,
    type SpeakingContext,
} from "@/lib/speaking/context";
import { restoreConversation, saidCount } from "@/lib/speaking/conversation";
import { englishSplitter } from "@/lib/speaking/highlight";
import { usePlayback } from "@/lib/speaking/playback";
import { useRecorder } from "@/lib/speaking/recorder";
import { useSpeakingSession } from "@/lib/speaking/useSpeakingSession";

import { ChatBubble } from "./ChatBubble";
import { RecordBar } from "./RecordBar";
import { SpeakingIntro } from "./SpeakingIntro";
import { SpeakingSummary } from "./SpeakingSummary";

/** The tutor language picked last time, so it need not be picked again. */
const TUTOR_LANGUAGE_KEY = "link.tutorLanguage";

function storedTutorLanguage(): TranslationLanguage | null {
    try {
        const value = window.localStorage.getItem(TUTOR_LANGUAGE_KEY);
        return isTranslationLanguage(value) ? value : null;
    } catch {
        return null;
    }
}

/**
 * Speaking practice after a lesson.
 *
 * The learner chooses the language they speak, then has a short spoken
 * role-play with a tutor who talks in that language and uses only the English
 * this run taught. The exercises taught what the words mean; this is where they
 * get said.
 */
export default function SpeakPage({
    lessonId,
    words,
    phrases,
}: {
    lessonId: string;
    words?: string;
    phrases?: string;
}) {
    return (
        <ProgressGate>
            <SpeakScreen lessonId={lessonId} words={words} phrases={phrases} />
        </ProgressGate>
    );
}

function SpeakScreen({ lessonId, words, phrases }: { lessonId: string; words?: string; phrases?: string }) {
    const t = useTranslations("speaking");
    const router = useRouter();
    const lesson = getLesson(lessonId)!;
    const run = useMemo(() => runFromParams(lesson, { words, phrases }), [lesson, words, phrases]);
    const languages = practiceLanguages(lesson, run);

    if (languages.length === 0) {
        return (
            <LessonShell closeLabel={t("close")} icon={lesson.icon} onClose={() => router.push("/dashboard")}>
                <p className={text.body}>{t("nothingToPractise")}</p>
            </LessonShell>
        );
    }
    return <SpeakingFlow lesson={lesson} run={run} languages={languages} />;
}

function SpeakingFlow({
    lesson,
    run,
    languages,
}: {
    lesson: Lesson;
    run: PractisedRun;
    languages: TranslationLanguage[];
}) {
    const t = useTranslations("speaking");
    const router = useRouter();
    const locale = useLearnerLanguage();
    const [chosen, setChosen] = useState<TranslationLanguage | null>(null);
    const [remembered] = useState(storedTutorLanguage);
    // A talk left unfinished is carried on with, not offered as a choice: the
    // learner asked to practise speaking, and this is them practising speaking.
    const [saved, setSaved] = useState<SavedTalk | undefined>(() => {
        const talk = getProgressData().talks[lesson.id];
        return talk && restoreConversation(talk.context, talk.state) ? talk : undefined;
    });
    const [context, setContext] = useState<SpeakingContext | null>(saved?.context ?? null);
    /** Bumped to begin again, so the conversation starts from nothing. */
    const [round, setRound] = useState(0);
    const [micBlocked, setMicBlocked] = useState(false);
    const [starting, setStarting] = useState(false);

    // The language picked last time comes first, then the language the site is
    // being read in. Either only counts when the tutor can teach from it, and
    // both are only a starting point: the list is still there to be tapped.
    const language =
        chosen ??
        languages.find((option) => option === remembered) ??
        languages.find((option) => option === locale) ??
        null;

    const start = useCallback(async () => {
        if (!language) return;
        setStarting(true);
        setMicBlocked(false);
        try {
            // Asked before the tutor starts, so the permission prompt never
            // interrupts the conversation itself.
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => track.stop());
        } catch {
            setMicBlocked(true);
            setStarting(false);
            return;
        }
        try {
            window.localStorage.setItem(TUTOR_LANGUAGE_KEY, language);
        } catch {
            // Only a convenience for next time.
        }
        setStarting(false);
        setContext(buildSpeakingContext(lesson, run, language));
    }, [language, lesson, run]);

    if (context) {
        return (
            <Conversation
                key={round}
                lesson={lesson}
                context={context}
                saved={saved}
                onAgain={() => {
                    clearTalk(lesson.id);
                    setSaved(undefined);
                    setContext(null);
                    setRound((value) => value + 1);
                }}
            />
        );
    }

    const preview = buildSpeakingContext(lesson, run, language ?? languages[0]);

    return (
        <LessonShell
            closeLabel={t("close")}
            icon={lesson.icon}
            onClose={() => router.push("/dashboard")}
            footer={
                // Pinned, like every other way forward in a lesson.
                <ShellActions>
                    <LessonButton
                        title={t("start")}
                        size="lg"
                        disabled={!language}
                        loading={starting}
                        aria-description={language ? undefined : t("chooseLanguage")}
                        onClick={() => void start()}
                    />
                </ShellActions>
            }
        >
            <SpeakingIntro
                lesson={lesson}
                targets={preview?.goals.map((goal) => goal.target) ?? []}
                language={language}
                languages={languages}
                onLanguageChange={setChosen}
                micBlocked={micBlocked}
            />
        </LessonShell>
    );
}

function Conversation({
    lesson,
    context,
    saved,
    onAgain,
}: {
    lesson: Lesson;
    context: SpeakingContext;
    saved?: SavedTalk;
    onAgain: () => void;
}) {
    const t = useTranslations("speaking");
    const router = useRouter();
    const { state, takeTurn } = useSpeakingSession(context, saved?.state);
    const english = useMemo(() => englishSplitter(context), [context]);
    const recorder = useRecorder();
    const voice = usePlayback();
    const review = usePlayback();
    const [notice, setNotice] = useState<string | null>(null);
    const [preparing, setPreparing] = useState(false);
    const [reading, setReading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const operation = useRef(false);
    const mounted = useRef(true);
    const scroll = useRef<HTMLDivElement>(null);
    const autoplayed = useRef<string | null>(null);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    // Each new tutor line plays by itself, the way a person would simply speak,
    // and it can always be stopped. A browser that blocks sound until a tap
    // leaves the play button on the line to press.
    const latest = state.messages[state.messages.length - 1];
    const playVoice = voice.play;
    useEffect(() => {
        if (latest?.role !== "tutor" || !latest.audioUri) return;
        if (autoplayed.current === latest.id) return;
        autoplayed.current = latest.id;
        playVoice(latest.audioUri);
    }, [latest, playVoice]);

    // Keep the newest line in view.
    useEffect(() => {
        scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: "smooth" });
    }, [state.messages.length, state.error]);

    // The talk is written down after every turn, and recorded as done the
    // moment the last goal is, not when the results screen is dismissed: a
    // learner who closes the tab on "well done" has still done it.
    const recorded = useRef(false);
    useEffect(() => {
        if (state.phase === "finished") {
            if (recorded.current) return;
            recorded.current = true;
            completeSpeaking(lesson.id, { said: saidCount(state), total: state.goalCount });
        } else if (state.phase === "ready") {
            saveTalk(lesson.id, { context, state }, `/lessons/${lesson.id}/speak`);
        }
    }, [state, context, lesson.id]);

    useEffect(() => () => setResume(null), []);

    // The talk is kept, so leaving needs no warning.
    const quit = useCallback(() => router.push("/dashboard"), [router]);

    const record = async () => {
        if (operation.current) return;
        operation.current = true;
        setPreparing(true);
        voice.stop();
        review.stop();
        setNotice(null);
        try {
            const result = await recorder.start();
            if (!mounted.current) return;
            if (result === "denied") setNotice(t("micBlocked"));
            if (result === "failed") setNotice(t("recordFailed"));
        } finally {
            operation.current = false;
            if (mounted.current) setPreparing(false);
        }
    };

    const send = async () => {
        if (operation.current) return;
        operation.current = true;
        setReading(true);
        voice.stop();
        review.stop();
        setNotice(null);
        try {
            const audio = await recorder.read();
            if (!mounted.current) return;
            if (!audio) throw new Error("Recording is unavailable");
            if (await takeTurn(audio)) recorder.discard();
        } catch {
            if (mounted.current) setNotice(t("sendFailed"));
        } finally {
            operation.current = false;
            if (mounted.current) setReading(false);
        }
    };

    if (showSummary) {
        return (
            <LessonShell
                closeLabel={t("close")}
                icon={lesson.icon}
                onClose={quit}
                footer={
                    <ShellActions>
                        <div className="flex flex-col gap-3">
                            <LessonButton title={t("done")} size="lg" onClick={quit} />
                            <LessonButton title={t("again")} variant="outline" onClick={onAgain} />
                        </div>
                    </ShellActions>
                }
            >
                <SpeakingSummary
                    lesson={lesson}
                    goals={context.goals.map((goal, index) => ({
                        id: goal.id,
                        target: goal.target,
                        result: state.results[index] ?? "helped",
                    }))}
                />
            </LessonShell>
        );
    }

    const opening = state.phase === "opening";
    const goalLabel = {
        current: Math.min(state.results.length + 1, state.goalCount),
        total: state.goalCount,
    };
    const busyLabel = preparing
        ? t("micStarting")
        : opening && !state.error
          ? t("starting")
          : reading || state.phase === "sending"
            ? t("thinking")
            : null;

    return (
        <LessonShell
            closeLabel={t("close")}
            icon={lesson.icon}
            onClose={quit}
            scrollRef={scroll}
            header={
                <>
                    <LessonProgress value={state.results.length / state.goalCount} />
                    {/* A bar says "some of it"; a number says when it ends, which
                        is what somebody with ten minutes of break left wants. */}
                    <span
                        className="text-[15px] font-extrabold tabular-nums text-lesson-muted"
                        aria-label={t("goalCount", goalLabel)}
                    >
                        {`${goalLabel.current}/${goalLabel.total}`}
                    </span>
                </>
            }
            footer={
                state.phase === "finished" ? (
                    <ShellActions>
                        <LessonButton
                            title={t("seeResults")}
                            size="lg"
                            onClick={() => {
                                voice.stop();
                                setShowSummary(true);
                            }}
                        />
                    </ShellActions>
                ) : opening && state.error ? null : (
                    <RecordBar
                        status={recorder.status}
                        durationMs={recorder.durationMs}
                        level={recorder.level}
                        busyLabel={busyLabel}
                        notice={
                            recorder.failed
                                ? t("recordFailed")
                                : recorder.tooShort
                                  ? t("tooShort")
                                  : recorder.tooQuiet
                                    ? t("tooQuiet")
                                    : notice
                        }
                        reviewPlaying={!!recorder.uri && review.playingUri === recorder.uri}
                        onRecord={() => void record()}
                        onStop={recorder.stop}
                        onCancel={recorder.cancel}
                        onDelete={() => {
                            review.stop();
                            recorder.discard();
                        }}
                        onPlayRecording={() => {
                            voice.stop();
                            if (recorder.uri) review.play(recorder.uri);
                        }}
                        onStopPlayback={review.stop}
                        onSend={() => void send()}
                    />
                )
            }
        >
            <div className="flex flex-col gap-3">
                {state.messages.map((message) => (
                    <ChatBubble
                        key={message.id}
                        message={message}
                        english={english}
                        icon={lesson.icon}
                        disabled={preparing || recorder.status === "recording"}
                        playing={!!message.audioUri && voice.playingUri === message.audioUri}
                        onPlay={(speed) => {
                            if (!message.audioUri || operation.current || recorder.status === "recording") return;
                            review.stop();
                            voice.play(message.audioUri, speed);
                        }}
                        onStop={voice.stop}
                    />
                ))}

                {state.error ? (
                    <div className="flex flex-col items-center gap-2">
                        <p className={`${text.caption} text-center`}>{t(state.error)}</p>
                        {opening ? (
                            <LessonButton
                                className="w-auto"
                                title={t("retry")}
                                variant="outline"
                                onClick={() => void takeTurn()}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </LessonShell>
    );
}
