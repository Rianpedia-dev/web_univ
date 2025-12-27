import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Award,
  Star,
  FileText,
  Download,
  ExternalLink,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getUpcomingEventsWithCategory } from '@/lib/db';

export default async function AgendaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database (menggunakan fungsi dengan kategori)
  const eventsData = await getUpcomingEventsWithCategory(20);

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal belum ditentukan';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk menentukan status event
  const getEventStatus = (startDate: Date | null, endDate: Date | null, registrationEnd: Date | null) => {
    const now = new Date();
    if (!startDate) return 'pending';

    if (registrationEnd && new Date(registrationEnd) >= now) {
      return 'dibukaPendaftaran';
    }
    if (new Date(startDate) > now) {
      return 'akanDatang';
    }
    if (endDate && new Date(endDate) >= now) {
      return 'berlangsung';
    }
    return 'selesai';
  };

  // Hitung statistik
  const now = new Date();
  const totalEvents = eventsData.length;
  const upcomingEvents = eventsData.filter(e => e.startDate && new Date(e.startDate) > now).length;
  const featuredEvents = eventsData.filter(e => e.isFeatured).length;

  // Kelompokkan berdasarkan kategori
  const categories = [...new Set(eventsData.map(e => e.categoryName || 'Umum'))];
  const kategoriAgenda = categories.map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    name: cat,
    count: eventsData.filter(e => (e.categoryName || 'Umum') === cat).length
  }));

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <MotionDiv
          className="text-center mb-16"
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
            Event <span style={{
              background: 'linear-gradient(to right, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '1px black',
              textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
            }}>Kampus</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Kalender lengkap kegiatan dan event di lingkungan universitas
          </p>
        </MotionDiv>

        {/* Statistik Agenda */}
        <MotionDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Calendar className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              {totalEvents}
            </div>
            <div className="text-muted-foreground text-sm">Total Event</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Clock className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {upcomingEvents}
            </div>
            <div className="text-muted-foreground text-sm">Event Mendatang</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Star className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              {featuredEvents}
            </div>
            <div className="text-muted-foreground text-sm">Event Unggulan</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              {kategoriAgenda.length}
            </div>
            <div className="text-muted-foreground text-sm">Kategori</div>
          </div>
        </MotionDiv>

        {/* Filter Kategori */}
        <MotionDiv
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori Agenda</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriAgenda.map((kategori) => (
              <Button key={kategori.id} variant="outline" className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                {kategori.name} ({kategori.count})
              </Button>
            ))}
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Lihat Semua</Button>
          </div>
        </MotionDiv>

        {/* Daftar Agenda */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Agenda Mendatang</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Minggu Ini</Button>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Bulan Ini</Button>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Terbaru</Button>
            </div>
          </div>

          {eventsData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {eventsData.map((agenda, index) => {
                const status = getEventStatus(agenda.startDate, agenda.endDate, agenda.registrationEnd);
                return (
                  <MotionDiv
                    key={agenda.id}
                    className="glass-card rounded-2xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${status === 'akanDatang' ? 'bg-cyber-blue' :
                              status === 'dibukaPendaftaran' ? 'bg-electric-purple' :
                                status === 'berlangsung' ? 'bg-green-500' :
                                  'bg-gray-500'
                              } hover:bg-opacity-80`}>
                              {status === 'akanDatang' ? 'Akan Datang' :
                                status === 'dibukaPendaftaran' ? 'Pendaftaran Dibuka' :
                                  status === 'berlangsung' ? 'Sedang Berlangsung' :
                                    'Selesai'}
                            </Badge>
                            <Badge variant="secondary" className="bg-electric-purple/20 text-electric-purple border-electric-purple/30">
                              {agenda.categoryName || 'Umum'}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{agenda.title}</h3>
                          <p className="text-cyber-blue font-semibold">{agenda.organizer || 'Universitas'}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {agenda.description || 'Kegiatan kampus yang menarik untuk diikuti'}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cyber-blue" />
                          <div>
                            <span className="text-sm text-muted-foreground">Tanggal</span>
                            <p className="font-semibold text-foreground">{formatDate(agenda.startDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-electric-purple" />
                          <div>
                            <span className="text-sm text-muted-foreground">Waktu</span>
                            <p className="font-semibold text-foreground">
                              {agenda.startTime || '08:00'} - {agenda.endTime || 'Selesai'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-neon-green" />
                        <div>
                          <span className="text-sm text-muted-foreground">Tempat</span>
                          <p className="font-semibold text-foreground">{agenda.venue || agenda.location || 'Kampus Utama'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {agenda.maxParticipants && (
                          <div>
                            <span className="text-sm text-muted-foreground">Kuota</span>
                            <p className="font-semibold text-foreground">{agenda.maxParticipants} Orang</p>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-muted-foreground">Biaya</span>
                          <p className="font-semibold text-foreground">
                            {agenda.registrationFee ? `Rp ${Number(agenda.registrationFee).toLocaleString('id-ID')}` : 'Gratis'}
                          </p>
                        </div>
                        {agenda.speaker && (
                          <div>
                            <span className="text-sm text-muted-foreground">Narasumber</span>
                            <p className="font-semibold text-sm text-muted-foreground">{agenda.speaker}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          <FileText className="w-4 h-4 mr-2" />
                          Detail Kegiatan
                        </Button>
                        {agenda.registrationUrl && (
                          <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Daftar
                          </Button>
                        )}
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Event</h3>
              <p className="text-muted-foreground">Event kampus akan segera ditambahkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Kalender Interaktif */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 border mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kalender Kegiatan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Januari', 'Februari', 'Maret'].map((bulan, index) => {
              const monthEvents = eventsData.filter(e => {
                if (!e.startDate) return false;
                const month = new Date(e.startDate).getMonth();
                return month === index;
              }).length;

              return (
                <div key={index} className="glass-card p-4 rounded-xl text-center border">
                  <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Calendar className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{bulan}</h3>
                  <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{monthEvents}</p>
                  <p className="text-sm text-muted-foreground">Kegiatan</p>
                </div>
              );
            })}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}