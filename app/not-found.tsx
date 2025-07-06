'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
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
          404
        </h1>
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: '#49BED4' }}
        >
          Page Not Found
        </h2>
        <p className="text-gray-700 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist. It might have been removed or moved to a new location.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition duration-300"
          style={{
            backgroundColor: '#49BED4'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
