// This one should be kept as use client
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-[5rem] sm:text-[8rem] font-extrabold mb-4 text-red-400">
          Error
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
          Something went wrong on our side
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          We're experiencing technical difficulties. Please try again later or
          go back to the homepage.
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 bg-red-400 hover:bg-red-500 text-white"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
