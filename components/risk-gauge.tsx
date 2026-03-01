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
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className="relative flex items-center justify-center" 
        style={{ width: size, height: size * 0.55 }} 
      >
        <svg
          viewBox="0 0 100 80"
          className="overflow-visible"
          style={{ width: size, height: size * 0.75 }}
        >
          <path
            d="M 10 70 A 40 40 0 1 1 90 70"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 10 70 A 40 40 0 1 1 90 70"
            fill="none"
            stroke={color.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={halfCircumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute top-[65%] left-1/2 -translate-x-1/2">
          <span className={cn("text-3xl font-black tabular-nums tracking-tighter leading-none", color.label)}>
            {Math.round(animated)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center px-2 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-foreground">
          {label}
        </span>
      </div>
    </div>
  )
}