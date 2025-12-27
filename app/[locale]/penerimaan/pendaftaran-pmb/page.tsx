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
  Download
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAdmissionPathways } from '@/lib/db';

export default async function PendaftaranPMBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Ambil data dari database
  const jalurMasuk = await getPublishedAdmissionPathways();

  // Data timeline pendaftaran dibuat dari data jalur masuk
  const timelinePendaftaran = jalurMasuk.flatMap(jalur => [
    {
      kegiatan: `Pendaftaran ${jalur.name}`,
      tanggal: jalur.registrationStart ? `${new Date(jalur.registrationStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} - ${new Date(jalur.registrationEnd || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : 'Segera',
      status: "Berlangsung",
      type: jalur.name.toLowerCase().includes('prestasi') ? 'prestasi' : 'reguler'
    }
  ]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative pb-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[120px] animate-pulse delay-1000" />

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

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-32 items-start">

          {/* Left Column: Jalur Pendaftaran (Individual Cards) */}
          <div className="xl:col-span-8 space-y-12">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gradient-cyber rounded-2xl flex items-center justify-center shadow-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Jalur Penerimaan</h2>
                  <p className="text-muted-foreground font-medium">Temukan jalur masuk yang paling sesuai dengan kualifikasimu</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jalurMasuk.map((jalur, index) => (
                  <MotionDiv
                    key={jalur.id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="glass-card relative rounded-[2rem] p-8 border border-white/10 h-full overflow-hidden hover:border-cyber-blue/40 transition-all duration-500 bg-black/40 backdrop-blur-xl">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-electric-purple rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'bg-cyber-blue/20 text-cyber-blue' : 'bg-electric-purple/20 text-electric-purple'}`}>
                            {index % 2 === 0 ? <Zap className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                          </div>
                          <Badge className="bg-white/5 text-white/60 border-white/10 px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                            2024/2025
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyber-blue transition-colors tracking-tight">
                          {jalur.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                          {jalur.description || "Jalur pendaftaran eksklusif untuk calon mahasiswa berprestasi dengan berbagai keuntungan dan beasiswa penuh."}
                        </p>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cyber-blue opacity-70" />
                            <span className="text-xs font-bold text-white/70">
                              {jalur.registrationStart ? new Date(jalur.registrationStart).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : '-'} - {jalur.registrationEnd ? new Date(jalur.registrationEnd).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : '-'}
                            </span>
                          </div>
                          <Button variant="ghost" className="text-xs font-black text-cyber-blue hover:text-white hover:bg-cyber-blue/20 px-0">
                            DETAIL <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
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

                {timelinePendaftaran.slice(0, 5).map((item, index) => (
                  <div key={index} className="relative flex gap-6 group">
                    <div className="relative z-10 w-12 h-12 rounded-2xl glass-card border-2 border-white/10 flex items-center justify-center bg-black transition-all group-hover:border-cyber-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                      <span className="text-sm font-black text-white">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-cyber-blue transition-colors text-base mb-1">{item.kegiatan}</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.tanggal}</p>
                      <Badge className="mt-2 bg-cyber-blue/10 text-cyber-blue border-none text-[9px] font-black tracking-widest px-2">
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

        {/* Requirements Section - Horizontal Styled */}
        <div className="mb-32">
          <MotionDiv
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 mb-4">
                <ShieldCheck className="w-4 h-4 text-cyber-blue" />
                <span className="text-[10px] font-black tracking-[0.2em] text-cyber-blue uppercase">Verifikasi Dokumen</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Persiapan <br /><span className="text-muted-foreground/40">Dokumen Wajib</span></h2>
            </div>
            <p className="text-muted-foreground font-medium max-w-sm">Siapkan pindaian (scan) berkas asli dalam format PDF/JPG maksimal 2MB per file.</p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {[
              { icon: FileText, title: "Ijazah & SKL", desc: "Scan Ijazah asli atau Surat Keterangan Lulus yang telah dilegalisir oleh pihak sekolah.", color: "cyber-blue" },
              { icon: CheckCircle, title: "Transkrip Nilai", desc: "Scan raport semester 1-5 bagi pendaftar jalur prestasi atau raport SMA sederajat.", color: "emerald-400" },
              { icon: UserPlus, title: "Kartu Identitas", desc: "Scan KTP/Kartu Pelajar dan Kartu Keluarga (KK) yang masih berlaku dengan jelas.", color: "electric-purple" },
              { icon: ShieldCheck, title: "Pas Foto Terbaru", desc: "Foto formal terbaru berpakaian rapi dengan latar belakang merah, ukuran 4x6.", color: "accent-pink" }
            ].map((req, index) => (
              <MotionDiv
                key={index}
                className="group p-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass-card h-full p-10 rounded-[3rem] border border-white/10 hover:border-white/20 transition-all bg-white/[0.02] relative overflow-hidden flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-[2rem] bg-${req.color}/10 flex items-center justify-center mb-8 border border-${req.color}/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <req.icon className={`w-10 h-10 text-${req.color}`} />
                  </div>
                  <h3 className="font-black text-xl text-white mb-4 tracking-tight">{req.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{req.desc}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Professional Contact Support Section */}
        <MotionDiv
          className="relative rounded-[4rem] p-12 md:p-24 border border-white/10 overflow-hidden group shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Background visuals */}
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-transparent to-electric-purple/10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyber-blue/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:opacity-60 transition-opacity" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Layanan Konsultasi Online</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tight">Butuh Bantuan <br /> <span className="text-white/40">Secara Langsung?</span></h2>
              <p className="text-white/60 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-xl">
                Tim Admisi kami siap memberikan pendampingan pendaftaran dan pilihan program studi gratis setiap hari kerja pukul 08.00 - 16.00 WIB.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button className="bg-white text-black hover:bg-white/90 px-10 py-7 rounded-full font-black text-xl shadow-2xl flex items-center group/btn transition-all active:scale-95">
                  <Phone className="w-6 h-6 mr-3 group-hover/btn:rotate-12 transition-transform" /> Chat WhatsApp
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 py-7 rounded-full font-black text-xl flex items-center backdrop-blur-md">
                  <Mail className="w-6 h-6 mr-3" /> Kirim Email
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex justify-end pr-8">
              <div className="relative">
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-cyber rounded-3xl blur-2xl opacity-40 animate-pulse" />
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-purple rounded-3xl blur-2xl opacity-40 animate-pulse delay-700" />

                <div className="relative w-80 h-96 rounded-[3rem] border border-white/20 bg-white/5 backdrop-blur-2xl p-10 flex flex-col justify-end overflow-hidden group/card shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-cyber rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-white font-black text-3xl leading-tight tracking-tight">Langkah Kecil untuk Karir Besar.</p>
                    <div className="h-1 w-20 bg-cyber-blue rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
