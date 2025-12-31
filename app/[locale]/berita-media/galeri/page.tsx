import { Button } from "@/components/ui/button";
import {
  Video,
  Camera,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { getPublishedGalleryMedia } from '@/lib/db';
import GalleryGrid from './GalleryGrid';

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  // Await params di awal sesuai spek Next.js 15
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'id';

  let mediaItems: any[] = [];
  try {
    // Ambil data dari database (langsung dari gallery_media)
    const result = await getPublishedGalleryMedia();
    mediaItems = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error in GaleriPage:', error);
    mediaItems = [];
  }

  // Kategori statis untuk filter UI
  const kategori = [
    { id: 1, nama: "Semua", slug: "all" },
    { id: 2, nama: "Kegiatan Akademik", slug: "kegiatan-akademik" },
    { id: 3, nama: "Kemahasiswaan", slug: "kegiatan-kemahasiswaan" },
    { id: 4, nama: "Prestasi", slug: "prestasi" },
    { id: 5, nama: "Wisuda", slug: "wisuda" },
    { id: 6, nama: "Fasilitas", slug: "fasilitas" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div
        className="relative bg-[url('/images/backround_berita_media.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <MotionDiv
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                Galeri Kampus
              </h1>
              <p className="text-lg text-foreground max-w-2xl mx-auto font-medium bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                Dokumentasi visual kegiatan, fasilitas, dan momen berharga di Universitas
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Gallery Grid (Client Component) */}
        <GalleryGrid mediaItems={mediaItems} kategori={kategori} />
      </div>
    </div>
  );
}
