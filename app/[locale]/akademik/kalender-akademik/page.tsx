"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  FileText,
  Download
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function KalenderAkademikPage() {
  // Data kalender akademik
  const kalenderAkademik = [
    {
      id: 1,
      nama: "Semester Ganjil 2024/2025",
      periode: "September 2024 - Februari 2025",
      kegiatan: [
        { nama: "Registrasi Ulang", tanggal: "2-5 September 2024", keterangan: "Khusus mahasiswa lama" },
        { nama: "Perwalian", tanggal: "3-6 September 2024", keterangan: "Konsultasi dengan dosen PA" },
        { nama: "Perkuliahan Dimulai", tanggal: "9 September 2024", keterangan: "Hari pertama perkuliahan" },
        { nama: "UTS", tanggal: "21-28 Oktober 2024", keterangan: "Ujian Tengah Semester" },
        { nama: "Libur Idul Adha", tanggal: "16-17 Juni 2024", keterangan: "Libur nasional" },
        { nama: "UTS Remedial", tanggal: "29-30 Oktober 2024", keterangan: "Bagi mahasiswa yang perlu remedial" },
        { nama: "Libur Semester", tanggal: "23-28 Desember 2024", keterangan: "Libur Natal dan Tahun Baru" },
        { nama: "UAS", tanggal: "6-14 Januari 2025", keterangan: "Ujian Akhir Semester" },
        { nama: "Wisuda", tanggal: "15 Februari 2025", keterangan: "Wisuda Periode Ganjil" }
      ]
    },
    {
      id: 2,
      nama: "Semester Genap 2024/2025",
      periode: "Februari 2025 - Juli 2025",
      kegiatan: [
        { nama: "Registrasi Ulang", tanggal: "3-6 Februari 2025", keterangan: "Khusus mahasiswa lama" },
        { nama: "Perwalian", tanggal: "4-7 Februari 2025", keterangan: "Konsultasi dengan dosen PA" },
        { nama: "Perkuliahan Dimulai", tanggal: "10 Februari 2025", keterangan: "Hari pertama perkuliahan" },
        { nama: "UTS", tanggal: "31 Maret - 6 April 2025", keterangan: "Ujian Tengah Semester" },
        { nama: "Libur Isra Mikraj", tanggal: "24 April 2025", keterangan: "Libur nasional" },
        { nama: "UTS Remedial", tanggal: "7-8 April 2025", keterangan: "Bagi mahasiswa yang perlu remedial" },
        { nama: "Libur Semester", tanggal: "30 April - 4 Mei 2025", keterangan: "Libur Hari Buruh dan Kenaikan Isa Almasih" },
        { nama: "UAS", tanggal: "2-10 Juni 2025", keterangan: "Ujian Akhir Semester" },
        { nama: "Wisuda", tanggal: "10 Juli 2025", keterangan: "Wisuda Periode Genap" }
      ]
    }
  ];

  // Data penting lainnya
  const dataPenting = [
    { judul: "Jadwal KRS", deskripsi: "Pengisian Kartu Rencana Studi", tanggal: "3-6 September 2024", status: "aktif" },
    { judul: "Batas Akhir Pembayaran UKT", deskripsi: "Pembayaran semester ganjil", tanggal: "10 September 2024", status: "penting" },
    { judul: "Pelatihan Soft Skills", deskripsi: "Bagi mahasiswa baru", tanggal: "12-13 September 2024", status: "opsional" },
    { judul: "Seminar Nasional Teknologi", deskripsi: "Menghadirkan pembicara dari industri", tanggal: "15 September 2024", status: "wajib" }
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
            Kalender <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Akademik</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Jadwal penting dan kegiatan akademik sepanjang tahun ajaran untuk mahasiswa dan dosen
          </p>
        </motion.div>

        {/* Kalender Semester */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {kalenderAkademik.map((semester, index) => (
            <motion.div
              key={semester.id}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="glass-card rounded-2xl border border-white/20 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{semester.nama}</h2>
                    <Badge variant="outline" className="text-lg py-2 px-4 border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                      {semester.periode}
                    </Badge>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-foreground/10">
                        <tr>
                          <th className="p-4 text-left text-foreground">Kegiatan</th>
                          <th className="p-4 text-left text-foreground">Tanggal</th>
                          <th className="p-4 text-left text-foreground">Keterangan</th>

                        </tr>
                      </thead>
                      <tbody>
                        {semester.kegiatan.map((kegiatan, idx) => (
                          <tr key={idx} className={`border-t border-foreground/10 ${idx % 2 === 0 ? 'bg-foreground/5' : 'bg-foreground/10'}`}>
                            <td className="p-4 font-medium text-foreground">{kegiatan.nama}</td>
                            <td className="p-4 text-foreground/70">{kegiatan.tanggal}</td>
                            <td className="p-4 text-foreground/70">{kegiatan.keterangan}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <FileText className="w-4 h-4 mr-2" />
                      Unduh Kalender
                    </Button>
                    <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <Download className="w-4 h-4 mr-2" />
                      Versi PDF
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Panduan Kalender */}
        <motion.div
          className="glass-card rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Panduan Penggunaan Kalender</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                judul: "Cek Jadwal Rutin",
                deskripsi: "Periksa kalender setiap awal minggu untuk mengetahui kegiatan akademik",
                icon: Calendar
              },
              {
                judul: "Persetujuan Jadwal",
                deskripsi: "Pastikan untuk mengkonfirmasi tanggal-tanggal penting dengan fakultas",
                icon: FileText
              },
              {
                judul: "Pemberitahuan Resmi",
                deskripsi: "Ikuti informasi resmi dari kampus untuk update jadwal terbaru",
                icon: Users
              }
            ].map((panduan, index) => (
              <div key={index} className="glass-card text-center p-6 rounded-xl border border-foreground/10">
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <panduan.icon className="w-6 h-6 text-foreground/90" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{panduan.judul}</h3>
                <p className="text-foreground/70">{panduan.deskripsi}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}