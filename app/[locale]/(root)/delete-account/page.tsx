import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
    title: "Delete your account | The LINK Project app",
    description:
        "How to delete your The LINK Project app account, with or without the app.",
};

const DELETION_EMAIL = "thelinkproject.org@gmail.com";
const DELETION_MAILTO = `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent(
    "Delete my account"
)}`;

function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="mb-2 mt-10 border-t border-[#ddd] pt-4 text-[1.25rem] font-bold">
            {children}
        </h2>
    );
}

// Kept in English on every locale until translations get native-speaker review.
export default function DeleteAccountPage() {
    return (
        <main className="mx-auto max-w-[720px] px-4 pb-16 pt-8 text-[17px] leading-[1.65] text-[#1c1c1c] [&_a]:break-words [&_a]:text-[#1a5fb4] [&_a]:underline [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            <h1 className="mb-2 text-[1.9rem] font-bold leading-[1.25]">
                Delete your The LINK Project app account
            </h1>
            <p>
                This page explains how to delete your account in The LINK Project
                app. It is only about the app. Accounts on The LINK Project website
                are separate and are not changed.
            </p>

            <H2>In the app</H2>
            <ol>
                <li>
                    Go to <strong>Account</strong>.
                </li>
                <li>
                    Tap <strong>Delete account</strong>.
                </li>
                <li>
                    Type <strong>DELETE</strong>.
                </li>
                <li>
                    Tap <strong>Delete</strong>.
                </li>
            </ol>
            <p>This deletes everything straight away.</p>

            <H2>Without the app</H2>
            <p>
                Email <a href={DELETION_MAILTO}>{DELETION_EMAIL}</a> from the email
                address you signed up with. Write &quot;Delete my account&quot; in the
                subject.
            </p>
            <p>
                We will delete your account within 30 days and email you when it is
                done.
            </p>

            <H2>What is deleted</H2>
            <ul>
                <li>your sign-in account</li>
                <li>your name, email address and username</li>
                <li>your profile photo link</li>
                <li>your first language</li>
                <li>your lesson progress</li>
            </ul>

            <H2>What is kept</H2>
            <p>
                We keep only your account ID number and the date you deleted your
                account. We keep this so your old information cannot come back by
                mistake. It does not include your name, email or anything else about
                you.
            </p>
            <p>
                Google keeps speaking-practice recordings for up to 55 days, only to
                detect misuse of its service. Your name and email are not attached
                to them.
            </p>

            <p className="mt-10 border-t border-[#ddd] pt-4">
                To learn more, read our{" "}
                <Link href="/privacy">privacy policy</Link>.
            </p>
        </main>
    );
}
