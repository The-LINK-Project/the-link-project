"use client";

import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { LessonCardBox, text } from "@/components/learn/ui";
import {
    FIRST_LANGUAGE_ENGLISH_NAMES,
    FIRST_LANGUAGE_LABELS,
    type TranslationLanguage,
} from "@/lib/lessons/languages";
import { cn } from "@/lib/utils";

/**
 * Before the conversation: which language the tutor should speak, and what the
 * learner will say. Languages are listed by their own names in their own
 * scripts, since the learner may not read the English around them.
 */
export function SpeakingIntro({
    title,
    targets,
    language,
    languages,
    onLanguageChange,
    micBlocked,
}: {
    title: string;
    /** The English the learner will be asked to say. */
    targets: string[];
    language: TranslationLanguage | null;
    languages: TranslationLanguage[];
    onLanguageChange: (language: TranslationLanguage) => void;
    micBlocked: boolean;
}) {
    const t = useTranslations("speaking");
    const [open, setOpen] = useState(language === null);
    const label = language ? FIRST_LANGUAGE_LABELS[language] : t("chooseLanguage");
    const english = language ? FIRST_LANGUAGE_ENGLISH_NAMES[language] : undefined;

    return (
        <div className="flex flex-col gap-6 pb-6">
            <div className="flex flex-col gap-1 pt-2">
                <p className={text.label}>{title}</p>
                <h1 className={text.title}>{t("title")}</h1>
                <p className={text.caption}>{t("intro")}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("language")}</p>
                <LessonCardBox className="p-0">
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-label={`${t("language")}. ${label}`}
                        onClick={() => setOpen((value) => !value)}
                        className={cn(
                            "flex min-h-14 w-full cursor-pointer items-center gap-3 px-4 text-left",
                            open && "border-b border-lesson-hairline",
                        )}
                    >
                        <span className={`${text.bodyStrong} flex-1`}>{label}</span>
                        {english && english !== label ? <span className={text.caption}>{english}</span> : null}
                        <ChevronDown className={cn("size-5 text-lesson-muted transition-transform", open && "rotate-180")} />
                    </button>
                    {open ? (
                        <div role="radiogroup" aria-label={t("language")} className="grid grid-cols-1 sm:grid-cols-2">
                            {languages.map((option) => {
                                const selected = option === language;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        role="radio"
                                        aria-checked={selected}
                                        onClick={() => {
                                            onLanguageChange(option);
                                            setOpen(false);
                                        }}
                                        className={cn(
                                            "flex min-h-12 cursor-pointer items-center gap-2 px-4 py-2 text-left hover:bg-lesson-muted-surface",
                                            selected && "bg-lesson-primary-soft",
                                        )}
                                    >
                                        <span className="flex flex-1 flex-col">
                                            <span className={text.bodyStrong}>{FIRST_LANGUAGE_LABELS[option]}</span>
                                            <span className={text.caption}>{FIRST_LANGUAGE_ENGLISH_NAMES[option]}</span>
                                        </span>
                                        {selected ? <Check className="size-5 text-lesson-primary-dark" /> : null}
                                    </button>
                                );
                            })}
                        </div>
                    ) : null}
                </LessonCardBox>
            </div>

            <div className="flex flex-col gap-2">
                <p className={text.label}>{t("youWillSay")}</p>
                {targets.map((target) => (
                    <p key={target} className={text.bodyStrong}>
                        {target}
                    </p>
                ))}
            </div>

            <div className="flex flex-col gap-1">
                <p className={text.caption}>{t("privacy")}</p>
                <p className={text.caption}>{t("data")}</p>
            </div>

            {micBlocked ? (
                <LessonCardBox tone="muted">
                    <p className={text.caption}>{t("micBlocked")}</p>
                </LessonCardBox>
            ) : null}
        </div>
    );
}
