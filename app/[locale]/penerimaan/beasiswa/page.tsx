"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  GraduationCap,
  FileText,
  CheckCircle,
  Star,
  Target,
  BookOpen,
  Calendar,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function BeasiswaPage() {
  // Data jenis beasiswa
  const beasiswa = [
    {
      id: 1,
      nama: "Beasiswa KIP Kuliah",
      jenis: "Pemerintah",
      kategori: "Tidak Mampu",
      cakupan: "100% UKT + Biaya Hidup",
      persyaratan: [
        "Membawa Kartu KIP/KIS/KPS",
        "Rata-rata nilai rapor > 8.0",
        "Tidak mampu secara ekonomi"
      ],
      kuota: "Tidak Terbatas",
      timeline: "Juni - Agustus",
      info: "Dana pendidikan dari Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
    },
    {
      id: 2,
      nama: "Beasiswa Prestasi Akademik",
      jenis: "Universitas",
      kategori: "Akademik",
      cakupan: "50-100% UKT",
      persyaratan: [
        "IPK > 3.5",
        "Tidak pernah mengulang mata kuliah",
        "Aktif dalam kegiatan akademik"
      ],
      kuota: "10% dari total mahasiswa",
      timeline: "Februari & Agustus",
      info: "Diberikan kepada mahasiswa berprestasi akademik terbaik"
    },
    {
      id: 3,
      nama: "Beasiswa Prestasi Non-Akademik",
      jenis: "Universitas",
      kategori: "Non-Akademik",
      cakupan: "25-50% UKT",
      persyaratan: [
        "Memiliki prestasi di bidang olahraga, seni, atau organisasi",
        "Menyertakan sertifikat prestasi",
        "IPK > 2.75"
      ],
      kuota: "50 kuota",
      timeline: "Maret & September",
      info: "Mendukung mahasiswa berprestasi di bidang non-akademik"
    },
    {
      id: 4,
      nama: "Beasiswa Karyasiswa",
      jenis: "Universitas",
      kategori: "Pekerja",
      cakupan: "25-50% UKT",
      persyaratan: [
        "Pegawai aktif minimal 2 tahun",
        "Surat keterangan bekerja",
        "Usia maksimal 35 tahun"
      ],
      kuota: "100 kuota",
      timeline: "Mei & November",
      info: "Untuk pegawai yang ingin melanjutkan pendidikan"
    },
    {
      id: 5,
      nama: "Beasiswa Mitra Perusahaan",
      jenis: "Kemitraan",
      kategori: "Industri",
      cakupan: "100% UKT",
      persyaratan: [
        "Lulus seleksi perusahaan mitra",
        "Bersedia kontrak kerja pasca wisuda",
        "IPK > 3.0"
      ],
      kuota: "Bervariasi",
      timeline: "Juni & Desember",
      info: "Kerjasama dengan perusahaan untuk pengembangan sumber daya manusia"
    },
    {
      id: 6,
      nama: "Beasiswa Internasional",
      jenis: "Kemitraan",
      kategori: "Global",
      cakupan: "Biaya kuliah + hidup + tiket",
      persyaratan: [
        "Nilai TOEFL > 550 / IELTS > 6.5",
        "Riwayat organisasi internasional",
        "Surat rekomendasi"
      ],
      kuota: "20 kuota",
      timeline: "April",
      info: "Kesempatan studi lanjut di universitas partner internasional"
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
            Program <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Beasiswa</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Berbagai program beasiswa untuk mendukung pendidikan mahasiswa berprestasi dan tidak mampu secara ekonomi
          </p>
        </motion.div>

        

        {/* Jenis Beasiswa */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Jenis Program Beasiswa</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {beasiswa.map((item, index) => (
              <motion.div
                key={item.id}
                className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Award className="w-6 h-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-bold text-foreground">{item.nama}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                          {item.jenis}
                        </Badge>
                        <Badge className="bg-electric-purple">{item.kategori}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-gradient-cyber text-lg py-1 px-3">
                      {item.kuota}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">{item.info}</p>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Cakupan Biaya: </span>
                    <span className="text-sm font-bold text-cyber-blue">{item.cakupan}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Persyaratan:</h4>
                    <ul className="space-y-2">
                      {item.persyaratan.map((syarat, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.timeline}
                      </div>
                    </div>
                    <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <FileText className="w-4 h-4 mr-2" />
                      Daftar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Panduan Pendaftaran */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Panduan Pendaftaran Beasiswa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                judul: "Persiapkan Dokumen",
                deskripsi: "Lengkapi semua dokumen persyaratan sesuai jenis beasiswa",
                icon: FileText
              },
              {
                judul: "Ajukan Pendaftaran",
                deskripsi: "Daftar melalui portal beasiswa sebelum batas akhir",
                icon: GraduationCap
              },
              {
                judul: "Ikuti Proses Seleksi",
                deskripsi: "Lengkapi tahapan seleksi yang ditentukan",
                icon: Target
              }
            ].map((panduan, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <panduan.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{panduan.judul}</h3>
                <p className="text-sm text-muted-foreground">{panduan.deskripsi}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dokumen Wajib */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Dokumen Wajib</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Formulir Pendaftaran",
              "Transkrip Nilai atau Rapor",
              "Surat Keterangan Tidak Mampu (jika aplikabel)",
              "Surat Rekomendasi",
              "Sertifikat Prestasi (jika aplikabel)",
              "Surat Keterangan Bekerja (Karyasiswa)",
              "Nilai Tes Bahasa (Internasional)",
              "Proposal Kegiatan (jika aplikabel)"
            ].map((dokumen, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 rounded-xl border flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <CheckCircle className="w-5 h-5 text-cyber-blue mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">{dokumen}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
