"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    FileText,
    ExternalLink,
    Users,
    Calendar,
    Hash,
    Search,
    Filter,
    Maximize2
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from "@/components/motion-wrapper";
import Link from "next/link";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

// Database schema type for Journal
interface Journal {
    id: string;
    imageUrl: string | null;
    title: string;
    authors: string | null;
    journalName: string | null;
    journalAbbr: string | null;
    year: string | null;
    volume: string | null;
    number: string | null;
    keywords: string | null;
    link: string | null;
    isPublished: boolean;
}

export default function JurnalPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [journalsData, setJournalsData] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await fetch('/api/journals');
                const result = await response.json();
                if (result.data) {
                    setJournalsData(result.data);
                }
            } catch (error) {
                console.error("Error fetching journals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    return (
        <div className="min-h-screen bg-background overflow-hidden relative pb-20">

            {/* Header Section */}
            <div className="relative bg-[url('/0')] bg-cover bg-center bg-no-repeat -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-0 border-2 border-cyber-blue/50 rounded-3xl overflow-hidden mb-16">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 py-44 px-4 sm:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center">
                            <MotionDiv
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transform transition-all duration-300 hover:scale-105" style={{
                                    background: 'linear-gradient(to right, #fefce8, #ecd735ff, #f9cd5eff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    WebkitTextStroke: '1px #fcffa5ff',
                                    textShadow: '0 2px 2px rgba(0,0,0,0.5)'
                                }}>
                                    PUBLIKASI JURNAL
                                </h1 >
                            </MotionDiv>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">


                {/* Journal Section Title */}
                <div className="flex flex-col items-center justify-center mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase italic">
                        Daftar Jurnal
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-electric-purple rounded-full mt-3 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                </div>

                {/* Journal Cards Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-[450px] w-full rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {journalsData
                            .slice(0, currentPage * itemsPerPage)
                            .map((journal, index) => (
                                <MotionDiv
                                    key={journal.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <Card className="glass-card overflow-hidden h-full border border-white/10 dark:border-white/5 hover:border-cyber-blue/30 transition-all duration-500 group relative flex flex-col shadow-xl hover:shadow-cyber-blue/10">
                                        {/* Journal Image */}
                                        <div
                                            className="relative h-48 overflow-hidden cursor-pointer group/img"
                                            onClick={() => journal.imageUrl && setSelectedImage(journal.imageUrl)}
                                        >
                                            <Image
                                                src={journal.imageUrl || "https://placehold.co/800x400?text=No+Image"}
                                                alt={journal.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                                <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 backdrop-blur-md flex items-center justify-center border border-[#00f0ff]/50 transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                                                    <Maximize2 className="w-6 h-6 text-[#00f0ff]" />
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                                            <div className="absolute top-4 left-4 z-20">
                                                <Badge className="bg-[#00f0ff] text-black font-black border-none px-3 py-1 shadow-[0_0_15px_rgba(0,240,255,0.8)] uppercase text-[10px] tracking-wider transition-all duration-300 group-hover/img:scale-105">
                                                    {journal.journalAbbr}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Journal Badge & Year */}
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20">
                                                        <BookOpen className="w-4 h-4 text-cyber-blue" />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-muted-foreground font-medium line-clamp-1 max-w-[150px]">
                                                            {journal.journalName}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-medium">
                                                        {journal.year}, Vol. {journal.volume}, No. {journal.number}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Article Title */}
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight line-clamp-3 group-hover:text-cyber-blue transition-colors duration-300">
                                                {journal.title}
                                            </h3>

                                            {/* Authors */}
                                            <div className="flex items-center gap-2 mb-6">
                                                <div className="flex -space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border-2 border-background flex items-center justify-center">
                                                        <Users className="w-4 h-4 text-cyber-blue" />
                                                    </div>
                                                </div>
                                                <span className="text-sm font-semibold text-foreground/70 italic">
                                                    {journal.authors}
                                                </span>
                                            </div>

                                            {/* Keywords */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {journal.keywords?.split(',').map((tag) => (
                                                    <Badge
                                                        key={tag.trim()}
                                                        variant="secondary"
                                                        className="bg-muted/50 hover:bg-muted text-muted-foreground border-transparent text-[10px] font-bold py-1 px-3 rounded-lg flex items-center gap-1 group/tag"
                                                    >
                                                        <Hash className="w-3 h-3 text-cyber-blue/50 group-hover/tag:text-cyber-blue transition-colors" />
                                                        {tag.trim()}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Footer Action */}
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-mono">
                                                    <Hash className="w-3.5 h-3.5" />
                                                    DOI: 10.1234/journal.{journal.journalAbbr?.toLowerCase()}.{journal.year}
                                                </div>
                                                <Button
                                                    className="rounded-full h-11 font-bold group shadow-lg hover:scale-105 transition-all duration-300 px-8"
                                                    asChild
                                                >
                                                    <Link href={journal.link || "#"}>
                                                        Lihat Jurnal
                                                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </MotionDiv>
                            ))}
                    </div>
                )}

                {/* Load More Button */}
                {journalsData.length > currentPage * itemsPerPage && (
                    <MotionDiv
                        className="mt-16 flex justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            className="rounded-full px-12 h-12 font-bold shadow-xl hover:scale-105 transition-all duration-300"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <Filter className="w-5 h-5 mr-3" />
                            <span className="text-base tracking-tight">Lihat Lainnya</span>
                        </Button>
                    </MotionDiv>
                )}

                {/* Image Preview Modal */}
                <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                    <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden border-none bg-transparent shadow-none focus-visible:outline-none">
                        <DialogTitle className="sr-only">Pratinjau Gambar</DialogTitle>
                        <div className="relative w-full h-[60vh] sm:h-[80vh] flex items-center justify-center">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}
