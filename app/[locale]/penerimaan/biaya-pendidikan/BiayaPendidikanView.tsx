"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    CreditCard,
    Search,
    ArrowRight,
    Shield,
    Award,
    CheckCircle,
    HelpCircle,
    Mail,
    MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MotionDiv } from "@/components/motion-wrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface EducationCost {
    id: string;
    studyProgramId: string | null;
    classId: string | null;
    pathwayId: string | null;
    costType: string;
    year: string;
    semester: string | null;
    amount: string;
    description: string | null;
}

interface Scholarship {
    id: string;
    name: string;
    amount: string | number | null;
    coverage: string | null;
}

interface BiayaPendidikanProps {
    initialEducationCosts: EducationCost[];
    scholarships: Scholarship[];
    studyPrograms: { id: string, name: string }[];
    admissionClasses: { id: string, name: string }[];
    admissionPathways: { id: string, name: string }[];
    locale: string;
}

export default function BiayaPendidikanView({
    initialEducationCosts,
    scholarships,
    studyPrograms,
    admissionClasses,
    admissionPathways,
    locale
}: BiayaPendidikanProps) {
    const [showAll, setShowAll] = useState(false);

    // Filter state
    const [selectedProgram, setSelectedProgram] = useState<string>("all");
    const [selectedClass, setSelectedClass] = useState<string>("all");
    const [selectedPathway, setSelectedPathway] = useState<string>("all");

    // Helper functions
    const getProgramName = (id: string | null) => studyPrograms.find(p => p.id === id)?.name || 'Semua Program Studi';
    const getClassName = (id: string | null) => admissionClasses.find(c => c.id === id)?.name || 'Semua Kelas';
    const getPathwayName = (id: string | null) => admissionPathways.find(p => p.id === id)?.name || 'Semua Jalur';

    // Fungsi untuk format currency
    const formatCurrency = (amount: number | string | null | undefined) => {
        if (!amount) return 'Rp 0';
        return `Rp ${Number(amount).toLocaleString('id-ID')}`;
    };

    // Filter biaya berdasarkan pilihan
    const filteredCosts = initialEducationCosts.filter(cost => {
        if (selectedProgram !== "all" && cost.studyProgramId !== selectedProgram) return false;
        if (selectedClass !== "all" && cost.classId !== selectedClass) return false;
        if (selectedPathway !== "all" && cost.pathwayId !== selectedPathway) return false;
        return true;
    });

    // Reset filters
    const resetFilters = () => {
        setSelectedProgram("all");
        setSelectedClass("all");
        setSelectedPathway("all");
    };

    const hasSelections = selectedProgram !== "all" || selectedClass !== "all" || selectedPathway !== "all";

    // Mengelompokkan biaya berdasarkan kombinasi (Prodi - Jalur - Kelas)
    const groupedCombinationCosts = useMemo(() => {
        const groups: Record<string, EducationCost[]> = {};
        initialEducationCosts.forEach(cost => {
            const key = `${cost.studyProgramId}-${cost.pathwayId}-${cost.classId}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(cost);
        });
        return Object.values(groups);
    }, [initialEducationCosts]);

    // Data default (8 kombinasi pertama)
    const defaultCombinations = groupedCombinationCosts.slice(0, showAll ? undefined : 8);

    return (
        <div className="min-h-screen bg-background overflow-hidden relative pb-20">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Full width background image section for header */}
            <div className="relative bg-[url('/images/backround_biaya_pendidikan.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16">
                <div className="absolute inset-0 bg-black/0"></div>
                <div className="relative z-10 py-44 px-4 sm:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <MotionDiv
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                                background: 'linear-gradient(to right, #fefce8, #fef08a, #fbbf24)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                WebkitTextStroke: '1px #92400e',
                                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
                            }}>
                                Biaya Pendidikan
                            </h1>
                        </MotionDiv>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">


                {/* Step-by-Step Selection */}
                <MotionDiv
                    className="glass-card rounded-3xl border border-white/10 p-5 md:p-8 mb-12 shadow-2xl relative overflow-hidden bg-white/[0.02] backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-purple/5 rounded-full blur-[100px] -ml-32 -mb-32" />

                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-cyber flex items-center justify-center shadow-lg">
                            <Search className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Konfigurasi Simulasi</h2>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Sesuaikan dengan pilihan program pendidikan Anda</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Pilih Program Studi</label>
                            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                                <SelectTrigger className="h-10 bg-white/5 border-white/10 rounded-xl text-xs">
                                    <SelectValue placeholder="Semua Program Studi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Program Studi</SelectItem>
                                    {studyPrograms.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Pilih Jalur Masuk</label>
                            <Select value={selectedPathway} onValueChange={setSelectedPathway}>
                                <SelectTrigger className="h-10 bg-white/5 border-white/10 rounded-xl text-xs">
                                    <SelectValue placeholder="Semua Jalur" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Jalur</SelectItem>
                                    {admissionPathways.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Jenis Kelas</label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger className="h-10 bg-white/5 border-white/10 rounded-xl text-xs">
                                    <SelectValue placeholder="Semua Kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kelas</SelectItem>
                                    {admissionClasses.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {hasSelections && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex gap-2 items-center overflow-x-auto pb-1">
                                {selectedProgram !== "all" && (
                                    <Badge variant="secondary" className="bg-cyber-blue/20 text-cyber-blue text-[10px] px-2 py-0.5 whitespace-nowrap">
                                        {getProgramName(selectedProgram)}
                                    </Badge>
                                )}
                                {/* ... other badges ... */}
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={resetFilters}
                                className="rounded-full text-[10px] h-7 px-4 font-bold"
                            >
                                Reset Filter
                            </Button>
                        </div>
                    )}
                </MotionDiv>

                {/* Results Section */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    {hasSelections ? (
                        // Mode: Filtered Results
                        <div className="space-y-8">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                    <CreditCard className="w-6 h-6 text-cyber-blue" /> Hasil Rincian Biaya
                                </h3>
                                <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-white/5">
                                    Ditemukan <span className="text-cyber-blue font-bold">{filteredCosts.length}</span> item biaya
                                </div>
                            </div>

                            {filteredCosts.length > 0 ? (
                                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-white/[0.01] backdrop-blur-sm">
                                    <div className="overflow-x-auto">
                                        <Table className="min-w-[600px]">
                                            <TableHeader className="bg-white/5">
                                                <TableRow className="hover:bg-transparent border-white/10">
                                                    <TableHead className="py-6 px-6 text-foreground font-bold border-r border-white/10">Komponen Biaya</TableHead>
                                                    <TableHead className="py-6 px-6 text-foreground font-bold text-right border-r border-white/10">Nominal</TableHead>
                                                    <TableHead className="py-6 px-6 text-foreground font-bold">Keterangan / Jadwal</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredCosts.map((cost) => (
                                                    <TableRow key={cost.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                                        <TableCell className="py-6 px-6 border-r border-white/5">
                                                            <div className="font-bold text-foreground group-hover:text-cyber-blue transition-colors text-base">
                                                                {cost.description || 'Biaya Pendidikan'}
                                                            </div>
                                                            <Badge variant="secondary" className="mt-2 capitalize bg-muted/40 text-[10px] border-white/5">
                                                                {cost.costType === 'tuition' ? 'SPP / UKT' : cost.costType === 'registration' ? 'Pendaftaran' : 'Lainnya'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="py-6 px-6 text-right border-r border-white/5">
                                                            <div className="text-xl font-black bg-clip-text text-transparent bg-gradient-cyber">
                                                                {formatCurrency(cost.amount)}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-6 px-6">
                                                            <div className="text-sm text-muted-foreground font-medium">
                                                                Semester {cost.semester || 'Sesuai Ketentuan'}
                                                            </div>
                                                            <div className="text-[11px] text-muted-foreground/60 mt-1 uppercase tracking-wider font-bold">
                                                                Tahun Akademik {cost.year}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                <TableRow className="bg-cyber-blue/[0.03] border-t-2 border-cyber-blue/30">
                                                    <TableCell className="py-8 px-6 text-xl font-black text-foreground border-r border-white/5">
                                                        Total Estimasi
                                                    </TableCell>
                                                    <TableCell className="py-8 px-6 text-right border-r border-white/5" colSpan={2}>
                                                        <div className="text-3xl font-black text-cyber-blue pr-4">
                                                            {formatCurrency(filteredCosts.reduce((acc, c) => acc + Number(c.amount), 0))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-card rounded-2xl border border-white/10 p-20 text-center bg-white/5">
                                    <Search className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                                    <h4 className="text-2xl font-bold text-foreground mb-3">Tidak Ada Data Ditemukan</h4>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        Maaf, rincian biaya untuk kombinasi pilihan ini belum tersedia.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Mode: Default (8 Preset Tables)
                        <div className="space-y-16">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Contoh Simulasi Biaya</h3>
                                <p className="text-sm text-muted-foreground">Pilih konfigurasi di atas untuk hasil yang lebih spesifik</p>
                            </div>

                            <div className="space-y-20">
                                {defaultCombinations.map((group, groupIdx) => {
                                    const first = group[0];
                                    const total = group.reduce((acc, c) => acc + Number(c.amount), 0);

                                    return (
                                        <div key={groupIdx} className="space-y-6">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 text-sm py-1.5 px-4 rounded-lg">
                                                    {getProgramName(first.studyProgramId)}
                                                </Badge>
                                                <Badge className="bg-electric-purple/20 text-electric-purple border-electric-purple/30 text-sm py-1.5 px-4 rounded-lg">
                                                    {getPathwayName(first.pathwayId)}
                                                </Badge>
                                                <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/30 text-sm py-1.5 px-4 rounded-lg">
                                                    {getClassName(first.classId)}
                                                </Badge>
                                            </div>

                                            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-white/[0.01] backdrop-blur-sm relative">
                                                <div className="overflow-x-auto">
                                                    <Table className="min-w-[500px]">
                                                        <TableHeader className="bg-white/5">
                                                            <TableRow className="hover:bg-transparent border-white/10">
                                                                <TableHead className="py-5 px-6 text-foreground/80 text-[10px] font-black uppercase tracking-widest border-r border-white/10">Komponen Biaya Pendidikan</TableHead>
                                                                <TableHead className="py-5 px-6 text-foreground/80 text-[10px] font-black uppercase tracking-widest text-right">Nominal (IDR)</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {group.map((cost) => (
                                                                <TableRow key={cost.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                                                    <TableCell className="py-5 px-6 border-r border-white/5">
                                                                        <div className="font-bold text-foreground text-sm">{cost.description || 'Biaya Pendidikan'}</div>
                                                                        <div className="text-[10px] text-muted-foreground/70 mt-1.5 font-bold tracking-tight">TA {cost.year} • {cost.semester || 'Sesuai Ketentuan'}</div>
                                                                    </TableCell>
                                                                    <TableCell className="py-5 px-6 text-right font-black text-foreground text-base">
                                                                        {formatCurrency(cost.amount)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                            <TableRow className="bg-cyber-blue/[0.04] border-t-2 border-cyber-blue/20">
                                                                <TableCell className="py-6 px-6 text-base font-black text-cyber-blue border-r border-white/5">
                                                                    Total Estimasi
                                                                </TableCell>
                                                                <TableCell className="py-6 px-6 text-right">
                                                                    <div className="text-2xl font-black text-cyber-blue">
                                                                        {formatCurrency(total)}
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!showAll && groupedCombinationCosts.length > 8 && (
                                <div className="flex justify-center pt-8">
                                    <Button
                                        onClick={() => setShowAll(true)}
                                        variant="outline"
                                        className="rounded-full px-10 h-14 font-extrabold text-lg shadow-xl hover:scale-105 transition-all duration-300 border-foreground/20 hover:border-foreground/50 bg-background/50 backdrop-blur-sm group"
                                    >
                                        Lihat Pilihan Biaya Lainnya <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </MotionDiv>

                {/* Informative Features */}
                {!hasSelections && (
                    <div className="space-y-32 mt-32">
                        <MotionDiv
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {[
                                {
                                    icon: Shield,
                                    title: "Biaya Transparan",
                                    desc: "Semua komponen biaya dipublikasikan secara terbuka tanpa biaya tambahan yang disembunyikan.",
                                    color: "from-blue-500 to-cyan-400"
                                },
                                {
                                    icon: Award,
                                    title: "Program Beasiswa",
                                    desc: "Tersedia potongan biaya SPP hingga 100% bagi calon mahasiswa yang memiliki prestasi akademik.",
                                    color: "from-amber-500 to-yellow-400"
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Pembayaran Luwes",
                                    desc: "Mendukung berbagai skema pembayaran cicilan untuk meringankan beban finansial keluarga.",
                                    color: "from-emerald-500 to-green-400"
                                }
                            ].map((feature, i) => (
                                <div key={i} className="glass-card p-8 rounded-3xl border border-white/5 hover:border-cyber-blue/30 transition-all group relative overflow-hidden">
                                    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:border-cyber-blue/30 transition-all">
                                        <feature.icon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </MotionDiv>

                        {/* CTA Section */}
                        <MotionDiv
                            className="glass-card rounded-[3rem] p-12 md:p-20 border border-white/10 bg-gradient-to-br from-cyber-blue/10 via-transparent to-electric-purple/10 text-center relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-[size:30px_30px] opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #00f0ff 1px, transparent 1px)' }} />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <HelpCircle className="w-16 h-16 text-cyber-blue mx-auto mb-8 animate-bounce" />
                                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                                    Ada Pertanyaan Mengenai <span className="text-cyber-blue">Biaya Pendidikan?</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-10">
                                    Tim konsultan pendidikan kami siap membantu memberikan simulasi biaya yang paling sesuai dengan kebutuhan dan kualifikasi Anda.
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Button
                                        variant="default"
                                        className="h-14 px-10 rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        <MessageSquare className="w-5 h-5 mr-3" /> Chat WhatsApp
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-14 px-10 rounded-full border-foreground/10 bg-background/50 backdrop-blur-sm font-bold shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        <Mail className="w-5 h-5 mr-3" /> Email Pertanyaan
                                    </Button>
                                </div>
                            </div>
                        </MotionDiv>
                    </div>
                )}
            </div>
        </div>
    );
}
