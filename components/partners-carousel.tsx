"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { MotionDiv } from "@/components/motion-wrapper"

interface Partner {
    id: string
    name: string
    logo: string | null
}

interface PartnersCarouselProps {
    partners: Partner[]
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
    )

    // Jika partner sedikit, duplikasi agar carousel bisa berputar (loop)
    // Kita butuh setidaknya cukup banyak item agar Embla bisa melakukan loop dengan smooth
    const extendedPartners = partners.length > 0 && partners.length < 12
        ? [...partners, ...partners, ...partners]
        : partners;

    // Mengelompokkan partner menjadi 2 baris (chunks of 2)
    const partnerChunks = [];
    for (let i = 0; i < extendedPartners.length; i += 2) {
        partnerChunks.push(extendedPartners.slice(i, i + 2));
    }

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {partnerChunks.map((chunk, chunkIndex) => (
                    <CarouselItem key={chunkIndex} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                        <div className="flex flex-col gap-4">
                            {chunk.map((partner, index) => (
                                <MotionDiv
                                    key={`${chunkIndex}-${partner.id}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (index) * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                    className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-center min-h-[100px] relative overflow-hidden group transition-all duration-300 hover:border-cyber-blue/30"
                                >
                                    <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-[0.03] transition-opacity -z-10"></div>
                                    <div className="text-center relative z-10 w-full flex items-center justify-center">
                                        {partner.logo ? (
                                            <div className="flex flex-col items-center gap-3">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="max-h-10 max-w-full object-contain transition-all duration-500"
                                                />
                                                <p className="font-medium text-foreground/70 group-hover:text-cyber-blue transition-colors text-[10px] truncate max-w-full">{partner.name}</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-gradient-cyber rounded-full mx-auto mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-500">
                                                    <span className="text-foreground font-bold text-lg">{partner.name.charAt(0)}</span>
                                                </div>
                                                <p className="font-medium text-foreground/80 group-hover:text-cyber-blue transition-colors text-xs truncate max-w-full">{partner.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </MotionDiv>
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
