"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScoreBadge } from "@/components/score-badge"
import { TealProgressBar } from "@/components/teal-progress-bar"
import { RadarComparisonChart } from "@/components/radar-comparison-chart"
import {
  Target,
  TrendingUp,
  Shield,
  BarChart3,
  MapPin,
  Banknote,
} from "lucide-react"

const radarData = [
  { subject: "Technical", you: 78, ideal: 90 },
  { subject: "Communication", you: 85, ideal: 85 },
  { subject: "Leadership", you: 60, ideal: 75 },
  { subject: "Cultural Fit", you: 72, ideal: 80 },
  { subject: "Adaptability", you: 88, ideal: 82 },
  { subject: "Problem Solving", you: 75, ideal: 88 },
]

const matchResults = [
  {
    company: "Agoda – Data Analyst Intern",
    location: "Bangkok",
    salary: "25,000 THB",
    culturalFit: 82,
    careerMobility: 88,
    riskLevel: "Low",
    industryGrowth: 92,
  },
  {
    company: "SCB – Business Intelligence Intern",
    location: "Bangkok",
    salary: "22,000 THB",
    culturalFit: 75,
    careerMobility: 80,
    riskLevel: "Low",
    industryGrowth: 78,
  },
  {
    company: "True Corp – Tech Intern",
    location: "Bangkok",
    salary: "20,000 THB",
    culturalFit: 70,
    careerMobility: 72,
    riskLevel: "Medium",
    industryGrowth: 85,
  },
]

export function DeepInternshipMatcher() {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <Target className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Deep Internship Matcher
          </h2>
          <Badge className="bg-primary text-primary-foreground border-0">
            Premium
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Advanced matching with cultural compatibility, career mobility, and
          risk projections.
        </p>
      </div>

      {/* Radar Chart */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">You vs Ideal Candidate</CardTitle>
          <CardDescription>
            Multi-dimensional comparison across key competencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadarComparisonChart data={radarData} />
        </CardContent>
      </Card>

      {/* Match Results */}
      <div className="flex flex-col gap-4">
        {matchResults.map((m, i) => (
          <Card key={i} className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-foreground">
                      {m.company}
                    </h4>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {m.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Banknote className="size-3.5" />
                        {m.salary}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={`border-0 ${
                      m.riskLevel === "Low"
                        ? "bg-[#22C55E]/10 text-[#16A34A]"
                        : "bg-[#F59E0B]/10 text-[#D97706]"
                    }`}
                  >
                    <Shield className="size-3 mr-1" />
                    {m.riskLevel} Risk
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="size-4" />
                      Cultural Compatibility
                    </span>
                    <ScoreBadge score={m.culturalFit} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="size-4" />
                      Career Mobility
                    </span>
                    <ScoreBadge score={m.careerMobility} size="sm" />
                  </div>
                  <div className="md:col-span-2">
                    <TealProgressBar
                      value={m.industryGrowth}
                      label="Industry Growth Outlook"
                      showLabel
                      variant="primary"
                      height="sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <button className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Run Deep Match Analysis
      </button>
    </section>
  )
}
