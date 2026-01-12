"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Download,
    Link2,
    Calendar,
    MapPin,
    Share2,
    Loader2,
    Globe,
    Facebook,
    Twitter,
    Mail,
    MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateEventImage, formatDate, EventData } from "@/lib/event-image-generator";

interface ShareEventDialogProps {
    event: EventData;
    isOpen: boolean;
    onClose: () => void;
    universityName?: string;
    universityLogo?: string | null;
}

export function ShareEventDialog({
    event,
    isOpen,
    onClose,
    universityName = "UNIVERSITAS TEKNOKRAT INDONESIA",
    universityLogo,
}: ShareEventDialogProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Generate preview on mount
    useEffect(() => {
        let active = true;
        const generatePreview = async () => {
            if (isOpen) {
                const host = typeof window !== 'undefined' ? window.location.host : '';
                const canvas = await generateEventImage(event, universityLogo, universityName, host, 0.5);
                if (active && canvas) {
                    setPreviewUrl(canvas.toDataURL('image/jpeg', 0.8));
                }
            }
        };
        generatePreview();
        return () => { active = false; };
    }, [event, isOpen, universityLogo, universityName]);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const host = typeof window !== 'undefined' ? window.location.host : '';
            const canvas = await generateEventImage(event, universityLogo, universityName, host, 2);
            if (canvas) {
                const link = document.createElement('a');
                link.download = `event-${event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`;
                link.href = canvas.toDataURL('image/jpeg', 0.95);
                link.click();
            }
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyLink = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const ActionButton = ({ icon: Icon, label, onClick, disabled, variant, className }: any) => (
        <Button
            variant={variant}
            className={cn("w-full h-12 rounded-xl font-bold tracking-wider group shadow-sm transition-all duration-300", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {disabled && label.includes("Gambar") ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <Icon className={cn("w-4 h-4 mr-2 transition-transform", !label.includes("Tersalin") && "group-hover:rotate-12")} />
            )}
            {label}
        </Button>
    );

    const SocialButton = ({ icon: Icon, label, color, onClick }: any) => (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 group/social",
                "bg-card border border-border hover:border-transparent hover:shadow-lg"
            )}
        >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover/social:rotate-12", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground group-hover/social:text-foreground transition-colors">{label}</span>
        </button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-background border border-border p-0 overflow-hidden">
                <DialogTitle className="sr-only">Share Event</DialogTitle>
                <div className="relative p-6">
                    {/* Background */}
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-xl z-0"></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between mb-6 border-b border-border pb-4">
                        <div className="flex items-center gap-3 text-foreground">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Share2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold tracking-tight text-lg">Bagikan Event</h3>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Sebarkan informasi kegiatan ini</p>
                            </div>
                        </div>
                    </div>

                    {/* Preview Card */}
                    <div className="relative bg-card/50 border border-border rounded-xl overflow-hidden mb-6 shadow-sm group hover:shadow-md transition-all duration-300">
                        <div className="flex gap-4 p-3">
                            {/* Small Poster Thumbnail */}
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0 relative">
                                {event.poster ? (
                                    <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                                        <Calendar className="w-8 h-8 opacity-50" />
                                    </div>
                                )}
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-tight mb-1.5">{event.title}</h4>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                                        <Calendar className="w-3 h-3 text-primary" />
                                        <span>{formatDate(event.startDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        <span className="truncate">{event.venue || event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Share Grid */}
                    <div className="relative z-10 mb-6">
                        <label className="text-xs font-semibold text-muted-foreground mb-3 block">Bagikan ke Sosial Media</label>
                        <div className="grid grid-cols-4 gap-3">
                            <SocialButton
                                icon={MessageCircle} // WhatsApp
                                label="WhatsApp"
                                color="bg-[#25D366] hover:bg-[#20bd5a]"
                                onClick={() => {
                                    const text = `*${event.title}*\n\n📅 ${formatDate(event.startDate)}\n📍 ${event.venue || event.location}\n\nLihat detail: ${window.location.href}`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                }}
                            />
                            <SocialButton
                                icon={Facebook} // Facebook
                                label="Facebook"
                                color="bg-[#1877F2] hover:bg-[#166fe5]"
                                onClick={() => {
                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                                }}
                            />
                            <SocialButton
                                icon={Twitter} // Twitter
                                label="Twitter/X"
                                color="bg-[#000000] hover:bg-[#333333]"
                                onClick={() => {
                                    const text = `Cek event seru ini: ${event.title}`;
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                                }}
                            />
                            <SocialButton
                                icon={Mail} // Email
                                label="Email"
                                color="bg-[#EA4335] hover:bg-[#d62516]"
                                onClick={() => {
                                    const subject = `Undangan Event: ${event.title}`;
                                    const body = `Halo,\n\nSaya ingin membagikan informasi event menarik:\n\n${event.title}\nTanggal: ${formatDate(event.startDate)}\nLokasi: ${event.venue || event.location}\n\nSelengkapnya: ${window.location.href}`;
                                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                                }}
                            />
                        </div>
                    </div>

                    {/* Primary Actions */}
                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        <ActionButton
                            icon={Link2}
                            label={copied ? "Tersalin!" : "Salin Link"}
                            onClick={handleCopyLink}
                            variant="outline"
                            className={cn(
                                "border-primary/20 hover:bg-primary/5 hover:border-primary/50 text-foreground",
                                copied && "bg-green-500/10 border-green-500/50 text-green-500"
                            )}
                        />
                        <ActionButton
                            icon={Download}
                            label={isGenerating ? "Proses..." : "Unduh Brosur"}
                            onClick={handleDownload}
                            variant="default"
                            disabled={isGenerating}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
