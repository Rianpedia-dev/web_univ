"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { ShareEventDialog } from "@/components/ShareEventDialog";

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
}

export function EventShareButton({ event, universityName, universityLogo }: EventShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    };

    return (
        <>
            <Button
                variant="default"
                className="flex-1 h-11 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-lg hover:scale-105 transition-all duration-300 group"
                onClick={handleOpen}
            >
                Bagikan
                <Share2 className="w-3.5 h-3.5 ml-2 transition-transform group-hover:rotate-12" />
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
