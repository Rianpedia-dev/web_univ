"use client";

import { BackToTop } from "@/components/back-to-top";

export function BackToTopWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BackToTop />
    </>
  );
}