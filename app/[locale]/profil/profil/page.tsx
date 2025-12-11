"use client";

import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Target,
  Eye,
  Award,
  Users,
  Building2,
  Globe,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n-helper';

export default function ProfilBerandaPage() {
  const t = useTranslations('Navigation.submenus');

  // Static data for university logo and its meaning
  const universityLogoSrc = "/images/logo_univ.png";
  const logoMeaning = [
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

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for logo, name, and moto */}
      <div
        className="relative bg-[url('/images/backround_profil.png')] bg-cover bg-center bg-no-repeat mb-16 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">

              {/* University Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-8"
              >
                <Image
                  src="/images/logo_univ.png"
                  alt="University Logo"
                  width={180}
                  height={180}
                  unoptimized
                  className="mx-auto object-contain rounded-full shadow-lg p-2 border-2 border-cyber-blue/50 bg-background/50 backdrop-blur-sm"
                  priority
                />
                {/* University Name */}
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-cyber mt-4">
                  Universitas Name
                </h2>
              </motion.div>

              {/* Moto Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mb-12"
              >
                <div className="text-center">
                  <p className="text-2xl italic font-semibold text-foreground/80 max-w-4xl mx-auto">
                    {"\""}Mencerdaskan Kehidupan Bangsa dan Membangun Karakter Digital untuk Masa Depan{"\""}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

         {/* Achievement Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="glass-card p-8 rounded-2xl border mb-12"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber text-center mb-10">Prestasi & Penghargaan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">150+</div>
              <div className="text-foreground/60 text-sm">Program Studi</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">25K+</div>
              <div className="text-foreground/60 text-sm">Mahasiswa</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">500+</div>
              <div className="text-foreground/60 text-sm">Dosen Tercertifikasi</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">50+</div>
              <div className="text-foreground/60 text-sm">Patner Internasional</div>
            </div>
          </div>
        </motion.section>

          


        {/* History Section with Futuristic Cards */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass-card p-8 mb-16 rounded-2xl border"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-4">Sejarah Universitas</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Perjalanan panjang menuju keunggulan pendidikan tinggi di Indonesia, dengan komitmen untuk terus berkembang dan berinovasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-card p-6 rounded-xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyber-blue to-electric-purple flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <GraduationCap className="w-8 h-8 text-foreground/90" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">1974</h3>
                <p className="text-foreground/70">Berdiri sebagai Institut Teknologi</p>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 rounded-xl border hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-electric-purple to-neon-green flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(179,118,255,0.3)]">
                  <Building2 className="w-8 h-8 text-foreground/90" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">1985</h3>
                <p className="text-foreground/70">Berubah menjadi Universitas</p>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 rounded-xl border hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-green to-cyber-blue flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                  <Award className="w-8 h-8 text-foreground/90" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">2000</h3>
                <p className="text-foreground/70">Mendapat Akreditasi A</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 glass-card p-6 rounded-xl border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-foreground/70 text-lg leading-relaxed">
              Universitas ini berdiri pada tahun 1974 dengan komitmen untuk memberikan pendidikan berkualitas
              tinggi kepada masyarakat. Bermula dari sebuah lembaga pendidikan kecil, kini berkembang menjadi
              salah satu universitas terkemuka di Indonesia dengan berbagai program studi unggulan dan fasilitas
              modern yang mendukung proses belajar mengajar. Melalui transformasi digital dan integrasi teknologi
              mutakhir, kami terus berinovasi untuk mencetak lulusan yang siap menghadapi tantangan era digital.
            </p>
          </motion.div>
        </motion.section>

        {/* Vision & Mission with Futuristic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div
            className="glass-card p-8 rounded-2xl border"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ boxShadow: "0 0 30px rgba(0,240,255,0.2)" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyber-blue to-electric-purple flex items-center justify-center">
                <Eye className="w-6 h-6 text-foreground/90" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">Visi</h2>
            </div>
            <p className="text-foreground/70 text-lg leading-relaxed italic border-l-4 border-cyber-blue pl-4 ml-2">
              {"\""}Menjadi universitas riset unggulan bertaraf internasional yang menghasilkan sumber daya manusia
              yang berdaya saing global, berjiwa kewirausahaan, serta berwawasan lingkungan dan kebangsaan,
              dengan integrasi teknologi mutakhir dalam setiap aspek pendidikan.{"\""}
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-8 rounded-2xl border"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ boxShadow: "0 0 30px rgba(179,118,255,0.2)" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electric-purple to-neon-green flex items-center justify-center">
                <Target className="w-6 h-6 text-foreground/90" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">Misi</h2>
            </div>
            <ul className="space-y-4 text-foreground/70">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyber-blue mt-2 flex-shrink-0"></div>
                <span>Menyelenggarakan pendidikan tinggi yang berkualitas dan berdaya saing global dengan integrasi teknologi mutakhir</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-purple mt-2 flex-shrink-0"></div>
                <span>Menyelenggarakan penelitian unggul dan inovatif yang bermanfaat bagi pengembangan ilmu pengetahuan dan kemajuan teknologi</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-green mt-2 flex-shrink-0"></div>
                <span>Menyelenggarakan pengabdian kepada masyarakat berbasis ipteks dan teknologi digital</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-pink mt-2 flex-shrink-0"></div>
                <span>Mengembangkan tata pamong organisasi yang baik sesuai dengan prinsip good university governance dan digital transformation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-blue to-electric-purple mt-2 flex-shrink-0"></div>
                <span>Membentuk ekosistem inovasi dan kewirausahaan berbasis teknologi informasi dan digitalisasi</span>
              </li>
            </ul>
          </motion.div>
        </div>

       
        {/* Values Section with Futuristic Icons */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="glass-card p-8 rounded-2xl border mb-16"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber text-center mb-12">Nilai-Nilai Universitas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyber-blue to-electric-purple flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300">
                <Shield className="w-10 h-10 text-foreground/90" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Integritas</h3>
              <p className="text-sm text-foreground/60">Berpegang teguh pada kebenaran dan kejujuran dalam dunia digital</p>
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-electric-purple to-neon-green flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(179,118,255,0.3)] group-hover:shadow-[0_0_30px_rgba(179,118,255,0.5)] transition-all duration-300">
                <Users className="w-10 h-10 text-foreground/90" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Kolaborasi</h3>
              <p className="text-sm text-foreground/60">Bekerja sama untuk mencapai tujuan bersama dalam ekosistem digital</p>
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-green to-cyber-blue flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(57,255,20,0.3)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all duration-300">
                <Zap className="w-10 h-10 text-foreground/90" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Inovasi</h3>
              <p className="text-sm text-foreground/60">Terus berkembang dan menciptakan solusi digital terbaru</p>
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-pink to-cyber-blue flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,0,110,0.3)] group-hover:shadow-[0_0_30px_rgba(255,0,110,0.5)] transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-foreground/90" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Ekselensi</h3>
              <p className="text-sm text-foreground/60">Berusaha memberikan yang terbaik dalam pendidikan digital</p>
            </motion.div>
          </div>
        </motion.section>
         {/* Logo Meaning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="glass-card p-6 rounded-2xl border mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-6">Makna Logo Universitas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {logoMeaning.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.element}</h4>
                    <p className="text-sm text-muted-foreground">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

      </div>
  );
}