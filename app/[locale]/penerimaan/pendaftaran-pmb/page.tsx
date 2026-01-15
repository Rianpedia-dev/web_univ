import React from "react";
export const dynamic = "force-dynamic";
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
  Layers,
  Download,
  Building2,
  Sun,
  Moon,
  Monitor,
  Briefcase,
  Clock,
  BookOpen,
  FileText
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
  getPublishedFacultiesSync,
  getPublishedUniversityAccreditations,
  getPublishedCampusFacilities,
  getPublishedAdmissionStaff,
  getPublishedSocialMediaLinks,
  getPublishedContactInformation,
  getPublishedAdmissionBrochures
} from '@/lib/db';
import AdmissionTimeline from "@/components/admissions/AdmissionTimeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdmissionStaff from "@/components/admissions/AdmissionStaff";

export default async function PendaftaranPMBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const [jalurMasuk, jenisKelas, programStudi, gelombangData, syaratData, faqsData, timelinesData, universityProfile, costsData, facultiesData, accreditationData, facilitiesData, staffData, socialMediaData, contactInfoData, brochuresData] = await Promise.all([
    getPublishedAdmissionPathways(),
    getPublishedAdmissionClasses(),
    getPublishedStudyPrograms(),
    getPublishedAdmissionWaves(),
    getPublishedAdmissionRequirements(),
    getPublishedAdmissionFaqs(),
    getPublishedAdmissionTimelines(),
    getUniversityProfile(),
    getPublishedEducationCosts(),
    getPublishedFacultiesSync(),
    getPublishedUniversityAccreditations(),
    getPublishedCampusFacilities(),
    getPublishedAdmissionStaff(),
    getPublishedSocialMediaLinks(),
    getPublishedContactInformation(),
    getPublishedAdmissionBrochures()
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

  // Helper functions for Class Types
  const getClassIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'reguler': return Sun;
      case 'executive': return Briefcase;
      case 'online': return Monitor;
      case 'part_time': return Moon;
      case 'full_time': return Clock;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'reguler': return 'Kelas Reguler';
      case 'executive': return 'Kelas Eksekutif';
      case 'online': return 'Kelas Online/Hybrid';
      case 'part_time': return 'Kelas Karyawan';
      case 'full_time': return 'Full Time';
      default: return type;
    }
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
                background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px #fcffa5ff',
                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
              }}>
                PENDAFTARAN PMB
              </h1>

            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">



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
              <Button
                asChild
                variant="default"
                className="rounded-full h-11 px-8 font-bold shadow-lg hover:scale-105 transition-all duration-300 group/btn"
              >
                <Link href={gelombangAktif.registrationLink || "https://forms.google.com"} target="_blank">
                  Daftar Sekarang <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
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


          {/*Pilihan Jenis Kelas */}
          <MotionDiv
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Pilihan Jenis Kelas</h2>
              <p className="text-muted-foreground">Berbagai pilihan waktu dan metode pembelajaran yang fleksibel</p>
            </div>

            {jenisKelas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jenisKelas.map((kelasItem: any, index: number) => {
                  const IconComponent = getClassIcon(kelasItem.type);
                  return (
                    <MotionDiv
                      key={kelasItem.id}
                      className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="w-14 h-14 bg-gradient-cyber rounded-2xl flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                              <IconComponent className="w-7 h-7 text-foreground" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-foreground group-hover:text-cyber-blue transition-colors">
                                {kelasItem.name}
                              </h3>
                              <Badge variant="outline" className="mt-1 border-cyber-blue/50 text-cyber-blue">
                                {getTypeLabel(kelasItem.type)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6">
                          {kelasItem.description || 'Program kelas yang dirancang untuk kebutuhan pembelajaran yang optimal.'}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/30 rounded-xl p-4">
                            <span className="text-sm text-muted-foreground flex items-center mb-1">
                              <Clock className="w-4 h-4 mr-2 text-cyber-blue" />
                              Jadwal
                            </span>
                            <p className="font-semibold text-foreground">
                              {kelasItem.schedule?.split(', ')[0] || 'Fleksibel'}
                            </p>
                          </div>
                          <div className="bg-muted/30 rounded-xl p-4">
                            <span className="text-sm text-muted-foreground flex items-center mb-1">
                              <Calendar className="w-4 h-4 mr-2 text-electric-purple" />
                              Durasi
                            </span>
                            <p className="font-semibold text-foreground">
                              {kelasItem.schedule?.split(', ')[1] || 'Sesuai Jadwal'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card rounded-2xl border p-12 text-center text-muted-foreground italic">
                Informasi jenis kelas belum tersedia.
              </div>
            )}
          </MotionDiv>

          {/*Panduan Pemilihan Kelas */}
          <MotionDiv
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Panduan Pemilihan Kelas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  judul: "Evaluasi Kondisi",
                  deskripsi: "Pertimbangkan kondisi pekerjaan, waktu luang, dan kemampuan finansial",
                  icon: Users
                },
                {
                  judul: "Sesuaikan Target",
                  deskripsi: "Pilih kelas yang sesuai dengan tujuan akademik dan karir Anda",
                  icon: BookOpen
                },
                {
                  judul: "Konsultasi",
                  deskripsi: "Berkonsultasi dengan konselor akademik untuk pemilihan kelas terbaik",
                  icon: FileText
                }
              ].map((panduan, index) => (
                <div key={index} className="glass-card p-6 rounded-xl border border-white/5 bg-background/50 text-center hover:border-cyber-blue/30 transition-colors">
                  <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <panduan.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{panduan.judul}</h3>
                  <p className="text-muted-foreground text-sm">{panduan.deskripsi}</p>
                </div>
              ))}
            </div>
          </MotionDiv>


          {/* Section: Gelombang & Syarat (Stacked) */}
          <div className="space-y-16">
            {/* Gelombang */}
            <div id="gelombang" className="space-y-8">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center justify-center gap-3">
                <Calendar className="w-8 h-8 text-yellow-500" />
                Jadwal Gelombang
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gelombangData.map((wave: any) => {
                  const status = getWaveStatus(new Date(wave.startDate), new Date(wave.endDate));
                  return (
                    <div key={wave.id} className={`glass-card rounded-2xl p-6 border transition-all ${status.status === 'active' ? 'border-green-500/30 bg-green-500/5' : 'border-white/5'}`}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-foreground text-lg">{wave.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(new Date(wave.startDate))} - {formatDate(new Date(wave.endDate))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Syarat Pendaftaran */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center justify-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyber-blue" />
                Syarat Pendaftaran
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Syarat Mahasiswa Murni */}
                <div className="glass-card rounded-3xl p-8 border border-cyber-blue/20 bg-cyber-blue/5 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-cyber-blue/10 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Mahasiswa Murni</h3>
                  </div>
                  <div className="space-y-4">
                    {syaratData.filter((s: any) => s.type === 'murni').length > 0 ? (
                      syaratData.filter((s: any) => s.type === 'murni').map((syarat: any) => (
                        <div key={syarat.id} className="flex items-start gap-4 group">
                          <div className="mt-1 w-5 h-5 rounded-full bg-cyber-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-blue/20 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5 text-cyber-blue" />
                          </div>
                          <span className="text-muted-foreground text-sm leading-relaxed">{syarat.content}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm italic">Belum ada syarat untuk kategori ini.</p>
                    )}
                  </div>
                </div>

                {/* Syarat Mahasiswa Transisi */}
                <div className="glass-card rounded-3xl p-8 border border-electric-purple/20 bg-electric-purple/5 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-electric-purple/10 rounded-2xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-electric-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Mahasiswa Transisi</h3>
                  </div>
                  <div className="space-y-4">
                    {syaratData.filter((s: any) => s.type === 'transisi').length > 0 ? (
                      syaratData.filter((s: any) => s.type === 'transisi').map((syarat: any) => (
                        <div key={syarat.id} className="flex items-start gap-4 group">
                          <div className="mt-1 w-5 h-5 rounded-full bg-electric-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-electric-purple/20 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5 text-electric-purple" />
                          </div>
                          <span className="text-muted-foreground text-sm leading-relaxed">{syarat.content}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm italic">Belum ada syarat untuk kategori ini.</p>
                    )}
                  </div>
                </div>
              </div>
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
            brochures={brochuresData}
          />
        </div>



        {/* Tim PMB Section */}
        <div className="mb-24">
          <AdmissionStaff staff={staffData} />
        </div>
        {/* FAQ Singkat */}
        <MotionDiv
          className="max-w-4xl mx-auto mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-2">
              FAQ <span className="text-cyber-blue">Singkat</span>
            </h2>
            <p className="text-muted-foreground">Informasi cepat seputar pertanyaan yang sering diajukan</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqsData.map((faq: any, index: number) => (
              <AccordionItem
                key={faq.id}
                value={`item-${index}`}
                className="glass-card border border-border/50 bg-slate-500/5 dark:bg-slate-900/40 rounded-2xl px-6 transition-all data-[state=open]:bg-slate-500/10 dark:data-[state=open]:bg-slate-900/60 data-[state=open]:border-cyber-blue/30 overflow-hidden"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline hover:text-cyber-blue transition-colors gap-4 group">
                  <span className="font-bold text-foreground text-base md:text-lg leading-tight first-letter:uppercase">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionDiv>

      </div>
    </div>
  );
}
