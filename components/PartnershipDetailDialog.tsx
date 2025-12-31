"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Building2,
    Calendar,
    FileText,
    User,
    Target,
    Activity,
    Gift,
    CheckCircle2,
    Clock,
    ExternalLink,
    ChevronRight,
    Info,
    ShieldCheck,
    Zap,
    MapPin,
    Globe,
    Mail,
    Phone,
    Briefcase,
    Tag,
    Navigation,
    Eye
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PartnershipDetailDialogProps {
    partner: any;
}

export function PartnershipDetailDialog({ partner }: PartnershipDetailDialogProps) {
    const startDate = partner.startDate ? new Date(partner.startDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '-';

    const endDate = partner.endDate ? new Date(partner.endDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '-';

    const objectives = partner.objectives ? partner.objectives.split('\n').filter((o: string) => o.trim() !== '') : [];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex-1 bg-gradient-to-r from-cyber-blue to-electric-purple hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 group h-11 rounded-xl uppercase font-bold text-xs tracking-wider border-none"
                    style={{ color: 'white' }}
                >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" style={{ color: 'white' }} />
                    Detail
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[95vw] lg:max-w-6xl h-[90vh] p-0 flex flex-col glass-card border-cyber-blue/30 bg-background/95 backdrop-blur-3xl gap-0 overflow-hidden shadow-2xl rounded-3xl dark:bg-darker-bg/95">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-cyber-blue/30 rounded-tl-3xl pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-electric-purple/30 rounded-br-3xl pointer-events-none z-20" />

                {/* Header Section */}
                <div className="flex-shrink-0 relative bg-muted/30 dark:bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 p-4 md:p-6 border-b border-border dark:border-white/10">
                        <DialogHeader>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="relative shrink-0">
                                    <div className="absolute -inset-2 bg-cyber-blue/20 blur-xl rounded-full" />
                                    <div className="relative w-20 h-20 rounded-xl bg-background/60 dark:bg-black/60 border border-cyber-blue/30 flex items-center justify-center overflow-hidden backdrop-blur-md">
                                        {partner.partnerLogo ? (
                                            <img
                                                src={partner.partnerLogo}
                                                alt={partner.partnerName}
                                                className="w-full h-full object-contain p-3"
                                            />
                                        ) : (
                                            <Building2 className="w-10 h-10 text-cyber-blue" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-3">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <Badge variant="outline" className="font-mono text-[10px] border-cyber-blue/40 text-cyber-blue py-1 px-3 bg-cyber-blue/5 uppercase tracking-tighter">
                                            PARTNER ID: {partner.id?.slice(-12).toUpperCase() || 'N/A'}
                                        </Badge>
                                        <Badge className={partner.isActive ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 px-3 py-1 text-[10px] font-black tracking-widest' : 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30 px-3 py-1 text-[10px] font-black tracking-widest'}>
                                            {partner.isActive ? (
                                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> AKTIF</span>
                                            ) : (
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> TIDAK AKTIF</span>
                                            )}
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] uppercase font-bold border-electric-purple/40 text-electric-purple-700 dark:text-electric-purple px-3 py-1">
                                            {partner.type === 'international' ? 'Luar Negeri' : 'Dalam Negeri'}
                                        </Badge>
                                    </div>

                                    <DialogTitle className="text-2xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyber-blue to-electric-purple dark:bg-gradient-cyber leading-none tracking-tighter filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:drop-shadow-none py-2">
                                        {partner.partnerName}
                                    </DialogTitle>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-foreground/70 dark:text-muted-foreground pt-1">
                                        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 font-black tracking-widest text-[10px] uppercase text-foreground/80 dark:text-foreground/90">
                                            <ShieldCheck className="w-4 h-4 text-cyber-blue dark:text-cyber-blue" /> {partner.agreementNumber || 'TIDAK TERDAFTAR'}
                                        </span>
                                        <span className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-foreground/60 dark:text-muted-foreground">
                                            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] dark:shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                            Update: {new Date(partner.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>
                </div>

                {/* Content Area */}
                <ScrollArea className="flex-1 min-h-0 bg-muted/5 dark:bg-black/20">
                    <div className="p-4 md:p-8 space-y-8">
                        <DialogDescription className="sr-only">Informasi Lengkap Profil Mitra dan Kerjasama</DialogDescription>

                        {/* Top Overview Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl bg-card border border-border dark:bg-white/5 dark:border-white/10 flex flex-col gap-1.5">
                                <Tag className="w-4 h-4 text-cyber-blue mb-1" />
                                <span className="text-[9px] uppercase font-black text-foreground/70 dark:text-muted-foreground tracking-widest">Kategori Bidang</span>
                                <span className="text-base font-black text-foreground uppercase">{partner.category || 'General'}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border dark:bg-white/5 dark:border-white/10 flex flex-col gap-1.5">
                                <Navigation className="w-4 h-4 text-rose-500 mb-1" />
                                <span className="text-[9px] uppercase font-black text-foreground/70 dark:text-muted-foreground tracking-widest">Lokasi</span>
                                <span className="text-base font-black text-foreground">{partner.city || '-'}, {partner.country || 'Indonesia'}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border dark:bg-white/5 dark:border-white/10 flex flex-col gap-1.5">
                                <Briefcase className="w-4 h-4 text-amber-500 mb-1" />
                                <span className="text-[9px] uppercase font-black text-foreground/70 dark:text-muted-foreground tracking-widest">Tipe Mitra</span>
                                <span className="text-base font-black text-foreground uppercase">{partner.type || 'Domestic'}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border dark:bg-white/5 dark:border-white/10 flex flex-col gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 mb-1" />
                                <span className="text-[9px] uppercase font-black text-foreground/70 dark:text-muted-foreground tracking-widest">Status Kerjasama</span>
                                <span className="text-base font-black text-foreground uppercase">{partner.status || 'Active'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Description & Contacts */}
                            <div className="lg:col-span-7 space-y-12">
                                <section className="space-y-4">
                                    <h4 className="text-lg font-black flex items-center gap-2 italic uppercase tracking-tighter">
                                        <FileText className="w-5 h-5 text-cyber-blue" />
                                        Deskripsi Kerjasama
                                    </h4>
                                    <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-transparent dark:from-white/[0.05] border border-border dark:border-white/10 relative overflow-hidden group shadow-inner">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-blue/10 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-cyber-blue/20 transition-colors pointer-events-none" />
                                        <p className="text-base text-foreground/80 dark:text-muted-foreground leading-relaxed italic relative z-10 font-medium font-serif">
                                            "{partner.description || 'Informasi kerjasama institusi belum tersedia secara mendetail dalam profil ini.'}"
                                        </p>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-lg font-black flex items-center gap-2 italic uppercase tracking-tighter">
                                        <Mail className="w-5 h-5 text-rose-500" />
                                        Kontak & Alamat
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 flex flex-col gap-0.5">
                                            <span className="text-[9px] text-muted-foreground font-black tracking-widest uppercase">Contact Person</span>
                                            <p className="text-base font-bold">{partner.contactPerson || '-'}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 flex flex-col gap-0.5">
                                            <span className="text-[9px] text-foreground/50 dark:text-muted-foreground font-black tracking-widest uppercase">Email Resmi</span>
                                            <p className="text-base font-bold text-blue-700 truncate">{partner.contactEmail || '-'}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 flex flex-col gap-0.5">
                                            <span className="text-[9px] text-muted-foreground font-black tracking-widest uppercase">Telepon / WhatsApp</span>
                                            <p className="text-base font-bold">{partner.contactPhone || '-'}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 flex flex-col gap-0.5">
                                            <span className="text-[9px] text-foreground/50 dark:text-muted-foreground font-black tracking-widest uppercase">Website</span>
                                            <p className="text-base font-bold text-electric-purple-700 truncate">{partner.website || '-'}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 flex flex-col gap-0.5">
                                            <span className="text-[9px] text-foreground/70 dark:text-muted-foreground font-black tracking-widest uppercase">Alamat Lengkap</span>
                                            <p className="text-base font-bold leading-snug text-foreground">{partner.address || '-'}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Key Metrics & Objectives */}
                            <div className="lg:col-span-5 space-y-10">
                                {/* Masa Berlaku Card */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyber-blue/20 via-muted/20 to-electric-purple/20 dark:via-black/20 border border-border dark:border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <Calendar className="w-16 h-16" />
                                    </div>
                                    <h5 className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                                        <Calendar className="w-4 h-4" /> MASA BERLAKU PERJANJIAN
                                    </h5>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="relative p-4 rounded-xl bg-background/50 dark:bg-white/5 border border-border dark:border-white/5 overflow-hidden group">
                                            <div className="absolute inset-y-0 left-0 w-1 bg-cyber-blue shadow-[0_0_10px_rgba(0,240,255,1)]" />
                                            <p className="text-[9px] text-foreground/70 dark:text-muted-foreground font-black uppercase tracking-widest mb-1">TANGGAL MULAI</p>
                                            <p className="text-xl font-mono font-black text-foreground tracking-tighter">{startDate}</p>
                                        </div>
                                        <div className="relative p-4 rounded-xl bg-background/50 dark:bg-white/5 border border-border dark:border-white/5 overflow-hidden group">
                                            <div className="absolute inset-y-0 left-0 w-1 bg-electric-purple shadow-[0_0_10px_rgba(191,0,255,1)]" />
                                            <p className="text-[9px] text-foreground/70 dark:text-muted-foreground font-black uppercase tracking-widest mb-1">TANGGAL BERAKHIR</p>
                                            <p className="text-xl font-mono font-black text-electric-purple tracking-tighter">{endDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coordinator Card */}
                                <div className="p-6 rounded-2xl bg-muted/40 dark:bg-white/5 border border-border dark:border-white/10 space-y-4">
                                    <h5 className="flex items-center gap-2 text-electric-purple-600 dark:text-electric-purple font-bold tracking-[0.2em] text-[10px] uppercase">
                                        <User className="w-4 h-4" /> KOORDINATOR PELAKSANA
                                    </h5>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-electric-purple/10 flex items-center justify-center border border-electric-purple/20 shrink-0 shadow-lg shadow-electric-purple/5">
                                            <User className="w-6 h-6 text-electric-purple" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-lg font-black truncate leading-none text-foreground">{partner.coordinator || '-'}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 font-bold opacity-60">Focal Point & Penanggung Jawab</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Objectives area */}
                                {objectives.length > 0 && (
                                    <section className="space-y-4">
                                        <h5 className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase">
                                            <Target className="w-4 h-4" /> TUJUAN STRATEGIS
                                        </h5>
                                        <div className="space-y-3">
                                            {objectives.map((obj: string, i: number) => (
                                                <div key={i} className="flex gap-3 p-4 rounded-xl bg-background/50 dark:bg-white/[0.02] border border-border dark:border-white/5 text-xs font-bold italic leading-relaxed hover:bg-muted/50 dark:hover:bg-white/[0.05] transition-colors group">
                                                    <div className="w-5 h-5 rounded-full bg-cyber-blue/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyber-blue shadow-sm transition-colors">
                                                        <ChevronRight className="w-3 h-3 text-cyber-blue group-hover:text-black shrink-0 transition-colors" />
                                                    </div>
                                                    <span className="text-foreground/70 dark:text-muted-foreground group-hover:text-foreground transition-colors">{obj}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Action Footer */}
                <div className="flex-shrink-0 p-4 md:p-6 border-t border-border dark:border-white/10 bg-background/80 dark:bg-black/60 backdrop-blur-3xl flex flex-col sm:flex-row items-center justify-between gap-6 relative z-30">
                    <div className="text-center sm:text-left space-y-0.5">
                        <p className="text-[9px] text-foreground/70 dark:text-muted-foreground uppercase tracking-[0.3em] font-black">TIMESTAMP SINKRONISASI</p>
                        <p className="text-xs font-mono font-black text-blue-700 dark:text-cyber-blue">{new Date(partner.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} • {new Date(partner.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        {partner.agreementFile && (
                            <Button
                                className="flex-1 sm:flex-none h-11 px-6 bg-gradient-to-r from-cyber-blue to-electric-purple hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] border-none rounded-xl font-black group transition-all duration-300 gap-2 text-[10px] uppercase"
                                style={{ color: 'white' }}
                            >
                                <a href={partner.agreementFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: 'white' }}>
                                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'white' }} />
                                    DOKUMEN MOU
                                </a>
                            </Button>
                        )}
                        <DialogClose asChild>
                            <Button variant="secondary" className="flex-1 sm:flex-none h-11 px-8 rounded-xl font-black tracking-[0.2em] text-[10px] uppercase border border-border hover:bg-foreground hover:text-background transition-all">
                                KEMBALI
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
