"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Star,
  CheckCircle,
  FileText,
  GraduationCap,
  Users,
  Building,
  Calendar,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ProfilAkreditasiPage() {
  // Data akreditasi universitas
  const akreditasiUniversitas = {
    nama: "Universitas Future",
    lembaga: "Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)",
    status: "A (Unggul)",
    nilai: "381",
    masaBerlaku: "2023 - 2028",
    nomorSK: "205/SK/BAN-PT/Akred/PT/IV/2023"
  };

  // Data akreditasi program studi
  const akreditasiProdi = [
    {
      nama: "Teknik Informatika",
      jenjang: "S1",
      fakultas: "Fakultas Teknik",
      status: "A",
      nilai: "376",
      masaBerlaku: "2022 - 2027"
    },
    {
      nama: "Sistem Informasi",
      jenjang: "S1",
      fakultas: "Fakultas Ilmu Komputer",
      status: "A",
      nilai: "365",
      masaBerlaku: "2023 - 2028"
    },
    {
      nama: "Manajemen",
      jenjang: "S1",
      fakultas: "Fakultas Ekonomi",
      status: "A",
      nilai: "358",
      masaBerlaku: "2022 - 2027"
    },
    {
      nama: "Akuntansi",
      jenjang: "S1",
      fakultas: "Fakultas Ekonomi",
      status: "A",
      nilai: "362",
      masaBerlaku: "2023 - 2028"
    },
    {
      nama: "Ilmu Hukum",
      jenjang: "S1",
      fakultas: "Fakultas Hukum",
      status: "B",
      nilai: "335",
      masaBerlaku: "2023 - 2028"
    },
    {
      nama: "Teknik Elektro",
      jenjang: "S1",
      fakultas: "Fakultas Teknik",
      status: "B",
      nilai: "328",
      masaBerlaku: "2022 - 2027"
    }
  ];

  // Data penghargaan
  const penghargaan = [
    {
      tahun: "2023",
      nama: "Universitas dengan Inovasi Teknologi Terbaik",
      lembaga: "Kementerian Riset dan Teknologi",
      tingkat: "Nasional"
    },
    {
      tahun: "2023",
      nama: "Kampus Ramah Lingkungan",
      lembaga: "Kementerian Lingkungan Hidup",
      tingkat: "Nasional"
    },
    {
      tahun: "2022",
      nama: "50 Besar Perguruan Tinggi Terbaik Indonesia",
      lembaga: "Webometrics",
      tingkat: "Internasional"
    },
    {
      tahun: "2022",
      nama: "Kampus Digital Terinovatif",
      lembaga: "ASEAN University Network",
      tingkat: "Regional"
    },
    {
      tahun: "2021",
      nama: "Perguruan Tinggi dengan Kemitraan Industri Terbaik",
      lembaga: "Asosiasi Pendidikan Indonesia",
      tingkat: "Nasional"
    },
    {
      tahun: "2021",
      nama: "Lembaga Penelitian Terbaik",
      lembaga: "Kementerian Pendidikan dan Kebudayaan",
      tingkat: "Nasional"
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
            Akreditasi & <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Penghargaan</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Bukti kualitas dan komitmen universitas kami dalam menyelenggarakan pendidikan yang unggul
          </p>
        </motion.div>

        {/* Akreditasi Universitas */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-2xl border bg-muted/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-yellow-500 mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">Akreditasi Universitas</h2>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{akreditasiUniversitas.nama}</h3>
                <p className="text-foreground/70 mb-6">{akreditasiUniversitas.lembaga}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{akreditasiUniversitas.status}</div>
                    <div className="text-sm text-foreground/60">Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">{akreditasiUniversitas.nilai}</div>
                    <div className="text-sm text-foreground/60">Nilai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">{akreditasiUniversitas.masaBerlaku}</div>
                    <div className="text-sm text-foreground/60">Masa Berlaku</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <CheckCircle className="w-6 h-6 text-foreground/90" />
                    </div>
                    <div className="text-sm text-foreground/60">Terverifikasi</div>
                  </div>
                </div>

                <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  <FileText className="w-4 h-4 mr-2" />
                  Lihat Sertifikat
                </Button>
              </div>

              <div className="glass-card w-48 h-64 rounded-2xl flex items-center justify-center border">
                <div className="text-center">
                  <Award className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-cyber">A</div>
                  <div className="text-sm text-foreground/70">Unggul</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Akreditasi Program Studi */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Akreditasi Program Studi</h2>
          <div className="overflow-x-auto">
            <table className="w-full glass-card rounded-2xl border">
              <thead className="bg-foreground/10">
                <tr>
                  <th className="p-4 text-left text-foreground rounded-tl-2xl">Program Studi</th>
                  <th className="p-4 text-left text-foreground">Fakultas</th>
                  <th className="p-4 text-left text-foreground">Jenjang</th>
                  <th className="p-4 text-left text-foreground">Status</th>
                  <th className="p-4 text-left text-foreground">Nilai</th>
                  <th className="p-4 text-left text-foreground rounded-tr-2xl">Masa Berlaku</th>
                </tr>
              </thead>
              <tbody>
                {akreditasiProdi.map((prodi, index) => (
                  <motion.tr
                    key={index}
                    className={`border-t border-foreground/10 ${index % 2 === 0 ? 'bg-foreground/5' : 'bg-foreground/10'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td className="p-4 font-medium text-foreground">{prodi.nama}</td>
                    <td className="p-4 text-foreground/70">{prodi.fakultas}</td>
                    <td className="p-4 text-foreground/70">{prodi.jenjang}</td>
                    <td className="p-4">
                      <Badge className={`${prodi.status === 'A' ? 'bg-green-500 hover:bg-green-600' : prodi.status === 'B' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'}`}>
                        {prodi.status}
                      </Badge>
                    </td>
                    <td className="p-4 font-semibold text-foreground">{prodi.nilai}</td>
                    <td className="p-4 text-foreground/70">{prodi.masaBerlaku}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Penghargaan */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Penghargaan & Prestasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {penghargaan.map((penghargaan, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <Award className="w-6 h-6 text-foreground/90" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{penghargaan.nama}</h3>
                    <p className="text-sm text-foreground/70">{penghargaan.lembaga}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-cyber-blue" />
                    <span className="text-foreground/70">{penghargaan.tahun}</span>
                  </div>
                  <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                    {penghargaan.tingkat}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proses Akreditasi */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Proses Akreditasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                judul: "Pengajuan",
                deskripsi: "Institusi mengajukan permohonan akreditasi kepada BAN-PT",
                icon: FileText
              },
              {
                judul: "Evaluasi",
                deskripsi: "Tim evaluator melakukan penilaian terhadap standar pendidikan",
                icon: Star
              },
              {
                judul: "Visitasi",
                deskripsi: "Tim evaluator melakukan visitasi lapangan untuk verifikasi",
                icon: Users
              },
              {
                judul: "Keputusan",
                deskripsi: "Hasil penilaian dan penerbitan sertifikat akreditasi",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.judul}</h3>
                <p className="text-sm text-muted-foreground">{step.deskripsi}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
