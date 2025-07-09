"use client";

import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #49BED4)'
      }}
    >
      <Cog6ToothIcon
        className="w-24 h-24 text-cyan-500 animate-spin"
      />
    </div>
  );
}
