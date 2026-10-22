import { requireSignedIn } from "@/lib/auth";

interface SurveyLayoutProps {
    children: React.ReactNode;
}

// The (root) group mixes public marketing pages (/, /about, /contact) with the
// learner app, so the guard sits on each private subtree rather than on the
// group. This one covers every survey page. Middleware still gates these
// routes first; this is the backstop.
export default async function SurveyLayout({ children }: SurveyLayoutProps) {
    await requireSignedIn();

    // Marked so the floating LINK Assistant stays out of the way: on a phone it
    // sits on the survey's own buttons (see globals.css).
    return (
        <div data-survey className="contents">
            {children}
        </div>
    );
}
