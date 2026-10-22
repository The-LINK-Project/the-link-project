"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "@/i18n/navigation";
import { exerciseSpokenTexts } from "@/lib/lessons/audio";
import { getLesson } from "@/lib/lessons/data";
import { DAILY_MIX_ID } from "@/lib/lessons/data/review";
import { useLearnerLanguage, useLessonLocalized } from "@/lib/lessons/localized";
import { restoreSession, snapshotOf, useLessonSession } from "@/lib/lessons/session";
import { prefetchSpeech } from "@/lib/lessons/speech";
import type { LessonRecord, SavedRun } from "@/lib/progress/model";
import {
    catchUpProgress,
    clearRun,
    completeLesson,
    getProgressData,
    saveRun,
    setResume,
    useProgressData,
} from "@/lib/progress/store";
import { canPractiseSpeaking, practiceLanguages, runToParams } from "@/lib/speaking/context";

import { ExerciseRenderer } from "./ExerciseRenderer";
import { SELF_GRADING } from "./exercises/shared";
import { LessonDone, LessonDoneActions } from "./LessonDone";
import { LessonFooter } from "./LessonFooter";
import { LessonIntro } from "./LessonIntro";
import { LessonProgress } from "./LessonProgress";
import { LessonShell, ShellActions } from "./LessonShell";
import { LessonSummary, LessonSummaryActions } from "./LessonSummary";
import { ProgressGate } from "./ProgressGate";
import { WithBack } from "./StepNav";
import { LessonButton, text } from "./ui";

/** Screen readers cannot be detected from a web page, so picture exercises always run. */
const SCREEN_READER = false;

/**
 * One lesson.
 *
 * This page owns no exercise logic. It resolves the lesson, drives the session
 * reducer, and hands whatever exercise is current to the renderer. Any lesson
 * with any mix of exercise types plays through this same page.
 */
export default function LessonPage({ lessonId }: { lessonId: string }) {
    return (
        <ProgressGate>
            <LessonFlow lessonId={lessonId} />
        </ProgressGate>
    );
}

/**
 * Words first, then the exercises. A learner coming back to a run they had
 * started goes straight to where they were: they have met the words already.
 * One coming back to a lesson they have finished is told so, and is not dropped
 * into its first question as though nothing had been kept.
 */
function LessonFlow({ lessonId }: { lessonId: string }) {
    const t = useTranslations("lessons");
    const router = useRouter();
    const language = useLearnerLanguage();
    const lesson = getLesson(lessonId)!;
    // Read when the runner starts, not on every render. The run is saved again
    // on every answer, and re-reading it would restart the session underneath
    // the learner each time.
    const readSaved = (): SavedRun | undefined => {
        const run = getProgressData().runs[lessonId];
        return run && restoreSession(lesson, run, SCREEN_READER, language) ? run : undefined;
    };
    const [saved, setSaved] = useState<SavedRun | undefined>(readSaved);
    // Read once as well, or finishing the lesson here would swap the summary
    // for the "done" view the moment the result was recorded. The daily mix is
    // new every morning, so yesterday's finish says nothing about today's. A
    // record with no exercises in it came from speaking alone.
    const readRecord = (): LessonRecord | undefined => {
        const found = getProgressData().progress.lessons[lessonId];
        return lessonId !== DAILY_MIX_ID && found && found.total > 0 ? found : undefined;
    };
    const [record, setRecord] = useState<LessonRecord | undefined>(readRecord);
    // The daily mix draws on every lesson's words, far too many to list, and
    // all of them already met in the lesson they came from. A review steps back
    // through a finished lesson from its results.
    const [mode, setMode] = useState<"start" | "run" | "review">(
        saved !== undefined || lessonId === DAILY_MIX_ID ? "run" : "start",
    );
    // A fresh runner, picked up from what another tab stored (see LessonRunner).
    const [runKey, setRunKey] = useState(0);
    // From the word list or the results, with what is stored now: another tab
    // may have moved this lesson on while this one sat here.
    const startFromStored = () => {
        setSaved(readSaved());
        setMode("run");
    };
    const pickUpStored = () => {
        const run = readSaved();
        setSaved(run);
        setRecord(readRecord());
        setMode(run !== undefined || lessonId === DAILY_MIX_ID ? "run" : "start");
        setRunKey((value) => value + 1);
    };

    if (mode !== "start") {
        return (
            <LessonRunner
                key={runKey}
                lessonId={lessonId}
                saved={saved}
                review={mode === "review"}
                onStale={pickUpStored}
                // Back from the first exercise is the word list, or the results
                // for a finished lesson. The daily mix has neither, so it starts
                // on its first exercise and stays there.
                onBackToStart={
                    lessonId === DAILY_MIX_ID
                        ? undefined
                        : () => {
                              // Picked up again from where the learner had got to,
                              // and a lesson just finished opens on its results.
                              setSaved(readSaved());
                              setRecord(readRecord());
                              setMode("start");
                          }
                }
            />
        );
    }

    const canSpeak = canPractiseSpeaking(lesson);
    // The talk is the lesson's second stage, so without it the lesson is in
    // progress, and its way forward is the talk rather than a second run.
    const speakingLeft = canSpeak && !record?.speaking;

    return (
        <LessonShell
            closeLabel={t("quit")}
            icon={lesson.icon}
            onClose={() => router.push("/dashboard")}
            step="start"
            footer={
                <ShellActions>
                    {/* The word list is the lesson's first step, so Back is the way
                        home. The results of a finished lesson go back to its
                        last exercise. */}
                    <WithBack onBack={record ? () => setMode("review") : () => router.push("/dashboard")}>
                        {record ? (
                            <LessonDoneActions
                                onAgain={startFromStored}
                                onSpeak={canSpeak ? () => router.push(`/lessons/${lesson.id}/speak`) : undefined}
                                onChat={
                                    lesson.chatPractice ? () => router.push(`/lessons/${lesson.id}/chat`) : undefined
                                }
                            />
                        ) : (
                            <LessonButton title={t("introStart")} size="lg" onClick={startFromStored} />
                        )}
                    </WithBack>
                </ShellActions>
            }
        >
            {record ? (
                <LessonDone lesson={lesson} record={record} speakingLeft={speakingLeft} />
            ) : (
                <LessonIntro lesson={lesson} />
            )}
        </LessonShell>
    );
}

/** The same place in the same run, whenever either was saved. */
function sameRun(stored: SavedRun, snapshot: ReturnType<typeof snapshotOf>): boolean {
    return (
        stored.fingerprint === snapshot.fingerprint &&
        stored.locale === snapshot.locale &&
        stored.position === snapshot.position &&
        stored.queue.join() === snapshot.queue.join() &&
        stored.requeued.join() === snapshot.requeued.join() &&
        JSON.stringify(stored.records) === JSON.stringify(snapshot.records)
    );
}

function LessonRunner({
    lessonId,
    saved,
    review = false,
    onBackToStart,
    onStale,
}: {
    lessonId: string;
    saved?: SavedRun;
    /** Stepping back through a finished lesson, from its results. */
    review?: boolean;
    /** Back from the first exercise, and the end of a review. */
    onBackToStart?: () => void;
    /** Another tab has moved this lesson on; what is stored should take over. */
    onStale?: () => void;
}) {
    const t = useTranslations("lessons");
    const localized = useLessonLocalized();
    const router = useRouter();
    const language = useLearnerLanguage();
    const lesson = getLesson(lessonId)!;

    const {
        state,
        exercise,
        progress,
        isLastStep,
        revisiting,
        setDraft,
        submit,
        submitAnswer,
        next,
        back,
        restart,
        summary,
    } = useLessonSession(lesson, language, SCREEN_READER, saved, review);

    // Every answer is written down as it happens. A tab can be closed at any
    // moment, so there is no later to save in.
    const recorded = useRef(false);

    // Another tab may carry on with this lesson: on a phone a link from a chat
    // opens a new tab and leaves this one behind. Once that tab has saved this
    // lesson's run, or finished the lesson and so cleared it, this run is out
    // of date, and gives way to what is stored rather than writing its older
    // answers over the newer ones. "Out of date" is any change to the stored
    // run this runner did not make itself. Times are never compared, as
    // another device's clock need not agree with this one's. Records are left
    // out: the server can bring an old one in at any moment, and a run kept
    // only in this browser has nothing to lose to it.
    const readStored = () => getProgressData().runs[lessonId]?.savedAt;
    const known = useRef(readStored());
    const movedOnElsewhere = () => readStored() !== known.current;
    const gaveWay = useRef(false);
    const giveWay = () => {
        if (gaveWay.current || !onStale) return;
        gaveWay.current = true;
        onStale();
    };
    // Drawn again whenever the store changes (another tab's write arrives), so
    // the check after every draw sees it.
    useProgressData();
    useEffect(() => {
        if (!review && movedOnElsewhere()) giveWay();
    });

    useEffect(() => {
        // A review changes nothing: it is not a place to come back to, and
        // reaching its end is not finishing the lesson a second time.
        if (review) return;
        // Checked again just before writing, in case the news has not arrived.
        catchUpProgress();
        if (movedOnElsewhere()) {
            giveWay();
            return;
        }
        const snapshot = snapshotOf(state);
        // The lesson is finished by its last answer, not by pressing Continue
        // under it, so a learner who closes the tab on the feedback has still
        // finished it. An empty run is over before it starts.
        if (snapshot.position >= snapshot.queue.length) {
            if (recorded.current) return;
            recorded.current = true;
            completeLesson(lessonId, { firstTryCorrect: summary.firstTryCorrect, total: summary.total });
            known.current = readStored();
            return;
        }
        recorded.current = false;
        // Nothing answered yet: there is no place to keep.
        if (snapshot.position === 0) return;
        // A run just picked up is what is stored already. Writing it again
        // would look, to a tab that also has this lesson open, like news.
        const stored = getProgressData().runs[lessonId];
        if (stored && sameRun(stored, snapshot)) return;
        saveRun(lessonId, snapshot, `/lessons/${lessonId}`);
        known.current = readStored();
    }, [review, state, lessonId, summary.firstTryCorrect, summary.total]);

    // The end of a review is the results it started from.
    const reviewOver = review && state.phase === "finished";
    useEffect(() => {
        if (reviewOver) onBackToStart?.();
    }, [reviewOver, onBackToStart]);

    // What this exercise and the next will say, fetched ahead of the tap.
    useEffect(() => {
        const upcoming = state.queue.slice(state.position, state.position + 2);
        prefetchSpeech(
            upcoming.flatMap((id) => {
                const item = lesson.exercises.find((candidate) => candidate.id === id);
                return item ? exerciseSpokenTexts(lesson, item) : [];
            }),
        );
    }, [lesson, state.queue, state.position]);

    // Leaving by choice is not somewhere to be sent back to.
    useEffect(() => () => setResume(null), []);

    // No "are you sure?": the place is kept, so leaving costs nothing.
    const leave = useCallback(() => router.push("/dashboard"), [router]);

    // From the first exercise, with the saved place forgotten too: a fresh run
    // saves nothing until its first answer, so the old place would come back.
    // Offered once there is an answer to lose, and not in a review, which
    // changes nothing. Each fresh run is a new round, so an exercise on screen
    // before and after starting again is still drawn afresh.
    const [round, setRound] = useState(0);
    const startOver = useCallback(() => {
        clearRun(lessonId);
        known.current = readStored();
        restart();
        setRound((value) => value + 1);
    }, [lessonId, restart]);
    const canRestart = !review && state.reached > 0;

    if (reviewOver) return null;

    if (state.phase === "finished") {
        const run = {
            vocabIds: summary.practisedVocabIds,
            phraseIds: summary.phrases.map((phrase) => phrase.id),
        };
        // What this run taught is what gets said. A run that taught nothing
        // sayable must not strand a lesson that has a talk: the talk then takes
        // the whole lesson as taught.
        const ownTalk = practiceLanguages(lesson, run).length > 0;
        const canSpeak = ownTalk || canPractiseSpeaking(lesson);
        const spoken = getProgressData().progress.lessons[lessonId]?.speaking !== undefined;
        const speakHref = ownTalk
            ? `/lessons/${lesson.id}/speak?${new URLSearchParams(runToParams(run)).toString()}`
            : `/lessons/${lesson.id}/speak`;
        return (
            <LessonShell
                closeLabel={t("quit")}
                icon={lesson.icon}
                onClose={leave}
                step="results"
                footer={
                    <ShellActions>
                        {/* Back to the last exercise, to look at it again. */}
                        <WithBack onBack={back}>
                            <LessonSummaryActions
                                speakingLeft={canSpeak && !spoken}
                                onDone={leave}
                                // Replaces the lesson rather than stacking on top of
                                // it, so finishing the practice goes straight home.
                                onSpeak={canSpeak ? () => router.replace(speakHref) : undefined}
                                onChat={
                                    lesson.chatPractice ? () => router.replace(`/lessons/${lesson.id}/chat`) : undefined
                                }
                            />
                        </WithBack>
                    </ShellActions>
                }
            >
                <LessonSummary lesson={lesson} summary={summary} speakingLeft={canSpeak && !spoken} onRetry={restart} />
            </LessonShell>
        );
    }

    if (!exercise) {
        return (
            <LessonShell closeLabel={t("quit")} icon={lesson.icon} onClose={leave}>
                <p className={text.body}>{t("exerciseMissing")}</p>
            </LessonShell>
        );
    }

    return (
        <LessonShell
            closeLabel={t("quit")}
            icon={lesson.icon}
            onClose={leave}
            header={<LessonProgress value={progress} />}
            step={`${round}-${state.position}`}
            footerKey={`${round}-${state.position}-${state.phase}`}
            onRestart={canRestart ? startOver : undefined}
            footer={
                <LessonFooter
                    phase={state.phase === "graded" ? "graded" : "answering"}
                    canSubmit={state.draft !== null}
                    result={state.result}
                    onSubmit={submit}
                    onNext={next}
                    isLastStep={isLastStep}
                    hideSubmit={SELF_GRADING.has(exercise.type)}
                    onBack={state.position > 0 ? back : onBackToStart}
                    revisiting={revisiting}
                />
            }
        >
            <h1 className={text.heading}>{localized(exercise.instruction)}</h1>
            <ExerciseRenderer
                // A fresh component per queue position and per run: an exercise
                // that comes back after a miss, or after starting again, starts
                // again rather than showing its old answer.
                key={`${round}-${state.position}-${exercise.id}`}
                exercise={exercise}
                lesson={lesson}
                draft={state.draft}
                onDraftChange={setDraft}
                onSelfSubmit={submitAnswer}
                result={state.result}
                locked={state.phase === "graded"}
            />
        </LessonShell>
    );
}
