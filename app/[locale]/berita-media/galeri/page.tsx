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
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">


      <div
        className="relative bg-[url('/0')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <MotionDiv
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px #fcffa5ff',
                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
              }}>
                GALERI KAMPUS
              </h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Gallery Grid (Client Component) */}
        <GalleryGrid mediaItems={mediaItems} />
      </div>
    </div>
  );
}
