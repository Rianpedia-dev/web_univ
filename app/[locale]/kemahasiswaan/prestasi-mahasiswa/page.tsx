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
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10">
        {/* Full width background image section for header */}
        <div
          className="relative bg-[url('/images/layanan_mahasiswa.png')] bg-cover bg-center bg-no-repeat border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                  Prestasi <span style={{
                    background: 'linear-gradient(to right, #10b981, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    WebkitTextStroke: '1px black',
                    textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
                  }}>Mahasiswa</span>
                </h1>
              </div>
            </div>
          </div>
        </div>


        <div className="container mx-auto px-4 pb-16">
          {/* Prestasi List */}
          <div className="mb-16">
            <div className="flex flex-col items-center justify-center mb-8 gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center animate-fade-in-up">
                Prestasi Minat, Bakat & Kompetisi
              </h2>
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