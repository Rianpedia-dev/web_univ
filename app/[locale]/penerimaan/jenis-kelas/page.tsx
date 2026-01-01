
import {
    Building2,
    Users,
    Clock,
    Calendar,
    FileText,
    CheckCircle,
    BookOpen,
    GraduationCap,
    Sun,
    Moon,
    Monitor,
    Briefcase
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { getPublishedAdmissionClasses } from '@/lib/db';

export default async function JenisKelasPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Ambil data dari database
    const classesData = await getPublishedAdmissionClasses();

    // Hitung statistik
    const totalClasses = classesData.length;
    const totalQuota = classesData.reduce((acc, c) => acc + (c.quota || 0), 0);
    const classTypes = [...new Set(classesData.map(c => c.type || 'reguler'))];

    // Icon berdasarkan tipe kelas
    const getClassIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'reguler':
                return Sun;
            case 'executive':
                return Briefcase;
            case 'online':
                return Monitor;
            case 'part_time':
                return Moon;
            case 'full_time':
                return Clock;
            default:
                return BookOpen;
        }
    };

    // Label tipe kelas
    const getTypeLabel = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'reguler':
                return 'Kelas Reguler';
            case 'executive':
                return 'Kelas Eksekutif';
            case 'online':
                return 'Kelas Online/Hybrid';
            case 'part_time':
                return 'Kelas Karyawan';
            case 'full_time':
                return 'Full Time';
            default:
                return type;
        }
    };

    return (
        <div className="min-h-screen bg-background overflow-hidden relative">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Full width background image section for header */}
            <div
                className="relative bg-[url('/images/backround_kelas.png')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16"
            >
                <div className="absolute inset-0 bg-black/0"></div>
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
                                background: 'linear-gradient(to right, #10b981, #34d399)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                WebkitTextStroke: '1px black',
                                textShadow: '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
                            }}>
                                Jenis Kelas
                            </h1>
                            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-medium">
                                Pilihan format perkuliahan yang sesuai dengan kebutuhan dan kondisi Anda
                            </p>
                        </MotionDiv>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Statistik Kelas */}
                <MotionDiv
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <Building2 className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-cyber mb-2">
                            {totalClasses}
                        </div>
                        <div className="text-muted-foreground text-sm">Jenis Kelas</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            <Users className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
                            {totalQuota > 0 ? totalQuota.toLocaleString('id-ID') : '∞'}
                        </div>
                        <div className="text-muted-foreground text-sm">Kuota Total</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                            <Clock className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
                            {classTypes.length}
                        </div>
                        <div className="text-muted-foreground text-sm">Tipe Kelas</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border text-center hover:shadow-[0_0_30px_rgba(179,118,255,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <GraduationCap className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
                            100%
                        </div>
                        <div className="text-muted-foreground text-sm">Akreditasi</div>
                    </div>
                </MotionDiv>

                {/* Daftar Jenis Kelas */}
                <MotionDiv
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">Pilihan Jenis Kelas</h2>

                    {classesData.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {classesData.map((kelasItem, index) => {
                                const IconComponent = getClassIcon(kelasItem.type);

                                return (
                                    <MotionDiv
                                        key={kelasItem.id}
                                        className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center">
                                                    <div className="w-14 h-14 bg-gradient-cyber rounded-2xl flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                                        <IconComponent className="w-7 h-7 text-foreground" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-cyber-blue transition-colors">
                                                            {kelasItem.name}
                                                        </h3>
                                                        <Badge variant="outline" className="mt-1 border-cyber-blue/50 text-cyber-blue">
                                                            {getTypeLabel(kelasItem.type)}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Badge className="bg-gradient-cyber text-lg py-1 px-3">
                                                    {kelasItem.quota ? `${kelasItem.quota} Kuota` : 'Terbatas'}
                                                </Badge>
                                            </div>

                                            <p className="text-muted-foreground mb-6">
                                                {kelasItem.description || 'Program kelas yang dirancang untuk kebutuhan pembelajaran yang optimal.'}
                                            </p>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-muted/30 rounded-xl p-4">
                                                    <span className="text-sm text-muted-foreground flex items-center mb-1">
                                                        <Clock className="w-4 h-4 mr-2 text-cyber-blue" />
                                                        Jadwal
                                                    </span>
                                                    <p className="font-semibold text-foreground">{kelasItem.schedule || 'Fleksibel'}</p>
                                                </div>
                                                <div className="bg-muted/30 rounded-xl p-4">
                                                    <span className="text-sm text-muted-foreground flex items-center mb-1">
                                                        <Calendar className="w-4 h-4 mr-2 text-electric-purple" />
                                                        Durasi
                                                    </span>
                                                    <p className="font-semibold text-foreground">Per Semester</p>
                                                </div>
                                            </div>

                                            {kelasItem.requirements && (
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                                        <FileText className="w-4 h-4 mr-2 text-cyber-blue" />
                                                        Keterangan:
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {kelasItem.requirements.split('\n').map((syarat, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <CheckCircle className="w-4 h-4 text-cyber-blue mt-0.5 mr-2 flex-shrink-0" />
                                                                <span className="text-sm text-muted-foreground">{syarat}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}


                                        </div>
                                    </MotionDiv>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="glass-card rounded-2xl border p-12 text-center">
                            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data Kelas</h3>
                            <p className="text-muted-foreground">Data jenis kelas akan segera ditambahkan</p>
                        </div>
                    )}
                </MotionDiv>

                {/* Perbandingan Jenis Kelas */}
                <MotionDiv
                    className="glass-card rounded-3xl p-8 md:p-12 mb-16 border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-center text-foreground mb-8">Perbandingan Jenis Kelas</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-4 text-foreground">Jenis Kelas</th>
                                    <th className="text-left p-4 text-foreground">Jadwal</th>
                                    <th className="text-left p-4 text-foreground">Target</th>
                                    <th className="text-left p-4 text-foreground">Modalitas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5 hover:bg-muted/30">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                                            <span className="font-medium text-foreground">Kelas Reguler Pagi</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">Senin - Jumat, 08:00 - 16:00</td>
                                    <td className="p-4 text-muted-foreground">Mahasiswa Fresh Graduate</td>
                                    <td className="p-4"><Badge variant="outline" className="border-green-500/50 text-green-400">Tatap Muka</Badge></td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-muted/30">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <Moon className="w-5 h-5 text-purple-500 mr-2" />
                                            <span className="font-medium text-foreground">Kelas Reguler Sore</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">Senin - Jumat, 16:00 - 21:00</td>
                                    <td className="p-4 text-muted-foreground">Mahasiswa yang bekerja part-time</td>
                                    <td className="p-4"><Badge variant="outline" className="border-green-500/50 text-green-400">Tatap Muka</Badge></td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-muted/30">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <Briefcase className="w-5 h-5 text-orange-500 mr-2" />
                                            <span className="font-medium text-foreground">Kelas Karyawan</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">Sabtu - Minggu, 08:00 - 16:00</td>
                                    <td className="p-4 text-muted-foreground">Profesional & Karyawan</td>
                                    <td className="p-4"><Badge variant="outline" className="border-green-500/50 text-green-400">Tatap Muka</Badge></td>
                                </tr>
                                <tr className="hover:bg-muted/30">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <Monitor className="w-5 h-5 text-blue-500 mr-2" />
                                            <span className="font-medium text-foreground">Kelas Online/Hybrid</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">Fleksibel</td>
                                    <td className="p-4 text-muted-foreground">Semua kalangan</td>
                                    <td className="p-4"><Badge variant="outline" className="border-blue-500/50 text-blue-400">Online/Hybrid</Badge></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MotionDiv>

                {/* Panduan Pemilihan Kelas */}
                <MotionDiv
                    className="glass-card rounded-2xl p-8 border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-center text-foreground mb-8">Panduan Pemilihan Kelas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                judul: "Evaluasi Kondisi",
                                deskripsi: "Pertimbangkan kondisi pekerjaan, waktu luang, dan kemampuan finansial",
                                icon: Users
                            },
                            {
                                judul: "Sesuaikan Target",
                                deskripsi: "Pilih kelas yang sesuai dengan tujuan akademik dan karir Anda",
                                icon: BookOpen
                            },
                            {
                                judul: "Konsultasi",
                                deskripsi: "Berkonsultasi dengan konselor akademik untuk pemilihan kelas terbaik",
                                icon: FileText
                            }
                        ].map((panduan, index) => (
                            <div key={index} className="glass-card p-6 rounded-xl border text-center">
                                <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                    <panduan.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="font-bold text-lg text-foreground mb-2">{panduan.judul}</h3>
                                <p className="text-muted-foreground text-sm">{panduan.deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
