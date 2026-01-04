"use client";

import React, { useRef, useState } from "react";
import { Download, Loader2, Layers, GraduationCap, Clock, FileText, Zap, Phone, Mail, MapPin, CheckCircle2, Globe, Sparkles, CreditCard, BookOpen, Target, Users, User, Award, ChevronRight, Library, Laptop, Dumbbell, Home, Heart, Building2, Rocket, Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toJpeg } from 'html-to-image';
import { jsPDF } from "jspdf";
import { QRCodeSVG } from 'qrcode.react';

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
    staff?: any[];
    socialMedia?: any[];
    contactInfo?: any[];
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
    facilities,
    staff,
    socialMedia,
    contactInfo
}: AdmissionBrochureDownloadProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const page1Ref = useRef<HTMLDivElement>(null);
    const educationPagesRef = useRef<HTMLDivElement[]>([]);
    const [mounted, setMounted] = React.useState(false);
    const [currentUrl, setCurrentUrl] = React.useState("");

    React.useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.origin);
        }
    }, []);

    // Image paths
    const studentsImg = "/images/students_brochure.png";
    const campusImg = "/images/campus_brochure.png";

    const getProxiedUrl = (url: string | null | undefined) => {
        if (!url) return "";
        // Jika URL sudah merupakan path lokal (dimulai dengan /), jangan di-proxy
        if (url.startsWith('/') || url.startsWith('data:')) return url;

        // Selalu proxy URL eksternal (http/https) agar konsisten antara SSR dan Client
        // dan menghindari percobaan fetch langsung oleh browser yang memicu CORS error
        if (url.startsWith('http')) {
            return `/api/proxy?url=${encodeURIComponent(url)}`;
        }
        return url;
    };

    // Helper to get platform icon
    const getSocialIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes('instagram')) return <div className="bg-pink-600 p-1 rounded-full"><Instagram size={12} color="#fff" /></div>;
        if (p.includes('facebook')) return <div className="bg-blue-600 p-1 rounded-full"><Facebook size={12} color="#fff" /></div>;
        if (p.includes('youtube')) return <div className="bg-red-600 p-1 rounded-full"><Youtube size={12} color="#fff" /></div>;
        if (p.includes('tiktok')) return <div className="bg-black p-1 rounded-full"><span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px' }}>Tt</span></div>;
        if (p.includes('twitter') || p.includes('x')) return <div className="bg-sky-500 p-1 rounded-full"><Twitter size={12} color="#fff" /></div>;
        if (p.includes('linkedin')) return <div className="bg-blue-700 p-1 rounded-full"><Linkedin size={12} color="#fff" /></div>;
        return <div className="bg-gray-500 p-1 rounded-full"><Globe size={12} color="#fff" /></div>;
    };

    // Helper to get contact icon
    const getContactIcon = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('email')) return <Mail size={14} color="#004080" />;
        if (t.includes('phone') || t.includes('whatsapp')) return <Phone size={14} color="#004080" />;
        if (t.includes('address') || t.includes('lokasi')) return <MapPin size={14} color="#004080" />;
        return <Building2 size={14} color="#004080" />;
    };

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
                await new Promise(resolve => setTimeout(resolve, 3000));

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
                    const hasCost = pageEl.querySelector('.cost-card');
                    const hasVision = pageEl.querySelector('.vision-mission-section');
                    if (hasCost || hasVision) {
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
                    <span className="text-xl tracking-tighter uppercase leading-none">UNDUH BROSUR PMB</span>

                </div>
            </Button>

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
                            {universityProfile?.logo && (
                                <img
                                    src={getProxiedUrl(universityProfile.logo)}
                                    style={{ height: '120px', objectFit: 'contain' }}
                                    crossOrigin="anonymous"
                                />
                            )}
                        </div>
                        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 10px 0', color: '#fff', textAlign: 'center', zIndex: 10, letterSpacing: '-0.5px' }}>{universityProfile?.name}</h1>

                        {accreditation && (
                            <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '30px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Terakreditasi {accreditation.accreditationLevel}
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
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

                        <div style={{ marginBottom: '20px', zIndex: 10 }}>
                            <img
                                src="/images/toga.png"
                                style={{ height: '350px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
                                crossOrigin="anonymous"
                            />
                        </div>

                        <div style={{ textAlign: 'center', zIndex: 10, marginTop: '10px', marginBottom: '20px', padding: '0 10px' }}>
                            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                                Jangan tunda masa depanmu — pendaftaran <span style={{ fontWeight: 800, color: '#ffcc00' }}>{universityProfile?.name || 'Universitas'}</span> telah dibuka!
                            </p>
                            <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
                                Dapatkan pendidikan berkualitas tinggi yang dirancang untuk membentuk pemikir kritis, pemecah masalah kreatif, dan pemimpin masa depan. Rasakan atmosfer belajar yang inovatif, didukung fasilitas modern, kurikulum relevan berbasis riset dan industri, serta bimbingan dari dosen-dosen berkompeten dan berpengalaman.
                            </p>
                        </div>



                    </div>

                    {/* PANEL 2: ABOUT & SYSTEM (Middle) */}
                    <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <div>
                            <div style={{ backgroundColor: '#ffcc00', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#004080', marginBottom: '15px' }}>
                                TENTANG UNIVERSITAS
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: '1.3', color: '#444', fontWeight: 500, textAlign: 'justify' }}>
                                {universityProfile?.history || `${universityProfile?.name} adalah lembaga pendidikan tinggi ternama yang menyelenggarakan pendidikan inovatif melalui sistem yang fleksibel dan adaptif terhadap perkembangan teknologi industri global.`}
                            </p>
                        </div>

                        {facilities && facilities.length > 0 && (
                            <div>
                                <div style={{ backgroundColor: '#004080', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                                    FASILITAS YANG TERSEDIA
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {facilities.slice(0, 6).map((facility, idx) => {
                                        const { icon: Icon, color } = getFacilityIcon(facility.type);
                                        const busterString = `${idx}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                                        const displayImage = facility.image;

                                        // Apply buster to ORIGINAL URL before proxying for maximum uniqueness
                                        const imageWithBuster = displayImage ? (
                                            displayImage.includes('?')
                                                ? `${displayImage}&bvc=${busterString}`
                                                : `${displayImage}?bvc=${busterString}`
                                        ) : null;

                                        const finalImageSrc = imageWithBuster ? getProxiedUrl(imageWithBuster) : null;

                                        return (
                                            <div key={`facility-card-${idx}-${busterString}`} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
                                                    {finalImageSrc ? (
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundImage: `url("${finalImageSrc}")`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                backgroundColor: '#f1f5f9'
                                                            }}
                                                            aria-label={facility.name}
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
                                {facilities.length > 6 && (
                                    <div style={{ marginTop: '12px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 900, color: '#004080', fontStyle: 'italic' }}>
                                            ... dan masih banyak Lainnya
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {pathways && pathways.length > 0 && (
                            <div style={{ marginTop: '0' }}>
                                <div style={{ backgroundColor: '#004080', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                                    JALUR PENDAFTARAN
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {pathways.map((pathway, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px', backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '10px', border: '1px solid #eee' }}>
                                            <div style={{ backgroundColor: '#ffcc00', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Target size={18} color="#004080" />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <div style={{ color: '#004080', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                                                    {pathway.name}
                                                </div>
                                                {pathway.description && (
                                                    <div style={{ color: '#666', fontSize: '9px', fontWeight: 700, lineHeight: 1.3 }}>
                                                        {pathway.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {classes && classes.length > 0 && (
                            <div style={{ marginTop: '0' }}>
                                <div style={{ backgroundColor: '#004080', display: 'inline-block', padding: '8px 25px', borderRadius: '5px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                                    JENIS KELAS YANG TERSEDIA
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {classes.map((cls, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px', backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '10px', border: '1px solid #eee' }}>
                                            <div style={{ backgroundColor: '#ffcc00', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Layers size={18} color="#004080" />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <div style={{ color: '#004080', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>
                                                    {cls.name}
                                                </div>
                                                {cls.schedule && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '9px', fontWeight: 700 }}>
                                                        <Clock size={10} color="#004080" /> {cls.schedule}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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

                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div>
                                <div style={{ borderLeft: '6px solid #ffcc00', paddingLeft: '15px', marginBottom: '15px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#004080', margin: 0 }}>SYARAT PENDAFTARAN</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {/* Mahasiswa Murni */}
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0066cc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: '4px', borderBottom: '1px solid #0066cc20' }}>
                                            Mahasiswa Murni
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {requirements.filter((r: any) => r.type === 'murni' || !r.type).map((req, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                    <div style={{ backgroundColor: '#0066cc', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                                        <CheckCircle2 size={9} color="#fff" />
                                                    </div>
                                                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#444' }}>{req.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mahasiswa Transisi */}
                                    {requirements.some((r: any) => r.type === 'transisi') && (
                                        <div style={{ marginTop: '5px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 900, color: '#bd10e0', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: '4px', borderBottom: '1px solid #bd10e020' }}>
                                                Mahasiswa Transisi
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                {requirements.filter((r: any) => r.type === 'transisi').map((req, i) => (
                                                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                        <div style={{ backgroundColor: '#bd10e0', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                                            <CheckCircle2 size={9} color="#fff" />
                                                        </div>
                                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#444' }}>{req.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div style={{ borderLeft: '6px solid #ffcc00', paddingLeft: '15px', marginBottom: '15px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#004080', margin: 0 }}>ALUR PENDAFTARAN</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px' }}>
                                    {/* Urutan diperbaiki: Kolom kiri dulu baru kolom kanan */}
                                    {(() => {
                                        const half = Math.ceil(timelines.length / 2);
                                        const leftCol = timelines.slice(0, half);
                                        const rightCol = timelines.slice(half);

                                        return (
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {leftCol.map((t, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ width: '26px', height: '26px', backgroundColor: '#ffcc00', border: '3px solid #004080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px', color: '#004080', flexShrink: 0 }}>
                                                                {i + 1}
                                                            </div>
                                                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#004080', lineHeight: 1.2 }}>{t.event}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {rightCol.map((t, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ width: '26px', height: '26px', backgroundColor: '#ffcc00', border: '3px solid #004080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px', color: '#004080', flexShrink: 0 }}>
                                                                {half + i + 1}
                                                            </div>
                                                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#004080', lineHeight: 1.2 }}>{t.event}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        );
                                    })()}
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

                    const renderPageStructure = (cards: any[], index: number, isLast: boolean) => {
                        const COLUMN_CAPACITY = 8;
                        const p1 = cards.slice(0, COLUMN_CAPACITY);
                        const p2 = cards.slice(COLUMN_CAPACITY, COLUMN_CAPACITY * 2);
                        const p3 = cards.slice(COLUMN_CAPACITY * 2, COLUMN_CAPACITY * 3);
                        const p4 = cards.slice(COLUMN_CAPACITY * 3, COLUMN_CAPACITY * 4);

                        return (
                            <div
                                key={index}
                                ref={(el: any) => educationPagesRef.current[index] = el}
                                style={{
                                    width: '1754px',
                                    height: '1350px',
                                    backgroundColor: '#ffffff',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontFamily: "'Inter', sans-serif",
                                    overflow: 'hidden',
                                    marginTop: index > 0 ? '50px' : '0'
                                }}
                            >
                                {/* 1. HEADER (Hanya di halaman pertama biaya) */}
                                {index === 0 && (
                                    <div style={{ padding: '30px 40px 5px 40px', backgroundColor: '#fdfdfd' }}>
                                        <div style={{ borderLeft: '10px solid #ffcc00', paddingLeft: '20px', backgroundColor: '#00408010', padding: '10px 20px', borderRadius: '0 15px 15px 0' }}>
                                            <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#004080', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Daftar Lengkap Biaya Pendidikan</h3>
                                        </div>
                                    </div>
                                )}

                                {/* 2. AREA KONTEN */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                    flex: 1,
                                    padding: '5px 25px 30px 25px',
                                    backgroundColor: '#fdfdfd',
                                    overflow: 'hidden'
                                }}>
                                    {(() => {
                                        const columns = [p1, p2, p3, p4];
                                        const elements = [];
                                        let visionInjected = false;

                                        // Cari tahu di mana Visi Misi harus mulai (kolom pertama yang kosong)
                                        let startColIndex = 4; // Default: tidak ada kolom kosong
                                        if (isLast) {
                                            if (p4.length === 0) {
                                                startColIndex = 3;
                                                if (p3.length === 0) {
                                                    startColIndex = 2;
                                                    if (p2.length === 0) {
                                                        startColIndex = 1;
                                                    }
                                                }
                                            }
                                        }

                                        for (let i = 0; i < 4; i++) {
                                            if (i < startColIndex) {
                                                // 1. Render Kolom Biaya (Hanya jika bukan bagian dari area Visi Misi)
                                                elements.push(
                                                    <div key={i} style={{
                                                        padding: '0 10px',
                                                        borderRight: i < (startColIndex - 1) ? '1px solid #eee' : 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {renderCards(columns[i])}
                                                    </div>
                                                );
                                            } else if (!visionInjected && isLast) {
                                                // 2. Render Visi, Misi, Tujuan & Tim PMB (Dipisahkan)
                                                elements.push(
                                                    <div key="vision-staff-container" style={{
                                                        gridColumn: `${i + 1} / 5`,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '20px',
                                                        margin: '0 10px',
                                                        alignSelf: 'start',
                                                        width: '100%'
                                                    }} className="vision-mission-section">

                                                        {/* TOP ROW: Vision & Staff Cards */}
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: (4 - i) >= 2 ? 'row' : 'column',
                                                            gap: '20px',
                                                            width: '100%'
                                                        }}>
                                                            {/* LEFT COLUMN: Vision */}
                                                            <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                                {/* 1. KARTU VISI, MISI & TUJUAN */}
                                                                <div style={{
                                                                    width: '100%',
                                                                    backgroundColor: '#004080',
                                                                    borderRadius: '25px',
                                                                    padding: (4 - i) <= 2 ? '30px 25px' : '40px 50px',
                                                                    color: '#fff',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '25px',
                                                                    boxShadow: '0 20px 50px rgba(0,64,128,0.15)',
                                                                    position: 'relative',
                                                                    overflow: 'hidden',
                                                                    border: '1px solid rgba(255,255,255,0.1)'
                                                                }}>
                                                                    {/* Decorative background elements */}
                                                                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', backgroundColor: 'rgba(255,204,0,0.08)', borderRadius: '50%', zIndex: 0 }} />

                                                                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                            <div style={{ backgroundColor: '#ffcc00', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                                <Target size={28} color="#004080" />
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                <h3 style={{ fontSize: (4 - i) <= 2 ? '18px' : '24px', fontWeight: 900, color: '#ffcc00', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Visi, Misi & Tujuan</h3>
                                                                                <div style={{ height: '3px', width: '40px', backgroundColor: '#ffcc00', marginTop: '4px', borderRadius: '2px' }} />
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffcc00' }}>
                                                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffcc00' }} />
                                                                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Visi Universitas</span>
                                                                            </div>
                                                                            <p style={{ fontSize: (4 - i) <= 2 ? '13px' : '15px', lineHeight: '1.5', margin: 0, fontWeight: 500, fontStyle: 'italic', color: '#fff' }}>
                                                                                "{universityProfile?.vision}"
                                                                            </p>
                                                                        </div>

                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffcc00' }}>
                                                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffcc00' }} />
                                                                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Misi Universitas</span>
                                                                            </div>
                                                                            <div style={{ fontSize: (4 - i) <= 2 ? '11px' : '13px', lineHeight: '1.6', whiteSpace: 'pre-line', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                                                                                {universityProfile?.mission}
                                                                            </div>
                                                                        </div>

                                                                        {universityProfile?.objectives && (
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffcc00' }}>
                                                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffcc00' }} />
                                                                                    <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Tujuan Universitas</span>
                                                                                </div>
                                                                                <div style={{ fontSize: (4 - i) <= 2 ? '11px' : '13px', lineHeight: '1.6', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                                                                                    {universityProfile?.objectives}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* Bottom accent */}
                                                                    <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px 20px', opacity: 0.4 }}>
                                                                        <span style={{ fontSize: '9px', fontWeight: 800, color: '#ffcc00', letterSpacing: '1px' }}>{universityProfile?.shortName || "CAMPUS"} • 2026</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* RIGHT COLUMN: Staff */}
                                                            {staff && staff.length > 0 && (
                                                                <div style={{
                                                                    flex: 2,
                                                                    backgroundColor: '#f8fafc',
                                                                    borderRadius: '25px',
                                                                    padding: (4 - i) <= 2 ? '25px 20px' : '30px 30px',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '20px',
                                                                    border: '2px dashed #cbd5e1',
                                                                    position: 'relative',
                                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                                                                    height: 'fit-content'
                                                                }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <div style={{ backgroundColor: '#004080', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Users size={20} color="#ffcc00" />
                                                                        </div>
                                                                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#004080', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Tim PMB</h3>
                                                                    </div>

                                                                    <div style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '1fr',
                                                                        gap: '12px'
                                                                    }}>
                                                                        {staff.slice(0, 4).map((member: any, mIdx: number) => {
                                                                            return (
                                                                                <div key={`staff-brochure-${mIdx}`} style={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '15px',
                                                                                    backgroundColor: '#fff',
                                                                                    padding: '12px',
                                                                                    borderRadius: '16px',
                                                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                                                                    border: '1px solid #f1f5f9'
                                                                                }}>
                                                                                    <div style={{
                                                                                        width: '45px',
                                                                                        height: '45px',
                                                                                        borderRadius: '12px',
                                                                                        overflow: 'hidden',
                                                                                        flexShrink: 0,
                                                                                        backgroundColor: '#f1f5f9',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        border: '2px solid #00408015'
                                                                                    }}>
                                                                                        <User size={24} color="#004080" style={{ opacity: 0.7 }} />
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>{member.name}</span>
                                                                                        <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>{member.position}</span>

                                                                                        {member.whatsapp && (
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                gap: '4px',
                                                                                                backgroundColor: '#25D36615',
                                                                                                padding: '1px 6px',
                                                                                                borderRadius: '4px',
                                                                                                width: 'fit-content'
                                                                                            }}>
                                                                                                <Phone size={8} color="#128C7E" />
                                                                                                <span style={{ fontSize: '9px', fontWeight: 800, color: '#128C7E' }}>{member.whatsapp}</span>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>

                                                                    <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                                                                        <div style={{ display: 'inline-block', padding: '6px 15px', backgroundColor: '#00408010', borderRadius: '20px' }}>
                                                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#004080' }}>Siap melayani pertanyaan Anda</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* BOTTOM ROW: Image & Footer */}
                                                        <div style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '15px'
                                                        }}>
                                                            {/* Image */}
                                                            <div style={{
                                                                width: '100%',
                                                                borderRadius: '25px',
                                                                overflow: 'hidden',
                                                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                                                border: '1px solid #f1f5f9'
                                                            }}>
                                                                <img
                                                                    src="/images/brosur2.png"
                                                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                                                                    crossOrigin="anonymous"
                                                                />
                                                            </div>

                                                            {/* Footer: Contact & Social */}
                                                            {(contactInfo || socialMedia) && (
                                                                <div style={{
                                                                    backgroundColor: '#f8fafc',
                                                                    borderRadius: '20px',
                                                                    padding: '20px 30px',
                                                                    border: '1px solid #e2e8f0',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                                                }}>
                                                                    {/* Contact Info (Left) - Taking the first/main entry */}
                                                                    {contactInfo && contactInfo.length > 0 && (() => {
                                                                        const mainContact = contactInfo[0]; // Assume first is Main Campus
                                                                        const fullAddress = `${mainContact.address}, ${mainContact.city}, ${mainContact.province} ${mainContact.postalCode || ''}`;

                                                                        return (
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                                {/* Address */}
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                    <div style={{ backgroundColor: '#00408010', padding: '6px', borderRadius: '8px' }}>
                                                                                        <MapPin size={14} color="#004080" />
                                                                                    </div>
                                                                                    <span style={{ fontSize: '11px', color: '#334155', fontWeight: 600, maxWidth: '250px' }}>
                                                                                        {fullAddress}
                                                                                    </span>
                                                                                </div>

                                                                                {/* Phone */}
                                                                                {mainContact.phone && (
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                        <div style={{ backgroundColor: '#00408010', padding: '6px', borderRadius: '8px' }}>
                                                                                            <Phone size={14} color="#004080" />
                                                                                        </div>
                                                                                        <span style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>
                                                                                            {mainContact.phone}
                                                                                        </span>
                                                                                    </div>
                                                                                )}

                                                                                {/* Email */}
                                                                                {mainContact.email && (
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                        <div style={{ backgroundColor: '#00408010', padding: '6px', borderRadius: '8px' }}>
                                                                                            <Mail size={14} color="#004080" />
                                                                                        </div>
                                                                                        <span style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>
                                                                                            {mainContact.email}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })()}

                                                                    {/* Social Media (Right) */}
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                                                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#004080', textTransform: 'uppercase' }}>Ikuti Kami:</span>
                                                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '280px' }}>
                                                                            {socialMedia?.map((item: any, idx: number) => (
                                                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', padding: '4px 8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                                                    {getSocialIcon(item.platform)}
                                                                                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#475569' }}>{item.username || item.platform}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* QR Code Section (Text + QR) */}
                                                            <div style={{
                                                                marginTop: '15px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '20px'
                                                            }}>
                                                                <div style={{ fontSize: '13px', fontWeight: 900, color: '#004080', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                                    Informasi lebih lengkap :
                                                                </div>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    padding: '12px',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '20px',
                                                                    border: '1px solid #e2e8f0',
                                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.06)'
                                                                }}>
                                                                    {currentUrl && (
                                                                        <QRCodeSVG
                                                                            value={currentUrl}
                                                                            size={100}
                                                                            level="H"
                                                                            includeMargin={false}
                                                                            imageSettings={{
                                                                                src: getProxiedUrl(universityProfile?.logo) || "",
                                                                                x: undefined,
                                                                                y: undefined,
                                                                                height: 25,
                                                                                width: 25,
                                                                                excavate: true,
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                                visionInjected = true;
                                            }
                                        }
                                        return elements;
                                    })()}
                                </div>

                                {/* 3. FOOTER (Hanya jika bukan halaman terakhir) */}
                                {
                                    !isLast && (
                                        <div style={{ padding: '25px 40px', backgroundColor: '#f8f9fa', borderTop: '1px solid #eee', textAlign: 'center' }}>
                                            <span style={{ fontSize: '11px', color: '#999', fontWeight: 700, fontStyle: 'italic' }}>Informasi biaya pendidikan berlanjut di halaman berikutnya...</span>
                                        </div>
                                    )
                                }

                                {
                                    isLast && (
                                        <div style={{ padding: '25px 40px', backgroundColor: '#004080', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 600 }}>© 2026 {universityProfile?.name}. Seluruh hak cipta dilindungi.</span>
                                            <span style={{ fontSize: '10px', color: '#ffcc00', fontWeight: 800, textTransform: 'uppercase' }}>* Biaya dapat berubah sewaktu-waktu.</span>
                                        </div>
                                    )
                                }
                            </div>
                        );
                    };

                    const CARDS_PER_PAGE = 32; // Increased since no vision footer
                    const chunks = [];
                    for (let i = 0; i < flatCards.length; i += CARDS_PER_PAGE) {
                        chunks.push(flatCards.slice(i, i + CARDS_PER_PAGE));
                    }

                    return (
                        <>
                            {chunks.length === 0 && renderPageStructure([], 0, true)}
                            {chunks.map((chunk, idx) => renderPageStructure(chunk, idx, idx === chunks.length - 1))}
                        </>
                    );
                })()}
            </div>
        </div >
    );
}
