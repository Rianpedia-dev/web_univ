"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, Eye } from "lucide-react";

interface EventPosterProps {
    src: string | null;
    alt: string;
    children?: React.ReactNode;
}

export function EventPoster({ src, alt, children }: EventPosterProps) {
    if (!src) {
        return (
            <div className="relative h-64 w-full overflow-hidden bg-muted/20">
                <div className="w-full h-full flex items-center justify-center opacity-20">
                    <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
                {children}
            </div>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative h-64 w-full overflow-hidden bg-muted/20 cursor-pointer group">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay for hover effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex flex-col items-center gap-2">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] max-h-[95vh] w-fit h-fit p-0 bg-transparent border-none shadow-none outline-none flex items-center justify-center overflow-visible">
                <DialogTitle className="sr-only">Poster: {alt}</DialogTitle>
                <DialogDescription className="sr-only">Poster lengkap untuk {alt}</DialogDescription>
                <div className="relative group/modal">
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
