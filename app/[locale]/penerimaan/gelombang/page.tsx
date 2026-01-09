import {
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    CalendarDays,
    Timer,
    Flag,
    ArrowRight
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPublishedAdmissionWaves } from '@/lib/db';

export default async function GelombangPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Ambil data dari database
    const gelombangData = await getPublishedAdmissionWaves();

    // Fungsi untuk format tanggal
    const formatDate = (date: Date | null) => {
        if (!date) return 'Tanggal belum ditentukan';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fungsi untuk menentukan status gelombang
    const getWaveStatus = (startDate: Date, endDate: Date) => {
        const now = new Date();
        if (now < startDate) {
            return { status: 'upcoming', label: 'Belum Dibuka', color: 'blue', icon: '⚪' };
        } else if (now >= startDate && now <= endDate) {
            return { status: 'active', label: 'Aktif', color: 'green', icon: '🔵' };
        } else {
            return { status: 'closed', label: 'Ditutup', color: 'red', icon: '🔴' };
        }
    };

    // Hitung statistik
    const now = new Date();
    const activeWaves = gelombangData.filter(g => now >= g.startDate && now <= g.endDate).length;
    const upcomingWaves = gelombangData.filter(g => now < g.startDate).length;
    const closedWaves = gelombangData.filter(g => now > g.endDate).length;

    return (
        <div className="min-h-screen bg-background overflow-hidden relative">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Full width background image section for header */}
            <div
                className="relative bg-[url('/images/backround_gelombang.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 py-44 px-4 sm:px-6">
                    <div className="container mx-auto max-w-6xl">
                        {/* Header */}
                        <MotionDiv
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                                background: 'linear-gradient(to right, #fefce8, #fef08a, #fbbf24)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                WebkitTextStroke: '1px #92400e',
                                textShadow: '0 2px 2px rgba(0,0,0,0.5)'
                            }}>
                                Gelombang Pendaftaran
                            </h1>
                            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                                Informasi periode waktu penerimaan mahasiswa baru dengan status otomatis berdasarkan tanggal saat ini
                            </p>
                        </MotionDiv>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Statistik */}
                <MotionDiv
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            <CheckCircle className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
                            {activeWaves}
                        </div>
                        <div className="text-muted-foreground text-sm">Gelombang Aktif</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <Timer className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-600 mb-2">
                            {upcomingWaves}
                        </div>
                        <div className="text-muted-foreground text-sm">Segera Dibuka</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(107,114,128,0.3)]">
                            <AlertCircle className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-600 mb-2">
                            {closedWaves}
                        </div>
                        <div className="text-muted-foreground text-sm">Telah Ditutup</div>
                    </div>
                </MotionDiv>

                {/* Timeline Gelombang */}
                <MotionDiv
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">Timeline Gelombang Pendaftaran</h2>

                    {gelombangData.length > 0 ? (
                        <div className="space-y-8">
                            {gelombangData.map((gelombang, index) => {
                                const waveStatus = getWaveStatus(gelombang.startDate, gelombang.endDate);

                                return (
                                    <MotionDiv
                                        key={gelombang.id}
                                        className={`glass-card rounded-2xl border overflow-hidden transition-all duration-300 ${waveStatus.status === 'active'
                                            ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                                            : 'hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]'
                                            }`}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="p-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                {/* Left: Info Gelombang */}
                                                <div className="flex items-start gap-6">
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${waveStatus.status === 'active'
                                                        ? 'bg-green-500/20 border-2 border-green-500/50'
                                                        : waveStatus.status === 'upcoming'
                                                            ? 'bg-blue-500/20 border-2 border-blue-500/50'
                                                            : 'bg-gray-500/20 border-2 border-gray-500/50'
                                                        }`}>
                                                        <Flag className={`w-8 h-8 ${waveStatus.status === 'active'
                                                            ? 'text-green-500'
                                                            : waveStatus.status === 'upcoming'
                                                                ? 'text-blue-500'
                                                                : 'text-gray-500'
                                                            }`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-2xl font-bold text-foreground">{gelombang.name}</h3>
                                                            <Badge className={`${waveStatus.status === 'active'
                                                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                                : waveStatus.status === 'upcoming'
                                                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                                                }`}>
                                                                {waveStatus.icon} {waveStatus.label}
                                                            </Badge>
                                                        </div>

                                                        <div className="flex flex-wrap gap-4 text-sm">
                                                            <div className="flex items-center text-muted-foreground">
                                                                <Calendar className="w-4 h-4 mr-2 text-cyber-blue" />
                                                                <span className="font-medium text-foreground mr-1">Mulai:</span>
                                                                {formatDate(gelombang.startDate)}
                                                            </div>
                                                            <div className="flex items-center text-muted-foreground">
                                                                <CalendarDays className="w-4 h-4 mr-2 text-electric-purple" />
                                                                <span className="font-medium text-foreground mr-1">Berakhir:</span>
                                                                {formatDate(gelombang.endDate)}
                                                            </div>
                                                        </div>

                                                        {gelombang.notes && (
                                                            <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-white/10">
                                                                <p className="text-sm text-muted-foreground italic">
                                                                    📝 {gelombang.notes}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Action */}
                                                <div className="flex-shrink-0">
                                                    {waveStatus.status === 'active' ? (
                                                        <Button className="bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] px-6">
                                                            Daftar Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    ) : waveStatus.status === 'upcoming' ? (
                                                        <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10" disabled>
                                                            <Clock className="w-4 h-4 mr-2" /> Segera Dibuka
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outline" className="border-gray-500/50 text-gray-400" disabled>
                                                            Pendaftaran Ditutup
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </MotionDiv>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="glass-card rounded-2xl border p-12 text-center">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Gelombang Pendaftaran</h3>
                            <p className="text-muted-foreground">Informasi gelombang pendaftaran akan segera ditambahkan</p>
                        </div>
                    )}
                </MotionDiv>

                {/* Info Penting */}
                <MotionDiv
                    className="glass-card rounded-3xl p-8 md:p-12 border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-8">Informasi Penting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-xl border">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-2">Status Otomatis</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Status gelombang pendaftaran ditentukan secara otomatis berdasarkan tanggal saat ini.
                                        Tidak dapat diubah secara manual untuk menjaga akurasi informasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-xl border">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-2">Perhatikan Batas Waktu</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Pastikan mendaftar sebelum gelombang berakhir. Pendaftaran yang melewati batas waktu
                                        tidak akan diproses dan harus menunggu gelombang berikutnya.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
