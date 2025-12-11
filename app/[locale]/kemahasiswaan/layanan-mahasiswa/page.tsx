"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Heart,
  Briefcase,
  Building2,
  Calendar,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  User,
  FileInput,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function LayananMahasiswaPage() {
  // Data layanan administrasi
  const layananAdministrasi = [
    {
      id: 1,
      nama: "Pengajuan KRS",
      kategori: "Administrasi",
      deskripsi: "Pengajuan Kartu Rencana Studi untuk semester berjalan",
      status: "aktif",
      waktuPengajuan: "1-15 Agustus 2024",
      dokumen: ["Form KRS", "KHS Semester Sebelumnya"],
      biaya: "Gratis",
      prioritas: "tinggi",
      icon: FileText
    },
    {
      id: 2,
      nama: "Cuti Akademik",
      kategori: "Administrasi",
      deskripsi: "Permohonan cuti kuliah sementara waktu",
      status: "aktif",
      waktuPengajuan: "Kapan saja (sebelum semester berjalan)",
      dokumen: ["Surat Permohonan", "Surat Keterangan Orang Tua"],
      biaya: "Rp 100.000",
      prioritas: "sedang",
      icon: Calendar
    },
    {
      id: 3,
      nama: "Pindah Prodi",
      kategori: "Administrasi",
      deskripsi: "Permohonan perpindahan program studi",
      status: "aktif",
      waktuPengajuan: "1-30 Juni & 1-30 Desember",
      dokumen: ["Form Pindah Prodi", "Transkrip Sementara", "Surat Rekomendasi"],
      biaya: "Rp 250.000",
      prioritas: "rendah",
      icon: GraduationCap
    },
    {
      id: 4,
      nama: "Wisuda",
      kategori: "Administrasi",
      deskripsi: "Pengajuan wisuda dan pengambilan ijazah",
      status: "aktif",
      waktuPengajuan: "1-31 Maret & 1-30 September",
      dokumen: ["Form Pengajuan Wisuda", "Legalitas Ijazah", "Bukti Lulus TOEFL"],
      biaya: "Rp 3.500.000",
      prioritas: "tinggi",
      icon: Award
    },
    {
      id: 5,
      nama: "Keringanan UKT",
      kategori: "Administrasi",
      deskripsi: "Permohonan keringanan biaya UKT",
      status: "aktif",
      waktuPengajuan: "1-31 Agustus",
      dokumen: ["Form Permohonan", "Surat Keterangan Tidak Mampu", "KK & KTP Orang Tua"],
      biaya: "Gratis",
      prioritas: "sedang",
      icon: BookOpen
    }
  ];

  // Data layanan konseling
  const layananKonseling = [
    {
      id: 1,
      nama: "Bimbingan Karir",
      kategori: "Konseling",
      deskripsi: "Konseling untuk membantu mahasiswa dalam memilih karir yang sesuai",
      status: "aktif",
      jadwal: "Senin & Rabu, 08:00-15:00",
      konselor: "Dr. Siti Nurhaliza, M.Psi",
      kuota: 15,
      durasi: "45-60 menit",
      icon: Briefcase
    },
    {
      id: 2,
      nama: "Konseling Akademik",
      kategori: "Konseling",
      deskripsi: "Bimbingan akademik terkait studi dan kendala perkuliahan",
      status: "aktif",
      jadwal: "Selasa & Kamis, 08:00-16:00",
      konselor: "Dr. Budi Santoso, M.Si",
      kuota: 20,
      durasi: "30-45 menit",
      icon: GraduationCap
    },
    {
      id: 3,
      nama: "Konseling Pribadi",
      kategori: "Konseling",
      deskripsi: "Konseling untuk masalah pribadi dan sosial mahasiswa",
      status: "aktif",
      jadwal: "Setiap hari, 09:00-17:00",
      konselor: "Dr. Ratna Dewi, M.Psi",
      kuota: 10,
      durasi: "60-90 menit",
      icon: User
    }
  ];

  // Data layanan karir
  const layananKarir = [
    {
      id: 1,
      nama: "Job Matching",
      kategori: "Karir",
      deskripsi: "Pencocokan lowongan kerja dengan profil mahasiswa",
      status: "aktif",
      jumlahLowongan: 45,
      terisi: 12,
      icon: Briefcase
    },
    {
      id: 2,
      nama: "Pelatihan Soft Skills",
      kategori: "Karir",
      deskripsi: "Pelatihan keterampilan lunak untuk dunia kerja",
      status: "aktif",
      jadwal: "Sabtu, 09:00-15:00",
      kuota: 50,
      icon: Star
    },
    {
      id: 3,
      nama: "Job Fair",
      kategori: "Karir",
      deskripsi: "Pameran lowongan kerja dari berbagai perusahaan",
      status: "akanDatang",
      tanggal: "15-17 November 2024",
      jumlahPerusahaan: 25,
      icon: Building2
    }
  ];

  const kategoriLayanan = [
    { id: 'administrasi', name: 'Administrasi', icon: FileText, count: 5 },
    { id: 'konseling', name: 'Konseling', icon: Heart, count: 3 },
    { id: 'karir', name: 'Karir', icon: Briefcase, count: 3 },
    { id: 'digital', name: 'Digital', icon: FileInput, count: 4 }
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
        className="relative bg-[url('/images/layanan_mahasiswa.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                Layanan Mahasiswa
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Kumpulan layanan yang tersedia untuk membantu mahasiswa selama masa studi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Filter Kategori */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Layanan</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriLayanan.map((kategori) => {
              const IconComponent = kategori.icon;
              return (
                <Button key={kategori.id} variant="outline" className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                  <IconComponent className="w-4 h-4" />
                  {kategori.name} ({kategori.count})
                </Button>
              );
            })}
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Lihat Semua</Button>
          </div>
        </motion.div>

        {/* Layanan Administrasi */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Layanan Administrasi</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {layananAdministrasi.map((layanan, index) => {
              const IconComponent = layanan.icon;
              return (
                <motion.div
                  key={layanan.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                          <IconComponent className="w-6 h-6 text-foreground/90" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{layanan.nama}</h3>
                          <Badge className={`${layanan.status === 'aktif' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                            {layanan.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4">{layanan.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-foreground/60">Waktu Pengajuan</span>
                        <span className="font-semibold text-foreground">{layanan.waktuPengajuan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-foreground/60">Biaya</span>
                        <span className="font-semibold text-foreground">{layanan.biaya}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-foreground/60">Prioritas</span>
                        <Badge variant={layanan.prioritas === 'tinggi' ? 'default' : layanan.prioritas === 'sedang' ? 'secondary' : 'outline'}>
                          {layanan.prioritas}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Dokumen yang Dibutuhkan:</span>
                      <ul className="space-y-1">
                        {layanan.dokumen.map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-cyber-blue rounded-full"></div>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Ajukan
                      </Button>
                      <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                        <Download className="w-4 h-4 mr-2" />
                        Panduan
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Layanan Konseling */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Layanan Konseling</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {layananKonseling.map((layanan, index) => {
              const IconComponent = layanan.icon;
              return (
                <motion.div
                  key={layanan.id}
                  className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 5) }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{layanan.nama}</h3>
                      <Badge variant="secondary" className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">{layanan.kategori}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{layanan.deskripsi}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Konselor</span>
                      <span className="font-semibold text-foreground">{layanan.konselor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Jadwal</span>
                      <span className="font-semibold text-foreground">{layanan.jadwal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Kuota Harian</span>
                      <span className="font-semibold text-foreground">{layanan.kuota} Orang</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Durasi</span>
                      <span className="font-semibold text-foreground">{layanan.durasi}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                    <Heart className="w-4 h-4 mr-2" />
                    Jadwalkan Konseling
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Kontak Layanan */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kontak Layanan Mahasiswa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Telepon</h3>
              <p className="text-muted-foreground">(0274) 1234567</p>
              <p className="text-sm text-muted-foreground">Senin-Jumat, 08:00-16:00</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">layanan.mahasiswa@university.ac.id</p>
              <p className="text-sm text-muted-foreground">Respon dalam 24 jam</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Lokasi</h3>
              <p className="text-muted-foreground">Gedung Administrasi Lt. 1</p>
              <p className="text-sm text-muted-foreground">Kampus Utama</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
