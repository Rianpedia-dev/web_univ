import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  BookOpen,
  Award,
  GraduationCap,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lightbulb
} from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAdmissionClasses } from '@/lib/db';

export default async function KelasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Ambil data dari database
  const classesData = await getPublishedAdmissionClasses();

  // Hitung statistik
  const totalClasses = classesData.length;
  const totalQuota = classesData.reduce((acc, c) => acc + (c.quota || 0), 0);
  const classTypes = [...new Set(classesData.map(c => c.type || 'Reguler'))];

  // Data tahapan seleksi (static karena umum)
  const tahapanSeleksi = [
    {
      nama: "Pendaftaran Online",
      deskripsi: "Mengisi formulir pendaftaran di portal kampus",
      dokumen: ["Data pribadi", "Nilai akademik", "Dokumen pendukung"]
    },
    {
      nama: "Verifikasi Dokumen",
      deskripsi: "Verifikasi kelengkapan dan keaslian dokumen",
      dokumen: ["Scan dokumen", "Legalitas", "Validasi data"]
    },
    {
      nama: "Tes Seleksi",
      deskripsi: "Tes tertulis/psikotes dan wawancara",
      dokumen: ["Hasil tes", "Nilai psikotes", "Catatan wawancara"]
    },
    {
      nama: "Pengumuman Hasil",
      deskripsi: "Pengumuman kelulusan seleksi",
      dokumen: ["Surat lulus", "Surat keterangan", "Nomor mahasiswa"]
    }
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
        className="relative bg-[url('/images/backround_kelas.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                Program Kelas
              </h1>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                Pilihan program kelas yang sesuai dengan kebutuhan dan kondisi Anda
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Statistik Kelas */}
        <MotionDiv
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
              {totalClasses}
            </div>
            <div className="text-muted-foreground text-sm">Jenis Kelas</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {totalQuota.toLocaleString('id-ID')}
            </div>
            <div className="text-muted-foreground text-sm">Kuota Total</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Clock className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
              {classTypes.length}
            </div>
            <div className="text-muted-foreground text-sm">Tipe Kelas</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <GraduationCap className="w-6 h-6 text-foreground" />
            </div>
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
              100%
            </div>
            <div className="text-muted-foreground text-sm">Akreditasi</div>
          </div>
        </MotionDiv>

        {/* Daftar Kelas */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Pilihan Program Kelas</h2>

          {classesData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {classesData.map((kelasItem, index) => (
                <MotionDiv
                  key={kelasItem.id}
                  className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{kelasItem.name}</h3>
                      <Badge className="bg-gradient-cyber text-lg py-1 px-3">
                        {kelasItem.quota ? `${kelasItem.quota} Kuota` : 'Terbatas'}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {kelasItem.description || 'Program kelas yang dirancang untuk kebutuhan pembelajaran yang optimal.'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-sm text-muted-foreground">Tipe</span>
                        <p className="font-semibold text-foreground">{kelasItem.type || 'Reguler'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Jadwal</span>
                        <p className="font-semibold text-foreground">{kelasItem.schedule || 'Senin - Jumat'}</p>
                      </div>
                    </div>

                    {kelasItem.requirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Persyaratan:</h4>
                        <ul className="space-y-2">
                          {kelasItem.requirements.split('\n').map((syarat, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{syarat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button className="w-full bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      Daftar Kelas Ini
                    </Button>
                  </div>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl border p-12 text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data Kelas</h3>
              <p className="text-muted-foreground">Data program kelas akan segera ditambahkan</p>
            </div>
          )}
        </MotionDiv>

        {/* Tahapan Seleksi */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Tahapan Seleksi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tahapanSeleksi.map((tahap, index) => (
              <MotionDiv
                key={index}
                className="glass-card p-6 rounded-2xl border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <span className="text-foreground font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{tahap.nama}</h3>
                <p className="text-muted-foreground text-sm mb-3">{tahap.deskripsi}</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {tahap.dokumen.map((dok, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3 h-3 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                      {dok}
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Jadwal Kuliah */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Jadwal Kuliah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center text-foreground">
                <Calendar className="w-5 h-5 mr-2 text-cyber-blue" />
                Kelas Reguler
              </h3>
              <div className="space-y-3">
                {[
                  { hari: "Senin", waktu: "08:00 - 16:00", keterangan: "Lengkap" },
                  { hari: "Selasa", waktu: "08:00 - 16:00", keterangan: "Lengkap" },
                  { hari: "Rabu", waktu: "08:00 - 16:00", keterangan: "Lengkap" },
                  { hari: "Kamis", waktu: "08:00 - 16:00", keterangan: "Lengkap" },
                  { hari: "Jumat", waktu: "08:00 - 16:00", keterangan: "Lengkap" }
                ].map((jadwal, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted/50 rounded-lg border">
                    <span className="text-foreground">{jadwal.hari}</span>
                    <span className="text-muted-foreground">{jadwal.waktu}</span>
                    <span className="bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded text-xs border border-cyber-blue/30">{jadwal.keterangan}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center text-foreground">
                <Clock className="w-5 h-5 mr-2 text-electric-purple" />
                Kelas Karyawan & Paralel
              </h3>
              <div className="space-y-3">
                {[
                  { hari: "Sabtu", waktu: "08:00 - 16:00", keterangan: "Karyawan" },
                  { hari: "Minggu", waktu: "08:00 - 16:00", keterangan: "Karyawan" },
                  { hari: "Senin", waktu: "17:00 - 20:00", keterangan: "Paralel" },
                  { hari: "Selasa", waktu: "17:00 - 20:00", keterangan: "Paralel" },
                  { hari: "Rabu", waktu: "17:00 - 20:00", keterangan: "Paralel" }
                ].map((jadwal, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted/50 rounded-lg border">
                    <span className="text-foreground">{jadwal.hari}</span>
                    <span className="text-muted-foreground">{jadwal.waktu}</span>
                    <span className="bg-electric-purple/20 text-electric-purple px-2 py-1 rounded text-xs border border-electric-purple/30">{jadwal.keterangan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Panduan Pemilihan Kelas */}
        <MotionDiv
          className="glass-card rounded-2xl p-8 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Panduan Pemilihan Kelas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                judul: "Evaluasi Kondisi",
                deskripsi: "Pertimbangkan kondisi pekerjaan, waktu luang, dan kemampuan finansial",
                icon: Users
              },
              {
                judul: "Sesuaikan Target",
                deskripsi: "Pilih kelas yang sesuai dengan tujuan akademik dan karir Anda",
                icon: BookOpen
              },
              {
                judul: "Konsultasi",
                deskripsi: "Berkonsultasi dengan konselor akademik untuk pemilihan kelas terbaik",
                icon: FileText
              }
            ].map((panduan, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <panduan.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{panduan.judul}</h3>
                <p className="text-muted-foreground text-sm">{panduan.deskripsi}</p>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
