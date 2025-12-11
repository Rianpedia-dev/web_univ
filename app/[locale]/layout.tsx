import { notFound } from 'next/navigation';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import type { Metadata } from "next";

// Valid locales
const validLocales = ['id', 'en'];

// Data dummy translations
const translations = {
  id: {
    HomePage: {
      heroTitle: "Universitas - Kampus Unggulan Masa Depan",
      heroSubtitle: "Universitas unggulan dengan pendidikan berkualitas, fasilitas modern, dan lingkungan akademik yang mendukung kemajuan",
    }
  },
  en: {
    HomePage: {
      heroTitle: "University - Leading Campus of The Future",
      heroSubtitle: "A leading university with quality education, modern facilities, and an academic environment that supports advancement",
    }
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  // Pastikan locale valid
  if (!validLocales.includes(locale as 'id' | 'en')) {
    notFound();
  }

  const t = translations[locale as keyof typeof translations]?.HomePage;

  return {
    title: t?.heroTitle || "University - Leading Campus of The Future",
    description: t?.heroSubtitle || "A leading university with quality education, modern facilities, and an academic environment that supports advancement",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  // Pastikan locale valid
  if (!validLocales.includes(locale as 'id' | 'en')) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar locale={locale} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}

