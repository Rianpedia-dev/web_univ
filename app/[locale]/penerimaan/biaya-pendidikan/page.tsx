"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  DollarSign,
  FileText,
  CheckCircle,
  Users,
  GraduationCap,
  BookOpen,
  Calculator,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function BiayaPendidikanPage() {
  // Data UKT per golongan
  const ukts = [
    {
      golongan: "I",
      biaya: "Rp 500.000",
      deskripsi: "Untuk mahasiswa dari keluarga tidak mampu",
      persyaratan: [
        "Kartu KIP/KIS/KPS atau surat keterangan tidak mampu",
        "Rata-rata penghasilan orang tua < Rp 1.000.000/bulan"
      ],
      kuota: "5% dari total mahasiswa"
    },
    {
      golongan: "II",
      biaya: "Rp 2.500.000",
      deskripsi: "Untuk mahasiswa dari keluarga menengah bawah",
      persyaratan: [
        "Rata-rata penghasilan orang tua Rp 1.000.000 - Rp 3.000.000/bulan"
      ],
      kuota: "15% dari total mahasiswa"
    },
    {
      golongan: "III",
      biaya: "Rp 5.000.000",
      deskripsi: "Untuk mahasiswa dari keluarga menengah",
      persyaratan: [
        "Rata-rata penghasilan orang tua Rp 3.000.001 - Rp 6.000.000/bulan"
      ],
      kuota: "40% dari total mahasiswa"
    },
    {
      golongan: "IV",
      biaya: "Rp 8.000.000",
      deskripsi: "Untuk mahasiswa dari keluarga menengah atas",
      persyaratan: [
        "Rata-rata penghasilan orang tua Rp 6.000.001 - Rp 10.000.000/bulan"
      ],
      kuota: "25% dari total mahasiswa"
    },
    {
      golongan: "V",
      biaya: "Rp 12.000.000",
      deskripsi: "Untuk mahasiswa dari keluarga mampu",
      persyaratan: [
        "Rata-rata penghasilan orang tua > Rp 10.000.000/bulan"
      ],
      kuota: "15% dari total mahasiswa"
    }
  ];

  // Data biaya tambahan
  const biayaTambahan = [
    { nama: "Uang Pangkal Perkuliahan", biaya: "Rp 15.000.000", deskripsi: "Sekali bayar saat registrasi awal" },
    { nama: "Uang Praktek Lapangan", biaya: "Rp 2.000.000", deskripsi: "Untuk keperluan praktek di luar kampus" },
    { nama: "Uang Wisuda", biaya: "Rp 3.500.000", deskripsi: "Termasuk toga, dokumentasi, dan jamuan wisuda" },
    { nama: "Uang Pengambilan Ijazah", biaya: "Rp 500.000", deskripsi: "Biaya administrasi pengambilan ijazah" },
    { nama: "Uang Semester Pendek", biaya: "Rp 750.000/sks", deskripsi: "Per SKS untuk semester pendek" },
    { nama: "Uang Penggandaan Dokumen", biaya: "Rp 100.000", deskripsi: "Untuk legalisasi dokumen akademik" }
  ];

  // Data keringanan biaya
  const keringananBiaya = [
    { nama: "KIP Kuliah", deskripsi: "Kartu Indonesia Pintar untuk mahasiswa tidak mampu", biaya: "Pembebasan UKT" },
    { nama: "Beasiswa Prestasi", deskripsi: "Bagi mahasiswa berprestasi akademik", biaya: "Potongan 50-100%" },
    { nama: "Beasiswa Karyasiswa", deskripsi: "Untuk mahasiswa dari kalangan pekerja", biaya: "Potongan 25-50%" },
    { nama: "Beasiswa Keluarga Dosen", deskripsi: "Bagi anak dosen universitas", biaya: "Potongan 50%" }
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
            Biaya <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Pendidikan</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Informasi lengkap tentang struktur biaya pendidikan, UKT, dan berbagai program keringanan biaya
          </p>
        </motion.div>

        {/* UKT per Golongan */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">UKT (Uang Kuliah Tunggal)</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ukts.map((ukt, index) => (
              <motion.div
                key={ukt.golongan}
                className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <span className="text-foreground font-bold text-xl">G{ukt.golongan}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Golongan {ukt.golongan}</h3>
                        <p className="text-muted-foreground">{ukt.deskripsi}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{ukt.biaya}</div>
                      <div className="text-sm text-muted-foreground">per semester</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Persyaratan:</h4>
                    <ul className="space-y-2">
                      {ukt.persyaratan.map((syarat, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-cyber-blue mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{ukt.kuota}</span>
                    <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <FileText className="w-4 h-4 mr-2" />
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Biaya Tambahan */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Biaya Tambahan</h2>

          <div className="glass-card rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-foreground rounded-tl-2xl">Jenis Biaya</th>
                    <th className="p-4 text-left text-foreground">Besaran</th>
                    <th className="p-4 text-left text-foreground">Deskripsi</th>
                    <th className="p-4 text-left text-foreground rounded-tr-2xl">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {biayaTambahan.map((biaya, index) => (
                    <motion.tr
                      key={index}
                      className={`border-t border ${index % 2 === 0 ? 'bg-muted/50' : 'bg-muted/50'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <td className="p-4 font-medium text-foreground">{biaya.nama}</td>
                      <td className="p-4 text-cyber-blue font-semibold">{biaya.biaya}</td>
                      <td className="p-4 text-muted-foreground">{biaya.deskripsi}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                          Wajib
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Keringanan Biaya */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Program Keringanan Biaya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keringananBiaya.map((keringanan, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 8) }}
              >
                <h3 className="font-bold text-lg mb-2 text-foreground">{keringanan.nama}</h3>
                <p className="text-sm text-muted-foreground mb-3">{keringanan.deskripsi}</p>
                <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-cyber">{keringanan.biaya}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
