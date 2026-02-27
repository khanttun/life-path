"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { RiskBadge } from "@/components/risk-badge"
import { OpportunityScore } from "@/components/opportunity-score"
import {
  GraduationCap,
  Briefcase,
  Building2,
  FileText,
  ShoppingBag,
  Sprout,
  ArrowRight,
  TrendingUp,
  Wallet,
  AlertTriangle,
  Zap,
  X,
  Plus,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Life event nodes for the decision tree ─── */
interface LifeEvent {
  id: string
  icon: React.ElementType
  title: string
  description: string
  category: "education" | "career" | "location" | "risk" | "agriculture"
  impactOnIncome: number
  impactOnDebt: number
  impactOnRisk: number
}

const availableEvents: LifeEvent[] = [
  {
    id: "get-degree",
    icon: GraduationCap,
    title: "Get a Degree",
    description: "Pursue higher education",
    category: "education",
    impactOnIncome: 12000,
    impactOnDebt: 200000,
    impactOnRisk: -15,
  },
  {
    id: "vocational",
    icon: GraduationCap,
    title: "Vocational Training",
    description: "Learn a skilled trade",
    category: "education",
    impactOnIncome: 6000,
    impactOnDebt: 40000,
    impactOnRisk: -10,
  },
  {
    id: "full-time-job",
    icon: Briefcase,
    title: "Work Full-Time",
    description: "Start earning immediately",
    category: "career",
    impactOnIncome: 18000,
    impactOnDebt: 0,
    impactOnRisk: 5,
  },
  {
    id: "move-bangkok",
    icon: Building2,
    title: "Move to Bangkok",
    description: "Higher pay, higher costs",
    category: "location",
    impactOnIncome: 8000,
    impactOnDebt: 30000,
    impactOnRisk: 10,
  },
  {
    id: "informal-contract",
    icon: FileText,
    title: "Accept Informal Work",
    description: "Quick income, no protection",
    category: "risk",
    impactOnIncome: 10000,
    impactOnDebt: 0,
    impactOnRisk: 35,
  },
  {
    id: "small-business",
    icon: ShoppingBag,
    title: "Start a Business",
    description: "High reward, high risk",
    category: "career",
    impactOnIncome: 15000,
    impactOnDebt: 100000,
    impactOnRisk: 25,
  },
  {
    id: "start-farm",
    icon: Sprout,
    title: "Start a Farm",
    description: "Royal Initiative pathway",
    category: "agriculture",
    impactOnIncome: 8000,
    impactOnDebt: 50000,
    impactOnRisk: -5,
  },
]

const categoryColors: Record<string, string> = {
  education: "bg-primary/10 text-primary border-primary/20",
  career: "bg-success/10 text-success border-success/20",
  location: "bg-warning/10 text-warning border-warning/20",
  risk: "bg-danger/10 text-danger border-danger/20",
  agriculture: "bg-accent text-accent-foreground border-primary/20",
}

/* ─── Stress test modifiers ─── */
const stressModifiers = {
  jobLoss: { income: -0.6, debt: 50000, risk: 30, label: "Job Loss" },
  medical: { income: -0.2, debt: 150000, risk: 25, label: "Medical Emergency" },
  recession: { income: -0.3, debt: 20000, risk: 20, label: "Economic Recession" },
}

/* ─── Decision Tree Visual Node ─── */
function TreeNode({
  event,
  index,
  onRemove,
}: {
  event: LifeEvent
  index: number
  onRemove: () => void
}) {
  const Icon = event.icon
  return (
    <div className="group relative flex items-center gap-3">
      {/* Connector line */}
      {index > 0 && (
        <div className="absolute -top-8 left-5 h-8 w-0.5 bg-border" />
      )}
      <div className={cn(
        "flex items-center gap-3 rounded-xl border p-3 transition-all glass-card",
        categoryColors[event.category]
      )}>
        <div className="flex size-10 items-center justify-center rounded-lg bg-background/80">
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{event.title}</p>
          <p className="text-xs opacity-70">{event.description}</p>
        </div>
        <button
          onClick={onRemove}
          className="flex size-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
          aria-label={"Remove " + event.title}
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  )
}

/* ─── Available event card (to add to path) ─── */
function EventCard({
  event,
  onAdd,
  disabled,
}: {
  event: LifeEvent
  onAdd: () => void
  disabled: boolean
}) {
  const Icon = event.icon
  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "glass-card hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
      )}
    >
      <div className={cn(
        "flex size-9 items-center justify-center rounded-lg",
        categoryColors[event.category]
      )}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
        <p className="text-xs text-muted-foreground truncate">{event.description}</p>
      </div>
      <Plus className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}

/* ─── Stress Test Toggle ─── */
function StressTestPanel({
  active,
  onToggle,
}: {
  active: Record<string, boolean>
  onToggle: (key: string) => void
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="size-5 text-danger" />
        <h3 className="text-sm font-semibold text-foreground">Stress Test Mode</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Toggle worst-case scenarios to test your financial resilience
      </p>
      <div className="flex flex-col gap-3">
        {(Object.entries(stressModifiers) as [string, typeof stressModifiers.jobLoss][]).map(([key, mod]) => {
          const isActive = active[key] ?? false
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3 transition-all text-left",
                isActive
                  ? "border-danger/40 bg-danger/5"
                  : "border-border bg-background/50 hover:border-danger/20"
              )}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className={cn("size-4", isActive ? "text-danger" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", isActive ? "text-danger" : "text-foreground")}>
                  {mod.label}
                </span>
              </div>
              {isActive ? (
                <ToggleRight className="size-5 text-danger" />
              ) : (
                <ToggleLeft className="size-5 text-muted-foreground" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Live Preview Panel ─── */
function LivePreview({
  selectedEvents,
  stressActive,
  params,
}: {
  selectedEvents: LifeEvent[]
  stressActive: Record<string, boolean>
  params: { salary: string; tuition: string; loanRate: number[]; livingCost: string; workHours: number[] }
}) {
  const baseSalary = Number(params.salary) || 0
  const baseTuition = Number(params.tuition) || 0
  const livingCost = Number(params.livingCost) || 0
  const loanRate = params.loanRate[0]

  // Apply event modifiers
  let totalIncome = baseSalary
  let totalDebt = baseTuition
  let riskScore = 50

  selectedEvents.forEach((ev) => {
    totalIncome += ev.impactOnIncome
    totalDebt += ev.impactOnDebt
    riskScore += ev.impactOnRisk
  })

  // Apply stress test modifiers
  const activeStresses = Object.entries(stressActive).filter(([, v]) => v)
  activeStresses.forEach(([key]) => {
    const mod = stressModifiers[key as keyof typeof stressModifiers]
    totalIncome = Math.max(0, totalIncome + totalIncome * mod.income)
    totalDebt += mod.debt
    riskScore += mod.risk
  })

  const monthlyNet = totalIncome - livingCost
  const monthlySavings = Math.max(0, monthlyNet * 0.2)
  const debtWithInterest = totalDebt * (1 + loanRate / 100)
  riskScore = Math.max(0, Math.min(100, riskScore))
  const opportunityScore = Math.max(0, Math.min(100, Math.round(100 - riskScore + (totalIncome / 1000))))
  const isStressed = activeStresses.length > 0

  const riskLevel: "low" | "medium" | "high" = riskScore <= 30 ? "low" : riskScore <= 60 ? "medium" : "high"

  return (
    <Card className={cn(
      "glass-card rounded-2xl shadow-sm transition-all",
      isStressed && "ring-2 ring-danger/30"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Live Intelligence Preview</CardTitle>
          {isStressed && (
            <span className="flex items-center gap-1 rounded-full bg-danger/10 px-2.5 py-1 text-xs font-semibold text-danger">
              <Zap className="size-3" />
              Stress Test Active
            </span>
          )}
        </div>
        <CardDescription>Real-time projections based on your path</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <OpportunityScore
            score={opportunityScore}
            label="Opportunity"
            trend={opportunityScore >= 60 ? "up" : "down"}
          />
          <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Risk</span>
            <span className={cn(
              "text-3xl font-bold tabular-nums",
              riskLevel === "low" ? "text-success" : riskLevel === "medium" ? "text-warning" : "text-danger"
            )}>
              {riskScore}
            </span>
            <RiskBadge level={riskLevel} label={riskLevel === "low" ? "Low" : riskLevel === "medium" ? "Medium" : "High"} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { icon: TrendingUp, label: "Projected Monthly Income", value: "\u0E3F" + Math.round(totalIncome).toLocaleString(), color: "text-success" },
            { icon: Wallet, label: "Monthly Savings Potential", value: "\u0E3F" + Math.round(monthlySavings).toLocaleString() + "/mo", color: "text-primary" },
            { icon: AlertTriangle, label: "Total Debt Projection", value: "\u0E3F" + Math.round(debtWithInterest).toLocaleString(), color: "text-warning" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center justify-between rounded-xl bg-background/50 p-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("size-4", item.color)} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{item.value}</span>
              </div>
            )
          })}
        </div>

        {selectedEvents.length > 0 && (
          <div className="rounded-xl bg-primary/5 p-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">AI Insight:</strong>{" "}
              {riskScore > 60
                ? "Your current path has elevated risk. Consider adding vocational training or exploring the Royal Path for safer alternatives."
                : riskScore > 30
                ? "Moderate risk detected. Your path is viable but consider building an emergency fund to improve resilience."
                : "Your chosen path shows strong stability. Continue building skills to maximize your Opportunity Score."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ─── Main Page ─── */
export default function ScenarioPage() {
  const router = useRouter()
  const [selectedEvents, setSelectedEvents] = useState<LifeEvent[]>([])
  const [stressActive, setStressActive] = useState<Record<string, boolean>>({})
  const [params, setParams] = useState({
    salary: "15000",
    tuition: "0",
    loanRate: [5],
    livingCost: "8000",
    workHours: [40],
  })

  const selectedIds = new Set(selectedEvents.map((e) => e.id))

  const addEvent = useCallback((event: LifeEvent) => {
    setSelectedEvents((prev) => [...prev, event])
  }, [])

  const removeEvent = useCallback((index: number) => {
    setSelectedEvents((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const toggleStress = useCallback((key: string) => {
    setStressActive((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  function handleRunSimulation() {
    router.push("/results")
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Progress */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 2 of 3</span>
          <span className="text-muted-foreground">Decision Tree Builder</span>
        </div>
        <Progress value={66} className="h-2" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Build Your Decision Path
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add life events to your path and toggle stress tests to see how resilient your plan is
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Decision Tree Visualization */}
          <Card className="glass-card rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Your Life Path</CardTitle>
              <CardDescription>
                {selectedEvents.length === 0
                  ? "Add life events from the panel below to build your path"
                  : selectedEvents.length + " event" + (selectedEvents.length > 1 ? "s" : "") + " in your path"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEvents.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-12 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <Plus className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select life events below to add to your decision path
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* Start node */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs font-bold">NOW</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Current Position</span>
                  </div>
                  {selectedEvents.map((event, index) => (
                    <TreeNode
                      key={event.id}
                      event={event}
                      index={index}
                      onRemove={() => removeEvent(index)}
                    />
                  ))}
                  {/* End node */}
                  <div className="relative flex items-center gap-3">
                    <div className="absolute -top-8 left-5 h-8 w-0.5 bg-border" />
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-primary/40 text-primary">
                      <ArrowRight className="size-4" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Your Future</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Life Events */}
          <Card className="glass-card rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Available Life Events</CardTitle>
              <CardDescription>Click to add events to your path</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {availableEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onAdd={() => addEvent(event)}
                    disabled={selectedIds.has(event.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scenario Parameters */}
          <Card className="glass-card rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Base Parameters</CardTitle>
              <CardDescription>Adjust your baseline financial values</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="salary">Base Monthly Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={params.salary}
                    onChange={(e) => setParams({ ...params, salary: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="tuition">Existing Debt/Loan</Label>
                  <Input
                    id="tuition"
                    type="number"
                    value={params.tuition}
                    onChange={(e) => setParams({ ...params, tuition: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label>Loan Interest Rate</Label>
                  <span className="text-sm font-semibold text-primary">
                    {params.loanRate[0] + "%"}
                  </span>
                </div>
                <Slider
                  value={params.loanRate}
                  onValueChange={(v) => setParams({ ...params, loanRate: v })}
                  min={0}
                  max={20}
                  step={0.5}
                  className="py-2"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="living-cost">Monthly Living Cost</Label>
                  <Input
                    id="living-cost"
                    type="number"
                    value={params.livingCost}
                    onChange={(e) => setParams({ ...params, livingCost: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Work Hours/Week</Label>
                    <span className="text-sm font-semibold text-primary">
                      {params.workHours[0] + "h"}
                    </span>
                  </div>
                  <Slider
                    value={params.workHours}
                    onValueChange={(v) => setParams({ ...params, workHours: v })}
                    min={10}
                    max={60}
                    step={1}
                    className="py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Preview + Stress Test */}
        <div className="flex flex-col gap-6">
          <LivePreview
            selectedEvents={selectedEvents}
            stressActive={stressActive}
            params={params}
          />
          <StressTestPanel active={stressActive} onToggle={toggleStress} />
          <Button
            size="lg"
            className="w-full gap-2 rounded-xl text-base shadow-lg shadow-primary/20"
            onClick={handleRunSimulation}
            disabled={selectedEvents.length === 0}
          >
            Run Intelligence Simulation
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
