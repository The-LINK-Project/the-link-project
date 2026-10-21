"use client";

import { useTranslations } from "next-intl";

import { getDailyMix, listLessons, listWorkshopLessons } from "@/lib/lessons/data";
import { fingerprint } from "@/lib/lessons/session";
import { continuePoint, doneToday, lessonStatus, type LessonRef } from "@/lib/progress/model";
import { useProgressData } from "@/lib/progress/store";
import { canPractiseSpeaking } from "@/lib/speaking/context";

import { EthicsCard } from "@/components/ethics/EthicsCard";

import { ContinueCard } from "./ContinueCard";
import { LessonCard } from "./LessonCard";
import { ProgressGate } from "./ProgressGate";
import { text } from "./ui";

/**
 * The learner's map: what they left unfinished, what is done, and what to take
 * next. The same screen as the mobile app's Home tab.
 */
export default function LessonHome() {
    return (
        <ProgressGate>
            <LessonHomeContent />
        </ProgressGate>
    );
}

function LessonHomeContent() {
    const t = useTranslations("lessons");
    const data = useProgressData();
    const lessons = listLessons();
    const workshop = listWorkshopLessons();
    const mix = getDailyMix();

    const all = [...lessons, ...workshop, mix];
    const refs = new Map<string, LessonRef>(
        all.map((lesson) => [
            lesson.id,
            { id: lesson.id, fingerprint: fingerprint(lesson), speakable: canPractiseSpeaking(lesson) },
        ]),
    );
    const point = continuePoint(data, [...refs.values()]);
    const continuing = point ? all.find((lesson) => lesson.id === point.lessonId) : undefined;

    const statuses = lessons.map((lesson) => lessonStatus(data, refs.get(lesson.id)!));
    // A lesson counts once the talk is done as well as the exercises. Going
    // through a finished lesson again does not un-finish it.
    const done = statuses.filter((status) => status.finished === "done").length;
    // Pointing at a new lesson while another is half done is two instructions.
    const nextIndex = point ? -1 : statuses.findIndex((status) => status.finished === "none");

    // Workshop lessons sit outside the count and the "next" pointer, which
    // walk a learner through the English lessons.
    const workshopStatuses = workshop.map((lesson) => lessonStatus(data, refs.get(lesson.id)!));

    const mixStatus = lessonStatus(data, refs.get(mix.id)!);
    const mixDone = doneToday(data.progress.lessons[mix.id]);

    return (
        <div className="flex flex-col gap-4">
            {point && continuing ? (
                <ContinueCard
                    lesson={continuing}
                    point={point}
                    href={point.kind === "lesson" ? `/lessons/${point.lessonId}` : `/lessons/${point.lessonId}/speak`}
                />
            ) : null}

            {/* The Ethics of AI game sits with the workshop lessons. Nothing
                about it is tracked, so it is a plain link rather than a lesson
                with a status, and it shows even when no workshop lesson does. */}
            <div className="flex flex-col gap-1 pt-2">
                <h2 className={text.heading}>{t("workshopTitle")}</h2>
                <p className={text.caption}>{t("workshopBody")}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {workshop.map((lesson, index) => {
                    const status = workshopStatuses[index];
                    return (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            status={status}
                            speakHref={
                                status.finished !== "none" && refs.get(lesson.id)!.speakable
                                    ? `/lessons/${lesson.id}/speak`
                                    : undefined
                            }
                        />
                    );
                })}
                <EthicsCard />
            </div>

            <div className="flex flex-col gap-1 pt-2">
                <h2 className={text.heading}>{t("lessonsTitle")}</h2>
                {done === 0 ? (
                    <p className={text.caption}>{t("lessonsBody")}</p>
                ) : (
                    <div className="flex flex-col gap-1 pt-1" aria-label={t("doneCount", { done, total: lessons.length })}>
                        <div className="h-2 overflow-hidden rounded-full bg-lesson-muted-surface">
                            <div
                                className="h-full rounded-full bg-lesson-primary"
                                style={{ width: `${(done / lessons.length) * 100}%` }}
                            />
                        </div>
                        <p className={text.caption}>{t("doneCount", { done, total: lessons.length })}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {lessons.map((lesson, index) => {
                    const status = statuses[index];
                    const learned = status.finished !== "none";
                    return (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            status={status}
                            next={index === nextIndex}
                            speakHref={
                                learned && refs.get(lesson.id)!.speakable ? `/lessons/${lesson.id}/speak` : undefined
                            }
                        />
                    );
                })}
            </div>

            <div className="flex flex-col gap-1 pt-2">
                <h2 className={text.heading}>{t("practiceTitle")}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <LessonCard
                    lesson={mix}
                    // The mix is new again every morning, so yesterday's tick
                    // must not sit on today's exercises.
                    status={{ finished: "none", run: mixStatus.run, talk: null }}
                    doneLabel={mixDone ? t("mixDoneToday") : undefined}
                />
            </div>
        </div>
    );
}
