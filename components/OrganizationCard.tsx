"use client";

import { useState } from "react";
import { Users, UserCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Employee {
    id: string;
    name: string;
    positionName: string;
    positionLevel: number;
    positionOrder: number;
    photo?: string | null;
    nidn?: string | null;
    description?: string | null;
}

interface OrganizationCardProps {
    employee: Employee;
    size: "large" | "medium" | "small";
}

export function OrganizationCard({ employee, size }: OrganizationCardProps) {
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

    const sizeClasses = {
        large: {
            container: "max-w-sm w-full",
            photoWrapper: "w-56 aspect-[3/4]",
            photoRadius: "rounded-[2rem]",
            innerRadius: "rounded-[1.8rem]",
            iconSize: "w-20 h-20",
            nameSize: "text-xl",
            nidnSize: "text-xs",
            descSize: "text-sm",
        },
        medium: {
            container: "w-full",
            photoWrapper: "w-48 aspect-[3/4]",
            photoRadius: "rounded-[2rem]",
            innerRadius: "rounded-[1.8rem]",
            iconSize: "w-16 h-16",
            nameSize: "text-xl",
            nidnSize: "text-xs",
            descSize: "text-sm",
        },
        small: {
            container: "w-full",
            photoWrapper: "w-44 aspect-[3/4]",
            photoRadius: "rounded-3xl",
            innerRadius: "rounded-[1.5rem]",
            iconSize: "w-14 h-14",
            nameSize: "text-lg",
            nidnSize: "text-[10px]",
            descSize: "text-[11px]",
        },
    };

    const styles = sizeClasses[size];
    const IconComponent = size === "small" ? UserCheck : Users;

    return (
        <>
            <div className={`glass-card p-6 text-center ${size === "large" ? "rounded-[2.5rem]" : "rounded-[3rem]"} border border-white/10 hover:border-foreground/${size === "large" ? "50" : "30"} group transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,${size === "large" ? "0.1" : "0.05"})] bg-gradient-to-b from-white/5 to-transparent h-full flex flex-col`}>
                {/* Clickable Photo Container */}
                <div
                    className={`${styles.photoWrapper} mx-auto mb-4 p-${size === "large" ? "1" : "1.5"} ${styles.photoRadius} bg-foreground/${size === "large" ? "20" : "10"} group-hover:bg-foreground/${size === "large" ? "40" : "20"} transition-all duration-700 relative cursor-pointer`}
                    onClick={() => employee.photo && setIsImageDialogOpen(true)}
                >
                    <div className={`absolute inset-0 bg-foreground/${size === "large" ? "10" : "5"} blur-${size === "large" ? "2xl" : "xl"} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-full h-full bg-background ${styles.innerRadius} overflow-hidden relative z-10 border-2 border-white/5`}>
                        {employee.photo ? (
                            <img
                                src={employee.photo}
                                alt={employee.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-foreground/5">
                                <IconComponent className={`${styles.iconSize} text-foreground/30`} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Employee Info */}
                <h4 className={`${styles.nameSize} font-bold text-foreground mb-1 group-hover:text-foreground transition-colors leading-tight`}>
                    {employee.name}
                </h4>
                <Badge
                    variant="outline"
                    className={`mb-2 border-foreground/30 text-foreground bg-foreground/5 self-center max-w-full text-center whitespace-normal ${size === "small" ? "text-[8px] uppercase font-bold tracking-wider leading-tight py-1" : "text-[10px]"}`}
                >
                    {employee.positionName}
                </Badge>
                {employee.nidn && (
                    <p className={`${styles.nidnSize} text-muted-foreground/80 mb-2 font-mono`}>
                        NIDN: {employee.nidn}
                    </p>
                )}

                {/* Description */}
                <div className="pt-2 border-t border-white/5 text-left flex-1">
                    {size === "small" ? (
                        employee.description && (
                            <p className="text-[11px] text-muted-foreground/60 line-clamp-3 leading-relaxed border-l-2 border-foreground/20 pl-3">
                                {employee.description}
                            </p>
                        )
                    ) : (
                        <p className={`${styles.descSize} text-muted-foreground/80 ${size === "medium" ? "mb-4" : "mb-2"} line-clamp-4 leading-relaxed`}>
                            {employee.description || (size === "large"
                                ? 'Pimpinan tertinggi yang bertanggung jawab atas seluruh operasional universitas.'
                                : 'Fokus pada pengembangan strategis bidang tersebut.')}
                        </p>
                    )}
                </div>
            </div>

            {/* Full Image Dialog */}
            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                <DialogContent className="max-w-3xl p-2 bg-background/95 backdrop-blur-xl border-white/20">
                    <DialogTitle className="sr-only">Foto {employee.name}</DialogTitle>
                    <div className="relative w-full aspect-[3/4] max-h-[85vh] rounded-xl overflow-hidden">
                        {employee.photo && (
                            <img
                                src={employee.photo}
                                alt={employee.name}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                    <div className="text-center pb-2">
                        <h3 className="text-lg font-bold text-foreground">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.positionName}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
