"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Award,
    Trophy,
    Star,
    Calendar,
    Globe,
    Heart,
    Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShareAchievementDialog } from "@/components/ShareAchievementDialog";

interface Achievement {
    id: string;
    studentId: string;
    studentName: string;
    studyProgramName: string | null;
    title: string;
    description: string | null;
    achievementType: "non_academic" | "competition" | "community_service" | "other";
    achievementLevel: "local" | "regional" | "national" | "international";
    achievementCategory: "first" | "second" | "third" | "champion" | "participation" | "other";
    eventName: string;
    eventDate: Date;
    organizer: string;
    image: string | null;
    supportingDocuments: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface AchievementCardProps {
    prestasi: Achievement;
    index: number;
    universityName: string;
    universityLogo: string | null;
}

export function AchievementCard({ prestasi, index, universityName, universityLogo }: AchievementCardProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);

    const getIcon = (type: string) => {
        switch (type) {
            case "competition":
                return Trophy;
            case "non_academic":
                return Star;
            case "community_service":
                return Heart;
            default:
                return Award;
        }
    };

    const IconComponent = getIcon(prestasi.achievementType);

    return (
        <>
            <div
                className="glass-card rounded-2xl border border-white/10 overflow-hidden hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
                            {prestasi.image ? (
                                <img
                                    src={prestasi.image}
                                    alt={prestasi.studentName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <IconComponent className="w-7 h-7 text-white" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground line-clamp-1">
                                {prestasi.studentName || "Mahasiswa"}
                            </h3>
                            <p className="text-xs font-semibold text-foreground/80 mb-1">
                                NIM: {prestasi.studentId}
                            </p>
                            {prestasi.studyProgramName && (
                                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-tight">
                                    {prestasi.studyProgramName}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                                {prestasi.achievementType.replace("_", " ")}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold text-lg text-foreground mb-1 line-clamp-2">
                            {prestasi.title}
                        </h4>
                        <p className="text-sm font-medium text-cyber-blue mb-3">
                            Nama Kegiatan: {prestasi.eventName}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                            "{prestasi.description}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase text-muted-foreground font-bold">
                                Tingkat
                            </span>
                            <p className="text-sm font-bold text-foreground capitalize flex items-center gap-1">
                                <Globe className="w-3 h-3 text-cyber-blue" />
                                {prestasi.achievementLevel}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase text-muted-foreground font-bold">
                                Tahun
                            </span>
                            <p className="text-sm font-bold text-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-electric-purple" />
                                {prestasi.eventDate
                                    ? new Date(prestasi.eventDate).getFullYear()
                                    : "-"}
                            </p>
                        </div>
                        <div className="col-span-2 space-y-1 pt-2 border-t border-border/50">
                            <span className="text-[10px] uppercase text-muted-foreground font-bold">
                                Kategori Juara
                            </span>
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-bold">
                                {prestasi.achievementCategory}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            className="flex-1 w-full"
                            onClick={() => setIsShareOpen(true)}
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Bagikan
                        </Button>
                    </div>
                </div>
            </div>

            <ShareAchievementDialog
                achievement={prestasi}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                universityName={universityName}
                universityLogo={universityLogo}
            />
        </>
    );
}
