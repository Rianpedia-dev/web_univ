import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  GraduationCap,
  FileText,
  CheckCircle,
  Star,
  Target,
  Calendar,
  Globe,
  ArrowRight,
  Coins
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getPublishedScholarships, getPublishedAdmissionStaff } from '@/lib/db';
import AdmissionStaff from "@/components/admissions/AdmissionStaff";

export default async function BeasiswaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const [scholarshipsData, staffData] = await Promise.all([
    getPublishedScholarships(),
    getPublishedAdmissionStaff()
  ]);

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal belum ditentukan';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk format currency
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (!amount) return '-';
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
  };

  // Fungsi untuk label coverage
  const getCoverageLabel = (coverage: string | null) => {
    switch (coverage) {
      case 'full':
        return 'Beasiswa Penuh';
      case 'partial':
        return 'Beasiswa Parsial';
      case 'specific':
        return 'Beasiswa Spesifik';
      default:
        return 'Bantuan Biaya';
    }
  };

  // Statistik
  const totalScholarships = scholarshipsData.length;
  const totalQuota = scholarshipsData.reduce((acc, s) => acc + (s.quota || 0), 0);
  const providers = [...new Set(scholarshipsData.map(s => s.provider || 'Universitas'))];
  const fullScholarships = scholarshipsData.filter(s => s.coverage === 'full').length;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/0')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                PROGRAM BEASISWA
              </h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

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
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Award className="w-6 h-6 text-yellow-500 mr-2" />
                          <h3 className="text-xl font-bold text-foreground group-hover:text-cyber-blue transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                            {item.provider || 'Universitas'}
                          </Badge>
                          <Badge className={`${item.coverage === 'full'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}>
                            {getCoverageLabel(item.coverage)}
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

                    {/* Cakupan Manfaat */}
                    <div className="mb-4 p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center mb-2">
                        <Coins className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-foreground">Cakupan Manfaat:</span>
                      </div>
                      <p className="text-sm text-cyber-blue font-semibold">
                        {item.benefits || item.coverage === 'full'
                          ? 'Bebas biaya kuliah penuh + biaya hidup'
                          : 'Potongan biaya pendidikan'}
                      </p>
                    </div>

                    {item.amount && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-muted-foreground">Nilai Beasiswa: </span>
                        <span className="text-lg font-bold text-cyber-blue">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    )}

                    {item.requirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-cyber-blue" />
                          Persyaratan:
                        </h4>
                        <ul className="space-y-2">
                          {item.requirements.split('\n').slice(0, 4).map((syarat, idx) => (
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

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-cyber-blue" />
                          <span className="font-medium text-foreground mr-1">Periode:</span>
                          {item.applicationStart ? formatDate(item.applicationStart) : 'Segera dibuka'}
                          {item.applicationEnd && ` - ${formatDate(item.applicationEnd)}`}
                        </div>
                      </div>
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

        {/* Tim PMB Section */}
        <div className="py-24">
          <AdmissionStaff staff={staffData} />
        </div>
      </div>
    </div>
  );
}
