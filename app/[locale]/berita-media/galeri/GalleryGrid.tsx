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

export default function GalleryGrid({ mediaItems }: { mediaItems: MediaItem[] }) {
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const [visibleItems, setVisibleItems] = useState(16);

    const sortedMedia = [...mediaItems].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });

    const filteredItems = sortedMedia;

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <>
            {/* Category filter removed */}

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 mb-16">
                {filteredItems.length > 0 ? (
                    filteredItems.slice(0, visibleItems).map((media, index) => {
                        const videoId = media.mediaType === 'video' ? getYouTubeId(media.filePath) : null;
                        const displayThumbnail = media.mediaType === 'video'
                            ? (media.thumbnailPath || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/images/galeri_placeholder.png"))
                            : (media.filePath || media.thumbnailPath || "/images/galeri_placeholder.png");

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

                                <div className="relative h-44 sm:h-72 overflow-hidden">
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
                                    <div className="absolute bottom-4 left-6">
                                        <div className="flex items-center gap-4 text-xs text-white/80">
                                            <span className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {media.createdAt ? new Date(media.createdAt).toLocaleDateString('id-ID') : '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-8">
                                    <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-3 group-hover:text-cyber-blue transition-colors line-clamp-1">
                                        {media.title}
                                    </h3>
                                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-6 hidden sm:block">
                                        {media.description || "Dokumentasi kegiatan kampus."}
                                    </p>
                                    <div className="flex items-center justify-between gap-2">
                                        <Badge variant="secondary" className="bg-foreground/5 text-foreground/60 border-none font-bold text-[8px] sm:text-xs">
                                            {media.mediaType === 'video' ? 'VIDEO' : 'FOTO'}
                                        </Badge>
                                        <Button variant="default" className="rounded-full h-7 sm:h-9 px-3 sm:px-5 text-[10px] sm:text-xs font-bold shadow-md hover:scale-105 transition-all duration-300">
                                            Detail
                                        </Button>
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

            {filteredItems.length > visibleItems && (
                <div className="flex justify-center mb-20">
                    <Button
                        onClick={() => setVisibleItems(prev => prev + 12)}
                        className="group relative px-10 h-14 rounded-full bg-cyber-blue text-black font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Lihat Lainnya
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                </div>
            )}


            <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
                <DialogContent showCloseButton={false} className="max-w-[95vw] lg:max-w-5xl bg-black border-none p-0 overflow-visible rounded-xl gap-0 shadow-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedMedia?.title}</DialogTitle>
                    </DialogHeader>

                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="fixed lg:absolute -top-12 lg:-top-2 lg:-right-12 z-[100] rounded-full w-10 h-10 shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-auto border border-white/20"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X className="w-5 h-5" />
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
