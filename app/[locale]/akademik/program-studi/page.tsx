"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Award,
  Users,
  Building2,
  Target,
  FileText,
  Download,
  BookOpen,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ProgramStudiPage() {
  // Data program studi
  const programStudi = [
    {
      id: 1,
      nama: "Teknik Informatika",
      jenjang: "S1",
      fakultas: "Fakultas Teknik",
      akreditasi: "A",
      deskripsi: "Program studi yang fokus pada pengembangan perangkat lunak, kecerdasan buatan, dan sistem informasi.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 45,
      prospek: ["Software Engineer", "Data Scientist", "System Analyst"],
      fasilitas: ["Laboratorium Pemrograman", "Laboratorium Jaringan", "Laboratorium AI"],
      akreditasiTanggal: "2022 - 2027"
    },
    {
      id: 2,
      nama: "Sistem Informasi",
      jenjang: "S1",
      fakultas: "Fakultas Ilmu Komputer",
      akreditasi: "A",
      deskripsi: "Program studi yang menggabungkan teknologi informasi dengan manajemen bisnis.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 38,
      prospek: ["Business Analyst", "System Analyst", "IT Consultant"],
      fasilitas: ["Laboratorium Sistem Informasi", "Laboratorium Database", "Laboratorium ERP"],
      akreditasiTanggal: "2023 - 2028"
    },
    {
      id: 3,
      nama: "Manajemen",
      jenjang: "S1",
      fakultas: "Fakultas Ekonomi",
      akreditasi: "A",
      deskripsi: "Program studi yang menyiapkan lulusan untuk karir di bidang manajemen dan bisnis.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 42,
      prospek: ["Manager", "Entrepreneur", "Business Consultant"],
      fasilitas: ["Laboratorium Manajemen", "Ruang Presentasi", "Perpustakaan Bisnis"],
      akreditasiTanggal: "2022 - 2027"
    },
    {
      id: 4,
      nama: "Akuntansi",
      jenjang: "S1",
      fakultas: "Fakultas Ekonomi",
      akreditasi: "A",
      deskripsi: "Program studi yang menyiapkan lulusan dalam bidang pelaporan keuangan dan audit.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 35,
      prospek: ["Akuntan Publik", "Auditor", "Staff Keuangan"],
      fasilitas: ["Laboratorium Akuntansi", "Laboratorium Perpajakan", "Ruang Audit"],
      akreditasiTanggal: "2023 - 2028"
    },
    {
      id: 5,
      nama: "Ilmu Hukum",
      jenjang: "S1",
      fakultas: "Fakultas Hukum",
      akreditasi: "B",
      deskripsi: "Program studi yang menyiapkan lulusan dalam bidang hukum dan perundang-undangan.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 32,
      prospek: ["Advokat", "Hakim", "Jaksa", "Notaris"],
      fasilitas: ["Laboratorium Hukum", "Ruang Sidang", "Perpustakaan Hukum"],
      akreditasiTanggal: "2023 - 2028"
    },
    {
      id: 6,
      nama: "Teknik Elektro",
      jenjang: "S1",
      fakultas: "Fakultas Teknik",
      akreditasi: "B",
      deskripsi: "Program studi yang menekankan pada teknologi listrik, elektronika, dan sistem kendali.",
      kurikulum: "2020 (Kurikulum Merdeka Belajar)",
      dosen: 38,
      prospek: ["Insinyur Elektro", "Teknisi", "Peneliti"],
      fasilitas: ["Laboratorium Elektronika", "Laboratorium Kendali", "Laboratorium Daya"],
      akreditasiTanggal: "2022 - 2027"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_program_studi.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                Program Studi
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
                Informasi lengkap tentang program studi yang tersedia di universitas kami dengan akreditasi terbaik dan kurikulum terkini
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Statistik Program Studi */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <GraduationCap className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              6
            </div>
            <div className="text-foreground/70 text-sm">Program Studi</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Award className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              4
            </div>
            <div className="text-foreground/70 text-sm">Akreditasi A</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Users className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              240+
            </div>
            <div className="text-foreground/70 text-sm">Dosen Pengampu</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <BookOpen className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              2020
            </div>
            <div className="text-foreground/70 text-sm">Kurikulum Merdeka</div>
          </div>
        </motion.div>

        {/* Daftar Program Studi */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Daftar Program Studi</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">S1</Button>
              <Button variant="outline" className="border-electric-purple text-electric-purple hover:bg-electric-purple/10">S2</Button>
              <Button variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green/10">D3</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programStudi.map((prodi, index) => (
              <motion.div
                key={prodi.id}
                className="glass-card rounded-2xl border border-white/20 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{prodi.nama}</h3>
                      <p className="text-cyber-blue font-semibold">{prodi.fakultas}</p>
                    </div>
                    <Badge className={`${prodi.akreditasi === 'A' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
                      <Award className="w-3 h-3 mr-1" />
                      {prodi.akreditasi}
                    </Badge>
                  </div>

                  <p className="text-foreground/70 mb-4">{prodi.deskripsi}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-foreground/60">Jenjang</span>
                      <p className="font-semibold text-foreground">{prodi.jenjang}</p>
                    </div>
                    <div>
                      <span className="text-sm text-foreground/60">Kurikulum</span>
                      <p className="font-semibold text-foreground">{prodi.kurikulum}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-foreground/60">Dosen</span>
                      <p className="font-semibold text-foreground">{prodi.dosen}+</p>
                    </div>
                    <div>
                      <span className="text-sm text-foreground/60">Akreditasi</span>
                      <p className="font-semibold text-foreground">{prodi.akreditasiTanggal}</p>
                    </div>
                    <div>
                      <span className="text-sm text-foreground/60">Fasilitas</span>
                      <p className="font-semibold text-foreground">{prodi.fasilitas.length} Lab</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 px-2 py-1 rounded">
                      Merdeka Belajar
                    </span>
                    <span className="text-xs bg-electric-purple/20 text-electric-purple border border-electric-purple/30 px-2 py-1 rounded">
                      Praktik Kerja
                    </span>
                    <span className="text-xs bg-accent-pink/20 text-accent-pink border border-accent-pink/30 px-2 py-1 rounded">
                      Magang
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {prodi.prospek.slice(0, 3).map((prospek, idx) => (
                      <span key={idx} className="text-xs bg-gradient-cyber text-foreground/90 px-2 py-1 rounded">
                        {prospek}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <FileText className="w-4 h-4 mr-2" />
                      Kurikulum
                    </Button>
                    <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <Download className="w-4 h-4 mr-2" />
                      Brosur
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prospek Karir */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Prospek Karir Lulusan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { bidang: "Teknologi Informasi", min: "8", max: "15", satuan: "juta" },
              { bidang: "Manajemen", min: "6", max: "12", satuan: "juta" },
              { bidang: "Hukum", min: "5", max: "10", satuan: "juta" },
              { bidang: "Akuntansi", min: "5", max: "9", satuan: "juta" },
              { bidang: "Pendidikan", min: "4", max: "8", satuan: "juta" },
              { bidang: "Riset", min: "6", max: "12", satuan: "juta" }
            ].map((prospek, index) => (
              <div key={index} className="glass-card p-6 text-center rounded-2xl border border-white/20">
                <h3 className="font-bold text-lg text-foreground mb-2">{prospek.bidang}</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
                  Rp {prospek.min} - {prospek.max} {prospek.satuan}
                </p>
                <p className="text-sm text-foreground/70">Gaji Rata-rata Per Bulan</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}