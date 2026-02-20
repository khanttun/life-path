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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowRight,
  Info,
  ShieldCheck,
  Scale,
  TrendingUp,
  Activity,
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

// Mock projection data
const projectionData = [
  { month: "Now", income: 15000, debt: 150000 },
  { month: "6mo", income: 18000, debt: 135000 },
  { month: "1yr", income: 22000, debt: 118000 },
  { month: "1.5yr", income: 25000, debt: 98000 },
  { month: "2yr", income: 28000, debt: 75000 },
  { month: "2.5yr", income: 30000, debt: 50000 },
  { month: "3yr", income: 33000, debt: 22000 },
]

const riskScores = [
  {
    label: "Financial Risk",
    level: "medium" as const,
    levelLabel: "Medium",
    score: 62,
    icon: ShieldCheck,
    description: "Moderate debt-to-income ratio with manageable repayment timeline.",
  },
  {
    label: "Legal Risk",
    level: "low" as const,
    levelLabel: "Low",
    score: 85,
    icon: Scale,
    description: "Formal contract with standard protections in place.",
  },
  {
    label: "Career Mobility",
    level: "low" as const,
    levelLabel: "High",
    score: 78,
    icon: TrendingUp,
    description: "Strong upward trajectory with degree completion enhancing prospects.",
  },
  {
    label: "Stability Index",
    level: "medium" as const,
    levelLabel: "Moderate",
    score: 58,
    icon: Activity,
    description: "Some variability expected during transition periods.",
  },
]

function FinancialChart() {
  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Financial Projection</CardTitle>
        <CardDescription>
          Income and debt trajectory over 3 years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [
                  `฿${value.toLocaleString()}`,
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#0096A5"
                strokeWidth={3}
                dot={{ fill: "#0096A5", r: 4 }}
                activeDot={{ r: 6 }}
                name="Monthly Income"
              />
              <Line
                type="monotone"
                dataKey="debt"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Debt"
                strokeDasharray="6 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function RiskScoreCard({
  item,
}: {
  item: (typeof riskScores)[number]
}) {
  const Icon = item.icon

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Icon className="size-5" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              {item.label}
            </span>
          </div>
          <RiskBadge level={item.level} label={item.levelLabel} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Score</span>
            <span className="font-bold text-foreground">{item.score + "/100"}</span>
          </div>
          <Progress value={item.score} className="h-2" />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </CardContent>
    </Card>
  )
}

function AIExplanation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Inline explanation box */}
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
        <div className="mb-3 flex items-center gap-2">
          <Info className="size-5" />
          <h3 className="text-lg font-semibold">What this means for you</h3>
        </div>
        <p className="leading-relaxed">
          Based on your scenario of taking a student loan, your income is projected to grow
          steadily while your debt decreases over 3 years. The financial risk is moderate during
          the first 18 months but improves significantly as your earning potential increases
          post-graduation. Your career mobility score is strong, suggesting this investment
          in education will pay off long-term.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 gap-2 rounded-xl"
            >
              Read Full Analysis
              <ArrowRight className="size-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle>AI Detailed Analysis</DialogTitle>
              <DialogDescription>
                Full breakdown of your scenario simulation
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground">
              <p>
                <strong>Financial Outlook:</strong> Your debt-to-income ratio starts at 10:1
                but improves to 0.7:1 within 3 years. This is within a healthy range for
                recent graduates in your field.
              </p>
              <p>
                <strong>Risk Assessment:</strong> The primary risk period is months 6-18
                when expenses are highest and income has not yet reached its potential.
                Having an emergency fund of 3 months expenses is recommended.
              </p>
              <p>
                <strong>Career Impact:</strong> Completing your degree increases your
                lifetime earning potential by an estimated 45-60%. The investment breaks
                even within approximately 2.5 years post-graduation.
              </p>
              <p>
                <strong>Recommendation:</strong> This scenario is viable with careful
                budget management. Consider part-time work during studies to reduce
                overall debt burden and improve the stability index.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Progress indicator */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 3 of 3</span>
          <span className="text-muted-foreground">Simulation Results</span>
        </div>
        <Progress value={100} className="h-2" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Simulation Results
        </h1>
        <p className="mt-2 text-muted-foreground">
          {"Scenario: Take Student Loan — Here's your projected outcome"}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Chart */}
        <FinancialChart />

        {/* Right: Risk score cards */}
        <div className="flex flex-col gap-4">
          {riskScores.map((item) => (
            <RiskScoreCard key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* AI Explanation */}
      <AIExplanation />

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="gap-2 rounded-xl text-base"
          asChild
        >
          <Link href="/compare">
            Compare Another Scenario
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl text-base"
          asChild
        >
          <Link href="/scenario">Modify Scenario</Link>
        </Button>
      </div>
    </div>
  )
}
