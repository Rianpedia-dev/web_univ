import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Heart,
  Briefcase,
  Building2,
  Calendar,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  User,
  FileInput,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedStudentServices } from '@/lib/db';

export default async function LayananMahasiswaPage() {
  // Ambil data dari database
  const allServices = await getPublishedStudentServices();

  // Kelompokkan layanan berdasarkan type dari database
  const layananAdministrasi = allServices.filter(s => s.type === 'administrative');
  const layananKonseling = allServices.filter(s => s.type === 'counseling');
  const layananKarir = allServices.filter(s => s.type === 'career');
  const layananDigital = allServices.filter(s => s.type === 'digital');

  const kategoriLayanan = [
    { id: 'administrasi', name: 'Administrasi', icon: FileText, count: layananAdministrasi.length },
    { id: 'konseling', name: 'Konseling', icon: Heart, count: layananKonseling.length },
    { id: 'karir', name: 'Karir', icon: Briefcase, count: layananKarir.length },
    { id: 'digital', name: 'Digital', icon: FileInput, count: layananDigital.length }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/layanan_mahasiswa.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                Layanan Mahasiswa
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Kumpulan layanan yang tersedia untuk membantu mahasiswa selama masa studi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Filter Kategori */}
        <MotionDiv
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Layanan</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriLayanan.map((kategori) => {
              const IconComponent = kategori.icon;
              return (
                <Button key={kategori.id} variant="outline" className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                  <IconComponent className="w-4 h-4" />
                  {kategori.name} ({kategori.count})
                </Button>
              );
            })}
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Lihat Semua</Button>
          </div>
        </MotionDiv>

        {/* Layanan Administrasi */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Layanan Administrasi</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {layananAdministrasi.length > 0 ? (
              layananAdministrasi.map((layanan, index) => {
                return (
                  <MotionDiv
                    key={layanan.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <FileText className="w-6 h-6 text-foreground/90" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{layanan.name}</h3>
                            <Badge className="bg-green-500 hover:bg-green-600">Aktif</Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-foreground/70 mb-4">{layanan.description || 'Layanan administrasi bagi mahasiswa'}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-foreground/60">Waktu Proses</span>
                          <span className="font-semibold text-foreground">{layanan.processingTime || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-foreground/60">Biaya</span>
                          <span className="font-semibold text-foreground">
                            {layanan.fee && Number(layanan.fee) > 0 ? `Rp ${Number(layanan.fee).toLocaleString('id-ID')}` : 'Gratis'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-foreground/60">Sistem</span>
                          <Badge variant={layanan.isOnline ? 'default' : 'outline'} className={layanan.isOnline ? 'bg-cyber-blue text-background' : ''}>
                            {layanan.isOnline ? 'Online' : 'Offline'}
                          </Badge>
                        </div>
                      </div>

                      {layanan.requirements && (
                        <div className="mb-4">
                          <span className="text-sm text-muted-foreground block mb-2">Persyaratan:</span>
                          <p className="text-xs text-muted-foreground line-clamp-2">{layanan.requirements}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          <FileText className="w-4 h-4 mr-2" />
                          Ajukan
                        </Button>
                        <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                          <Download className="w-4 h-4 mr-2" />
                          Panduan
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })
            ) : (
              <p className="text-muted-foreground italic">Belum ada layanan administrasi tersedia.</p>
            )}
          </div>
        </MotionDiv>

        {/* Layanan Konseling */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Layanan Konseling & Kesejahteraan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {layananKonseling.length > 0 ? (
              layananKonseling.map((layanan, index) => {
                return (
                  <MotionDiv
                    key={layanan.id}
                    className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                        <Heart className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{layanan.name}</h3>
                        <Badge variant="secondary" className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">Konseling</Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3">{layanan.description || 'Layanan konseling bagi mahasiswa'}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Waktu Proses</span>
                        <span className="font-semibold text-foreground text-xs">{layanan.processingTime || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sistem</span>
                        <span className="font-semibold text-foreground text-xs">{layanan.isOnline ? 'Konseling Online' : 'Tatap Muka'}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                      <Heart className="w-4 h-4 mr-2" />
                      Jadwalkan Konseling
                    </Button>
                  </MotionDiv>
                );
              })
            ) : (
              <p className="text-muted-foreground italic col-span-3">Belum ada layanan konseling tersedia.</p>
            )}
          </div>
        </MotionDiv>

        {/* Kontak Layanan */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kontak Layanan Mahasiswa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Telepon</h3>
              <p className="text-muted-foreground">(0274) 1234567</p>
              <p className="text-sm text-muted-foreground">Senin-Jumat, 08:00-16:00</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">layanan.mahasiswa@university.ac.id</p>
              <p className="text-sm text-muted-foreground">Respon dalam 24 jam</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Lokasi</h3>
              <p className="text-muted-foreground">Gedung Administrasi Lt. 1</p>
              <p className="text-sm text-muted-foreground">Kampus Utama</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
