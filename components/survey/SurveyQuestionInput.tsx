"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Renders the input for one survey question. Everything here is built on
// native inputs (radio, checkbox, range, textarea) so keyboard navigation and
// screen readers work without extra wiring, then styled into large tap
// targets. Selection is shown with a thick border AND a check icon, never
// colour alone.

type SurveyQuestionInputProps = {
    question: SurveyQuestion;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
};

const optionCardClass = (selected: boolean) =>
    cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left text-lg leading-snug transition-colors",
        "min-h-[56px]",
        "peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring",
        selected
            ? "border-foreground bg-primary/15 font-semibold"
            : "border-border bg-card hover:bg-accent",
    );

function SelectionMark({ selected }: { selected: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background",
            )}
        >
            {selected && <Check className="h-5 w-5" strokeWidth={3} />}
        </span>
    );
}

function OtherTextBox({
    id,
    value,
    onChange,
}: {
    id: string;
    value: string;
    onChange: (text: string) => void;
}) {
    return (
        <div className="mt-2 pl-2">
            <label
                htmlFor={id}
                className="mb-1 block text-base text-muted-foreground"
            >
                Please tell us:
            </label>
            <input
                id={id}
                type="text"
                value={value}
                maxLength={300}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border-2 border-border bg-card p-4 text-lg outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
        </div>
    );
}

function SingleChoice({
    question,
    value,
    onChange,
}: {
    question: Extract<SurveyQuestion, { kind: "single" }>;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
}) {
    const current = value?.kind === "single" ? value : undefined;

    return (
        <div
            role="radiogroup"
            aria-label={question.prompt}
            className="space-y-3"
        >
            {question.options.map((option) => {
                const selected = current?.value === option.value;
                const inputId = `${question.id}-${option.value}`;
                return (
                    <div key={option.value}>
                        <input
                            type="radio"
                            id={inputId}
                            name={question.id}
                            className="peer sr-only"
                            checked={selected}
                            onChange={() =>
                                onChange({
                                    kind: "single",
                                    value: option.value,
                                })
                            }
                        />
                        <label
                            htmlFor={inputId}
                            className={optionCardClass(selected)}
                        >
                            <SelectionMark selected={selected} />
                            <span>{option.label}</span>
                        </label>
                        {option.isOther && selected && (
                            <OtherTextBox
                                id={`${inputId}-text`}
                                value={current?.otherText ?? ""}
                                onChange={(text) =>
                                    onChange({
                                        kind: "single",
                                        value: option.value,
                                        otherText: text,
                                    })
                                }
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function ScaleChoice({
    question,
    value,
    onChange,
}: {
    question: Extract<SurveyQuestion, { kind: "scale" }>;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
}) {
    const current = value?.kind === "scale" ? value.value : undefined;

    // Deliberately neutral: no colours suggesting one end is "good". Some
    // scales here have their best answer in the middle.
    return (
        <div
            role="radiogroup"
            aria-label={question.prompt}
            className="space-y-3"
        >
            {question.labels.map((label, index) => {
                const pointValue = index + 1;
                const selected = current === pointValue;
                const inputId = `${question.id}-${pointValue}`;
                return (
                    <div key={pointValue}>
                        <input
                            type="radio"
                            id={inputId}
                            name={question.id}
                            className="peer sr-only"
                            checked={selected}
                            onChange={() =>
                                onChange({ kind: "scale", value: pointValue })
                            }
                        />
                        <label
                            htmlFor={inputId}
                            className={optionCardClass(selected)}
                        >
                            <SelectionMark selected={selected} />
                            <span>{label}</span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

function MultiChoice({
    question,
    value,
    onChange,
}: {
    question: Extract<SurveyQuestion, { kind: "multi" }>;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
}) {
    const current = value?.kind === "multi" ? value : undefined;
    const values = current?.values ?? [];
    const [limitMessage, setLimitMessage] = useState<string | null>(null);

    const toggle = (option: SurveyOption) => {
        setLimitMessage(null);
        let next: string[];
        if (values.includes(option.value)) {
            next = values.filter((item) => item !== option.value);
        } else if (option.exclusive) {
            // "Nothing" wipes the rest — they contradict each other.
            next = [option.value];
        } else {
            // Any real answer un-ticks "Nothing".
            const withoutExclusive = values.filter(
                (item) =>
                    !question.options.find(
                        (candidate) =>
                            candidate.value === item && candidate.exclusive,
                    ),
            );
            if (
                question.maxSelections &&
                withoutExclusive.length >= question.maxSelections
            ) {
                setLimitMessage(
                    `You can pick up to ${question.maxSelections}. To add this one, first un-tick another.`,
                );
                return;
            }
            next = [...withoutExclusive, option.value];
        }
        if (next.length === 0) {
            onChange(null);
            return;
        }
        const hasOther = question.options.some(
            (option) => option.isOther && next.includes(option.value),
        );
        onChange({
            kind: "multi",
            values: next,
            ...(hasOther ? { otherText: current?.otherText ?? "" } : {}),
        });
    };

    return (
        <div className="space-y-3">
            {question.options.map((option) => {
                const selected = values.includes(option.value);
                const inputId = `${question.id}-${option.value}`;
                return (
                    <div key={option.value}>
                        <input
                            type="checkbox"
                            id={inputId}
                            className="peer sr-only"
                            checked={selected}
                            onChange={() => toggle(option)}
                        />
                        <label
                            htmlFor={inputId}
                            className={optionCardClass(selected)}
                        >
                            <SelectionMark selected={selected} />
                            <span>{option.label}</span>
                        </label>
                        {option.isOther && selected && (
                            <OtherTextBox
                                id={`${inputId}-text`}
                                value={current?.otherText ?? ""}
                                onChange={(text) =>
                                    onChange({
                                        kind: "multi",
                                        values,
                                        otherText: text,
                                    })
                                }
                            />
                        )}
                    </div>
                );
            })}
            <p
                aria-live="polite"
                className="min-h-[1.5rem] text-base font-medium"
            >
                {limitMessage}
            </p>
        </div>
    );
}

function SplitControl({
    question,
    value,
    onChange,
}: {
    question: Extract<SurveyQuestion, { kind: "split" }>;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
}) {
    // Starts balanced; nothing is saved until the person moves it.
    const left = value?.kind === "split" ? value.left : question.total / 2;
    const right = question.total - left;

    const setLeft = (next: number) => {
        const clamped = Math.min(question.total, Math.max(0, next));
        onChange({
            kind: "split",
            left: clamped,
            right: question.total - clamped,
        });
    };

    // The two live minute figures are the point; the slider is secondary.
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border-2 border-border bg-card p-4 text-center">
                    <div className="text-lg leading-snug">
                        {question.leftLabel}
                    </div>
                    <div
                        className="text-4xl font-bold tabular-nums"
                        aria-hidden="true"
                    >
                        {left}
                    </div>
                    <div className="text-base text-muted-foreground">
                        {question.unit}
                    </div>
                </div>
                <div className="rounded-xl border-2 border-border bg-card p-4 text-center">
                    <div className="text-lg leading-snug">
                        {question.rightLabel}
                    </div>
                    <div
                        className="text-4xl font-bold tabular-nums"
                        aria-hidden="true"
                    >
                        {right}
                    </div>
                    <div className="text-base text-muted-foreground">
                        {question.unit}
                    </div>
                </div>
            </div>

            <input
                type="range"
                min={0}
                max={question.total}
                step={question.step}
                value={left}
                onChange={(event) => setLeft(Number(event.target.value))}
                aria-label={`${question.leftLabel} ${question.unit}`}
                aria-valuetext={`${question.leftLabel}: ${left} ${question.unit}. ${question.rightLabel}: ${right} ${question.unit}.`}
                className="h-3 w-full cursor-pointer accent-foreground"
            />

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setLeft(left + question.step)}
                    disabled={left >= question.total}
                    className="min-h-[56px] rounded-xl border-2 border-border bg-card p-3 text-center text-lg font-medium leading-snug hover:bg-accent disabled:opacity-40"
                >
                    + More {question.leftLabel.toLowerCase()}
                </button>
                <button
                    type="button"
                    onClick={() => setLeft(left - question.step)}
                    disabled={left <= 0}
                    className="min-h-[56px] rounded-xl border-2 border-border bg-card p-3 text-center text-lg font-medium leading-snug hover:bg-accent disabled:opacity-40"
                >
                    + More {question.rightLabel.toLowerCase()}
                </button>
            </div>
        </div>
    );
}

function TextAnswer({
    question,
    value,
    onChange,
}: {
    question: Extract<SurveyQuestion, { kind: "text" }>;
    value: SurveyAnswer | undefined;
    onChange: (answer: SurveyAnswer | null) => void;
}) {
    const text = value?.kind === "text" ? value.text : "";
    return (
        <div>
            <textarea
                id={`${question.id}-text`}
                aria-label={question.prompt}
                value={text}
                rows={5}
                maxLength={question.maxLength ?? 2000}
                onChange={(event) => {
                    const next = event.target.value;
                    onChange(next.trim() ? { kind: "text", text: next } : null);
                }}
                className="w-full rounded-xl border-2 border-border bg-card p-4 text-lg leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            {question.hint && (
                <p className="mt-2 text-base text-muted-foreground">
                    {question.hint}
                </p>
            )}
        </div>
    );
}

export default function SurveyQuestionInput({
    question,
    value,
    onChange,
}: SurveyQuestionInputProps) {
    switch (question.kind) {
        case "single":
            return (
                <SingleChoice
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case "scale":
            return (
                <ScaleChoice
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case "multi":
            return (
                <MultiChoice
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case "split":
            return (
                <SplitControl
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
        case "text":
            return (
                <TextAnswer
                    question={question}
                    value={value}
                    onChange={onChange}
                />
            );
    }
}
