"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { ShareEventDialog } from "@/components/ShareEventDialog";
import { cn } from "@/lib/utils";

interface Event {
    id: string;
    title: string;
    description: string;
    categoryName: string | null;
    startDate: Date | null;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    location: string;
    venue: string | null;
    poster: string | null;
    organizer: string;
    targetAudience: string | null;
    registrationFee: string | null;
}

interface EventShareButtonProps {
    event: any; // Type 'any' for flexibility with database types, but we cast to Event in usage
    universityName?: string;
    universityLogo?: string | null;
    disabled?: boolean;
}

export function EventShareButton({ event, universityName, universityLogo, disabled }: EventShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    };

    return (
        <>
            <Button
                variant="outline"
                disabled={disabled}
                className={cn(
                    "flex-1 h-11 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-sm transition-all duration-300 group relative overflow-hidden",
                    "border-cyber-blue/20 text-foreground hover:text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/5",
                    disabled && "opacity-50 cursor-not-allowed hover:border-cyber-blue/20 hover:bg-transparent hover:text-foreground"
                )}
                onClick={handleOpen}
            >
                <span className="relative z-10 flex items-center justify-center w-full">
                    Bagikan
                    <Share2 className="w-3.5 h-3.5 ml-2 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:text-cyber-blue" />
                </span>
            </Button>

            <ShareEventDialog
                event={event}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                universityName={universityName}
                universityLogo={universityLogo}
            />
        </>
    );
}


