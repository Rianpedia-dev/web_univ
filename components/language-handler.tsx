'use client';

import { useEffect } from 'react';

interface LanguageHandlerProps {
  locale: string;
}

export default function LanguageHandler({ locale }: LanguageHandlerProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}