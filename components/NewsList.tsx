"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Clock, ArrowRight } from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import Image from "next/image";
import { NewsDetailDialog } from "./NewsDetailDialog";

interface NewsListProps {
    initialNews: any[];
    uniProfile?: any;
}

export function NewsList({ initialNews, uniProfile }: NewsListProps) {
    const [news, setNews] = useState<any[]>(initialNews);
    const [selectedNews, setSelectedNews] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialNews.length >= 10);
    const [offset, setOffset] = useState(initialNews.length);

    const beritaUtama = news[0];
    const beritaLainnya = news.slice(1);

    const handleOpenDetail = (newsItem: any) => {
        setSelectedNews(newsItem);
        setIsDialogOpen(true);
    };

    const handleLoadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/news?limit=9&offset=${offset}`);
            const newNews = await response.json();

            if (newNews.length < 9) {
                setHasMore(false);
            }

            setNews((prev) => [...prev, ...newNews]);
            setOffset((prev) => prev + newNews.length);
        } catch (error) {
            console.error("Error loading more news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Highlight Section */}
            {beritaUtama && (
                <MotionDiv
                    className="mb-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div
                        className="glass-card rounded-[2.5rem] overflow-hidden border border-white/20 group cursor-pointer relative"
                        onClick={() => handleOpenDetail(beritaUtama)}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                                <Image
                                    src={beritaUtama.featuredImage || "/images/berita_placeholder.png"}
                                    alt={beritaUtama.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent hidden lg:block" />
                                <div className="absolute top-6 left-6">
                                    <Badge className="bg-cyber-blue text-foreground font-bold px-4 py-1">
                                        TERBARU
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-background/40 backdrop-blur-md">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                    <Badge variant="outline" className="border-cyber-blue text-cyber-blue">
                                        {beritaUtama.categoryName || 'Berita'}
                                    </Badge>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {beritaUtama.publishedAt ? new Date(beritaUtama.publishedAt).toLocaleDateString('id-ID') : '-'}
                                    </div>
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 group-hover:text-cyber-blue transition-colors duration-300">
                                    {beritaUtama.title}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
                                    {beritaUtama.excerpt || beritaUtama.content?.substring(0, 200).replace(/<[^>]*>/g, '') + '...'}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-cyber p-[2px] mr-3">
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                <User className="w-5 h-5 text-cyber-blue" />
                                            </div>
                                        </div>
                                        <span className="text-foreground font-medium">Humas Universitas</span>
                                    </div>
                                    <Button
                                        variant="default"
                                        className="rounded-full h-11 px-8 font-bold shadow-lg hover:scale-105 transition-all duration-300 group/btn"
                                    >
                                        Baca Selengkapnya
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {beritaLainnya.map((berita, index) => (
                    <MotionDiv
                        key={berita.id}
                        className="glass-card rounded-[2rem] overflow-hidden border border-white/10 group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all flex flex-col h-full cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index % 3) * 0.1 }}
                        onClick={() => handleOpenDetail(berita)}
                    >
                        <div className="relative h-56 overflow-hidden">
                            <Image
                                src={berita.featuredImage || "/images/berita_placeholder.png"}
                                alt={berita.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-background/80 backdrop-blur-md text-foreground border-white/10">
                                    {berita.categoryName || 'Berita'}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center text-xs text-muted-foreground mb-4">
                                <Clock className="w-3 h-3 mr-2" />
                                {berita.publishedAt ? new Date(berita.publishedAt).toLocaleDateString('id-ID') : '-'}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2 group-hover:text-cyber-blue transition-colors">
                                {berita.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                {berita.excerpt || berita.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                            </p>
                            <Button
                                variant="default"
                                className="w-full rounded-full h-11 font-bold shadow-lg hover:scale-105 transition-all duration-300 group/link"
                            >
                                Baca Selengkapnya
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Button>
                        </div>
                    </MotionDiv>
                ))}
            </div>

            {/* Pagination/Load More */}
            {hasMore && (
                <MotionDiv
                    className="text-center mt-12 mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Button
                        variant="outline"
                        className="rounded-full px-12 h-14 font-extrabold text-lg shadow-xl hover:scale-105 transition-all duration-300 border-foreground/20 hover:border-foreground/50 bg-background/50 backdrop-blur-sm"
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? "Memuat..." : "Muat Lebih Banyak Berita"}
                    </Button>
                </MotionDiv>
            )}

            <NewsDetailDialog
                news={selectedNews}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                uniProfile={uniProfile}
            />
        </>
    );
}
