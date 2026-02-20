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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OpportunityScore } from "@/components/opportunity-score"
import { RiskGauge } from "@/components/risk-gauge"
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  User,
  MapPin,
  GraduationCap,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

function computeScores(data: {
  age: string
  education: string
  status: string
  income: number
  location: string
  expenses: string
  hasContract: string
}) {
  const age = Number(data.age) || 20
  const income = data.income
  const expenses = Number(data.expenses) || 0
  const savingsRatio = income > 0 ? Math.max(0, (income - expenses) / income) * 100 : 0

  let eduScore = 30
  if (data.education === "vocational") eduScore = 50
  if (data.education === "bachelors") eduScore = 70
  if (data.education === "masters") eduScore = 85
  if (data.education === "doctorate") eduScore = 95

  const opportunity = Math.round(
    eduScore * 0.4 + Math.min(savingsRatio, 100) * 0.3 + (age >= 18 && age <= 30 ? 80 : 50) * 0.3
  )

  const stability = Math.round(
    Math.min(savingsRatio, 100) * 0.5 + (data.location === "urban" ? 60 : 75) * 0.3 + eduScore * 0.2
  )

  let contractSafety = 85
  if (data.hasContract === "none") contractSafety = 15
  if (data.hasContract === "informal") contractSafety = 35
  if (data.hasContract === "verbal") contractSafety = 50

  const riskLevel = contractSafety < 40 ? "high" : contractSafety < 60 ? "medium" : "low"

  return { opportunity, stability, contractSafety, riskLevel }
}

function LegalGuardianCard({
  hasContract,
  contractSafety,
  riskLevel,
}: {
  hasContract: string
  contractSafety: number
  riskLevel: string
}) {
  const warnings = []
  if (hasContract === "none") {
    warnings.push("No employment contract detected. You have zero legal protection against exploitation.")
    warnings.push("Employers must provide a written contract by law (Labor Protection Act B.E. 2541).")
  }
  if (hasContract === "informal") {
    warnings.push("Informal contracts may not be legally enforceable in Thai labor courts.")
    warnings.push("Request a formal written agreement specifying wages, hours, and conditions.")
  }
  if (hasContract === "verbal") {
    warnings.push("Verbal agreements are difficult to prove. Always request written documentation.")
  }

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6",
      riskLevel === "high" ? "ring-2 ring-danger/30" : riskLevel === "medium" ? "ring-2 ring-warning/30" : ""
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          riskLevel === "high" ? "bg-danger/10 text-danger" :
          riskLevel === "medium" ? "bg-warning/10 text-warning" :
          "bg-success/10 text-success"
        )}>
          <Shield className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Legal Guardian</h3>
          <p className="text-xs text-muted-foreground">Contract Safety Assessment</p>
        </div>
        <div className="ml-auto">
          <RiskGauge value={contractSafety} label="Safety" size={80} />
        </div>
      </div>

      {warnings.length > 0 ? (
        <div className="flex flex-col gap-2">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-danger/5 p-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger" />
              <p className="text-xs leading-relaxed text-foreground">{w}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-lg bg-success/5 p-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
          <p className="text-xs leading-relaxed text-foreground">
            Your contract appears to have standard legal protections. Always verify termination
            clauses and overtime policies.
          </p>
        </div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [age, setAge] = useState("")
  const [education, setEducation] = useState("")
  const [status, setStatus] = useState("")
  const [income, setIncome] = useState([25000])
  const [location, setLocation] = useState("")
  const [expenses, setExpenses] = useState("")
  const [hasContract, setHasContract] = useState("")

  const scores = computeScores({
    age, education, status, income: income[0], location, expenses, hasContract,
  })

  function handleContinue() {
    router.push("/scenario")
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Progress indicator */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 1 of 3</span>
          <span className="text-muted-foreground">Profile & Risk Assessment</span>
        </div>
        <Progress value={33} className="h-2" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Profile & Risk Assessment
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your information helps calculate Opportunity Scores and identify potential risks
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: Form */}
        <Card className="glass-card rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="size-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              All data stays on your device. Nothing is sent to any server.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 22"
                  min={15}
                  max={35}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="education">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="size-3.5 text-primary" />
                    Education Level
                  </span>
                </Label>
                <Select value={education} onValueChange={setEducation}>
                  <SelectTrigger id="education" className="w-full rounded-xl">
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="vocational">Vocational / Diploma</SelectItem>
                    <SelectItem value="bachelors">{"Bachelor's Degree"}</SelectItem>
                    <SelectItem value="masters">{"Master's Degree"}</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Current Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="w-full rounded-xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="supporting">Supporting Family</SelectItem>
                    <SelectItem value="unemployed">Unemployed / Seeking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="location">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary" />
                    Location
                  </span>
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="w-full rounded-xl">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="suburban">Suburban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label>
                  <span className="flex items-center gap-1.5">
                    <Wallet className="size-3.5 text-primary" />
                    Monthly Family Income
                  </span>
                </Label>
                <span className="text-sm font-semibold text-primary">
                  {"\u0E3F" + income[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={income}
                onValueChange={setIncome}
                min={5000}
                max={200000}
                step={1000}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{"\u0E3F5,000"}</span>
                <span>{"\u0E3F200,000"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="expenses">Monthly Personal Expenses</Label>
              <Input
                id="expenses"
                type="number"
                placeholder="e.g. 8000"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Contract Safety - Legal Guardian Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="contract">
                <span className="flex items-center gap-1.5">
                  <FileWarning className="size-3.5 text-primary" />
                  Employment Contract Type
                </span>
              </Label>
              <Select value={hasContract} onValueChange={setHasContract}>
                <SelectTrigger id="contract" className="w-full rounded-xl">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal Written Contract</SelectItem>
                  <SelectItem value="verbal">Verbal Agreement Only</SelectItem>
                  <SelectItem value="informal">Informal / Day-labor</SelectItem>
                  <SelectItem value="none">No Contract</SelectItem>
                  <SelectItem value="student-na">{"N/A (Student)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Right: Live Score Panel */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <OpportunityScore
              score={scores.opportunity}
              label="Opportunity Score"
              trend={scores.opportunity >= 60 ? "up" : "down"}
              trendLabel={scores.opportunity >= 60 ? "Good" : "At Risk"}
            />
            <OpportunityScore
              score={scores.stability}
              label="Stability Index"
              trend={scores.stability >= 50 ? "up" : "down"}
              trendLabel={scores.stability >= 50 ? "Stable" : "Unstable"}
            />
          </div>

          {/* Legal Guardian Card */}
          {hasContract && (
            <LegalGuardianCard
              hasContract={hasContract}
              contractSafety={scores.contractSafety}
              riskLevel={scores.riskLevel}
            />
          )}

          {/* Initial risk summary */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Initial Assessment</h3>
            <div className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
              <p>
                {scores.opportunity >= 60
                  ? "Your profile shows strong potential. Education and income levels suggest good career mobility."
                  : "Your profile indicates some risk factors. Consider exploring vocational training through the Royal Path program."}
              </p>
              {scores.contractSafety < 50 && hasContract && (
                <p className="font-medium text-danger">
                  Warning: Your employment situation lacks legal protection. Visit the Legal Guardian section for guidance.
                </p>
              )}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full gap-2 rounded-xl text-base shadow-lg shadow-primary/20"
            onClick={handleContinue}
          >
            Continue to Decision Tree
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
