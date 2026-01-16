import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
    className?: string
    text?: string
}

export function LoadingSpinner({
    size = 24,
    className,
    text,
    ...props
}: LoadingSpinnerProps) {
    return (
        <div
            className={cn("flex flex-col items-center justify-center gap-3", className)}
            {...props}
        >
            <Loader2
                className="animate-spin text-primary"
                size={size}
            />
            {text && (
                <p className="text-sm text-muted-foreground animate-pulse font-medium">
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
                "fixed inset-0 z-50 flex items-center justify-center",
                blur ? "bg-background/80 backdrop-blur-sm" : "bg-background",
                className
            )}
        >
            <LoadingSpinner {...props} />
        </div>
    )
}
