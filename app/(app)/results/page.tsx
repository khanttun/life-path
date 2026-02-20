"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RiskBadge } from "@/components/risk-badge"
import { RiskGauge } from "@/components/risk-gauge"
import { ThailandHeatmap } from "@/components/thailand-heatmap"
import { OpportunityScore } from "@/components/opportunity-score"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Info,
  ShieldCheck,
  Scale,
  TrendingUp,
  Activity,
  Shield,
  GraduationCap,
  Zap,
  BookOpen,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

/* ─── Mock data ─── */
const projectionData = [
  { year: "Now", income: 15000, debt: 150000, savings: 0 },
  { year: "Yr 1", income: 18000, debt: 135000, savings: 24000 },
  { year: "Yr 2", income: 22000, debt: 118000, savings: 72000 },
  { year: "Yr 3", income: 25000, debt: 98000, savings: 132000 },
  { year: "Yr 4", income: 28000, debt: 75000, savings: 210000 },
  { year: "Yr 5", income: 30000, debt: 50000, savings: 300000 },
  { year: "Yr 7", income: 35000, debt: 15000, savings: 520000 },
  { year: "Yr 10", income: 42000, debt: 0, savings: 980000 },
]

const stressProjectionData = [
  { year: "Now", income: 15000, debt: 150000, savings: 0 },
  { year: "Yr 1", income: 12000, debt: 160000, savings: 5000 },
  { year: "Yr 2", income: 8000, debt: 185000, savings: 0 },
  { year: "Yr 3", income: 14000, debt: 175000, savings: 15000 },
  { year: "Yr 4", income: 18000, debt: 155000, savings: 50000 },
  { year: "Yr 5", income: 22000, debt: 130000, savings: 95000 },
  { year: "Yr 7", income: 28000, debt: 80000, savings: 200000 },
  { year: "Yr 10", income: 33000, debt: 25000, savings: 420000 },
]

const riskScores = [
  {
    label: "Financial Risk",
    score: 62,
    icon: ShieldCheck,
    description: "Moderate debt-to-income ratio. Manageable repayment within 5 years.",
  },
  {
    label: "Legal Protection",
    score: 85,
    icon: Scale,
    description: "Formal contract with standard labor protections verified.",
  },
  {
    label: "Career Mobility",
    score: 78,
    icon: TrendingUp,
    description: "Degree completion increases lifetime earnings by 45-60%.",
  },
  {
    label: "Stability Index",
    score: 58,
    icon: Activity,
    description: "Variability expected during months 6-18 of transition.",
  },
]

/* ─── Financial Chart with toggle ─── */
function FinancialChart() {
  const [showStress, setShowStress] = useState(false)
  const data = showStress ? stressProjectionData : projectionData

  return (
    <Card className="glass-card rounded-2xl shadow-sm">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">10-Year Financial Projection</CardTitle>
          <CardDescription>
            {showStress ? "Worst-case scenario with job loss at Year 1" : "Standard projection based on your decision path"}
          </CardDescription>
        </div>
        <button
          onClick={() => setShowStress(!showStress)}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            showStress
              ? "bg-danger/10 text-danger ring-1 ring-danger/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Zap className="size-3" />
          {showStress ? "Stress Test ON" : "Stress Test OFF"}
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0096A5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0096A5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="year"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickFormatter={(value) => "\u0E3F" + (value / 1000).toFixed(0) + "k"}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [
                  "\u0E3F" + value.toLocaleString(),
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="savings"
                stroke="#22C55E"
                fill="url(#savingsGrad)"
                strokeWidth={2}
                name="Cumulative Savings"
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#0096A5"
                fill="url(#incomeGrad)"
                strokeWidth={2.5}
                dot={{ fill: "#0096A5", r: 3 }}
                name="Monthly Income"
              />
              <Line
                type="monotone"
                dataKey="debt"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ fill: "#EF4444", r: 3 }}
                name="Total Debt"
                strokeDasharray="6 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Gauge Dashboard Row ─── */
function GaugeDashboard() {
  return (
    <Card className="glass-card rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Risk Intelligence Gauges</CardTitle>
        <CardDescription>Real-time assessment of your decision path</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {riskScores.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <RiskGauge value={item.score} label={item.label} size={110} />
              <p className="text-center text-[10px] leading-snug text-muted-foreground max-w-[120px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Score Cards Row ─── */
function ScoreCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <OpportunityScore score={72} label="Opportunity Score" trend="up" trendLabel="+8 from baseline" />
      <OpportunityScore score={58} label="Stability Index" trend="up" trendLabel="Improving" />
      <OpportunityScore score={85} label="Legal Protection" trend="up" trendLabel="Protected" />
      <OpportunityScore score={45} label="Stress Resilience" trend="down" trendLabel="Build savings" />
    </div>
  )
}

/* ─── AI Explanation ─── */
function AIExplanation() {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="mb-3 flex items-center gap-2">
          <Info className="size-5" />
          <h3 className="text-lg font-semibold">AI Decision Intelligence Report</h3>
        </div>
        <p className="leading-relaxed text-primary-foreground/90">
          Based on your decision path of pursuing higher education, your income is projected to grow
          from 15,000 to 42,000 over 10 years while eliminating all debt by Year 7. The critical period
          is Years 1-2 where expenses peak. Your Career Mobility score of 78/100 suggests this education
          investment yields strong returns, but the Stress Resilience score of 45/100 indicates vulnerability
          to unexpected events.
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-border/30 px-6 py-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl glass-card">
              Read Full Analysis
              <ArrowRight className="size-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle>Full AI Analysis Report</DialogTitle>
              <DialogDescription>
                Comprehensive breakdown of your simulation
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground">
              <p>
                <strong>Financial Outlook:</strong> Debt-to-income ratio starts at 10:1
                and improves to 0:1 within 7 years. This is excellent for Thailand's labor
                market where graduates earn 45-60% more over their lifetime.
              </p>
              <p>
                <strong>Legal Assessment:</strong> Your formal employment contract scores
                85/100 on our protection index. Key clauses verified: termination notice,
                overtime compensation, and health insurance.
              </p>
              <p>
                <strong>Royal Path Alternative:</strong> If financial pressure is too high,
                consider the Royal Initiative vocational programs in sustainable agriculture
                or community enterprise. These offer 80% lower startup costs with government
                support.
              </p>
              <p>
                <strong>Stress Test Results:</strong> Under job loss at Year 1, recovery
                takes approximately 2 additional years. Building a 3-month emergency fund
                (45,000) before Year 1 significantly improves resilience from 45 to 72.
              </p>
              <p>
                <strong>Recommendation:</strong> Proceed with the education path. Supplement
                with part-time work during studies and apply for the micro-scholarships
                matched to your profile.
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <Button size="sm" className="gap-2 rounded-xl" asChild>
          <Link href="/royal-path">
            <Shield className="size-3" />
            View Royal Path Alternatives
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl" asChild>
          <Link href="/scholarships">
            <GraduationCap className="size-3" />
            Find Scholarships
          </Link>
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Progress indicator */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 3 of 3</span>
          <span className="text-muted-foreground">Intelligence Dashboard</span>
        </div>
        <Progress value={100} className="h-2" />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Decision Intelligence Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            {"Path: Get a Degree \u2192 Work Full-Time \u2192 10-Year Projection"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RiskBadge level="medium" label="Moderate Risk" />
        </div>
      </div>

      {/* Score Cards */}
      <ScoreCards />

      {/* Tabs for different views */}
      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="glass-card w-full justify-start gap-1 rounded-xl p-1">
          <TabsTrigger value="projections" className="rounded-lg gap-1.5 text-sm">
            <TrendingUp className="size-3.5" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="gauges" className="rounded-lg gap-1.5 text-sm">
            <Activity className="size-3.5" />
            Risk Gauges
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="rounded-lg gap-1.5 text-sm">
            <BookOpen className="size-3.5" />
            Career Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projections" className="mt-6">
          <FinancialChart />
        </TabsContent>

        <TabsContent value="gauges" className="mt-6">
          <GaugeDashboard />
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <Card className="glass-card rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Regional Career Demand</CardTitle>
              <CardDescription>
                Where your chosen career is most in-demand, safest, and highest paying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThailandHeatmap career="Software Engineer" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Explanation */}
      <AIExplanation />

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
          <Link href="/compare">
            Compare Scenarios
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/scenario">Modify Decision Path</Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/dashboard">Save to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
