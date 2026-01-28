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
    CheckCircle2,
    Clock,
    ShieldCheck,
    Zap,
    MapPin,
    Globe,
    Mail,
    Phone,
    Tag,
    Eye,
    ChevronRight
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
                    className="flex-1 rounded-full h-11 uppercase font-bold text-xs tracking-wider group shadow-md hover:scale-105 transition-all duration-300"
                >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Detail
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden rounded-3xl border border-border shadow-2xl">
                {/* Header Background Gradient */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/5 to-transparent dark:from-cyber-blue/20 pointer-events-none" />

                {/* Header Section */}
                <div className="relative p-6 px-8 border-b border-border flex items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                        {partner.partnerLogo ? (
                            <img
                                src={partner.partnerLogo}
                                alt={partner.partnerName}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <Building2 className="w-10 h-10 text-muted-foreground/40 dark:text-white/40" />
                        )}
                    </div>

                    <div className="flex-1 space-y-3 pt-1">
                        <DialogHeader className="p-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge className={`${partner.isActive ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'} hover:bg-transparent px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider`}>
                                    {partner.isActive ? (
                                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> AKTIF</span>
                                    ) : (
                                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> TIDAK AKTIF</span>
                                    )}
                                </Badge>
                                <Badge variant="outline" className="text-[10px] uppercase font-bold border-border dark:border-white/20 text-muted-foreground dark:text-white/70 bg-muted/30 dark:bg-white/5 tracking-wider px-2 py-0.5">
                                    {partner.type === 'international' ? 'Luar Negeri' : 'Dalam Negeri'}
                                </Badge>
                            </div>
                            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground dark:text-white leading-tight">
                                {partner.partnerName}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground dark:text-white/60">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary dark:text-cyber-blue" />
                                {partner.agreementNumber || 'No. MOU: -'}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-border dark:bg-white/20" />
                            <span className="flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                                Update Terakhir: {new Date(partner.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Scroll Area */}
                <ScrollArea className="flex-1 max-h-[calc(90vh-200px)]">
                    <div className="p-8 space-y-8">
                        <DialogDescription className="sr-only">Detail lengkap kerjasama</DialogDescription>

                        {/* Info Grid Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Tag, color: "text-blue-500 dark:text-blue-400", label: "Kategori", value: partner.category || 'General' },
                                { icon: MapPin, color: "text-rose-500 dark:text-rose-400", label: "Lokasi", value: `${partner.city || '-'}, ${partner.country || 'Indonesia'}` },
                                { icon: Building2, color: "text-amber-500 dark:text-amber-400", label: "Tipe Institusi", value: partner.type === 'international' ? 'International' : 'National' },
                                { icon: User, color: "text-green-500 dark:text-green-400", label: "Koordinator", value: partner.coordinator || '-' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 rounded-xl p-4 flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground/70 dark:text-white/40 tracking-widest">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-foreground dark:text-white truncate">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-3 space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                        <FileText className="w-4 h-4 text-primary dark:text-cyber-blue" /> Deskripsi Kerjasama
                                    </h4>
                                    <div className="p-6 rounded-2xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 leading-relaxed text-muted-foreground dark:text-white/80 text-sm">
                                        "{partner.description || 'Tidak ada deskripsi tersedia.'}"
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                        <Target className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Tujuan Strategis
                                    </h4>
                                    <div className="space-y-2">
                                        {objectives.length > 0 ? objectives.map((obj: string, i: number) => (
                                            <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/20 dark:bg-white/[0.03] border border-border dark:border-white/5 text-sm hover:bg-muted/40 dark:hover:bg-white/[0.06] transition-colors">
                                                <ChevronRight className="w-4 h-4 text-primary dark:text-cyber-blue shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground dark:text-white/80">{obj}</span>
                                            </div>
                                        )) : (
                                            <p className="text-sm text-muted-foreground dark:text-white/40 italic">Belum ada tujuan spesifik yang terdata.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Date Card */}
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 dark:from-white/10 dark:to-white/5 border border-border dark:border-white/10 space-y-5">
                                    <h5 className="flex items-center gap-2 text-muted-foreground dark:text-white/50 font-bold tracking-widest text-[10px] uppercase border-b border-border dark:border-white/10 pb-3">
                                        <Calendar className="w-3.5 h-3.5" /> Periode Kerjasama
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] text-primary dark:text-cyber-blue font-bold uppercase tracking-widest mb-1">Mulai</p>
                                            <p className="text-base font-mono font-bold text-foreground dark:text-white">{startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-rose-500 dark:text-rose-400 font-bold uppercase tracking-widest mb-1">Berakhir</p>
                                            <p className="text-base font-mono font-bold text-foreground dark:text-white">{endDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <h5 className="flex items-center gap-2 text-muted-foreground dark:text-white/50 font-bold tracking-widest text-[10px] uppercase">
                                        Kontak Informasi
                                    </h5>
                                    <div className="space-y-2">
                                        {partner.contactEmail && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 text-xs text-muted-foreground dark:text-white/80">
                                                <Mail className="w-3.5 h-3.5 text-muted-foreground/60 dark:text-white/40" />
                                                {partner.contactEmail}
                                            </div>
                                        )}
                                        {partner.contactPhone && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 text-xs text-muted-foreground dark:text-white/80">
                                                <Phone className="w-3.5 h-3.5 text-muted-foreground/60 dark:text-white/40" />
                                                {partner.contactPhone}
                                            </div>
                                        )}
                                        {partner.website && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 dark:bg-white/5 border border-border dark:border-white/5 text-xs text-muted-foreground dark:text-white/80">
                                                <Globe className="w-3.5 h-3.5 text-muted-foreground/60 dark:text-white/40" />
                                                <span className="truncate max-w-[180px]">{partner.website}</span>
                                            </div>
                                        )}
                                        {(!partner.contactEmail && !partner.contactPhone && !partner.website) && (
                                            <p className="text-xs text-muted-foreground dark:text-white/30 italic px-2">Tidak ada informasi kontak.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border flex justify-end gap-3 bg-background/80 backdrop-blur-md">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="h-10 px-6 rounded-full border-border dark:border-white/10 bg-background dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 text-foreground dark:text-white font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                            Tutup
                        </Button>
                    </DialogClose>
                    {partner.agreementFile && (
                        <Button
                            asChild
                            className="h-10 px-6 rounded-full bg-primary dark:bg-cyber-blue text-primary-foreground dark:text-black hover:bg-primary/90 dark:hover:bg-cyber-blue/90 font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-105"
                        >
                            <a href={partner.agreementFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Eye className="w-3.5 h-3.5" />
                                Lihat Dokumen
                            </a>
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
