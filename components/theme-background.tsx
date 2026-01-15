"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { GLBackground } from "./gl/background"
import { FloatingPaths } from "./background-paths"

export function ThemeBackground() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Ensure component is mounted on client to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {resolvedTheme === "dark" ? (
                <div className="absolute inset-0">
                    <GLBackground />
                </div>
            ) : (
                <div className="absolute inset-0 bg-slate-50">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                    {/* Decorative blobs for Light Mode */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
                    {/* Radial grid for Light Mode */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
                </div>
            )}
        </div>
    )
}
