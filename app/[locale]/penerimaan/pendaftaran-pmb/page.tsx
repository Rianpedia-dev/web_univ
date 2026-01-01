import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Download,
  GraduationCap,
  Building2,
  BookOpen,
  HelpCircle,
  Target,
  Shield,
  Award,
  Users,
  Timer,
  AlertCircle,
  CalendarDays,
  Flag
} from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  getPublishedAdmissionPathways,
  getPublishedAdmissionClasses,
  getPublishedStudyPrograms,
  getPublishedAdmissionWaves
} from '@/lib/db';

export default async function PendaftaranPMBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const [jalurMasuk, jenisKelas, programStudi, gelombangData] = await Promise.all([
    getPublishedAdmissionPathways(),
    getPublishedAdmissionClasses(),
    getPublishedStudyPrograms(),
    getPublishedAdmissionWaves()
  ]);

  // Tentukan gelombang aktif
  const now = new Date();
  const gelombangAktif = gelombangData.find(g => now >= g.startDate && now <= g.endDate);

  // Data timeline pendaftaran
  const timelinePendaftaran = [
    { kegiatan: "Pendaftaran Online", status: "Berlangsung", icon: UserPlus },
    { kegiatan: "Upload Dokumen", status: "Berlangsung", icon: FileText },
    { kegiatan: "Verifikasi", status: "Menunggu", icon: ShieldCheck },
    { kegiatan: "Pengumuman", status: "Menunggu", icon: Star },
    { kegiatan: "Daftar Ulang", status: "Menunggu", icon: CheckCircle },
  ];

  // Syarat umum pendaftaran
  const syaratUmum = [
    "Warga Negara Indonesia (WNI)",
    "Lulusan SMA/SMK/MA/Sederajat",
    "Memiliki ijazah atau Surat Keterangan Lulus (SKL)",
    "Memiliki rapor semester 1-6 dengan nilai memenuhi syarat",
    "Sehat jasmani dan rohani",
    "Tidak sedang terdaftar di perguruan tinggi lain"
  ];

  // FAQ singkat
  const faqData = [
    {
      q: "Bagaimana cara mendaftar?",
      a: "Klik tombol 'Daftar Sekarang', isi formulir, upload dokumen, dan tunggu verifikasi."
    },
    {
      q: "Berapa biaya pendaftaran?",
      a: "Biaya pendaftaran bervariasi sesuai jalur masuk. Lihat halaman Biaya Pendidikan untuk detail."
    },
    {
      q: "Kapan pengumuman hasil?",
      a: "Pengumuman dilakukan 1-2 minggu setelah penutupan pendaftaran gelombang."
    }
  ];

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
        className="relative bg-[url('/images/backround_pendaftaran_pmb.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Mulai perjalanan akademik Anda bersama kami. Pilih jalur pendaftaran yang sesuai dengan impian dan potensi Anda.
              </p>
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
              <Button asChild className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] px-8">
                <Link href="https://forms.google.com" target="_blank">
                  Daftar Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </MotionDiv>
        )}

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-16 items-start">

          {/* Left Column: Konten Dinamis */}
          <div className="xl:col-span-8 space-y-12">

            {/* Penjelasan Singkat PMB */}
            <MotionDiv
              className="glass-card rounded-2xl p-8 border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 text-cyber-blue mr-3" />
                Tentang PMB
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Penerimaan Mahasiswa Baru (PMB) adalah proses seleksi calon mahasiswa untuk bergabung
                dengan universitas kami. Kami menyediakan berbagai jalur masuk yang dapat dipilih
                sesuai dengan prestasi dan kebutuhan Anda.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-cyber-blue">{jalurMasuk.length}</div>
                  <div className="text-xs text-muted-foreground">Jalur Masuk</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-electric-purple">{programStudi.length}</div>
                  <div className="text-xs text-muted-foreground">Program Studi</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-500">{jenisKelas.length}</div>
                  <div className="text-xs text-muted-foreground">Jenis Kelas</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-500">{gelombangData.length}</div>
                  <div className="text-xs text-muted-foreground">Gelombang</div>
                </div>
              </div>
            </MotionDiv>

            {/* Jalur Masuk Section */}
            <MotionDiv
              id="jalur-masuk"
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-electric-purple to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">Jalur Pendaftaran</h2>
                  <p className="text-muted-foreground text-sm">Pilih jalur yang sesuai dengan kualifikasi Anda</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jalurMasuk.map((jalur, index) => {
                  const isActive = (jalur.registrationStart ? new Date(jalur.registrationStart) : new Date()) <= now && (jalur.registrationEnd ? new Date(jalur.registrationEnd) : new Date()) >= now;
                  return (
                    <div key={jalur.id} className="glass-card rounded-2xl p-6 border hover:border-electric-purple/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg text-foreground">{jalur.name}</h3>
                          <Badge className={isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                            {isActive ? "Aktif" : "Tutup"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {jalur.description}
                        </p>
                        {jalur.requirements && (
                          <div className="space-y-1 mb-4">
                            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Syarat Utama:</p>
                            <p className="text-xs text-muted-foreground">{jalur.requirements.split('\n')[0]}</p>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-bold text-cyber-blue">{formatCurrency(jalur.registrationFee)}</span>
                        {isActive && (
                          <Button size="sm" variant="ghost" className="text-xs text-electric-purple hover:text-electric-purple hover:bg-electric-purple/10">
                            Detail <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </MotionDiv>

            {/* Gelombang Pendaftaran Section */}
            <MotionDiv
              id="gelombang"
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">Gelombang Pendaftaran</h2>
                  <p className="text-muted-foreground text-sm">Jadwal periode pendaftaran mahasiswa baru</p>
                </div>
              </div>

              <div className="space-y-4">
                {gelombangData.map((wave) => {
                  const status = getWaveStatus(new Date(wave.startDate), new Date(wave.endDate));
                  return (
                    <div key={wave.id} className={`glass-card rounded-2xl p-6 border transition-all ${status.status === 'active' ? 'border-green-500/30' : ''}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                            <Flag className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{wave.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(new Date(wave.startDate))} - {formatDate(new Date(wave.endDate))}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${status.status === 'active' ? 'bg-green-500/20 text-green-400' : status.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {status.icon} {status.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MotionDiv>

            {/* Syarat Umum Pendaftaran */}
            <MotionDiv
              className="glass-card rounded-2xl p-8 border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <FileText className="w-6 h-6 text-cyber-blue mr-3" />
                Syarat Umum Pendaftaran
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {syaratUmum.map((syarat, index) => (
                  <div key={index} className="flex items-start p-3 bg-muted/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-cyber-blue mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{syarat}</span>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>

          {/* Right Column: Timeline & Info */}
          <div className="xl:col-span-4 space-y-8">
            <MotionDiv
              className="glass-card rounded-[2.5rem] p-10 border border-white/10 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden sticky top-24"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/10 rounded-full blur-[80px] -mr-16 -mt-16" />

              <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
                <Clock className="w-6 h-6 text-electric-purple" />
                Alur Pendaftaran
              </h2>

              <div className="relative space-y-10 pl-2">
                {/* Timeline Line */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyber-blue via-electric-purple to-transparent opacity-20" />

                {timelinePendaftaran.map((item, index) => (
                  <div key={index} className="relative flex gap-6 group">
                    <div className="relative z-10 w-12 h-12 rounded-2xl glass-card border-2 border-white/10 flex items-center justify-center bg-black transition-all group-hover:border-cyber-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                      <item.icon className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-cyber-blue transition-colors text-base mb-1">{item.kegiatan}</h3>
                      <Badge className={`text-[9px] font-black tracking-widest px-2 ${item.status === 'Berlangsung'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-3xl bg-gradient-cyber shadow-2xl relative group cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-all">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Panduan Lengkap PMB</h3>
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Download PDF (4.2 MB)</p>
                  </div>
                </div>
              </div>
            </MotionDiv>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

      </div>
    </div>
  );
}
