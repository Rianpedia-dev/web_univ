"use client";

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from 'html-to-image';

interface Employee {
    id: string;
    name: string;
    positionName: string;
    positionLevel: number;
    photo?: string | null;
    period?: string | null;
    parentId?: string | null;
    nip?: string | null;
    nidn?: string | null;
}

interface Props {
    employees: Employee[];
    title: string;
}

export function DownloadStrukturPDF({ employees, title }: Props) {
    const printRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        const element = printRef.current;
        if (!element) return;

        setIsGenerating(true);

        try {
            // Tunggu render font dan layout sejenak
            await new Promise(resolve => setTimeout(resolve, 500));

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2.5, // Keseimbangan antara ketajaman dan stabilitas
                backgroundColor: '#ffffff',
                cacheBust: true,
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const margin = 10;
            const imgWidth = pdfWidth - (margin * 2);

            // Hitung tinggi berdasarkan konten agar tidak terpotong
            const canvasHeight = element.offsetHeight;
            const canvasWidth = element.offsetWidth;
            const imgHeight = (imgWidth * canvasHeight) / canvasWidth;

            pdf.addImage(dataUrl, 'PNG', margin, 15, imgWidth, imgHeight);

            // Footer PDF
            pdf.setFontSize(7);
            pdf.setTextColor(150);
            pdf.text(`Universitas Rianpedia - Dokumen Internal - ${new Date().toLocaleString('id-ID')}`, pdfWidth / 2, pdfHeight - 8, { align: 'center' });

            pdf.save(`Struktur_Organisasi_${new Date().getFullYear()}.pdf`);
        } catch (error) {
            console.error("PDF Generation Error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Pengelompokan data
    const level1 = employees.filter(e => e.positionLevel === 1);
    const level2 = employees.filter(e => e.positionLevel === 2);
    const level3 = employees.filter(e => e.positionLevel > 2);

    return (
        <>
            <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className="bg-gradient-cyber hover:shadow-cyan-500/50 transition-all font-extrabold px-10 py-8 rounded-2xl text-lg group"
            >
                {isGenerating ? (
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                ) : (
                    <Download className="w-6 h-6 mr-3 group-hover:bounce" />
                )}
                {isGenerating ? 'Mengecilkan & Menyiapkan...' : 'Unduh Bagan Struktur Organisasi (PDF)'}
            </Button>

            {/* Area Render PDF yang dioptimalkan (Compact Mode) */}
            <div style={{
                position: 'fixed',
                left: '-5000px',
                top: 0,
                zIndex: -1,
                pointerEvents: 'none'
            }}>
                <div ref={printRef} style={{
                    width: '1100px', // Memperlebar kanvas agar grid bisa lebih banyak kolom
                    padding: '60px',
                    background: 'white',
                    color: '#1a1a1a',
                    display: 'block', // Biarkan block agar selalu ter-layout oleh browser
                    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                }}>
                    {/* Header Compact */}
                    <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #e5e7eb', paddingBottom: '15px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0', color: '#111827', letterSpacing: '-0.02em' }}>{title}</h1>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Universitas Rianpedia</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

                        {/* LEVEL 1 - Pimpinan Tertinggi */}
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', width: '100%' }}>
                            {level1.map(emp => (
                                <div key={emp.id} style={compactNode('#10b981', 'large')}>
                                    <div style={nameLabel(14)}>{emp.name}</div>
                                    <div style={posLabel('#059669', 10)}>{emp.positionName}</div>
                                    {emp.period && <div style={periodLabel}>2025 - 2029</div>}
                                </div>
                            ))}
                        </div>

                        {level1.length > 0 && <div style={connectorLine}></div>}

                        {/* LEVEL 2 - Wakil Rektor (Grid lebih rapat) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)', // Paksa 5 kolom agar lebih muat banyak
                            gap: '12px',
                            width: '100%'
                        }}>
                            {level2.map(emp => (
                                <div key={emp.id} style={compactNode('#8b5cf6', 'medium')}>
                                    <div style={nameLabel(11)}>{emp.name}</div>
                                    <div style={posLabel('#7c3aed', 9)}>{emp.positionName}</div>
                                </div>
                            ))}
                        </div>

                        {level2.length > 0 && <div style={connectorLine}></div>}

                        {/* LEVEL 3 - Lembaga/Unit (Sangat Compact) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)', // Paksa 6 kolom
                            gap: '8px',
                            width: '100%'
                        }}>
                            {level3.map(emp => (
                                <div key={emp.id} style={compactNode('#0d9488', 'small')}>
                                    <div style={nameLabel(9)}>{emp.name}</div>
                                    <div style={posLabel('#0d9488', 8)}>{emp.positionName}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '50px', textAlign: 'center' }}>
                        <p style={{ fontSize: '9px', color: '#9ca3af', fontStyle: 'italic' }}>
                            Dokumen ini dihasilkan secara otomatis oleh Sistem Informasi Eksekutif Universitas Rianpedia.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper Styles untuk Compact Diagram
const compactNode = (borderColor: string, size: 'large' | 'medium' | 'small') => ({
    border: `1.5px solid ${borderColor}`,
    borderRadius: size === 'large' ? '12px' : '8px',
    padding: size === 'large' ? '15px 20px' : size === 'medium' ? '10px' : '8px',
    textAlign: 'center' as const,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    minHeight: size === 'large' ? '100px' : 'none',
    width: '100%',
});

const nameLabel = (fontSize: number) => ({
    fontWeight: '700' as const,
    fontSize: `${fontSize}px`,
    color: '#1f2937',
    lineHeight: '1.2',
    marginBottom: '2px'
});

const posLabel = (color: string, fontSize: number) => ({
    fontSize: `${fontSize}px`,
    color: color,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    lineHeight: '1.2'
});

const periodLabel = {
    fontSize: '9px',
    color: '#9ca3af',
    marginTop: '6px',
    fontWeight: '500' as const
};

const connectorLine = {
    width: '1.5px',
    height: '25px',
    backgroundColor: '#d1d5db'
};
