"use client";

import React from "react";
import { Mail, User } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { MotionDiv } from "@/components/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AdmissionStaffProps {
    staff: any[];
}

export default function AdmissionStaff({ staff }: AdmissionStaffProps) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((member, index) => (
                    <MotionDiv
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="glass-card overflow-hidden hover:border-cyber-blue/50 transition-all duration-300 group">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative">
                                        <Avatar className="w-24 h-24 border-2 border-muted group-hover:border-cyber-blue/50 transition-all duration-300 shadow-xl">
                                            {member.image ? (
                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-muted">
                                                    <User className="w-12 h-12 text-muted-foreground" />
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-cyber-blue transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm font-medium text-cyber-blue/70 uppercase tracking-wider">
                                            {member.position}
                                        </p>
                                    </div>

                                    <div className="w-full pt-4 space-y-3 border-t border-border/50">
                                        {member.whatsapp && (
                                            <a
                                                href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-3 text-sm text-muted-foreground hover:text-green-500 transition-colors w-full p-2 rounded-lg hover:bg-green-500/5 group/link"
                                            >
                                                <IconBrandWhatsapp className="w-5 h-5 group-hover/link:animate-bounce" />
                                                <span>{member.whatsapp}</span>
                                            </a>
                                        )}
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="flex items-center justify-center gap-3 text-sm text-muted-foreground hover:text-cyber-blue transition-colors w-full p-2 rounded-lg hover:bg-cyber-blue/5 group/link"
                                            >
                                                <Mail className="w-4 h-4" />
                                                <span>{member.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </MotionDiv>
                ))}
            </div>
        </div>
    );
}
