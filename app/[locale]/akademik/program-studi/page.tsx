import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Award,
  Users,
  Building2,
  Target,
  FileText,
  Download,
  BookOpen,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb,
  Mail,
  Phone
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getPublishedStudyPrograms, getPublishedFacultiesSync, getPublishedCareerProspects } from '@/lib/db';

export default async function ProgramStudiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const programStudi = await getPublishedStudyPrograms();
  const faculties = await getPublishedFacultiesSync();
  const careerProspects = await getPublishedCareerProspects();

  // Hitung statistik
  const totalProgramStudi = programStudi.length;
  const akreditasiA = programStudi.filter(prodi => prodi.accreditation === 'A').length;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/0')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
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
                PROGRAM STUDI
              </h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">



        {/* Daftar Program Studi */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Daftar Program Studi</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programStudi.map((prodi, index) => (
              <MotionDiv
                key={prodi.id}
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
                        {prodi.logo ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-foreground/5 border border-foreground/10 p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyber-blue/50 transition-colors cursor-pointer hover:bg-white/10">
                                <img src={prodi.logo} alt={prodi.name} className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-110" />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg bg-transparent border-none shadow-none p-0 flex flex-col items-center justify-center">
                              <DialogTitle className="sr-only">Logo {prodi.name}</DialogTitle>
                              <DialogDescription className="sr-only">Tampilan penuh logo program studi {prodi.name}</DialogDescription>
                              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-3xl animate-pulse"></div>
                                <img
                                  src={prodi.logo}
                                  alt={prodi.name}
                                  className="max-w-[280px] max-h-[280px] sm:max-w-[400px] sm:max-h-[400px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-cyber-blue" />
                          </div>
                        )}
                        <div className="space-y-1 min-w-0">
                          <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight group-hover:text-cyber-blue transition-colors line-clamp-2">
                            {prodi.name}
                          </h3>
                          <p className="text-xs sm:text-sm font-bold text-cyber-blue uppercase tracking-widest flex items-center">
                            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 opacity-70 shrink-0" />
                            <span className="truncate">{prodi.facultyName}</span>
                          </p>
                        </div>
                      </div>
                      <Badge className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-black text-[10px] sm:text-xs shadow-lg flex items-center gap-1 sm:gap-1.5 shrink-0 ${prodi.accreditation === 'A' || prodi.accreditation === 'Unggul'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        }`}>
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {prodi.accreditation}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed italic">
                      {prodi.description || `Program studi ${prodi.name} fokus pada pengembangan keahlian dan kompetensi profesional dibidangnya.`}
                    </p>
                  </div>

                  {/* Main Info Grid */}
                  <div className="px-6 sm:px-8 py-4 sm:py-6 grid grid-cols-2 gap-4 sm:gap-8 bg-foreground/5 border-y border-foreground/5">
                    <div className="space-y-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/60 flex items-center">
                        <Target className="w-3 h-3 mr-1 sm:mr-2 text-cyber-blue shrink-0" />
                        <span className="truncate">Jenjang</span>
                      </span>
                      <p className="text-base sm:text-lg font-black text-foreground">{prodi.level}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/60 flex items-center">
                        <Users className="w-3 h-3 mr-1 sm:mr-2 text-emerald-400 shrink-0" />
                        <span className="truncate">Mahasiswa</span>
                      </span>
                      <p className="text-base sm:text-lg font-black text-foreground">{prodi.totalStudents?.toLocaleString('id-ID') || '0'}</p>
                    </div>
                  </div>

                  {/* Footer: Koordinator & Kontak */}
                  <div className="p-6 sm:p-8 pt-4 sm:pt-6 flex-grow">
                    {/* Ketua Program Studi */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 border border-foreground/10 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-blue" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Ketua Prodi</p>
                        <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                          {prodi.headOfProgram || 'Dr. Tenaga Pendidik'}
                        </p>
                      </div>
                    </div>

                    {/* Kontak */}
                    {(prodi.contactEmail || prodi.contactPhone) && (
                      <div className="flex flex-col gap-2">
                        {prodi.contactEmail && (
                          <div className="flex items-center text-[11px] sm:text-xs font-medium text-muted-foreground/90 hover:text-cyber-blue transition-colors bg-foreground/5 px-3 py-2 rounded-xl border border-foreground/10">
                            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 text-cyber-blue/80 shrink-0" />
                            <span className="truncate">{prodi.contactEmail}</span>
                          </div>
                        )}
                        {prodi.contactPhone && (
                          <div className="flex items-center text-[11px] sm:text-xs font-medium text-muted-foreground/90 hover:text-emerald-400 transition-colors bg-foreground/5 px-3 py-2 rounded-xl border border-foreground/10">
                            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 text-emerald-400/80 shrink-0" />
                            <span className="truncate">{prodi.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Prospek Karir */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Prospek Karir Lulusan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerProspects.map((prospek, index) => (
              <div key={prospek.id} className="glass-card p-6 text-center rounded-2xl border border-white/20">
                <h3 className="font-bold text-lg text-foreground mb-2">{prospek.field}</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
                  Rp {prospek.minSalary} - {prospek.maxSalary} {prospek.unit}
                </p>
                <p className="text-sm text-foreground/70">Gaji Rata-rata Per Bulan</p>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}