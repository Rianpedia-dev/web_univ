import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Globe, Zap, Shield, TrendingUp } from "lucide-react";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import { VisitorCounter } from "@/components/visitor-counter";
import { getPublishedSocialMediaLinks, getPublishedContactInformation, getPublishedUniversityProfile } from '@/lib/db';
import * as LucideIcons from "lucide-react";

export async function Footer({ locale = 'id' }: { locale?: string }) {
  // Ambil data dari database
  const [dbSocialLinks, dbContactInfo, dbProfiles] = await Promise.all([
    getPublishedSocialMediaLinks(),
    getPublishedContactInformation(),
    getPublishedUniversityProfile()
  ]);

  const profile = dbProfiles[0];

  // Ambil kontak utama
  const mainContact = dbContactInfo.find(c => c.type === 'main_campus') || dbContactInfo[0];

  const quickLinks = [
    { title: "Profil", href: `/${locale}/profil/profil` },
    { title: "Akademik", href: `/${locale}/akademik/program-studi` },
    { title: "Penerimaan", href: `/${locale}/penerimaan/pendaftaran-pmb` },
    { title: "Berita", href: `/${locale}/berita-media/berita` },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: mainContact ? `${mainContact.address}, ${mainContact.city}, ${mainContact.province}` : "Jl. Pendidikan No. 1, Kota Pendidikan, Indonesia"
    },
    {
      icon: Phone,
      text: mainContact?.phone || "(021) 12345678"
    },
    {
      icon: Mail,
      text: mainContact?.email || "info@university.ac.id"
    },
    {
      icon: Globe,
      text: mainContact?.website || "www.university.ac.id"
    },
  ];

  // Helper untuk mendapatkan ikon Lucide atau brand kustom
  const getIcon = (iconName: string) => {
    if (iconName === 'X' || iconName === 'Twitter') {
      return (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Globe;
    return IconComponent;
  };

  const socialMedia = dbSocialLinks.length > 0 ? dbSocialLinks.map(item => ({
    icon: getIcon(item.icon),
    href: item.url,
    label: item.platform
  })) : [
    { icon: LucideIcons.Facebook, href: "#", label: "Facebook" },
    { icon: LucideIcons.X, href: "#", label: "Twitter" },
    { icon: LucideIcons.Instagram, href: "#", label: "Instagram" },
    { icon: LucideIcons.Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {profile?.logo ? (
                  <img
                    suppressHydrationWarning
                    src={profile.logo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <GraduationCap className="w-7 h-7 text-foreground/90" suppressHydrationWarning />
                  </div>
                )}
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">
                {profile?.name || "University"}
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
                © {new Date().getFullYear()} {profile?.name || "University"}. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-foreground/50">
              <VisitorCounter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}