"use client";

import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The lesson screens' own small kit, drawn to match the mobile app's
 * components one for one, so a lesson looks and reads the same on either.
 */

/** Type styles, named after the mobile app's text variants. */
export const text = {
    display: "text-[34px] font-extrabold leading-10 text-lesson-ink",
    title: "text-[28px] font-extrabold leading-[34px] text-lesson-ink",
    heading: "text-[22px] font-extrabold leading-7 text-lesson-ink",
    subheading: "text-lg font-bold leading-6 text-lesson-ink",
    body: "text-base leading-6 text-lesson-fg",
    bodyStrong: "text-base font-semibold leading-6 text-lesson-fg",
    caption: "text-sm leading-5 text-lesson-muted",
    label: "text-xs font-bold uppercase tracking-[1px] text-lesson-muted",
} as const;

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

/**
 * Keys, like the lesson cards on the dashboard: a darker lower edge that the
 * key sinks into when pressed. `--lip` is that edge's colour.
 */
const BUTTON_VARIANT: Record<ButtonVariant, string> = {
    primary:
        "bg-lesson-primary text-lesson-on-primary border-transparent [--lip:var(--color-lesson-primary-lip)] disabled:bg-lesson-key disabled:text-lesson-key-text disabled:[--lip:var(--color-lesson-key-lip)] disabled:opacity-100",
    secondary: "bg-lesson-muted-surface text-lesson-ink border-transparent [--lip:var(--color-lesson-key-lip)]",
    outline: "border-2 bg-white text-lesson-link border-lesson-key [--lip:var(--color-lesson-key)]",
    ghost: "bg-transparent text-lesson-muted border-transparent shadow-none!",
    destructive: "bg-lesson-destructive text-white border-transparent [--lip:#98200c]",
};

const BUTTON_SIZE: Record<ButtonSize, string> = {
    sm: "min-h-10 px-3 text-[13px]",
    md: "min-h-12 px-4 text-[15px]",
    lg: "min-h-14 px-6 text-[15px]",
};

export function LessonButton({
    title,
    variant = "primary",
    size = "md",
    icon,
    loading,
    className,
    disabled,
    ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> & {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    loading?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled || loading}
            className={cn(
                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border font-extrabold uppercase tracking-wide shadow-[0_4px_0_var(--lip)] transition-[transform,box-shadow] duration-75",
                "enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
                BUTTON_VARIANT[variant],
                BUTTON_SIZE[size],
                className,
            )}
            {...rest}
        >
            {loading ? <Loader2 className="size-5 animate-spin" /> : icon}
            <span className="py-1 text-center">{title}</span>
        </button>
    );
}

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "primary" | "accent";

const BADGE_TONE: Record<BadgeTone, string> = {
    neutral: "bg-lesson-muted-surface text-lesson-fg",
    success: "bg-lesson-success-soft text-lesson-success",
    warning: "bg-lesson-warning-soft text-lesson-warning",
    danger: "bg-lesson-destructive-soft text-lesson-destructive",
    primary: "bg-lesson-primary-soft text-lesson-on-primary",
    accent: "bg-lesson-accent-soft text-lesson-accent-dark",
};

export function LessonBadge({
    label,
    tone = "neutral",
    icon,
}: {
    label: string;
    tone?: BadgeTone;
    icon?: ReactNode;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold leading-5",
                BADGE_TONE[tone],
            )}
        >
            {icon}
            {label}
        </span>
    );
}

export function LessonCardBox({
    tone = "default",
    className,
    children,
}: {
    tone?: "default" | "muted";
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border-2 border-lesson-key p-4 shadow-[0_4px_0_var(--color-lesson-key)]",
                tone === "muted" ? "bg-lesson-muted-surface" : "bg-white",
                className,
            )}
        >
            {children}
        </div>
    );
}
