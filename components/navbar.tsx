"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, BookOpen, Users, Newspaper, Award, Handshake } from "lucide-react";

export function Navbar({ locale }: { locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: locale === 'id' ? "Beranda" : "Home",
      href: `/${locale}`,
      icon: GraduationCap,
      submenu: []
    },
    {
      title: locale === 'id' ? "Profil" : "Profile",
      href: `/${locale}/profil/profil`, // Redirect to main profil page
      icon: Award,
      submenu: [
        { title: locale === 'id' ? "Tentang Kami" : "About Us", href: `/${locale}/profil/profil` },
        { title: locale === 'id' ? "Struktur Organisasi" : "Organization Structure", href: `/${locale}/profil/struktur-organisasi` },
        { title: locale === 'id' ? "Akreditasi" : "Accreditation", href: `/${locale}/profil/akreditasi` },
        { title: locale === 'id' ? "Kontak" : "Contact", href: `/${locale}/profil/kontak` },
      ]
    },
    {
      title: locale === 'id' ? "Akademik" : "Academic",
      href: `/${locale}/akademik/program-studi`, // Redirect to first submenu
      icon: BookOpen,
      submenu: [
        { title: locale === 'id' ? "Program Studi" : "Study Programs", href: `/${locale}/akademik/program-studi` },
        { title: locale === 'id' ? "Fakultas" : "Faculties", href: `/${locale}/akademik/fakultas` },
        { title: locale === 'id' ? "Kalender Akademik" : "Academic Calendar", href: `/${locale}/akademik/kalender-akademik` },
      ]
    },
    {
      title: locale === 'id' ? "Penerimaan" : "Admission",
      href: `/${locale}/penerimaan/pendaftaran-pmb`, // Redirect to first submenu
      icon: Users,
      submenu: [
        { title: locale === 'id' ? "Pendaftaran PMB" : "Registration", href: `/${locale}/penerimaan/pendaftaran-pmb` },
        { title: locale === 'id' ? "Kelas" : "Classes", href: `/${locale}/penerimaan/kelas` },
        { title: locale === 'id' ? "Biaya Pendidikan" : "Education Cost", href: `/${locale}/penerimaan/biaya-pendidikan` },
        { title: locale === 'id' ? "Beasiswa" : "Scholarships", href: `/${locale}/penerimaan/beasiswa` },
      ]
    },
    {
      title: locale === 'id' ? "Berita & Media" : "News & Media",
      href: `/${locale}/berita-media/berita`, // Redirect to first submenu
      icon: Newspaper,
      submenu: [
        { title: locale === 'id' ? "Berita" : "News", href: `/${locale}/berita-media/berita` },
        { title: locale === 'id' ? "Pengumuman" : "Announcements", href: `/${locale}/berita-media/pengumuman` },
        { title: locale === 'id' ? "Events" : "Events", href: `/${locale}/berita-media/events` },
        { title: locale === 'id' ? "Galeri" : "Gallery", href: `/${locale}/berita-media/galeri` },
      ]
    },
    {
      title: locale === 'id' ? "Kemahasiswaan" : "Student Affairs",
      href: `/${locale}/kemahasiswaan/layanan-mahasiswa`, // Redirect to first submenu
      icon: Users,
      submenu: [
        { title: locale === 'id' ? "Layanan Mahasiswa" : "Student Services", href: `/${locale}/kemahasiswaan/layanan-mahasiswa` },
        { title: locale === 'id' ? "UKM & Organisasi" : "Clubs & Organizations", href: `/${locale}/kemahasiswaan/ukm-organisasi` },
        { title: locale === 'id' ? "Prestasi Mahasiswa" : "Student Achievements", href: `/${locale}/kemahasiswaan/prestasi-mahasiswa` },
      ]
    },
    {
      title: locale === 'id' ? "Kerjasama" : "Partnership",
      href: `/${locale}/kerjasama/partnership`, // Redirect to first submenu
      icon: Handshake,
      submenu: [
        { title: locale === 'id' ? "Partnership" : "Partnership", href: `/${locale}/kerjasama/partnership` },
      ]
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg py-2"
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <GraduationCap className="w-6 h-6 text-white/90 dark:text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              University
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700 dark:text-blue-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                      : "hover:bg-white/10 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>

                {/* Submenu */}
                {item.submenu.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-gradient-to-b from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200/50 dark:border-gray-700/50 transform group-hover:translate-y-1">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 hover:pl-6 transition-all duration-200 ${
                            pathname === subItem.href ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" : "hover:text-blue-600 dark:hover:text-blue-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {subItem.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Desktop controls */}
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Mobile controls - including Theme and Language toggles alongside menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <LanguageToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 dark:text-foreground hover:bg-white/10 dark:hover:bg-gray-800/50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-4 rounded-xl bg-gradient-to-b from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700 dark:text-blue-300"
                        : "hover:bg-white/10 dark:hover:bg-gray-800/50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>

                  {/* Mobile Submenu */}
                  {item.submenu.length > 0 && (
                    <div className="ml-6 mt-1 space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-2 text-sm rounded-lg transition-all ${
                            pathname === subItem.href
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700 dark:text-blue-300"
                              : "hover:bg-white/10 dark:hover:bg-gray-800/50 hover:pl-6"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}