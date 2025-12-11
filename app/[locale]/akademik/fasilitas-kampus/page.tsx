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
  Lightbulb,
  Library,
  Factory,
  Home,
  HeartPulse,
  GraduationCapIcon,
  Computer,
  Dumbbell,
  TreePine,
  Eye,
  Download,
  Folder,
  Camera,
  Clock,
  Maximize
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function FasilitasKampusPage() {
  // Data fasilitas kampus
  const fasilitas = [
    {
      id: 1,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
    },
    {
      id: 2,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
    },
    {
      id: 3,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
    },
    {
      id: 4,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
    },
    {
      id: 5,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
    },
    {
      id: 6,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan modern dengan koleksi buku yang lengkap, ruang baca nyaman, dan akses internet cepat.",
      lokasi: "Gedung Pusat, Lantai 1-3",
      jamOperasional: "08:00 - 22:00 WIB",
      fasilitasTambahan: ["WiFi Gratis", "Ruang Diskusi", "Komputer Umum", "Ruang Santai"],
      jumlahKapasitas: 500,
      image: "/images/fasilitas.png",
      tahun: 2024
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
            Fasilitas <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Kampus</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Temukan fasilitas lengkap yang tersedia di kampus kami untuk mendukung kegiatan akademik dan non-akademik
          </p>
        </motion.div>

        {/* Daftar Fasilitas */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Fasilitas Kampus</h2>
            <div className="flex gap-2">
              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fasilitas.map((fasilitasItem, index) => (
              <motion.div
                key={fasilitasItem.id}
                className="glass-card rounded-2xl border overflow-hidden group hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 flex items-center justify-center overflow-hidden">
                    <img
                      src={fasilitasItem.image}
                      alt={fasilitasItem.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-4 text-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{fasilitasItem.jumlahKapasitas}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{fasilitasItem.jamOperasional}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{fasilitasItem.tahun}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{fasilitasItem.nama}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{fasilitasItem.deskripsi}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{fasilitasItem.lokasi}</span>
                    <Button variant="outline" size="sm" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                      <MapPin className="w-4 h-4 mr-1" />
                      Lihat
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