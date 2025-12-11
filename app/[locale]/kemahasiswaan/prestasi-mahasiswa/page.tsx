"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  GraduationCap,
  Trophy,
  Star,
  Users,
  BookOpen,
  Target,
  Calendar,
  FileText,
  Download,
  Globe,
  Heart,
  Medal,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PrestasiMahasiswaPage() {
  // Data prestasi akademik
  const prestasiAkademik = [
    {
      id: 1,
      nama: "Ahmad Saputra",
      prodi: "Teknik Informatika",
      jenisPrestasi: "Akademik",
      kategori: "Indeks Prestasi Kumulatif",
      tingkat: "Universitas",
      pencapaian: "IPK Tertinggi 3.95",
      tahun: 2024,
      penghargaan: "Mahasiswa Berprestasi Universitas 2024",
      deskripsi: "Mencapai IPK tertinggi selama 4 tahun perkuliahan dengan prestasi akademik luar biasa",
      dokumentasi: ["sertifikat-1.jpg", "foto-kegiatan-1.jpg", "berita-1.jpg"],
      prioritas: "tinggi",
      icon: GraduationCap
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      prodi: "Manajemen",
      jenisPrestasi: "Akademik",
      kategori: "Publikasi Ilmiah",
      tingkat: "Internasional",
      pencapaian: "Publikasi Jurnal Internasional",
      tahun: 2023,
      penghargaan: "Best Paper Award",
      deskripsi: "Mempublikasikan penelitian tentang manajemen strategi di jurnal internasional terindeks SCOPUS",
      dokumentasi: ["jurnal-3.jpg", "sertifikat-3.jpg", "berita-3.jpg"],
      prioritas: "tinggi",
      icon: BookOpen
    },
    {
      id: 3,
      nama: "Budi Santoso",
      prodi: "Ilmu Hukum",
      jenisPrestasi: "Akademik",
      kategori: "Kompetisi Hukum",
      tingkat: "Nasional",
      pencapaian: "Juara 1 Lomba Debat Hukum",
      tahun: 2024,
      penghargaan: "Atlet Debat Terbaik",
      deskripsi: "Menjuarai kompetisi debat hukum tingkat nasional dengan argumen yang tajam dan logis",
      dokumentasi: ["sertifikat-2.jpg", "foto-kegiatan-2.jpg", "berita-2.jpg"],
      prioritas: "sedang",
      icon: Target
    }
  ];

  // Data prestasi non-akademik
  const prestasiNonAkademik = [
    {
      id: 1,
      nama: "Dewi Anggraini",
      prodi: "Kedokteran",
      jenisPrestasi: "Non-Akademik",
      kategori: "Olahraga",
      tingkat: "Regional",
      pencapaian: "Juara 1 Lomba Bulu Tangkis Mahasiswa",
      tahun: 2023,
      penghargaan: "Atlet Muda Berprestasi",
      deskripsi: "Menjuarai kompetisi olahraga tingkat wilayah Jawa Tengah dalam cabang bulu tangkis",
      dokumentasi: ["sertifikat-4.jpg", "foto-kegiatan-4.jpg", "berita-4.jpg"],
      prioritas: "sedang",
      icon: Star
    },
    {
      id: 2,
      nama: "Rizki Pratama",
      prodi: "Teknik Elektro",
      jenisPrestasi: "Non-Akademik",
      kategori: "Kewirausahaan",
      tingkat: "Nasional",
      pencapaian: "Juara 1 Kompetisi Startup Mahasiswa",
      tahun: 2024,
      penghargaan: "Best Student Startup Founder",
      deskripsi: "Berhasil mengembangkan aplikasi UMKM yang memenangkan kompetisi tingkat nasional",
      dokumentasi: ["sertifikat-5.jpg", "foto-kegiatan-5.jpg", "berita-5.jpg"],
      prioritas: "tinggi",
      icon: Users
    },
    {
      id: 3,
      nama: "Intan Permata",
      prodi: "Seni Rupa",
      jenisPrestasi: "Non-Akademik",
      kategori: "Seni & Budaya",
      tingkat: "Internasional",
      pencapaian: "Juara 1 Festival Seni Mahasiswa Internasional",
      tahun: 2023,
      penghargaan: "Seniman Muda Terbaik",
      deskripsi: "Membawa karya seni tradisional yang mendunia dalam festival seni internasional",
      dokumentasi: ["sertifikat-6.jpg", "foto-kegiatan-6.jpg", "berita-6.jpg"],
      prioritas: "tinggi",
      icon: Heart
    }
  ];

  // Data profil mahasiswa berprestasi
  const profilBerprestasi = [
    {
      id: 1,
      nama: "Ahmad Saputra",
      prodi: "Teknik Informatika",
      fakultas: "Teknik",
      prestasiUnggulan: "IPK Tertinggi 3.95",
      tahunPrestasi: 2024,
      deskripsi: "Mahasiswa dengan prestasi akademik tertinggi selama 4 tahun kuliah, aktif dalam penelitian dan pengembangan perangkat lunak.",
      tips: "Disiplin dan konsisten adalah kunci sukses dalam mengejar prestasi akademik.",
      foto: "ahmad-saputra.jpg"
    },
    {
      id: 2,
      nama: "Intan Permata",
      prodi: "Seni Rupa",
      fakultas: "Seni & Desain",
      prestasiUnggulan: "Juara Festival Seni Mahasiswa Internasional",
      tahunPrestasi: 2023,
      deskripsi: "Kreator muda yang membawa seni tradisional ke panggung internasional melalui karyanya yang inovatif.",
      tips: "Jangan pernah takut untuk mengekspresikan kreativitas dan membawa budaya lokal ke panggung dunia.",
      foto: "intan-permata.jpg"
    }
  ];

  const kategoriPrestasi = [
    { id: 'akademik', name: 'Akademik', icon: GraduationCap, count: 45 },
    { id: 'non-akademik', name: 'Non-Akademik', icon: Star, count: 38 },
    { id: 'internasional', name: 'Internasional', icon: Globe, count: 12 },
    { id: 'nasional', name: 'Nasional', icon: Award, count: 28 },
    { id: 'regional', name: 'Regional', icon: Medal, count: 15 },
    { id: 'universitas', name: 'Universitas', icon: Target, count: 25 }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            Prestasi <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Mahasiswa</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Kumpulan prestasi dan penghargaan yang diraih oleh mahasiswa universitas
          </p>
        </motion.div>

        {/* Filter Kategori */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Prestasi</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriPrestasi.map((kategori) => {
              const IconComponent = kategori.icon;
              return (
                <Button
                  key={kategori.id}
                  variant="outline"
                  className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <IconComponent className="w-4 h-4" />
                  {kategori.name} ({kategori.count})
                </Button>
              );
            })}
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Lihat Semua</Button>
          </div>
        </motion.div>

        {/* Prestasi Akademik */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Prestasi Akademik</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {prestasiAkademik.map((prestasi, index) => {
              const IconComponent = prestasi.icon;
              return (
                <motion.div
                  key={prestasi.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <IconComponent className="w-6 h-6 text-foreground/90" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{prestasi.nama}</h3>
                        <Badge variant="outline" className="border-electric-purple text-electric-purple bg-electric-purple/20">
                          {prestasi.kategori}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{prestasi.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Prodi</span>
                        <span className="font-semibold text-foreground">{prestasi.prodi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tingkat</span>
                        <span className="font-semibold text-foreground">{prestasi.tingkat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tahun</span>
                        <span className="font-semibold text-foreground">{prestasi.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Penghargaan</span>
                        <span className="font-semibold text-sm text-foreground">{prestasi.penghargaan}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Pencapaian:</span>
                      <p className="font-semibold bg-clip-text text-transparent bg-gradient-cyber">{prestasi.pencapaian}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Detail Prestasi
                      </Button>
                      <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                        <Download className="w-4 h-4 mr-2" />
                        Dokumentasi
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Prestasi Non-Akademik */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Prestasi Non-Akademik</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {prestasiNonAkademik.map((prestasi, index) => {
              const IconComponent = prestasi.icon;
              return (
                <motion.div
                  key={prestasi.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 3) }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                        <IconComponent className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{prestasi.nama}</h3>
                        <Badge variant="outline" className="border-neon-green text-neon-green bg-neon-green/20">
                          {prestasi.kategori}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{prestasi.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Prodi</span>
                        <span className="font-semibold text-foreground">{prestasi.prodi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tingkat</span>
                        <span className="font-semibold text-foreground">{prestasi.tingkat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tahun</span>
                        <span className="font-semibold text-foreground">{prestasi.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Penghargaan</span>
                        <span className="font-semibold text-sm text-foreground">{prestasi.penghargaan}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Pencapaian:</span>
                      <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">{prestasi.pencapaian}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Detail Prestasi
                      </Button>
                      <Button variant="outline" className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple/10">
                        <Download className="w-4 h-4 mr-2" />
                        Dokumentasi
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mahasiswa Berprestasi */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Mahasiswa Berprestasi</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profilBerprestasi.map((profil, index) => (
              <motion.div
                key={profil.id}
                className="glass-card rounded-2xl border p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 6) }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-foreground text-xl font-bold shadow-[0_0_20px_rgba(245,101,101,0.3)]">
                    {profil.nama.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{profil.nama}</h3>
                    <p className="text-muted-foreground">{profil.prodi}, {profil.fakultas}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">Prestasi Unggulan</span>
                  <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">{profil.prestasiUnggulan}</p>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">Deskripsi</span>
                  <p className="text-muted-foreground">{profil.deskripsi}</p>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">Tips & Motivasi</span>
                  <p className="italic text-muted-foreground">"{profil.tips}"</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tahun: {profil.tahunPrestasi}</span>
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-[0_0_20px_rgba(245,101,101,0.3)]">
                    <Award className="w-4 h-4 mr-2" />
                    Profil Lengkap
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prestasi Tahunan */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Rekapitulasi Prestasi Tahunan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tahun: "2024", akademik: 18, nonAkademik: 15, internasional: 4, nasional: 8 },
              { tahun: "2023", akademik: 16, nonAkademik: 12, internasional: 3, nasional: 6 },
              { tahun: "2022", akademik: 14, nonAkademik: 10, internasional: 2, nasional: 5 }
            ].map((tahun, index) => (
              <div key={index} className="glass-card p-4 rounded-xl border">
                <h3 className="text-lg font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-cyber">{tahun.tahun}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Akademik:</span>
                    <span className="font-bold text-foreground">{tahun.akademik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Non-Akademik:</span>
                    <span className="font-bold text-foreground">{tahun.nonAkademik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Internasional:</span>
                    <span className="font-bold text-foreground">{tahun.internasional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nasional:</span>
                    <span className="font-bold text-foreground">{tahun.nasional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
