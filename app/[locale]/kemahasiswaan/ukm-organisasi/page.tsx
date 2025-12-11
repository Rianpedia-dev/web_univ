"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  Trophy,
  BookOpen,
  Award,
  Star,
  Heart,
  Building2,
  Music,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function UKMOrganisasiPage() {
  // Data UKM Akademik
  const ukmAkademik = [
    {
      id: 1,
      nama: "Keluarga Mahasiswa Teknik (KMT)",
      kategori: "Akademik",
      deskripsi: "Organisasi mahasiswa di lingkungan Fakultas Teknik",
      jumlahAnggota: 350,
      tahunBerdiri: 1995,
      fakultas: "Teknik",
      status: "aktif",
      kegiatanUtama: ["Seminar Teknik", "Kompetisi Robotika", "Pekan Ilmiah"],
      pencapaian: ["Juara 1 PIMNAS 2023", "Best Organization 2024"],
      kontak: "kmt@university.ac.id",
      icon: GraduationCap
    },
    {
      id: 2,
      nama: "Keluarga Mahasiswa Ekonomi (KME)",
      kategori: "Akademik",
      deskripsi: "Organisasi mahasiswa di lingkungan Fakultas Ekonomi",
      jumlahAnggota: 280,
      tahunBerdiri: 1998,
      fakultas: "Ekonomi",
      status: "aktif",
      kegiatanUtama: ["Business Plan Competition", "Seminar Ekonomi", "Study Tour"],
      pencapaian: ["Juara 2 Kompetisi Bisnis Nasional", "Best Paper 2023"],
      kontak: "kme@university.ac.id",
      icon: BookOpen
    },
    {
      id: 3,
      nama: "Keluarga Mahasiswa Hukum (KMH)",
      kategori: "Akademik",
      deskripsi: "Organisasi mahasiswa di lingkungan Fakultas Hukum",
      jumlahAnggota: 220,
      tahunBerdiri: 2000,
      fakultas: "Hukum",
      status: "aktif",
      kegiatanUtama: ["Sidang Mahkamah Konstitusi", "Kompetisi Debat Hukum", "Advokasi"],
      pencapaian: ["Juara 1 Debat Hukum Nasional 2023", "Advokasi Terbaik 2024"],
      kontak: "kmh@university.ac.id",
      icon: Award
    }
  ];

  // Data UKM Non-Akademik
  const ukmNonAkademik = [
    {
      id: 1,
      nama: "Unit Kegiatan Olahraga (UKO)",
      kategori: "Non-Akademik",
      deskripsi: "Unit kegiatan untuk mengembangkan minat di bidang olahraga",
      jumlahAnggota: 400,
      tahunBerdiri: 2005,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Turnamen Antar Fakultas", "Pelatihan Atlet", "Event Kejuaraan"],
      pencapaian: ["Juara Umum Porsekam 2023", "Atlet Berprestasi 2024"],
      kontak: "uko@university.ac.id",
      icon: Star
    },
    {
      id: 2,
      nama: "Unit Kegiatan Seni & Budaya (UKSB)",
      kategori: "Non-Akademik",
      deskripsi: "Unit kegiatan untuk mengembangkan bakat seni dan budaya",
      jumlahAnggota: 180,
      tahunBerdiri: 2003,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Festival Seni Kampus", "Pentas Seni", "Pelatihan Seni"],
      pencapaian: ["Juara 1 Festival Musik Mahasiswa 2023", "Tarian Tradisional Terbaik 2024"],
      kontak: "uksb@university.ac.id",
      icon: Music
    },
    {
      id: 3,
      nama: "Unit Kegiatan Keagamaan",
      kategori: "Non-Akademik",
      deskripsi: "Unit kegiatan untuk mengembangkan spiritual dan keagamaan",
      jumlahAnggota: 320,
      tahunBerdiri: 1999,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Kajian Keagamaan", "Bakti Sosial", "Ramadhan Ceria"],
      pencapaian: ["UKM Religius Terbaik 2023", "Aksi Sosial Terbaik 2024"],
      kontak: "ukk@university.ac.id",
      icon: Heart
    },
    {
      id: 4,
      nama: "Unit Kegiatan Jurnalistik",
      kategori: "Non-Akademik",
      deskripsi: "Unit kegiatan untuk mengembangkan minat di bidang jurnalistik",
      jumlahAnggota: 95,
      tahunBerdiri: 2010,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Magang Media", "Lomba Jurnalistik", "Media Kampus"],
      pencapaian: ["Juara 1 Lomba Jurnalistik Mahasiswa 2023", "Media Kampus Terbaik 2024"],
      kontak: "uj@university.ac.id",
      icon: BookOpen
    }
  ];

  // Data Organisasi Mahasiswa
  const organisasiMahasiswa = [
    {
      id: 1,
      nama: "Badan Eksekutif Mahasiswa (BEM)",
      kategori: "Organisasi",
      deskripsi: "Lembaga eksekutif tertinggi organisasi mahasiswa",
      jumlahAnggota: 25,
      tahunBerdiri: 1990,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Koordinasi UKM", "Advokasi Mahasiswa", "Event Kampus"],
      pencapaian: ["Lembaga Organisasi Terbaik 2023", "Inovasi Organisasi 2024"],
      kontak: "bem@university.ac.id",
      icon: Building2
    },
    {
      id: 2,
      nama: "Dewan Perwakilan Mahasiswa (DPM)",
      kategori: "Organisasi",
      deskripsi: "Lembaga legislatif tertinggi organisasi mahasiswa",
      jumlahAnggota: 20,
      tahunBerdiri: 1990,
      fakultas: "Kampus",
      status: "aktif",
      kegiatanUtama: ["Pembuatan Anggaran", "Pengawasan Kegiatan", "Legislator Mahasiswa"],
      pencapaian: ["Transparansi Terbaik 2023", "Partisipasi Demokrasi 2024"],
      kontak: "dpm@university.ac.id",
      icon: Award
    },
    {
      id: 3,
      nama: "Himpunan Mahasiswa Teknik Informatika (HMTI)",
      kategori: "Organisasi",
      deskripsi: "Organisasi himpunan mahasiswa program studi Teknik Informatika",
      jumlahAnggota: 180,
      tahunBerdiri: 2005,
      fakultas: "Teknik",
      status: "aktif",
      kegiatanUtama: ["Rapat Anggota", "Seminar Prodi", "Kegiatan Prodi"],
      pencapaian: ["Himpunan Prodi Terbaik 2023", "Kepengurusan Teraktif 2024"],
      kontak: "hmti@university.ac.id",
      icon: GraduationCap
    }
  ];

  const kategoriUKM = [
    { id: 'akademik', name: 'Akademik', icon: GraduationCap, count: 12 },
    { id: 'non-akademik', name: 'Non-Akademik', icon: Star, count: 8 },
    { id: 'organisasi', name: 'Organisasi', icon: Building2, count: 3 },
    { id: 'olahraga', name: 'Olahraga', icon: Star, count: 1 },
    { id: 'seni', name: 'Seni & Budaya', icon: Music, count: 1 },
    { id: 'keagamaan', name: 'Keagamaan', icon: Heart, count: 1 }
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
            UKM & <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Organisasi</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Unit Kegiatan Mahasiswa dan Organisasi Mahasiswa di lingkungan universitas
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
            <h2 className="text-3xl font-bold text-foreground">Kategori UKM & Organisasi</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriUKM.map((kategori) => {
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
        {/* Organisasi Mahasiswa */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Organisasi Mahasiswa</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {organisasiMahasiswa.map((org, index) => {
              const IconComponent = org.icon;
              return (
                <motion.div
                  key={org.id}
                  className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 7) }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{org.nama}</h3>
                      <Badge variant="outline" className="border-neon-green text-neon-green bg-neon-green/20">{org.kategori}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{org.deskripsi}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Anggota</span>
                      <span className="font-semibold text-foreground">{org.jumlahAnggota}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Berdiri</span>
                      <span className="font-semibold text-foreground">{org.tahunBerdiri}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fakultas</span>
                      <span className="font-semibold text-foreground">{org.fakultas}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground block mb-2">Kegiatan Utama:</span>
                    <ul className="space-y-1">
                      {org.kegiatanUtama.map((kegiatan, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                          {kegiatan}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground block mb-2">Pencapaian:</span>
                    <ul className="space-y-1">
                      {org.pencapaian.map((capaian, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          {capaian}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    <Users className="w-4 h-4 mr-2" />
                    Profil Organisasi
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* UKM Akademik */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">UKM Akademik</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ukmAkademik.map((ukm, index) => {
              const IconComponent = ukm.icon;
              return (
                <motion.div
                  key={ukm.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <IconComponent className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{ukm.nama}</h3>
                        <Badge className={`${ukm.status === 'aktif' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                          {ukm.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{ukm.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Anggota</span>
                        <span className="font-semibold text-foreground">{ukm.jumlahAnggota} Orang</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Berdiri</span>
                        <span className="font-semibold text-foreground">{ukm.tahunBerdiri}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fakultas</span>
                        <span className="font-semibold text-foreground">{ukm.fakultas}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Kegiatan Utama:</span>
                      <ul className="space-y-1">
                        {ukm.kegiatanUtama.map((kegiatan, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-cyber-blue rounded-full"></div>
                            {kegiatan}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Pencapaian:</span>
                      <ul className="space-y-1">
                        {ukm.pencapaian.map((capaian, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="w-3 h-3 text-yellow-500" />
                            {capaian}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <Users className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                      <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                        <Mail className="w-4 h-4 mr-2" />
                        Kontak
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* UKM Non-Akademik */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">UKM Non-Akademik</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ukmNonAkademik.map((ukm, index) => {
              const IconComponent = ukm.icon;
              return (
                <motion.div
                  key={ukm.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 3) }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-electric-purple to-neon-pink rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(179,118,255,0.3)]">
                        <IconComponent className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{ukm.nama}</h3>
                        <Badge variant="outline" className="border-electric-purple text-electric-purple bg-electric-purple/20">{ukm.kategori}</Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{ukm.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Anggota</span>
                        <span className="font-semibold text-foreground">{ukm.jumlahAnggota} Orang</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Berdiri</span>
                        <span className="font-semibold text-foreground">{ukm.tahunBerdiri}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Kegiatan Utama:</span>
                      <ul className="space-y-1">
                        {ukm.kegiatanUtama.map((kegiatan, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-electric-purple rounded-full"></div>
                            {kegiatan}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Pencapaian:</span>
                      <ul className="space-y-1">
                        {ukm.pencapaian.map((capaian, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="w-3 h-3 text-yellow-500" />
                            {capaian}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                        <Users className="w-4 h-4 mr-2" />
                        Gabung Sekarang
                      </Button>
                      <Button variant="outline" className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple/10">
                        <Mail className="w-4 h-4 mr-2" />
                        {ukm.kontak}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        

      </div>
    </div>
  );
}
