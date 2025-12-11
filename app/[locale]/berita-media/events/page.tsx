"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Award,
  Star,
  FileText,
  Download,
  ExternalLink,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function AgendaPage() {
  // Data agenda/events
  const agendaItems = [
    {
      id: 1,
      title: "Seminar Nasional Teknologi Informasi",
      tanggal: "15 Januari 2025",
      waktu: "08:00 - 16:00",
      tempat: "Gedung Serba Guna Kampus",
      penyelenggara: "Fakultas Teknik",
      jenisKegiatan: "Akademik",
      deskripsi: "Seminar tentang perkembangan teknologi informasi terkini dan dampaknya terhadap dunia pendidikan",
      narasumber: "Dr. Ir. Ahmad Kurniawan, M.T.",
      kuota: 300,
      biaya: "Gratis",
      status: "akanDatang",
      kategori: "Seminar",
      dokumentasi: ["poster-seminar.jpg", "flyer-seminar.pdf"]
    },
    {
      id: 2,
      title: "Pekan Olahraga Mahasiswa",
      tanggal: "20 Februari 2025",
      waktu: "07:00 - 17:00",
      tempat: "Lapangan Olahraga Kampus",
      penyelenggara: "BEM Universitas",
      jenisKegiatan: "Kemahasiswaan",
      deskripsi: "Ajang kompetisi olahraga antar fakultas untuk meningkatkan semangat persatuan dan sportivitas",
      narasumber: "Komite Olahraga Mahasiswa",
      kuota: 500,
      biaya: "Rp 50.000",
      status: "akanDatang",
      kategori: "Olahraga",
      dokumentasi: ["poster-olahraga.jpg", "jadwal-kegiatan.pdf"]
    },
    {
      id: 3,
      title: "Workshop Digital Marketing",
      tanggal: "10 Maret 2025",
      waktu: "09:00 - 15:00",
      tempat: "Laboratorium Komputer FEB",
      penyelenggara: "Himpunan Mahasiswa Manajemen",
      jenisKegiatan: "Non-Akademik",
      deskripsi: "Workshop praktis tentang strategi pemasaran digital untuk bisnis modern",
      narasumber: "Bapak Dwi Santoso (Digital Marketing Expert)",
      kuota: 150,
      biaya: "Rp 100.000",
      status: "dibukaPendaftaran",
      kategori: "Workshop",
      dokumentasi: ["poster-workshop.jpg", "materi-workshop.pdf"]
    },
    {
      id: 4,
      title: "Pelatihan Jurnalisme Digital",
      tanggal: "25 Maret 2025",
      waktu: "13:00 - 17:00",
      tempat: "Ruang Multimedia FISIP",
      penyelenggara: "Unit Kegiatan Jurnalistik",
      jenisKegiatan: "Non-Akademik",
      deskripsi: "Pelatihan dasar jurnalisme digital untuk mahasiswa yang tertarik di bidang media",
      narasumber: "Ibu Siti Nurhaliza (Wartawan Senior)",
      kuota: 80,
      biaya: "Gratis",
      status: "akanDatang",
      kategori: "Pelatihan",
      dokumentasi: ["poster-jurnalistik.jpg", "silabus.pdf"]
    }
  ];

  const kategoriAgenda = [
    { id: 'akademik', name: 'Akademik', icon: FileText, count: 2 },
    { id: 'kemahasiswaan', name: 'Kemahasiswaan', icon: Users, count: 1 },
    { id: 'olahraga', name: 'Olahraga', icon: Star, count: 1 },
    { id: 'workshop', name: 'Workshop', icon: Award, count: 1 }
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
            Event <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Kampus</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Kalender lengkap kegiatan dan event di lingkungan universitas
          </p>
        </motion.div>

        {/* Statistik Agenda */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Calendar className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              12
            </div>
            <div className="text-muted-foreground text-sm">Event Bulan Ini</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              1.200+
            </div>
            <div className="text-muted-foreground text-sm">Peserta Terdaftar</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              8
            </div>
            <div className="text-muted-foreground text-sm">Fakultas Terlibat</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Clock className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              4.5
            </div>
            <div className="text-muted-foreground text-sm">Rata-rata Rating</div>
          </div>
        </motion.div>

        {/* Filter Kategori */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Agenda</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriAgenda.map((kategori) => {
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

        {/* Daftar Agenda */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Agenda Mendatang</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Minggu Ini</Button>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Bulan Ini</Button>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Terbaru</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agendaItems.map((agenda, index) => (
              <motion.div
                key={agenda.id}
                className="glass-card rounded-2xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${agenda.status === 'akanDatang' ? 'bg-cyber-blue' : agenda.status === 'dibukaPendaftaran' ? 'bg-electric-purple' : 'bg-gray-500'} hover:bg-opacity-80`}>
                          {agenda.status === 'akanDatang' ? 'Akan Datang' : agenda.status === 'dibukaPendaftaran' ? 'Pendaftaran Dibuka' : 'Selesai'}
                        </Badge>
                        <Badge variant="secondary" className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">{agenda.kategori}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{agenda.title}</h3>
                      <p className="text-cyber-blue font-semibold">{agenda.penyelenggara}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{agenda.deskripsi}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyber-blue" />
                      <div>
                        <span className="text-sm text-muted-foreground">Tanggal</span>
                        <p className="font-semibold text-foreground">{agenda.tanggal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-electric-purple" />
                      <div>
                        <span className="text-sm text-muted-foreground">Waktu</span>
                        <p className="font-semibold text-foreground">{agenda.waktu}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-neon-green" />
                    <div>
                      <span className="text-sm text-muted-foreground">Tempat</span>
                      <p className="font-semibold text-foreground">{agenda.tempat}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Kuota</span>
                      <p className="font-semibold text-foreground">{agenda.kuota} Orang</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Biaya</span>
                      <p className="font-semibold text-foreground">{agenda.biaya}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Narasumber</span>
                      <p className="font-semibold text-sm text-muted-foreground">{agenda.narasumber}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 px-2 py-1 rounded">
                      {agenda.jenisKegiatan}
                    </span>
                    <span className="text-xs bg-electric-purple/20 text-electric-purple border border-electric-purple/30 px-2 py-1 rounded">
                      {agenda.status === 'akanDatang' ? 'Pendaftaran Akan Dibuka' : 'Pendaftaran Dibuka'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <FileText className="w-4 h-4 mr-2" />
                      Detail Kegiatan
                    </Button>
                    <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <Download className="w-4 h-4 mr-2" />
                      Brosur
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Kalender Interaktif */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 border mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kalender Kegiatan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { bulan: "Januari", jumlah: 8, warna: "from-cyber-blue to-electric-purple" },
              { bulan: "Februari", jumlah: 12, warna: "from-electric-purple to-neon-pink" },
              { bulan: "Maret", jumlah: 15, warna: "from-neon-pink to-neon-green" }
            ].map((bulan, index) => (
              <div key={index} className="glass-card p-4 rounded-xl text-center border">
                <div className={`w-16 h-16 bg-gradient-${bulan.warna} rounded-full flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]`}>
                  <Calendar className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{bulan.bulan}</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{bulan.jumlah}</p>
                <p className="text-sm text-muted-foreground">Kegiatan</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}