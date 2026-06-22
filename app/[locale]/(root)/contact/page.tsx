"use client";
// Later turn this into component to send the use client down
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const t = useTranslations("contactUs");
    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
            )
            .then(
                () => {
                    alert("Message sent! 🎉");
                    form.current?.reset();
                },
                (error) => {
                    alert("Failed to send. 😞");
                    console.error(error);
                },
            );
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-5 pt-20 font-body text-ink md:flex-row">
            <div className="max-w-full md:w-1/2">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                    {t("headerCall")}
                </p>
                <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    {t("headerTitle")}
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-ink-soft">
                    {t("headerDescription")}
                </p>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <input
                        type="text"
                        name="user_name"
                        placeholder={t("placeholderName")}
                        required
                        className="w-full rounded-lg border border-hairline bg-surface p-3 outline-none transition-colors focus:border-primary"
                    />
                    <input
                        type="email"
                        name="user_email"
                        placeholder={t("placeholderEmail")}
                        required
                        className="w-full rounded-lg border border-hairline bg-surface p-3 outline-none transition-colors focus:border-primary"
                    />
                    <textarea
                        name="message"
                        placeholder={t("placeholderMessage")}
                        required
                        rows={6}
                        className="w-full rounded-lg border border-hairline bg-surface p-3 outline-none transition-colors focus:border-primary"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-ink px-7 py-3 font-semibold text-white transition-transform duration-500 hover:scale-105 hover:bg-ink-deep"
                    >
                        {t("submitButton")}
                    </button>
                </form>
            </div>
        </div>
    );
}
