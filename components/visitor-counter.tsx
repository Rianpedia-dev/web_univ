"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const incrementAndFetch = async () => {
            const SESSION_KEY = "site_visit_counted";
            const lastCountTime = sessionStorage.getItem(SESSION_KEY);
            const now = Date.now();
            const COOLDOWN = 10 * 1000;

            try {
                if (!lastCountTime || (now - parseInt(lastCountTime) > COOLDOWN)) {
                    const response = await fetch("/api/analytics/visitor-count", {
                        method: "POST",
                    });
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                        sessionStorage.setItem(SESSION_KEY, now.toString());
                    }
                } else {
                    const response = await fetch("/api/analytics/visitor-count");
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                    }
                }
            } catch (error) {
                console.error("Visitor count error:", error);
            }
        };

        incrementAndFetch();
    }, []);

    if (count === null) return null;

    return (
        <div className="group relative flex items-center gap-3 px-4 py-2 rounded-xl bg-background/40 backdrop-blur-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-500 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] overflow-hidden">
            {/* Efek kilauan latar belakang (Glow effect) */}
            <div className="absolute -inset-px bg-gradient-to-r from-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Ikon Futuristik dengan radar pulse */}
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-cyber-blue/20 blur-lg animate-pulse" />
                <Activity className="w-4 h-4 text-cyber-blue relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full shadow-[0_0_5px_#39FF14]" />
            </div>

            {/* Garis Pemisah Vertikal (Separator) */}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Konten Teks */}
            <div className="flex flex-col -space-y-1">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-cyber-blue/60 leading-none mb-0.5">
                    Traffic
                </span>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black font-mono tracking-tighter text-foreground leading-none">
                        {count.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-tight">
                        Total
                    </span>
                </div>
            </div>
        </div>
    );
}