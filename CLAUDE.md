# The LINK Project

Next.js app (App Router, `app/[locale]/`) with lessons, quizzes, games, surveys, and an admin area. i18n via `next-intl` (`messages/`, `i18n/`); auth via Clerk.

## Progress + notifications
When running inside cmux (`CMUX_WORKSPACE_ID` set, `cmux` on PATH), any long-running task (multi-step builds, migrations, batch edits, test suites) should drive the workspace sidebar progress bar with `cmux set-progress <0.0-1.0> --label "<phase>"`, call `cmux clear-progress` when done, and send a `cmux notify --title ... --body ...` on completion or failure. Outside cmux, skip silently.
