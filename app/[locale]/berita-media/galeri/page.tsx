import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Video,
  Users,
  Calendar,
  Eye,
  Camera,
  Trophy,
  GraduationCap
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedGalleryAlbums } from '@/lib/db';
import Image from 'next/image';

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const albums = await getPublishedGalleryAlbums();

  // Kategori statis untuk filter UI
  const kategori = [
    { id: 1, nama: "Semua", slug: "all" },
    { id: 2, nama: "Kegiatan", slug: "kegiatan" },
    { id: 3, nama: "Fasilitas", slug: "fasilitas" },
    { id: 4, nama: "Prestasi", slug: "prestasi" },
    { id: 5, nama: "Wisuda", slug: "wisuda" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}
            >
              Galeri <span style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>Kampus</span>
            </h1>
            <p className="text-lg text-foreground max-w-2xl font-medium">
              Dokumentasi visual kegiatan, fasilitas, dan momen berharga di Universitas
            </p>
          </MotionDiv>

          <MotionDiv
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {kategori.map((cat) => (
              <Button
                key={cat.id}
                variant={cat.slug === "all" ? "default" : "outline"}
                className={`rounded-full px-6 ${cat.slug === "all"
                    ? "bg-gradient-cyber shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "border-white/10 hover:border-cyber-blue/50"
                  }`}
              >
                {cat.nama}
              </Button>
            ))}
          </MotionDiv>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {albums.map((album, index) => (
            <MotionDiv
              key={album.id}
              className="glass-card rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={album.coverImage || "/images/galeri_placeholder.png"}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <ImageIcon className="w-5 h-5 text-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-4 text-xs text-white/80">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {album.createdAt ? new Date(album.createdAt).toLocaleDateString('id-ID') : '-'}</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-cyber-blue transition-colors">
                  {album.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                  {album.description || "Dokumentasi kegiatan kampus."}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-white/10 text-muted-foreground">
                    Lihat Koleksi
                  </Badge>
                  <div className="flex items-center text-cyber-blue font-bold group-hover:translate-x-1 transition-transform">
                    Buka Album
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Statik Sections untuk variasi visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 text-center">
          <MotionDiv
            className="glass-card p-12 rounded-[3rem] border border-white/10 group relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyber-blue/20 transition-colors" />
            <div className="w-20 h-20 bg-gradient-cyber rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Camera className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Kirim Foto Kegiatan</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Punya dokumentasi kegiatan kampus? Bagikan dengan kami untuk ditampilkan di galeri resmi.
            </p>
            <Button className="bg-gradient-cyber px-8 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all">
              Unggah Sekarang
            </Button>
          </MotionDiv>

          <MotionDiv
            className="glass-card p-12 rounded-[3rem] border border-white/10 group relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-purple/10 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-electric-purple/20 transition-colors" />
            <div className="w-20 h-20 bg-gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Video className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Kanal Video Kampus</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Tonton kompilasi kegiatan, profil universitas, dan materi edukatif di Youtube resmi kami.
            </p>
            <Button variant="outline" className="border-electric-purple text-electric-purple hover:bg-electric-purple/10 px-8 py-6 rounded-full font-bold text-lg">
              Kunjungi Youtube
            </Button>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
