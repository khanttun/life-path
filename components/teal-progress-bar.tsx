import { cn } from "@/lib/utils"

type ProgressBarVariant = "primary" | "success" | "warning" | "danger" | "auto"

interface TealProgressBarProps {
  value: number
  max?: number
  variant?: ProgressBarVariant
  showLabel?: boolean
  label?: string
  height?: "sm" | "md" | "lg"
  className?: string
}

function getAutoColor(pct: number): string {
  if (pct >= 70) return "bg-[#22C55E]"
  if (pct >= 40) return "bg-[#F59E0B]"
  return "bg-[#EF4444]"
}

const variantColors: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-[#22C55E]",
  warning: "bg-[#F59E0B]",
  danger: "bg-[#EF4444]",
}

const heightStyles: Record<string, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
}

export function TealProgressBar({
  value,
  max = 100,
  variant = "primary",
  showLabel = false,
  label,
  height = "md",
  className,
}: TealProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const barColor =
    variant === "auto" ? getAutoColor(pct) : variantColors[variant]

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showLabel && (
            <span className="font-semibold text-foreground">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          heightStyles[height]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
