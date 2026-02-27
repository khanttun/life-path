"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface OpportunityScoreProps {
  score: number
  label: string
  trend?: "up" | "down" | "neutral"
  trendLabel?: string
  className?: string
}

export function OpportunityScore({
  score,
  label,
  trend = "neutral",
  trendLabel,
  className,
}: OpportunityScoreProps) {
  const pct = Math.min(score, 100)
  const bgColor =
    pct >= 70 ? "from-success/20 to-success/5" :
    pct >= 40 ? "from-warning/20 to-warning/5" :
    "from-danger/20 to-danger/5"

  const textColor =
    pct >= 70 ? "text-success" :
    pct >= 40 ? "text-warning" :
    "text-danger"

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div className={cn("glass-card rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {trendLabel && (
          <span className={cn("flex items-center gap-1 text-xs font-medium", textColor)}>
            <TrendIcon className="size-3" />
            {trendLabel}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end gap-1">
        <span className={cn("text-3xl font-bold tabular-nums", textColor)}>{score}</span>
        <span className="mb-1 text-sm text-muted-foreground">/100</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out", bgColor)}
          style={{ width: pct + "%" }}
        />
      </div>
    </div>
  )
}
