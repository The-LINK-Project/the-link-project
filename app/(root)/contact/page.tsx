"use client";
// Later turn this into component to send the use client down
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          alert("Message sent! 🎉");
          form.current?.reset();
        },
        (error) => {
          alert("Failed to send. 😞");
          console.error(error);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-20 justify-center px-5">
      <div className="md:w-1/2 max-w-full">
        <p className="text-main-blue font-semibold uppercase mb-2">
          Let's Talk
        </p>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          We value your feedback and inquiries. Feel free to reach out to us
          using the form below, and we’ll get back to you as soon as possible.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Name"
            required
            className="w-full border p-3 rounded"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={6}
            className="w-full border p-3 rounded"
          />
          <button
            type="submit"
            className="bg-main-blue hover:bg-main-blue-hover hover:cursor-grab  transition-transform duration-500 transform hover:scale-105 text-white px-6 py-2 rounded hover:opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
