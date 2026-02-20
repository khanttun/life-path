"use client"

import { useState } from "react"
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
import {
  GraduationCap,
  Briefcase,
  Building2,
  FileText,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Wallet,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Scenario {
  id: string
  icon: React.ElementType
  title: string
  description: string
}

const scenarios: Scenario[] = [
  {
    id: "student-loan",
    icon: GraduationCap,
    title: "Take Student Loan",
    description: "Fund your education with a student loan",
  },
  {
    id: "full-time",
    icon: Briefcase,
    title: "Work Full-Time",
    description: "Start working immediately after school",
  },
  {
    id: "move-city",
    icon: Building2,
    title: "Move to Bangkok",
    description: "Relocate to the capital for opportunities",
  },
  {
    id: "informal-contract",
    icon: FileText,
    title: "Accept Informal Contract",
    description: "Take an informal work arrangement",
  },
  {
    id: "small-business",
    icon: ShoppingBag,
    title: "Start Small Business",
    description: "Launch your own small business",
  },
]

interface ScenarioParams {
  salary: string
  tuition: string
  loanRate: number[]
  livingCost: string
  workHours: number[]
}

function ScenarioCard({
  scenario,
  isSelected,
  onSelect,
}: {
  scenario: Scenario
  isSelected: boolean
  onSelect: () => void
}) {
  const Icon = scenario.icon

  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all",
        isSelected
          ? "border-primary bg-secondary shadow-md"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl transition-colors",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="size-7" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">
        {scenario.title}
      </h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {scenario.description}
      </p>
    </button>
  )
}

function LivePreview({ params }: { params: ScenarioParams }) {
  const salary = Number(params.salary) || 0
  const tuition = Number(params.tuition) || 0
  const livingCost = Number(params.livingCost) || 0
  const loanRate = params.loanRate[0]

  const monthlyNet = salary - livingCost
  const monthlySavings = Math.max(0, monthlyNet * 0.2)
  const debtProjection = tuition * (1 + loanRate / 100)
  const riskLevel = debtProjection > salary * 24 ? "high" : debtProjection > salary * 12 ? "medium" : "low"

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Live Preview</CardTitle>
        <CardDescription>Estimated projections based on your inputs</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Net Income</p>
              <p className="text-lg font-bold text-foreground">
                {"฿" + monthlyNet.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wallet className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Savings</p>
              <p className="text-lg font-bold text-foreground">
                {"฿" + monthlySavings.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground">{"/mo"}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Debt Projection</p>
              <p className="text-lg font-bold text-foreground">
                {"฿" + Math.round(debtProjection).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground">Risk Indicator</span>
          <RiskBadge
            level={riskLevel}
            label={riskLevel === "low" ? "Low Risk" : riskLevel === "medium" ? "Medium Risk" : "High Risk"}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScenarioPage() {
  const router = useRouter()
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [params, setParams] = useState<ScenarioParams>({
    salary: "25000",
    tuition: "150000",
    loanRate: [5],
    livingCost: "8000",
    workHours: [40],
  })

  function handleRunSimulation() {
    router.push("/results")
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Progress indicator */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 2 of 3</span>
          <span className="text-muted-foreground">Scenario Builder</span>
        </div>
        <Progress value={66} className="h-2" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Choose Your Decision Scenario
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select a life scenario and customize the parameters
        </p>
      </div>

      {/* Scenario selection cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenario === scenario.id}
            onSelect={() => setSelectedScenario(scenario.id)}
          />
        ))}
      </div>

      {/* Parameters and preview */}
      {selectedScenario && (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Editable parameters */}
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Scenario Parameters</CardTitle>
              <CardDescription>
                Customize the values for your simulation
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="salary">Expected Monthly Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={params.salary}
                    onChange={(e) =>
                      setParams({ ...params, salary: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="tuition">Tuition / Startup Cost</Label>
                  <Input
                    id="tuition"
                    type="number"
                    value={params.tuition}
                    onChange={(e) =>
                      setParams({ ...params, tuition: e.target.value })
                    }
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="living-cost">Monthly Living Cost</Label>
                <Input
                  id="living-cost"
                  type="number"
                  value={params.livingCost}
                  onChange={(e) =>
                    setParams({ ...params, livingCost: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label>Work Hours per Week</Label>
                  <span className="text-sm font-semibold text-primary">
                    {params.workHours[0] + "h"}
                  </span>
                </div>
                <Slider
                  value={params.workHours}
                  onValueChange={(v) =>
                    setParams({ ...params, workHours: v })
                  }
                  min={10}
                  max={60}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10h</span>
                  <span>60h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live preview side panel */}
          <div className="flex flex-col gap-6">
            <LivePreview params={params} />
            <Button
              size="lg"
              className="w-full gap-2 rounded-xl text-base"
              onClick={handleRunSimulation}
            >
              Run Simulation
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
