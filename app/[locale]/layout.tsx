import type { Metadata } from "next";
import { Open_Sans, Schibsted_Grotesk, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import { Analytics } from "@vercel/analytics/react";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import ChatbotLauncher from "@/components/chatbot/ChatbotLauncher";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});

// Landing page typography: Schibsted Grotesk for display headings and
// Nunito Sans for body copy, exposed as CSS variables and consumed via the
// `font-heading` / `font-body` Tailwind utilities (see globals.css @theme).
const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted",
    subsets: ["latin"],
    weight: ["600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://thelinkproject.org"),
    title: "The LINK Project | AI English Lessons for Migrant Workers",
    description:
        "English learning resources for migrant workers in Singapore through a personalized AI voice assistant",
    keywords: [
        "learn English",
        "AI tutor",
        "practical English",
        "migrant workers",
        "Singapore",
        "ESL",
        "conversational English",
        "real-world English lessons",
    ],
    authors: [{ name: "The LINK Project" }],
    openGraph: {
        title: "The LINK Project | AI English Lessons for Migrant Workers",
        description:
            "English learning resources for migrant workers in Singapore through a personalized AI voice assistant",
        url: "https://thelinkproject.org",
        siteName: "The LINK Project",
        images: [
            {
                url: "/assets/link_green.png",
                width: 600,
                height: 600,
                alt: "The LINK Project Logo",
            },
        ],
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Only these namespaces are consumed by "use client" components (via
// useTranslations), so only they are serialized into every page's payload.
// Server components get the full catalog through getTranslations/useTranslations
// on the server and are unaffected. If a client component starts using a new
// namespace, add it here — otherwise it will throw MISSING_MESSAGE at runtime.
const CLIENT_MESSAGE_NAMESPACES = [
    "lesson",
    "lessoninput",
    "lessonmodal",
    "lessonnotstarted",
    "objectives",
    "contactUs",
    "quizComplete",
    "quizProgressBar",
];

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();
    const clientMessages = Object.fromEntries(
        CLIENT_MESSAGE_NAMESPACES.filter((namespace) => namespace in messages).map(
            (namespace) => [namespace, messages[namespace]],
        ),
    );

    return (
        <ClerkProvider>
            <html lang={locale}>
                {/* The container classes live on a wrapper div, NOT on body:
                    dialog scroll-locking injects margin/padding styles onto
                    body, which fights mx-auto and squishes the whole page */}
                <body
                    className={`${openSans.variable} ${schibstedGrotesk.variable} ${nunitoSans.variable} antialiased`}
                    suppressHydrationWarning={true}
                >
                    <div className="container mx-auto max-w-7xl">
                        <NextIntlClientProvider messages={clientMessages}>
                            <Header></Header>
                            <ChatbotLauncher></ChatbotLauncher>
                            {children}
                            <Analytics />
                        </NextIntlClientProvider>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
