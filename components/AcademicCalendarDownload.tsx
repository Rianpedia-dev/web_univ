"use client";

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2, Calendar, Clock } from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from 'html-to-image';

interface CalendarEvent {
    id: string;
    title: string;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
    academicYear: string;
    semester: string;
}

interface GroupedCalendar {
    academicYear: string;
    semester: string;
    events: CalendarEvent[];
}

interface Props {
    calendarData: CalendarEvent[];
    universityLogo?: string | null;
}

export function AcademicCalendarDownload({ calendarData, universityLogo }: Props) {
    const printRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Group data
    const groupedCalendar = calendarData.reduce((acc, item) => {
        const key = `${item.academicYear || 'Umum'}-${item.semester || 'Umum'}`;
        if (!acc[key]) {
            acc[key] = {
                academicYear: item.academicYear || 'Umum',
                semester: item.semester || 'Umum',
                events: []
            };
        }
        acc[key].events.push(item);
        return acc;
    }, {} as Record<string, GroupedCalendar>);

    const semesters = Object.values(groupedCalendar);

    // Formatting functions
    const formatDate = (date: Date | null) => {
        if (!date) return 'Tanggal belum ditentukan';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateRange = (startDate: Date | null, endDate: Date | null) => {
        if (!startDate) return 'Tanggal belum ditentukan';
        if (!endDate || startDate === endDate) return formatDate(startDate);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check if same month and year
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`;
        }

        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const handleDownload = async () => {
        const element = printRef.current;
        if (!element) return;

        setIsGenerating(true);

        try {
            // Tunggu render
            await new Promise(resolve => setTimeout(resolve, 600));

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pdfWidth - (margin * 2);
            // Gunakan margin bawah yang lebih besar (30mm) untuk keamanan ekstra agar tidak terpotong
            const pageHeightLimit = pdfHeight - 25;

            let currentY = margin;

            // Ambil semua blok yang harus utuh (tidak terpotong)
            const blocks = element.querySelectorAll('[data-pdf-block]');

            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i] as HTMLElement;
                const isGenap = block.getAttribute('data-semester-type') === 'Genap';

                // Ambil dimensi asli blok
                const blockCanvasWidth = block.getBoundingClientRect().width || 800;
                const blockCanvasHeight = block.getBoundingClientRect().height;
                const blockPdfHeight = (contentWidth * blockCanvasHeight) / blockCanvasWidth;

                // Cek apakah blok muat di halaman saat ini
                // ATAU paksa halaman baru untuk Semester Genap
                // ATAU jika ini blok terakhir (Catatan Penting) dan sisa ruang sangat sedikit
                const isVeryNearBottom = (currentY + blockPdfHeight > pageHeightLimit);
                const shouldBypassToNewPage = isVeryNearBottom || (isGenap && currentY > margin);

                if (shouldBypassToNewPage) {
                    pdf.addPage();
                    currentY = margin;
                }

                // Render blok menjadi gambar
                const blockDataUrl = await toPng(block, {
                    quality: 1,
                    pixelRatio: 2,
                    backgroundColor: '#ffffff',
                    cacheBust: true,
                    style: {
                        margin: '0',
                        padding: block.style.padding || '0'
                    }
                });

                // Tambahkan blok ke PDF
                pdf.addImage(blockDataUrl, 'PNG', margin, currentY, contentWidth, blockPdfHeight);
                currentY += blockPdfHeight + 8; // Beri sedikit jarak antar blok (8mm)
            }

            pdf.save(`Kalender_Akademik_${new Date().getFullYear()}.pdf`);
        } catch (error) {
            console.error("PDF Generation Error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                onClick={handleDownload}
                disabled={isGenerating}
            >
                {isGenerating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Download className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? 'Menyiapkan...' : 'Download Kalender'}
            </Button>

            {/* Hidden Render Area for PDF */}
            <div style={{
                position: 'fixed',
                left: '-9999px',
                top: 0,
                zIndex: -1,
                pointerEvents: 'none'
            }}>
                <div ref={printRef} style={{
                    width: '800px',
                    padding: '40px 60px',
                    background: 'white',
                    color: '#000000',
                    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
                }}>
                    {/* Header */}
                    <div data-pdf-block style={{
                        textAlign: 'center',
                        marginBottom: '40px',
                        borderBottom: '4px solid #000000',
                        paddingBottom: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        {universityLogo && (
                            <img
                                src={universityLogo}
                                alt="Logo Universitas"
                                style={{
                                    height: '80px',
                                    marginBottom: '15px',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            margin: '0',
                            color: '#000000',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Kalender Akademik
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: '#000000',
                            marginTop: '8px',
                            fontWeight: '600'
                        }}>
                            UNIVERSITAS RIANPEDIA
                        </p>
                        <p style={{
                            fontSize: '14px',
                            color: '#333333',
                            marginTop: '4px'
                        }}>
                            Tahun Akademik {new Date().getFullYear()}/{new Date().getFullYear() + 1}
                        </p>
                    </div>

                    {/* Semesters Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {semesters.map((semester, sIdx) => (
                            <div
                                key={sIdx}
                                data-pdf-block
                                data-semester-type={semester.semester}
                                style={{
                                    width: '100%',
                                    paddingBottom: '5px' // Tambahkan ruang ekstra agar border bawah tidak terpotong
                                }}
                            >
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#000000',
                                    marginBottom: '15px',
                                    padding: '8px 15px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '8px',
                                    borderLeft: '5px solid #000000'
                                }}>
                                    {semester.semester !== 'Umum' ? `Semester ${semester.semester}` : 'Kegiatan Umum'} - {semester.academicYear}
                                </h2>

                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'separate',
                                    borderSpacing: '0',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid #000000'
                                }}>
                                    <thead style={{ backgroundColor: '#f9fafb' }}>
                                        <tr>
                                            <th style={tableHeaderStyle}>Kegiatan</th>
                                            <th style={{ ...tableHeaderStyle, width: '250px' }}>Tanggal / Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semester.events.map((event, eIdx) => (
                                            <tr key={eIdx} style={{
                                                backgroundColor: eIdx % 2 === 0 ? 'white' : '#fcfcfc'
                                            }}>
                                                <td style={{
                                                    ...tableCellStyle,
                                                    borderBottom: eIdx === semester.events.length - 1 ? 'none' : '1px solid #000000'
                                                }}>
                                                    <div style={{ fontWeight: '600', color: '#000000', fontSize: '15px' }}>{event.title}</div>
                                                    {event.description && (
                                                        <div style={{ fontSize: '12px', color: '#333333', marginTop: '4px' }}>{event.description}</div>
                                                    )}
                                                </td>
                                                <td style={{
                                                    ...tableCellStyle,
                                                    color: '#000000',
                                                    fontWeight: '500',
                                                    borderBottom: eIdx === semester.events.length - 1 ? 'none' : '1px solid #000000'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span>{formatDateRange(event.startDate, event.endDate)}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div data-pdf-block style={{
                        marginTop: '50px',
                        padding: '20px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        border: '1px solid #000000',
                        width: '100%'
                    }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#000000', fontWeight: '700' }}>Catatan Penting:</h4>
                        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', color: '#333333', lineHeight: '1.6' }}>
                            <li>Jadwal dapat berubah sewaktu-waktu sesuai kebijakan Universitas.</li>
                            <li>Silakan cek berkala di website resmi untuk update terbaru.</li>
                            <li>Pastikan untuk memperhatikan batas waktu pendaftaran dan administrasi.</li>
                        </ul>
                    </div>

                    <div data-pdf-block style={{ textAlign: 'center', marginTop: '40px', fontSize: '10px', color: '#666666', width: '100%' }}>
                        Dokumen ini dihasilkan secara otomatis oleh Portal Akademik Universitas Rianpedia.
                    </div>
                </div>
            </div>
        </>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '700',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #000000'
};

const tableCellStyle: React.CSSProperties = {
    padding: '14px 15px',
    fontSize: '14px',
    borderBottom: '1px solid #000000',
    verticalAlign: 'top',
    color: '#000000'
};
