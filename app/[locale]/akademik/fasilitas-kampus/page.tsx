import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Clock,
  Users,
  Phone,
  Wifi,
  BookOpen,
  Coffee,
  Car,
  GraduationCap,
  Library,
  Dumbbell,
  Laptop,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedCampusFacilities } from '@/lib/db';
import { CampusFacilitiesList } from "@/components/CampusFacilitiesList";

export default async function FasilitasKampusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const facilitiesData = await getPublishedCampusFacilities();

  // Fungsi untuk mendapatkan icon berdasarkan tipe fasilitas
  const getFacilityIcon = (type: string | null) => {
    switch (type?.toLowerCase()) {
      case 'perpustakaan':
      case 'library':
        return Library;
      case 'laboratorium':
      case 'lab':
        return Laptop;
      case 'olahraga':
      case 'sport':
        return Dumbbell;
      case 'kafetaria':
      case 'kantin':
        return Coffee;
      case 'parkir':
        return Car;
      case 'ruang kelas':
      case 'classroom':
        return BookOpen;
      default:
        return Building2;
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
        className="relative bg-[url('/images/backround_akademik.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 py-44 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                  background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  WebkitTextStroke: '1px #fcffa5ff',
                  textShadow: '0 2px 2px rgba(0,0,0,0.5)'
                }}>
                FASILITAS KAMPUS
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Daftar Fasilitas */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Daftar Fasilitas</h2>
          </div>

          <CampusFacilitiesList
            facilities={facilitiesData}
          />
        </MotionDiv>

        {/* Info Tambahan */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 border mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Layanan Fasilitas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Clock className="w-6 h-6 text-slate-900 dark:text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Jam Operasional</h3>
              <p className="text-muted-foreground text-sm">Senin - Jumat: 07:00 - 21:00</p>
              <p className="text-muted-foreground text-sm">Sabtu: 08:00 - 17:00</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Phone className="w-6 h-6 text-slate-900 dark:text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Reservasi</h3>
              <p className="text-muted-foreground text-sm">Hubungi bagian umum untuk</p>
              <p className="text-muted-foreground text-sm">reservasi ruangan dan fasilitas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Wifi className="w-6 h-6 text-slate-900 dark:text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">WiFi Kampus</h3>
              <p className="text-muted-foreground text-sm">Akses internet gratis tersedia</p>
              <p className="text-muted-foreground text-sm">di seluruh area kampus</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}