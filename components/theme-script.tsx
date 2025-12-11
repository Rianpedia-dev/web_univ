"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

// Komponen untuk menerapkan kelas tema ke elemen html
export function ThemeScript() {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;

    // Hapus semua kelas tema sebelumnya
    html.classList.remove("light", "dark");

    // Gunakan resolvedTheme jika tersedia, jika tidak gunakan theme
    const currentTheme = resolvedTheme || (theme === "system" ? systemTheme : theme);

    // Untuk Tailwind CSS v4 dengan @custom-variant, kita perlu memastikan kelas tema diterapkan
    // Tambahkan kelas tema ke elemen html
    if (currentTheme && currentTheme !== "system") {
      html.classList.add(currentTheme);
    } else if (currentTheme === "system") {
      // Jika sistem tema, tunggu sampai kita bisa mengakses preferensi sistem
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Terapkan tema sistem saat ini
      const applySystemTheme = () => {
        html.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };

      applySystemTheme();

      // Dengarkan perubahan preferensi sistem
      mediaQuery.addEventListener('change', applySystemTheme);

      // Hapus listener saat komponen di-unmount
      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme);
      };
    } else {
      // Default ke light jika tidak ada tema
      html.classList.add('light');
    }
  }, [theme, systemTheme, resolvedTheme]);

  return null;
}