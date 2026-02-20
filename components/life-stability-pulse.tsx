"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskMetric {
  label: string
  percentage: number
  risk: "safe" | "at-risk" | "critical"
  description: string
}

interface LifeStabilityPulseProps {
  metrics?: RiskMetric[]
  debtToIncomeRatio?: number
}

const defaultMetrics: RiskMetric[] = [
  {
    label: "Debt-to-Income",
    percentage: 42,
    risk: "at-risk",
    description: "Above recommended threshold",
  },
  {
    label: "Healthcare Access",
    percentage: 45,
    risk: "at-risk",
    description: "Monthly medical overhead is significant",
  },
  {
    label: "Legal Protection",
    percentage: 85,
    risk: "safe",
    description: "All scenarios comply with labor laws",
  },
  {
    label: "Career Stability",
    percentage: 62,
    risk: "at-risk",
    description: "Growth dependent on education completion",
  },
]

function getRiskColor(risk: "safe" | "at-risk" | "critical") {
  switch (risk) {
    case "safe":
      return "text-emerald-600 bg-emerald-50 border-emerald-200"
    case "at-risk":
      return "text-amber-600 bg-amber-50 border-amber-200"
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
  }
}

function getRiskIcon(risk: "safe" | "at-risk" | "critical") {
  switch (risk) {
    case "safe":
      return CheckCircle2
    case "at-risk":
    case "critical":
      return AlertTriangle
  }
}

export function LifeStabilityPulse({
  metrics = defaultMetrics,
  debtToIncomeRatio = 42,
}: LifeStabilityPulseProps) {
  const riskCount = metrics.filter((m) => m.risk === "at-risk" || m.risk === "critical").length
  const safeCount = metrics.filter((m) => m.risk === "safe").length

  return (
    <Card className="glass-card rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="size-5 text-red-600 animate-pulse" />
            <span className="absolute inset-0 rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Life Stability Pulse</h3>
            <p className="text-xs text-muted-foreground">
              At Risk • {riskCount} metric{riskCount !== 1 ? "s" : ""} need attention
            </p>
          </div>
        </div>
      </div>

      <CardContent className="pt-6 space-y-4">
        {/* Overall status summary */}
        <div className="grid grid-cols-3 gap-3 pb-4 border-b border-border/50">
          <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200/30">
            <p className="text-2xl font-bold text-red-600">{riskCount}</p>
            <p className="text-xs text-muted-foreground">At-Risk Areas</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-emerald-50 border border-emerald-200/30">
            <p className="text-2xl font-bold text-emerald-600">{safeCount}</p>
            <p className="text-xs text-muted-foreground">Safe Areas</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200/30">
            <p className="text-2xl font-bold text-blue-600">{debtToIncomeRatio}%</p>
            <p className="text-xs text-muted-foreground">Debt-to-Income</p>
          </div>
        </div>

        {/* Individual metrics */}
        <div className="space-y-3">
          {metrics.map((metric) => {
            const Icon = getRiskIcon(metric.risk)
            const riskColor = getRiskColor(metric.risk)

            return (
              <div key={metric.label} className={`rounded-lg border p-4 ${riskColor}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 flex-shrink-0" />
                    <span className="font-semibold text-sm">{metric.label}</span>
                  </div>
                  <span className="font-bold">{metric.percentage}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      metric.risk === "safe" ? "bg-emerald-500" : "bg-amber-500"
                    )}
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            )
          })}
        </div>

        {/* Action prompt */}
        <div className="bg-blue-50 border border-blue-200/30 rounded-lg p-4 mt-4">
          <p className="text-xs font-semibold text-blue-900 mb-1">💡 Smart Recommendation</p>
          <p className="text-xs text-blue-800">
            Build a 3-month emergency fund (45,000 THB) to improve stress resilience from 45 to 72 and secure your financial foundation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
