"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useChatVisibility } from './ChatVisibilityProvider';
import Image from "next/image";
import { Menu, X, GraduationCap, BookOpen, Users, Newspaper, Award, Handshake } from "lucide-react";

// Main Navbar component for the application
export function Navbar({ locale, profile }: { locale: string, profile?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isChatVisible, setIsChatVisible, isChatOpen, setIsChatOpen } = useChatVisibility();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
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
      href: `/${locale}/profil/profil`,
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
      href: `/${locale}/akademik/program-studi`,
      icon: BookOpen,
      submenu: [
        { title: locale === 'id' ? "Program Studi" : "Study Programs", href: `/${locale}/akademik/program-studi` },
        { title: locale === 'id' ? "Fakultas" : "Faculties", href: `/${locale}/akademik/fakultas` },
        { title: locale === 'id' ? "Kalender Akademik" : "Academic Calendar", href: `/${locale}/akademik/kalender-akademik` },
        { title: locale === 'id' ? "Fasilitas kampus" : "Fasilitas kampus", href: `/${locale}/akademik/fasilitas-kampus` },
      ]
    },
    {
      title: locale === 'id' ? "Penerimaan" : "Admission",
      href: `/${locale}/penerimaan/pendaftaran-pmb`,
      icon: Users,
      submenu: [
        { title: locale === 'id' ? "Pendaftaran PMB" : "Registration", href: `/${locale}/penerimaan/pendaftaran-pmb` },
        { title: locale === 'id' ? "Biaya Pendidikan" : "Education Cost", href: `/${locale}/penerimaan/biaya-pendidikan` },
        { title: locale === 'id' ? "Beasiswa" : "Scholarships", href: `/${locale}/penerimaan/beasiswa` },
      ]
    },
    {
      title: locale === 'id' ? "Berita & Media" : "News & Media",
      href: `/${locale}/berita-media/berita`,
      icon: Newspaper,
      submenu: [
        { title: locale === 'id' ? "Berita" : "News", href: `/${locale}/berita-media/berita` },
        { title: locale === 'id' ? "Events" : "Events", href: `/${locale}/berita-media/events` },
        { title: locale === 'id' ? "Galeri" : "Gallery", href: `/${locale}/berita-media/galeri` },
      ]
    },
    {
      title: locale === 'id' ? "Kemahasiswaan" : "Student Affairs",
      href: `/${locale}/kemahasiswaan/prestasi-mahasiswa`,
      icon: Users,
      submenu: [
        { title: locale === 'id' ? "Prestasi Mahasiswa" : "Student Achievements", href: `/${locale}/kemahasiswaan/prestasi-mahasiswa` },
        { title: locale === 'id' ? "UKM & Organisasi" : "Clubs & Organizations", href: `/${locale}/kemahasiswaan/ukm-organisasi` },
        { title: locale === 'id' ? "Layanan Mahasiswa" : "Student Services", href: `/${locale}/kemahasiswaan/layanan-mahasiswa` },
      ]
    },
    {
      title: locale === 'id' ? "Riset & Kerjasama" : "Riset & Kerjasama",
      href: `/${locale}/kerjasama/kerjasama`,
      icon: Handshake,
      submenu: [
        { title: locale === 'id' ? "Kerjasama" : "Kerjasama", href: `/${locale}/kerjasama/kerjasama` },
        { title: locale === 'id' ? "Jurnal" : "Jurnal", href: `/${locale}/kerjasama/jurnal` },
      ]
    },
  ];

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg py-1"
        : "bg-transparent py-2"
        }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {profile?.logo ? (
                <img
                  suppressHydrationWarning
                  src={profile.logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  suppressHydrationWarning
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                  <GraduationCap className="w-6 h-6 lg:w-7 lg:h-7 text-white/90 dark:text-white" suppressHydrationWarning />
                </div>
              )}
            </div>
            <span
              suppressHydrationWarning
              className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-400 bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] [-webkit-text-stroke:1px_#92400e] block whitespace-nowrap"
            >
              {profile?.name || "University"}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" suppressHydrationWarning>
            {navItems.map((item) => (
              <div key={item.href} className="relative group" suppressHydrationWarning>
                <Link
                  href={item.href}
                  suppressHydrationWarning
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-700 dark:text-yellow-300 shadow-[0_0_10px_rgba(255,182,193,0.2)]"
                    : "hover:bg-white/10 dark:hover:bg-gray-800/50 hover:text-yellow-600 dark:hover:text-yellow-400"
                    }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" suppressHydrationWarning />
                  <span className="text-sm lg:text-base font-medium" suppressHydrationWarning>{item.title}</span>
                </Link>

                {item.submenu.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-gradient-to-b from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200/50 dark:border-gray-700/50 transform group-hover:translate-y-1">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          suppressHydrationWarning
                          className={`block px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-yellow-600/10 hover:pl-6 transition-all duration-200 ${pathname === subItem.href ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-700 dark:text-yellow-300 border-l-4 border-yellow-500" : "hover:text-yellow-600 dark:hover:text-yellow-400"
                            }`}
                        >
                          <div className="flex items-center gap-2" suppressHydrationWarning>
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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <AnimatePresence>
                {!isChatVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative w-9 h-9 p-0.5 hover:bg-amber-500/10 group transition-all duration-300"
                      onClick={() => {
                        setIsChatVisible(true);
                        setIsChatOpen(true);
                      }}
                      title="Aktifkan AI"
                    >
                      <div className="relative w-7 h-7 group-hover:scale-110 transition-transform duration-200">
                        <Image
                          src="/images/robot.png"
                          alt="Aktifkan AI"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <AnimatePresence>
                {!isChatVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative w-9 h-9 p-0.5"
                      onClick={() => {
                        setIsChatVisible(true);
                        setIsChatOpen(true);
                      }}
                    >
                      <div className="relative w-7 h-7">
                        <Image
                          src="/images/robot.png"
                          alt="Aktifkan AI"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 dark:text-foreground hover:bg-white/10 dark:hover:bg-gray-800/50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" suppressHydrationWarning /> : <Menu className="w-5 h-5" suppressHydrationWarning />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 py-2 rounded-2xl bg-card border border-white/20 dark:border-white/10 shadow-xl max-h-[85vh] overflow-y-auto ring-1 ring-black/5"
          >
            <nav className="flex flex-col p-2 space-y-0.5">
              {navItems.map((item) => (
                <div key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 font-semibold shadow-sm ring-1 ring-yellow-500/20"
                      : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground font-medium"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-1 rounded-md transition-colors ${pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                      : "bg-black/5 dark:bg-white/10 text-foreground/70 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                      }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{item.title}</span>
                  </Link>

                  {item.submenu.length > 0 && (
                    <div className="ml-9 mt-0.5 mb-1 space-y-0.5 border-l-2 border-dashed border-black/10 dark:border-white/10 pl-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`relative block px-3 py-2 text-xs rounded-lg transition-all duration-300 ${pathname === subItem.href
                            ? "text-yellow-700 dark:text-yellow-400 font-medium bg-yellow-500/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:translate-x-1"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}