import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The LINK Project | AI English Lessons for Migrant Workers",
  description:
    "English learning resources for migrant workers in Singapore through a personalized AI voice assistant",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

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
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${openSans.variable} antialiased container mx-auto max-w-7xl`}
                    suppressHydrationWarning={true}
                >
                    <NextIntlClientProvider>
                        <Header></Header>
                        <Chatbot></Chatbot>
                        {children}
                        <Analytics />
                    </NextIntlClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
