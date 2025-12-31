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
import { getPublishedStudentServices, getPublishedStudentServiceContacts } from '@/lib/db';
import * as Icons from "lucide-react";

export default async function LayananMahasiswaPage() {
  // Ambil data dari database
  const allServices = await getPublishedStudentServices();
  const studentContacts = await getPublishedStudentServiceContacts();

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

            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Semua Layanan */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Daftar Layanan</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-electric-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.length > 0 ? (
              allServices.map((layanan, index) => {
                // Konfigurasi tema warna berdasarkan tipe layanan
                const getTheme = (type: string) => {
                  switch (type) {
                    case 'administrative':
                      return {
                        color: 'from-blue-500 to-cyan-500',
                        bg: 'bg-blue-500/10',
                        glow: 'shadow-blue-500/20',
                        icon: FileText,
                        border: 'border-blue-500/20'
                      };
                    case 'counseling':
                      return {
                        color: 'from-purple-500 to-pink-500',
                        bg: 'bg-purple-500/10',
                        glow: 'shadow-purple-500/20',
                        icon: Heart,
                        border: 'border-purple-500/20'
                      };
                    case 'career':
                      return {
                        color: 'from-orange-500 to-yellow-500',
                        bg: 'bg-orange-500/10',
                        glow: 'shadow-orange-500/20',
                        icon: Briefcase,
                        border: 'border-orange-500/20'
                      };
                    case 'digital':
                      return {
                        color: 'from-green-500 to-emerald-500',
                        bg: 'bg-green-500/10',
                        glow: 'shadow-green-500/20',
                        icon: Zap,
                        border: 'border-green-500/20'
                      };
                    default:
                      return {
                        color: 'from-cyber-blue to-electric-purple',
                        bg: 'bg-cyber-blue/10',
                        glow: 'shadow-cyber-blue/20',
                        icon: Star,
                        border: 'border-cyber-blue/20'
                      };
                  }
                };

                const theme = getTheme(layanan.type);
                const ServiceIcon = theme.icon;

                return (
                  <MotionDiv
                    key={layanan.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Dynamic Glow Layer */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${theme.color} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />

                    <div className={`relative h-full bg-card/70 backdrop-blur-2xl border ${theme.border} rounded-2xl p-6 flex flex-col transition-all duration-300 group-hover:bg-card/90 shadow-2xl`}>
                      {/* Top Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.color} p-[1px] transform group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                          <div className="w-full h-full bg-card/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <ServiceIcon className={`w-7 h-7 transition-all duration-300 ${theme.color.split(' ')[0].replace('from-', 'text-')} group-hover:text-white`} />
                          </div>
                        </div>
                        <Badge variant="outline" className={`border-none ${theme.bg} ${theme.color.split(' ')[0].replace('from-', 'text-')} font-black text-[9px] tracking-widest uppercase py-1`}>
                          {layanan.type}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <h3 className="font-bold text-xl text-foreground mb-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 group-hover:bg-clip-text transition-all">
                          {layanan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                          {layanan.description || 'Layanan unggulan bagi seluruh mahasiswa dalam menunjang aktivitas akademik.'}
                        </p>
                      </div>

                      {/* Info Chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <div className="px-3 py-1.5 rounded-lg bg-secondary/30 border border-white/5 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-medium text-foreground">{layanan.processingTime || 'Cepat'}</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-secondary/30 border border-white/5 flex items-center gap-2">
                          <Shield className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-medium text-foreground">Terverifikasi</span>
                        </div>
                      </div>

                      {/* Pricing Section */}
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${theme.bg} border ${theme.border} mb-6`}>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Fee / Biaya</p>
                            <p className="text-lg font-black text-foreground">
                              {layanan.fee && Number(layanan.fee) > 0
                                ? <span className={`bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}>Rp {Number(layanan.fee).toLocaleString('id-ID')}</span>
                                : <span className="text-green-500">GRATIS</span>}
                            </p>
                          </div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-card border ${theme.border}`}>
                            <TrendingUp className={`w-4 h-4 ${theme.color.split(' ')[0].replace('from-', 'text-')}`} />
                          </div>
                        </div>
                      </div>

                      {/* Footer Contact */}
                      {(layanan.contactName || layanan.contactEmail) && (
                        <div className="mt-auto flex items-center gap-3 p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${theme.color} flex items-center justify-center p-[1px]`}>
                            <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-foreground/70" />
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-foreground truncate">{layanan.contactName || 'Admin'}</span>
                            <span className="text-[10px] text-muted-foreground truncate opacity-70 group-hover:opacity-100 transition-opacity">
                              {layanan.contactEmail || 'kontak@univ.ac.id'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </MotionDiv>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-3xl bg-card/20">
                <p className="text-muted-foreground italic">Belum ada layanan yang tersinkronisasi.</p>
              </div>
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
            {studentContacts.length > 0 ? (
              studentContacts.map((contact) => {
                const IconComponent = (Icons as any)[contact.icon] || Icons.HelpCircle;
                return (
                  <div key={contact.id} className="text-center">
                    <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{contact.title}</h3>
                    <p className="text-muted-foreground">{contact.value}</p>
                    {contact.description && (
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    )}
                  </div>
                );
              })
            ) : (
              <>
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
              </>
            )}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
