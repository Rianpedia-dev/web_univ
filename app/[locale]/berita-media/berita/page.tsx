import {
  getLatestNewsWithCategory,
  getUniversityProfile
} from '@/lib/db';
import { MotionDiv } from "@/components/motion-wrapper";
import { NewsList } from '@/components/NewsList';

export default async function BeritaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database (dengan informasi kategori)
  const [allNews, uniProfile] = await Promise.all([
    getLatestNewsWithCategory(10),
    getUniversityProfile()
  ]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/0')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px #fcffa5ff',
                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
              }}>
                BERITA & MEDIA
              </h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <NewsList initialNews={allNews} uniProfile={uniProfile} />
      </div>
    </div>
  );
}
