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
  Lightbulb,
  Info,
  ArrowRight
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getUpcomingEventsWithCategory, getPublishedUniversityProfile } from '@/lib/db';
import { cn } from "@/lib/utils";
import { EventShareButton } from "@/components/EventShareButton";
import { EventPoster } from "@/components/EventPoster";

export default async function AgendaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const eventsData = await getUpcomingEventsWithCategory(20);
  const universityProfiles = await getPublishedUniversityProfile();
  const universityProfile = universityProfiles[0] || null;

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'TBA';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk format waktu
  const formatTime = (time: string | null) => {
    if (!time) return 'Selesai';
    try {
      // Jika dalam format ISO
      if (time.includes('T')) {
        return new Date(time).toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }) + ' WIB';
      }
      return time;
    } catch (e) {
      return time;
    }
  };

  // Fungsi untuk menentukan status event
  const getEventStatus = (startDate: Date | null, endDate: Date | null, registrationEnd: Date | null) => {
    const now = new Date();
    if (!startDate) return 'pending';

    if (registrationEnd && new Date(registrationEnd) >= now) {
      return 'open';
    }
    if (new Date(startDate) > now) {
      return 'upcoming';
    }
    if (endDate && new Date(endDate) >= now) {
      return 'ongoing';
    }
    return 'completed';
  };

  const now = new Date();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative selection:bg-cyber-blue/30 selection:text-cyber-blue">

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/backround_berita_media.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                AGENDA & EVENT
              </h1>

            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">



        {/* Content Area */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-center gap-6 border-b border-primary/10 pb-8">
            <div className="text-center mx-auto">
              <h2 className="text-5xl font-bold tracking-tight mb-2 text-foreground">Daftar Events</h2>
              <p className="text-muted-foreground font-medium">Jangan lewatkan kesempatan Event untuk menambah pengalaman dan wawasan anda</p>
            </div>

          </div>

          {eventsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.map((agenda, index) => {
                const calculatedStatus = getEventStatus(agenda.startDate, agenda.endDate, agenda.registrationEnd);
                // Prioritaskan status dari DB jika bukan 'upcoming' (berarti sudah disetel manual)
                const displayStatus = agenda.status !== 'upcoming' ? agenda.status : calculatedStatus;

                return (
                  <MotionDiv
                    key={agenda.id}
                    id={`event-${agenda.id}`}
                    className="group relative scroll-mt-24"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <div className="glass-card rounded-[2rem] border border-primary/10 hover:border-cyber-blue/30 transition-all duration-500 shadow-xl flex flex-col overflow-hidden">
                      {/* Poster Image */}
                      <EventPoster src={agenda.poster} alt={agenda.title}>
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className={cn(
                            "px-3 py-1 rounded-full font-bold text-[8px] uppercase tracking-widest border-none shadow-lg",
                            displayStatus === 'open' || displayStatus === 'ongoing' ? 'bg-green-500 text-white' :
                              displayStatus === 'upcoming' ? 'bg-cyber-blue text-foreground' :
                                displayStatus === 'completed' ? 'bg-muted text-muted-foreground' :
                                  'bg-red-500 text-white' // cancelled
                          )}>
                            {displayStatus === 'open' ? 'Pendaftaran Buka' :
                              displayStatus === 'upcoming' ? 'Mendatang' :
                                displayStatus === 'ongoing' ? 'Sedang Berlangsung' :
                                  displayStatus === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </Badge>
                        </div>
                      </EventPoster>

                      <div className="p-5 flex flex-col relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-muted-foreground border-primary/10 font-bold px-3 py-1 text-[9px] rounded-full">
                            {agenda.categoryName || 'UMUM'}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-cyber-blue transition-colors leading-tight line-clamp-2">
                            {agenda.title}
                          </h3>
                          <div className="flex items-center gap-2 font-medium">
                            <span className="text-[10px] uppercase tracking-widest truncate text-muted-foreground">
                              {agenda.organizer || 'Direktorat Kemahasiswaan'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2 italic opacity-80">
                          "{agenda.description || 'Kegiatan eksklusif untuk mengembangkan potensi diri dan jaringan profesional bagi mahasiswa masa depan.'}"
                        </p>
                        {agenda.content && (
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2 border-l-2 border-primary/20 pl-3">
                            {agenda.content}
                          </p>
                        )}

                        <div className="grid grid-cols-1 gap-y-1 mb-2 pt-2 border-t border-primary/10">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-muted/40 rounded-xl border border-primary/10">
                              <Calendar className="w-3.5 h-3.5 text-cyber-blue" />
                            </div>
                            <div>
                              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Tanggal</p>
                              <p className="text-[11px] font-bold text-foreground uppercase">{formatDate(agenda.startDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-muted/40 rounded-xl border border-primary/10">
                              <Clock className="w-3.5 h-3.5 text-electric-purple" />
                            </div>
                            <div>
                              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Waktu</p>
                              <p className="text-[11px] font-bold text-foreground uppercase">
                                {formatTime(agenda.startTime)} - {formatTime(agenda.endTime)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-muted/40 rounded-xl border border-primary/10">
                              <MapPin className="w-3.5 h-3.5 text-neon-green" />
                            </div>
                            <div>
                              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Lokasi</p>
                              <p className="text-[11px] font-bold text-foreground uppercase truncate max-w-[150px]">{agenda.venue || agenda.location || 'Kampus Utama'}</p>
                            </div>
                          </div>
                          {agenda.targetAudience && (
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 bg-muted/40 rounded-xl border border-primary/10">
                                <Users className="w-3.5 h-3.5 text-pink-500" />
                              </div>
                              <div>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Target Peserta</p>
                                <p className="text-[11px] font-bold text-foreground uppercase truncate max-w-[150px]">{agenda.targetAudience}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-2 p-2 bg-muted/20 rounded-2xl border border-primary/10">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-0.5">Kuota</span>
                            <span className="text-xs font-black text-foreground">{agenda.maxParticipants || 'N/A'} <span className="text-[8px] text-muted-foreground font-medium uppercase leading-none">Peserta</span></span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-0.5">Biaya</span>
                            <span className="text-sm font-black text-cyber-blue tracking-tight">
                              {agenda.registrationFee && agenda.registrationFee !== '0' && agenda.registrationFee !== ''
                                ? agenda.registrationFee
                                : 'FREE'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <EventShareButton
                            event={agenda}
                            universityName={universityProfile?.name || 'Universitas Teknokrat Indonesia'}
                            universityLogo={universityProfile?.logo}
                            disabled={displayStatus === 'cancelled' || displayStatus === 'completed'}
                          />
                          {(displayStatus === 'cancelled' || displayStatus === 'completed') ? (
                            <Button variant="secondary" disabled className="flex-[2] h-11 rounded-full font-bold uppercase tracking-wider text-[10px] opacity-40">
                              {displayStatus === 'cancelled' ? 'EVENT DIBATALKAN' : 'EVENT SELESAI'}
                            </Button>
                          ) : agenda.registrationUrl ? (
                            <a
                              href={agenda.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-[2]"
                            >
                              <Button className="w-full h-11 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-lg hover:scale-105 transition-all duration-300 group/btn">
                                Daftar Sekarang
                                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                              </Button>
                            </a>
                          ) : (
                            <Button variant="secondary" disabled className="flex-[2] h-11 rounded-full font-bold uppercase tracking-wider text-[10px] opacity-40">
                              PENDAFTARAN DITUTUP
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-[2.5rem] border border-primary/10 p-24 text-center">
              <div className="w-24 h-24 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/10">
                <Info className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 uppercase tracking-widest">SISTEM KOSONG</h3>
              <p className="text-muted-foreground italic">Sedang mensinkronisasi data agenda baru...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}