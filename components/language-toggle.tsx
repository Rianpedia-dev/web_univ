"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

const locales = ['id', 'en']; // Daftar locale yang didukung

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ekstrak locale dari pathname
  const currentLocale = pathname.split('/')[1];
  const isValidLocale = locales.includes(currentLocale) ? currentLocale : 'id';

  const changeLocale = (newLocale: string) => {
    // Mendapatkan pathname saat ini dan mengganti locale
    let newPathname = pathname.replace(`/${isValidLocale}`, `/${newLocale}`);
    if (!newPathname.startsWith('/')) {
      newPathname = `/${newLocale}${pathname}`;
    } else if (pathname === '/' || pathname === '' || !isValidLocale) {
      newPathname = `/${newLocale}`;
    } else if (!pathname.includes('/' + isValidLocale)) {
      newPathname = `/${newLocale}${pathname}`;
    }
    router.push(newPathname);
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" suppressHydrationWarning>
        <Globe className="h-[1.2rem] w-[1.2rem]" suppressHydrationWarning />
        <span className="sr-only">Toggle language</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" suppressHydrationWarning>
          <Globe className="h-[1.2rem] w-[1.2rem]" suppressHydrationWarning />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => changeLocale(loc)}
            className={isValidLocale === loc ? "font-bold" : ""}
          >
            {loc === 'id' ? '🇮🇩 Indonesia' : '🇺🇸 English'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}