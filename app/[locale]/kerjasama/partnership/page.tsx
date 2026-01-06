import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Award,
  Download,
  Handshake,
  Shield,
  Target,
  MapPin,
  Mail,
  Phone,
  Globe,
  User,
  Eye
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { PartnershipDetailDialog } from "@/components/PartnershipDetailDialog";
import { Badge } from "@/components/ui/badge";
import { getPublishedPartnerships } from '@/lib/db';

export default async function PartnershipPage() {
  // Ambil data dari database (Table partners yang sekarang menyimpan detail kerjasama)
  const partnerUniversitas = await getPublishedPartnerships();

  // Hitung statistik
  const totalPartner = partnerUniversitas.length;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative pb-20">
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
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">


        {/* Daftar Partner */}
        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 tracking-tighter uppercase italic">
              Daftar Partner
            </h2>
            <div className="w-24 h-1.5 bg-gradient-cyber rounded-full mt-4 shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
          </div>

          {partnerUniversitas.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnerUniversitas.map((partner, index) => {
                return (
                  <MotionDiv
                    key={partner.id}
                    className="glass-card rounded-2xl border border-border dark:border-white/10 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500 group flex flex-col h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl bg-cyber-blue/5 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.1)] overflow-hidden border border-border dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                            {partner.partnerLogo ? (
                              <img
                                src={partner.partnerLogo}
                                alt={partner.partnerName}
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <Building2 className="w-8 h-8 text-cyber-blue" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1 leading-tight group-hover:text-cyber-blue transition-colors">{partner.partnerName}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              <Badge className={`${partner.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} hover:bg-transparent px-2 py-0 text-[10px] uppercase font-bold`}>
                                {partner.isActive ? 'Aktif' : 'Tidak Aktif'}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] uppercase font-bold border-cyber-blue/30 text-cyber-blue bg-cyber-blue/5">
                                {partner.type === 'international' ? 'Luar Negeri' : 'Dalam Negeri'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-muted/50 dark:bg-white/5 text-muted-foreground border-border dark:border-white/10 text-[10px] uppercase tracking-wider px-2">
                          <Target className="w-3 h-3 mr-1 text-electric-purple" /> {partner.category || 'General'}
                        </Badge>
                        {partner.city && (
                          <Badge variant="secondary" className="bg-muted/50 dark:bg-white/5 text-muted-foreground border-border dark:border-white/10 text-[10px] uppercase tracking-wider px-2">
                            <MapPin className="w-3 h-3 mr-1 text-rose-500" /> {partner.city}, {partner.country}
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 italic leading-relaxed">
                        "{partner.description || 'Kerjasama strategis universitas untuk meningkatkan kualitas pendidikan dan inovasi.'}"
                      </p>

                      <div className="grid grid-cols-1 gap-3 mb-6 bg-muted/30 dark:bg-white/[0.02] p-4 rounded-xl border border-border dark:border-white/5">
                        <div className="flex justify-between items-center pb-2 border-b border-border dark:border-white/5">
                          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">No. Perjanjian</span>
                          <span className="font-mono text-[10px] text-foreground font-bold">{partner.agreementNumber || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border dark:border-white/5">
                          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Periode</span>
                          <span className="text-[10px] text-foreground font-bold">
                            {partner.startDate ? new Date(partner.startDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : '-'}
                            —
                            {partner.endDate ? new Date(partner.endDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Koordinator</span>
                          <span className="text-[11px] text-foreground font-bold flex items-center gap-1">
                            <User className="w-3 h-3 text-cyan-400" /> {partner.coordinator || '-'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between text-[11px] px-1">
                          <div className="flex gap-4">
                            {partner.contactEmail && (
                              <a href={`mailto:${partner.contactEmail}`} className="text-muted-foreground hover:text-cyber-blue transition-colors" title={partner.contactEmail}>
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                            {partner.contactPhone && (
                              <a href={`tel:${partner.contactPhone}`} className="text-muted-foreground hover:text-cyber-blue transition-colors" title={partner.contactPhone}>
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                            {partner.website && (
                              <a href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyber-blue transition-colors" title="Buka Website">
                                <Globe className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <PartnershipDetailDialog partner={partner} />
                          <Button
                            className="flex-1 rounded-full h-11 font-bold text-xs uppercase group shadow-lg hover:scale-105 transition-all duration-300"
                            asChild={!!partner.agreementFile}
                            variant={partner.agreementFile ? "default" : "secondary"}
                            disabled={!partner.agreementFile}
                          >
                            {partner.agreementFile ? (
                              <a href={partner.agreementFile} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                DOKUMEN MOU
                              </a>
                            ) : (
                              <span className="flex items-center opacity-50 cursor-not-allowed">
                                <Eye className="w-4 h-4 mr-2" />
                                DOKUMEN MOU
                              </span>
                            )}
                          </Button>
                        </div>
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
      </div>
    </div>
  );
}
