"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Bell,
  Calendar,
  GalleryVertical,
  User,
  Clock,
  Eye,
  Share2,
  Search,
  Tag,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function BeritaPage() {
  // Data berita terbaru
  const berita = [
    {
      id: 1,
      judul: "Pengumuman Wisuda Tahun 2024",
      tanggal: "15 November 2024",
      penulis: "Admin Kampus",
      kategori: "Akademik",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Pelaksanaan wisuda tahun ini akan dilaksanakan pada bulan Desember dengan protokol kesehatan yang ketat...",
      views: 1250,
      tags: ["wisuda", "acara", "akademik"]
    },
    {
      id: 2,
      judul: "Perpanjangan Jadwal Pembayaran UKT",
      tanggal: "10 November 2024",
      penulis: "BAAP",
      kategori: "Administrasi",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Mahasiswa diberikan waktu tambahan untuk pembayaran UKT semester ganjil 2024/2025 hingga akhir bulan ini...",
      views: 890,
      tags: ["ukt", "pembayaran", "administrasi"]
    },
    {
      id: 3,
      judul: "Kunjungan Industri ke PT. Tech Innovations",
      tanggal: "5 November 2024",
      penulis: "Humas Kampus",
      kategori: "Kegiatan",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Mahasiswa Teknik Informatika melakukan kunjungan industri ke perusahaan teknologi terkemuka di Jakarta...",
      views: 1560,
      tags: ["kunjungan", "industri", "teknik informatika"]
    },
    {
      id: 4,
      judul: "Workshop Digital Marketing Bersama Google",
      tanggal: "2 November 2024",
      penulis: "PKM",
      kategori: "Pelatihan",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Mahasiswa diajak untuk mengikuti workshop digital marketing gratis bersama tim dari Google...",
      views: 2100,
      tags: ["workshop", "digital marketing", "google"]
    },
    {
      id: 5,
      judul: "Pemenang Lomba Inovasi Kampus 2024",
      tanggal: "28 Oktober 2024",
      penulis: "Humas Kampus",
      kategori: "Prestasi",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Tim mahasiswa dari Fakultas Teknik meraih juara 1 dalam lomba inovasi teknologi tingkat nasional...",
      views: 3400,
      tags: ["lomba", "inovasi", "prestasi"]
    },
    {
      id: 6,
      judul: "Seminar Nasional Teknologi 2024",
      tanggal: "25 Oktober 2024",
      penulis: "Prodi TI",
      kategori: "Seminar",
      thumbnail: "/api/placeholder/400/250",
      excerpt: "Seminar nasional dengan tema \"Teknologi untuk Masa Depan\" akan diselenggarakan bulan depan...",
      views: 1800,
      tags: ["seminar", "teknologi", "nasional"]
    }
  ];

  // Data kategori
  const kategori = [
    { nama: "Semua", jumlah: 156 },
    { nama: "Akademik", jumlah: 42 },
    { nama: "Administrasi", jumlah: 38 },
    { nama: "Kegiatan", jumlah: 51 },
    { nama: "Prestasi", jumlah: 25 },
    { nama: "Seminar", jumlah: 18 }
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
        className="relative bg-[url('/images/backround_berita_media.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Berita Kampus
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Berita terbaru dan terkini seputar kegiatan, pengumuman, dan informasi penting di lingkungan kampus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Featured News */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Berita Utama</h2>
              <div className="glass-card rounded-xl overflow-hidden border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={berita[0].thumbnail}
                      alt={berita[0].judul}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">{berita[0].kategori}</Badge>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{berita[0].judul}</h3>
                    <p className="text-muted-foreground mb-4">{berita[0].excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {berita[0].penulis}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {berita[0].tanggal}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {berita[0].views}
                      </div>
                    </div>
                    <Button className="mt-6 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Berita Terbaru</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari berita..."
                    className="pl-10 pr-4 py-2 border border-cyber-blue/30 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent bg-muted/50 text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {berita.slice(1).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="glass-card rounded-xl overflow-hidden border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">{item.kategori}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">{item.judul}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {item.penulis}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.tanggal}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} className="text-xs bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                  Muat Lebih Banyak
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-foreground">Kategori</h3>
              <div className="space-y-2">
                {kategori.map((kat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 glass-card rounded-lg border hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer transition-all duration-300"
                  >
                    <span className="text-muted-foreground">{kat.nama}</span>
                    <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">{kat.jumlah}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular News */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-foreground">Berita Populer</h3>
              <div className="space-y-4">
                {berita.slice(0, 3).map((item, index) => (
                  <div key={item.id} className="flex gap-4 p-4 glass-card rounded-lg border">
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1 text-foreground">{item.judul}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.tanggal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="glass-card rounded-xl p-6 border">
              <h3 className="font-bold text-lg mb-2 text-foreground">Newsletter</h3>
              <p className="text-sm mb-4 text-muted-foreground">Dapatkan berita terbaru langsung di email Anda</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 text-foreground placeholder-muted-foreground border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                />
                <Button className="w-full bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
