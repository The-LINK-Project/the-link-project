import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
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
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ✅ Stick to manual import
  const messages = (await import(`@/messages/${locale}.json`)).default;

  console.log("Locale from params:", locale);
  console.log("First message check:", messages?.herosection?.announcement);

  return (
    <html lang={locale}>
      <body className={openSans.variable}>
        {/* ✅ Ensure we explicitly pass messages so client doesn’t override */}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Singapore"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
