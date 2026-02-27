import { cn } from "@/lib/utils"

type RiskLevel = "low" | "medium" | "high"

interface RiskBadgeProps {
  level: RiskLevel
  label: string
  className?: string
}

const riskConfig: Record<RiskLevel, { bg: string; text: string; dot: string }> =
  {
    low: {
      bg: "bg-success/10",
      text: "text-success",
      dot: "bg-success",
    },
    medium: {
      bg: "bg-warning/10",
      text: "text-warning",
      dot: "bg-warning",
    },
    high: {
      bg: "bg-danger/10",
      text: "text-danger",
      dot: "bg-danger",
    },
  }

export function RiskBadge({ level, label, className }: RiskBadgeProps) {
  const config = riskConfig[level]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        config.bg,
        config.text,
        className
      )}
    >
      <span
        className={cn("size-2 rounded-full", config.dot)}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
