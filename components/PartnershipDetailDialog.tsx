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
                    className="flex-1 rounded-full h-11 uppercase font-bold text-xs tracking-wider group shadow-md hover:scale-105 transition-all duration-300"
                >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Detail
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[95vw] lg:max-w-6xl h-[90vh] p-0 flex flex-col gap-0 overflow-hidden rounded-2xl shadow-xl border-border bg-background">
                {/* Header Section */}
                <div className="flex-shrink-0 relative border-b border-border bg-muted/30">
                    <div className="relative z-10 p-4 md:p-8">
                        <DialogHeader>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="relative shrink-0">
                                    <div className="relative w-24 h-24 rounded-2xl bg-background border border-border flex items-center justify-center overflow-hidden shadow-sm">
                                        {partner.partnerLogo ? (
                                            <img
                                                src={partner.partnerLogo}
                                                alt={partner.partnerName}
                                                className="w-full h-full object-contain p-4"
                                            />
                                        ) : (
                                            <Building2 className="w-12 h-12 text-primary/40" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <Badge variant="outline" className="font-mono text-[10px] py-1 px-3 uppercase tracking-wider">
                                            PARTNER ID: {partner.id?.slice(-12).toUpperCase() || 'N/A'}
                                        </Badge>
                                        <Badge className={partner.isActive ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 px-3 py-1 text-[10px] font-bold tracking-widest' : 'bg-destructive/10 text-destructive border-destructive/20 px-3 py-1 text-[10px] font-bold tracking-widest'}>
                                            {partner.isActive ? (
                                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> AKTIF</span>
                                            ) : (
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> TIDAK AKTIF</span>
                                            )}
                                        </Badge>
                                        <Badge variant="secondary" className="text-[10px] uppercase font-bold px-3 py-1">
                                            {partner.type === 'international' ? 'Luar Negeri' : 'Dalam Negeri'}
                                        </Badge>
                                    </div>

                                    <DialogTitle className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                                        {partner.partnerName}
                                    </DialogTitle>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground pt-1">
                                        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border font-bold tracking-wider text-[10px] uppercase">
                                            <ShieldCheck className="w-4 h-4 text-primary" /> {partner.agreementNumber || 'TIDAK TERDAFTAR'}
                                        </span>
                                        <span className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider">
                                            <Zap className="w-4 h-4 text-amber-500" />
                                            Update: {new Date(partner.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>
                </div>

                {/* Content Area */}
                <ScrollArea className="flex-1 min-h-0">
                    <div className="p-6 md:p-10 space-y-10">
                        <DialogDescription className="sr-only">Informasi Lengkap Profil Mitra dan Kerjasama</DialogDescription>

                        {/* Top Overview Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: Tag, color: "text-blue-500", label: "Kategori Bidang", value: partner.category || 'General' },
                                { icon: MapPin, color: "text-rose-500", label: "Lokasi", value: `${partner.city || '-'}, ${partner.country || 'Indonesia'}` },
                                { icon: Building2, color: "text-amber-500", label: "Tipe Mitra", value: partner.type || 'Domestic' },
                                { icon: CheckCircle2, color: "text-green-500", label: "Status", value: partner.status || 'Active' }
                            ].map((item, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-muted/30 border border-border flex flex-col gap-2">
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{item.label}</span>
                                    <span className="text-base font-bold text-foreground uppercase truncate">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Column: Description & Contacts */}
                            <div className="lg:col-span-7 space-y-10">
                                <section className="space-y-4">
                                    <h4 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                        <FileText className="w-5 h-5 text-primary" />
                                        Deskripsi Kerjasama
                                    </h4>
                                    <div className="p-6 rounded-2xl bg-muted/20 border border-border">
                                        <p className="text-base text-foreground/80 leading-relaxed italic font-serif">
                                            "{partner.description || 'Informasi kerjasama institusi belum tersedia secara mendetail dalam profil ini.'}"
                                        </p>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                        <Mail className="w-5 h-5 text-primary" />
                                        Kontak & Alamat
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: "Contact Person", value: partner.contactPerson, icon: User },
                                            { label: "Email Resmi", value: partner.contactEmail, icon: Mail, classes: "text-primary px-0" },
                                            { label: "Telepon / WA", value: partner.contactPhone, icon: Phone },
                                            { label: "Website", value: partner.website, icon: Globe, classes: "text-primary" },
                                        ].map((contact, idx) => (
                                            <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col gap-1">
                                                <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{contact.label}</span>
                                                <p className={`text-sm font-bold truncate ${contact.classes || ""}`}>{contact.value || '-'}</p>
                                            </div>
                                        ))}
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col gap-1 md:col-span-2">
                                            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Alamat Lengkap</span>
                                            <p className="text-sm font-bold leading-snug">{partner.address || '-'}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Key Metrics & Objectives */}
                            <div className="lg:col-span-5 space-y-8">
                                {/* Masa Berlaku Card */}
                                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-6">
                                    <h5 className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase">
                                        <Calendar className="w-4 h-4" /> MASA BERLAKU PERJANJIAN
                                    </h5>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="relative p-4 rounded-xl bg-muted/30 border-l-4 border-l-primary">
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-1">TANGGAL MULAI</p>
                                            <p className="text-lg font-mono font-bold text-foreground">{startDate}</p>
                                        </div>
                                        <div className="relative p-4 rounded-xl bg-muted/30 border-l-4 border-l-destructive">
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-1">TANGGAL BERAKHIR</p>
                                            <p className="text-lg font-mono font-bold text-destructive">{endDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coordinator Card */}
                                <div className="p-6 rounded-2xl bg-muted/30 border border-border flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                        <User className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">KOORDINATOR</p>
                                        <p className="text-lg font-bold text-foreground leading-tight">{partner.coordinator || '-'}</p>
                                    </div>
                                </div>

                                {/* Objectives area */}
                                {objectives.length > 0 && (
                                    <section className="space-y-4">
                                        <h5 className="flex items-center gap-2 text-amber-500 font-bold tracking-widest text-[10px] uppercase">
                                            <Target className="w-4 h-4" /> TUJUAN STRATEGIS
                                        </h5>
                                        <div className="space-y-2">
                                            {objectives.map((obj: string, i: number) => (
                                                <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/20 border border-border text-sm hover:bg-muted/40 transition-colors group">
                                                    <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-foreground/80 font-medium">{obj}</span>
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
                <div className="flex-shrink-0 p-6 border-t border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-6 relative z-30">
                    <div className="text-center sm:text-left space-y-0.5">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">TIMESTAMP SINKRONISASI</p>
                        <p className="text-xs font-mono font-bold text-primary">{new Date(partner.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} • {new Date(partner.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        {partner.agreementFile && (
                            <Button
                                variant="default"
                                asChild
                                className="flex-1 sm:flex-none h-11 px-8 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-300 gap-2 text-[11px] uppercase"
                            >
                                <a href={partner.agreementFile} target="_blank" rel="noopener noreferrer">
                                    <Eye className="w-4 h-4" />
                                    DOKUMEN MOU
                                </a>
                            </Button>
                        )}
                        <DialogClose asChild>
                            <Button variant="secondary" className="flex-1 sm:flex-none h-11 px-8 rounded-full font-bold tracking-[0.2em] text-[11px] uppercase shadow-md hover:shadow-lg transition-all hover:bg-foreground hover:text-background">
                                KEMBALI
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
