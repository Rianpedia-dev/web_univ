
export interface EventData {
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

// Helper: Format Time (Takes "HH:mm" or ISO string and ensures "HH:mm")
const formatTime = (timeStr: string | null): string => {
    if (!timeStr) return '';
    // Check if it's a full Date string
    if (timeStr.includes('T') || timeStr.includes('-')) {
        try {
            const d = new Date(timeStr);
            if (!isNaN(d.getTime())) {
                return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':');
            }
        } catch (e) { /* ignore */ }
    }
    // If it's already HH:mm:ss, take HH:mm
    if (timeStr.match(/^\d{2}:\d{2}:\d{2}/)) {
        return timeStr.substring(0, 5);
    }
    return timeStr;
};

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

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
    if (!text) return [];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth) {
            if (lines.length >= maxLines - 1) {
                // Truncate safely
                lines.push(currentLine + '...');
                return lines;
            }
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    return lines;
}

export const formatDate = (date: Date | null) => {
    if (!date) return 'TBA';
    try {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

export const generateEventImage = async (
    event: EventData,
    universityLogo: string | null | undefined,
    universityName: string,
    currentHost: string,
    scale = 1
): Promise<HTMLCanvasElement | null> => {
    // Pre-load images
    const [logoImg, posterImg] = await Promise.all([
        universityLogo ? loadImage(universityLogo) : Promise.resolve(null),
        event.poster ? loadImage(event.poster) : Promise.resolve(null),
    ]);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Dimensions (Social Media Portrait)
    const width = 1080;
    const height = 1550; // Reduced from 1920

    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // --- 1. Background ---
    // Dark Graphite/Charcoal Gradient (Removing Blue tones)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#27272a'); // Zinc 800
    bgGrad.addColorStop(1, '#09090b'); // Zinc 950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // --- Background Motifs & Patterns ---
    ctx.save();

    // 1. Tech Hexagon/Mesh Pattern Overlay
    // We'll draw a subtle honeycomb-like pattern in the top-right and bottom-left
    const drawHexPattern = (startX: number, startY: number, size: number, count: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        const hexH = size * Math.sin(Math.PI / 3);
        const hexR = size;
        const hexW = size * 0.5; // horizontal distance components

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                // Offset every other row
                const xOff = j * (size * 1.5) + startX;
                const yOff = i * (hexH * 2) + (j % 2 === 0 ? 0 : hexH) + startY;

                // Draw partial hexes or dots
                ctx.beginPath();
                // Draw a simple hexagon path
                for (let k = 0; k < 6; k++) {
                    const angle = 2 * Math.PI / 6 * k;
                    const x_i = xOff + hexR * Math.cos(angle);
                    const y_i = yOff + hexR * Math.sin(angle);
                    if (k === 0) ctx.moveTo(x_i, y_i);
                    else ctx.lineTo(x_i, y_i);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
    };

    // Top Right Pattern (Gold/Amber)
    ctx.globalAlpha = 0.03;
    drawHexPattern(width - 500, -100, 40, 8, '#fbbf24'); // Amber

    // Bottom Left Pattern (White/Silver)
    ctx.globalAlpha = 0.02;
    drawHexPattern(-100, height - 500, 60, 6, '#ffffff');

    // 2. Dynamic Light Orbs (No Blue)
    ctx.globalAlpha = 1.0;

    // Smooth Gold Glow Top-Left (subtle)
    const orb1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 800);
    orb1.addColorStop(0, 'rgba(251, 191, 36, 0.05)');
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.beginPath(); ctx.arc(0, 0, 800, 0, Math.PI * 2); ctx.fill();

    // Deep Red/Warm Glow Bottom-Right for richness
    const orb2 = ctx.createRadialGradient(width, height, 0, width, height, 900);
    orb2.addColorStop(0, 'rgba(185, 28, 28, 0.08)'); // Red-700
    orb2.addColorStop(1, 'transparent');
    ctx.fillStyle = orb2;
    ctx.beginPath(); ctx.arc(width, height, 900, 0, Math.PI * 2); ctx.fill();

    // 3. Modern Accent Lines
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';

    // Abstract floating line 1
    const lineGrad = ctx.createLinearGradient(0, 0, width, height);
    lineGrad.addColorStop(0, 'rgba(251, 191, 36, 0.0)');
    lineGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.08)');
    lineGrad.addColorStop(1, 'rgba(251, 191, 36, 0.0)');
    ctx.strokeStyle = lineGrad;

    ctx.beginPath();
    ctx.moveTo(-100, height * 0.6);
    ctx.quadraticCurveTo(width * 0.2, height * 0.4, width + 100, height * 0.3);
    ctx.stroke();

    ctx.restore();

    // Tech Grid Overlay (Very subtle)
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    // Draw dots at intersections instead of full lines for cleaner look
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
        }
    }
    ctx.restore();

    // Top Header Gradient Overlay
    const headerGrad = ctx.createLinearGradient(0, 0, 0, 400);
    headerGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
    headerGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = headerGrad;
    ctx.fillRect(0, 0, width, 400);

    // --- 2. Header (University Branding) ---
    const padding = 80;
    const headerY = 70; // Reduced top margin (was 100)
    const logoSize = 90; // Slightly smaller logo (was 100)

    let contentStartY = headerY + logoSize + 50;

    // Draw Header
    if (logoImg) {
        const aspect = logoImg.width / logoImg.height;
        const lw = logoSize * aspect;
        const lh = logoSize;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 15;
        // Draw Logo Left Aligned
        ctx.drawImage(logoImg, padding, headerY, lw, lh);
        ctx.restore();

        // University Name
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 36px "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;

        const textX = padding + lw + 30;
        const uniName = universityName.toUpperCase();
        const wrappedName = wrapText(ctx, uniName, width - textX - padding, 2);

        let uniY = headerY + (lh / 2) - ((wrappedName.length - 1) * 22);
        wrappedName.forEach(line => {
            ctx.fillText(line, textX, uniY);
            uniY += 44;
        });
    }

    // "EVENT" Label (Top Right)
    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // Main "EVENT" text
    ctx.font = '900 32px "Segoe UI", Roboto, sans-serif'; // Ultra bold
    ctx.fillStyle = '#fbbf24'; // Amber-400 (Gold)
    ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
    ctx.shadowBlur = 10;

    const eventLabelX = width - padding;
    const eventLabelY = headerY + (logoSize / 2); // Center vertically with logo

    ctx.fillText('EVENT', eventLabelX, eventLabelY);

    // Tiny decorative line below or tracking
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '600 14px "Segoe UI"';
    ctx.letterSpacing = '4px'; // Doesn't work in standard canvas context broadly, but we can simulate or just use simpler text
    // Canvas doesn't support letterSpacing property directly in all envs without setting font string specifically.
    // Instead, let's just add a small sub-label or line

    ctx.fillRect(eventLabelX - 90, eventLabelY + 20, 90, 2);
    ctx.restore();

    // --- 3. Poster Image (Compact & Clean) ---
    const posterY = contentStartY;
    const posterContainerW = width - (padding * 2);
    // Reduced height significantly as requested (was 600)
    const posterContainerH = 450;

    // Draw Poster Container Shadow/Border
    const posterR = 24;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;

    // Fill background for poster area
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(padding, posterY, posterContainerW, posterContainerH, posterR);
    ctx.fill();
    ctx.restore();

    // Draw Image
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(padding, posterY, posterContainerW, posterContainerH, posterR);
    ctx.clip();

    if (posterImg) {
        // "Contain" mode logic to show full image if possible, or Cover slightly? 
        // User asked for "fixed border", usually implies "Cover" generally looks better but let's stick to Cover
        // taking care of aspect ratio.
        const imgAspect = posterImg.width / posterImg.height;
        const contAspect = posterContainerW / posterContainerH;

        // Calculate scaling for ObjectFit: Cover
        let drawW, drawH, drawX, drawY;

        if (imgAspect > contAspect) {
            // Image wider than container
            drawH = posterContainerH;
            drawW = posterContainerH * imgAspect;
            drawX = padding + (posterContainerW - drawW) / 2;
            drawY = posterY;
        } else {
            // Image taller than container
            drawW = posterContainerW;
            drawH = posterContainerW / imgAspect;
            drawX = padding;
            drawY = posterY + (posterContainerH - drawH) / 2;
        }

        ctx.drawImage(posterImg, drawX, drawY, drawW, drawH);
    } else {
        // Placeholder
        ctx.fillStyle = '#334155';
        ctx.fillRect(padding, posterY, posterContainerW, posterContainerH);
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'italic 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NO POSTER AVAILABLE', width / 2, posterY + posterContainerH / 2);
    }

    // Inner Glow/Border for finish
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Category Badge (Floating on Top Right of Poster)
    if (event.categoryName) {
        ctx.save();
        const badgeText = event.categoryName.toUpperCase();
        ctx.font = 'bold 20px "Segoe UI"';
        const badgeMetrics = ctx.measureText(badgeText);
        const badgePadH = 20; const badgePadV = 10;
        const badgeW = badgeMetrics.width + (badgePadH * 2);
        const badgeH = 44;

        const badgeX = padding + posterContainerW - badgeW - 20;
        const badgeY = posterY + 20;

        // Blue Gradient
        const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
        badgeGrad.addColorStop(0, '#3b82f6');
        badgeGrad.addColorStop(1, '#2563eb');
        ctx.fillStyle = badgeGrad;

        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 12);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, badgeX + (badgeW / 2), badgeY + (badgeH / 2) + 2);
        ctx.restore();
    }

    // --- 4. Main Text Content ---
    let textY = posterY + posterContainerH + 50;

    // Title
    ctx.save();
    ctx.fillStyle = '#fbbf24'; // Amber-400
    ctx.textAlign = 'left';
    ctx.font = 'bold 48px "Segoe UI", Roboto, sans-serif'; // Reduced from 56
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;

    // Wrap Title (Limit to 2 lines instead of 3 to save space)
    const titleLines = wrapText(ctx, event.title, width - (padding * 2), 2);
    titleLines.forEach(line => {
        ctx.fillText(line, padding, textY);
        textY += 60; // Reduced line height from 70
    });
    ctx.restore();

    // Description + Content
    textY += 15;

    // Helper to strip HTML tags (inline)
    const stripHtml = (html: string) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    };

    let fullText = "";
    if (event.content) {
        fullText = stripHtml(event.content);
    }
    if (!fullText) fullText = "Simak detail lengkap acara ini dan jangan lewatkan kesempatan berharga ini.";

    ctx.save();
    ctx.fillStyle = '#cbd5e1'; // Slate-300
    ctx.textAlign = 'left';
    ctx.font = 'normal 28px "Segoe UI", Roboto, sans-serif'; // Reduced from 30

    // Allow up to 4 lines (was 8) for mixed content to prevent overflow
    const descLines = wrapText(ctx, fullText, width - (padding * 2), 4);
    descLines.forEach(line => {
        ctx.fillText(line, padding, textY);
        textY += 38;
    });
    ctx.restore();


    // --- 5. Details Section (Fixed Border Box) ---
    // Ensure we have some spacing before the details box, but not too much if text is short
    textY = Math.max(textY + 30, posterY + posterContainerH + 220);

    const detailsBoxY = textY;

    // Footer Height
    const footerH = 120;

    // Details font sizes (Compact)
    const dLabelSize = 20; // Reduced from 22
    const dValueSize = 24; // Reduced from 28
    const dRowHeight = 65; // Reduced from 80 for tighter packing

    // Data to show
    const fStartDate = formatDate(event.startDate);
    const timeStart = formatTime(event.startTime);
    const timeEnd = formatTime(event.endTime);
    const timeDisplay = (timeStart && timeEnd) ? `${timeStart} - ${timeEnd}` : (timeStart || 'TBA');

    // Clean formatting for output
    const detailsData = [
        { icon: '📅', label: 'WAKTU', value: `${fStartDate} • ${timeDisplay}` },
        { icon: '📍', label: 'LOKASI', value: event.venue || event.location || 'Kampus Utama' },
        { icon: '🏢', label: 'PENYELENGGARA', value: event.organizer || 'Universitas' },
    ];

    // Optional fields
    if (event.registrationFee && event.registrationFee !== '0' && event.registrationFee !== '-') {
        detailsData.push({ icon: '💰', label: 'BIAYA', value: event.registrationFee });
    }
    if (event.targetAudience) {
        detailsData.push({ icon: '👥', label: 'PESERTA', value: event.targetAudience });
    }

    // Dynamic Box Height
    const detailsBoxH = (detailsData.length * dRowHeight) + 30; // Tighter padding
    const detailsBoxW = width - (padding * 2);

    // Draw Box Background
    ctx.save();
    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)'; // Transparent Slate
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.8)'; // Border
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(padding, detailsBoxY, detailsBoxW, detailsBoxH, 20);
    ctx.fill();
    ctx.stroke();

    // Draw Items
    let dItemY = detailsBoxY + 40; // Init offset
    const dTextX = padding + 70; // Adjusted icon spacing

    detailsData.forEach(item => {
        // Icon
        ctx.font = '32px sans-serif'; // Slightly smaller icon
        ctx.textAlign = 'center';
        ctx.fillText(item.icon, padding + 35, dItemY + 5);

        // Label
        ctx.textAlign = 'left';
        ctx.fillStyle = '#94a3b8'; // Label Color
        ctx.font = `bold ${dLabelSize}px "Segoe UI"`;
        ctx.fillText(item.label, dTextX, dItemY - 8);

        // Value
        ctx.fillStyle = '#ffffff'; // Value Color
        ctx.font = `bold ${dValueSize}px "Segoe UI"`;
        const valLines = wrapText(ctx, item.value, detailsBoxW - 90, 1);
        ctx.fillText(valLines[0], dTextX, dItemY + 20);

        dItemY += dRowHeight;
    });
    ctx.restore();


    // --- 6. Footer ---
    const footerY = height - footerH;

    // Dark Premium Background (Matching the main theme)
    const footerGrad = ctx.createLinearGradient(0, footerY, width, height);
    footerGrad.addColorStop(0, '#18181b'); // Zinc-900
    footerGrad.addColorStop(1, '#000000'); // Black
    ctx.fillStyle = footerGrad;
    ctx.fillRect(0, footerY, width, footerH);

    // Elegant Top Border Accent
    ctx.fillStyle = '#fbbf24'; // Amber-400 (Gold)
    ctx.fillRect(0, footerY, width, 4); // Slightly thinner for elegance

    // Footer Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Label "Info & Pendaftaran"
    ctx.fillStyle = '#94a3b8'; // Slate-400
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.fillText('INFO & PENDAFTARAN', width / 2, footerY + 36);

    // URL / Hostname
    ctx.fillStyle = '#ffffff'; // White
    ctx.font = 'bold 32px "Segoe UI", sans-serif';
    ctx.fillText(currentHost, width / 2, footerY + 76);

    return canvas;
};
