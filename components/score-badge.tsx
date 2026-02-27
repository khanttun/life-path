import { cn } from "@/lib/utils"

type ScoreBadgeVariant = "success" | "warning" | "danger" | "neutral"

interface ScoreBadgeProps {
  score: number
  label?: string
  variant?: ScoreBadgeVariant
  size?: "sm" | "md" | "lg"
  className?: string
}

function getAutoVariant(score: number): ScoreBadgeVariant {
  if (score >= 70) return "success"
  if (score >= 40) return "warning"
  return "danger"
}

const variantStyles: Record<ScoreBadgeVariant, string> = {
  success: "bg-[#22C55E]/10 text-[#16A34A] border-[#22C55E]/20",
  warning: "bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/20",
  danger: "bg-[#EF4444]/10 text-[#DC2626] border-[#EF4444]/20",
  neutral: "bg-secondary text-primary border-primary/20",
}

const sizeStyles: Record<string, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5 font-semibold",
}

export function ScoreBadge({
  score,
  label,
  variant,
  size = "md",
  className,
}: ScoreBadgeProps) {
  const resolvedVariant = variant ?? getAutoVariant(score)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        variantStyles[resolvedVariant],
        sizeStyles[size],
        className
      )}
    >
      <span className="font-bold">{score}%</span>
      {label && <span className="opacity-80">{label}</span>}
    </span>
  )
}
