import {
  Building2,
  ShieldCheck,
  Award,
  Zap,
  Download
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { getCurrentOrganizationalStructure, getOrganizationalEmployeesByStructure } from '@/lib/db';
import { OrganizationCard } from "@/components/OrganizationCard";
import { Button } from "@/components/ui/button";

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
                  <OrganizationCard employee={item} size="large" />
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {level2.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrganizationCard employee={item} size="medium" />
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {otherLevels.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <OrganizationCard employee={item} size="small" />
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {/* Download Button moved above Commitment Card */}
        {currentStructure.structureFile && (
          <div className="mb-16 text-center">
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-bold gap-3">
              <a
                href={currentStructure.structureFile}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-6 h-6" />
                Download Struktur Organisasi
              </a>
            </Button>
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