"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import { RiskGauge } from "@/components/risk-gauge"
import { OpportunityScore } from "@/components/opportunity-score"
import { AIRecommendationBadge } from "@/components/ai-recommendation-badge"
import {
  GraduationCap,
  Briefcase,
  ArrowRight,
  Save,
  Settings2,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  Scale,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

/* ─── Mock scenario data ─── */
interface ScenarioData {
  id: string
  title: string
  icon: React.ElementType
  color: string
  monthlyIncome10yr: number
  threeYearSavings: number
  tenYearSavings: number
  totalDebt: number
  riskScore: { level: "low" | "medium" | "high"; label: string }
  mobilityScore: number
  opportunityScore: number
  stabilityIndex: number
  legalProtection: number
  stressResilience: number
  projection: { year: string; income: number; savings: number }[]
}

const scenarioA: ScenarioData = {
  id: "get-degree",
  title: "Get a Degree + Full-Time Work",
  icon: GraduationCap,
  color: "#0096A5",
  monthlyIncome10yr: 42000,
  threeYearSavings: 132000,
  tenYearSavings: 980000,
  totalDebt: 0,
  riskScore: { level: "medium", label: "Medium" },
  mobilityScore: 78,
  opportunityScore: 72,
  stabilityIndex: 58,
  legalProtection: 85,
  stressResilience: 45,
  projection: [
    { year: "Now", income: 15000, savings: 0 },
    { year: "Yr 2", income: 22000, savings: 72000 },
    { year: "Yr 4", income: 28000, savings: 210000 },
    { year: "Yr 6", income: 33000, savings: 420000 },
    { year: "Yr 8", income: 38000, savings: 700000 },
    { year: "Yr 10", income: 42000, savings: 980000 },
  ],
}

const scenarioB: ScenarioData = {
  id: "work-now",
  title: "Work Full-Time Immediately",
  icon: Briefcase,
  color: "#22C55E",
  monthlyIncome10yr: 28000,
  threeYearSavings: 320000,
  tenYearSavings: 720000,
  totalDebt: 0,
  riskScore: { level: "low", label: "Low" },
  mobilityScore: 52,
  opportunityScore: 55,
  stabilityIndex: 72,
  legalProtection: 70,
  stressResilience: 68,
  projection: [
    { year: "Now", income: 18000, savings: 0 },
    { year: "Yr 2", income: 20000, savings: 120000 },
    { year: "Yr 4", income: 22000, savings: 280000 },
    { year: "Yr 6", income: 24000, savings: 450000 },
    { year: "Yr 8", income: 26000, savings: 600000 },
    { year: "Yr 10", income: 28000, savings: 720000 },
  ],
}

/* ─── Combined chart data ─── */
const combinedData = scenarioA.projection.map((item, i) => ({
  year: item.year,
  incomeA: item.income,
  savingsA: item.savings,
  incomeB: scenarioB.projection[i].income,
  savingsB: scenarioB.projection[i].savings,
}))

/* ─── Versus Metric ─── */
function VersusMetric({
  label,
  valueA,
  valueB,
  format = "currency",
  higherIsBetter = true,
}: {
  label: string
  valueA: number
  valueB: number
  format?: "currency" | "score" | "percent"
  higherIsBetter?: boolean
}) {
  const aWins = higherIsBetter ? valueA > valueB : valueA < valueB
  const bWins = higherIsBetter ? valueB > valueA : valueB < valueA

  function formatValue(v: number) {
    if (format === "currency") return "\u0E3F" + v.toLocaleString()
    if (format === "percent") return v + "%"
    return v + "/100"
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="flex items-center gap-2 justify-end">
        {aWins && <CheckCircle2 className="size-4 text-primary shrink-0" />}
        <span className={cn(
          "text-lg font-bold tabular-nums md:text-xl",
          aWins ? "text-primary" : "text-foreground"
        )}>
          {formatValue(valueA)}
        </span>
      </div>
      <div className="glass-card rounded-lg px-3 py-1.5 text-center">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-lg font-bold tabular-nums md:text-xl",
          bWins ? "text-success" : "text-foreground"
        )}>
          {formatValue(valueB)}
        </span>
        {bWins && <CheckCircle2 className="size-4 text-success shrink-0" />}
      </div>
    </div>
  )
}

/* ─── Scenario Header Card ─── */
function ScenarioHeaderCard({ scenario, label, accentColor }: { scenario: ScenarioData; label: string; accentColor: string }) {
  const Icon = scenario.icon

  return (
    <Card className="glass-card rounded-2xl shadow-sm overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: accentColor }} />
      <CardHeader className="items-center text-center pb-3">
        <div className="mb-2 flex size-14 items-center justify-center rounded-2xl" style={{ backgroundColor: accentColor + "15", color: accentColor }}>
          <Icon className="size-7" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <CardTitle className="text-lg">{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <OpportunityScore score={scenario.opportunityScore} label="Opportunity" />
          <OpportunityScore score={scenario.stabilityIndex} label="Stability" />
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <RiskGauge value={scenario.legalProtection} label="Legal" size={70} />
          <RiskGauge value={scenario.stressResilience} label="Resilience" size={70} />
          <RiskGauge value={scenario.mobilityScore} label="Mobility" size={70} />
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Combined 10yr Chart ─── */
function ComparisonChart() {
  return (
    <Card className="glass-card rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">10-Year Income & Savings Comparison</CardTitle>
        <CardDescription>Immediate Income vs. Long-term Wealth trajectory</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} tickFormatter={(v) => "\u0E3F" + (v / 1000).toFixed(0) + "k"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                }}
                formatter={(value: number) => ["\u0E3F" + value.toLocaleString()]}
              />
              <Legend />
              <Line type="monotone" dataKey="incomeA" stroke="#0096A5" strokeWidth={2.5} dot={{ r: 3 }} name="Path A: Income" />
              <Line type="monotone" dataKey="savingsA" stroke="#0096A5" strokeWidth={1.5} strokeDasharray="6 3" dot={{ r: 2 }} name="Path A: Savings" />
              <Line type="monotone" dataKey="incomeB" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 3 }} name="Path B: Income" />
              <Line type="monotone" dataKey="savingsB" stroke="#22C55E" strokeWidth={1.5} strokeDasharray="6 3" dot={{ r: 2 }} name="Path B: Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Main Page ─── */
export default function ComparePage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Versus Mode
        </h1>
        <p className="mt-2 text-muted-foreground">
          Immediate Income vs. Long-term Wealth - high-density 10-year comparison
        </p>
      </div>

      {/* Scenario header cards side by side */}
      <div className="grid gap-6 md:grid-cols-2">
        <ScenarioHeaderCard scenario={scenarioA} label="Path A" accentColor="#0096A5" />
        <ScenarioHeaderCard scenario={scenarioB} label="Path B" accentColor="#22C55E" />
      </div>

      {/* 10-Year Chart */}
      <ComparisonChart />

      {/* Head-to-head Versus metrics */}
      <Card className="glass-card rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">Path A</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">VS</span>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-success" />
              <span className="text-sm font-semibold text-foreground">Path B</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <VersusMetric label="Income at Yr 10" valueA={scenarioA.monthlyIncome10yr} valueB={scenarioB.monthlyIncome10yr} />
          <VersusMetric label="3yr Savings" valueA={scenarioA.threeYearSavings} valueB={scenarioB.threeYearSavings} />
          <VersusMetric label="10yr Wealth" valueA={scenarioA.tenYearSavings} valueB={scenarioB.tenYearSavings} />
          <VersusMetric label="Total Debt" valueA={scenarioA.totalDebt} valueB={scenarioB.totalDebt} higherIsBetter={false} />
          <VersusMetric label="Opportunity" valueA={scenarioA.opportunityScore} valueB={scenarioB.opportunityScore} format="score" />
          <VersusMetric label="Stability" valueA={scenarioA.stabilityIndex} valueB={scenarioB.stabilityIndex} format="score" />
          <VersusMetric label="Mobility" valueA={scenarioA.mobilityScore} valueB={scenarioB.mobilityScore} format="score" />
          <VersusMetric label="Stress Res." valueA={scenarioA.stressResilience} valueB={scenarioB.stressResilience} format="score" />
        </CardContent>
      </Card>

      {/* AI Recommendation banner */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Zap className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">AI Recommendation</h3>
                <AIRecommendationBadge label="BETA" variant="warning" />
              </div>
              <p className="mt-2 leading-relaxed text-primary-foreground/90">
                <strong>Path A (Get a Degree)</strong> wins on long-term metrics: 47% higher income at Year 10
                and 36% more accumulated wealth. However, <strong>Path B (Work Immediately)</strong> provides
                better short-term stability and 51% higher stress resilience. For youth at risk of informal
                labor, Path B with supplementary vocational training through the{" "}
                <Link href="/royal-path" className="underline underline-offset-2 hover:text-primary-foreground">
                  Royal Path program
                </Link>{" "}
                offers the best balance of safety and growth.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-border/30">
          <Button variant="outline" size="sm" className="gap-2 rounded-xl glass-card" asChild>
            <Link href="/royal-path">
              <Shield className="size-3" />
              Royal Path Options
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl glass-card" asChild>
            <Link href="/scholarships">
              <GraduationCap className="size-3" />
              Find Scholarships
            </Link>
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base shadow-lg shadow-primary/20">
          <Save className="size-4" />
          Save Decision
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/scenario">
            <Settings2 className="size-4" />
            Modify Paths
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/results">
            View Full Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
