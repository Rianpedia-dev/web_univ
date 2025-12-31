"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Download,
    Link2,
    Mail,
    MessageCircle,
    Send,
    Award,
    Globe,
    Calendar,
    Trophy,
    Zap,
    Star,
    Shield,
    Share2
} from "lucide-react";

interface Achievement {
    id: string;
    studentName: string;
    title: string;
    description: string | null;
    achievementType: string;
    achievementLevel: string;
    achievementCategory: string;
    eventDate: Date | null;
    image: string | null;
    organizer: string | null;
    studentId: string;
    eventName: string;
    studyProgramName?: string | null;
}

interface ShareAchievementDialogProps {
    achievement: Achievement;
    isOpen: boolean;
    onClose: () => void;
    universityName: string;
    universityLogo: string | null;
}

export function ShareAchievementDialog({
    achievement,
    isOpen,
    onClose,
    universityName,
    universityLogo,
}: ShareAchievementDialogProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

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

    const handleDownload = async () => {
        setIsGenerating(true);

        try {
            // Pre-load images
            const [logoImg, photoImg] = await Promise.all([
                universityLogo ? loadImage(universityLogo) : Promise.resolve(null),
                achievement.image ? loadImage(achievement.image) : Promise.resolve(null),
            ]);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Dimensions
            const width = 600;
            const height = 800; // Taller for the new layout
            const scale = 2; // High res

            canvas.width = width * scale;
            canvas.height = height * scale;
            ctx.scale(scale, scale);

            // --- 1. Background ---
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            // Grid Pattern
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'; // Cyan-ish
            const gridSize = 40;
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            // Glowing Orbs (Gradient Blobs)
            // Top Left - Cyan
            const grad1 = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
            grad1.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
            grad1.addColorStop(1, 'transparent');
            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, width, height);

            // Bottom Right - Purple
            const grad2 = ctx.createRadialGradient(width, height, 0, width - 100, height - 100, 300);
            grad2.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
            grad2.addColorStop(1, 'transparent');
            ctx.fillStyle = grad2;
            ctx.fillRect(0, 0, width, height);

            // --- 2. Main Card Frame ---
            const m = 30; // margin
            const cardW = width - (m * 2);
            const cardH = height - (m * 2);
            const cardX = m;
            const cardY = m;

            // Card Background
            ctx.fillStyle = '#000000';
            ctx.fillRect(cardX, cardY, cardW, cardH);

            // Card Border (Cyan)
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#22d3ee'; // Cyan-400
            ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
            ctx.shadowBlur = 20;
            ctx.strokeRect(cardX, cardY, cardW, cardH);
            ctx.shadowBlur = 0; // Reset shadow

            // Corner Accents
            const cornerSize = 20;
            ctx.lineWidth = 4;

            // TL
            ctx.strokeStyle = '#22d3ee';
            ctx.beginPath();
            ctx.moveTo(cardX, cardY + cornerSize);
            ctx.lineTo(cardX, cardY);
            ctx.lineTo(cardX + cornerSize, cardY);
            ctx.stroke();

            // TR
            ctx.beginPath();
            ctx.moveTo(cardX + cardW - cornerSize, cardY);
            ctx.lineTo(cardX + cardW, cardY);
            ctx.lineTo(cardX + cardW, cardY + cornerSize);
            ctx.stroke();

            // BL (Purple)
            ctx.strokeStyle = '#c084fc';
            ctx.beginPath();
            ctx.moveTo(cardX, cardY + cardH - cornerSize);
            ctx.lineTo(cardX, cardY + cardH);
            ctx.lineTo(cardX + cornerSize, cardY + cardH);
            ctx.stroke();

            // BR (Purple)
            ctx.beginPath();
            ctx.moveTo(cardX + cardW - cornerSize, cardY + cardH);
            ctx.lineTo(cardX + cardW, cardY + cardH);
            ctx.lineTo(cardX + cardW, cardY + cardH - cornerSize);
            ctx.stroke();

            // --- 3. Header ---
            const headerY = cardY + 40;
            const headerContentX = cardX + 30;

            // Draw Diamond Container
            ctx.save();
            ctx.translate(headerContentX + 30, headerY + 15); // Adjusted center for larger logo
            ctx.rotate(45 * Math.PI / 180);

            // Border & Glow
            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 3; // Thicker border
            ctx.strokeRect(-30, -30, 60, 60); // Larger rect (60x60)

            // Image Clip
            ctx.beginPath();
            ctx.rect(-26, -26, 52, 52); // Clip slightly inside
            ctx.clip();

            // Restore rotation for image drawing (so image is upright)
            ctx.rotate(-45 * Math.PI / 180);

            if (logoImg) {
                // Draw image centered in the diamond
                // Since we are at center (0,0) of diamond, and diamond is 60x60 (approx 85px diagonal)
                // We draw image 56x56 centered
                ctx.drawImage(logoImg, -28, -28, 56, 56);
            } else {
                ctx.fillStyle = '#000';
                ctx.fillRect(-30, -30, 60, 60);
                ctx.fillStyle = '#22d3ee';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(universityName.substring(0, 2).toUpperCase(), 0, 0);
            }
            ctx.restore();

            // Text Header
            ctx.fillStyle = '#22d3ee'; // Cyan
            ctx.font = 'bold 18px Arial'; // Slightly larger font
            ctx.shadowColor = 'rgba(6,182,212,0.5)';
            ctx.shadowBlur = 10;
            // Draw University Name
            ctx.fillText(universityName.toUpperCase(), headerContentX + 85, headerY + 25); // Shifted X due to larger logo
            ctx.shadowBlur = 0;

            // Divider Line
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cardX + 30, headerY + 60);
            ctx.lineTo(cardX + cardW - 30, headerY + 60);
            ctx.stroke();

            // --- 4. Content ---
            const contentY = headerY + 90;

            // -- Profile Image (Clipped) --
            const imgSize = 120;
            const imgX = cardX + 30;
            const imgY = contentY;

            // Define Clip Path (Polygon)
            const drawPoly = (x: number, y: number, s: number) => {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + s, y);
                ctx.lineTo(x + s, y + s * 0.85);
                ctx.lineTo(x + s * 0.85, y + s);
                ctx.lineTo(x, y + s);
                ctx.closePath();
            };

            // Outer Glow
            ctx.save();
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur = 15;
            drawPoly(imgX - 4, imgY - 4, imgSize + 8);
            ctx.stroke();
            ctx.restore();

            // Image
            ctx.save();
            // Simplified clipping region (Rectangle) to ensure compatibility
            ctx.beginPath();
            ctx.moveTo(imgX, imgY);
            ctx.lineTo(imgX + imgSize, imgY);
            ctx.lineTo(imgX + imgSize, imgY + imgSize * 0.85);
            ctx.lineTo(imgX + imgSize * 0.85, imgY + imgSize);
            ctx.lineTo(imgX, imgY + imgSize);
            ctx.closePath();
            ctx.clip(); // Apply Clip

            if (photoImg) {
                // Draw image slightly larger to cover edges
                ctx.drawImage(photoImg, imgX - 1, imgY - 1, imgSize + 2, imgSize + 2);
            } else {
                ctx.fillStyle = '#111';
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                // Adjust text position for better alignment
                ctx.fillText('🏆', imgX + imgSize / 2, imgY + imgSize / 2 + 15);
            }
            // Gradient Overlay
            const overlayGrad = ctx.createLinearGradient(imgX, imgY + imgSize / 2, imgX, imgY + imgSize);
            overlayGrad.addColorStop(0, 'transparent');
            overlayGrad.addColorStop(1, '#000000');
            ctx.fillStyle = overlayGrad;
            ctx.fill();
            ctx.restore();

            // Star Badge (Yellow diamond)
            ctx.save();
            ctx.translate(imgX + imgSize, imgY);
            ctx.rotate(45 * Math.PI / 180);
            ctx.fillStyle = '#facc15'; // Yellow
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.fillRect(-12, -12, 24, 24);
            ctx.strokeRect(-12, -12, 24, 24);
            // Star icon (simplified as text)
            ctx.rotate(-45 * Math.PI / 180);
            ctx.fillStyle = '#000000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('★', 0, 2);
            ctx.restore();

            // -- Profile Info --
            const infoX = imgX + imgSize + 30;
            const infoY = contentY + 10;
            const infoW = width - infoX - 60; // Max width for text

            // Decoration line + zap
            ctx.fillStyle = '#facc15';
            ctx.font = '12px Arial';
            ctx.fillText('⚡', infoX, infoY);

            const gradLine = ctx.createLinearGradient(infoX + 20, infoY, infoX + 150, infoY);
            gradLine.addColorStop(0, '#22d3ee');
            gradLine.addColorStop(1, 'transparent');
            ctx.fillStyle = gradLine;
            ctx.fillRect(infoX + 20, infoY - 4, 130, 1);

            // Name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'left';
            ctx.shadowColor = 'rgba(6,182,212,0.3)';
            ctx.shadowBlur = 10;

            // Name wrapping
            const words = achievement.studentName.split(' ');
            let line = '';
            let lineY = infoY + 40;
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > infoW && n > 0) {
                    ctx.fillText(line, infoX, lineY);
                    line = words[n] + ' ';
                    lineY += 35;
                }
                else {
                    line = testLine;
                }
            }
            ctx.fillText(line, infoX, lineY);
            ctx.shadowBlur = 0;

            // NIM
            lineY += 25;
            ctx.fillStyle = '#cbd5e1'; // slate-300
            ctx.font = 'bold 16px Arial';
            ctx.fillText(`NIM: ${achievement.studentId}`, infoX, lineY);

            // Study Program (NEW)
            if (achievement.studyProgramName) {
                lineY += 25;
                ctx.fillStyle = '#94a3b8'; // slate-400
                ctx.font = 'bold 14px Arial';
                ctx.fillText(achievement.studyProgramName.toUpperCase(), infoX, lineY);
            }

            // Type Badge
            const typeY = lineY + 20;
            ctx.fillStyle = 'rgba(52, 211, 153, 0.1)'; // Emerald low opacity
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 1;
            ctx.fillRect(infoX, typeY, 150, 25);
            ctx.strokeRect(infoX, typeY, 150, 25);

            // Glowing dot
            ctx.fillStyle = '#34d399';
            ctx.shadowColor = '#34d399';
            ctx.shadowBlur = 5;
            ctx.beginPath(); ctx.arc(infoX + 15, typeY + 12.5, 3, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#34d399';
            ctx.font = '10px Consolas, monospace';
            ctx.fillText(achievement.achievementType.replace('_', ' ').toUpperCase(), infoX + 30, typeY + 16);


            // --- 5. Title Box ---
            const titleBoxY = imgY + imgSize + 40;
            const titleBoxW = cardW - 60;
            const titleBoxX = cardX + 30;

            // Description - Dynamic Height Calculation
            const descFontSize = 12;
            ctx.font = 'italic 12px Arial';
            let descLines: string[] = [];
            if (achievement.description) {
                // Use full description without truncation
                descLines = wrapText(ctx, `"${achievement.description}"`, titleBoxW - 60, descFontSize);
            }

            // Calculate Box Height based on lines
            const lineSpacing = 16;
            const minTitleBoxH = 100;
            // 60px for icon/title header + lines * spacing + 20px padding
            const dynamicTitleBoxH = Math.max(minTitleBoxH, 60 + (descLines.length * lineSpacing) + 20);

            // Re-draw Box Background with dynamic height
            // Clear previous if any (not needed as we draw over)
            const titleGrad = ctx.createLinearGradient(titleBoxX, titleBoxY, titleBoxX + titleBoxW, titleBoxY);
            titleGrad.addColorStop(0, 'rgba(250, 204, 21, 0.05)');
            titleGrad.addColorStop(1, 'rgba(251, 146, 60, 0.05)');
            ctx.fillStyle = titleGrad;
            ctx.fillRect(titleBoxX, titleBoxY, titleBoxW, dynamicTitleBoxH);
            ctx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(titleBoxX, titleBoxY, titleBoxW, dynamicTitleBoxH);

            // Re-draw corners with dynamic height
            const cs = 10;
            ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2;
            // TL
            ctx.beginPath(); ctx.moveTo(titleBoxX, titleBoxY + cs); ctx.lineTo(titleBoxX, titleBoxY); ctx.lineTo(titleBoxX + cs, titleBoxY); ctx.stroke();
            // TR
            ctx.beginPath(); ctx.moveTo(titleBoxX + titleBoxW - cs, titleBoxY); ctx.lineTo(titleBoxX + titleBoxW, titleBoxY); ctx.lineTo(titleBoxX + titleBoxW, titleBoxY + cs); ctx.stroke();
            // BL
            ctx.beginPath(); ctx.moveTo(titleBoxX, titleBoxY + dynamicTitleBoxH - cs); ctx.lineTo(titleBoxX, titleBoxY + dynamicTitleBoxH); ctx.lineTo(titleBoxX + cs, titleBoxY + dynamicTitleBoxH); ctx.stroke();
            // BR
            ctx.beginPath(); ctx.moveTo(titleBoxX + titleBoxW - cs, titleBoxY + dynamicTitleBoxH); ctx.lineTo(titleBoxX + titleBoxW, titleBoxY + dynamicTitleBoxH); ctx.lineTo(titleBoxX + titleBoxW, titleBoxY + dynamicTitleBoxH - cs); ctx.stroke();

            // Content
            ctx.shadowColor = '#facc15'; ctx.shadowBlur = 20; ctx.fillStyle = '#facc15'; ctx.font = '30px Arial';
            ctx.fillText('🏆', titleBoxX + 20, titleBoxY + 50); ctx.shadowBlur = 0;

            ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px Arial';
            const titleMaxWidth = titleBoxW - 60;
            const titleLines = wrapText(ctx, achievement.title, titleMaxWidth, 18);
            let tY = titleBoxY + 35;
            titleLines.slice(0, 2).forEach(l => { ctx.fillText(l, titleBoxX + 60, tY); tY += 22; });

            // Event Name
            tY += 5;
            ctx.fillStyle = '#22d3ee';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(`Nama Kegiatan: ${achievement.eventName}`, titleBoxX + 60, tY);
            tY += 20;

            if (descLines.length > 0) {
                ctx.fillStyle = '#9ca3af';
                ctx.font = 'italic 12px Arial';
                let dY = tY + 5;
                descLines.forEach(l => {
                    ctx.fillText(l, titleBoxX + 60, dY);
                    dY += lineSpacing;
                });
            }

            // --- 6. Stats Grid (Shifted down) ---
            const statsY = titleBoxY + dynamicTitleBoxH + 20;
            const boxW = (cardW - 60 - 20) / 2;
            const boxH = 80;

            // Box 1 - Level (Cyan)
            drawStatBox(ctx, cardX + 30, statsY, boxW, boxH, '#22d3ee', '🌐', 'TINGKAT', achievement.achievementLevel);

            // Box 2 - Year (Purple)
            drawStatBox(ctx, cardX + 30 + boxW + 20, statsY, boxW, boxH, '#c084fc', '📅', 'TAHUN', achievement.eventDate ? new Date(achievement.eventDate).getFullYear().toString() : '2025');

            // --- 6b. Organizer Box (Full Width) ---
            if (achievement.organizer) {
                const orgY = statsY + boxH + 15;
                const orgW = cardW - 60;
                const orgH = boxH; // Match other boxes height (80)
                drawStatBox(ctx, cardX + 30, orgY, orgW, orgH, '#f97316', '🏢', 'PENYELENGGARA', achievement.organizer);
            }

            // --- 7. Category Button (Removed) ---


            // --- 8. Footer (Removed) ---
            // const footerY = cardY + cardH - 50;
            // ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
            // ctx.beginPath(); ctx.moveTo(cardX+30, footerY); ctx.lineTo(cardX+cardW-30, footerY); ctx.stroke();



            // Download
            const link = document.createElement('a');
            link.download = `prestasi-${achievement.studentName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.click();

        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper to draw stat boxes
    function drawStatBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, icon: string, label: string, value: string) {
        // BG tint
        ctx.fillStyle = color + '10'; // Low opacity hex
        ctx.fillRect(x, y, w, h);

        // Border
        ctx.strokeStyle = color + '80'; // Med opacity
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);

        // Corner accent TR
        ctx.fillStyle = color;
        ctx.fillRect(x + w - 15, y, 15, 15);

        // Content
        ctx.fillStyle = color;
        ctx.font = '20px Arial';
        ctx.fillText(icon, x + 15, y + 35);

        ctx.fillStyle = color;
        ctx.font = '10px Consolas, monospace';
        ctx.fillText(label, x + 45, y + 25);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(value.charAt(0).toUpperCase() + value.slice(1), x + 15, y + 60);
    }

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

    const handleCopyLink = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsAppShare = () => {
        const text = `🏆 *${achievement.title}*\n\n👤 ${achievement.studentName}\n📊 Tingkat: ${achievement.achievementLevel}\n🏅 Kategori: ${achievement.achievementCategory}\n\n🎓 ${universityName}\n\nLihat selengkapnya: ${window.location.href}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const handleEmailShare = () => {
        const subject = `Prestasi Mahasiswa: ${achievement.title} - ${universityName}`;
        const body = `${achievement.studentName} telah meraih prestasi "${achievement.title}" pada tingkat ${achievement.achievementLevel}.\n\n${achievement.description || ""}\n\n🎓 ${universityName}\n\nLihat selengkapnya: ${window.location.href}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    const handleTelegramShare = () => {
        const text = `🏆 ${achievement.title} - ${achievement.studentName} | ${universityName}`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-background border border-cyan-500/30 p-0 overflow-hidden">
                <DialogTitle className="sr-only">Share Achievement</DialogTitle>
                <div className="relative p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Background Effects */}
                    <div className="absolute inset-0 z-0 pointer-events-none" style={{
                        backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>

                    {/* Orbs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Dialog Header */}
                    <div className="relative z-10 flex items-center justify-between mb-6 border-b border-cyan-500/20 pb-4">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Award className="w-5 h-5" />
                            <span className="font-bold tracking-wider">SHARE ACHIEVEMENT</span>
                        </div>
                    </div>

                    {/* --- PREVIEW CARD --- */}
                    <div className="relative bg-card border border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-6 overflow-hidden max-w-md mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                        {/* Top/Bottom Gradient Borders */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

                        {/* Corner Decors */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400"></div>

                        <div className="p-6 relative z-10">
                            {/* Card Header */}
                            {/* Header */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-cyan-400 rotate-45 shadow-[0_0_15px_rgba(34,211,238,0.5)] bg-card"></div>
                                    <div className="absolute inset-1 overflow-hidden rotate-45 flex items-center justify-center">
                                        <div className="-rotate-45 w-full h-full flex items-center justify-center bg-card">
                                            {/* Image inside diamond */}
                                            {universityLogo ? (
                                                <img
                                                    src={universityLogo}
                                                    alt="Logo"
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            ) : (
                                                <span className="text-cyan-400 font-bold text-xs">{universityName.substring(0, 2)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">{universityName}</h1>
                                    {/* Subtitle Removed */}
                                </div>
                            </div>
                            {/* Level Badge Removed */}

                            {/* Profile */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="relative shrink-0">
                                    <div className="absolute -inset-1 border border-cyan-400 rounded-br-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}></div>
                                    <div className="relative w-24 h-24 overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
                                        {achievement.image ? (
                                            <img src={achievement.image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                <Trophy className="text-gray-700 w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    {/* Star Badge */}
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 border border-black transform rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                                        <Star className="w-3 h-3 text-black transform -rotate-45" fill="currentColor" />
                                    </div>
                                </div>

                                <div className="flex-1 pt-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-0.5 bg-cyan-400"></div>
                                        <Zap className="w-3 h-3 text-yellow-400" fill="currentColor" />
                                        <div className="h-px bg-gradient-to-r from-cyan-400/50 to-transparent flex-1"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-1 tracking-wide leading-tight truncate">
                                        {achievement.studentName}
                                    </h2>
                                    <p className="text-sm font-bold text-muted-foreground mb-1 font-mono">
                                        NIM: {achievement.studentId}
                                    </p>
                                    {achievement.studyProgramName && (
                                        <p className="text-xs font-bold text-cyan-600/80 dark:text-cyan-400/80 mb-3 font-mono uppercase tracking-widest">
                                            {achievement.studyProgramName}
                                        </p>
                                    )}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-400/50 bg-emerald-400/5 rounded-sm">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase">
                                            {achievement.achievementType.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Title Section */}
                            <div className="relative mb-6 border border-yellow-400/30 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 p-4">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-400"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-400"></div>

                                <div className="flex gap-3">
                                    <Trophy className="w-6 h-6 text-yellow-400 shrink-0" />
                                    <div>
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground mb-1 leading-snug">{achievement.title}</h3>
                                            <p className="text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-1 uppercase tracking-wide">
                                                Nama Kegiatan: {achievement.eventName}
                                            </p>
                                            <p className="text-muted-foreground text-xs italic">
                                                "{achievement.description || 'Prestasi gemilang mahasiswa.'}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="border border-cyan-400/30 bg-cyan-400/5 p-3 relative group">
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/30 group-hover:border-cyan-400 transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Globe className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                                        <span className="text-cyan-600/70 dark:text-cyan-400/70 text-[10px] font-mono tracking-widest uppercase">TINGKAT</span>
                                    </div>
                                    <p className="text-foreground font-bold capitalize">{achievement.achievementLevel}</p>
                                </div>
                                <div className="border border-purple-400/30 bg-purple-400/5 p-3 relative group">
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-400/30 group-hover:border-purple-400 transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                        <span className="text-purple-600/70 dark:text-purple-400/70 text-[10px] font-mono tracking-widest uppercase">TAHUN</span>
                                    </div>
                                    <p className="text-foreground font-bold">{achievement.eventDate ? new Date(achievement.eventDate).getFullYear() : '-'}</p>
                                </div>
                                {achievement.organizer && (
                                    <div className="col-span-2 border border-orange-400/30 bg-orange-400/5 p-3 relative group">
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-400/30 group-hover:border-orange-400 transition-colors"></div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl">🏢</span>
                                            <span className="text-orange-600/70 dark:text-orange-400/70 text-[10px] font-mono tracking-widest uppercase">PENYELENGGARA</span>
                                        </div>
                                        <p className="text-foreground font-bold truncate">{achievement.organizer}</p>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Button Banner (Removed) */}


                        {/* Footer (Removed) */}


                    </div>

                    {/* --- ACTIONS --- */}
                    <div className="grid grid-cols-2 gap-3 relative z-10 pt-4">
                        <ShareButton
                            icon={Link2}
                            label={copied ? "Copied" : "Copy"}
                            onClick={handleCopyLink}
                            color="gray"
                        />
                        <ShareButton
                            icon={Download}
                            label={isGenerating ? "..." : "Save"}
                            onClick={handleDownload}
                            color="cyan"
                            disabled={isGenerating}
                            active
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}

function ShareButton({ icon: Icon, label, onClick, color, disabled, active }: any) {
    const colors: any = {
        gray: "hover:border-gray-400 hover:text-gray-400",
        cyan: "border-cyan-500/50 text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/50 hover:border-cyan-400 box-shadow-cyan",
        green: "hover:border-green-400 hover:text-green-400",
        sky: "hover:border-sky-400 hover:text-sky-400",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex flex-col items-center justify-center gap-2 p-3 rounded-none border transition-all duration-300 group
                border-white/10 bg-black/50 backdrop-blur-sm
                ${colors[color]}
                ${active ? 'ring-1 ring-cyan-500' : ''}
            `}
        >
            <Icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
            <span className="text-[10px] tracking-wider uppercase font-mono">{label}</span>
        </button>
    );
}
