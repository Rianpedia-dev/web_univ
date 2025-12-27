import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  GraduationCap,
  Trophy,
  Star,
  Users,
  BookOpen,
  Target,
  Calendar,
  FileText,
  Download,
  Globe,
  Heart,
  Medal,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedStudentAchievements } from '@/lib/db';

export default async function PrestasiMahasiswaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const allAchievements = await getPublishedStudentAchievements();

  // Membagi data menjadi akademik dan non-akademik
  const prestasiAkademik = allAchievements.filter(a =>
    a.achievementType === 'academic' || a.achievementType === 'research'
  );

  const prestasiNonAkademik = allAchievements.filter(a =>
    a.achievementType !== 'academic' && a.achievementType !== 'research'
  );

  // Hitung statistik untuk kategori
  const stats = {
    akademik: prestasiAkademik.length,
    nonAkademik: prestasiNonAkademik.length,
    internasional: allAchievements.filter(a => a.achievementLevel === 'international').length,
    nasional: allAchievements.filter(a => a.achievementLevel === 'national').length,
    regional: allAchievements.filter(a => a.achievementLevel === 'regional').length,
    local: allAchievements.filter(a => a.achievementLevel === 'local').length,
  };

  const kategoriPrestasi = [
    { id: 'akademik', name: 'Akademik', icon: GraduationCap, count: stats.akademik },
    { id: 'non-akademik', name: 'Non-Akademik', icon: Star, count: stats.nonAkademik },
    { id: 'internasional', name: 'Internasional', icon: Globe, count: stats.internasional },
    { id: 'nasional', name: 'Nasional', icon: Award, count: stats.nasional },
    { id: 'regional', name: 'Regional', icon: Medal, count: stats.regional },
    { id: 'lokal', name: 'Lokal/Univ', icon: Target, count: stats.local }
  ];

  // Map ikon berdasarkan type/level (helper)
  const getIcon = (type: string) => {
    switch (type) {
      case 'academic': return GraduationCap;
      case 'research': return BookOpen;
      case 'competition': return Trophy;
      case 'non_academic': return Star;
      default: return Award;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MotionH1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
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
          </MotionH1>
          <MotionP className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Kumpulan prestasi dan penghargaan yang diraih oleh mahasiswa universitas yang membanggakan.
          </MotionP>
        </MotionDiv>

        {/* Filter Kategori */}
        <MotionDiv
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Prestasi</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriPrestasi.map((kategori) => {
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
          </div>
        </MotionDiv>

        {/* Prestasi Akademik */}
        {prestasiAkademik.length > 0 && (
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Prestasi Akademik & Riset</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {prestasiAkademik.map((prestasi, index) => {
                const IconComponent = getIcon(prestasi.achievementType);
                return (
                  <MotionDiv
                    key={prestasi.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                          <IconComponent className="w-6 h-6 text-foreground/90" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{prestasi.studentName || prestasi.studentId || 'Mahasiswa'}</h3>
                          <Badge variant="outline" className="border-electric-purple text-electric-purple bg-electric-purple/20 capitalize">
                            {prestasi.achievementType.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">{prestasi.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Prodi</span>
                          <span className="font-semibold text-foreground text-right">{prestasi.studyProgramName || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tingkat</span>
                          <span className="font-semibold text-foreground capitalize">{prestasi.achievementLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tahun</span>
                          <span className="font-semibold text-foreground">{prestasi.eventDate ? new Date(prestasi.eventDate).getFullYear() : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Kategori</span>
                          <span className="font-semibold text-sm text-foreground capitalize">{prestasi.achievementCategory}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground block mb-2">Kegiatan:</span>
                        <p className="font-semibold bg-clip-text text-transparent bg-gradient-cyber">{prestasi.title}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          <FileText className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                          <Globe className="w-4 h-4 mr-2" />
                          Link
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Prestasi Non-Akademik */}
        {prestasiNonAkademik.length > 0 && (
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Prestasi Minat, Bakat & Kompetisi</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {prestasiNonAkademik.map((prestasi, index) => {
                const IconComponent = getIcon(prestasi.achievementType);
                return (
                  <MotionDiv
                    key={prestasi.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                          <IconComponent className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{prestasi.studentName || prestasi.studentId || 'Mahasiswa'}</h3>
                          <Badge variant="outline" className="border-neon-green text-neon-green bg-neon-green/20 capitalize">
                            {prestasi.achievementType.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">{prestasi.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Prodi</span>
                          <span className="font-semibold text-foreground text-right">{prestasi.studyProgramName || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tingkat</span>
                          <span className="font-semibold text-foreground capitalize">{prestasi.achievementLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tahun</span>
                          <span className="font-semibold text-foreground">{prestasi.eventDate ? new Date(prestasi.eventDate).getFullYear() : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Kategori</span>
                          <span className="font-semibold text-sm text-foreground capitalize">{prestasi.achievementCategory}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground block mb-2">Kegiatan:</span>
                        <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">{prestasi.title}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                          <FileText className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple/10">
                          <Globe className="w-4 h-4 mr-2" />
                          Link
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Empty State */}
        {allAchievements.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Belum ada data prestasi mahasiswa yang dipublikasikan.</p>
          </div>
        )}

        {/* Prestasi Tahunan Rekap (Static Simulation based on real data) */}
        {allAchievements.length > 0 && (
          <MotionDiv
            className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Informasi Pencapaian</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-cyber-blue/5 border border-cyber-blue/20">
                <Globe className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground">{stats.internasional}</h3>
                <p className="text-sm text-muted-foreground">Prestasi Internasional</p>
              </div>
              <div className="p-6 rounded-2xl bg-electric-purple/5 border border-electric-purple/20">
                <Award className="w-8 h-8 text-electric-purple mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground">{stats.nasional}</h3>
                <p className="text-sm text-muted-foreground">Prestasi Nasional</p>
              </div>
              <div className="p-6 rounded-2xl bg-neon-green/5 border border-neon-green/20">
                <Trophy className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground">{stats.akademik}</h3>
                <p className="text-sm text-muted-foreground">Prestasi Akademik</p>
              </div>
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <Star className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground">{stats.nonAkademik}</h3>
                <p className="text-sm text-muted-foreground">Prestasi Non-Akademik</p>
              </div>
            </div>
          </MotionDiv>
        )}
      </div>
    </div>
  );
}