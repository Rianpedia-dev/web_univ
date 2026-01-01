"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MotionDiv } from "@/components/motion-wrapper"
import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
    id: string
    name: string
    role: string | null
    content: string
    image: string | null
    rating: number
}

interface TestimonialsCarouselProps {
    testimonials: Testimonial[]
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <div className="relative px-12">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 p-4">
                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 h-full rounded-[2.5rem] border border-white/10 relative overflow-hidden group flex flex-col shadow-xl"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-16 h-16 text-cyber-blue rotate-180" suppressHydrationWarning />
                                </div>

                                <div className="flex items-center gap-1 mb-8 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "w-4 h-4 fill-current",
                                                i >= (Number(testimonial.rating) || 5) && "text-foreground/20"
                                            )}
                                            suppressHydrationWarning
                                        />
                                    ))}
                                </div>

                                <p className="text-foreground/80 text-lg italic mb-10 relative z-10 leading-relaxed flex-1">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-5 relative z-10 mt-auto pt-6 border-t border-white/5">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyber-blue/30 shadow-lg flex-shrink-0 group-hover:border-cyber-blue transition-colors duration-500">
                                        <img
                                            src={testimonial.image || "/images/testimoni.png"}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-foreground group-hover:text-cyber-blue transition-colors">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-foreground/50 text-sm font-medium tracking-wide">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </MotionDiv>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex items-center justify-center gap-4 mt-8 md:mt-0">
                    <CarouselPrevious className="static md:absolute -left-12 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-md border-white/10 hover:bg-cyber-blue hover:text-white" />
                    <CarouselNext className="static md:absolute -right-12 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-md border-white/10 hover:bg-cyber-blue hover:text-white" />
                </div>
            </Carousel>
        </div>
    )
}
