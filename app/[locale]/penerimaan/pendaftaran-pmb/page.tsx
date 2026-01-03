import React from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  HelpCircle,
  Users,
  Layers
} from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  getPublishedAdmissionWaves,
  getPublishedAdmissionRequirements,
  getPublishedAdmissionFaqs,
  getPublishedAdmissionTimelines,
  getPublishedAdmissionPathways,
  getPublishedAdmissionClasses,
  getPublishedStudyPrograms,
  getUniversityProfile,
  getPublishedEducationCosts,
  getPublishedFaculties,
  getPublishedUniversityAccreditations,
  getPublishedCampusFacilities
} from '@/lib/db';
import AdmissionTimeline from "@/components/admissions/AdmissionTimeline";
import AdmissionBrochureDownload from "@/components/admissions/AdmissionBrochureDownload";

export default async function PendaftaranPMBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const [jalurMasuk, jenisKelas, programStudi, gelombangData, syaratData, faqsData, timelinesData, universityProfile, costsData, facultiesData, accreditationData, facilitiesData] = await Promise.all([
    getPublishedAdmissionPathways(),
    getPublishedAdmissionClasses(),
    getPublishedStudyPrograms(),
    getPublishedAdmissionWaves(),
    getPublishedAdmissionRequirements(),
    getPublishedAdmissionFaqs(),
    getPublishedAdmissionTimelines(),
    getUniversityProfile(),
    getPublishedEducationCosts(),
    getPublishedFaculties(),
    getPublishedUniversityAccreditations(),
    getPublishedCampusFacilities()
  ]);

  // Tentukan gelombang aktif
  const now = new Date();
  const gelombangAktif = gelombangData.find((g: any) => now >= g.startDate && now <= g.endDate);

  // Helper functions
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal belum ditentukan';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getWaveStatus = (startDate: Date, endDate: Date) => {
    const now = new Date();
    if (now < startDate) {
      return { status: 'upcoming', label: 'Belum Dibuka', color: 'blue', icon: '⚪' };
    } else if (now >= startDate && now <= endDate) {
      return { status: 'active', label: 'Aktif', color: 'green', icon: '🔵' };
    } else {
      return { status: 'closed', label: 'Ditutup', color: 'red', icon: '🔴' };
    }
  };

  const formatCurrency = (amount: number | string | null | undefined) => {
    if (!amount) return 'Gratis';
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
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
        className="relative bg-[url('/images/backround_penerimaan.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Pendaftaran PMB
              </h1>

            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Brochure Download Button at Top */}
        <MotionDiv
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AdmissionBrochureDownload
            universityProfile={universityProfile}
            pathways={jalurMasuk}
            classes={jenisKelas}
            waves={gelombangData}
            programs={programStudi}
            requirements={syaratData}
            timelines={timelinesData}
            costs={costsData}
            faculties={facultiesData}
            accreditation={accreditationData[0]}
            facilities={facilitiesData}
          />
        </MotionDiv>

        {/* Gelombang Aktif Banner */}
        {gelombangAktif && (
          <MotionDiv
            className="glass-card rounded-2xl p-6 border-2 border-green-500/50 mb-12 bg-green-500/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-1">
                    🟢 Gelombang Aktif
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">{gelombangAktif.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Berakhir: {gelombangAktif.endDate ? new Date(gelombangAktif.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                  </p>
                </div>
              </div>
              <Button asChild className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] px-8">
                <Link href="https://forms.google.com" target="_blank">
                  Daftar Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </MotionDiv>
        )}

        {/* Main Content Section - Stacked Layout */}
        <div className="space-y-16 mb-16">

          {/* Section: Penjelasan & Statistik */}
          <MotionDiv
            className="glass-card rounded-3xl p-8 md:p-10 border border-border bg-card/50 backdrop-blur-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                <GraduationCap className="w-8 h-8 text-cyber-blue mr-4" />
                Tentang PMB
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Penerimaan Mahasiswa Baru (PMB) adalah langkah pertama Anda untuk bergabung
                dengan komunitas akademik kami. Kami menawarkan berbagai jalur pendaftaran
                yang fleksibel, dirancang untuk mengenali berbagai potensi dan prestasi calon mahasiswa.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Fakultas", count: facultiesData.length, color: "text-cyber-blue", icon: Layers },
                  { label: "Program Studi", count: programStudi.length, color: "text-electric-purple", icon: GraduationCap },
                  { label: "Jalur Masuk", count: jalurMasuk.length, color: "text-green-500", icon: Zap },
                  { label: "Gelombang", count: gelombangData.length, color: "text-yellow-500", icon: Calendar }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-background rounded-2xl border border-border hover:border-cyber-blue/30 transition-colors shadow-sm">
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2 opacity-70`} />
                    <div className={`text-3xl font-black ${stat.color}`}>{stat.count}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>

          {/* Section: Jalur Pendaftaran */}
          <div id="jalur-masuk" className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Pilihan Jalur Pendaftaran</h2>
              <p className="text-muted-foreground">Pilih jalur yang paling sesuai dengan kualifikasi dan prestasi Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jalurMasuk.map((jalur: any, index: number) => (
                <MotionDiv
                  key={jalur.id}
                  className="glass-card rounded-2xl p-8 border border-border bg-card/50 hover:bg-card/80 transition-all group relative overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-electric-purple/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-black text-xl text-foreground mb-3 group-hover:text-cyber-blue transition-colors">
                      {jalur.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed flex-grow">
                      {jalur.description}
                    </p>

                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>

          <AdmissionTimeline
            timelines={timelinesData}
            universityProfile={universityProfile}
            pathways={jalurMasuk}
            classes={jenisKelas}
            waves={gelombangData}
            programs={programStudi}
            requirements={syaratData}
            costs={costsData}
            faculties={facultiesData}
          />

          {/* Section: Gelombang & Syarat (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gelombang */}
            <div id="gelombang" className="space-y-6">
              <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                <Calendar className="w-6 h-6 text-yellow-500" />
                Jadwal Gelombang
              </h2>
              <div className="space-y-4">
                {gelombangData.map((wave: any) => {
                  const status = getWaveStatus(new Date(wave.startDate), new Date(wave.endDate));
                  return (
                    <div key={wave.id} className={`glass-card rounded-2xl p-5 border transition-all ${status.status === 'active' ? 'border-green-500/30 bg-green-500/5' : 'border-white/5'}`}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-foreground text-sm">{wave.name}</h3>
                          <p className="text-[11px] text-muted-foreground">
                            {formatDate(new Date(wave.startDate))} - {formatDate(new Date(wave.endDate))}
                          </p>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Syarat Umum */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-cyber-blue" />
                Syarat Umum
              </h2>
              <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                {syaratData.map((syarat: any) => (
                  <div key={syarat.id} className="flex items-start gap-3 group">
                    <div className="mt-1 w-4 h-4 rounded-full bg-cyber-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-blue/20 transition-colors">
                      <CheckCircle className="w-3 h-3 text-cyber-blue" />
                    </div>
                    <span className="text-muted-foreground text-xs leading-relaxed">{syarat.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Singkat */}
        <MotionDiv
          className="glass-card rounded-2xl p-8 border mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 text-cyber-blue mr-3" />
            FAQ Singkat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faqsData.map((faq: any, index: number) => (
              <div key={faq.id} className="bg-muted/30 rounded-xl p-6 border border-white/5 hover:border-cyber-blue/30 transition-all">
                <h3 className="font-bold text-foreground mb-3 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-cyber-blue flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

      </div>
    </div>
  );
}
