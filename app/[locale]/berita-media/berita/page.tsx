import { Button } from "@/components/ui/button";
import {
  User,
  Clock,
  Eye,
  Search,
  ArrowRight
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getLatestNewsWithCategory, getUniversityProfile } from '@/lib/db';
import Image from 'next/image';
import { NewsList } from '@/components/NewsList';

export default async function BeritaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database (dengan informasi kategori)
  const [allNews, uniProfile] = await Promise.all([
    getLatestNewsWithCategory(10),
    getUniversityProfile()
  ]);

  // Data kategori tetap menggunakan data statis untuk sementara
  const kategori = [
    { id: 1, nama: "Semua", slug: "all" },
    { id: 2, nama: "Akademik", slug: "akademik" },
    { id: 3, nama: "Kemahasiswaan", slug: "kemahasiswaan" },
    { id: 4, nama: "Penelitian", slug: "penelitian" },
    { id: 5, nama: "Event", slug: "event" }
  ];

  // Berita utama (berita terbaru)
  const beritaUtama = allNews[0];
  const beritaLainnya = allNews.slice(1);

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
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <MotionDiv
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
                Berita & Media
              </h1>
              <p className="text-lg text-foreground max-w-2xl mx-auto font-medium bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                Update terbaru mengenai kegiatan, prestasi, dan informasi penting dari lingkungan kampus
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Category Buttons */}
        <MotionDiv
          className="flex flex-wrap justify-center gap-2 mb-12"
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

        <NewsList initialNews={allNews} uniProfile={uniProfile} />

        {/* Pagination/Load More */}
        <MotionDiv
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button className="bg-transparent border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 px-8 py-6 rounded-full font-bold text-lg">
            Muat Lebih Banyak Berita
          </Button>
        </MotionDiv>
      </div>
    </div>
  );
}
