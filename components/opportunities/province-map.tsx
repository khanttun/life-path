"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScoreBadge } from "@/components/score-badge"
import { MapPin, Banknote, Bus, Home, TrendingUp } from "lucide-react"

interface ProvinceData {
  name: string
  avgSalary: number
  rentCost: number
  transportCost: number
  survivalScore: number
  cx: number
  cy: number
}

const provinceData: ProvinceData[] = [
  { name: "Bangkok", avgSalary: 25000, rentCost: 8000, transportCost: 3000, survivalScore: 65, cx: 195, cy: 245 },
  { name: "Chiang Mai", avgSalary: 18000, rentCost: 4500, transportCost: 1500, survivalScore: 82, cx: 155, cy: 105 },
  { name: "Chonburi", avgSalary: 20000, rentCost: 5500, transportCost: 2000, survivalScore: 75, cx: 210, cy: 255 },
  { name: "Khon Kaen", avgSalary: 16000, rentCost: 3500, transportCost: 1200, survivalScore: 85, cx: 230, cy: 175 },
  { name: "Songkhla", avgSalary: 15000, rentCost: 3000, transportCost: 1000, survivalScore: 88, cx: 185, cy: 395 },
  { name: "Phuket", avgSalary: 22000, rentCost: 7000, transportCost: 2500, survivalScore: 70, cx: 150, cy: 370 },
  { name: "Nakhon Ratchasima", avgSalary: 15000, rentCost: 3200, transportCost: 1100, survivalScore: 86, cx: 230, cy: 215 },
  { name: "Nonthaburi", avgSalary: 23000, rentCost: 6500, transportCost: 2500, survivalScore: 72, cx: 190, cy: 240 },
]

function getSurvivalColor(score: number): string {
  if (score >= 80) return "#22C55E"
  if (score >= 65) return "#F59E0B"
  return "#EF4444"
}

function ThailandMap({
  provinces,
  selectedProvince,
  onSelect,
}: {
  provinces: ProvinceData[]
  selectedProvince: string | null
  onSelect: (name: string) => void
}) {
  return (
    <svg viewBox="0 0 380 480" className="w-full max-w-sm mx-auto" aria-label="Thailand opportunity map">
      {/* Simplified Thailand outline */}
      <path
        d="M170 50 L200 40 L230 55 L250 80 L260 110 L270 140 L280 170 L275 200 L260 220 L240 235 L220 250 L210 275 L215 300 L210 320 L200 340 L195 360 L190 380 L185 400 L175 410 L170 395 L160 380 L155 360 L150 340 L145 320 L148 300 L155 280 L160 260 L155 240 L145 225 L130 210 L120 190 L115 170 L120 145 L130 120 L140 100 L150 80 L160 60 Z"
        fill="#E6F7F9"
        stroke="#0096A5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {provinces.map((p) => {
        const color = getSurvivalColor(p.survivalScore)
        const isSelected = selectedProvince === p.name
        return (
          <g key={p.name} className="cursor-pointer" onClick={() => onSelect(p.name)}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r={isSelected ? 14 : 10}
              fill={color}
              fillOpacity={isSelected ? 0.9 : 0.7}
              stroke={isSelected ? "#0096A5" : color}
              strokeWidth={isSelected ? 3 : 1.5}
              className="transition-all duration-200"
            />
            <text
              x={p.cx}
              y={p.cy - 16}
              textAnchor="middle"
              fill="#1F2937"
              fontSize="9"
              fontWeight={isSelected ? "600" : "400"}
              className="pointer-events-none"
            >
              {p.name}
            </text>
          </g>
        )
      })}

      {/* Legend */}
      <g transform="translate(10, 440)">
        <circle cx="8" cy="4" r="5" fill="#22C55E" fillOpacity="0.7" />
        <text x="18" y="8" fill="#6B7280" fontSize="9">High Survival</text>
        <circle cx="108" cy="4" r="5" fill="#F59E0B" fillOpacity="0.7" />
        <text x="118" y="8" fill="#6B7280" fontSize="9">Moderate</text>
        <circle cx="188" cy="4" r="5" fill="#EF4444" fillOpacity="0.7" />
        <text x="198" y="8" fill="#6B7280" fontSize="9">Risky</text>
      </g>
    </svg>
  )
}

export function ProvinceMap() {
  const [selected, setSelected] = useState<string | null>("Bangkok")
  const detail = provinceData.find((p) => p.name === selected)

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <MapPin className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Province-Based Opportunity Map
          </h2>
        </div>
        <p className="text-muted-foreground">
          Explore internship opportunities and survival costs across Thai
          provinces.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardContent className="pt-6">
            <ThailandMap
              provinces={provinceData}
              selectedProvince={selected}
              onSelect={setSelected}
            />
          </CardContent>
        </Card>

        {detail && (
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="size-5 text-primary" />
                {detail.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Banknote className="size-4" />
                    Avg. Internship Salary
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    {detail.avgSalary.toLocaleString()} THB
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="size-4" />
                    Rent Cost
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    {detail.rentCost.toLocaleString()} THB
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Bus className="size-4" />
                    Transport Cost
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    {detail.transportCost.toLocaleString()} THB
                  </span>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="mb-1 text-xs text-muted-foreground">
                    Net Monthly Balance
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {(
                      detail.avgSalary -
                      detail.rentCost -
                      detail.transportCost
                    ).toLocaleString()}{" "}
                    THB
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="size-4" />
                    Survival Score
                  </div>
                  <ScoreBadge score={detail.survivalScore} size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
