"use client";

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion-wrapper";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    MapPin,
    Clock,
    Users,
    Phone,
    Maximize2,
    Building2,
    Library,
    Laptop,
    Dumbbell,
    Coffee,
    Car,
    BookOpen
} from "lucide-react";

interface CampusFacility {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string | null;
    location: string | null;
    capacity: number | null;
    facilities: string | null;
    image: string | null;
    operatingHours: string | null;
    contactPerson: string | null;
    contactPhone: string | null;
    isAvailable: boolean;
}

interface Props {
    facilities: CampusFacility[];
}

export function CampusFacilitiesList({ facilities }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState<string>("");

    const getFacilityIcon = (type: string | null) => {
        switch (type?.toLowerCase()) {
            case 'perpustakaan':
            case 'library':
                return Library;
            case 'laboratorium':
            case 'lab':
                return Laptop;
            case 'olahraga':
            case 'sport':
                return Dumbbell;
            case 'kafetaria':
            case 'kantin':
                return Coffee;
            case 'parkir':
                return Car;
            case 'ruang kelas':
            case 'classroom':
                return BookOpen;
            default:
                return Building2;
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility, index) => {
                    const IconComponent = getFacilityIcon(facility.type);
                    return (
                        <MotionDiv
                            key={facility.id}
                            className="glass-card rounded-2xl border overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden cursor-pointer group/img"
                                onClick={() => facility.image && (setSelectedImage(facility.image), setSelectedName(facility.name))}>
                                {facility.image ? (
                                    <>
                                        <img
                                            src={facility.image}
                                            alt={facility.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-cyber-blue rounded-full flex items-center justify-center transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                                                <Maximize2 className="w-6 h-6 text-slate-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-electric-purple/20 flex items-center justify-center">
                                        <IconComponent className="w-16 h-16 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
                                    </div>
                                )}

                                {/* Badges Overlay */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 scale-90 origin-top-right">
                                    <Badge className={facility.isAvailable ? 'bg-green-500/90' : 'bg-red-500/90'}>
                                        {facility.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                                    </Badge>
                                </div>
                                {facility.type && (
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-electric-purple/80 backdrop-blur-sm px-3 py-1 border-none shadow-lg">{facility.type}</Badge>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyber-blue transition-colors">{facility.name}</h3>
                                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                                    {facility.description || 'Fasilitas modern untuk mendukung kegiatan kampus profesional.'}
                                </p>

                                <div className="space-y-3 mb-6">
                                    {facility.location && (
                                        <div className="flex items-center gap-3 text-sm group/item">
                                            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center group-hover/item:bg-cyber-blue/20 transition-colors">
                                                <MapPin className="w-4 h-4 text-cyber-blue" />
                                            </div>
                                            <span className="text-muted-foreground">{facility.location}</span>
                                        </div>
                                    )}
                                    {facility.operatingHours && (
                                        <div className="flex items-center gap-3 text-sm group/item">
                                            <div className="w-8 h-8 rounded-lg bg-electric-purple/10 flex items-center justify-center group-hover/item:bg-electric-purple/20 transition-colors">
                                                <Clock className="w-4 h-4 text-electric-purple" />
                                            </div>
                                            <span className="text-muted-foreground">{facility.operatingHours}</span>
                                        </div>
                                    )}
                                    {facility.capacity && (
                                        <div className="flex items-center gap-3 text-sm group/item">
                                            <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center group-hover/item:bg-neon-green/20 transition-colors">
                                                <Users className="w-4 h-4 text-neon-green" />
                                            </div>
                                            <span className="text-muted-foreground">Kapasitas: {facility.capacity} orang</span>
                                        </div>
                                    )}
                                </div>

                                {/* Fasilitas Tambahan */}
                                {facility.facilities && (
                                    <div className="pt-4 border-t border-border/50">
                                        <div className="flex flex-wrap gap-2">
                                            {facility.facilities.split(',').slice(0, 3).map((item, idx) => (
                                                <Badge key={idx} variant="outline" className="border-cyber-blue/20 bg-cyber-blue/5 text-[10px] uppercase tracking-wider px-2">
                                                    {item.trim()}
                                                </Badge>
                                            ))}
                                            {facility.facilities.split(',').length > 3 && (
                                                <Badge variant="outline" className="border-muted/30 text-[10px] px-2">
                                                    +{facility.facilities.split(',').length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </MotionDiv>
                    );
                })}
            </div>

            {/* Image Preview Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-2xl transition-all">
                    <div className="relative group/dialog">
                        <DialogTitle className="sr-only">Foto {selectedName}</DialogTitle>
                        <DialogDescription className="sr-only">Tampilan penuh foto fasilitas {selectedName}</DialogDescription>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt={selectedName}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-cyber-blue"
                            />
                        )}
                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#000000]/60 backdrop-blur-md border border-white/10 translate-y-2 group-hover/dialog:translate-y-0 opacity-100 transition-all duration-300">
                            <p className="text-[#ffffff] font-bold text-center text-lg tracking-wide">{selectedName}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
