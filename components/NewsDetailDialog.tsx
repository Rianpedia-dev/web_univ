"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Calendar,
    User,
    Eye,
    Download,
    Share2,
    Clock,
    Tag,
    X,
    FileText,
    MessageCircle,
    Link2,
    Loader2,
    Check,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";



interface NewsDetailDialogProps {
    news: any;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    uniProfile?: any;
}

export function NewsDetailDialog({ news, isOpen, onOpenChange, uniProfile }: NewsDetailDialogProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);

    if (!news) return null;

    const publishedDate = news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : '-';

    const dateOnly = news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : '-';

    const timeOnly = news.publishedAt ? new Date(news.publishedAt).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    }) : '-';

    const handleCopyLink = () => {
        // Mendapatkan URL lengkap halaman saat ini dengan slug berita
        const url = `${window.location.origin}${window.location.pathname}?slug=${news.slug}`;

        navigator.clipboard.writeText(url).then(() => {
            setIsCopied(true);
            toast.success("Link berita berhasil disalin!");
            setTimeout(() => setIsCopied(false), 2000);
        }).catch((err) => {
            console.error("Gagal menyalin link:", err);
            toast.error("Gagal menyalin link.");
        });
    };

    const handleWhatsAppShare = () => {
        const text = `📢 *${news.title}*\n\n${news.excerpt || ""}\n\nBaca selengkapnya di: ${window.location.origin}/berita-media/berita?slug=${news.slug}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        toast.info("Sedang menyiapkan gaya koran...");

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // High resolution dimensions (2x for Retina-like quality)
            const scale = 2;
            const logicalWidth = 800;
            const logicalHeight = 1100;
            canvas.width = logicalWidth * scale;
            canvas.height = logicalHeight * scale;

            // Scale context for high DPI - all drawing uses logical dimensions
            ctx.scale(scale, scale);

            // Use logical dimensions for all drawing operations
            const width = logicalWidth;
            const height = logicalHeight;

            // --- 0. Load Images ---
            const loadImage = (src: string): Promise<HTMLImageElement | null> => {
                return new Promise((resolve) => {
                    if (!src) return resolve(null);

                    const isExternal = src.startsWith('http') || src.startsWith('https');
                    const isLocalhost = src.includes('localhost') || src.includes('127.0.0.1');

                    // Jika eksternal dan bukan localhost, gunakan proxy weserv.nl untuk bypass CORS
                    const finalSrc = (isExternal && !isLocalhost)
                        ? `https://wsrv.nl/?url=${encodeURIComponent(src)}&output=png`
                        : src;

                    const img = new window.Image();
                    if (isExternal) {
                        img.crossOrigin = 'anonymous';
                    }

                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.warn("Failed to load image:", finalSrc);
                        // Fallback: jika lewat proxy gagal, coba langsung (dengan resiko CORS)
                        if (finalSrc !== src) {
                            const fallbackImg = new window.Image();
                            fallbackImg.crossOrigin = 'anonymous';
                            fallbackImg.onload = () => resolve(fallbackImg);
                            fallbackImg.onerror = () => resolve(null);
                            fallbackImg.src = src;
                        } else {
                            resolve(null);
                        }
                    };

                    img.src = finalSrc;
                });
            };

            // Ambil logo langsung dari database
            const universityLogoUrl = uniProfile?.logo;

            const [mainImg, logoImg] = await Promise.all([
                loadImage(news.featuredImage || "/images/berita_placeholder.png"),
                loadImage(universityLogoUrl)
            ]);

            // --- 1. Background ---
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // Subtle paper texture (simulated)
            ctx.fillStyle = 'rgba(232, 232, 232, 0.2)';
            ctx.fillRect(0, 0, width, height);

            const padding = 50;
            let currentY = 50;

            // --- 2. Header ---
            // Logo
            if (logoImg) {
                // Draw centered with aspect ratio handling
                const aspect = logoImg.width / logoImg.height;
                let drawW, drawH, drawX, drawY;
                if (aspect > 1) { // Wide image
                    drawH = 70;
                    drawW = 70 * aspect;
                } else { // Tall or square image
                    drawW = 70;
                    drawH = 70 / aspect;
                }
                drawX = padding; // Start from padding
                drawY = currentY;

                ctx.drawImage(logoImg, drawX, drawY, drawW, drawH);
            } else {
                // Background circle for text fallback
                ctx.fillStyle = '#1e3a8a';
                ctx.beginPath();
                ctx.arc(padding + 35, currentY + 35, 35, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 36px Georgia, serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const initial = uniProfile?.name?.charAt(0).toUpperCase() || '🎓';
                ctx.fillText(initial, padding + 35, currentY + 38);
            }

            // University Info
            ctx.textAlign = 'left';
            ctx.fillStyle = '#1a1a1a';
            ctx.font = 'bold 28px Georgia, serif';
            ctx.fillText(uniProfile?.name || 'UNIVERSITY', padding + 90, currentY + 45);

            // News Label in Top Right
            ctx.textAlign = 'right';
            ctx.fillStyle = '#1a1a1a';
            ctx.font = 'bold 32px Georgia, serif';
            ctx.fillText('NEWS', width - padding, currentY + 45);

            currentY += 100;

            // Divider
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding, currentY);
            ctx.lineTo(width - padding, currentY);
            ctx.stroke();

            currentY += 40;

            // Date (di atas image sebelah kanan)
            ctx.font = '14px Georgia, serif';
            ctx.fillStyle = '#666';
            ctx.textAlign = 'right';
            ctx.fillText(`📅 ${dateOnly}`, width - padding, currentY - 15);

            // --- 3. Main Image ---
            if (mainImg) {
                const imgBoxH = 350;
                // Border/Frame
                ctx.fillStyle = '#f5f5f5';
                ctx.fillRect(padding - 8, currentY - 8, width - (padding * 2) + 16, imgBoxH + 16);

                ctx.drawImage(mainImg, padding, currentY, width - (padding * 2), imgBoxH);
                currentY += imgBoxH + 40;
            }

            // --- 4. Title ---
            ctx.textAlign = 'left';
            ctx.fillStyle = '#1a1a1a';
            ctx.font = 'bold 36px Georgia, serif';

            const titleWords = news.title.split(' ');
            let line = '';
            let titleLines = [];
            for (let n = 0; n < titleWords.length; n++) {
                let testLine = line + titleWords[n] + ' ';
                if (ctx.measureText(testLine).width > width - (padding * 2)) {
                    titleLines.push(line);
                    line = titleWords[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            titleLines.push(line);

            titleLines.forEach(l => {
                ctx.fillText(l.trim(), padding, currentY);
                currentY += 45;
            });

            currentY += 10;

            // --- 5. Content Columns ---
            ctx.font = '14px Georgia, serif';
            ctx.fillStyle = '#333';
            const plainContent = news.content?.replace(/<[^>]*>/g, '') || '';
            const words = plainContent.split(' ');

            const columnGap = 30;
            const columnWidth = (width - (padding * 2) - columnGap) / 2;

            let currentLine = '';
            let lines = [];
            for (let i = 0; i < words.length; i++) {
                let testLine = currentLine + words[i] + ' ';
                if (ctx.measureText(testLine).width > columnWidth) {
                    lines.push(currentLine);
                    currentLine = words[i] + ' ';
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);

            const midPoint = Math.ceil(lines.length / 2);
            let col1Y = currentY;

            // Col 1
            for (let i = 0; i < midPoint && i < 25; i++) {
                ctx.fillText(lines[i], padding, col1Y);
                col1Y += 24;
            }

            // Col 2
            let col2Y = currentY;
            for (let i = midPoint; i < lines.length && i < lines.length; i++) {
                ctx.fillText(lines[i], padding + columnWidth + columnGap, col2Y);
                col2Y += 24;
            }

            // --- 6. Footer ---
            const footerY = height - 70;
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding, footerY - 35);
            ctx.lineTo(width - padding, footerY - 35);
            ctx.stroke();

            // Row 1: Category (left) | Author (right)
            ctx.font = 'bold 10px Arial';

            // Category
            ctx.textAlign = 'left';
            ctx.fillStyle = '#888';
            ctx.fillText('KATEGORI', padding, footerY - 18);
            ctx.fillStyle = '#1a1a1a';
            ctx.font = 'bold 12px Arial';
            const categoryText = (news.categoryName || 'Berita').toUpperCase();
            ctx.fillText(categoryText, padding, footerY);

            // Author
            ctx.textAlign = 'right';
            ctx.fillStyle = '#888';
            ctx.font = 'bold 10px Arial';
            ctx.fillText('PENULIS', width - padding, footerY - 18);
            ctx.fillStyle = '#1a1a1a';
            ctx.font = 'bold 12px Arial';
            const authorText = news.authorName || 'Humas Universitas';
            ctx.fillText(authorText, width - padding, footerY);

            // Row 2: Website URL (centered)
            ctx.textAlign = 'center';
            ctx.fillStyle = '#888';
            ctx.font = 'italic 10px Arial';
            ctx.fillText('Kunjungi halaman web kami:', width / 2, footerY + 20);
            ctx.fillStyle = '#1e3a8a';
            ctx.font = 'bold 11px Arial';
            ctx.fillText(`${window.location.origin}/berita/${news.slug}`, width / 2, footerY + 35);

            // Export as PNG for maximum quality
            const link = document.createElement('a');
            link.download = `berita-koran-${news.slug}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            toast.success("Berita berhasil disimpan gaya koran!");
        } catch (error) {
            console.error(error);
            toast.error("Gagal membuat gambar berita.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="sm:max-w-[95vw] lg:max-w-5xl h-[90vh] p-0 flex flex-col gap-0 overflow-hidden rounded-2xl shadow-xl border-border">
                {/* Header Section (Image) */}
                <div className="flex-shrink-0 relative">
                    <div
                        className="h-64 md:h-96 w-full relative overflow-hidden cursor-zoom-in group/img"
                        onClick={() => setShowFullImage(true)}
                    >
                        <Image
                            src={news.featuredImage || "/images/berita_placeholder.png"}
                            alt={news.title}
                            fill
                            className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/20 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1">
                                Klik untuk perbesar
                            </Badge>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-20 rounded-full bg-background/20 backdrop-blur-md hover:bg-white hover:text-black transition-all border border-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenChange(false);
                            }}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <ScrollArea className="flex-1 min-h-0">
                    <div className="p-6 md:p-10">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight mb-6">
                            {news.title}
                        </DialogTitle>

                        <DialogDescription className="sr-only">Detail berita: {news.title}</DialogDescription>

                        {/* Compact Metadata for Mobile */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                            <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-bold px-2.5 py-1 gap-1.5">
                                <User className="w-3 h-3" />
                                {news.authorName || "Humas Universitas"}
                            </Badge>
                            <Badge variant="outline" className="border-muted-foreground/30 bg-muted/50 text-foreground text-[10px] md:text-xs font-bold px-2.5 py-1 gap-1.5">
                                <Tag className="w-3 h-3" />
                                {news.categoryName || "Umum"}
                            </Badge>
                            <Badge variant="outline" className="border-muted-foreground/30 bg-muted/50 text-foreground text-[10px] md:text-xs font-medium px-2.5 py-1 gap-1.5">
                                <Clock className="w-3 h-3" />
                                {dateOnly} <span className="text-primary">• {timeOnly}</span>
                            </Badge>
                        </div>

                        {/* Article Content */}
                        <div
                            className="prose prose-invert max-w-none prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-cyber-blue prose-img:rounded-2xl"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </div>
                </ScrollArea>

                {/* Action Footer */}
                <div className="flex-shrink-0 p-6 border-t border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-6 relative z-30">
                    <div className="text-center sm:text-left">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-50 mb-1">DIBAGIKAN MELALUI</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="rounded-full h-9 px-5 font-bold shadow-sm hover:scale-105 transition-all duration-300 gap-2 border-foreground/10 hover:border-foreground/30"
                                onClick={handleWhatsAppShare}
                            >
                                <MessageCircle className="w-4 h-4 text-green-500" />
                                <span className="text-xs">WhatsApp</span>
                            </Button>
                            <Button
                                variant="outline"
                                className={`rounded-full h-9 px-5 font-bold shadow-sm hover:scale-105 transition-all duration-300 gap-2 border-foreground/10 hover:border-foreground/30 ${isCopied ? "border-emerald-500/50 bg-emerald-500/10" : ""
                                    }`}
                                onClick={handleCopyLink}
                            >
                                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4 text-purple-500" />}
                                <span className="text-xs">{isCopied ? "Tersalin!" : "Salin Link"}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button
                            variant="default"
                            className="flex-1 sm:flex-none h-11 px-8 rounded-full font-black shadow-lg hover:scale-105 transition-all duration-300 gap-2 text-[11px] uppercase group"
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {isDownloading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            )}
                            {isDownloading ? "Menyiapkan..." : "Download Berita"}
                        </Button>
                        <DialogClose asChild>
                            <Button
                                variant="secondary"
                                className="flex-1 sm:flex-none h-11 px-8 rounded-full font-black tracking-[0.2em] text-[11px] uppercase transition-all shadow-md hover:shadow-lg hover:bg-foreground hover:text-background"
                            >
                                TUTUP
                            </Button>
                        </DialogClose>
                    </div>
                </div>

                {/* Full Image Dialog (Lightbox) */}
                <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
                    <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center">
                        <DialogTitle className="sr-only">Foto Berita Full</DialogTitle>
                        <div className="relative w-full h-full flex items-center justify-center group/full">
                            <img
                                src={news.featuredImage || "/images/berita_placeholder.png"}
                                alt={news.title}
                                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black"
                                onClick={() => setShowFullImage(false)}
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}
