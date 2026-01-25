'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'bn', label: 'বাংলা' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'bu', label: 'BU' },
  { value: 'fi', label: 'FI' },
  { value: 'in', label: 'IN' },
];

const STORAGE_KEY = 'preferred-locale';

export default function LanguageOverlay() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    // Only check on client
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setOpen(true);
    }
  }, []);

  const confirm = () => {
    if (!selected) return;

    localStorage.setItem(STORAGE_KEY, selected);

    if (selected !== currentLocale) {
      router.replace(pathname, { locale: selected });
      router.refresh();
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Choose your language</h2>
        <p className="mt-1 text-sm text-gray-600">
          You can change this anytime later.
        </p>

        <div className="mt-4 grid gap-2">
          {LOCALES.map((l) => (
            <button
              key={l.value}
              onClick={() => setSelected(l.value)}
              className={`rounded-lg border px-4 py-3 text-left transition
                ${
                  selected === l.value
                    ? 'border-black bg-gray-100 font-medium'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <Button
          onClick={confirm}
          disabled={!selected}
          className="mt-5 w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
