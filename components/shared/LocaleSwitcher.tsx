'use client';

import { useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LOCALES = [
    { value: 'en', label: 'EN' },
    { value: 'bn', label: 'BN' },
    { value: 'ta', label: 'TA' },
    { value: 'bu', label: 'BU' },
    { value: 'fi', label: 'FI' },
    { value: 'in', label: 'IN' },
];

export default function LocaleSwitcher() {
    const [open, setOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
    };

    const currentLabel =
        LOCALES.find((item) => item.value === locale)?.label ?? locale.toUpperCase();

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="px-2 py-1 text-xs sm:text-sm gap-1 rounded-md border-gray-300/80"
                >
                    {currentLabel}
                    {open ? (
                        <ChevronUp className="h-3 w-3" />
                    ) : (
                        <ChevronDown className="h-3 w-3" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="min-w-0 w-20 rounded-md border-gray-300/80"
            >
                {LOCALES.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => switchLocale(item.value)}
                        className="px-2"
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}