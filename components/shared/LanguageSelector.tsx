"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Globe2 } from "lucide-react";

const LANGUAGE_KEY = "language-selected";

interface LanguageOption {
  code: "en" | "bn" | "ta";
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
];

export default function LanguageSelector() {
  const [showSelector, setShowSelector] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check if language has been selected
    const languageSelected = localStorage.getItem(LANGUAGE_KEY);
    if (!languageSelected) {
      setShowSelector(true);
    }
  }, []);

  const handleLanguageSelect = (locale: "en" | "bn" | "ta") => {
    // Save selection to localStorage
    localStorage.setItem(LANGUAGE_KEY, locale);
    setShowSelector(false);
    // Redirect to the selected locale
    router.replace("/", { locale });
  };

  // Don't render until mounted (to avoid hydration mismatch)
  if (!mounted || !showSelector) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 via-white to-primary/5 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content card */}
      <div className="relative flex flex-col items-center gap-8 px-8 py-12 max-w-lg w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 animate-in fade-in-0 zoom-in-95 duration-500">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Globe2 className="w-6 h-6 text-primary" />
          </div>
          <img 
            src="/assets/link_green.png" 
            className="w-10 h-10" 
            alt="The LINK Project"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome to The LINK Project
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            What language do you speak?
          </p>
        </div>

        {/* Language options */}
        <div className="flex flex-col gap-3 w-full">
          {languages.map((lang, index) => (
            <Button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="w-full h-16 text-lg font-semibold bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 rounded-xl group relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-between w-full px-6">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-white text-xl font-bold leading-tight">
                    {lang.nativeName}
                  </span>
                  <span className="text-white/80 text-sm font-normal">
                    {lang.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300 flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Subtle footer text */}
        <p className="text-sm text-gray-400 text-center mt-2">
          Choose your preferred language to get started
        </p>
      </div>
    </div>
  );
}
