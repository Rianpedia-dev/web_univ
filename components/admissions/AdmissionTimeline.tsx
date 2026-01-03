"use client";

import React from "react";
import {
    Clock,
    UserPlus,
    FileText,
    ShieldCheck,
    Star,
    CheckCircle,
    Zap,
    Target,
    Shield,
    Award,
    Users,
    Timer,
    AlertCircle,
    CalendarDays,
    Flag,
    HelpCircle,
    Search,
    BookOpen,
    GraduationCap,
    Download,
    ChevronDown,
    ArrowRight
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import AdmissionBrochureDownload from "./AdmissionBrochureDownload";

const iconMap: Record<string, any> = {
    UserPlus,
    FileText,
    ShieldCheck,
    Star,
    CheckCircle,
    Zap,
    Clock,
    Target,
    Shield,
    Award,
    Users,
    Timer,
    AlertCircle,
    CalendarDays,
    Flag,
    HelpCircle,
    Search,
    BookOpen,
    GraduationCap,
    Download
};

interface AdmissionTimelineProps {
    timelines: any[];
    universityProfile: any;
    pathways: any[];
    classes: any[];
    waves: any[];
    programs: any[];
    requirements: any[];
    costs: any[];
    faculties: any[];
}

export default function AdmissionTimeline({
    timelines,
    universityProfile,
    pathways,
    classes,
    waves,
    programs,
    requirements,
    costs,
    faculties
}: AdmissionTimelineProps) {
    return (
        <div id="alur-pendaftaran" className="space-y-12 pt-16 relative">
            <div className="text-center space-y-3">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
                        Alur <span className="text-cyber-blue">Pendaftaran</span>
                    </h2>
                    <div className="w-16 h-1 bg-cyber-blue mx-auto mt-2 rounded-full opacity-60"></div>
                </MotionDiv>
                <p className="text-muted-foreground max-w-xl mx-auto text-base">
                    Ikuti tahapan proses pendaftaran berikut ini untuk bergabung bersama kami.
                </p>
            </div>

            <MotionDiv
                className="glass-card rounded-3xl p-8 md:p-12 border border-border bg-card/50 backdrop-blur-xl relative overflow-visible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 relative z-10">
                    {timelines.map((item: any, index: number) => {
                        const IconComponent = iconMap[item.iconName || 'Clock'] || Clock;
                        const isLast = index === timelines.length - 1;
                        const isEndOfRowLG = (index + 1) % 3 === 0;
                        const isNextInRowLG = !isEndOfRowLG && !isLast;

                        return (
                            <div key={item.id} className="relative flex flex-col items-center group">
                                {/* Connector: Horizontal (Layar Desktop LG - 3 Kolom) */}
                                {isNextInRowLG && (
                                    <div className="hidden lg:flex absolute top-[40px] left-[calc(50%+50px)] w-[calc(100%-100px)] items-center pointer-events-none">
                                        <div className="h-[1px] w-full bg-border/50 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border/50 rotate-45" />
                                        </div>
                                    </div>
                                )}

                                {/* Connector: Horizontal (Layar Tablet MD - 2 Kolom) */}
                                {(!((index + 1) % 2 === 0) && !isLast) && (
                                    <div className="hidden md:flex lg:hidden absolute top-[40px] left-[calc(50%+50px)] w-[calc(100%-100px)] items-center pointer-events-none">
                                        <div className="h-[1px] w-full bg-border/50 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border/50 rotate-45" />
                                        </div>
                                    </div>
                                )}

                                {/* Connector: Vertical (Saat ganti baris di LG) */}
                                {isEndOfRowLG && !isLast && (
                                    <div className="hidden lg:flex absolute top-[80px] left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-border/50 to-transparent items-end pointer-events-none z-0">
                                        <div className="w-2 h-2 border-r border-b border-border/50 rotate-45 -mb-1" />
                                    </div>
                                )}

                                {/* Connector: Vertical (Saat ganti baris di MD) */}
                                {((index + 1) % 2 === 0) && !isLast && (
                                    <div className="hidden md:flex lg:hidden absolute top-[80px] left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-border/50 to-transparent items-end pointer-events-none z-0">
                                        <div className="w-2 h-2 border-r border-b border-border/50 rotate-45 -mb-1" />
                                    </div>
                                )}

                                {/* Connector: Vertical (Mobile SM - 1 Kolom) */}
                                {!isLast && (
                                    <div className="flex md:hidden absolute top-[80px] left-1/2 -translate-x-1/2 h-16 w-[1px] bg-gradient-to-b from-border/50 to-transparent items-end pointer-events-none z-0">
                                        <div className="w-2 h-2 border-r border-b border-border/50 rotate-45 -mb-1" />
                                    </div>
                                )}

                                {/* Icon Container (Smaller) */}
                                <div className="relative z-20 w-20 h-20 mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                                    <div className="w-full h-full rounded-2xl bg-background border border-border flex items-center justify-center p-5 group-hover:border-cyber-blue group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                                        <IconComponent className="w-9 h-9 text-cyber-blue/80 group-hover:text-cyber-blue transition-colors" />
                                    </div>

                                    {/* Small Step Badge - Fixed Visibility */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-cyan-500 text-white font-bold text-sm flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md z-30">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center space-y-1">
                                    <h3 className="font-bold text-foreground text-lg group-hover:text-cyber-blue transition-colors">
                                        {item.event}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-60">
                                        Tahap ke-{index + 1}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Block (Cleaner) */}
                <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold text-foreground">Butuh Informasi Lengkap?</h4>
                        <p className="text-sm text-muted-foreground">Unduh brosur resmi penerimaan fakultas kami.</p>
                    </div>
                </div>
            </MotionDiv>
        </div>
    );
}
