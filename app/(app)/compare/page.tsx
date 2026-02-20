"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import {
  GraduationCap,
  Briefcase,
  ArrowRight,
  Save,
  Settings2,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ScenarioData {
  id: string
  title: string
  icon: React.ElementType
  monthlyIncome: number
  threeYearSavings: number
  totalDebt: number
  riskScore: { level: "low" | "medium" | "high"; label: string }
  mobilityScore: number
}

const scenarioA: ScenarioData = {
  id: "student-loan",
  title: "Take Student Loan",
  icon: GraduationCap,
  monthlyIncome: 33000,
  threeYearSavings: 180000,
  totalDebt: 22000,
  riskScore: { level: "medium", label: "Medium" },
  mobilityScore: 78,
}

const scenarioB: ScenarioData = {
  id: "full-time",
  title: "Work Full-Time",
  icon: Briefcase,
  monthlyIncome: 22000,
  threeYearSavings: 320000,
  totalDebt: 0,
  riskScore: { level: "low", label: "Low" },
  mobilityScore: 52,
}

function MetricRow({
  label,
  valueA,
  valueB,
  format = "currency",
  higherIsBetter = true,
}: {
  label: string
  valueA: number
  valueB: number
  format?: "currency" | "score"
  higherIsBetter?: boolean
}) {
  const aWins = higherIsBetter ? valueA > valueB : valueA < valueB
  const bWins = higherIsBetter ? valueB > valueA : valueB < valueA

  function formatValue(v: number) {
    if (format === "currency") return "฿" + v.toLocaleString()
    return v + "/100"
  }

  return (
    <div className="grid grid-cols-3 items-center gap-4 rounded-xl bg-muted/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-2xl font-bold tabular-nums",
            aWins ? "text-primary" : "text-foreground"
          )}
        >
          {formatValue(valueA)}
        </span>
        {aWins && <CheckCircle2 className="size-4 text-primary" />}
      </div>
      <div className="text-center text-sm font-medium text-muted-foreground">
        {label}
      </div>
      <div className="flex items-center justify-end gap-2">
        {bWins && <CheckCircle2 className="size-4 text-primary" />}
        <span
          className={cn(
            "text-2xl font-bold tabular-nums",
            bWins ? "text-primary" : "text-foreground"
          )}
        >
          {formatValue(valueB)}
        </span>
      </div>
    </div>
  )
}

function ScenarioColumn({ scenario, label }: { scenario: ScenarioData; label: string }) {
  const Icon = scenario.icon

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
          <Icon className="size-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <CardTitle className="text-xl">{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">Monthly Income</span>
          <span className="text-lg font-bold text-foreground">
            {"฿" + scenario.monthlyIncome.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">3-Year Savings</span>
          <span className="text-lg font-bold text-foreground">
            {"฿" + scenario.threeYearSavings.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">Total Debt</span>
          <span className="text-lg font-bold text-foreground">
            {"฿" + scenario.totalDebt.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">Risk Score</span>
          <RiskBadge level={scenario.riskScore.level} label={scenario.riskScore.label} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">Mobility Score</span>
          <span className="text-lg font-bold text-foreground">
            {scenario.mobilityScore + "/100"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ComparePage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Compare Scenarios
        </h1>
        <p className="mt-2 text-muted-foreground">
          Side-by-side comparison to help you decide
        </p>
      </div>

      {/* Split screen comparison cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <ScenarioColumn scenario={scenarioA} label="Scenario A" />
        <ScenarioColumn scenario={scenarioB} label="Scenario B" />
      </div>

      {/* Head-to-head metrics */}
      <Card className="rounded-2xl border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Head-to-Head Comparison</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-3 items-center gap-4 px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Scenario A</span>
            <span className="text-center">Metric</span>
            <span className="text-right">Scenario B</span>
          </div>
          <MetricRow
            label="Monthly Income"
            valueA={scenarioA.monthlyIncome}
            valueB={scenarioB.monthlyIncome}
          />
          <MetricRow
            label="3-Year Savings"
            valueA={scenarioA.threeYearSavings}
            valueB={scenarioB.threeYearSavings}
          />
          <MetricRow
            label="Total Debt"
            valueA={scenarioA.totalDebt}
            valueB={scenarioB.totalDebt}
            higherIsBetter={false}
          />
          <MetricRow
            label="Mobility Score"
            valueA={scenarioA.mobilityScore}
            valueB={scenarioB.mobilityScore}
            format="score"
          />
        </CardContent>
      </Card>

      {/* Recommendation banner */}
      <div className="rounded-2xl bg-secondary p-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                AI Recommendation
              </h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                Based on long-term stability and lower financial risk,{" "}
                <strong className="text-foreground">Scenario B (Work Full-Time)</strong> is
                the safer choice. However, Scenario A offers significantly higher career
                mobility and earning potential over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base">
          <Save className="size-4" />
          Save Decision
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl text-base"
          asChild
        >
          <Link href="/scenario">
            <Settings2 className="size-4" />
            Modify Scenario
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl text-base"
          asChild
        >
          <Link href="/results">
            View Full Results
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
