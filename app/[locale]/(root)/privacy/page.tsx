import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Privacy Policy | The LINK Project app",
    description:
        "How The LINK Project app collects, uses, shares and deletes your information.",
};

// Placeholder that still needs a real value before the policy goes live.
function Todo({ children }: { children: ReactNode }) {
    return (
        <mark className="rounded-[3px] bg-[#fff3b0] px-[3px] text-inherit">
            {children}
        </mark>
    );
}

function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="mb-2 mt-10 border-t border-[#ddd] pt-4 text-[1.25rem] font-bold">
            {children}
        </h2>
    );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
    const cell = "border-b border-[#ddd] px-2.5 py-2 text-left align-top";
    return (
        <div className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-[0.95rem]">
                <thead>
                    <tr>
                        {head.map((h) => (
                            <th key={h} className={`${cell} font-semibold`}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((c, j) => (
                                <td key={j} className={cell}>
                                    {c}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-[720px] px-4 pb-16 pt-8 text-[17px] leading-[1.65] text-[#1c1c1c] [&_a]:text-[#1a5fb4] [&_a]:underline [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            <h1 className="mb-2 text-[1.9rem] font-bold leading-[1.25]">
                Privacy Policy: The LINK Project app
            </h1>
            <p>
                <strong>Effective date:</strong> <Todo>[[EFFECTIVE DATE]]</Todo>
            </p>
            <p>
                This privacy policy explains what information The LINK Project app
                collects, why we collect it, who we share it with, how long we keep
                it, and how you can delete it.
            </p>
            <p>
                We have tried to write it in simple English. If anything is unclear,
                please email us at <Todo>[[PRIVACY EMAIL]]</Todo>.
            </p>

            <H2>1. Who we are</H2>
            <p>
                The LINK Project is{" "}
                <Todo>
                    [[ORGANISATION DESCRIPTION, for example: a student-led initiative
                    in Singapore that helps migrant workers learn English]]
                </Todo>
                . We make The LINK Project app (&quot;the app&quot;). The app is
                published on Google Play by{" "}
                <Todo>[[DEVELOPER NAME ON GOOGLE PLAY]]</Todo> on behalf of The LINK
                Project.
            </p>
            <p>
                In this policy, &quot;we&quot;, &quot;us&quot; and &quot;our&quot;
                mean The LINK Project. &quot;You&quot; means a person who uses the
                app.
            </p>
            <p>
                <strong>Data Protection Officer:</strong> <Todo>[[DPO NAME]]</Todo>{" "}
                <strong>Email:</strong> <Todo>[[PRIVACY EMAIL]]</Todo>
            </p>

            <H2>2. Who the app is for</H2>
            <p>
                The app is for adults aged 18 and over. Please do not use the app if
                you are under 18. If we learn that someone under 18 has made an
                account, we will delete it.
            </p>

            <H2>3. Your account</H2>
            <p>
                You need an account to use the app. Your LINK app account is only for
                this app. It is separate from any account on The LINK Project
                website.
            </p>
            <p>When you make an account, we collect:</p>
            <ul>
                <li>your email address</li>
                <li>your password</li>
                <li>
                    your username, first name and last name, if the sign-up screen
                    asks for them
                </li>
            </ul>
            <p>
                If you choose &quot;Continue with Google&quot;, Google shares your
                name, email address and profile photo with us.
            </p>
            <p>
                We use a company called <strong>Clerk</strong> to handle sign-in. Your
                password goes only to Clerk. Our own servers never see it. Clerk also
                records technical details when you sign in, such as your IP address
                and the type of phone and browser you use. This keeps your account
                safe.
            </p>
            <p>
                We keep a copy of your email address, username, name and profile
                photo link in our own database, so we can show them on your Account
                screen.
            </p>

            <H2>4. Your learning</H2>
            <p>We keep:</p>
            <ul>
                <li>
                    <strong>your first language</strong>, which you choose from a
                    list. We use it for explanations, the app&apos;s language, the
                    tutor&apos;s language and translations.
                </li>
                <li>
                    <strong>the lessons you have finished</strong>: which lesson, the
                    date, how many times you did it, your best score, and your
                    speaking score.
                </li>
            </ul>
            <p>
                We keep your finished lessons on our server so you do not lose your
                progress if you lose or change your phone.
            </p>
            <p>
                We <strong>do not</strong> keep your answers to exercises on our
                server. Only your final result is saved there.
            </p>

            <H2>5. Speaking practice and your voice</H2>
            <p>
                In speaking practice, you record your voice and talk with an AI tutor.
            </p>
            <p>When you record your voice:</p>
            <ol>
                <li>The recording goes from your phone to our server.</li>
                <li>
                    Our server sends it to <strong>Google&apos;s Gemini AI</strong>,
                    which writes down what you said and decides what the tutor says
                    next.
                </li>
                <li>
                    The tutor&apos;s reply is turned into speech by{" "}
                    <strong>Google Cloud Text-to-Speech</strong>. If that service is
                    busy, Google&apos;s Gemini AI makes the speech instead.
                </li>
            </ol>
            <p>
                We send the words of your conversation so far along with each
                recording, so the tutor knows what has already been said. We do not
                send your name, email address or account details to Google.
            </p>
            <p>
                <strong>We do not keep your recordings.</strong> Our server passes
                each recording to Google and does not save it. On your phone, the
                recording is deleted after the tutor answers, or when you leave
                speaking practice.
            </p>
            <p>
                <strong>What Google does with it:</strong> We use Google&apos;s paid
                service. Google says it does not use this data to improve its
                products. Google keeps it for up to 55 days, only to detect misuse of
                its service. Google Cloud Text-to-Speech does not keep the text it
                turns into speech.
            </p>
            <p>
                If you stop in the middle of a conversation, the words of the
                conversation (not the recordings) stay on your phone for up to 24
                hours so you can continue. After that, they are deleted.
            </p>
            <p>
                The app asks for permission to use your microphone. You can say no,
                but then speaking practice will not work. You can change this at any
                time in your phone&apos;s settings.
            </p>

            <H2>6. Translating words</H2>
            <p>
                When you hold your finger on an English word, the app sends the word
                and the sentence it is in to our server. Our server sends them to{" "}
                <strong>Google&apos;s Gemini AI</strong> to find the meaning in your
                first language.
            </p>
            <p>
                We save the word and its meaning for up to 90 days so the next person
                who holds the same word gets the answer faster. We do not save the
                sentence, and we do not save who asked. This saved information cannot
                be linked to you.
            </p>

            <H2>7. Information kept only on your phone</H2>
            <p>
                The app keeps some information on your phone so it works without an
                internet connection:
            </p>
            <ul>
                <li>your finished lessons and your first language</li>
                <li>
                    your place in a lesson you have not finished, and which exercises
                    you got right (for up to 14 days)
                </li>
                <li>
                    a speaking conversation you have not finished (for up to 24 hours)
                </li>
                <li>words you have already translated</li>
            </ul>
            <p>
                When you <strong>sign out</strong>, your lesson progress and first
                language stay on the phone so you can continue when you sign in
                again. When you <strong>delete your account</strong>, the app removes
                your progress and first language from the phone. Uninstalling the app
                removes everything the app kept on the phone.
            </p>

            <H2>8. Technical information</H2>
            <p>
                Our server runs on <strong>Vercel</strong>. Like every website and
                app, Vercel receives your phone&apos;s IP address when the app
                connects, so it can send the answer back.
            </p>
            <p>
                When something goes wrong, our server records an error message so we
                can fix it. These error messages do not include what you said or what
                you were reading.
            </p>
            <p>
                To stop one account from overloading the service, we count how many
                requests each account makes in one minute. These counts are deleted
                after about 2 minutes.
            </p>

            <H2>9. What we do not do</H2>
            <ul>
                <li>We do not show ads.</li>
                <li>We do not sell your information.</li>
                <li>We do not share your information for marketing.</li>
                <li>We do not use tracking or analytics tools.</li>
                <li>
                    We do not collect your location, contacts, photos or files.
                </li>
            </ul>

            <H2>10. Who we share information with</H2>
            <p>
                We only share information with the companies that help us run the
                app:
            </p>
            <Table
                head={["Company", "What it does for us", "What it receives"]}
                rows={[
                    [
                        "Clerk",
                        "Sign-in and accounts",
                        "Your email, password, name, and sign-in details",
                    ],
                    [
                        "Google (Gemini AI)",
                        "AI tutor and translations",
                        "Your voice recordings, conversation words, the tutor's replies, and words you translate",
                    ],
                    [
                        "Google Cloud Text-to-Speech",
                        "The tutor's voice",
                        "The tutor's replies only",
                    ],
                    [
                        "MongoDB",
                        "Our database",
                        "Your account details, first language and finished lessons",
                    ],
                    [
                        "Vercel",
                        "Runs our server",
                        "Everything the app sends to our server, while it is being processed",
                    ],
                ]}
            />
            <p>We may also share information if the law requires us to.</p>

            <H2>11. Where your information is stored</H2>
            <p>
                Our team is in Singapore. The companies above may store or process
                your information in other countries, including{" "}
                <Todo>
                    [[DATABASE AND SERVER REGIONS, for example: the United States]]
                </Todo>
                . Each of these companies has its own data protection terms. We choose
                companies whose terms protect personal information to a standard
                comparable to Singapore&apos;s Personal Data Protection Act.
            </p>

            <H2>12. How we protect your information</H2>
            <ul>
                <li>
                    All information between the app and our server is sent over an
                    encrypted connection (HTTPS).
                </li>
                <li>Your sign-in is stored in your phone&apos;s secure storage.</li>
                <li>
                    Our server checks that you are signed in before it gives or saves
                    any of your information.
                </li>
                <li>
                    Only our server and the team members who maintain it can reach
                    our database.
                </li>
                <li>Clerk looks after passwords. We never see or store them.</li>
            </ul>
            <p>
                No system is completely safe. If a data breach harms you, or affects
                many people, we will tell you and Singapore&apos;s Personal Data
                Protection Commission as the law requires.
            </p>

            <H2>13. How long we keep information</H2>
            <Table
                head={["Information", "How long"]}
                rows={[
                    [
                        "Your account details, first language and finished lessons",
                        "Until you delete your account",
                    ],
                    [
                        "Voice recordings",
                        "Not kept by us. Kept by Google for up to 55 days to detect misuse",
                    ],
                    [
                        "Conversation words",
                        "Not kept by us. On your phone for up to 24 hours",
                    ],
                    ["Saved translations", "Up to 90 days, not linked to you"],
                    ["Request counts", "About 2 minutes"],
                ]}
            />
            <p>
                When you delete your account, we keep only your account ID number and
                the date you deleted it. We keep this so your old information cannot
                come back by mistake. It does not include your name, email or
                anything else about you.
            </p>

            <H2>14. Deleting your account</H2>
            <p>
                <strong>In the app:</strong> go to <strong>Account</strong>, tap{" "}
                <strong>Delete account</strong>, type <strong>DELETE</strong>, and tap{" "}
                <strong>Delete</strong>.
            </p>
            <p>
                This deletes your account and your information from our database and
                from your phone straight away. If our server has a problem at that
                moment, it finishes the deletion automatically within a day.
            </p>
            <p>
                <strong>Without the app:</strong> go to{" "}
                <Todo>[[WEB DELETION URL]]</Todo> or email{" "}
                <Todo>[[PRIVACY EMAIL]]</Todo> from the email address you signed up
                with. Write &quot;Delete my account&quot; in the subject. We will
                delete your account within <Todo>[[NUMBER]]</Todo> days and email you
                when it is done.
            </p>

            <H2>15. Your rights</H2>
            <p>You can:</p>
            <ul>
                <li>
                    <strong>see your information:</strong> your account details are on
                    the Account screen. To get a copy of everything we hold about you,
                    email us.
                </li>
                <li>
                    <strong>correct your information:</strong> change your name and
                    username on the Edit profile screen, or email us.
                </li>
                <li>
                    <strong>withdraw your consent:</strong> you can stop using the app
                    and delete your account at any time. If you only want to stop
                    speaking practice, turn off microphone permission for the app.
                </li>
                <li>
                    <strong>ask a question or complain:</strong> email{" "}
                    <Todo>[[PRIVACY EMAIL]]</Todo>. We will reply within{" "}
                    <Todo>[[NUMBER]]</Todo> days.
                </li>
            </ul>
            <p>
                If you are not happy with our answer, you can contact Singapore&apos;s
                Personal Data Protection Commission at{" "}
                <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">
                    www.pdpc.gov.sg
                </a>
                .
            </p>

            <H2>16. Changes to this policy</H2>
            <p>
                If we change this policy, we will update the effective date at the
                top. If the change is important, we will also tell you in the app
                before it takes effect.
            </p>

            <H2>17. Contact us</H2>
            <p>
                <strong>The LINK Project</strong>
                <br />
                Data Protection Officer: <Todo>[[DPO NAME]]</Todo>
                <br />
                Email: <Todo>[[PRIVACY EMAIL]]</Todo>
            </p>
        </main>
    );
}
