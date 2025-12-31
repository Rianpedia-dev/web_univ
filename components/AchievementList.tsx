"use client";

import { useState } from "react";
import { AchievementCard } from "@/components/AchievementCard";
import { Input } from "@/components/ui/input";
import { Search, Trophy } from "lucide-react";

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

interface AchievementListProps {
    achievements: Achievement[];
    universityProfile: any;
}

export function AchievementList({ achievements, universityProfile }: AchievementListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAchievements = achievements.filter((prestasi) => {
        const query = searchQuery.toLowerCase();
        return (
            prestasi.studentId.toLowerCase().includes(query) ||
            prestasi.studentName.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-10">
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan NIM atau Nama..."
                        className="pl-10 h-11 bg-black/40 border-white/10 text-white placeholder:text-muted-foreground focus:border-cyan-400/50 focus:ring-cyan-400/20 backdrop-blur-xl transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAchievements.length > 0 ? (
                    filteredAchievements.map((prestasi, index) => (
                        <AchievementCard
                            key={prestasi.id}
                            prestasi={prestasi}
                            index={index}
                            universityName={universityProfile?.name || 'Universitas'}
                            universityLogo={universityProfile?.logo || null}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-card/20 animate-fade-in">
                        <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-10" />
                        <p className="text-muted-foreground italic">
                            Tidak ditemukan prestasi dengan kata kunci "<span className="text-cyber-blue">{searchQuery}</span>"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
