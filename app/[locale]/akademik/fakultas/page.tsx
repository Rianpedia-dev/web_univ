"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Target,
  Award,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function FakultasPage() {
  // Data fakultas
  const fakultas = [
    {
      id: 1,
      nama: "Fakultas Teknik",
      dekan: "Dr. Eng. Muhammad Hidayat, S.T., M.T.",
      akreditasi: "A",
      prodi: [
        { nama: "Teknik Informatika", akreditasi: "A", jenjang: "S1" },
        { nama: "Teknik Elektro", akreditasi: "B", jenjang: "S1" },
        { nama: "Teknik Sipil", akreditasi: "A", jenjang: "S1" }
      ],
      deskripsi: "Fakultas yang berfokus pada pengembangan teknologi dan inovasi dalam bidang teknik.",
      kontak: {
        email: "dekan.ft@universitas.ac.id",
        telepon: "+62 21 1234 5679",
        alamat: "Gedung Teknik, Lantai 2"
      },
      jumlahDosen: 120,
      jumlahMahasiswa: 2400
    },
    {
      id: 2,
      nama: "Fakultas Ekonomi",
      dekan: "Dr. Indah Lestari, S.E., M.M.",
      akreditasi: "A",
      prodi: [
        { nama: "Manajemen", akreditasi: "A", jenjang: "S1" },
        { nama: "Akuntansi", akreditasi: "A", jenjang: "S1" },
        { nama: "Ekonomi Pembangunan", akreditasi: "B", jenjang: "S1" }
      ],
      deskripsi: "Fakultas yang menyiapkan lulusan dalam bidang manajemen dan bisnis.",
      kontak: {
        email: "dekan.fe@universitas.ac.id",
        telepon: "+62 21 1234 5680",
        alamat: "Gedung Ekonomi, Lantai 3"
      },
      jumlahDosen: 95,
      jumlahMahasiswa: 1800
    },
    {
      id: 3,
      nama: "Fakultas Ilmu Komputer",
      dekan: "Dr. Ahmad Fauzi, S.Kom., M.T.",
      akreditasi: "A",
      prodi: [
        { nama: "Sistem Informasi", akreditasi: "A", jenjang: "S1" },
        { nama: "Teknik Komputer", akreditasi: "A", jenjang: "S1" },
        { nama: "Ilmu Komputer", akreditasi: "B", jenjang: "S1" }
      ],
      deskripsi: "Fakultas yang menggabungkan teknologi informasi dengan inovasi digital.",
      kontak: {
        email: "dekan.fikom@universitas.ac.id",
        telepon: "+62 21 1234 5681",
        alamat: "Gedung Informatika, Lantai 1"
      },
      jumlahDosen: 85,
      jumlahMahasiswa: 1600
    },
    {
      id: 4,
      nama: "Fakultas Hukum",
      dekan: "Prof. Dr. Siti Nurhaliza, S.H., M.H.",
      akreditasi: "B",
      prodi: [
        { nama: "Ilmu Hukum", akreditasi: "B", jenjang: "S1" }
      ],
      deskripsi: "Fakultas yang menyiapkan lulusan dalam bidang hukum dan perundang-undangan.",
      kontak: {
        email: "dekan.fh@universitas.ac.id",
        telepon: "+62 21 1234 5682",
        alamat: "Gedung Hukum, Lantai 2"
      },
      jumlahDosen: 65,
      jumlahMahasiswa: 950
    },
    {
      id: 5,
      nama: "Fakultas Ilmu Sosial dan Humaniora",
      dekan: "Dr. Rina Kusuma, S.Sos., M.A.",
      akreditasi: "B",
      prodi: [
        { nama: "Ilmu Komunikasi", akreditasi: "A", jenjang: "S1" },
        { nama: "Sosiologi", akreditasi: "B", jenjang: "S1" }
      ],
      deskripsi: "Fakultas yang menekankan pada ilmu sosial dan kemanusiaan.",
      kontak: {
        email: "dekan.fish@universitas.ac.id",
        telepon: "+62 21 1234 5683",
        alamat: "Gedung Sosial, Lantai 1"
      },
      jumlahDosen: 70,
      jumlahMahasiswa: 1200
    }
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
            Daftar <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Fakultas</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Informasi lengkap tentang fakultas-fakultas yang tersedia di universitas kami
          </p>
        </motion.div>

        {/* Statistik Fakultas */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Building2 className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              5
            </div>
            <div className="text-foreground/70 text-sm">Fakultas</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <GraduationCap className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              18
            </div>
            <div className="text-foreground/70 text-sm">Program Studi</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Users className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              435+
            </div>
            <div className="text-foreground/70 text-sm">Dosen</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <BookOpen className="w-6 h-6 text-foreground/90 dark:text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              8.150+
            </div>
            <div className="text-foreground/70 text-sm">Mahasiswa</div>
          </div>
        </motion.div>

        {/* Daftar Fakultas */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {fakultas.map((fak, index) => (
            <motion.div
              key={fak.id}
              className="glass-card rounded-2xl border border-white/20 overflow-hidden mb-8 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-foreground">{fak.nama}</h2>
                      <Badge className={`${fak.akreditasi === 'A' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
                        <Award className="w-3 h-3 mr-1" />
                        {fak.akreditasi}
                      </Badge>
                    </div>

                    <p className="text-foreground/70 mb-6">{fak.deskripsi}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Dekan Fakultas</h3>
                        <p className="text-foreground">{fak.dekan}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Kontak Fakultas</h3>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-foreground/70">
                            <Mail className="w-4 h-4 mr-2" />
                            {fak.kontak.email}
                          </div>
                          <div className="flex items-center text-sm text-foreground/70">
                            <Phone className="w-4 h-4 mr-2" />
                            {fak.kontak.telepon}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-cyber">{fak.jumlahDosen}+</div>
                        <div className="text-sm text-foreground/60">Dosen</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{fak.jumlahMahasiswa}+</div>
                        <div className="text-sm text-foreground/60">Mahasiswa</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">{fak.prodi.length}</div>
                        <div className="text-sm text-foreground/60">Program Studi</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">{fak.akreditasi}</div>
                        <div className="text-sm text-foreground/60">Akreditasi</div>
                      </div>
                    </div>

                    <Button variant="outline" className="mr-2 mb-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      Profil Fakultas
                    </Button>
                    <Button variant="outline" className="mr-2 mb-2 border-electric-purple text-electric-purple hover:bg-electric-purple/10">
                      Program Studi
                    </Button>
                    <Button variant="outline" className="mb-2 border-neon-green text-neon-green hover:bg-neon-green/10">
                      Kontak
                    </Button>
                  </div>

                  <div className="w-full md:w-80">
                    <div className="glass-card p-6 rounded-xl h-full border border-white/10">
                      <h3 className="font-bold text-lg text-white mb-4 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-cyber-blue" />
                        Program Studi
                      </h3>
                      <div className="space-y-3">
                        {fak.prodi.map((prodi, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-sm text-gray-200">{prodi.nama}</span>
                            <Badge variant={prodi.akreditasi === 'A' ? 'default' : 'secondary'} className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                              {prodi.akreditasi}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Alamat</h4>
                        <div className="flex items-start text-sm text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                          {fak.kontak.alamat}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Struktur Organisasi Fakultas */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">Tata Kelola Fakultas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                posisi: "Dekan",
                deskripsi: "Kepala tertinggi dalam struktur fakultas",
                icon: GraduationCap
              },
              {
                posisi: "Wakil Dekan",
                deskripsi: "Membantu tugas dekan dalam bidang akademik, administrasi, dll.",
                icon: Users
              },
              {
                posisi: "Kaprodi",
                deskripsi: "Kepala program studi di masing-masing jurusan",
                icon: BookOpen
              }
            ].map((struktur, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center border border-white/10">
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <struktur.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{struktur.posisi}</h3>
                <p className="text-sm text-gray-300">{struktur.deskripsi}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}