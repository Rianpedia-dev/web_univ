"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Globe,
  Users,
  BookOpen,
  Target,
  Award,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Handshake,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PartnershipPage() {
  // Data partner universitas
  const partnerUniversitas = [
    {
      id: 1,
      nama: "Massachusetts Institute of Technology (MIT)",
      kategori: "Internasional",
      bidang: "Teknologi & Informatika",
      jenisKerjasama: "Joint Research",
      status: "aktif",
      tahunKerjasama: 2020,
      masaBerlaku: "5 tahun",
      statusImplementasi: "berjalan",
      kontak: "international@mit.edu",
      deskripsi: "Kerjasama dalam penelitian kecerdasan buatan dan pengembangan teknologi pendidikan",
      jumlahKegiatan: 12,
      jumlahPublikasi: 8,
      dokumentasi: ["mou-mit.pdf", "laporan-2023.pdf"],
      image: "/images/testimoni.png"
    },
    {
      id: 2,
      nama: "Universitas Gadjah Mada",
      kategori: "Nasional",
      bidang: "Pendidikan & Riset",
      jenisKerjasama: "Student Exchange",
      status: "aktif",
      tahunKerjasama: 2019,
      masaBerlaku: "4 tahun",
      statusImplementasi: "berjalan",
      kontak: "kerjasama@ugm.ac.id",
      deskripsi: "Pertukaran mahasiswa dan dosen serta kolaborasi penelitian bidang pendidikan",
      jumlahKegiatan: 8,
      jumlahPublikasi: 5,
      dokumentasi: ["mou-ugm.pdf", "laporan-2023.pdf"],
      image: "/images/testimoni.png"
    },
    {
      id: 3,
      nama: "PT. Teknologi Maju Indonesia",
      kategori: "Industri",
      bidang: "Teknologi & Informatika",
      jenisKerjasama: "Internship Program",
      status: "aktif",
      tahunKerjasama: 2021,
      masaBerlaku: "3 tahun",
      statusImplementasi: "berjalan",
      kontak: "hrd@teknologimaju.co.id",
      deskripsi: "Program magang dan penyaluran tenaga kerja lulusan Teknik Informatika",
      jumlahKegiatan: 15,
      jumlahPublikasi: 0,
      dokumentasi: ["mou-pt-teknologi.pdf", "laporan-2023.pdf"],
      image: "/images/testimoni.png"
    }
  ];

  // Data jenis kerjasama
  const jenisKerjasama = [
    {
      id: 1,
      nama: "Joint Research",
      deskripsi: "Kerjasama penelitian bersama antar institusi",
      jumlahPartner: 8,
      manfaat: "Publikasi ilmiah bersama, pengembangan penelitian",
      icon: Target
    },
    {
      id: 2,
      nama: "Student Exchange",
      deskripsi: "Pertukaran mahasiswa antar universitas",
      jumlahPartner: 5,
      manfaat: "Pengalaman internasional, peningkatan kapasitas akademik",
      icon: Users
    },
    {
      id: 3,
      nama: "Faculty Exchange",
      deskripsi: "Pertukaran dosen antar institusi",
      jumlahPartner: 4,
      manfaat: "Peningkatan kualitas pengajaran, kolaborasi akademik",
      icon: BookOpen
    },
    {
      id: 4,
      nama: "Internship Program",
      deskripsi: "Program magang untuk mahasiswa",
      jumlahPartner: 12,
      manfaat: "Pengalaman kerja nyata, penyaluran tenaga kerja",
      icon: Award
    }
  ];


  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background grid dengan opacity minimal */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-0" />

      {/* Gradient orbs dengan opacity minimal */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/2 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/2 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/kerjasama.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Kemitraan & Kerjasama
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Kemitraan strategis dengan berbagai institusi dalam dan luar negeri
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Statistik Kemitraan */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              45
            </div>
            <div className="text-muted-foreground text-sm">Total Partner</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Handshake className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              128
            </div>
            <div className="text-muted-foreground text-sm">Kegiatan Kerjasama</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              64
            </div>
            <div className="text-muted-foreground text-sm">Publikasi Bersama</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              320+
            </div>
            <div className="text-muted-foreground text-sm">Mahasiswa Terlibat</div>
          </div>
        </motion.div>

        {/* Daftar Partner */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Daftar Partner</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerUniversitas.map((partner, index) => {
              return (
                <motion.div
                  key={partner.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <img src={partner.image} alt={partner.nama} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{partner.nama}</h3>
                        <Badge className={`${partner.status === 'aktif' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                          {partner.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{partner.deskripsi}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Bidang</span>
                        <span className="font-semibold text-foreground">{partner.bidang}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Kategori</span>
                        <span className="font-semibold text-foreground">{partner.kategori}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Jenis Kerjasama</span>
                        <span className="font-semibold text-foreground">{partner.jenisKerjasama}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tahun Kerjasama</span>
                        <span className="font-semibold text-foreground">{partner.tahunKerjasama}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Masa Berlaku</span>
                        <span className="font-semibold text-foreground">{partner.masaBerlaku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status Implementasi</span>
                        <Badge variant={partner.statusImplementasi === 'berjalan' ? 'default' : 'secondary'} className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                          {partner.statusImplementasi}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-cyber">{partner.jumlahKegiatan}</div>
                        <div className="text-xs text-muted-foreground">Kegiatan</div>
                      </div>
                      <div className="text-center p-3 bg-electric-purple/10 rounded-lg border border-electric-purple/20">
                        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">{partner.jumlahPublikasi}</div>
                        <div className="text-xs text-muted-foreground">Publikasi</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Profil Partner
                      </Button>
                      <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                        <Download className="w-4 h-4 mr-2" />
                        Dokumen
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Jenis Kerjasama */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Jenis Kerjasama</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jenisKerjasama.map((kerjasama, index) => {
              const IconComponent = kerjasama.icon;
              return (
                <motion.div
                  key={kerjasama.id}
                  className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 3) }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{kerjasama.nama}</h3>
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">Jenis Kerjasama</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{kerjasama.deskripsi}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Jumlah Partner Terlibat</span>
                      <span className="font-semibold text-foreground">{kerjasama.jumlahPartner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Manfaat Kerjasama</span>
                      <span className="font-semibold text-sm text-foreground">{kerjasama.manfaat}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                    <Handshake className="w-4 h-4 mr-2" />
                    Detail Kerjasama
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Kontak Kemitraan */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kontak Kerjasama & Kemitraan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">kerjasama@university.ac.id</p>
              <p className="text-sm text-muted-foreground">Untuk pertanyaan umum</p>
            </div>
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
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Alamat</h3>
              <p className="text-muted-foreground">Gedung Rektorat Lt. 2</p>
              <p className="text-sm text-muted-foreground">Kampus Utama</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] text-foreground">
              <Handshake className="w-4 h-4 mr-2" />
              Ajukan Kerjasama Baru
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
