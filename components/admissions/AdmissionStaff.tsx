"use client";

import React from "react";
import { Mail, User, Maximize2 } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface AdmissionStaffProps {
    staff: any[];
}

export default function AdmissionStaff({ staff }: AdmissionStaffProps) {
    const [selectedMember, setSelectedMember] = React.useState<any>(null);

    if (!staff || staff.length === 0) return null;

    return (
        <div id="tim-pmb" className="space-y-12">
            <div className="text-center space-y-3">
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
                        Tim <span className="text-cyber-blue">Penerimaan Mahasiswa Baru (PMB)</span>
                    </h2>
                    <div className="w-16 h-1 bg-cyber-blue mx-auto mt-2 rounded-full opacity-60"></div>
                </MotionDiv>
                <p className="text-muted-foreground max-w-xl mx-auto text-base">
                    Hubungi tim kami untuk mendapatkan informasi lebih lanjut mengenai pendaftaran.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {staff.map((member, index) => (
                    <MotionDiv
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="glass-card overflow-hidden hover:border-cyber-blue/50 transition-all duration-300 group h-full">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="relative cursor-pointer group/avatar" onClick={() => member.image && setSelectedMember(member)}>
                                        <Avatar className="size-16 md:size-24 border-2 border-muted group-hover/avatar:border-cyber-blue transition-all duration-300 shadow-xl">
                                            {member.image ? (
                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-muted">
                                                    <User className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground" />
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        {member.image && (
                                            <div className="absolute inset-0 bg-black/40 dark:bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                                <div className="p-1.5 bg-cyber-blue rounded-full shadow-lg">
                                                    <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-[#ffffff]" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-0.5 md:space-y-1">
                                        <h3 className="text-sm md:text-xl font-bold text-foreground group-hover:text-cyber-blue transition-colors line-clamp-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-[10px] md:text-sm font-medium text-cyber-blue/70 uppercase tracking-wider line-clamp-1">
                                            {member.position}
                                        </p>
                                    </div>

                                    <div className="w-full pt-3 space-y-2 border-t border-border/50">
                                        {member.whatsapp && (
                                            <a
                                                href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm text-muted-foreground hover:text-green-500 transition-colors w-full p-1.5 md:p-2 rounded-lg hover:bg-green-500/5 group/link"
                                            >
                                                <IconBrandWhatsapp className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover/link:animate-bounce" />
                                                <span className="line-clamp-1">{member.whatsapp}</span>
                                            </a>
                                        )}
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm text-muted-foreground hover:text-cyber-blue transition-colors w-full p-1.5 md:p-2 rounded-lg hover:bg-cyber-blue/5 group/link"
                                            >
                                                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                <span className="line-clamp-1">{member.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </MotionDiv>
                ))}
            </div>

            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
                <DialogContent className="max-w-md p-0 overflow-hidden bg-transparent border-none shadow-2xl">
                    <div className="relative group/dialog">
                        <DialogTitle className="sr-only">Foto {selectedMember?.name}</DialogTitle>
                        <DialogDescription className="sr-only">Tampilan penuh foto {selectedMember?.name}</DialogDescription>
                        {selectedMember?.image && (
                            <img
                                src={selectedMember.image}
                                alt={selectedMember.name}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                            />
                        )}
                        <div className="dark absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 z-20">
                            <p className="text-[#ffffff] font-bold text-center text-sm md:text-base leading-tight">
                                {selectedMember?.name}
                            </p>
                            <p className="text-[#00f0ff] text-center text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-1">
                                {selectedMember?.position}
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
