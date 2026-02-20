import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  Plus,
} from "lucide-react"

const recentSimulations = [
  {
    id: 1,
    title: "Take Student Loan",
    icon: GraduationCap,
    date: "Feb 18, 2026",
    risk: "medium" as const,
    riskLabel: "Medium Risk",
    monthlyIncome: "฿33,000",
    savings: "฿180,000",
  },
  {
    id: 2,
    title: "Work Full-Time",
    icon: Briefcase,
    date: "Feb 17, 2026",
    risk: "low" as const,
    riskLabel: "Low Risk",
    monthlyIncome: "฿22,000",
    savings: "฿320,000",
  },
  {
    id: 3,
    title: "Move to Bangkok",
    icon: Building2,
    date: "Feb 15, 2026",
    risk: "high" as const,
    riskLabel: "High Risk",
    monthlyIncome: "฿28,000",
    savings: "฿95,000",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your recent simulations and saved decisions
          </p>
        </div>
        <Button size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/scenario">
            <Plus className="size-4" />
            New Simulation
          </Link>
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="flex flex-col gap-1 p-6">
            <span className="text-sm text-muted-foreground">
              Total Simulations
            </span>
            <span className="text-3xl font-bold text-foreground">3</span>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="flex flex-col gap-1 p-6">
            <span className="text-sm text-muted-foreground">
              Saved Decisions
            </span>
            <span className="text-3xl font-bold text-foreground">1</span>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="flex flex-col gap-1 p-6">
            <span className="text-sm text-muted-foreground">
              Best Risk Score
            </span>
            <span className="text-3xl font-bold text-primary">85/100</span>
          </CardContent>
        </Card>
      </div>

      {/* Recent simulations */}
      <Card className="rounded-2xl border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Simulations</CardTitle>
          <CardDescription>
            Your latest scenario analyses
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {recentSimulations.map((sim) => {
            const Icon = sim.icon
            return (
              <div
                key={sim.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {sim.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{sim.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Income</p>
                    <p className="font-semibold text-foreground">
                      {sim.monthlyIncome}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      3yr Savings
                    </p>
                    <p className="font-semibold text-foreground">
                      {sim.savings}
                    </p>
                  </div>
                  <RiskBadge level={sim.risk} label={sim.riskLabel} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 rounded-lg"
                    asChild
                  >
                    <Link href="/results">
                      View
                      <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
