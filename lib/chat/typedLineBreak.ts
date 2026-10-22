/**
 * Whether a change to a chat box was the learner pressing Enter, when no Enter
 * key could be caught for it, and if so the message without that line break.
 *
 * Android keyboards (Gboard) often send no Enter key a page can stop, only the
 * line break itself, sometimes as part of the word being typed. That line break
 * is meant as "send". One that was pasted or dropped in, or asked for with
 * Shift+Enter, is part of the message and stays.
 *
 * Returns null for any ordinary edit.
 */
export function typedLineBreak(
    before: string,
    after: string,
    {
        inputType,
        newLineAsked,
        caret,
    }: {
        /** InputEvent.inputType, or "" where the browser gives none. */
        inputType: string;
        /** Shift+Enter was the last key down. */
        newLineAsked: boolean;
        /** Where the caret is after the change. */
        caret: number;
    },
): string | null {
    const breaks = (text: string) => text.split("\n").length;
    if (breaks(after) <= breaks(before) || newLineAsked || inputType.startsWith("insertFrom")) return null;
    // Normally the break sits just before the caret; otherwise take the last one.
    if (after[caret - 1] === "\n") return after.slice(0, caret - 1) + after.slice(caret);
    const last = after.lastIndexOf("\n");
    return after.slice(0, last) + after.slice(last + 1);
}
