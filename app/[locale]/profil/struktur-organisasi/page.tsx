import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  FileText,
  Download,
  ChevronRight,
  UserCheck,
  ShieldCheck,
  Award,
  Zap,
  Briefcase,
  ShieldAlert
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { getCurrentOrganizationalStructure, getOrganizationalEmployeesByStructure } from '@/lib/db';
import { Badge } from "@/components/ui/badge";
import { DownloadStrukturPDF } from "@/components/DownloadStrukturPDF";

export default async function ProfilStrukturOrganisasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const currentStructure = await getCurrentOrganizationalStructure();

  if (!currentStructure) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground italic">Data struktur organisasi belum tersedia.</p>
      </div>
    );
  }

  const employees = await getOrganizationalEmployeesByStructure(currentStructure.id);

  // Mengorganisir pegawai berdasarkan level jabatan
  // Level 1: Pimpinan Tertinggi (Rektor)
  // Level 2: Pimpinan Lapis Kedua (Wakil Rektor)
  // Level 3+: Dekan, Kaprodi, dll.

  const level1 = employees.filter(item => item.positionLevel === 1);
  const level2 = employees.filter(item => item.positionLevel === 2);
  const otherLevels = employees.filter(item => item.positionLevel > 2);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-2/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                {currentStructure.title}
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
                {currentStructure.description || 'Struktur tata kelola universitas yang transparan dan akuntabel untuk mewujudkan visi dan misi institusi.'}
              </p>


            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* --- LEVEL 1 (Pimpinan Tertinggi) --- */}
        {level1.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center flex items-center justify-center">
              <span className="h-px w-12 bg-cyber-blue mr-4"></span>
              Pimpinan Tertinggi
              <span className="h-px w-12 bg-cyber-blue ml-4"></span>
            </h2>
            <div className="flex justify-center">
              {level1.map((item) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-sm w-full"
                >
                  <div className="glass-card p-8 text-center rounded-[2.5rem] border border-white/10 hover:border-cyber-blue/50 group transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] bg-gradient-to-b from-white/5 to-transparent h-full flex flex-col">
                    <div className="w-56 aspect-[3/4] mx-auto mb-8 p-2 rounded-[2rem] bg-gradient-to-br from-emerald-500/30 to-emerald-400/30 group-hover:from-emerald-500 group-hover:to-emerald-400 transition-all duration-700 mt-2 relative">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-full h-full bg-background rounded-[1.8rem] overflow-hidden relative z-10 border-2 border-white/5">
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-emerald-500/10">
                            <Users className="w-20 h-20 text-emerald-500/30" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-400 transition-colors leading-tight">{item.name}</h4>
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 self-center">
                      {item.positionName}
                    </Badge>
                    <div className="pt-4 border-t border-white/5 text-left flex-1">
                      <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-4 leading-relaxed">
                        {item.description || 'Pimpinan tertinggi yang bertanggung jawab atas seluruh operasional universitas.'}
                      </p>
                      <div className="mt-auto space-y-3">
                        <p className="text-xs text-muted-foreground/60 italic font-medium text-center">Periode: {item.period || '-'}</p>
                        {item.responsibilities && (
                          <div className="flex items-start gap-2 text-xs text-muted-foreground/60">
                            <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 italic">{item.responsibilities}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {/* --- LEVEL 2 (Jajaran Rektorat) --- */}
        {level2.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center flex items-center justify-center">
              <span className="h-px w-12 bg-electric-purple mr-4"></span>
              Jajaran Rektorat
              <span className="h-px w-12 bg-electric-purple ml-4"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {level2.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="glass-card p-10 text-center rounded-[3rem] border border-white/10 hover:border-electric-purple/50 group transition-all duration-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] bg-gradient-to-b from-white/5 to-transparent h-full flex flex-col">
                    <div className="w-48 aspect-[3/4] mx-auto mb-8 p-2 rounded-[2rem] bg-gradient-to-br from-emerald-500/30 to-emerald-400/30 group-hover:from-emerald-500 group-hover:to-emerald-400 transition-all duration-700 mt-2 relative">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-full h-full bg-background rounded-[1.8rem] overflow-hidden relative z-10 border-2 border-white/5">
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-emerald-500/5">
                            <Users className="w-16 h-16 text-emerald-500/30" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-400 transition-colors leading-tight">{item.name}</h4>
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 self-center">
                      {item.positionName}
                    </Badge>
                    <div className="pt-4 border-t border-white/5 text-left flex-1">
                      <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-4 leading-relaxed">
                        {item.description || 'Fokus pada pengembangan strategis bidang tersebut.'}
                      </p>
                      {item.responsibilities && (
                        <div className="flex items-start gap-2 text-xs text-muted-foreground/60 mt-auto pt-2">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2 italic">{item.responsibilities}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {/* --- OTHER LEVELS (Pimpinan Lembaga & Unit) --- */}
        {otherLevels.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center flex items-center justify-center">
              <span className="h-px w-12 bg-neon-green mr-4"></span>
              Pimpinan Fakultas & Unit Lainnya
              <span className="h-px w-12 bg-neon-green ml-4"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {otherLevels.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="glass-card p-10 text-center rounded-[3rem] border border-white/10 hover:border-neon-green/50 group transition-all duration-500 hover:shadow-[0_0_40px_rgba(52,211,153,0.2)] bg-gradient-to-b from-white/5 to-transparent h-full flex flex-col">
                    <div className="w-44 aspect-[3/4] mx-auto mb-8 p-2 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-emerald-400/30 group-hover:from-emerald-500 group-hover:to-emerald-400 transition-all duration-700 mt-2 relative">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-full h-full bg-background rounded-[1.5rem] overflow-hidden relative z-10 border-2 border-white/5">
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-emerald-500/5">
                            <UserCheck className="w-14 h-14 text-emerald-500/40" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-emerald-400 transition-colors leading-tight">{item.name}</h4>
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 self-center text-[10px] uppercase font-bold tracking-wider">
                      {item.positionName}
                    </Badge>
                    <div className="pt-4 border-t border-white/5 text-left flex-1">
                      <p className="text-xs text-muted-foreground/80 mb-4 line-clamp-4 leading-relaxed italic text-center">
                        Periode: {item.period || '-'}
                      </p>
                      {item.description && (
                        <p className="text-[11px] text-muted-foreground/60 line-clamp-3 leading-relaxed border-l-2 border-neon-green/20 pl-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {/* Download Button moved above Commitment Card */}
        {currentStructure.structureFile && (
          <div className="mb-16 text-center">
            <DownloadStrukturPDF
              employees={employees}
              title={currentStructure.title}
            />
          </div>
        )}

        {/* Call to Action for Integrity */}
        <MotionDiv
          className="glass-card p-8 md:p-12 rounded-[3rem] border border-white/20 bg-gradient-to-r from-cyber-blue/10 to-electric-purple/10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Building2 className="w-16 h-16 text-cyber-blue mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Komitmen Tata Kelola</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Kami berkomitmen menjalankan tata kelola universitas yang berintegritas, inovatif, dan berorientasi pada kemajuan pendidikan nasional serta kesejahteraan sivitas akademika.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-cyber-blue">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold uppercase text-xs tracking-widest">Akuntabel</span>
            </div>
            <div className="flex items-center gap-2 text-electric-purple">
              <Award className="w-5 h-5" />
              <span className="font-bold uppercase text-xs tracking-widest">Profesional</span>
            </div>
            <div className="flex items-center gap-2 text-neon-green">
              <Zap className="w-5 h-5" />
              <span className="font-bold uppercase text-xs tracking-widest">Inovatif</span>
            </div>
          </div>
        </MotionDiv>

      </div>
    </div>
  );
}