/**
 * The pages drawn in LessonShell, matched against the path without its locale:
 * a lesson, its chat and its talk, and the Ethics game.
 *
 * Where the screen is `cramped` (a phone, either way up: see globals.css) these
 * fill it, so the site header and the floating chat are put away for them.
 */
export const LESSON_SCREEN = /^\/(lessons\/[^/]+(\/(chat|speak))?|ethics)\/?$/;
