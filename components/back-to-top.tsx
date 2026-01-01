"use client";

import { useState, useEffect } from "react";
import { ArrowUpToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!mounted) return null;

  return (
    <>
      {isVisible && (
        <Button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          variant="outline"
          size="icon"
          suppressHydrationWarning
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg text-cyber-blue border-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue dark:text-electric-purple dark:border-electric-purple dark:hover:bg-electric-purple/10 dark:hover:text-electric-purple"
        >
          <ArrowUpToLine className="h-5 w-5" suppressHydrationWarning />
        </Button>
      )}
    </>
  );
}