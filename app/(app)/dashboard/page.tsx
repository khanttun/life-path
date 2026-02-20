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
import { OpportunityScore } from "@/components/opportunity-score"
import { RiskGauge } from "@/components/risk-gauge"
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  Plus,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react"

const recentSimulations = [
  {
    id: 1,
    title: "Get a Degree + Full-Time",
    icon: GraduationCap,
    date: "Feb 18, 2026",
    risk: "medium" as const,
    riskLabel: "Medium Risk",
    monthlyIncome: "\u0E3F33,000",
    savings: "\u0E3F180,000",
    opportunity: 72,
  },
  {
    id: 2,
    title: "Work Full-Time Immediately",
    icon: Briefcase,
    date: "Feb 17, 2026",
    risk: "low" as const,
    riskLabel: "Low Risk",
    monthlyIncome: "\u0E3F22,000",
    savings: "\u0E3F320,000",
    opportunity: 55,
  },
  {
    id: 3,
    title: "Move to Bangkok",
    icon: Building2,
    date: "Feb 15, 2026",
    risk: "high" as const,
    riskLabel: "High Risk",
    monthlyIncome: "\u0E3F28,000",
    savings: "\u0E3F95,000",
    opportunity: 63,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Decision Intelligence Hub
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your simulations, scores, and saved decisions at a glance
          </p>
        </div>
        <Button size="lg" className="gap-2 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
          <Link href="/scenario">
            <Plus className="size-4" />
            New Simulation
          </Link>
        </Button>
      </div>

      {/* Key scores overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <OpportunityScore score={72} label="Best Opportunity" trend="up" trendLabel="Top Score" />
        <OpportunityScore score={82} label="Best Stability" trend="up" trendLabel="Excellent" />
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Simulations</span>
          <span className="text-3xl font-bold text-foreground">3</span>
          <span className="text-xs text-muted-foreground">Total paths analyzed</span>
        </div>
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Legal Status</span>
          <RiskGauge value={85} label="Protected" size={70} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/royal-path"
          className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">Royal Path</h3>
            <p className="text-xs text-muted-foreground">5 safe career alternatives</p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
        <Link
          href="/scholarships"
          className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-success/10 text-success">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">Scholarships</h3>
            <p className="text-xs text-muted-foreground">6 matched to your profile</p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
        <Link
          href="/compare"
          className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-warning/10 text-warning">
            <Activity className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">Compare Paths</h3>
            <p className="text-xs text-muted-foreground">Side-by-side analysis</p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Recent simulations */}
      <Card className="glass-card rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Simulations</CardTitle>
          <CardDescription>Your latest decision path analyses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {recentSimulations.map((sim) => {
            const Icon = sim.icon
            return (
              <div
                key={sim.id}
                className="flex flex-col gap-4 rounded-xl border border-border/50 bg-background/50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{sim.title}</h3>
                    <p className="text-sm text-muted-foreground">{sim.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Income</p>
                    <p className="font-semibold text-foreground">{sim.monthlyIncome}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">3yr Savings</p>
                    <p className="font-semibold text-foreground">{sim.savings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Opportunity</p>
                    <p className="font-semibold text-primary">{sim.opportunity + "/100"}</p>
                  </div>
                  <RiskBadge level={sim.risk} label={sim.riskLabel} />
                  <Button variant="outline" size="sm" className="gap-1 rounded-lg" asChild>
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
