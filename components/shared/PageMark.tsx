"use client";

import { useLayoutEffect } from "react";

const marked = new Map<string, number>();

/**
 * Marks the page itself (`<html data-lesson>`, `<html data-survey>`) while this
 * is on screen, for the rules in globals.css that put the site header and the
 * floating chat away. Those rules find a lesson or survey with `:has()` from the
 * first paint; this is for browsers too old for `:has()` (Chrome before 105,
 * Samsung Internet before 20), where the header would push a lesson's buttons
 * off the bottom of a phone. Counted, so a screen replacing another of the same
 * kind does not take the mark away from it.
 */
export function PageMark({ name }: { name: "lesson" | "survey" }) {
    useLayoutEffect(() => {
        const root = document.documentElement;
        marked.set(name, (marked.get(name) ?? 0) + 1);
        root.setAttribute(`data-${name}`, "");
        return () => {
            const left = (marked.get(name) ?? 1) - 1;
            marked.set(name, left);
            if (left === 0) root.removeAttribute(`data-${name}`);
        };
    }, [name]);
    return null;
}
