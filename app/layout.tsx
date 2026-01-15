import 'modern-normalize/modern-normalize.css';
import { Geist, Geist_Mono, Parkinsans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { AppThemeProvider } from "@/components/app-theme-provider";
import { BackToTopWrapper } from "@/components/back-to-top-wrapper";
import { ThemeBackground } from "@/components/theme-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University - Kampus Unggulan Masa Depan",
  description:
    "Universitas unggulan dengan pendidikan berkualitas, fasilitas modern, dan lingkungan akademik yang mendukung kemajuan",
};

// Root layout menyertakan tag html dan body dengan font variables
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${parkinsans.variable} antialiased`}
      >
        <AppThemeProvider>
          <BackToTopWrapper>
            <ThemeBackground />
            {children}
          </BackToTopWrapper>
        </AppThemeProvider>
      </body>
    </html>
  );
}