"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";
import { NewsDetailDialog } from "@/components/NewsDetailDialog";

interface HomeNewsSectionProps {
    latestNews: any[];
    locale: string;
    uniProfile?: any;
}

export function HomeNewsSection({ latestNews, locale, uniProfile }: HomeNewsSectionProps) {
    const [selectedNews, setSelectedNews] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDetail = (news: any) => {
        setSelectedNews(news);
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-16 relative z-10">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
            >
                <div>
                    <h2 className="text-4xl font-bold text-foreground mb-4">Berita Terbaru</h2>
                    <div className="w-24 h-1 bg-gradient-cyber rounded-full"></div>
                </div>
                <Link href={`/${locale}/berita-media/berita`}>
                    <Button variant="outline" className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 rounded-full px-8 relative overflow-hidden group">
                        <span className="relative z-10">Lihat Semua Berita</span>
                        <ChevronRight className="w-4 h-4 ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 transition-opacity -z-10"></div>
                    </Button>
                </Link>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestNews.map((news, index) => (
                    <MotionDiv
                        key={news.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="glass-card rounded-[2rem] border border-white/10 hover:shadow-[0_20px_40px_rgba(0,240,255,0.1)] transition-all duration-500 overflow-hidden flex flex-col group h-full cursor-pointer"
                        onClick={() => handleOpenDetail(news)}
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={news.featuredImage || "https://images.unsplash.com/photo-1585829365234-781fcd50c40b?q=80&w=2070&auto=format&fit=crop"}
                                alt={news.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 backdrop-blur-md">Berita</Badge>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-4 text-xs font-medium text-foreground/50 uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }) : 'Baru saja'}
                            </div>

                            <h3 className="font-bold text-xl text-foreground mb-4 line-clamp-2 group-hover:text-cyber-blue transition-colors">
                                {news.title}
                            </h3>

                            <p className="text-foreground/60 mb-6 line-clamp-3 text-sm leading-relaxed">
                                {news.excerpt || (news.content ? news.content.substring(0, 120).replace(/<[^>]*>/g, '') + '...' : 'Klik untuk membaca selengkapnya.')}
                            </p>

                            <div className="mt-auto">
                                <Button variant="ghost" className="p-0 h-auto text-cyber-blue hover:text-cyber-blue/80 font-bold flex items-center group/btn" onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    handleOpenDetail(news);
                                }}>
                                    Baca Selengkapnya
                                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </div>

            <NewsDetailDialog
                news={selectedNews}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                uniProfile={uniProfile}
            />
        </div>
    );
}
