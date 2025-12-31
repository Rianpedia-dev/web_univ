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
  Calendar,
  Phone,
  MessageCircle,
  User
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedStudentOrganizations } from '@/lib/db';

export default async function UKMOrganisasiPage() {
  // Ambil data dari database
  const allOrgs = await getPublishedStudentOrganizations();

  // Tampilkan semua organisasi dalam satu daftar
  const semuaOrganisasi = allOrgs;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10">
        {/* Full width background image section for header */}
        <div
          className="relative bg-[url('/images/layanan_mahasiswa.png')] bg-cover bg-center bg-no-repeat border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                  UKM & <span style={{
                    background: 'linear-gradient(to right, #10b981, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    WebkitTextStroke: '1px black',
                    textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
                  }}>Organisasi</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          {/* Daftar Organisasi & UKM */}
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-foreground text-center tracking-tight">
                Daftar <span className="bg-gradient-cyber bg-clip-text text-transparent">Organisasi & UKM</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {semuaOrganisasi.length > 0 ? (
                semuaOrganisasi.map((org, index) => {
                  return (
                    <MotionDiv
                      key={org.id}
                      className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] overflow-hidden">
                            {org.logo ? (
                              <img src={org.logo} alt={org.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-6 h-6 text-foreground" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{org.name}</h3>
                            <Badge className="bg-green-500 hover:bg-green-600">Aktif</Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-3 italic">"{org.description}"</p>

                        {org.objectives && (
                          <div className="mb-4 bg-muted/30 p-3 rounded-lg border border-white/5">
                            <p className="text-xs font-bold text-foreground mb-1 flex items-center gap-1">
                              <Target className="w-3 h-3 text-cyan-500" /> Tujuan
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{org.objectives}</p>
                          </div>
                        )}

                        <div className="space-y-3 mb-6 bg-secondary/20 p-4 rounded-xl border border-white/5">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <User className="w-4 h-4 text-cyber-blue" /> Ketua
                            </span>
                            <span className="font-medium text-foreground">{org.leader || '-'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm pb-2 border-b border-white/5">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Users className="w-4 h-4 text-cyan-500" /> Anggota
                            </span>
                            <span className="font-medium text-foreground">{org.memberCount || '-'}</span>
                          </div>

                          {org.contactPhone && (
                            <div className="flex justify-between items-center text-sm pt-1">
                              <span className="text-muted-foreground flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                              </span>
                              <a href={`https://wa.me/${org.contactPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-green-500 transition-colors">
                                {org.contactPhone}
                              </a>
                            </div>
                          )}

                          {org.contactEmail && (
                            <div className="flex justify-between items-start gap-4 text-sm pt-1 border-t border-white/5">
                              <span className="text-muted-foreground flex items-center gap-2 shrink-0">
                                <Mail className="w-4 h-4 text-blue-500" /> Email
                              </span>
                              <a href={`mailto:${org.contactEmail}`} className="font-medium text-foreground hover:text-blue-500 transition-colors break-all text-right">
                                {org.contactEmail}
                              </a>
                            </div>
                          )}
                        </div>

                        <Button
                          className={`w-full h-10 transition-all duration-300 rounded-lg ${org.isRegistrationOpen
                            ? "bg-[linear-gradient(135deg,#00f0ff_0%,#b376ff_100%)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] text-black font-bold hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-muted text-muted-foreground cursor-not-allowed border-none font-medium"
                            }`}
                          asChild={org.isRegistrationOpen as boolean}
                          disabled={!org.isRegistrationOpen}
                        >
                          {org.isRegistrationOpen ? (
                            <a href={org.registrationLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                              <Rocket className="w-4 h-4 mr-2" />
                              Bergabung
                            </a>
                          ) : (
                            <div className="flex items-center justify-center w-full h-full">
                              Pendaftaran ditutup
                            </div>
                          )}
                        </Button>
                      </div>
                    </MotionDiv>
                  );
                })
              ) : (
                <p className="text-muted-foreground italic col-span-3 text-center py-10">Data organisasi belum tersedia.</p>
              )}
            </div>
          </MotionDiv>

        </div>
      </div>
    </div>
  );
}
