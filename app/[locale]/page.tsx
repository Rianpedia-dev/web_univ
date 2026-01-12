import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Newspaper,
  Calendar,
  Star,
  ChevronRight,
  Play,
  Award,
  Building2,
  Target,
  Eye,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import {
  getPublishedNews,
  getPublishedEvents,
  getCampusStatistics,
  getPublishedTestimonials,
  getPublishedPartners,
  getPublishedRectorMessage,
  getHomepageStatistics,
  getHeroSection,
  getUniversityProfile
} from '@/lib/db';
import { HomeNewsSection } from "@/components/home-news-section";
import { PartnersCarousel } from "@/components/partners-carousel";

/**
 * Fungsi pembantu untuk mengkonversi URL YouTube biasa ke URL Embed
 */
function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;

  let videoId = '';

  // Ekstrak ID video
  if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  } else if (url.includes('v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }

  if (videoId) {
    // Tambahkan parameter autoplay=1 dan mute=1 (wajib untuk autoplay di browser modern)
    // Tambahkan loop=1 dan playlist=VIDEO_ID agar video memutar ulang otomatis
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0`;
  }

  return url;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const latestNews = await getPublishedNews(3);
  const upcomingEvents = await getPublishedEvents(3);
  const campusStats = await getCampusStatistics();
  const partnersFromDb = await getPublishedPartners(30);
  const rectorMessage = await getPublishedRectorMessage();
  const homeStats = await getHomepageStatistics();
  const heroData = await getHeroSection();
  const uniProfile = await getUniversityProfile();

  // Data partner statis jika database kosong
  const partners = partnersFromDb.length > 0 ? partnersFromDb : [
    { id: '1', name: 'Google', logo: null },
    { id: '2', name: 'Microsoft', logo: null },
    { id: '3', name: 'IBM', logo: null },
    { id: '4', name: 'Intel', logo: null },
  ];

  // Ambil data tahun terbaru untuk statistik
  const latestStats = campusStats.length > 0 ? campusStats[0] : null;

  // Ambil data testimonial dari database
  const testimonalsFromDb = await getPublishedTestimonials(6);

  // Gunakan data dari database jika ada, jika tidak gunakan data fallback (statis)
  const testimonials = testimonalsFromDb.length > 0 ? testimonalsFromDb : [
    {
      id: "fallback-1",
      name: "Ahmad Fauzi",
      role: "Alumni Teknik Informatika 2020",
      content: "Kampus ini memberikan pengalaman pendidikan yang luar biasa dengan fasilitas modern dan dosen yang kompeten.",
      image: "/images/testimoni.png",
      rating: 5
    },
    {
      id: "fallback-2",
      name: "Siti Nurhaliza",
      role: "Mahasiswa Sistem Informasi 2021",
      content: "Lingkungan akademik yang mendukung dan berbagai kegiatan kemahasiswaan membuat saya berkembang secara holistik.",
      image: "/images/testimoni.png",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background grid dengan opacity minimal */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-0" />

      {/* Gradient orbs dengan opacity minimal */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/2 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/2 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      <div className="container mx-auto px-4 pt-4 pb-8 relative z-10">
        {/* Hero Section */}
        <div className="relative pt-12 pb-6 md:pt-20 md:pb-32 overflow-hidden z-10">
          {/* Background Abstract Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[120px] -z-10"></div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-left lg:h-auto"
              >


                <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight line-clamp-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-400 bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] [-webkit-text-stroke:1px_#92400e]">
                    {heroData?.title || "Selamat Datang di Universitas"}
                  </span>
                </h1>

                <p className="text-xl text-foreground/60 mb-8 max-w-xl leading-relaxed">
                  {heroData?.subtitle || "Membangun generasi unggul dan berdaya saing global melalui pendidikan berkualitas tinggi dengan kurikulum berbasis industri dan teknologi masa depan."}
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 lg:row-span-2"
              >
                <div className="relative group">
                  {/* Decorative Frames & Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue to-electric-purple rounded-[2.6rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass-card border-2 border-white/20 dark:border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)] transform transition-all duration-700 group-hover:scale-[1.01]">
                    {heroData?.videoUrl ? (
                      <div className="w-full h-full bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl(heroData.videoUrl) || ""}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center group/panel">
                        {heroData?.imageUrl ? (
                          <img src={heroData.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="Hero" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20"></div>
                        )}
                        <div className="text-center relative z-10">
                          <MotionDiv
                            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-cyber-blue hover:border-cyber-blue transition-all duration-500 group/play shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                          >
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </MotionDiv>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 text-left lg:col-start-1 lg:row-start-2"
              >
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 mt-4 lg:mt-0">
                  <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-10 h-12 font-bold group shadow-2xl hover:scale-105 transition-all duration-300">
                    <Link href={`/${locale}/profil/profil`}>
                      {heroData?.buttonText || "Mulai Menjelajah"}
                      <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-10 h-12 font-bold group shadow-2xl hover:scale-105 transition-all duration-300">
                    <Link href="penerimaan/pendaftaran-pmb">
                      Pendaftaran
                      <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Futuristic Cards */}
      <div id="stats-section" className="container mx-auto px-4 pt-4 pb-12 md:py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            {
              icon: GraduationCap,
              value: homeStats?.establishedYear || "50+",
              label: "Tahun Berdiri",
              iconColor: "text-blue-600 dark:text-blue-400",
              bgColor: "bg-blue-100 dark:bg-blue-500/20",
              accentColor: "bg-blue-600",
              delay: 0
            },
            {
              icon: GraduationCap,
              value: homeStats?.totalStudents,
              label: "Alumni",
              iconColor: "text-purple-600 dark:text-purple-400",
              bgColor: "bg-purple-100 dark:bg-purple-500/20",
              accentColor: "bg-purple-600",
              delay: 0.1
            },
            {
              icon: Award,
              value: homeStats?.accreditation || "Unggul",
              label: "Akreditasi",
              iconColor: "text-emerald-600 dark:text-emerald-400",
              bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
              accentColor: "bg-emerald-600",
              delay: 0.2
            },
            {
              icon: BookOpen,
              value: homeStats?.totalLecturers || "500+",
              label: "Dosen Pengajar",
              iconColor: "text-orange-600 dark:text-orange-400",
              bgColor: "bg-orange-100 dark:bg-orange-500/20",
              accentColor: "bg-orange-600",
              delay: 0.3
            }
          ].map((stat, index) => (
            <MotionDiv
              key={index}
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

      {/* Kata Sambutan Rektor */}
      <div className="container mx-auto px-4 pt-8 pb-20 md:py-20 relative z-10">
        <div className="text-center">
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-12 tracking-tight">Kata Sambutan Rektor</h2>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-cyber blur-3xl opacity-30 rounded-full animate-pulse"></div>
              <div className="relative z-10 p-1.5 rounded-full bg-gradient-to-tr from-cyber-blue via-white/20 to-electric-purple shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 cursor-pointer group-hover:ring-4 ring-cyber-blue/30 transition-all duration-300">
                      <img
                        src={rectorMessage?.photo || "/images/rektor.png"}
                        alt={rectorMessage?.name || "Foto Rektor"}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none text-center flex items-center justify-center">
                    <DialogTitle className="sr-only">Foto Rektor</DialogTitle>
                    <DialogDescription className="sr-only">
                      Foto lengkap {rectorMessage?.name || "Rektor"}
                    </DialogDescription>
                    <div className="relative w-auto h-auto max-h-[85vh]">
                      <img
                        src={rectorMessage?.photo || "/images/rektor.png"}
                        alt={rectorMessage?.name || "Foto Rektor Full"}
                        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white/10"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-10 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-40 h-40 bg-cyber-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-electric-purple/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 max-w-5xl mx-auto">
                {/* Tanda Kutip Pembuka */}
                <span className="text-7xl md:text-8xl text-cyber-blue/10 font-serif leading-none absolute -top-10 -left-4 md:-left-8 select-none">"</span>

                <div className="space-y-6 md:space-y-8 px-4 md:px-12">
                  <p className="text-foreground/90 text-lg font-bold italic">
                    Assalamualaikum Wr. Wb.
                  </p>

                  <div className="text-foreground/80 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line text-justify break-words [hyphens:auto] [text-wrap:pretty]">
                    {rectorMessage?.message || "Universitas kami berkomitmen untuk menciptakan lulusan yang tidak hanya cerdas secara akademik, tetapi juga memiliki integritas, kreativitas, dan jiwa kepemimpinan yang kuat untuk menghadapi tantangan global."}
                  </div>

                  <p className="text-foreground/90 text-lg font-bold italic">
                    Wassalamualaikum Wr. Wb.
                  </p>
                </div>

                {/* Bagian Nama & Jabatan */}
                <div className="mt-12 space-y-2 relative">
                  <div className="w-16 h-0.5 bg-gradient-cyber mx-auto mb-6 opacity-30 rounded-full"></div>
                  <div className="space-y-1">
                    <p className="text-foreground text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                      {rectorMessage?.name || "Prof. Dr. H. Ahmad Fauzi, M.Sc."}
                    </p>
                    <p className="text-cyber-blue font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
                      {rectorMessage?.position || "Rektor Universitas"}
                    </p>
                  </div>
                </div>

                {/* Tanda Kutip Penutup */}
                <span className="text-7xl md:text-8xl text-cyber-blue/10 font-serif leading-none absolute -bottom-12 -right-4 md:-right-8 select-none rotate-180">"</span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>

      {/* Berita Terbaru */}
      <HomeNewsSection latestNews={latestNews} locale={locale} uniProfile={uniProfile} />

      {/* Upcoming Events */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Events Mendatang</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-purple to-cyber-blue rounded-full"></div>
          </div>
          <Button asChild className="rounded-full px-8 h-11 font-bold group shadow-xl hover:scale-105 transition-all duration-300">
            <Link href={`/${locale}/berita-media/events`}>
              Lihat Semua Events
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <MotionDiv
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-[2rem] border border-white/10 hover:shadow-[0_20px_40px_rgba(179,118,255,0.1)] transition-all duration-500 overflow-hidden flex flex-col group h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.poster || "https://images.unsplash.com/photo-1540575861501-7ad05823c951?q=80&w=2070&auto=format&fit=crop"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <Badge className="bg-electric-purple/20 text-electric-purple border-electric-purple/30 backdrop-blur-md">Events</Badge>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyber-blue uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.startDate ? new Date(event.startDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : 'Akan datang'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-foreground/50 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location || event.venue || 'Kampus'}
                  </div>
                </div>

                <h3 className="font-bold text-xl text-foreground mb-4 line-clamp-2 group-hover:text-electric-purple transition-colors">
                  {event.title}
                </h3>

                <p className="text-foreground/60 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {event.description || (event.content ? event.content.substring(0, 100) + '...' : 'Ikuti kegiatan kampus yang menarik dan bermanfaat ini.')}
                </p>

                <div className="mt-auto">
                  <Button asChild className="w-full rounded-full h-11 font-bold group/btn shadow-md hover:scale-[1.02] transition-all duration-300">
                    <Link href={`/${locale}/berita-media/events#event-${event.id}`}>
                      Lihat Detail Events
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-24 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Kata Alumni & Mahasiswa</h2>
            <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full mb-6"></div>
            <p className="text-foreground/60 max-w-2xl mx-auto">Apa kata mereka tentang pengalaman belajar dan bertumbuh di universitas kami.</p>
          </MotionDiv>

          <TestimonialsCarousel testimonials={testimonials as any[]} />
        </div>
      </div>

      {/* Kemitraan  */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-5">Kemitraan & Kerjasama Kami</h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full"></div>
        </MotionDiv>

        <PartnersCarousel partners={partners} />
      </div>
    </div>
  );
}