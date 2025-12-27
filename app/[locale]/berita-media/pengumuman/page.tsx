import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Search,
  Filter,
  Pin,
  AlertTriangle,
  CheckCircle,
  CircleDashed,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAnnouncements } from '@/lib/db';

export default async function PengumumanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const announcementsData = await getPublishedAnnouncements(20);

  // Fungsi untuk format tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return 'Tanggal tidak tersedia';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk menentukan status pengumuman
  const getAnnouncementStatus = (publishedAt: Date | null, expiresAt: Date | null) => {
    const now = new Date();
    if (!publishedAt) return 'Pending';
    if (expiresAt && new Date(expiresAt) < now) return 'Kadaluarsa';
    return 'Aktif';
  };

  // Fungsi untuk menormalisasi prioritas (menangani angka dari DB atau string legacy)
  const normalizePriority = (p: any): string => {
    if (typeof p === 'number') {
      if (p === 2) return 'tinggi'; // urgent
      if (p === 1) return 'tinggi'; // penting
      return 'sedang'; // normal
    }
    return (p?.toString() || 'sedang').toLowerCase();
  };

  // Hitung statistik
  const totalAnnouncements = announcementsData.length;
  const activeAnnouncements = announcementsData.filter(a => getAnnouncementStatus(a.publishedAt, a.expiresAt) === 'Aktif').length;
  const highPriorityAnnouncements = announcementsData.filter(a => {
    const p = normalizePriority(a.priority);
    return p === 'high' || p === 'tinggi';
  }).length;

  // Kelompokkan berdasarkan kategori
  const categories = [...new Set(announcementsData.map(a => a.categoryName || 'Umum'))];
  const kategori = [
    { nama: "Semua", jumlah: totalAnnouncements },
    ...categories.map(cat => ({
      nama: cat,
      jumlah: announcementsData.filter(a => (a.categoryName || 'Umum') === cat).length
    }))
  ];

  // Data prioritas
  const prioritas = [
    { nama: "Semua", jumlah: totalAnnouncements },
    { nama: "Tinggi", jumlah: highPriorityAnnouncements },
    {
      nama: "Sedang", jumlah: announcementsData.filter(a => {
        const p = normalizePriority(a.priority);
        return p === 'medium' || p === 'sedang';
      }).length
    },
    {
      nama: "Rendah", jumlah: announcementsData.filter(a => {
        const p = normalizePriority(a.priority);
        return p === 'low' || p === 'rendah';
      }).length
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-16 relative z-10">
        <div className="text-center mb-12">
          <MotionH1
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(to right, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '1px black',
              textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pengumuman <span style={{
              background: 'linear-gradient(to right, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '1px black',
              textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
            }}>Penting</span>
          </MotionH1>
          <MotionP
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Kumpulan pengumuman resmi dari pimpinan kampus, fakultas, dan unit-unit terkait
          </MotionP>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <MotionDiv
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Pengumuman Terbaru
              </MotionDiv>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari pengumuman..."
                  className="pl-10 pr-4 py-2 border border-cyber-blue rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent bg-muted/50 text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {announcementsData.length > 0 ? (
              <div className="space-y-6">
                {announcementsData.map((item, index) => {
                  const status = getAnnouncementStatus(item.publishedAt, item.expiresAt);
                  const priorityLower = normalizePriority(item.priority);

                  return (
                    <MotionDiv
                      key={item.id}
                      className="glass-card rounded-xl border hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyber-blue to-electric-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                              {priorityLower === 'high' || priorityLower === 'tinggi' ? (
                                <Pin className="w-6 h-6 text-foreground" />
                              ) : priorityLower === 'medium' || priorityLower === 'sedang' ? (
                                <AlertTriangle className="w-6 h-6 text-foreground" />
                              ) : (
                                <Bell className="w-6 h-6 text-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4 text-cyber-blue" />
                                  {formatDate(item.publishedAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4 text-electric-purple" />
                                  {item.categoryName || 'Admin Kampus'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`
                              ${priorityLower === 'high' || priorityLower === 'tinggi' ? 'bg-red-500 hover:bg-red-600' :
                                priorityLower === 'medium' || priorityLower === 'sedang' ? 'bg-yellow-500 hover:bg-yellow-600' :
                                  'bg-gray-500 hover:bg-gray-600'}
                            `}>
                              {priorityLower.charAt(0).toUpperCase() + priorityLower.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="border-cyber-blue text-cyber-blue bg-cyber-blue/10">
                              {item.categoryName || 'Umum'}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {item.excerpt || item.content?.substring(0, 150) + '...' || 'Tidak ada deskripsi'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {item.expiresAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-neon-green" />
                                Berlaku sampai: {formatDate(item.expiresAt)}
                              </span>
                            )}
                            <span className={`
                              flex items-center gap-1 px-2 py-1 rounded-full text-xs
                              ${status === 'Aktif' ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30' :
                                status === 'Pending' ? 'bg-electric-purple/20 text-electric-purple border border-electric-purple/30' :
                                  'bg-muted/50 text-muted-foreground border border-gray-500/30'}
                            `}>
                              {status === 'Aktif' ? <CheckCircle className="w-3 h-3 text-cyber-blue" /> :
                                status === 'Pending' ? <CircleDashed className="w-3 h-3 text-electric-purple" /> :
                                  <Bell className="w-3 h-3 text-muted-foreground" />}
                              {status}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                              Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card rounded-xl border p-12 text-center">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Pengumuman</h3>
                <p className="text-muted-foreground">Pengumuman akan segera ditambahkan</p>
              </div>
            )}

            <MotionDiv
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                Muat Lebih Banyak
              </Button>
            </MotionDiv>
          </div>

          <div className="lg:w-1/3">
            {/* Filters */}
            <MotionDiv
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-foreground">Filter</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Kategori</h4>
                  <div className="space-y-2">
                    {kategori.map((kat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 glass-card rounded-lg border hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer transition-all duration-300"
                      >
                        <span className="text-muted-foreground">{kat.nama}</span>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">{kat.jumlah}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Prioritas</h4>
                  <div className="space-y-2">
                    {prioritas.map((prioritas, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 glass-card rounded-lg border hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] cursor-pointer transition-all duration-300"
                      >
                        <span className="text-muted-foreground">{prioritas.nama}</span>
                        <Badge className="bg-gradient-cyber text-cyan-300 border border-cyber-blue/30">{prioritas.jumlah}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Pengumuman Terpenting */}
            <MotionDiv
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-foreground">Pengumuman Terpenting</h3>
              <div className="space-y-4">
                {announcementsData.filter(p => {
                  const prio = normalizePriority(p.priority);
                  return prio === 'high' || prio === 'tinggi';
                }).slice(0, 3).map((item, index) => (
                  <div key={item.id} className="p-4 glass-card border border-cyber-blue/30 rounded-lg bg-red-500/10">
                    <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(item.publishedAt)}</p>
                  </div>
                ))}
                {announcementsData.filter(p => {
                  const prio = normalizePriority(p.priority);
                  return prio === 'high' || prio === 'tinggi';
                }).length === 0 && (
                    <p className="text-muted-foreground text-sm">Tidak ada pengumuman prioritas tinggi</p>
                  )}
              </div>
            </MotionDiv>

            {/* Statistik */}
            <MotionDiv
              className="glass-card rounded-xl p-6 border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="font-bold text-lg mb-4 text-foreground">Statistik Pengumuman</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{totalAnnouncements}</div>
                  <div className="text-sm text-muted-foreground">Total Pengumuman</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{activeAnnouncements}</div>
                  <div className="text-sm text-muted-foreground">Pengumuman Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{highPriorityAnnouncements}</div>
                  <div className="text-sm text-muted-foreground">Prioritas Tinggi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">{kategori.length - 1}</div>
                  <div className="text-sm text-muted-foreground">Kategori</div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
}
