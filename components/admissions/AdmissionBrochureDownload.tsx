"use client";

import React, { useRef, useState } from "react";
import { Download, Loader2, Layers, GraduationCap, Clock, FileText, Zap, Phone, Mail, MapPin, CheckCircle2, Globe, Sparkles, CreditCard, BookOpen, Target, Users, Award, ChevronRight, Library, Laptop, Dumbbell, Home, Heart, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toJpeg } from 'html-to-image';
import { jsPDF } from "jspdf";

interface AdmissionBrochureDownloadProps {
    universityProfile: any;
    pathways: any[];
    classes: any[];
    waves: any[];
    programs: any[];
    requirements: any[];
    timelines: any[];
    costs: any[];
    faculties: any[];
    accreditation?: any;
    facilities?: any[];
}

export default function AdmissionBrochureDownload({
    universityProfile,
    pathways,
    classes,
    waves,
    programs,
    requirements,
    timelines,
    costs,
    faculties,
    accreditation,
    facilities
}: AdmissionBrochureDownloadProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const page1Ref = useRef<HTMLDivElement>(null);
    const educationPagesRef = useRef<HTMLDivElement[]>([]);

    // Image paths
    const studentsImg = "/images/students_brochure.png";
    const campusImg = "/images/campus_brochure.png";

    const handleDownload = async () => {
        if (!page1Ref.current) return;

        setIsDownloading(true);
        const toastId = toast.loading("Sedang merancang brosur Landscape eksklusif...");

        try {
            // Updated to Landscape ('l')
            const pdf = new jsPDF('l', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const capturePage = async (el: HTMLElement) => {
                // Wait for all images to potentially load
                await new Promise(resolve => setTimeout(resolve, 2000));

                return await toJpeg(el, {
                    quality: 0.9,
                    pixelRatio: 1.5,
                    backgroundColor: '#ffffff',
                    cacheBust: true,
                    skipAutoScale: true,
                });
            };

            // Page 1
            const imgData1 = await capturePage(page1Ref.current);
            pdf.addImage(imgData1, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');

            // Education Pages (Dynamic)
            for (const pageEl of educationPagesRef.current) {
                if (pageEl) {
                    const hasContent = pageEl.querySelector('.cost-card');
                    if (hasContent) {
                        pdf.addPage();
                        const imgData = await capturePage(pageEl);
                        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
                    }
                }
            }

            pdf.save(`Brosur_Landscape_${universityProfile?.shortName || 'PMB'}.pdf`);
            toast.success("Brosur Landscape berhasil diunduh!", { id: toastId });
        } catch (error: any) {
            console.error("PDF generation failed detail:", {
                message: error?.message,
                name: error?.name,
                error: error
            });
            toast.error(`Gagal mengunduh brosur: ${error?.message || 'Terjadi kesalahan teknis'}`, { id: toastId });
        } finally {
            setIsDownloading(false);
        }
    };

    const getFacilityIcon = (type: string | null) => {
        switch (type?.toLowerCase()) {
            case 'library':
            case 'perpustakaan':
                return { icon: Library, color: '#4a90e2' };
            case 'laboratory':
            case 'laboratorium':
            case 'lab':
                return { icon: Laptop, color: '#50e3c2' };
            case 'sports':
            case 'olahraga':
            case 'sport':
                return { icon: Dumbbell, color: '#f5a623' };
            case 'dormitory':
            case 'asrama':
                return { icon: Home, color: '#bd10e0' };
            case 'health':
            case 'kesehatan':
            case 'poliklinik':
                return { icon: Heart, color: '#d0021b' };
            case 'classroom':
            case 'ruang kelas':
                return { icon: BookOpen, color: '#7ed321' };
            default:
                return { icon: Building2, color: '#9b9b9b' };
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group relative overflow-hidden bg-[#ffcc00] hover:bg-[#e6b800] text-[#004080] font-black px-12 py-10 rounded-2xl flex items-center gap-5 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(255,204,0,0.3)] border-b-4 border-[#cca300]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isDownloading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                    <Download className="w-8 h-8" />
                )}
                <div className="flex flex-col items-start">
                    <span className="text-xl tracking-tighter uppercase leading-none">UNDUH BROSUR LANDSCAPE</span>
                    <span className="text-[10px] opacity-70 tracking-widest uppercase">Premium Edition • A4 Landscape</span>
                </div>
            </Button>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3 text-[#ffcc00]" />
                Format Miring (Landscape) untuk Tampilan Luas
            </div>

            {/* RENDER ENGINE (HIDDEN) */}
            <div style={{ position: 'fixed', left: '-5000px', top: 0, pointerEvents: 'none' }}>

                {/* PAGE 1: LANDSCAPE (3 PANELS STYLE) */}
                <div
                    ref={page1Ref}
                    style={{
                        width: '1754px', // Standard A4 Landscape at high res
                        height: '1240px',
                        backgroundColor: '#ffffff',
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr', // 3 Panels
                        padding: '0',
                        fontFamily: "'Inter', sans-serif",
                        overflow: 'hidden'
                    }}
                >
                    {/* PANEL 1: COVER (Right side usually in trifold, but here we do flat layout) */}
                    <div style={{ backgroundColor: '#004080', color: '#fff', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <div style={{ marginBottom: '20px', position: 'relative', zIndex: 10 }}>
                            {universityProfile?.logo && <img src={universityProfile.logo} style={{ height: '120px', objectFit: 'contain' }} />}
                        </div>
                        <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 10px 0', color: '#fff', textAlign: 'center', zIndex: 10, letterSpacing: '-0.5px' }}>{universityProfile?.name}</h1>

                        {accreditation && (
                            <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '30px' }}>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Terakreditasi {accreditation.accreditationLevel}
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                                    No: {accreditation.accreditationNumber}
                                </div>
                            </div>
                        )}
                        {!accreditation && <div style={{ marginBottom: '40px' }} />}

                        <div style={{ textAlign: 'center', zIndex: 10 }}>
                            <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: '1.1', color: '#fff', marginBottom: '20px' }}>
                                <span style={{ color: '#ffcc00' }}>PENERIMAAN</span><br />
                                MAHASISWA BARU<br />
                                <span style={{ color: '#ffcc00' }}>(PMB)</span>
                            </div>
                        </div>


                        <div style={{ backgroundColor: '#ffcc00', width: '100%', padding: '20px', borderRadius: '10px', color: '#004080', fontWeight: 900, textAlign: 'center', marginTop: '40px', zIndex: 10 }}>
                            TAHUN AKADEMIK 2026/2027
                        </div>
                    </div>

                    {/* PANEL 2: ABOUT & SYSTEM (Middle) */}
                    <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '30px', borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <div>
                            <div style={{ backgroundColor: '#ffcc00', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#004080', marginBottom: '15px' }}>
                                TENTANG UNIVERSITAS
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', fontWeight: 500 }}>
                                {universityProfile?.history || `${universityProfile?.name} adalah lembaga pendidikan tinggi ternama yang menyelenggarakan pendidikan inovatif melalui sistem yang fleksibel dan adaptif terhadap perkembangan teknologi industri global.`}
                            </p>
                        </div>

                        {facilities && facilities.length > 0 && (
                            <div>
                                <div style={{ backgroundColor: '#004080', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#fff', marginBottom: '15px' }}>
                                    FASILITAS YANG TERSEDIA
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {facilities.slice(0, 12).map((facility, idx) => {
                                        const { icon: Icon, color } = getFacilityIcon(facility.type);
                                        const displayImage = facility.image;

                                        return (
                                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <div style={{
                                                    borderRadius: '10px',
                                                    overflow: 'hidden',
                                                    height: '90px',
                                                    backgroundColor: displayImage ? 'transparent' : `${color}15`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: displayImage ? 'none' : `1px solid ${color}30`
                                                }}>
                                                    {displayImage ? (
                                                        <img
                                                            src={displayImage}
                                                            crossOrigin="anonymous"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <Icon size={32} color={color} style={{ opacity: 0.7 }} />
                                                    )}
                                                </div>
                                                <div style={{ color: '#004080', fontSize: '11px', fontWeight: 800, textAlign: 'center' }}>
                                                    {facility.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* PANEL 3: PROGRAMS LIST & DETAILS */}
                    <div style={{ padding: '60px 40px', backgroundColor: '#f8f9fa' }}>
                        <div style={{ backgroundColor: '#0066cc', padding: '12px', borderRadius: '10px', color: '#fff', textAlign: 'center', fontWeight: 900, marginBottom: '15px' }}>
                            DAFTAR PRODI LENGKAP
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {faculties.map((fac) => {
                                const facultyPrograms = programs.filter(p => p.facultyId === fac.id);
                                if (facultyPrograms.length === 0) return null;

                                return (
                                    <div key={fac.id}>
                                        <h4 style={{ color: '#0066cc', fontSize: '11px', fontWeight: 900, marginBottom: '4px', textTransform: 'uppercase' }}>
                                            {fac.name}
                                        </h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3px' }}>
                                            {facultyPrograms.map((prog) => (
                                                <div key={prog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #eee', padding: '4px 8px', borderRadius: '6px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#444' }}>{prog.name} ({prog.level})</span>
                                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#0066cc' }}>Akreditasi : {prog.accreditation || '-'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <div>
                                <div style={{ borderLeft: '6px solid #ffcc00', paddingLeft: '15px', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#004080', margin: 0 }}>SYARAT PENDAFTARAN</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {requirements.map((req, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <div style={{ backgroundColor: '#0066cc', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                                <CheckCircle2 size={10} color="#fff" />
                                            </div>
                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#444' }}>{req.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ borderLeft: '6px solid #ffcc00', paddingLeft: '15px', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#004080', margin: 0 }}>ALUR PENERIMAAN</h3>
                                </div>
                                <div style={{ position: 'relative', paddingLeft: '25px', borderLeft: '3px dashed #0066cc', marginLeft: '8px' }}>
                                    {timelines.map((t, i) => (
                                        <div key={i} style={{ marginBottom: '15px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-39px', top: '0', width: '24px', height: '24px', backgroundColor: '#ffcc00', border: '3px solid #004080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '10px', color: '#004080' }}>
                                                {i + 1}
                                            </div>
                                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#004080' }}>{t.event}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ backgroundColor: '#ffcc00', display: 'inline-block', padding: '6px 15px', borderRadius: '4px', fontWeight: 900, color: '#004080', marginBottom: '12px', fontSize: '12px' }}>
                                    BEASISWA UNGGULAN
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                                    {[
                                        "Beasiswa KIP-Kuliah Nasional",
                                        "Beasiswa Prestasi Akademik",
                                        "Beasiswa Khusus Anak Karyawan",
                                        "Beasiswa Kemitraan Strategis"
                                    ].map((b, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color: '#004080' }}>
                                            <Award size={14} color="#ffcc00" /> {b}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(() => {
                    // Create flat cards for each combination of Program + Pathway + Class
                    const flatCards = costs.reduce((acc: any[], cost: any) => {
                        const key = `${cost.studyProgramId}-${cost.pathwayId || 'default'}-${cost.classId || 'default'}`;
                        let card = acc.find(c => c.key === key);
                        if (!card) {
                            card = {
                                key,
                                program: programs.find(p => p.id === cost.studyProgramId),
                                pathwayName: pathways.find(p => p.id === cost.pathwayId)?.name || 'JALUR UMUM',
                                className: classes.find(c => c.id === cost.classId)?.name || 'REGULER',
                                items: []
                            };
                            acc.push(card);
                        }
                        card.items.push(cost);
                        return acc;
                    }, []);


                    const renderCards = (cards: any[]) => {
                        return (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                                {cards.map((card, idx) => {
                                    if (!card.program) return null;
                                    return (
                                        <div key={idx} className="cost-card" style={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '10px',
                                            padding: '12px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                        }}>
                                            <div style={{ borderBottom: '2px solid #ffcc00', paddingBottom: '6px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 950, color: '#004080', lineHeight: 1.2 }}>
                                                    {card.program.name.toUpperCase()}
                                                </div>
                                                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                                                    <span style={{ fontSize: '8px', fontWeight: 900, backgroundColor: '#004080', color: '#fff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                                        {card.pathwayName}
                                                    </span>
                                                    <span style={{ fontSize: '8px', fontWeight: 900, backgroundColor: '#0066cc', color: '#fff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                                        {card.className}
                                                    </span>
                                                </div>
                                            </div>
                                            {card.items.map((item: any, i: number) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                                                    <span style={{ fontWeight: 600, color: '#666' }}>
                                                        {item.description || (item.costType === 'tuition' ? 'Biaya Kuliah' : item.costType === 'registration' ? 'Biaya Pendaftaran' : 'Biaya Lainnya')}
                                                    </span>
                                                    <span style={{ fontWeight: 800, color: '#004080' }}>
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(item.amount))}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    };

                    const renderPageStructure = (cards: any[], index: number) => {
                        if (cards.length === 0) return null;
                        const PANEL_CAPACITY = 8;
                        const p1 = cards.slice(0, PANEL_CAPACITY);
                        const p2 = cards.slice(PANEL_CAPACITY, PANEL_CAPACITY * 2);
                        const p3 = cards.slice(PANEL_CAPACITY * 2, PANEL_CAPACITY * 3);
                        const p4 = cards.slice(PANEL_CAPACITY * 3, PANEL_CAPACITY * 4);

                        return (
                            <div
                                key={index}
                                ref={(el: any) => educationPagesRef.current[index] = el}
                                style={{
                                    width: '1754px',
                                    height: '1240px',
                                    backgroundColor: '#ffffff',
                                    position: 'relative',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                    padding: '0',
                                    fontFamily: "'Inter', sans-serif",
                                    overflow: 'hidden',
                                    marginTop: index > 0 ? '50px' : '0'
                                }}
                            >
                                <div style={{ padding: '60px 25px', borderRight: '1px solid #eee', backgroundColor: '#fdfdfd' }}>
                                    {index === 0 && (
                                        <div style={{ borderLeft: '6px solid #ffcc00', paddingLeft: '15px', marginBottom: '25px' }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#004080', margin: 0, textTransform: 'uppercase' }}>BIAYA PENDIDIKAN</h3>
                                        </div>
                                    )}
                                    {renderCards(p1)}
                                </div>
                                <div style={{ padding: '60px 25px', borderRight: '1px solid #eee', backgroundColor: '#fdfdfd' }}>
                                    {renderCards(p2)}
                                </div>
                                <div style={{ padding: '60px 25px', borderRight: '1px solid #eee', backgroundColor: '#fdfdfd' }}>
                                    {renderCards(p3)}
                                </div>
                                <div style={{ padding: '60px 25px', backgroundColor: '#fdfdfd' }}>
                                    {renderCards(p4)}
                                    {programs.length > 5 && (
                                        <p style={{ fontSize: '10px', marginTop: '15px', color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
                                            * Harga dapat berubah sewaktu-waktu sesuai kebijakan Universitas.
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    };

                    const CARDS_PER_PAGE = 32;
                    const chunks = [];
                    for (let i = 0; i < flatCards.length; i += CARDS_PER_PAGE) {
                        chunks.push(flatCards.slice(i, i + CARDS_PER_PAGE));
                    }

                    return (
                        <>
                            {chunks.map((chunk, idx) => renderPageStructure(chunk, idx))}
                        </>
                    );
                })()}
            </div>
        </div>
    );
}
