import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  GraduationCap,
  FileText,
  CheckCircle,
  Star,
  Target,
  BookOpen,
  Calendar,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedScholarships } from '@/lib/db';

export default async function BeasiswaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const scholarshipsData = await getPublishedScholarships();

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal belum ditentukan';
    return new Date(date).toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk format currency
  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return '-';
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
  };

  // Statistik
  const totalScholarships = scholarshipsData.length;
  const totalQuota = scholarshipsData.reduce((acc, s) => acc + (s.quota || 0), 0);
  const providers = [...new Set(scholarshipsData.map(s => s.provider || 'Universitas'))];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_beasiswa.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Program Beasiswa
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Berbagai program beasiswa untuk mendukung pendidikan mahasiswa berprestasi dan tidak mampu secara ekonomi
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Statistik */}
        <MotionDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              {totalScholarships}
            </div>
            <div className="text-muted-foreground text-sm">Program Beasiswa</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {totalQuota || '∞'}
            </div>
            <div className="text-muted-foreground text-sm">Total Kuota</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Globe className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              {providers.length}
            </div>
            <div className="text-muted-foreground text-sm">Penyedia Beasiswa</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Star className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              100%
            </div>
            <div className="text-muted-foreground text-sm">Transparansi</div>
          </div>
        </MotionDiv>

        {/* Jenis Beasiswa */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Jenis Program Beasiswa</h2>

          {scholarshipsData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {scholarshipsData.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Award className="w-6 h-6 text-yellow-500 mr-2" />
                          <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                            {item.provider || 'Universitas'}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-gradient-cyber text-lg py-1 px-3">
                        {item.quota ? `${item.quota} kuota` : 'Terbatas'}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {item.description || 'Program beasiswa untuk mendukung pendidikan mahasiswa.'}
                    </p>

                    <div className="mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Cakupan: </span>
                      <span className="text-sm font-bold text-cyber-blue">
                        {item.coverage || item.benefits || 'Bantuan biaya pendidikan'}
                      </span>
                    </div>

                    {item.amount && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-muted-foreground">Nilai Beasiswa: </span>
                        <span className="text-sm font-bold text-cyber-blue">
                          {formatCurrency(item.amount ? Number(item.amount) : 0)}
                        </span>
                      </div>
                    )}

                    {item.requirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Persyaratan:</h4>
                        <ul className="space-y-2">
                          {item.requirements.split('\n').map((syarat, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{syarat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.eligibility && !item.requirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Kriteria:</h4>
                        <p className="text-sm text-muted-foreground">{item.eligibility}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.applicationStart ? formatDate(item.applicationStart) : 'Segera dibuka'}
                          {item.applicationEnd && ` - ${formatDate(item.applicationEnd)}`}
                        </div>
                      </div>
                      <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Daftar
                      </Button>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Program Beasiswa</h3>
              <p className="text-muted-foreground">Program beasiswa akan segera ditambahkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Panduan Pendaftaran */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Panduan Pendaftaran Beasiswa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                judul: "Persiapkan Dokumen",
                deskripsi: "Lengkapi semua dokumen persyaratan sesuai jenis beasiswa",
                icon: FileText
              },
              {
                judul: "Ajukan Pendaftaran",
                deskripsi: "Daftar melalui portal beasiswa sebelum batas akhir",
                icon: GraduationCap
              },
              {
                judul: "Ikuti Proses Seleksi",
                deskripsi: "Lengkapi tahapan seleksi yang ditentukan",
                icon: Target
              }
            ].map((panduan, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <panduan.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{panduan.judul}</h3>
                <p className="text-sm text-muted-foreground">{panduan.deskripsi}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Dokumen Wajib */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Dokumen Wajib</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Formulir Pendaftaran",
              "Transkrip Nilai atau Rapor",
              "Surat Keterangan Tidak Mampu (jika aplikabel)",
              "Surat Rekomendasi",
              "Sertifikat Prestasi (jika aplikabel)",
              "Surat Keterangan Bekerja (Karyasiswa)",
              "Nilai Tes Bahasa (Internasional)",
              "Proposal Kegiatan (jika aplikabel)"
            ].map((dokumen, index) => (
              <MotionDiv
                key={index}
                className="glass-card p-4 rounded-xl border flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <CheckCircle className="w-5 h-5 text-cyber-blue mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">{dokumen}</span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
