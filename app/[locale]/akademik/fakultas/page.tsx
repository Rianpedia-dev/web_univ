import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Target
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedFaculties, getPublishedStudyPrograms } from '@/lib/db';

export default async function FakultasPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  // Ambil data dari database
  const facultiesData = await getPublishedFaculties();
  const studyProgramsData = await getPublishedStudyPrograms();

  // Kelompokkan prodi berdasarkan fakultas
  const fakultasWithProdi = facultiesData.map(faculty => ({
    ...faculty,
    prodi: studyProgramsData.filter(prodi => prodi.facultyId === faculty.id)
  }));

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_akademik.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Fakultas
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Daftar Fakultas */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Daftar Fakultas</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fakultasWithProdi.length > 0 ? (
              fakultasWithProdi.map((fakultas, index) => (
                <MotionDiv
                  key={fakultas.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-electric-purple rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-500" />

                  <div className="glass-card relative rounded-[2.5rem] border border-foreground/10 overflow-hidden bg-background/40 backdrop-blur-xl h-full flex flex-col">
                    {/* Card Header */}
                    <div className="p-6 sm:p-8 pb-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {fakultas.logo ? (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-foreground/5 border border-foreground/10 p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyber-blue/50 transition-colors">
                              <img src={fakultas.logo} alt={fakultas.name} className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center shrink-0">
                              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-cyber-blue" />
                            </div>
                          )}
                          <div className="space-y-1 min-w-0">
                            <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight group-hover:text-cyber-blue transition-colors line-clamp-2">
                              {fakultas.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-cyber-blue uppercase tracking-widest flex items-center">
                              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 opacity-70 shrink-0" />
                              <span className="truncate">{fakultas.prodi.length} Program Studi</span>
                            </p>
                          </div>
                        </div>
                        {fakultas.accreditation && (
                          <Badge className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-black text-[10px] sm:text-xs shadow-lg flex items-center gap-1 sm:gap-1.5 shrink-0 ${fakultas.accreditation === 'A' || fakultas.accreditation === 'Unggul'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                            }`}>
                            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {fakultas.accreditation}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed italic">
                        {fakultas.description || `Fakultas ${fakultas.name} berkomitmen menyelenggarakan pendidikan tinggi berkualitas untuk mencetak lulusan unggul.`}
                      </p>
                    </div>

                    {/* Main Info Grid */}
                    <div className="px-6 sm:px-8 py-4 sm:py-6 grid grid-cols-2 gap-4 sm:gap-8 bg-foreground/5 border-y border-foreground/5">
                      <div className="space-y-1">
                        <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/60 flex items-center">
                          <Target className="w-3 h-3 mr-1 sm:mr-2 text-cyber-blue shrink-0" />
                          <span className="truncate">Program Studi</span>
                        </span>
                        <p className="text-base sm:text-lg font-black text-foreground">{fakultas.prodi.length}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/60 flex items-center">
                          <Users className="w-3 h-3 mr-1 sm:mr-2 text-emerald-400 shrink-0" />
                          <span className="truncate">Mahasiswa</span>
                        </span>
                        <p className="text-base sm:text-lg font-black text-foreground">
                          {fakultas.prodi.reduce((acc, p) => acc + (p.totalStudents || 0), 0).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Footer - Dekan & Kontak */}
                    <div className="p-6 sm:p-8 pt-4 sm:pt-6 flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 border border-foreground/10 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-blue" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Dekan Fakultas</p>
                          <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                            {fakultas.dean || 'Dekan Terpilih'}
                          </p>
                        </div>
                      </div>

                      {(fakultas.contactEmail || fakultas.contactPhone) && (
                        <div className="flex flex-col gap-2">
                          {fakultas.contactEmail && (
                            <div className="flex items-center text-[11px] sm:text-xs font-medium text-muted-foreground/90 hover:text-cyber-blue transition-colors bg-foreground/5 px-3 py-2 rounded-xl border border-foreground/10">
                              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 text-cyber-blue/80 shrink-0" />
                              <span className="truncate">{fakultas.contactEmail}</span>
                            </div>
                          )}
                          {fakultas.contactPhone && (
                            <div className="flex items-center text-[11px] sm:text-xs font-medium text-muted-foreground/90 hover:text-cyber-blue transition-colors bg-foreground/5 px-3 py-2 rounded-xl border border-foreground/10">
                              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 text-emerald-400/80 shrink-0" />
                              <span className="truncate">{fakultas.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))
            ) : (
              <div className="col-span-full glass-card rounded-2xl border p-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data Fakultas</h3>
                <p className="text-muted-foreground">Data fakultas akan segera ditambahkan</p>
              </div>
            )}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}