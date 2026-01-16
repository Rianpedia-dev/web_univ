import { Badge } from "@/components/ui/badge";
import { getPublishedStudentAchievements, getPublishedUniversityProfile } from '@/lib/db';
import { AchievementList } from "@/components/AchievementList";

export default async function PrestasiMahasiswaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const allAchievements = await getPublishedStudentAchievements();
  const universityProfiles = await getPublishedUniversityProfile();
  const universityProfile = universityProfiles[0] || null;

  // Tampilkan semua prestasi (karena skema sudah disederhanakan)
  const prestasiKompetisi = allAchievements;

  // Hitung statistik
  const stats = {
    total: prestasiKompetisi.length,
    internasional: prestasiKompetisi.filter(a => a.achievementLevel === 'international').length,
    nasional: prestasiKompetisi.filter(a => a.achievementLevel === 'national').length,
    regional: prestasiKompetisi.filter(a => a.achievementLevel === 'regional').length,
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      <div className="relative z-10">
        {/* Full width background image section for header */}
        <div
          className="relative bg-[url('/images/prestasi-mahasiswa.png')] bg-cover bg-center bg-no-repeat border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 py-44 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                  background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  WebkitTextStroke: '1px #fcffa5ff',
                  textShadow: '0 2px 2px rgba(0,0,0,0.5)'
                }}>
                  PRESTASI MAHASISWA
                </h1>
              </div>
            </div>
          </div>
        </div>


        <div className="container mx-auto px-4 pb-16">
          {/* Prestasi List */}
          <div className="mb-16">
            <div className="flex flex-col items-center justify-center mb-8 gap-4">
              <Badge variant="outline" className="text-cyber-blue border-cyber-blue bg-cyber-blue/10 px-6 py-1.5 text-sm uppercase tracking-widest">
                Total: {stats.total} Prestasi
              </Badge>
            </div>

            <AchievementList
              achievements={prestasiKompetisi as any}
              universityProfile={universityProfile}
            />
          </div>


          {/* Stats Section */}

        </div>
      </div>
    </div>
  );
}