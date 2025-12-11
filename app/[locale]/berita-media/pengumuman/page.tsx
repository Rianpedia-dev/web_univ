"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Search,
  Filter,
  Pin,
  AlertTriangle,
  CheckCircle,
  CircleDashed,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PengumumanPage() {
  // Data pengumuman
  const pengumuman = [
    {
      id: 1,
      judul: "Jadwal Wisuda Tahun 2024",
      tanggal: "15 November 2024",
      kategori: "Akademik",
      prioritas: "Tinggi",
      status: "Aktif",
      excerpt: "Pelaksanaan wisuda tahun ini akan dilaksanakan pada 15-20 Desember 2024 di Gedung Serba Guna...",
      penulis: "Bagian Akademik",
      berlaku: "15 Nov 2024 - 20 Des 2024"
    },
    {
      id: 2,
      judul: "Perpanjangan Jadwal Pembayaran UKT",
      tanggal: "10 November 2024",
      kategori: "Administrasi",
      prioritas: "Sedang",
      status: "Aktif",
      excerpt: "Mahasiswa diberikan waktu tambahan untuk pembayaran UKT semester Ganjil 2024/2025...",
      penulis: "Bagian Administrasi Akademik",
      berlaku: "10 Nov 2024 - 30 Nov 2024"
    },
    {
      id: 3,
      judul: "Pendaftaran Semester Pendek 2024/2025",
      tanggal: "8 November 2024",
      kategori: "Akademik",
      prioritas: "Tinggi",
      status: "Aktif",
      excerpt: "Dibuka pendaftaran semester pendek bagi mahasiswa yang ingin mengejar kelulusan...",
      penulis: "Prodi Teknik Informatika",
      berlaku: "08 Nov 2024 - 15 Des 2024"
    },
    {
      id: 4,
      judul: "Libur Maulid Nabi Muhammad SAW",
      tanggal: "15 November 2024",
      kategori: "Umum",
      prioritas: "Rendah",
      status: "Pending",
      excerpt: "Bersamaan dengan peringatan Maulid Nabi Muhammad SAW, kampus akan libur pada tanggal 16 November 2024...",
      penulis: "Pimpinan Kampus",
      berlaku: "16 Nov 2024"
    },
    {
      id: 5,
      judul: "Pemeliharaan Sistem Akademik",
      tanggal: "12 November 2024",
      kategori: "Teknis",
      prioritas: "Sedang",
      status: "Aktif",
      excerpt: "Sistem akademik akan dilakukan pemeliharaan pada tanggal 15 November 2024 pukul 00:00 - 06:00 WIB...",
      penulis: "Pusat Teknologi Informasi",
      berlaku: "15 Nov 2024 00:00 - 06:00"
    },
    {
      id: 6,
      judul: "Pengumuman Cuti Bersama Tahun Baru Imlek",
      tanggal: "5 November 2024",
      kategori: "Umum",
      prioritas: "Rendah",
      status: "Aktif",
      excerpt: "Sehubungan dengan perayaan Tahun Baru Imlek, akan ada cuti bersama...",
      penulis: "HRD Kampus",
      berlaku: "10-11 Feb 2025"
    }
  ];

  // Data kategori
  const kategori = [
    { nama: "Semua", jumlah: 45 },
    { nama: "Akademik", jumlah: 18 },
    { nama: "Administrasi", jumlah: 12 },
    { nama: "Umum", jumlah: 10 },
    { nama: "Teknis", jumlah: 5 }
  ];

  // Data prioritas
  const prioritas = [
    { nama: "Semua", jumlah: 45 },
    { nama: "Tinggi", jumlah: 12 },
    { nama: "Sedang", jumlah: 22 },
    { nama: "Rendah", jumlah: 11 }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105"
            style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pengumuman <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Penting</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Kumpulan pengumuman resmi dari pimpinan kampus, fakultas, dan unit-unit terkait
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <motion.h2
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Pengumuman Terbaru
              </motion.h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari pengumuman..."
                  className="pl-10 pr-4 py-2 border border-cyber-blue rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent bg-muted/50 text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-6">
              {pengumuman.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-card rounded-xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyber-blue to-electric-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                          {item.prioritas === 'Tinggi' ? (
                            <Pin className="w-6 h-6 text-foreground" />
                          ) : item.prioritas === 'Sedang' ? (
                            <AlertTriangle className="w-6 h-6 text-foreground" />
                          ) : (
                            <Bell className="w-6 h-6 text-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{item.judul}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-cyber-blue" />
                              {item.tanggal}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4 text-electric-purple" />
                              {item.penulis}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`
                          ${item.prioritas === 'Tinggi' ? 'bg-red-500 hover:bg-red-600' :
                            item.prioritas === 'Sedang' ? 'bg-yellow-500 hover:bg-yellow-600' :
                            'bg-gray-500 hover:bg-gray-600'}
                        `}>
                          {item.prioritas}
                        </Badge>
                        <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                          {item.kategori}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{item.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-neon-green" />
                          Berlaku: {item.berlaku}
                        </span>
                        <span className={`
                          flex items-center gap-1 px-2 py-1 rounded-full text-xs
                          ${item.status === 'Aktif' ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30' :
                            item.status === 'Pending' ? 'bg-electric-purple/20 text-electric-purple border border-electric-purple/30' :
                            'bg-muted/50 text-muted-foreground border border-gray-500/30'}
                        `}>
                          {item.status === 'Aktif' ? <CheckCircle className="w-3 h-3 text-cyber-blue" /> :
                           item.status === 'Pending' ? <CircleDashed className="w-3 h-3 text-electric-purple" /> :
                           <Bell className="w-3 h-3 text-muted-foreground" />}
                          {item.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                Muat Lebih Banyak
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/3">
            {/* Filters */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-foreground">Filter</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Kategori</h4>
                  <div className="space-y-2">
                    {kategori.map((kat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 glass-card rounded-lg border hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer transition-all duration-300"
                      >
                        <span className="text-muted-foreground">{kat.nama}</span>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">{kat.jumlah}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Prioritas</h4>
                  <div className="space-y-2">
                    {prioritas.map((prioritas, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 glass-card rounded-lg border hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer transition-all duration-300"
                      >
                        <span className="text-muted-foreground">{prioritas.nama}</span>
                        <Badge className="bg-gradient-cyber text-cyan-300 border border-cyber-blue/30">{prioritas.jumlah}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pengumuman Terpenting */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-foreground">Pengumuman Terpenting</h3>
              <div className="space-y-4">
                {pengumuman.filter(p => p.prioritas === 'Tinggi').map((item, index) => (
                  <div key={item.id} className="p-4 glass-card border border-cyber-blue/30 rounded-lg bg-red-500/10">
                    <h4 className="font-semibold mb-1 text-foreground">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">{item.tanggal}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Statistik */}
            <motion.div
              className="glass-card rounded-xl p-6 border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="font-bold text-lg mb-4 text-foreground">Statistik Pengumuman</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">45</div>
                  <div className="text-sm text-muted-foreground">Total Pengumuman</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">18</div>
                  <div className="text-sm text-muted-foreground">Pengumuman Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">12</div>
                  <div className="text-sm text-muted-foreground">Prioritas Tinggi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">25</div>
                  <div className="text-sm text-muted-foreground">Bulan Ini</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
