import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Shared layout for every /admin page: white header band with an optional
// back link, then a constrained content area. Keeping it in one place is
// what keeps the admin section consistent.

// One accent per content domain, used for icon tiles, buttons and meters.
// Tailwind needs literal class strings, hence the lookup table.
export const ADMIN_ACCENTS = {
    brand: {
        tile: "bg-gradient-to-br from-[rgb(90,199,219)] to-[rgb(70,179,199)]",
        softTile: "bg-[rgb(90,199,219)]/10 text-[rgb(70,179,199)]",
        button: "bg-[rgb(90,199,219)] hover:bg-[rgb(70,179,199)]",
        hoverBorder: "hover:border-[rgb(90,199,219)]/50",
        bar: "bg-[rgb(90,199,219)]",
        track: "bg-[rgb(90,199,219)]/20",
        wash: "bg-[rgb(90,199,219)]/[0.08] hover:bg-[rgb(90,199,219)]/[0.14]",
        text: "text-[rgb(70,179,199)]",
    },
    blue: {
        tile: "bg-gradient-to-br from-blue-500 to-blue-600",
        softTile: "bg-blue-50 text-blue-600",
        button: "bg-blue-500 hover:bg-blue-600",
        hoverBorder: "hover:border-blue-300",
        bar: "bg-blue-500",
        track: "bg-blue-100",
        wash: "bg-blue-50/80 hover:bg-blue-100/70",
        text: "text-blue-600",
    },
    violet: {
        tile: "bg-gradient-to-br from-violet-500 to-violet-600",
        softTile: "bg-violet-50 text-violet-600",
        button: "bg-violet-500 hover:bg-violet-600",
        hoverBorder: "hover:border-violet-300",
        bar: "bg-violet-500",
        track: "bg-violet-100",
        wash: "bg-violet-50/80 hover:bg-violet-100/70",
        text: "text-violet-600",
    },
    emerald: {
        tile: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        softTile: "bg-emerald-50 text-emerald-600",
        button: "bg-emerald-500 hover:bg-emerald-600",
        hoverBorder: "hover:border-emerald-300",
        bar: "bg-emerald-500",
        track: "bg-emerald-100",
        wash: "bg-emerald-50/80 hover:bg-emerald-100/70",
        text: "text-emerald-600",
    },
    amber: {
        tile: "bg-gradient-to-br from-amber-500 to-orange-500",
        softTile: "bg-amber-50 text-amber-600",
        button: "bg-amber-500 hover:bg-amber-600",
        hoverBorder: "hover:border-amber-300",
        bar: "bg-amber-500",
        track: "bg-amber-100",
        wash: "bg-amber-50/80 hover:bg-amber-100/70",
        text: "text-amber-600",
    },
    rose: {
        tile: "bg-gradient-to-br from-rose-500 to-pink-500",
        softTile: "bg-rose-50 text-rose-600",
        button: "bg-rose-500 hover:bg-rose-600",
        hoverBorder: "hover:border-rose-300",
        bar: "bg-rose-500",
        track: "bg-rose-100",
        wash: "bg-rose-50/80 hover:bg-rose-100/70",
        text: "text-rose-600",
    },
} as const;

export type AdminAccent = keyof typeof ADMIN_ACCENTS;

export const AdminPageShell = ({
    title,
    description,
    backHref,
    backLabel,
    actions,
    width = "wide",
    children,
}: {
    title: string;
    description?: React.ReactNode;
    backHref?: string;
    backLabel?: string;
    actions?: React.ReactNode;
    width?: "wide" | "narrow";
    children: React.ReactNode;
}) => (
    <div className="min-h-screen bg-white">
        <div className="border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-5">
                {backHref && (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {backLabel ?? "Back"}
                    </Link>
                )}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
                                {description}
                            </p>
                        )}
                    </div>
                    {actions && (
                        <div className="flex items-center gap-3">{actions}</div>
                    )}
                </div>
            </div>
        </div>
        <div
            className={`${
                width === "narrow" ? "max-w-4xl" : "max-w-7xl"
            } mx-auto px-6 py-8`}
        >
            {children}
        </div>
    </div>
);

export const AdminManagementCard = ({
    href,
    title,
    description,
    stat,
    cta,
    icon: Icon,
    accent = "brand",
}: {
    href: string;
    title: string;
    description: string;
    stat: string;
    cta: string;
    icon: React.ElementType;
    accent?: AdminAccent;
}) => {
    const colors = ADMIN_ACCENTS[accent];
    return (
        <Card
            className={`group bg-white border-slate-200 ${colors.hoverBorder} hover:shadow-md transition-all duration-200 flex flex-col`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-lg ${colors.tile} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-base font-semibold text-slate-900">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500">
                            {description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0 mt-auto">
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">{stat}</span>
                    <Link href={href}>
                        <Button
                            size="sm"
                            className={`${colors.button} text-white`}
                        >
                            {cta}
                            <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
