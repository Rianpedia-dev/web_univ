'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Image as ImageIcon,
    Video,
    Calendar,
    X,
} from "lucide-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface MediaItem {
    id: string;
    title: string;
    description: string | null;
    filePath: string;
    thumbnailPath: string | null;
    mediaType: string;
    categoryName: string | null;
    createdAt: Date | string | null;
}

export default function GalleryGrid({ mediaItems, kategori }: { mediaItems: MediaItem[], kategori: any[] }) {
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredItems = mediaItems.filter(item => {
        if (activeFilter === "all") return true;
        // Map slug to category name for filtering or handle by categoryId/slug if available in data
        // For now simple filtering based on activeFilter vs potential logic
        return true; // The DB already returns all, filtering UI can be added later if needed
    });

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <>
            <MotionDiv
                className="flex flex-wrap justify-center gap-2 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {kategori.map((cat) => (
                    <Button
                        key={cat.id}
                        variant={cat.slug === activeFilter ? "default" : "outline"}
                        onClick={() => setActiveFilter(cat.slug)}
                        className={`rounded-full px-6 transition-all duration-300 ${cat.slug === activeFilter
                            ? "bg-gradient-cyber shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                            : "border-white/10 hover:border-cyber-blue/50"
                            }`}
                    >
                        {cat.nama}
                    </Button>
                ))}
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredItems.length > 0 ? (
                    filteredItems.map((media, index) => {
                        const videoId = media.mediaType === 'video' ? getYouTubeId(media.filePath) : null;
                        const displayThumbnail = media.mediaType === 'video'
                            ? (media.thumbnailPath || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/images/galeri_placeholder.png"))
                            : (media.thumbnailPath || media.filePath || "/images/galeri_placeholder.png");

                        return (
                            <MotionDiv
                                key={media.id || index}
                                className="glass-card rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                                onClick={() => setSelectedMedia(media)}
                            >
                                {/* Emblem Aksentuasi */}
                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-r-full z-20 transition-all duration-300 ${media.mediaType === 'video' ? 'bg-electric-purple shadow-[0_0_15px_rgba(191,0,255,0.8)]' : 'bg-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                                    } group-hover:h-32`} />

                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={displayThumbnail}
                                        alt={media.title || "Galeri"}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />

                                    {/* Overlay Ikon Play untuk Video */}
                                    {media.mediaType === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-16 h-16 rounded-full bg-electric-purple/20 backdrop-blur-sm border border-electric-purple/50 flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                                                <div className="w-12 h-12 rounded-full bg-electric-purple flex items-center justify-center shadow-[0_0_20px_rgba(191,0,255,0.6)]">
                                                    <Video className="w-6 h-6 text-white ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                    <div className="absolute top-4 right-4">
                                        <div className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                                            {media.mediaType === 'video' ? (
                                                <Video className="w-5 h-5 text-electric-purple" />
                                            ) : (
                                                <ImageIcon className="w-5 h-5 text-cyber-blue" />
                                            )}
                                        </div>
                                    </div>
                                    {media.categoryName && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge className="bg-background/60 backdrop-blur-xl text-foreground border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                                                {media.categoryName}
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-6">
                                        <div className="flex items-center gap-4 text-xs text-white/80">
                                            <span className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {media.createdAt ? new Date(media.createdAt).toLocaleDateString('id-ID') : '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-cyber-blue transition-colors">
                                        {media.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                                        {media.description || "Dokumentasi kegiatan kampus."}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="border-white/10 text-muted-foreground">
                                            {media.mediaType === 'video' ? 'Video' : 'Foto'}
                                        </Badge>
                                        <div className="flex items-center text-cyber-blue font-bold group-hover:translate-x-1 transition-transform">
                                            Lihat Detail
                                        </div>
                                    </div>
                                </div>
                            </MotionDiv>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-20 pb-40">
                        <p className="text-muted-foreground">Belum ada media galeri yang tersedia.</p>
                    </div>
                )}
            </div>

            <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
                <DialogContent showCloseButton={false} className="max-w-[95vw] lg:max-w-5xl bg-black border-none p-0 overflow-visible rounded-xl gap-0 shadow-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedMedia?.title}</DialogTitle>
                    </DialogHeader>

                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed lg:absolute -top-12 lg:-top-2 lg:-right-12 z-[100] rounded-full bg-white text-black hover:bg-cyber-blue hover:text-white w-10 h-10 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 pointer-events-auto"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X className="w-6 h-6 stroke-[3px]" />
                        </Button>

                        {/* Media Section - Full Width Minimalist */}
                        <div className="w-full h-full flex items-center justify-center overflow-visible">
                            {selectedMedia?.mediaType === 'video' ? (
                                (() => {
                                    const videoId = getYouTubeId(selectedMedia.filePath);
                                    return videoId ? (
                                        <div className="w-full aspect-video">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-white text-xs opacity-50 p-20">Video tidak dapat dimuat.</p>
                                    );
                                })()
                            ) : (
                                <div className="relative w-full min-h-[300px] lg:min-h-[600px] h-full">
                                    <Image
                                        src={selectedMedia?.filePath || "/images/galeri_placeholder.png"}
                                        alt={selectedMedia?.title || "Gallery Item"}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
