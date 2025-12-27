import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  Trophy,
  BookOpen,
  Award,
  Star,
  Heart,
  Building2,
  Music,
  Mail,
  ChevronRight,
  Target,
  Rocket,
  Briefcase,
  Calendar
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedStudentOrganizations } from '@/lib/db';

export default async function UKMOrganisasiPage() {
  // Ambil data dari database
  const allOrgs = await getPublishedStudentOrganizations();

  // Kelompokkan UKM berdasarkan type dan category
  // UKM Akademik (Type academic)
  const ukmAkademik = allOrgs.filter(org => org.type === 'academic' && !['bem', 'dpm', 'hmj'].includes(org.category || ''));

  // UKM Non-Akademik (Type non_academic, religious, journalism, etc)
  const ukmNonAkademik = allOrgs.filter(org => org.type !== 'academic' && !['bem', 'dpm', 'hmj'].includes(org.category || ''));

  // Organisasi Mahasiswa Utama (Category bem, dpm, hmj)
  const organisasiMahasiswa = allOrgs.filter(org => ['bem', 'dpm', 'hmj'].includes(org.category || ''));

  const kategoriUKM = [
    { id: 'akademik', name: 'UKM Akademik', icon: GraduationCap, count: ukmAkademik.length },
    { id: 'non-akademik', name: 'UKM Non-Akademik', icon: Star, count: ukmNonAkademik.length },
    { id: 'organisasi', name: 'Organisasi Utama', icon: Building2, count: organisasiMahasiswa.length },
    { id: 'semua', name: 'Semua Bidang', icon: Target, count: allOrgs.length }
  ];

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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            UKM & <span style={{
              background: 'linear-gradient(to right, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '1px black',
              textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
            }}>Organisasi</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
            Unit Kegiatan Mahasiswa dan Organisasi Mahasiswa di lingkungan universitas
          </p>
        </MotionDiv>

        {/* Filter Kategori */}
        <MotionDiv
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Kategori UKM & Organisasi</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {kategoriUKM.map((kategori) => {
              const IconComponent = kategori.icon;
              return (
                <Button
                  key={kategori.id}
                  variant="outline"
                  className="flex items-center gap-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                >
                  <IconComponent className="w-4 h-4" />
                  {kategori.name} ({kategori.count})
                </Button>
              );
            })}
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">Lihat Semua</Button>
          </div>
        </MotionDiv>

        {/* Organisasi Mahasiswa Utama */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Organisasi Mahasiswa (Utama)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {organisasiMahasiswa.length > 0 ? (
              organisasiMahasiswa.map((org, index) => {
                return (
                  <MotionDiv
                    key={org.id}
                    className="glass-card rounded-2xl border p-6 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] overflow-hidden">
                        {org.logo ? (
                          <img src={org.logo} alt={org.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-6 h-6 text-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{org.name}</h3>
                        <Badge variant="outline" className="border-neon-green text-neon-green bg-neon-green/20 uppercase text-[10px]">{org.category}</Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3 italic">"{org.vision || org.description}"</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tipe</span>
                        <span className="font-semibold text-foreground uppercase text-xs">{org.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="outline" className="text-green-500 border-green-500/30">Aktif</Badge>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                      <Users className="w-4 h-4 mr-2" />
                      Profil Organisasi
                    </Button>
                  </MotionDiv>
                );
              })
            ) : (
              <p className="text-muted-foreground italic col-span-3 text-center py-10">Data organisasi utama belum tersedia.</p>
            )}
          </div>
        </MotionDiv>

        {/* UKM Akademik */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">UKM Akademik</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ukmAkademik.length > 0 ? (
              ukmAkademik.map((ukm, index) => {
                return (
                  <MotionDiv
                    key={ukm.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] overflow-hidden">
                          {ukm.logo ? (
                            <img src={ukm.logo} alt={ukm.name} className="w-full h-full object-cover" />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{ukm.name}</h3>
                          <Badge className="bg-green-500 hover:bg-green-600">Aktif</Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">{ukm.description || 'Unit Kegiatan Mahasiswa di bidang akademik.'}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Bidang</span>
                          <span className="font-semibold text-foreground uppercase text-xs">{ukm.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Kategori</span>
                          <span className="font-semibold text-foreground uppercase text-xs">{ukm.category}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                          <Users className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                          <Mail className="w-4 h-4 mr-2" />
                          Kontak
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })
            ) : (
              <p className="text-muted-foreground italic col-span-3 text-center py-10">Data UKM akademik belum tersedia.</p>
            )}
          </div>
        </MotionDiv>

        {/* UKM Non-Akademik */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">UKM Bidang Minat & Bakat</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ukmNonAkademik.length > 0 ? (
              ukmNonAkademik.map((ukm, index) => {
                return (
                  <MotionDiv
                    key={ukm.id}
                    className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-electric-purple to-neon-pink rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(179,118,255,0.3)] overflow-hidden">
                          {ukm.logo ? (
                            <img src={ukm.logo} alt={ukm.name} className="w-full h-full object-cover" />
                          ) : (
                            <Star className="w-6 h-6 text-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{ukm.name}</h3>
                          <Badge variant="outline" className="border-electric-purple text-electric-purple bg-electric-purple/20 uppercase text-[10px]">{ukm.type}</Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{ukm.description || 'Unit Kegiatan Mahasiswa untuk penyaluran minat dan bakat.'}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Kategori</span>
                          <span className="font-semibold text-foreground uppercase text-xs">{ukm.category}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                          <Users className="w-4 h-4 mr-2" />
                          Gabung
                        </Button>
                        <Button variant="outline" className="flex-1 border-electric-purple text-electric-purple hover:bg-electric-purple/10">
                          <Mail className="w-4 h-4 mr-2" />
                          Kontak
                        </Button>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })
            ) : (
              <p className="text-muted-foreground italic col-span-2 text-center py-10">Data UKM non-akademik belum tersedia.</p>
            )}
          </div>
        </MotionDiv>

        {/* Informasi Pendaftaran */}
        <MotionDiv
          className="glass-card rounded-3xl p-8 md:p-12 border bg-gradient-cyber/5 mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Bagaimana Cara Bergabung?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-blue flex items-center justify-center shrink-0 font-bold text-background shadow-lg shadow-cyber-blue/20">1</div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Pilih Organisasi</h4>
                    <p className="text-muted-foreground text-sm">Tentukan UKM atau Organisasi yang sesuai dengan minat dan bakatmu.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-blue flex items-center justify-center shrink-0 font-bold text-background shadow-lg shadow-cyber-blue/20">2</div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Daftar Online</h4>
                    <p className="text-muted-foreground text-sm">Lakukan pendaftaran secara mandiri melalui portal resmi mahasiswa.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-blue flex items-center justify-center shrink-0 font-bold text-background shadow-lg shadow-cyber-blue/20">3</div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Verifikasi & Wawancara</h4>
                    <p className="text-muted-foreground text-sm">Ikuti proses seleksi yang diadakan oleh pengurus organisasi pilihanmu.</p>
                  </div>
                </div>
              </div>
              <Button className="mt-8 bg-gradient-cyber px-8 h-12 text-lg font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                Mulai Daftar Sekarang
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyber-blue opacity-10 rounded-2xl blur-3xl animate-pulse" />
              <div className="relative border-2 border-cyber-blue/30 rounded-2xl p-8 overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyber-blue/20 rounded-xl">
                    <Calendar className="w-6 h-6 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Timeline Open Recruitment</h4>
                    <p className="text-xs text-muted-foreground">Semester Ganjil 2024/2025</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-cyber-blue/10">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-bold">Pendaftaran Dibuka</p>
                      <p className="text-sm font-bold text-foreground">15 Agustus 2024</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400/30">Upcoming</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-cyber-blue/10">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-bold">Penutupan Pendaftaran</p>
                      <p className="text-sm font-bold text-foreground">30 Agustus 2024</p>
                    </div>
                    <Badge variant="outline" className="text-red-400 border-red-400/30">Critical</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-bold">Pengumuman Hasil</p>
                      <p className="text-sm font-bold text-foreground">05 September 2024</p>
                    </div>
                    <Badge variant="outline" className="text-cyber-blue border-cyber-blue/30">Final</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
