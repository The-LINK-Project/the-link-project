"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #49BED4)'
      }}
    >
      <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md p-10 text-center">
        <h1
          className="text-7xl font-extrabold mb-4"
          style={{
            color: '#49BED4',
            textShadow: '0 0 10px rgba(73, 190, 212, 0.4)'
          }}
        >
          Error
        </h1>
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: '#49BED4' }}
        >
          Something went wrong on our side
        </h2>
        <p className="text-gray-700 mb-8 text-lg">
          We're experiencing technical difficulties. Please try again later or go back to the homepage.
        </p>
        <button
          onClick={() => router.push('/')}
          className="
            relative
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-full
            text-white
            font-semibold
            bg-gradient-to-r
            from-cyan-400
            to-teal-500
            shadow-lg
            hover:from-cyan-300
            hover:to-teal-400
            hover:shadow-xl
            active:shadow-inner
            active:scale-95
            focus:outline-none
            focus:ring-4
            focus:ring-cyan-300
            transition
            duration-300
            ease-in-out
          "
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
