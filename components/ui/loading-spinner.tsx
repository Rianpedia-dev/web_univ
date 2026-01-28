import { cn } from "@/lib/utils"
import { Loader2, GraduationCap } from "lucide-react"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
    className?: string
    text?: string
}

export function LoadingSpinner({
    size = 48,
    className,
    text,
    ...props
}: LoadingSpinnerProps) {
    return (
        <div
            className={cn("flex flex-col items-center justify-center gap-4", className)}
            {...props}
        >
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-muted/30"></div>
                    <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>

                {/* Centered Graduation Cap */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap
                        className="text-primary animate-bounce"
                        size={24}
                        style={{ animationDuration: '2s' }}
                    />
                </div>
            </div>

            {text && (
                <p className="text-sm text-foreground/80 animate-pulse font-bold tracking-widest uppercase">
                    {text}
                </p>
            )}
        </div>
    )
}

interface FullPageSpinnerProps extends LoadingSpinnerProps {
    blur?: boolean
}

export function FullPageSpinner({
    blur = true,
    className,
    ...props
}: FullPageSpinnerProps) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-auto",
                className
            )}
        >
            <LoadingSpinner {...props} />
        </div>
    )
}
