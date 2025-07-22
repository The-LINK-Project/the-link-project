import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface ActionButtonProps {
    label: string;
    icon: React.ReactNode;
    tooltip?: string; // make tooltip optional
    href?: string;
    type?: "button" | "submit" | "reset";
    variant?: "default" | "outline" | "secondary";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ActionButton({
    label,
    icon,
    tooltip,
    href,
    type = "button",
    variant = "default",
    className,
    onClick,
}: ActionButtonProps) {
    const baseClasses =
        "w-full flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-shadow duration-300";

    const content = href ? (
        <Link href={href} legacyBehavior>
            <a
                className={cn(buttonVariants({ variant }), baseClasses, className)}
                aria-label={label}
            >
                {icon}
                {label}
            </a>
        </Link>
    ) : (
        <Button
            type={type}
            variant={variant}
            className={cn(baseClasses, className)}
            onClick={onClick}
            aria-label={label}
        >
            {icon}
            {label}
        </Button>
    );

    // Render tooltip only if tooltip text exists
    if (!tooltip) {
        return content;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent
                    side="top"
                    align="center"
                    className="max-w-xs text-center"
                >
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
