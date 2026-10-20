"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "@/i18n/navigation";
import { getLesson } from "@/lib/lessons/data";
import { DAILY_MIX_ID } from "@/lib/lessons/data/review";
import { useLearnerLanguage, useLessonLocalized } from "@/lib/lessons/localized";
import { restoreSession, snapshotOf, useLessonSession } from "@/lib/lessons/session";
import type { LessonRecord, SavedRun } from "@/lib/progress/model";
import { completeLesson, getProgressData, saveRun, setResume } from "@/lib/progress/store";
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
    const [record] = useState<LessonRecord | undefined>(() => {
        const found = getProgressData().progress.lessons[lessonId];
        return lessonId !== DAILY_MIX_ID && found && found.total > 0 ? found : undefined;
    });
    // The daily mix draws on every lesson's words, far too many to list, and
    // all of them already met in the lesson they came from.
    const [started, setStarted] = useState(saved !== undefined || lessonId === DAILY_MIX_ID);

    if (started) {
        return (
            <LessonRunner
                lessonId={lessonId}
                saved={saved}
                // Back from the first exercise is the word list. The daily mix
                // has none, so it starts on its first exercise and stays there.
                onBackToStart={
                    lessonId === DAILY_MIX_ID
                        ? undefined
                        : () => {
                              // Picked up again from where the learner had got to.
                              setSaved(readSaved());
                              setStarted(false);
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
            footer={
                <ShellActions>
                    {/* The lesson's first step, so Back is the way home. */}
                    <WithBack onBack={() => router.push("/dashboard")}>
                        {record ? (
                            <LessonDoneActions
                                onAgain={() => setStarted(true)}
                                onSpeak={canSpeak ? () => router.push(`/lessons/${lesson.id}/speak`) : undefined}
                                onChat={
                                    lesson.chatPractice ? () => router.push(`/lessons/${lesson.id}/chat`) : undefined
                                }
                            />
                        ) : (
                            <LessonButton title={t("introStart")} size="lg" onClick={() => setStarted(true)} />
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

function LessonRunner({
    lessonId,
    saved,
    onBackToStart,
}: {
    lessonId: string;
    saved?: SavedRun;
    /** Back from the first exercise. */
    onBackToStart?: () => void;
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
    } = useLessonSession(lesson, language, SCREEN_READER, saved);

    // Every answer is written down as it happens. A tab can be closed at any
    // moment, so there is no later to save in.
    const recorded = useRef(false);
    useEffect(() => {
        const snapshot = snapshotOf(state);
        // The lesson is finished by its last answer, not by pressing Continue
        // under it, so a learner who closes the tab on the feedback has still
        // finished it. An empty run is over before it starts.
        if (snapshot.position >= snapshot.queue.length) {
            if (recorded.current) return;
            recorded.current = true;
            completeLesson(lessonId, { firstTryCorrect: summary.firstTryCorrect, total: summary.total });
            return;
        }
        recorded.current = false;
        // Nothing answered yet: there is no place to keep.
        if (snapshot.position === 0) return;
        saveRun(lessonId, snapshot, `/lessons/${lessonId}`);
    }, [state, lessonId, summary.firstTryCorrect, summary.total]);

    // Leaving by choice is not somewhere to be sent back to.
    useEffect(() => () => setResume(null), []);

    // No "are you sure?": the place is kept, so leaving costs nothing.
    const leave = useCallback(() => router.push("/dashboard"), [router]);

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
                // A fresh component per queue position: an exercise that comes
                // back after a miss starts again rather than showing its old answer.
                key={`${state.position}-${exercise.id}`}
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
