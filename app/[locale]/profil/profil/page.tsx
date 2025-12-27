import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Lightbulb,
  BookOpen,
  Users2,
  FlaskConical,
  Briefcase,
  Target,
  Eye,
  Shield,
  Download,
  Award,
  Users,
  History,
  Quote,
  Gem,
  Rocket,
  Sparkles,
  Handshake,
  ShieldCheck
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  getPublishedUniversityProfile,
  getPublishedCampusStatistics,
  getPublishedLogoMeanings
} from '@/lib/db';

export default async function ProfilBerandaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data profil dari database
  const profiles = await getPublishedUniversityProfile();
  const profile = profiles.length > 0 ? profiles[0] : {
    name: "Universitas Masa Depan",
    shortName: "UMD",
    description: "Lembaga pendidikan tinggi terkemuka yang berdedikasi untuk mencetak generasi pemimpin masa depan.",
    vision: "Menjadi universitas kelas dunia yang unggul dalam teknologi dan kewirausahaan.",
    mission: "Menyelenggarakan pendidikan berkualitas, riset inovatif, dan pengabdian masyarakat.",
    values: "Integritas, Inovasi, Inklusivitas",
    history: "Didirikan pada tahun 1990...",
    logo: "/images/logo_univ.png",
    banner: "/images/kampus_profil.png",
    motto: "Building Excellence with Integrity",
    establishedYear: 1990,
    accreditation: "Unggul"
  };

  // Ambil data statistik kampus
  const campusStats = await getPublishedCampusStatistics();

  // Ambil data makna logo
  const logoMeaningsFromDb = await getPublishedLogoMeanings();
  const logoMeaning = logoMeaningsFromDb.length > 0 ? logoMeaningsFromDb : [
    {
      element: "Bentuk Lingkaran",
      meaning: "Melambangkan keutuhan, kesatuan, dan kesinambungan dalam mencapai visi dan misi universitas."
    },
    {
      element: "Warna Biru",
      meaning: "Mencerminkan kedalaman ilmu pengetahuan, kebijaksanaan, dan integritas."
    },
    {
      element: "Bintang Bersudut Lima",
      meaning: "Melambangkan Pancasila sebagai dasar negara, serta semangat kebangsaan dan ketuhanan."
    },
    {
      element: "Buku Terbuka",
      meaning: "Melambangkan sumber ilmu pengetahuan, keterbukaan, dan proses pembelajaran yang berkelanjutan."
    },
    {
      element: "Padi dan Kapas",
      meaning: "Simbol kemakmuran, keadilan sosial, dan kesejahteraan yang menjadi tujuan pendidikan."
    },
    {
      element: "Obor",
      meaning: "Melambangkan semangat pencerahan, bimbingan, dan harapan untuk masa depan yang lebih baik."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_profil.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="relative z-10 py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <MotionDiv
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo in Header */}
              <div className="flex justify-center mb-10">
                <div className="relative group">
                  {/* Ambient Green Glow - Always Visible */}
                  <div className="absolute -inset-10 bg-emerald-500/30 blur-[80px] rounded-full opacity-100 group-hover:bg-emerald-400/50 transition-all duration-700"></div>

                  <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center transform hover:scale-110 transition-all duration-500">
                    <img
                      src={profile.logo || "/images/logo_univ.png"}
                      alt="Logo Universitas"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(52,211,153,1)] drop-shadow-[0_0_50px_rgba(16,185,129,0.8)] drop-shadow-[0_0_80px_rgba(5,150,105,0.6)]"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                {profile.name}
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
                {profile.motto}
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Statistik Kampus */}
        {campusStats && (
          <div className="mb-24">
            <MotionDiv
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Statistik Kampus</h2>
              <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full mb-4"></div>
              <p className="text-muted-foreground">Data statistik perkembangan universitas tahun {campusStats.year}</p>
            </MotionDiv>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Mahasiswa",
                  value: campusStats.totalStudents?.toLocaleString() || "0",
                  icon: Users,
                  iconColor: "text-purple-600 dark:text-purple-400",
                  bgColor: "bg-purple-100 dark:bg-purple-500/20",
                  accentColor: "bg-purple-600",
                  delay: 0
                },
                {
                  label: "Program Studi",
                  value: campusStats.totalStudyPrograms?.toLocaleString() || "0",
                  icon: BookOpen,
                  iconColor: "text-orange-600 dark:text-orange-400",
                  bgColor: "bg-orange-100 dark:bg-orange-500/20",
                  accentColor: "bg-orange-600",
                  delay: 0.1
                },
                {
                  label: "Akreditasi",
                  value: campusStats.accreditation || "Unggul",
                  icon: Award,
                  iconColor: "text-emerald-600 dark:text-emerald-400",
                  bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
                  accentColor: "bg-emerald-600",
                  delay: 0.2
                },
                {
                  label: "Mitra Industri",
                  value: campusStats.internationalPartners?.toLocaleString() || "0",
                  icon: Briefcase,
                  iconColor: "text-blue-600 dark:text-blue-400",
                  bgColor: "bg-blue-100 dark:bg-blue-500/20",
                  accentColor: "bg-blue-600",
                  delay: 0.3
                }
              ].map((stat, i) => (
                <MotionDiv
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative h-full"
                >
                  <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/20 dark:border-white/5 relative overflow-hidden h-full flex flex-col items-center justify-center text-center backdrop-blur-xl group-hover:border-foreground/10 transition-all duration-500 shadow-sm hover:shadow-2xl dark:shadow-none">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-inner",
                      stat.bgColor
                    )}>
                      <stat.icon className={cn("w-8 h-8", stat.iconColor)} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight group-hover:scale-105 transition-transform duration-500">
                        {stat.value}
                      </h3>
                      <p className="text-foreground/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                        {stat.label}
                      </p>
                    </div>
                    <div className={cn(
                      "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700",
                      stat.accentColor
                    )}></div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {/* Moto Universitas */}
        <div className="space-y-12 mb-24 px-4 sm:px-0">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden group shadow-[0_0_80px_rgba(0,240,255,0.1)]"
          >
            {/* Ambient background glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-electric-purple/10 rounded-full blur-[120px] -z-10 animate-pulse transition-delay-1000"></div>

            <div className="relative z-10 space-y-10 max-w-5xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Quote className="w-8 h-8 text-cyber-blue" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground/60 tracking-[0.4em] uppercase">Moto Universitas</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto"></div>
              </div>

              <p className="text-lg md:text-xl font-medium text-foreground dark:text-white/90 leading-relaxed italic px-4 md:px-20 relative">
                <span className="absolute -top-4 -left-2 text-cyber-blue/20 text-6xl font-serif">&quot;</span>
                {profile.description}
                <span className="absolute -bottom-8 -right-2 text-cyber-blue/20 text-6xl font-serif">&quot;</span>
              </p>
            </div>
          </MotionDiv>

          {/* Card Sejarah Singkat */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden group shadow-[0_0_80px_rgba(147,51,234,0.1)]"
          >
            {/* Ambient background glows */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-electric-purple/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyber-blue/10 rounded-full blur-[100px] -z-10"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyber-blue via-blue-600 to-electric-purple flex items-center justify-center shadow-xl shadow-cyber-blue/20 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 border border-white/20">
                    <History className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="space-y-8 flex-1">
                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-foreground dark:text-white tracking-tight">
                      Sejarah Singkat
                    </h3>
                    <div className="w-20 h-1.5 bg-gradient-cyber rounded-full mx-auto md:mx-0"></div>
                  </div>

                  <div className="text-base md:text-lg text-foreground/70 dark:text-white/70 leading-relaxed space-y-6 font-medium">
                    {profile.history?.split('\n').map((para, i) => (
                      para.trim() && (
                        <p key={i} className="relative pl-0 md:pl-6 md:border-l border-foreground/10 dark:border-white/10">
                          {para}
                        </p>
                      )
                    )) || <p>{profile.history}</p>}
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Section Header: Visi & Misi */}
        <div className="text-center mb-16 px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground dark:text-white tracking-tight">Visi & Misi</h2>
            <div className="w-24 h-2 bg-gradient-cyber rounded-full mx-auto"></div>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-xs md:text-sm">Arah & Komitmen Kami</p>
          </MotionDiv>
        </div>

        {/* Visi & Misi Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 px-4 sm:px-0">
          <MotionDiv
            className="glass-card p-12 md:p-16 rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-[0_0_80px_rgba(0,240,255,0.05)] h-full"
            whileHover={{ y: -12 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white tracking-tight flex items-center gap-6">
                  <div className="w-14 h-14 bg-cyber-blue/10 rounded-2xl flex items-center justify-center border border-cyber-blue/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                    <Target className="w-7 h-7 text-cyber-blue" />
                  </div>
                  <span>Visi</span>
                  <div className="h-0.5 flex-1 bg-foreground/10 dark:bg-white/10 rounded-full group-hover:bg-cyber-blue/30 transition-colors"></div>
                </h3>
                <p className="text-xl md:text-2xl text-foreground/80 dark:text-white/80 leading-relaxed italic font-medium relative pl-8 border-l-4 border-cyber-blue/30">
                  &quot;{profile.vision}&quot;
                </p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className="glass-card p-12 md:p-16 rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-[0_0_80px_rgba(147,51,234,0.05)] h-full"
            whileHover={{ y: -12 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-electric-purple/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white tracking-tight flex items-center gap-6">
                  <div className="w-14 h-14 bg-electric-purple/10 rounded-2xl flex items-center justify-center border border-electric-purple/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-inner">
                    <Eye className="w-7 h-7 text-electric-purple" />
                  </div>
                  <span>Misi</span>
                  <div className="h-0.5 flex-1 bg-foreground/10 dark:bg-white/10 rounded-full group-hover:bg-electric-purple/30 transition-colors"></div>
                </h3>
                <ul className="space-y-6">
                  {profile.mission?.split('\n').filter(para => para.trim() !== '').map((m, i) => (
                    <li key={i} className="flex items-start group/misi">
                      <div className="w-10 h-10 rounded-2xl bg-foreground/5 dark:bg-white/5 flex items-center justify-center mr-5 flex-shrink-0 text-sm font-bold text-foreground dark:text-white border border-foreground/10 dark:border-white/10 group-hover/misi:bg-electric-purple/20 group-hover/misi:border-electric-purple/40 group-hover/misi:text-electric-purple transition-all duration-300">
                        {i + 1}
                      </div>
                      <span className="text-foreground/70 dark:text-white/70 leading-relaxed pt-1.5 md:text-lg transition-colors group-hover/misi:text-foreground dark:group-hover/misi:text-white/90">{m.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Nilai-Nilai Dasar */}
        <div className="mb-24">
          <MotionDiv
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Nilai-Nilai Dasar</h2>
            <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full"></div>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {profile.values?.split(',').map((val, i) => {
              const value = val.trim();
              let Icon = ShieldCheck;
              let iconColor = "text-cyber-blue";
              let shadowColor = "rgba(0,240,255,0.2)";

              if (value.toLowerCase().includes('integritas')) {
                Icon = ShieldCheck;
                iconColor = "text-emerald-400";
                shadowColor = "rgba(52,211,153,0.3)";
              } else if (value.toLowerCase().includes('inovasi')) {
                Icon = Rocket;
                iconColor = "text-orange-400";
                shadowColor = "rgba(251,146,60,0.3)";
              } else if (value.toLowerCase().includes('kolaborasi')) {
                Icon = Handshake;
                iconColor = "text-blue-400";
                shadowColor = "rgba(96,165,250,0.3)";
              } else if (value.toLowerCase().includes('unggul') || value.toLowerCase().includes('mandiri')) {
                Icon = Gem;
                iconColor = "text-amber-400";
                shadowColor = "rgba(251,191,36,0.3)";
              } else {
                Icon = Sparkles;
                iconColor = "text-purple-400";
                shadowColor = "rgba(192,132,252,0.3)";
              }

              return (
                <MotionDiv
                  key={i}
                  className="glass-card p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden group hover:border-white/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                    style={{ backgroundColor: iconColor.split('-')[1].split(' ')[0] }}
                  ></div>

                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    "bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 shadow-inner"
                  )}
                    style={{ boxShadow: `0 0 20px ${shadowColor}` }}
                  >
                    <Icon className={cn("w-8 h-8", iconColor)} />
                  </div>
                  <h4 className="text-xl font-extrabold text-foreground dark:text-white group-hover:scale-105 transition-transform duration-300 tracking-tight">{value}</h4>
                </MotionDiv>
              );
            })}
          </div>
        </div>

        {/* Filosofi Logo */}
        <div className="mb-24">
          <MotionDiv
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Makna Logo</h2>
            <p className="text-muted-foreground">Setiap elemen dalam logo kami membawa filosofi dan harapan universitas</p>
          </MotionDiv>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <MotionDiv
              className="lg:col-span-1"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative aspect-square glass-card rounded-full p-12 border-4 border-white/10 flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity" />
                <img
                  src={profile.logo || "/images/logo_univ.png"}
                  alt="Logo Universitas"
                  className="relative z-10 w-[300px] h-[300px] object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </MotionDiv>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {logoMeaning.map((item: any, index: number) => (
                <MotionDiv
                  key={index}
                  className="glass-card p-8 rounded-3xl border border-white/10 hover:border-cyber-blue/30 transition-all duration-300 group/item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    {item.image && (
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-2 flex-shrink-0 group-hover/item:border-cyber-blue/30 transition-colors">
                        <img
                          src={item.image}
                          alt={item.element}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).parentElement?.classList.add('hidden')
                          }}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <h4 className="font-bold text-cyber-blue flex items-center gap-2 group-hover/item:text-white transition-colors">
                        {!item.image && <div className="w-2 h-2 bg-cyber-blue rounded-full" />}
                        {item.element}
                      </h4>
                      <p className="text-sm text-foreground/70 leading-relaxed group-hover/item:text-foreground/90 transition-colors">
                        {item.meaning}
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}