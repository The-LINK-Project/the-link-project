"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { useProgressReady } from "@/lib/progress/store";
import { useProgressSync } from "@/lib/progress/sync";

/**
 * Loads the signed-in learner's progress before anything that reads it is
 * drawn, and keeps it synced with the server. A lesson must not build its run
 * before knowing whether there was one to continue.
 */
export function ProgressGate({ children }: { children: ReactNode }) {
    const { userId } = useAuth();
    const ready = useProgressReady(userId);
    useProgressSync(ready);

    if (!ready) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center">
                <Loader2 className="size-8 animate-spin text-lesson-muted" />
            </div>
        );
    }
    return <>{children}</>;
}
