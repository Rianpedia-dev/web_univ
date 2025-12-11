"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Image,
  Video,
  Users,
  Calendar,
  Star,
  Heart,
  Eye,
  Download,
  Folder,
  Camera,
  Award,
  Trophy,
  BookOpen,
  GraduationCap,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function GaleriPage() {
  // Data galeri foto
  const fotoKegiatan = [
    {
      id: 1,
      judul: "Wisuda Angkatan 2024",
      kategori: "Wisuda",
      tanggal: "15 Juli 2024",
      deskripsi: "Prosesi wisuda sarjana dan magister tahun 2024 dengan jumlah wisudawan terbanyak",
      jumlahFoto: 45,
      jumlahDilihat: 1200,
      jumlahDisukai: 240,
      thumbnail: "wisuda-2024-thumb.jpg",
      folder: "Wisuda 2024",
      tahun: 2024,
      lokasi: "Gedung Serba Guna"
    },
    {
      id: 2,
      judul: "Seminar Teknologi Informasi",
      kategori: "Akademik",
      tanggal: "10 Juni 2024",
      deskripsi: "Seminar nasional tentang perkembangan teknologi informasi terkini",
      jumlahFoto: 32,
      jumlahDilihat: 890,
      jumlahDisukai: 180,
      thumbnail: "seminar-ti-thumb.jpg",
      folder: "Seminar 2024",
      tahun: 2024,
      lokasi: "Aula Utama"
    },
    {
      id: 3,
      judul: "Pekan Olahraga Mahasiswa",
      kategori: "Olahraga",
      tanggal: "5 Agustus 2024",
      deskripsi: "Pertandingan antar fakultas dalam rangka memperingati hari kemerdekaan",
      jumlahFoto: 28,
      jumlahDilihat: 1100,
      jumlahDisukai: 310,
      thumbnail: "pom-2024-thumb.jpg",
      folder: "Olahraga 2024",
      tahun: 2024,
      lokasi: "Lapangan Olahraga"
    },
    {
      id: 4,
      judul: "Festival Seni Kampus",
      kategori: "Budaya",
      tanggal: "20 September 2024",
      deskripsi: "Pertunjukan seni dari berbagai UKM seni kampus",
      jumlahFoto: 36,
      jumlahDilihat: 750,
      jumlahDisukai: 220,
      thumbnail: "festival-seni-thumb.jpg",
      folder: "Seni 2024",
      tahun: 2024,
      lokasi: "Amphitheater"
    }
  ];

  // Data galeri video
  const videoKegiatan = [
    {
      id: 1,
      judul: "Profil Universitas 2024",
      durasi: "3:45",
      tanggal: "1 Januari 2024",
      deskripsi: "Video profil universitas menampilkan fasilitas dan kegiatan kampus",
      thumbnail: "profil-uni-thumb.jpg",
      kategori: "Profil",
      tahun: 2024
    },
    {
      id: 2,
      judul: "Wisuda 2024 Highlight",
      durasi: "5:22",
      tanggal: "16 Juli 2024",
      deskripsi: "Moments terbaik dalam prosesi wisuda 2024",
      thumbnail: "wisuda-highlight-thumb.jpg",
      kategori: "Wisuda",
      tahun: 2024
    },
    {
      id: 3,
      judul: "Pengenalan Prodi Teknik Informatika",
      durasi: "4:18",
      tanggal: "5 September 2024",
      deskripsi: "Video pengenalan program studi Teknik Informatika untuk mahasiswa baru",
      thumbnail: "tif-pengenalan-thumb.jpg",
      kategori: "Prodi",
      tahun: 2024
    }
  ];

  const kategoriGaleri = [
    { id: 'akademik', name: 'Akademik', icon: BookOpen, count: 24 },
    { id: 'kemahasiswaan', name: 'Kemahasiswaan', icon: Users, count: 18 },
    { id: 'wisuda', name: 'Wisuda', icon: GraduationCap, count: 6 },
    { id: 'olahraga', name: 'Olahraga', icon: Star, count: 12 },
    { id: 'seni', name: 'Seni & Budaya', icon: Camera, count: 15 },
    { id: 'prestasi', name: 'Prestasi', icon: Trophy, count: 8 }
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
            Galeri <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Kegiatan</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Koleksi foto dan video dokumentasi kegiatan di lingkungan universitas
          </p>
        </motion.div>

        {/* Filter Kategori */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Galeri</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriGaleri.map((kategori) => {
              const IconComponent = kategori.icon;
              return (
                <Button
                  key={kategori.id}
                  variant="outline"
                  className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <IconComponent className="w-4 h-4" />
                  {kategori.name} ({kategori.count})
                </Button>
              );
            })}
            <Button
              variant="outline"
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
            >
              Lihat Semua
            </Button>
          </div>
        </motion.div>

        {/* Galeri Foto */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Foto Kegiatan</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
              >
                Terbaru
              </Button>
              <Button
                variant="outline"
                className="border-electric-purple text-electric-purple hover:bg-electric-purple/10"
              >
                Favorit
              </Button>
              <Button
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/10"
              >
                2024
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fotoKegiatan.map((foto, index) => (
              <motion.div
                key={foto.id}
                className="glass-card rounded-2xl border overflow-hidden group hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 flex items-center justify-center">
                    <Image className="w-16 h-16 text-cyber-blue/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-4 text-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{foto.jumlahDilihat}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{foto.jumlahDisukai}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        <span>{foto.jumlahFoto}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">{foto.kategori}</Badge>
                    <span className="text-sm text-muted-foreground">{foto.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{foto.judul}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{foto.deskripsi}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{foto.lokasi}</span>
                    <Button variant="outline" size="sm" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <Download className="w-4 h-4 mr-1" />
                      Lihat
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Galeri Video */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Video Kegiatan</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
              >
                Terbaru
              </Button>
              <Button
                variant="outline"
                className="border-electric-purple text-electric-purple hover:bg-electric-purple/10"
              >
                Populer
              </Button>
              <Button
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/10"
              >
                2024
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoKegiatan.map((video, index) => (
              <motion.div
                key={video.id}
                className="glass-card rounded-2xl border overflow-hidden group hover:scale-105 hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 4) }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-electric-purple/20 to-neon-pink/20 flex items-center justify-center">
                    <Video className="w-16 h-16 text-electric-purple/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-cyber-blue/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Video className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-cyber-blue/50 text-foreground text-xs px-2 py-1 rounded">
                    {video.durasi}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">{video.kategori}</Badge>
                    <span className="text-sm text-muted-foreground">{video.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{video.judul}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{video.deskripsi}</p>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <Video className="w-4 h-4 mr-1" />
                      Tonton
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
