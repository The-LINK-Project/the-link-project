"use client";

import { Volume1, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { localized, useLessonLocalized } from "@/lib/lessons/localized";
import { useSpeech } from "@/lib/lessons/speech";
import type { Lesson, VocabItem } from "@/lib/lessons/types";
import { cn } from "@/lib/utils";

import { LessonHeading } from "./LessonHeading";
import { LessonHero, VocabularyVisual } from "./LessonVisual";
import { text } from "./ui";

/**
 * The words, before the questions.
 *
 * Without this the first thing a learner met was a question about a word nobody
 * had shown them, and the only way through was to guess. Here every word is
 * shown with its meaning and can be heard as often as they like, and nothing is
 * asked of them. They start when they are ready.
 *
 * Every word of the lesson is listed, not only the ones an exercise drills. The
 * others turn up as wrong options, and a wrong option the learner has never
 * seen is not a fair one.
 */
export function LessonIntro({ lesson }: { lesson: Lesson }) {
    const t = useTranslations("lessons");

    return (
        <div className="flex flex-col gap-6">
            <LessonHeading lesson={lesson} title={t("introTitle")}>
                <LessonHero lesson={lesson} />
                <p className={cn(text.subheading, "text-lesson-primary-dark")}>{localized(lesson.goal, "en")}</p>
                <p className={text.caption}>{t("introBody")}</p>
            </LessonHeading>
            <LessonWords lesson={lesson} />
        </div>
    );
}

/** Every word of the lesson with its picture and meaning. Tap one to hear it. */
export function LessonWords({ lesson }: { lesson: Lesson }) {
    const t = useTranslations("lessons");
    const native = useLessonLocalized();
    const { speak, speaking } = useSpeech();
    const [current, setCurrent] = useState<string | null>(null);

    const say = (item: VocabItem) => {
        setCurrent(item.id);
        speak(item.term);
    };

    return (
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-2">
            {lesson.vocab.map((item) => {
                const playing = speaking && current === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-label={`${item.term}. ${native(item.meaning)}`}
                        aria-description={t("tapToListen")}
                        onClick={() => say(item)}
                        className="flex min-h-[92px] cursor-pointer items-center gap-3 rounded-2xl border-2 border-lesson-key bg-white p-3 text-left shadow-[0_4px_0_var(--color-lesson-key)] transition-[transform,box-shadow] duration-75 hover:bg-lesson-primary-soft/40 active:translate-y-1 active:shadow-none"
                    >
                        {item.picture ? <VocabularyVisual picture={item.picture} /> : null}
                        <span className="flex flex-1 flex-col gap-0.5">
                            <span className={text.subheading}>{item.term}</span>
                            <span className={text.caption}>{native(item.meaning)}</span>
                        </span>
                        <span
                            className={cn(
                                "flex size-12 shrink-0 items-center justify-center rounded-full",
                                playing ? "bg-lesson-primary-dark" : "bg-lesson-primary-soft",
                            )}
                        >
                            {playing ? (
                                <Volume2 className="size-6 text-white" />
                            ) : (
                                <Volume1 className="size-6 text-lesson-primary-dark" />
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
