import { notFound } from 'next/navigation';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { UnpalAI } from "@/components/UnpalAI";
import { getPublishedUniversityProfile } from '@/lib/db';
import type { Metadata } from "next";
import { ChatVisibilityProvider } from '@/components/ChatVisibilityProvider';

// Valid locales
const validLocales = ['id'];

// Data dummy translations
const translations = {
  id: {
    HomePage: {
      heroTitle: "Universitas - Kampus Unggulan Masa Depan",
      heroSubtitle: "Universitas unggulan dengan pendidikan berkualitas, fasilitas modern, dan lingkungan akademik yang mendukung kemajuan",
    }
  }
};

// Main layout for localized routes
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

  // Ambil data profil untuk Navbar
  const profiles = await getPublishedUniversityProfile();
  const profile = profiles.length > 0 ? profiles[0] : null;

  return (
    <ChatVisibilityProvider>
      <div
        className="flex flex-col min-h-screen relative"
      >
        <Navbar locale={locale} profile={profile} />
        <main className="flex-grow pt-16 relative z-10">
          {children}
        </main>
        <Footer locale={locale} />
        <UnpalAI />
        <BackToTop />
      </div>
    </ChatVisibilityProvider>
  );
}


