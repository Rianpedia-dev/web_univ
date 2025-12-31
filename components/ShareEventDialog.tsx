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
    Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Event {
    id: string;
    title: string;
    description: string;
    content?: string;
    categoryName: string | null;
    startDate: Date | null;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    location: string;
    venue: string | null;
    poster: string | null;
    organizer: string;
    targetAudience: string | null;
    registrationFee: string | null;
}

interface ShareEventDialogProps {
    event: Event;
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

    // Helper function to load image with timeout and CORS handling
    const loadImage = (src: string): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
            if (!src) return resolve(null);

            const isExternal = src.startsWith('http') || src.startsWith('https');
            const isLocalhost = src.includes('localhost') || src.includes('127.0.0.1');

            // Gunakan proxy weserv.nl untuk bypass CORS pada URL eksternal
            const finalSrc = (isExternal && !isLocalhost)
                ? `https://wsrv.nl/?url=${encodeURIComponent(src)}&output=png`
                : src;

            const img = new Image();
            if (isExternal) {
                img.crossOrigin = 'anonymous';
            }

            img.onload = () => resolve(img);
            img.onerror = () => {
                console.warn("Failed to load image:", finalSrc);
                // Fallback: coba langsung jika proxy gagal
                if (finalSrc !== src) {
                    const fallbackImg = new Image();
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

    // Shared Drawing Function
    const generateCanvas = async (scale = 1): Promise<HTMLCanvasElement | null> => {
        // Pre-load images
        const [logoImg, posterImg] = await Promise.all([
            universityLogo ? loadImage(universityLogo) : Promise.resolve(null),
            event.poster ? loadImage(event.poster) : Promise.resolve(null),
        ]);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Dimensions from CSS
        const width = 896;
        const height = 1344;

        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);

        // --- 1. Background ---
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#0d1f3d');
        bgGrad.addColorStop(0.3, '#1a3a6b');
        bgGrad.addColorStop(0.7, '#15315a');
        bgGrad.addColorStop(1, '#0d2847');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Texture Overlay
        ctx.save();
        ctx.strokeStyle = 'rgba(0,0,0,0.03)';
        ctx.lineWidth = 2;
        for (let i = 0; i < width; i += 4) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
        }
        for (let i = 0; i < height; i += 4) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
        }
        ctx.restore();

        // --- 2. Wave Decoration ---
        const waveY = 148;
        const waveH = 3;
        const waveGrad = ctx.createLinearGradient(0, waveY, width, waveY);
        waveGrad.addColorStop(0, 'transparent');
        waveGrad.addColorStop(0.2, '#ea580c');
        waveGrad.addColorStop(0.5, '#f97316');
        waveGrad.addColorStop(0.8, '#ea580c');
        waveGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = waveGrad;
        ctx.fillRect(0, waveY, width, waveH);

        ctx.save();
        ctx.transform(1, -0.03, 0, 1, 0, 0);
        const waveBeforeGrad = ctx.createLinearGradient(0, 0, width, 0);
        waveBeforeGrad.addColorStop(0, 'transparent');
        waveBeforeGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.3)');
        waveBeforeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = waveBeforeGrad;
        ctx.fillRect(-50, waveY - 25, width + 100, 50);
        ctx.restore();

        ctx.save();
        ctx.transform(1, 0.03, 0, 1, 0, 0);
        const waveAfterGrad = ctx.createLinearGradient(0, 0, width, 0);
        waveAfterGrad.addColorStop(0, 'transparent');
        waveAfterGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
        waveAfterGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = waveAfterGrad;
        ctx.fillRect(-50, waveY - 25, width + 100, 50);
        ctx.restore();


        // --- 3. Header ---
        const headerPaddingX = 50;
        const headerY = 32;
        const logoSize = 95;

        const logoX = headerPaddingX;
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 5;
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, headerY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        ctx.lineWidth = 5;
        ctx.strokeStyle = '#fbbf24';
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, headerY + logoSize / 2, (logoSize - 10) / 2, 0, Math.PI * 2);
        ctx.clip();
        if (logoImg) {
            const scaleL = Math.max((logoSize - 10) / logoImg.width, (logoSize - 10) / logoImg.height);
            const lw = logoImg.width * scaleL;
            const lh = logoImg.height * scaleL;
            ctx.drawImage(logoImg, logoX + 5 + (logoSize - 10 - lw) / 2, headerY + 5 + (logoSize - 10 - lh) / 2, lw, lh);
        } else {
            ctx.fillStyle = '#1e3a8a';
            ctx.font = '900 38px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(universityName.substring(0, 2).toUpperCase(), logoX + logoSize / 2, headerY + logoSize / 2);
        }
        ctx.restore();

        const textX = logoX + logoSize + 20;
        const textY = headerY + logoSize / 2;

        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = 'white';
        ctx.font = '900 36px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        const uniName = universityName.toUpperCase();
        const maxUniWidth = width - textX - 50;
        const wrappedUni = wrapText(ctx, uniName, maxUniWidth, 36);
        let uniY = textY - ((wrappedUni.length - 1) * 20);
        wrappedUni.forEach(line => {
            ctx.fillText(line, textX, uniY);
            uniY += 40;
        });
        ctx.shadowColor = 'transparent';

        const headerBottomY = headerY + logoSize + 28;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(headerPaddingX, headerBottomY); ctx.lineTo(width - headerPaddingX, headerBottomY); ctx.stroke();


        // --- 4. Event Title Section ---
        let currentY = headerBottomY + 52;

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fbbf24';
        ctx.font = '900 24px Arial';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        const eventType = event.categoryName ? event.categoryName.toUpperCase() : "EVENT KAMPUS";
        ctx.fillText(eventType, width / 2, currentY);

        const typeWidth = ctx.measureText(eventType).width;
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#fbbf24';
        const lineW = 50;
        const lineH = 3;
        const lineGap = 15;
        ctx.fillRect((width / 2) - (typeWidth / 2) - lineGap - lineW, currentY - 8, lineW, lineH);
        ctx.fillRect((width / 2) + (typeWidth / 2) + lineGap, currentY - 8, lineW, lineH);

        currentY += 12 + 24;

        ctx.fillStyle = 'white';
        ctx.font = '900 36px Arial';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        const titleLines = wrapText(ctx, event.title.toUpperCase(), width - 100, 36);
        titleLines.forEach(line => {
            ctx.fillText(line, width / 2, currentY);
            currentY += 45;
        });
        currentY += 5;

        // --- 5. Event Image ---
        currentY += 20; // Reduced top margin
        const framePadding = 11;
        const imgH = 400; // Reduced height
        const imgW = width - 100;
        const imgX = 50;

        const frameGrad = ctx.createLinearGradient(imgX, currentY, imgX + imgW, currentY + imgH);
        frameGrad.addColorStop(0, '#4a3425');
        frameGrad.addColorStop(0.5, '#3d2b1f');
        frameGrad.addColorStop(1, '#2d1f15');
        ctx.fillStyle = frameGrad;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetY = 20;
        ctx.fillRect(imgX - framePadding, currentY - framePadding, imgW + (framePadding * 2), imgH + (framePadding * 2));
        ctx.restore();

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(imgX - framePadding, currentY - framePadding, imgW + (framePadding * 2), imgH + (framePadding * 2));

        if (posterImg) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(imgX, currentY, imgW, imgH);
            ctx.clip();
            const scaleI = Math.max(imgW / posterImg.width, imgH / posterImg.height);
            const iw = posterImg.width * scaleI;
            const ih = posterImg.height * scaleI;
            const ix = imgX + (imgW - iw) / 2;
            const iy = currentY + (imgH - ih) / 2;
            ctx.drawImage(posterImg, ix, iy, iw, ih);
            ctx.restore();
        } else {
            ctx.fillStyle = '#000';
            ctx.fillRect(imgX, currentY, imgW, imgH);
            ctx.fillStyle = '#666';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('NO IMAGE', imgX + imgW / 2, currentY + imgH / 2);
        }

        currentY += imgH + 15 + 20; // Reduced bottom margin

        // --- New Content Section Below Image ---
        ctx.save();
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = '#e0e7ff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';

        const contentText = event.content || event.description || "";
        const displayContent = contentText.length > 300 ? contentText.substring(0, 300) + "..." : contentText;

        const contentLines = wrapText(ctx, displayContent, width - 100, 20);
        contentLines.forEach(line => {
            ctx.fillText(line, width / 2, currentY);
            currentY += 28;
        });
        ctx.shadowColor = 'transparent';
        ctx.restore();

        currentY += 20; // Spacing after content


        // --- 6. Event Details ---
        const detailX = 50;
        const detailW = width - 100;

        const drawDetailItem = (icon: string, label: string, value: string, isLast: boolean = false) => {
            const itemH = 50;
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(icon, detailX + 24, currentY + itemH / 2);

            ctx.font = '700 22px Arial';
            ctx.textAlign = 'left';
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = 'white';

            if (label === "Status:") {
                const labelW = ctx.measureText(label).width;
                ctx.fillText(label, detailX + 60, currentY + itemH / 2);
                const badgeText = value;
                const badgeFont = '900 22px Arial';
                ctx.font = badgeFont;
                const badgeW = ctx.measureText(badgeText).width + 36;
                const badgeH = 40;
                const badgeX = detailX + 60 + labelW + 10;
                const badgeY = currentY + itemH / 2 - 20;

                ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
                ctx.shadowBlur = 12;
                ctx.shadowOffsetY = 4;
                ctx.fillStyle = '#10b981';
                ctx.fillRect(badgeX, badgeY, badgeW, badgeH);

                ctx.shadowColor = 'transparent';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 2);

            } else {
                ctx.fillText(`${label} ${value}`, detailX + 60, currentY + itemH / 2);
            }

            ctx.shadowColor = 'transparent';
            if (!isLast) {
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(detailX, currentY + itemH);
                ctx.lineTo(detailX + detailW, currentY + itemH);
                ctx.stroke();
            }

            currentY += itemH + 8; // Reduced item padding
        };

        drawDetailItem('📅', 'Tanggal:', formatDate(event.startDate));
        drawDetailItem('📍', 'Lokasi:', (event.venue || event.location));
        drawDetailItem('👥', 'Kuota Peserta:', event.targetAudience || 'Umum');
        drawDetailItem('💵', 'Biaya Registrasi:', (event.registrationFee && event.registrationFee !== '0') ? event.registrationFee : 'GRATIS');
        drawDetailItem('✅', 'Status:', 'TERBUKA UNTUK UMUM', true);

        currentY += 25; // Reduced margin

        // --- 7. Registration Section ---
        const regX = 42;
        const regW = width - 84;
        const regH = 70;

        const polyPoints = [
            { x: regX + (regW * 0.025), y: currentY },
            { x: regX + regW, y: currentY },
            { x: regX + (regW * 0.975), y: currentY + regH },
            { x: regX, y: currentY + regH }
        ];

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 8;

        ctx.beginPath();
        ctx.moveTo(polyPoints[0].x, polyPoints[0].y);
        ctx.lineTo(polyPoints[1].x, polyPoints[1].y);
        ctx.lineTo(polyPoints[2].x, polyPoints[2].y);
        ctx.lineTo(polyPoints[3].x, polyPoints[3].y);
        ctx.closePath();

        const regGrad = ctx.createLinearGradient(regX, currentY, regX + regW, currentY + regH);
        regGrad.addColorStop(0, '#1e40af');
        regGrad.addColorStop(1, '#2563eb');
        ctx.fillStyle = regGrad;
        ctx.fill();
        ctx.restore();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const regTitle = "DAFTAR SEKARANG: ";
        const regLink = window.location.host + window.location.pathname;

        ctx.font = 'italic 900 23px Arial';
        ctx.fillText(regTitle + regLink, width / 2, currentY + regH / 2);

        return canvas;
    };

    // Generate preview on mount
    useEffect(() => {
        let active = true;
        const generatePreview = async () => {
            if (isOpen) {
                const canvas = await generateCanvas(0.5); // Low res for preview
                if (active && canvas) {
                    setPreviewUrl(canvas.toDataURL('image/jpeg', 0.8));
                }
            }
        };
        generatePreview();
        return () => { active = false; };
    }, [event, isOpen, universityLogo]);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            // Generate High Res
            const canvas = await generateCanvas(2);
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

    function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
        if (!text) return [];
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const metrics = context.measureText(testLine);
            if (metrics.width > maxWidth) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    const formatDate = (date: Date | null) => {
        if (!date) return 'TBA';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (time: string | null) => {
        if (!time) return '';
        if (time.includes('T')) {
            const d = new Date(time);
            return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} WIB`;
        }
        return time;
    };

    const handleCopyLink = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const ShareButton = ({ icon: Icon, label, onClick, color, disabled, active }: any) => (
        <Button
            variant="outline"
            className={cn(
                "w-full justify-center gap-2 border-opacity-30 relative overflow-hidden group hover:bg-opacity-10 transition-all duration-300",
                color === 'cyan' ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400" :
                    "border-gray-500 text-gray-300 hover:bg-gray-500",
                active && "bg-opacity-10"
            )}
            onClick={onClick}
            disabled={disabled}
        >
            <Icon className="w-4 h-4" />
            <span className="font-bold tracking-wider">{label}</span>
        </Button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-background border border-cyan-500/30 p-0 overflow-hidden">
                <DialogTitle className="sr-only">Share Event</DialogTitle>
                <div className="relative p-6">
                    {/* Background */}
                    <div className="absolute inset-0 bg-[#09090b] z-0"></div>
                    <div className="absolute inset-0 z-0 pointer-events-none" style={{
                        backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between mb-6 border-b border-cyan-500/20 pb-4">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Share2 className="w-5 h-5" />
                            <span className="font-bold tracking-wider">SHARE EVENT</span>
                        </div>
                    </div>

                    {/* Preview Card */}
                    {/* Preview Card */}
                    <div className="relative bg-black border border-cyan-900 rounded-xl overflow-hidden mb-6 shadow-2xl">
                        {/* Poster */}
                        <div className="h-48 bg-gray-900 relative overflow-hidden">
                            {event.poster ? (
                                <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-700">No Image</div>
                            )}
                            {event.categoryName && (
                                <div className="absolute bottom-0 right-0 bg-cyan-400 text-black text-[10px] font-bold px-3 py-1">
                                    {event.categoryName}
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold mb-3 line-clamp-2">{event.title}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(event.startDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-purple-400 text-xs">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">{event.venue || event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        <ShareButton
                            icon={Link2}
                            label={copied ? "Copied" : "Copy Link"}
                            onClick={handleCopyLink}
                            color="gray"
                        />
                        <ShareButton
                            icon={Download}
                            label={isGenerating ? "Generating..." : "Save Image"}
                            onClick={handleDownload}
                            color="cyan"
                            disabled={isGenerating}
                            active
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
