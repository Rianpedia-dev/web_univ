import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Star,
  CheckCircle,
  FileText,
  GraduationCap,
  Building,
  Calendar,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedUniversityAccreditations, getPublishedStudyPrograms, getPublishedUniversityAwards } from '@/lib/db';

export default async function ProfilAkreditasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const univAccreditations = await getPublishedUniversityAccreditations();
  const prodiAccreditations = await getPublishedStudyPrograms();
  const universityAwards = await getPublishedUniversityAwards();

  // Ambil akreditasi universitas terbaru
  const latestUnivAcc = univAccreditations.length > 0 ? univAccreditations[0] : {
    name: "Akreditasi Institusi",
    accreditationLevel: "A",
    accreditationNumber: "-",
    accreditationDate: new Date(),
    accreditationExpired: new Date(),
    documentFile: null
  };



  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_profil.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Akreditasi & Penghargaan
              </h1>

            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Akreditasi Institusi Utama */}
        <MotionDiv
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card rounded-[2.5rem] p-6 md:p-10 border border-white/20 relative overflow-hidden group hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-all duration-500 text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyber-blue/40 transition-colors" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-purple/20 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-electric-purple/40 transition-colors" />

            <div className="relative z-10 px-4">
              <div className="w-20 h-20 bg-gradient-cyber rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,240,255,0.4)] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 relative">
                <div className="absolute inset-0 bg-cyber-blue shadow-[0_0_20px_rgba(0,240,255,0.6)] rounded-3xl blur-sm opacity-50" />
                <Award className="w-10 h-10 text-foreground relative z-10" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight">Akreditasi Institusi</h2>
              <p className="text-base text-muted-foreground/80 mb-8 font-medium">Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)</p>

              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="glass-card px-8 py-5 rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/10 to-transparent shadow-2xl relative group/rank overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover/rank:opacity-10 transition-opacity" />
                  <span className="text-[10px] text-cyber-blue block mb-1 font-black uppercase tracking-[0.2em]">Status Resmi</span>
                  <span className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-cyber leading-tight p-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    {latestUnivAcc.accreditationLevel}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-left max-w-2xl mx-auto mb-10 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center group-hover/item:bg-cyber-blue/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Nomor SK</p>
                    <p className="text-sm text-foreground font-bold">{latestUnivAcc.accreditationNumber}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10 hidden md:block" />
                <div className="flex items-center gap-3 group/item">
                  <div className="w-10 h-10 rounded-xl bg-electric-purple/10 flex items-center justify-center group-hover/item:bg-electric-purple/20 transition-colors">
                    <Calendar className="w-5 h-5 text-electric-purple" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Tanggal Penetapan</p>
                    <p className="text-sm text-foreground font-bold">{latestUnivAcc.accreditationDate ? new Date(latestUnivAcc.accreditationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
                  </div>
                </div>
              </div>

              {latestUnivAcc.documentFile && (
                <div className="flex justify-center">
                  <Button asChild className="rounded-full px-10 h-14 font-bold group shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
                    <a href={latestUnivAcc.documentFile} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <FileText className="w-6 h-6 mr-3 transition-transform group-hover:rotate-12" />
                      Lihat Sertifikat Digital
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </MotionDiv>

        {/* Akreditasi Program Studi */}
        <div className="mb-20">
          <div className="mb-16">
            <div className="flex flex-col items-center justify-center gap-4 mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                Akreditasi <span className="text-cyber-blue">Program Studi</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prodiAccreditations.map((prodi, index) => (
              <MotionDiv
                key={prodi.id}
                className="glass-card p-1 rounded-[2.5rem] border border-white/5 hover:border-cyber-blue/30 transition-all duration-500 relative group overflow-hidden h-full shadow-lg hover:shadow-cyber-blue/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-background/40 backdrop-blur-xl p-8 rounded-[2.4rem] h-full flex flex-col relative z-10 border border-white/5">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-xl text-foreground mb-2 group-hover:text-cyber-blue transition-colors truncate">{prodi.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border-white/10 shrink-0">
                          {prodi.level}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium truncate">
                          {prodi.facultyName}
                        </span>
                      </div>
                    </div>
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border-2
                      ${prodi.accreditation === 'A' || prodi.accreditation === 'Unggul'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-green-500/10'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-blue-500/10'}
                    `}>
                      <span className="text-xl font-black">{prodi.accreditation === 'Unggul' ? 'A' : prodi.accreditation}</span>
                    </div>
                  </div>


                </div>

                {/* Decorative background glow */}
                <div className={`
                  absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700
                  ${prodi.accreditation === 'A' || prodi.accreditation === 'Unggul' ? 'bg-green-500' : 'bg-blue-500'}
                `} />
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Penghargaan */}
        <div className="mb-16">
          <MotionDiv
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Penghargaan & Rekognisi</h2>
            <p className="text-muted-foreground">Prestasi universitas dalam berbagai bidang di tingkat nasional dan internasional</p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universityAwards.map((award, index) => (
              <MotionDiv
                key={award.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Glow Effect Background */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${award.level.toLowerCase().includes('internasional') ? 'from-cyber-blue to-electric-purple' : 'from-emerald-500 to-cyber-blue'} rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>

                <div className="relative glass-card h-full p-6 rounded-[2rem] border border-white/10 flex flex-col overflow-hidden bg-black/40 backdrop-blur-2xl">
                  {/* Floating Icon */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 opacity-10 group-hover:opacity-30 group-hover:scale-110 group-hover:rotate-15 transition-all duration-700">
                    {award.level.toLowerCase().includes('internasional') ? (
                      <Globe className="w-full h-full text-cyber-blue" />
                    ) : (
                      <TrendingUp className="w-full h-full text-emerald-400" />
                    )}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-cyber">
                          {award.year}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase tracking-tighter border-white/10 text-muted-foreground">
                        {award.level}
                      </Badge>
                    </div>

                    <h3 className="font-black text-lg text-foreground mb-4 group-hover:text-cyber-blue transition-colors leading-tight min-h-[3rem]">
                      {award.title}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Building className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Pemberi</p>
                          <p className="text-xs text-foreground/80 font-medium line-clamp-1">{award.provider}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
