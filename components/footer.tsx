import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube, Zap, Shield, TrendingUp } from "lucide-react";
import { SimpleThemeToggle } from "@/components/theme-toggle";

export function Footer({ locale = 'id' }: { locale?: string }) {
  const quickLinks = [
    { title: "Profil", href: `/${locale}/profil` },
    { title: "Akademik", href: `/${locale}/akademik` },
    { title: "Penerimaan", href: `/${locale}/penerimaan` },
    { title: "Berita", href: `/${locale}/berita-media/berita` },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Jl. Pendidikan No. 1, Kota Pendidikan, Indonesia" },
    { icon: Phone, text: "(021) 12345678" },
    { icon: Mail, text: "info@university.ac.id" },
    { icon: Globe, text: "www.university.ac.id" },
  ];

  const socialMedia = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <GraduationCap className="w-7 h-7 text-foreground/90" suppressHydrationWarning />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">
                University
              </span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-sm">
              Universitas unggulan dengan pendekatan teknologi mutakhir yang berkomitmen untuk mencetak lulusan berkualitas dan siap bersaing di era digital.
            </p>
            <div className="flex gap-3">
              {socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-3 rounded-full bg-foreground/10 hover:bg-cyber-blue/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-cyber-blue" suppressHydrationWarning />
                </Link>
              ))}
            </div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyber-blue" suppressHydrationWarning />
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="block text-foreground/70 hover:text-cyber-blue transition-all duration-300 hover:pl-3 transform hover:translate-x-1"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-electric-purple" suppressHydrationWarning />
              Kontak
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start gap-4">
                  <contact.icon className="w-5 h-5 mt-1 flex-shrink-0 text-neon-green" suppressHydrationWarning />
                  <span className="text-foreground/70">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Tambahan */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-pink" suppressHydrationWarning />
              Informasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/akademik/kalender-akademik`} className="block text-foreground/70 hover:text-cyber-blue transition-all duration-300 hover:pl-3 transform hover:translate-x-1">
                  Kalender Akademik
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/penerimaan/pendaftaran-pmb`} className="block text-foreground/70 hover:text-cyber-blue transition-all duration-300 hover:pl-3 transform hover:translate-x-1">
                  Pendaftaran
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/profil/akreditasi`} className="block text-foreground/70 hover:text-cyber-blue transition-all duration-300 hover:pl-3 transform hover:translate-x-1">
                  Akreditasi
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kemahasiswaan/layanan-mahasiswa`} className="block text-foreground/70 hover:text-cyber-blue transition-all duration-300 hover:pl-3 transform hover:translate-x-1">
                  Layanan Mahasiswa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <SimpleThemeToggle />
              <p className="text-foreground/60">
                © {new Date().getFullYear()} University. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-foreground/50">
              <Link href={`/${locale}/privacy-policy`} className="hover:text-cyber-blue transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href={`/${locale}/terms-of-service`} className="hover:text-cyber-blue transition-colors">
                Syarat Layanan
              </Link>
              <Link href={`/${locale}/sitemap`} className="hover:text-cyber-blue transition-colors">
                Peta Situs
              </Link>
              <Link href="/sign-in" className="hover:text-cyber-blue transition-colors font-medium">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}