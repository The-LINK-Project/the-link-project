"use client";

import { ReactNode } from "react";
import LanguageSelector from "./LanguageSelector";

interface LanguageGateProps {
  children: ReactNode;
}

export default function LanguageGate({ children }: LanguageGateProps) {
  return (
    <>
      <LanguageSelector />
      {children}
    </>
  );
}
