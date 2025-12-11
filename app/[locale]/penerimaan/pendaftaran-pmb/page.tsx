"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Award,
  Users,
  GraduationCap,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PendaftaranPMBPage() {
  // Data timeline pendaftaran
  const timelinePendaftaran = [
    {
      id: 1,
      nama: "Pembukaan Pendaftaran",
      tanggal: "15 Mei 2024",
      keterangan: "Mulai menerima pendaftaran mahasiswa baru",
      status: "selesai"
    },
    {
      id: 2,
      nama: "Batas Akhir Pendaftaran",
      tanggal: "30 Juli 2024",
      keterangan: "Pendaftaran ditutup pukul 23.59 WIB",
      status: "aktif"
    },
    {
      id: 3,
      nama: "Pengumuman Hasil Seleksi",
      tanggal: "15 Agustus 2024",
      keterangan: "Pengumuman hasil seleksi penerimaan",
      status: "akan_datang"
    },
    {
      id: 4,
      nama: "Registrasi Ulang",
      tanggal: "20-25 Agustus 2024",
      keterangan: "Bagi yang dinyatakan lulus seleksi",
      status: "akan_datang"
    }
  ];

  // Data jalur masuk
  const jalurMasuk = [
    {
      nama: "SNBP (Seleksi Nasional Berdasarkan Prestasi)",
      deskripsi: "Seleksi berdasarkan prestasi akademik dan non-akademik",
      kuota: "30%",
      persyaratan: [
        "Rata-rata rapor minimal 8.0",
        "Memiliki prestasi akademik/non-akademik",
        "Surat rekomendasi sekolah"
      ]
    },
    {
      nama: "SNBT (Seleksi Nasional Berdasarkan Tes)",
      deskripsi: "Seleksi berdasarkan hasil tes tertulis UTBK-SNBT",
      kuota: "50%",
      persyaratan: [
        "Mengikuti UTBK-SNBT",
        "Nilai UTBK sesuai passing grade",
        "Dokumen kelulusan"
      ]
    },
    {
      nama: "Seleksi Mandiri",
      deskripsi: "Seleksi khusus melalui ujian masuk universitas",
      kuota: "20%",
      persyaratan: [
        "Mendaftar melalui portal universitas",
        "Mengikuti ujian seleksi",
        "Wawancara",
        "Dokumen pendukung"
      ]
    }
  ];

  // Data dokumen persyaratan
  const dokumenPersyaratan = [
    "Ijazah dan Nilai Akademik (Legalisir)",
    "Akta Kelahiran",
    "Kartu Keluarga",
    "KTP atau Kartu Identitas",
    "Pas Foto Berwarna (3x4 & 4x6)",
    "Surat Keterangan Sehat",
    "Surat Keterangan Bebas Narkoba (Bagi Jalur Mandiri)",
    "Bukti Nilai UTBK (Bagi Jalur SNBT)"
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
        className="relative bg-[url('/images/backround_penerimaan.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
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
                Pendaftaran <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>PMB</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
                Panduan lengkap proses pendaftaran mahasiswa baru di universitas kami untuk tahun akademik 2024/2025
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Timeline Pendaftaran */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Timeline Pendaftaran</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue to-electric-purple transform -translate-x-1/2 hidden md:block"></div>

            {timelinePendaftaran.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-0`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="relative z-10 mx-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'selesai' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    item.status === 'aktif' ? 'bg-gradient-to-r from-cyber-blue to-electric-purple' :
                    'bg-gradient-to-r from-gray-500 to-gray-600'
                  } shadow-[0_0_15px_rgba(0,240,255,0.3)]`}>
                    {item.status === 'selesai' ? (
                      <CheckCircle className="w-5 h-5 text-foreground" />
                    ) : (
                      <Clock className="w-5 h-5 text-foreground" />
                    )}
                  </div>
                </div>
                <div className={`w-full md:w-1/2 p-6 glass-card rounded-2xl border ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                } hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${
                      item.status === 'selesai' ? 'bg-green-500 hover:bg-green-600' :
                      item.status === 'aktif' ? 'bg-cyber-blue hover:bg-electric-purple' :
                      'bg-gray-500 hover:bg-gray-600'
                    }`}>
                      {item.status === 'selesai' ? 'Selesai' :
                       item.status === 'aktif' ? 'Aktif' : 'Akan Datang'}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{item.tanggal}</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.nama}</h3>
                  <p className="text-muted-foreground">{item.keterangan}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Jalur Masuk */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Jalur Pendaftaran</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jalurMasuk.map((jalur, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <UserPlus className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{jalur.nama}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4">{jalur.deskripsi}</p>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Kuota: </span>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-cyber">{jalur.kuota}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Persyaratan:</h4>
                    <ul className="space-y-2">
                      {jalur.persyaratan.map((syarat, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                    Daftar Sekarang
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dokumen Persyaratan */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Dokumen Persyaratan</h2>

          <div className="glass-card rounded-2xl border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dokumenPersyaratan.map((dokumen, index) => (
                <div key={index} className="flex items-start p-4 bg-muted/50 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-cyber-blue mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{dokumen}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 glass-card rounded-xl border border-cyber-blue/30">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-cyber-blue mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Catatan Penting</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Semua dokumen harus dalam format PDF dengan ukuran maksimal 5MB</li>
                    <li>• Dokumen harus dalam keadaan asli dan tidak terdistorsi</li>
                    <li>• Legalisir dokumen akademik harus dilegalisir oleh sekolah/universitas asal</li>
                    <li>• Pastikan koneksi internet stabil saat upload dokumen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kontak Helpdesk */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Butuh Bantuan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-cyber-blue" />
                Kontak Helpdesk PMB
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Hotline: +62 21 1234 5678</div>
                <div>Email: pmb@universitas.ac.id</div>
                <div>WA: +62 812 3456 7890</div>
                <div>Jam Operasional: 08:00 - 17:00 WIB</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-electric-purple" />
                FAQ PMB
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Bagaimana cara mendaftar?</div>
                <div>• Apa saja dokumen yang diperlukan?</div>
                <div>• Kapan pengumuman hasil seleksi?</div>
                <div>• Bagaimana proses pembayaran?</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
              Lihat FAQ Lengkap
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
