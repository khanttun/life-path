"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RiskGaugeProps {
  value: number
  max?: number
  label: string
  size?: number
  className?: string
}

function getColor(value: number, max: number) {
  const pct = value / max
  if (pct >= 0.7) return { stroke: "#22C55E", label: "text-success" }
  if (pct >= 0.4) return { stroke: "#F59E0B", label: "text-warning" }
  return { stroke: "#EF4444", label: "text-danger" }
}

export function RiskGauge({
  value,
  max = 100,
  label,
  size = 120,
  className,
}: RiskGaugeProps) {
  const [animated, setAnimated] = useState(0)
  const color = getColor(value, max)

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const halfCircumference = circumference * 0.75
  const offset = halfCircumference - (animated / max) * halfCircumference

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(value), 100)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size * 0.75 }}>
        <svg
          viewBox="0 0 100 75"
          className="overflow-visible"
          style={{ width: size, height: size * 0.75 }}
        >
          {/* Background track */}
          <path
            d="M 10 70 A 40 40 0 1 1 90 70"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Animated fill */}
          <path
            d="M 10 70 A 40 40 0 1 1 90 70"
            fill="none"
            stroke={color.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={halfCircumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <span className={cn("text-2xl font-bold tabular-nums", color.label)}>
            {animated}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
