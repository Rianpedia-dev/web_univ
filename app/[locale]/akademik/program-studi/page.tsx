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
import { getPublishedStudyPrograms, getPublishedFaculties, getPublishedCareerProspects } from '@/lib/db';

export default async function ProgramStudiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const programStudi = await getPublishedStudyPrograms();
  const faculties = await getPublishedFaculties();
  const careerProspects = await getPublishedCareerProspects();

  // Hitung statistik
  const totalProgramStudi = programStudi.length;
  const akreditasiA = programStudi.filter(prodi => prodi.accreditation === 'A').length;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_program_studi.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Program Studi
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

                <div className="glass-card relative rounded-[2.5rem] border border-white/10 overflow-hidden bg-black/40 backdrop-blur-xl h-full flex flex-col">
                  {/* Card Header */}
                  <div className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        {prodi.logo ? (
                          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyber-blue/50 transition-colors">
                            <img src={prodi.logo} alt={prodi.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-8 h-8 text-cyber-blue" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-cyber-blue transition-colors">
                            {prodi.name}
                          </h3>
                          <p className="text-sm font-bold text-cyber-blue uppercase tracking-widest flex items-center">
                            <Building2 className="w-4 h-4 mr-2 opacity-70" />
                            {prodi.facultyName}
                          </p>
                        </div>
                      </div>
                      <Badge className={`px-4 py-1.5 rounded-full font-black text-xs shadow-lg flex items-center gap-1.5 ${prodi.accreditation === 'A' || prodi.accreditation === 'Unggul'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        }`}>
                        <Award className="w-3.5 h-3.5" />
                        {prodi.accreditation}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed line-clamp-2 italic">
                      {prodi.description || `Program studi ${prodi.name} fokus pada pengembangan keahlian dan kompetensi profesional dibidangnya.`}
                    </p>
                  </div>

                  {/* Main Info Grid */}
                  <div className="px-8 py-6 grid grid-cols-2 gap-8 bg-white/5 border-y border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60 flex items-center">
                        <Target className="w-3 h-3 mr-2 text-cyber-blue" />
                        Jenjang Pendidikan
                      </span>
                      <p className="text-lg font-black text-white">{prodi.level}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60 flex items-center">
                        <Users className="w-3 h-3 mr-2 text-emerald-400" />
                        Mahasiswa Aktif
                      </span>
                      <p className="text-lg font-black text-white">{prodi.totalStudents?.toLocaleString('id-ID') || '0'}</p>
                    </div>
                  </div>

                  {/* Koordinator & Tanggal */}
                  <div className="p-8 pt-6 space-y-6 flex-grow">
                    <div className="flex items-center justify-between gap-4 group/coord">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-cyber p-[1px]">
                          <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                            <Users className="w-5 h-5 text-cyber-blue" />
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Ketua Program Studi</p>
                          <p className="text-sm font-bold text-white group-hover/coord:text-cyber-blue transition-colors">
                            {prodi.headOfProgram || 'Dr. Tenaga Pendidik Terpilih'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {prodi.contactEmail && (
                          <div className="flex items-center text-[13px] font-medium text-muted-foreground/90 hover:text-cyber-blue transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            <Mail className="w-3.5 h-3.5 mr-2 text-cyber-blue/80" />
                            {prodi.contactEmail}
                          </div>
                        )}
                        {prodi.contactPhone && (
                          <div className="flex items-center text-[13px] font-medium text-muted-foreground/90 hover:text-cyber-blue transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400/80" />
                            {prodi.contactPhone}
                          </div>
                        )}
                      </div>
                    </div>
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