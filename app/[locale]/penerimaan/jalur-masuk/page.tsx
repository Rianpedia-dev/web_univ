import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Users,
    FileText,
    CheckCircle,
    Calendar,
    Clock,
    Award,
    Zap,
    Shield,
    Target,
    ArrowRight,
    Star
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAdmissionPathways } from '@/lib/db';

export default async function JalurMasukPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Ambil data dari database
    const jalurMasukData = await getPublishedAdmissionPathways();

    // Statistik
    const totalJalur = jalurMasukData.length;

    return (
        <div className="min-h-screen bg-background overflow-hidden relative">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Full width background image section for header */}
            <div
                className="relative bg-[url('/images/backround_jalur_masuk.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
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
                                Jalur Masuk
                            </h1>
                            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                                Informasi lengkap tentang berbagai jalur pendaftaran mahasiswa baru yang tersedia.
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
                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <Target className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
                            {totalJalur}
                        </div>
                        <div className="text-muted-foreground text-sm">Total Jalur</div>
                    </div>



                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                            <Users className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
                            ∞
                        </div>
                        <div className="text-muted-foreground text-sm">Kuota Terbuka</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <Award className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
                            100%
                        </div>
                        <div className="text-muted-foreground text-sm">Transparansi</div>
                    </div>
                </MotionDiv>

                {/* Daftar Jalur Masuk */}
                <MotionDiv
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">Jalur Pendaftaran Tersedia</h2>

                    {jalurMasukData.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {jalurMasukData.map((jalur, index) => {
                                return (
                                    <MotionDiv
                                        key={jalur.id}
                                        className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="p-8">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-4 bg-cyber-blue/20 text-cyber-blue">
                                                        {index % 3 === 0 ? <Zap className="w-7 h-7" /> :
                                                            index % 3 === 1 ? <Star className="w-7 h-7" /> :
                                                                <Shield className="w-7 h-7" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-cyber-blue transition-colors">
                                                            {jalur.name}
                                                        </h3>

                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground mb-6">
                                                {jalur.description || 'Jalur pendaftaran untuk calon mahasiswa baru.'}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <Button
                                                    className="ml-auto bg-gradient-cyber hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                                                >
                                                    Informasi Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </MotionDiv>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="glass-card rounded-2xl border p-12 text-center">
                            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Jalur Masuk</h3>
                            <p className="text-muted-foreground">Informasi jalur masuk akan segera ditambahkan</p>
                        </div>
                    )}
                </MotionDiv>

                {/* Tips Memilih Jalur */}
                <MotionDiv
                    className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-8">Tips Memilih Jalur Masuk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                judul: "Kenali Keunggulan Anda",
                                deskripsi: "Pilih jalur yang sesuai dengan prestasi dan keunggulan yang Anda miliki",
                                icon: Star
                            },
                            {
                                judul: "Perhatikan Persyaratan",
                                deskripsi: "Pastikan Anda memenuhi semua persyaratan yang ditetapkan untuk jalur tersebut",
                                icon: FileText
                            },
                            {
                                judul: "Konsultasi dengan Panitia",
                                deskripsi: "Hubungi panitia PMB untuk mendapatkan informasi lebih detail tentang jalur yang tepat",
                                icon: Users
                            }
                        ].map((tips, index) => (
                            <div key={index} className="glass-card p-6 rounded-xl border text-center">
                                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                    <tips.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-foreground">{tips.judul}</h3>
                                <p className="text-sm text-muted-foreground">{tips.deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
