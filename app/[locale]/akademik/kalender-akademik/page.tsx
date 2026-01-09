import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  FileText,
  Download,
  ChevronRight,
  AlertCircle,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAcademicCalendar, getPublishedUniversityProfile } from '@/lib/db';
import { AcademicCalendarDownload } from "@/components/AcademicCalendarDownload";

export default async function KalenderAkademikPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const calendarData = await getPublishedAcademicCalendar();
  const universityProfileResult = await getPublishedUniversityProfile();
  const universityLogo = universityProfileResult?.[0]?.logo || null;
  const universityName = universityProfileResult?.[0]?.name || null;

  // Kelompokkan berdasarkan tahun akademik dan semester
  const groupedCalendar = calendarData.reduce((acc, item) => {
    const key = `${item.academicYear || 'Umum'}-${item.semester || 'Umum'}`;
    if (!acc[key]) {
      acc[key] = {
        academicYear: item.academicYear || 'Umum',
        semester: item.semester || 'Umum',
        events: []
      };
    }
    acc[key].events.push(item);
    return acc;
  }, {} as Record<string, { academicYear: string; semester: string; events: typeof calendarData }>);

  const semesters = Object.values(groupedCalendar);

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal belum ditentukan';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk format range tanggal
  const formatDateRange = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate) return 'Tanggal belum ditentukan';
    if (!endDate || startDate === endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };



  // Hitung statistik
  const totalEvents = calendarData.length;
  const upcomingEvents = calendarData.filter(e => e.startDate && new Date(e.startDate) > new Date()).length;

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
                background: 'linear-gradient(to right, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '1px black',
                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
              }}>
                Kalender Akademik
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">


        {/* Kalender Akademik */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Jadwal Kegiatan Akademik</h2>
            <AcademicCalendarDownload calendarData={calendarData} universityLogo={universityLogo} universityName={universityName} />
          </div>

          {semesters.length > 0 ? (
            <div className="space-y-8">
              {semesters.map((semester, index) => (
                <MotionDiv
                  key={`${semester.academicYear}-${semester.semester}`}
                  className="glass-card rounded-2xl border overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-6 bg-gradient-to-r from-cyber-blue/20 to-electric-purple/20 border-b">
                    <h3 className="text-xl font-bold text-foreground">
                      {semester.semester !== 'Umum' ? `Semester ${semester.semester}` : 'Kegiatan Umum'} - {semester.academicYear}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {semester.events.map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg border hover:border-cyber-blue/50 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4 mb-3 md:mb-0">
                            <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                              <Calendar className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              {event.description && (
                                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 text-electric-purple" />
                              <span>{formatDateRange(event.startDate, event.endDate)}</span>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Jadwal</h3>
              <p className="text-muted-foreground">Kalender akademik akan segera ditambahkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Catatan Penting */}
        <MotionDiv
          className="glass-card rounded-2xl p-8 border mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <AlertCircle className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Catatan Penting</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-cyber-blue mt-1 flex-shrink-0" />
                  <span>Jadwal dapat berubah sewaktu-waktu, silakan cek secara berkala</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-cyber-blue mt-1 flex-shrink-0" />
                  <span>Untuk informasi lebih lanjut, hubungi bagian akademik</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-cyber-blue mt-1 flex-shrink-0" />
                  <span>Pastikan untuk memperhatikan batas waktu pendaftaran dan pembayaran</span>
                </li>
              </ul>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}