"use client";
import { getIconLabel } from "@/constants/games/iconLabels";

export const isImageUrl = (item: string) => /^(https?:\/\/|\/)/.test(item);

/**
 * One captioned picture panel, shared by Picture Story and the Focus Group run.
 *
 * Captions come from constants/games/iconLabels.ts unless a question supplies
 * its own (ordering steps such as "register at the counter"). They are always
 * neutral about the grammar being tested, so they never give an answer away.
 */
export default function PicturePanel({
    item,
    size = "md",
    caption,
    wide = false,
}: {
    item: string;
    size?: "sm" | "md";
    caption?: string;
    wide?: boolean;
}) {
    const box =
        size === "sm"
            ? "h-14 w-14 sm:h-16 sm:w-16"
            : "h-20 w-20 sm:h-24 sm:w-24";
    const label = caption ?? getIconLabel(item);

    const picture = isImageUrl(item) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={item}
            alt={label || "Story picture"}
            className={`${box} object-contain`}
        />
    ) : (
        <span className={size === "sm" ? "text-3xl" : "text-5xl sm:text-6xl"}>
            {item}
        </span>
    );

    if (!label) return picture;

    return (
        <figure
            className={`flex flex-col items-center gap-1 ${
                wide ? "w-full" : "w-20 sm:w-24"
            }`}
        >
            {picture}
            <figcaption
                className={`text-center leading-tight text-muted-foreground ${
                    size === "sm"
                        ? "text-[10px] font-medium"
                        : "text-xs font-medium sm:text-sm"
                }`}
            >
                {label}
            </figcaption>
        </figure>
    );
}
