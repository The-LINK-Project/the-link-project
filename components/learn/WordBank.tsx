"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Tile } from "./Tile";

/**
 * Word bank plus answer row. Shared by every exercise where the learner builds
 * a sentence out of tiles, which is how all production is done in a lesson:
 * there is no keyboard anywhere, because a keyboard is the single biggest
 * friction point for a learner with low digital literacy.
 *
 * Tiles are tracked by index rather than by text, so a sentence can repeat a
 * word ("tap in and tap out") without the two tiles being confused.
 */
type Props = {
    /** Every tile offered, including decoys. Pass already-shuffled. */
    tokens: string[];
    /** Indices into `tokens`, in the order the learner placed them. */
    placed: number[];
    onChange: (placed: number[]) => void;
    disabled?: boolean;
    /** Set after grading so the answer row can show the outcome. */
    outcome?: "correct" | "incorrect";
    /** Shown in the answer row while it is empty. */
    placeholder?: string;
};

export function WordBank({ tokens, placed, onChange, disabled, outcome, placeholder }: Props) {
    const t = useTranslations("lessons");
    const used = new Set(placed);

    return (
        <div className="flex flex-col gap-6">
            <div
                className={cn(
                    "flex min-h-24 flex-wrap content-start items-start gap-2 rounded-xl border-2 border-dashed p-3",
                    outcome === "correct"
                        ? "border-lesson-success bg-lesson-success-soft"
                        : outcome === "incorrect"
                          ? "border-lesson-destructive bg-lesson-destructive-soft"
                          : "border-lesson-border bg-white",
                )}
            >
                {placed.length === 0 ? (
                    <p className="p-2 text-sm leading-5 text-lesson-muted">{placeholder}</p>
                ) : (
                    placed.map((tokenIndex, slot) => (
                        <Tile
                            key={`${tokenIndex}-${slot}`}
                            label={tokens[tokenIndex]}
                            state={outcome ?? "default"}
                            disabled={disabled}
                            hint={t("tileRemove")}
                            // Removing from the middle keeps the rest of the sentence intact.
                            onPress={() => onChange(placed.filter((_, index) => index !== slot))}
                        />
                    ))
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {tokens.map((token, tokenIndex) => (
                    <Tile
                        key={`${token}-${tokenIndex}`}
                        label={token}
                        // A placed tile keeps its slot in the grid and is only
                        // dimmed, so the bank never reflows mid-exercise.
                        state={used.has(tokenIndex) ? "used" : "default"}
                        disabled={disabled}
                        hint={t("tileAdd")}
                        onPress={() => onChange([...placed, tokenIndex])}
                    />
                ))}
            </div>
        </div>
    );
}
