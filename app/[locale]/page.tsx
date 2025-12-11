"use client";

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
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n-helper';

export default function Home() {
  const t = useTranslations('HomePage');

  // Data berita terbaru untuk ditampilkan di halaman beranda
  const latestNews = [
    {
      id: 1,
      title: "Pengumuman Wisuda Tahun 2024",
      date: "15 November 2024",
      excerpt: "Pelaksanaan wisuda tahun ini akan dilaksanakan pada bulan Desember..."
    },
    {
      id: 2,
      title: "Perpanjangan Jadwal Pembayaran UKT",
      date: "10 November 2024",
      excerpt: "Mahasiswa diberikan waktu tambahan untuk pembayaran UKT..."
    },
    {
      id: 3,
      title: "Kunjungan Industri ke PT. Tech Innovations",
      date: "5 November 2024",
      excerpt: "Mahasiswa Teknik Informatika melakukan kunjungan industri..."
    }
  ];

  // Data upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Seminar Nasional Teknologi",
      date: "20 November 2024",
      time: "09:00 - 12:00",
      location: "Auditorium Utama"
    },
    {
      id: 2,
      title: "Pelatihan Soft Skills",
      date: "25 November 2024",
      time: "13:00 - 16:00",
      location: "Gedung Serba Guna"
    },
    {
      id: 3,
      title: "Pameran Karya Mahasiswa",
      date: "30 November 2024",
      time: "08:00 - 17:00",
      location: "Halaman Kampus"
    }
  ];

  // Data testimonial
  const testimonials = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      role: "Alumni Teknik Informatika 2020",
      content: "Kampus ini memberikan pengalaman pendidikan yang luar biasa dengan fasilitas modern dan dosen yang kompeten.",
      image: "/images/testimoni.png"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      role: "Mahasiswa Sistem Informasi 2021",
      content: "Lingkungan akademik yang mendukung dan berbagai kegiatan kemahasiswaan membuat saya berkembang secara holistik.",
      image: "/images/testimoni.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background grid dengan opacity minimal */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-0" />

      {/* Gradient orbs dengan opacity minimal */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/2 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/2 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center overflow-hidden z-10">
          <div className="container mx-auto px-4 relative z-10 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-cyber">
                    {t('heroTitle')}
                  </span>
                </h1>
                <p className="text-xl text-foreground/70 mb-8 max-w-lg">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden glass-card border border-white/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-cyber flex items-center justify-center">
                    <div className="text-center relative z-10">
                      <motion.div
                        className="mx-auto mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <Play className="w-16 h-16 text-foreground mx-auto" />
                      </motion.div>
                      <p className="text-foreground text-lg">Video Profil Kampus</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section with Futuristic Cards */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: GraduationCap, value: "50+", label: t('stats.years'), delay: 0 },
              { icon: Users, value: "15K+", label: t('stats.students'), delay: 0.1 },
              { icon: Award, value: "500+", label: t('stats.lecturers'), delay: 0.2 },
              { icon: Target, value: "50+", label: t('stats.programs'), delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-xl border border-white/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10"></div>
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <stat.icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">{stat.value}</div>
                <div className="text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kata Sambutan Rektor */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t('rectorMessage')}</h2>
            <Card className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-lg border border-white/20">
              <img src="/images/rektor.png" alt="Foto Rektor" className="w-full h-full object-contain" />
            </Card>
            <motion.div
              className="glass-card p-8 rounded-2xl border border-white/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-electric-purple/5 rounded-2xl -z-10"></div>
              <p className="text-foreground/70 text-lg italic mb-6 relative z-10">
                {"\""}{t('rectorQuote')}{"\""}
              </p>
              <p className="text-foreground font-semibold relative z-10">{t('rectorName')}</p>
              <p className="text-foreground/60 relative z-10">{t('rectorTitle')}</p>
            </motion.div>
          </div>
        </div>

        {/* Berita Terbaru */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground">{t('latestNews')}</h2>
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 relative overflow-hidden group">
              <span className="relative z-10">{t('viewAll')}</span>
              <ChevronRight className="w-4 h-4 ml-2 relative z-10" />
              <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10"></div>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card p-6 rounded-2xl border border-white/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 h-full cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity -z-10"></div>
                <div className="flex items-center gap-3 mb-3">
                  <Newspaper className="w-5 h-5 text-cyber-blue" />
                  <span className="text-sm text-foreground/60">{news.date}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-cyber-blue transition-colors">{news.title}</h3>
                <p className="text-foreground/70 mb-4">{news.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto text-cyber-blue hover:text-foreground">
                  {t('readMore')}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-10"
            >
              <h2 className="text-3xl font-bold text-foreground">{t('upcomingEvents')}</h2>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 relative overflow-hidden group">
                <span className="relative z-10">{t('viewCalendar')}</span>
                <ChevronRight className="w-4 h-4 ml-2 relative z-10" />
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10"></div>
              </Button>
            </motion.div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/5 to-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  <div className="flex items-start">
                    <div className="bg-gradient-cyber text-foreground rounded-lg p-4 mr-6 relative overflow-hidden">
                      <Calendar className="w-6 h-6 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-cyber opacity-30 blur-xl -z-10"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-cyber-blue transition-colors">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('testimonials')}</h2>
              <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 h-full rounded-2xl border border-white/20 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>

                  <div className="flex items-center gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/70 italic mb-6 relative z-10">{"\""}{testimonial.content}{"\""}</p>
                  <div className="flex items-center gap-4 relative z-10 mt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyber-blue shadow-md flex-shrink-0">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('partners')}</h2>
            <div className="w-24 h-1 bg-gradient-cyber mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Google', 'Microsoft', 'IBM', 'Intel'].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass-card p-6 rounded-2xl border border-white/20 flex items-center justify-center h-24 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity -z-10"></div>
                <div className="text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-cyber rounded-full mx-auto mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-shadow">
                    <span className="text-foreground font-bold text-lg">{partner.charAt(0)}</span>
                  </div>
                  <p className="font-semibold text-foreground group-hover:text-cyber-blue transition-colors">{partner}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}