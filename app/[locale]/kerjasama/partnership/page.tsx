import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Globe,
  Users,
  BookOpen,
  Target,
  Award,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Handshake,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedPartnerships } from '@/lib/db';

export default async function PartnershipPage() {
  // Ambil data dari database
  const partnerUniversitas = await getPublishedPartnerships();

  // Data jenis kerjasama (Tetap statis karena biasanya ini adalah kategori sistem)
  const jenisKerjasama = [
    {
      id: 1,
      nama: "Joint Research",
      deskripsi: "Kerjasama penelitian bersama antar institusi",
      jumlahPartner: 8,
      manfaat: "Publikasi ilmiah bersama, pengembangan penelitian",
      icon: Target
    },
    {
      id: 2,
      nama: "Student Exchange",
      deskripsi: "Pertukaran mahasiswa antar universitas",
      jumlahPartner: 5,
      manfaat: "Pengalaman internasional, peningkatan kapasitas akademik",
      icon: Users
    },
    {
      id: 3,
      nama: "Staff Exchange",
      deskripsi: "Pertukaran tenaga kependidikan antar institusi",
      jumlahPartner: 4,
      manfaat: "Peningkatan kualitas layanan, kolaborasi akademik",
      icon: BookOpen
    },
    {
      id: 4,
      nama: "Internship Program",
      deskripsi: "Program magang untuk mahasiswa",
      jumlahPartner: 12,
      manfaat: "Pengalaman kerja nyata, penyaluran tenaga kerja",
      icon: Award
    }
  ];

  // Hitung statistik
  const totalPartner = partnerUniversitas.length;
  const totalKegiatan = partnerUniversitas.reduce((acc, p) => acc + (p.activities?.split('\n').length || 0), 0);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background grid dengan opacity minimal */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-0" />

      {/* Gradient orbs dengan opacity minimal */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/2 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/2 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      {/* Full width background image section for header */}
      <div
        className="relative bg-[url('/images/kerjasama.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Kemitraan & Kerjasama
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Kemitraan strategis dengan berbagai institusi dalam dan luar negeri
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Statistik Kemitraan */}
        <MotionDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              {totalPartner}
            </div>
            <div className="text-muted-foreground text-sm">Total Partner</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Handshake className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {totalKegiatan}
            </div>
            <div className="text-muted-foreground text-sm">Kegiatan Kerjasama</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Award className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              64
            </div>
            <div className="text-muted-foreground text-sm">Publikasi Bersama</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              320+
            </div>
            <div className="text-muted-foreground text-sm">Mahasiswa Terlibat</div>
          </div>
        </MotionDiv>

        {/* Daftar Partner */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Daftar Partner</h2>
          </div>

          {partnerUniversitas.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnerUniversitas.map((partner, index) => {
                return (
                  <MotionDiv
                    key={partner.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-cyber-blue/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)] overflow-hidden border border-white/10">
                          {partner.partnerLogo ? (
                            <img
                              src={partner.partnerLogo}
                              alt={partner.partnerName || partner.title}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <Building2 className="w-8 h-8 text-cyber-blue" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{partner.partnerName || partner.title}</h3>
                          <Badge className={`${partner.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                            {partner.isActive ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{partner.description || 'Kerjasama strategis universitas'}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">No. Perjanjian</span>
                          <span className="font-semibold text-foreground text-xs">{partner.agreementNumber || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tgl. Mulai</span>
                          <span className="font-semibold text-foreground">{partner.startDate ? new Date(partner.startDate).toLocaleDateString('id-ID') : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tgl. Selesai</span>
                          <span className="font-semibold text-foreground">{partner.endDate ? new Date(partner.endDate).toLocaleDateString('id-ID') : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Koordinator</span>
                          <span className="font-semibold text-foreground">{partner.coordinator || '-'}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground block mb-2">Tujuan:</span>
                        <p className="text-xs text-muted-foreground line-clamp-2">{partner.objectives || '-'}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          <FileText className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                          <Download className="w-4 h-4 mr-2" />
                          Dokumen
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data Partner</h3>
              <p className="text-muted-foreground">Data kerjasama akan segera ditampilkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Jenis Kerjasama */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Jenis Kerjasama</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jenisKerjasama.map((kerjasama, index) => {
              const IconComponent = kerjasama.icon;
              return (
                <MotionDiv
                  key={kerjasama.id}
                  className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{kerjasama.nama}</h3>
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">Kategori</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{kerjasama.deskripsi}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Jumlah Partner Terlibat</span>
                      <span className="font-semibold text-foreground">{kerjasama.jumlahPartner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Manfaat Kerjasama</span>
                      <span className="font-semibold text-sm text-foreground">{kerjasama.manfaat}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                    <Handshake className="w-4 h-4 mr-2" />
                    Detail Kerjasama
                  </Button>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>

        {/* Kontak Kemitraan */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Kontak Kerjasama & Kemitraan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">kerjasama@university.ac.id</p>
              <p className="text-xs text-muted-foreground">Untuk pertanyaan umum</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Telepon</h3>
              <p className="text-muted-foreground text-sm">(0274) 1234567</p>
              <p className="text-xs text-muted-foreground">Senin-Jumat, 08:00-16:00</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Alamat</h3>
              <p className="text-muted-foreground text-sm">Gedung Rektorat Lt. 2</p>
              <p className="text-xs text-muted-foreground">Kampus Utama</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] text-foreground">
              <Handshake className="w-4 h-4 mr-2" />
              Ajukan Kerjasama Baru
            </Button>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
