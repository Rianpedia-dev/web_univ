import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Car,
  Train,
  Bus,
  Facebook,
  Twitter,
  X,
  Instagram,
  Youtube,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { getPublishedContactInformation, getPublishedCampusAccessibilities, getPublishedSocialMediaLinks } from '@/lib/db';
import * as LucideIcons from "lucide-react";

export default async function ProfilKontakPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const [contactInfoArr, dbAksesKampus, dbMediaSosial] = await Promise.all([
    getPublishedContactInformation(),
    getPublishedCampusAccessibilities(),
    getPublishedSocialMediaLinks()
  ]);

  // Ambil kontak utama (Kantor Pusat/Rektorat)
  const mainContact = contactInfoArr.find(c => c.type === 'main_campus' || c.type === 'administrative_office') || contactInfoArr[0] || {
    name: "Universitas",
    address: "Jl. Pendidikan No. 1",
    city: "Kota Pendidikan",
    province: "Indonesia",
    postalCode: "-",
    phone: "(021) 12345678",
    email: "info@university.ac.id",
    website: "www.university.ac.id",
    operatingHours: "Senin - Jumat: 08:00 - 16:00",
    mapUrl: ""
  };

  // Unit kampus dari database
  const unitKampus = contactInfoArr.filter(c => c.id !== mainContact.id);

  // Helper untuk mendapatkan ikon Lucide atau brand kustom
  const getIcon = (iconName: string) => {
    if (iconName === 'X' || iconName === 'Twitter') {
      return (props: any) => (
        <svg viewBox="0 0 24 24" {...props} fill="currentColor" stroke="none">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return IconComponent;
  };

  // Data akses ke kampus (dinamis)
  const aksesKampus = dbAksesKampus.length > 0 ? dbAksesKampus.map(item => ({
    nama: item.name,
    icon: getIcon(item.icon),
    deskripsi: item.description
  })) : [
    {
      nama: "Transportasi Umum",
      icon: Bus,
      deskripsi: "Mudah diakses dengan angkutan kota dan bus kota"
    },
    {
      nama: "Stasiun Terdekat",
      icon: Train,
      deskripsi: "Stasiun Kota berjarak 1 km dari kampus"
    },
    {
      nama: "Bandara Terdekat",
      icon: Car,
      deskripsi: "Bandara Internasional berjarak 30 km dari kampus"
    }
  ];

  // Data media sosial (dinamis)
  const mediaSosial = dbMediaSosial.length > 0 ? dbMediaSosial.map(item => ({
    nama: item.platform,
    icon: getIcon(item.icon),
    url: item.url,
    username: item.username
  })) : [
    {
      nama: "Facebook",
      icon: Facebook,
      url: "#",
      username: "@universityofficial"
    },
    {
      nama: "Instagram",
      icon: Instagram,
      url: "#",
      username: "@university"
    },
    {
      nama: "Twitter",
      icon: X,
      url: "#",
      username: "@university_id"
    },
    {
      nama: "Youtube",
      icon: Youtube,
      url: "#",
      username: "University Official Channel"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_profil.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header Section */}
            <MotionDiv
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px #fcffa5ff',
                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
              }}>
                HUBUNGI KAMI
              </h1>

            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Main Contact Card */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 h-full relative overflow-hidden group hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-all duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-cyber rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:rotate-6 transition-transform">
                  <Globe className="w-5 h-5 text-foreground" />
                </div>
                Kontak Utama
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Alamat Kampus</h3>
                    <p className="text-muted-foreground">{mainContact.address}</p>
                    <p className="text-muted-foreground">{mainContact.city}, {mainContact.province} {mainContact.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-electric-purple/10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-electric-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telepon & Fax</h3>
                    <p className="text-muted-foreground">{mainContact.phone}</p>
                    {mainContact.fax && <p className="text-muted-foreground">Fax: {mainContact.fax}</p>}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Resmi</h3>
                    <p className="text-muted-foreground">{mainContact.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Jam Operasional</h3>
                    <p className="text-muted-foreground">{mainContact.operatingHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                {mediaSosial.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center border border-white/10 hover:border-cyber-blue hover:text-cyber-blue transition-all"
                    aria-label={social.nama}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </MotionDiv>

          {/* Map Section */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card rounded-3xl border border-white/20 h-full min-h-[450px] overflow-hidden relative group shadow-2xl">
              {mainContact.mapUrl ? (
                <div className="absolute inset-0 w-full h-full">
                  {mainContact.mapUrl.includes('<iframe') ? (
                    (() => {
                      const srcMatch = mainContact.mapUrl.match(/src="([^"]+)"/);
                      const mapSrc = srcMatch ? srcMatch[1] : "";
                      return (
                        <iframe
                          src={mapSrc}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                        ></iframe>
                      );
                    })()
                  ) : (
                    <iframe
                      src={mainContact.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    ></iframe>
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/10 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-cyber-blue" />
                  </div>
                  <p className="text-sm text-muted-foreground">Peta belum tersedia</p>
                </div>
              )}

              {/* Overlay Gradient to blend with background */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl border border-white/10 pointer-events-none group-hover:translate-y-20 transition-transform duration-500">
                <h3 className="font-bold text-foreground mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-cyber-blue" />
                  Lokasi Kampus
                </h3>
                <p className="text-sm text-muted-foreground truncate">{mainContact.address}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 italic">Klik peta untuk berinteraksi</p>
              </div>
            </div>
          </MotionDiv>
        </div>



        {/* Access Info */}
        <div className="mb-16">
          <MotionDiv
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Aksesibilitas Kampus</h2>
            <p className="text-muted-foreground">Pilihan sarana transportasi untuk menuju ke lokasi kampus kami</p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aksesKampus.map((akses, index) => (
              <MotionDiv
                key={index}
                className="glass-card p-8 rounded-3xl border border-white/10 text-center hover:bg-white/5 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-cyber rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <akses.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{akses.nama}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{akses.deskripsi}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}