import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  DollarSign,
  FileText,
  CheckCircle,
  Users,
  GraduationCap,
  BookOpen,
  Calculator,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP, MotionTr } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedEducationCosts, getPublishedScholarships } from '@/lib/db';

export default async function BiayaPendidikanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const educationCostsData = await getPublishedEducationCosts();
  const scholarshipsData = await getPublishedScholarships();

  // Kelompokkan biaya berdasarkan tipe (UKT, SPP, dll)
  const uktCosts = educationCostsData.filter(c => c.costType?.toLowerCase().includes('ukt'));
  const otherCosts = educationCostsData.filter(c => !c.costType?.toLowerCase().includes('ukt'));

  // Fungsi untuk format currency
  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return 'Rp 0';
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
  };

  // Statistik
  const totalCostTypes = [...new Set(educationCostsData.map(c => c.costType))].length;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_biaya_pendidikan.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Biaya Pendidikan
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Informasi lengkap tentang struktur biaya pendidikan, UKT, dan berbagai program keringanan biaya
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
              <CreditCard className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              {totalCostTypes}
            </div>
            <div className="text-muted-foreground text-sm">Jenis Biaya</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {scholarshipsData.length}
            </div>
            <div className="text-muted-foreground text-sm">Program Beasiswa</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <GraduationCap className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              {uktCosts.length}
            </div>
            <div className="text-muted-foreground text-sm">Golongan UKT</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              100%
            </div>
            <div className="text-muted-foreground text-sm">Transparansi</div>
          </div>
        </MotionDiv>

        {/* UKT per Golongan */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">UKT (Uang Kuliah Tunggal)</h2>

          {uktCosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {uktCosts.map((ukt, index) => (
                <MotionDiv
                  key={ukt.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                          <span className="text-foreground font-bold text-xl">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{ukt.costType}</h3>
                          <p className="text-muted-foreground">{ukt.studyProgramName || 'Semua Program Studi'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber">
                          {formatCurrency(ukt.amount ? Number(ukt.amount) : 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">per semester</div>
                      </div>
                    </div>

                    {ukt.description && (
                      <p className="text-muted-foreground mb-4">{ukt.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Tahun Akademik: {ukt.year || 'Berlaku umum'}
                      </span>
                      <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                        <FileText className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data UKT</h3>
              <p className="text-muted-foreground">Data UKT akan segera ditambahkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Biaya Tambahan */}
        {otherCosts.length > 0 && (
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Biaya Tambahan</h2>

            <div className="glass-card rounded-2xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 text-left text-foreground rounded-tl-2xl">Jenis Biaya</th>
                      <th className="p-4 text-left text-foreground">Program Studi</th>
                      <th className="p-4 text-left text-foreground">Besaran</th>
                      <th className="p-4 text-left text-foreground">Deskripsi</th>
                      <th className="p-4 text-left text-foreground rounded-tr-2xl">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherCosts.map((biaya, index) => (
                      <MotionTr
                        key={biaya.id}
                        className={`border-t border ${index % 2 === 0 ? 'bg-muted/50' : 'bg-muted/50'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <td className="p-4 font-medium text-foreground">{biaya.costType}</td>
                        <td className="p-4 text-muted-foreground">{biaya.studyProgramName || 'Semua'}</td>
                        <td className="p-4 text-cyber-blue font-semibold">
                          {formatCurrency(biaya.amount ? Number(biaya.amount) : 0)}
                        </td>
                        <td className="p-4 text-muted-foreground">{biaya.description || '-'}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                            {biaya.year || 'Berlaku'}
                          </Badge>
                        </td>
                      </MotionTr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </MotionDiv>
        )}

        {/* Keringanan Biaya / Beasiswa */}
        {scholarshipsData.length > 0 && (
          <MotionDiv
            className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Program Keringanan Biaya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarshipsData.slice(0, 4).map((keringanan, index) => (
                <MotionDiv
                  key={keringanan.id}
                  className="glass-card p-6 rounded-xl border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 8) }}
                >
                  <h3 className="font-bold text-lg mb-2 text-foreground">{keringanan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {keringanan.description || 'Program keringanan biaya pendidikan'}
                  </p>
                  <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-cyber">
                    {keringanan.coverage || keringanan.benefits || 'Potongan biaya kuliah'}
                  </div>
                </MotionDiv>
              ))}
            </div>
            {scholarshipsData.length > 4 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                  Lihat Semua Program Beasiswa
                </Button>
              </div>
            )}
          </MotionDiv>
        )}

        {/* Info Pembayaran */}
        <MotionDiv
          className="glass-card rounded-2xl p-8 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Informasi Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Calculator className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Simulasi Biaya</h3>
              <p className="text-muted-foreground text-sm">Hitung estimasi biaya kuliah sesuai program studi pilihan</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <CreditCard className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Metode Pembayaran</h3>
              <p className="text-muted-foreground text-sm">Transfer Bank, Virtual Account, dan E-Wallet tersedia</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Shield className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Cicilan</h3>
              <p className="text-muted-foreground text-sm">Program cicilan tersedia untuk meringankan pembayaran</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
