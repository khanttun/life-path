"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Region {
  id: string
  name: string
  x: number
  y: number
  demand: number
  safety: number
  avgSalary: number
}

const regions: Region[] = [
  { id: "north", name: "Northern", x: 145, y: 75, demand: 62, safety: 82, avgSalary: 18000 },
  { id: "northeast", name: "Northeastern (Isan)", x: 235, y: 110, demand: 45, safety: 78, avgSalary: 14000 },
  { id: "central", name: "Central", x: 170, y: 165, demand: 78, safety: 75, avgSalary: 25000 },
  { id: "bangkok", name: "Bangkok", x: 185, y: 195, demand: 95, safety: 68, avgSalary: 35000 },
  { id: "east", name: "Eastern (EEC)", x: 230, y: 195, demand: 88, safety: 80, avgSalary: 28000 },
  { id: "west", name: "Western", x: 120, y: 180, demand: 40, safety: 85, avgSalary: 16000 },
  { id: "south", name: "Southern", x: 140, y: 310, demand: 55, safety: 72, avgSalary: 20000 },
]

function getDemandColor(demand: number) {
  if (demand >= 80) return "fill-primary"
  if (demand >= 60) return "fill-primary/60"
  if (demand >= 40) return "fill-primary/30"
  return "fill-muted"
}

function getDemandRingColor(demand: number) {
  if (demand >= 80) return "stroke-primary"
  if (demand >= 60) return "stroke-primary/60"
  if (demand >= 40) return "stroke-primary/30"
  return "stroke-muted-foreground/30"
}

interface ThailandHeatmapProps {
  career?: string
  className?: string
}

export function ThailandHeatmap({ career = "Software Engineer", className }: ThailandHeatmapProps) {
  const [active, setActive] = useState<string | null>(null)
  const activeRegion = regions.find((r) => r.id === active)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Career Demand Heatmap</h3>
          <p className="text-xs text-muted-foreground">{"Showing demand for: " + career}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-full bg-primary" />
            High
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-full bg-primary/50" />
            Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-full bg-muted" />
            Low
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[360px]">
        {/* Simplified Thailand outline */}
        <svg viewBox="0 0 360 420" className="w-full" aria-label="Thailand career demand heatmap">
          {/* Thailand shape - simplified polygon */}
          <path
            d="M130 30 L180 20 L220 30 L260 50 L280 80 L290 120 L270 140 L260 160 L240 170 L230 180 L250 200 L250 220 L230 240 L220 220 L200 215 L185 230 L180 260 L170 280 L165 300 L170 320 L165 340 L155 360 L145 380 L130 390 L125 370 L120 350 L125 330 L130 310 L120 290 L115 270 L110 250 L100 230 L95 210 L100 190 L110 175 L120 165 L130 150 L140 130 L145 110 L150 90 L140 60 Z"
            fill="#E6F7F9"
            stroke="#0096A5"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />

          {/* Region dots */}
          {regions.map((region) => (
            <g key={region.id}>
              {/* Outer ring */}
              <circle
                cx={region.x}
                cy={region.y}
                r={region.demand >= 80 ? 22 : region.demand >= 60 ? 18 : 14}
                className={cn(getDemandRingColor(region.demand), "fill-none")}
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {/* Inner dot */}
              <circle
                cx={region.x}
                cy={region.y}
                r={region.demand >= 80 ? 12 : region.demand >= 60 ? 9 : 7}
                className={cn(
                  getDemandColor(region.demand),
                  "cursor-pointer transition-all hover:brightness-110"
                )}
                onMouseEnter={() => setActive(region.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === region.id ? null : region.id)}
              />
              {/* Label */}
              <text
                x={region.x}
                y={region.y + (region.demand >= 80 ? 30 : region.demand >= 60 ? 26 : 22)}
                textAnchor="middle"
                className="fill-muted-foreground text-[8px] font-medium"
              >
                {region.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {activeRegion && (
          <div className="glass-card-strong absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-xl p-3 shadow-lg">
            <p className="text-sm font-semibold text-foreground">{activeRegion.name}</p>
            <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
              <span>{"Demand: " + activeRegion.demand + "/100"}</span>
              <span>{"Safety: " + activeRegion.safety + "/100"}</span>
              <span>{"Avg Salary: \u0E3F" + activeRegion.avgSalary.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
