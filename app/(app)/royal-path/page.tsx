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
import { RiskBadge } from "@/components/risk-badge"
import { RiskGauge } from "@/components/risk-gauge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Sprout,
  Hammer,
  Heart,
  Utensils,
  Shirt,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  DollarSign,
  BarChart3,
  Sparkles,
  Star,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RoyalPathway {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  riskLevel: "low" | "medium"
  riskLabel: string
  description: string
  startupCost: string
  monthlyIncome: string
  growthTimeline: string
  regions: string[]
  skills: string[]
  opportunityScore: number
  stabilityScore: number
  yearOneIncome: number
  yearThreeIncome: number
  yearFiveIncome: number
  successRate: number
  mentorshipIncluded: boolean
  governmentBacked: boolean
}

const pathways: RoyalPathway[] = [
  {
    id: "organic-farming",
    title: "Sustainable Agriculture",
    subtitle: "Royal Initiative Organic Farming",
    icon: Sprout,
    riskLevel: "low",
    riskLabel: "Low Risk",
    description:
      "Follow Her Majesty's Sufficiency Economy Philosophy. Learn organic farming, crop rotation, and sustainable water management with government support and guaranteed market access through Doi Kham distribution channels.",
    startupCost: "\u0E3F15,000 - \u0E3F30,000",
    monthlyIncome: "\u0E3F12,000 - \u0E3F25,000",
    growthTimeline: "6-12 months to profitability",
    regions: ["Northern", "Northeastern", "Central"],
    skills: ["Organic certification", "Water management", "Soil science", "Market access"],
    opportunityScore: 68,
    stabilityScore: 82,
    yearOneIncome: 12000,
    yearThreeIncome: 18000,
    yearFiveIncome: 25000,
    successRate: 78,
    mentorshipIncluded: true,
    governmentBacked: true,
  },
  {
    id: "traditional-crafts",
    title: "Traditional Craftsmanship",
    subtitle: "Local Wisdom Heritage Arts",
    icon: Hammer,
    riskLevel: "low",
    riskLabel: "Low Risk",
    description:
      "Preserve Thai cultural heritage through traditional crafts like silk weaving, pottery, woodcarving, and metalwork. Royal projects provide training, materials, and market channels through OTOP and international exhibitions.",
    startupCost: "\u0E3F5,000 - \u0E3F20,000",
    monthlyIncome: "\u0E3F10,000 - \u0E3F20,000",
    growthTimeline: "3-9 months with mentorship",
    regions: ["Northern", "Northeastern", "Southern"],
    skills: ["Traditional weaving", "Pottery", "Woodcarving", "Product design"],
    opportunityScore: 60,
    stabilityScore: 78,
    yearOneIncome: 10000,
    yearThreeIncome: 15000,
    yearFiveIncome: 20000,
    successRate: 72,
    mentorshipIncluded: true,
    governmentBacked: true,
  },
  {
    id: "community-health",
    title: "Community Health Worker",
    subtitle: "Royal Health Volunteer Program",
    icon: Heart,
    riskLevel: "low",
    riskLabel: "Very Low Risk",
    description:
      "Train as a community health volunteer or assistant under the Royal Health initiative. Stable government-backed positions with clear career progression to nursing or healthcare management roles.",
    startupCost: "\u0E3F0 (Government-funded training)",
    monthlyIncome: "\u0E3F13,000 - \u0E3F22,000",
    growthTimeline: "3-6 months training",
    regions: ["All Regions"],
    skills: ["First aid", "Health education", "Patient care", "Data collection"],
    opportunityScore: 72,
    stabilityScore: 90,
    yearOneIncome: 13000,
    yearThreeIncome: 18000,
    yearFiveIncome: 22000,
    successRate: 88,
    mentorshipIncluded: true,
    governmentBacked: true,
  },
  {
    id: "food-enterprise",
    title: "Community Food Enterprise",
    subtitle: "Royal Project Food Processing",
    icon: Utensils,
    riskLevel: "low",
    riskLabel: "Low Risk",
    description:
      "Join Royal Project-backed food processing and community enterprise programs. Learn food safety, packaging, and direct-to-consumer sales with access to Doi Kham brand distribution network.",
    startupCost: "\u0E3F10,000 - \u0E3F25,000",
    monthlyIncome: "\u0E3F11,000 - \u0E3F22,000",
    growthTimeline: "4-8 months to first income",
    regions: ["Northern", "Central", "Eastern"],
    skills: ["Food safety (GMP)", "Packaging", "E-commerce", "Supply chain"],
    opportunityScore: 65,
    stabilityScore: 80,
    yearOneIncome: 11000,
    yearThreeIncome: 16000,
    yearFiveIncome: 22000,
    successRate: 75,
    mentorshipIncluded: true,
    governmentBacked: true,
  },
  {
    id: "textile-fashion",
    title: "Sustainable Fashion",
    subtitle: "Queen Sirikit Textile Initiative",
    icon: Shirt,
    riskLevel: "medium",
    riskLabel: "Low-Medium",
    description:
      "Combine traditional Thai textiles with modern fashion design. The Queen Sirikit Foundation provides training in textile arts, business management, and access to premium domestic and international markets.",
    startupCost: "\u0E3F8,000 - \u0E3F25,000",
    monthlyIncome: "\u0E3F10,000 - \u0E3F30,000",
    growthTimeline: "6-12 months to market",
    regions: ["Northeastern", "Northern", "Central"],
    skills: ["Textile design", "Natural dyeing", "Business planning", "Branding"],
    opportunityScore: 70,
    stabilityScore: 74,
    yearOneIncome: 10000,
    yearThreeIncome: 20000,
    yearFiveIncome: 30000,
    successRate: 68,
    mentorshipIncluded: true,
    governmentBacked: false,
  },
]

function IncomeProgression({ pathway }: { pathway: RoyalPathway }) {
  const maxIncome = Math.max(pathway.yearOneIncome, pathway.yearThreeIncome, pathway.yearFiveIncome)
  const bars = [
    { label: "Year 1", value: pathway.yearOneIncome, pct: (pathway.yearOneIncome / maxIncome) * 100 },
    { label: "Year 3", value: pathway.yearThreeIncome, pct: (pathway.yearThreeIncome / maxIncome) * 100 },
    { label: "Year 5", value: pathway.yearFiveIncome, pct: (pathway.yearFiveIncome / maxIncome) * 100 },
  ]

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Income Progression
      </span>
      <div className="flex flex-col gap-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="w-10 text-[10px] text-muted-foreground shrink-0">{bar.label}</span>
            <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700"
                style={{ width: bar.pct + "%" }}
              />
            </div>
            <span className="text-[10px] font-semibold text-foreground tabular-nums w-16 text-right">
              {"\u0E3F" + bar.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PathwayCard({ pathway }: { pathway: RoyalPathway }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = pathway.icon

  return (
    <Card className="glass-card rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-primary to-success" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base">{pathway.title}</CardTitle>
              <CardDescription className="text-xs">{pathway.subtitle}</CardDescription>
            </div>
          </div>
          <RiskBadge level={pathway.riskLevel} label={pathway.riskLabel} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {pathway.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5">
          {pathway.governmentBacked && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-semibold text-success">
              <Shield className="size-2.5" />
              Gov Backed
            </span>
          )}
          {pathway.mentorshipIncluded && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
              <BookOpen className="size-2.5" />
              Mentorship
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
            <Star className="size-2.5" />
            {pathway.successRate + "% success"}
          </span>
        </div>

        {/* Score gauges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Opportunity</span>
              <span className="font-bold text-primary">{pathway.opportunityScore}</span>
            </div>
            <Progress value={pathway.opportunityScore} className="h-1.5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Stability</span>
              <span className="font-bold text-success">{pathway.stabilityScore}</span>
            </div>
            <Progress value={pathway.stabilityScore} className="h-1.5" />
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-0.5 rounded-lg bg-background/50 p-2">
            <DollarSign className="size-3 text-success" />
            <span className="text-[10px] text-muted-foreground">Startup</span>
            <span className="text-[11px] font-semibold text-foreground leading-tight">{pathway.startupCost}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg bg-background/50 p-2">
            <TrendingUp className="size-3 text-primary" />
            <span className="text-[10px] text-muted-foreground">Monthly</span>
            <span className="text-[11px] font-semibold text-foreground leading-tight">{pathway.monthlyIncome}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg bg-background/50 p-2">
            <Clock className="size-3 text-warning" />
            <span className="text-[10px] text-muted-foreground">Timeline</span>
            <span className="text-[11px] font-semibold text-foreground leading-tight">{pathway.growthTimeline}</span>
          </div>
        </div>

        {/* Expandable section */}
        {expanded && (
          <div className="flex flex-col gap-4 pt-1">
            {/* Income progression */}
            <IncomeProgression pathway={pathway} />

            {/* Regions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <MapPin className="size-3 text-muted-foreground shrink-0" />
              {pathway.regions.map((region) => (
                <span key={region} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                  {region}
                </span>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Skills You Will Learn
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pathway.skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] text-foreground">
                    <CheckCircle2 className="size-2.5 text-success" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-1 rounded-xl text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp className="size-3" />
              </>
            ) : (
              <>
                View Details
                <ChevronDown className="size-3" />
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1 rounded-xl text-xs" asChild>
            <Link href="/scenario">
              Add to Simulation
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RoyalPathPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Royal Path Recommendations
        </h1>
        <p className="mt-2 text-muted-foreground">
          Low-risk career alternatives inspired by Her Majesty's Royal Projects and Sufficiency Economy Philosophy
        </p>
      </div>

      {/* Hero banner */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-success/5 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
              <Shield className="size-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                Why Royal Path?
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Royal Initiative programs provide a safer alternative to urban migration and informal labor.
                These pathways offer government-backed training, low startup costs, mentorship, and
                guaranteed market access - all designed to protect youth while building sustainable livelihoods.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="flex flex-col items-center gap-1 glass-card-strong rounded-xl p-3">
                <TrendingUp className="size-4 text-primary" />
                <span className="text-lg font-bold text-foreground">80%</span>
                <span className="text-[10px] text-muted-foreground text-center">Lower Cost</span>
              </div>
              <div className="flex flex-col items-center gap-1 glass-card-strong rounded-xl p-3">
                <Shield className="size-4 text-success" />
                <span className="text-lg font-bold text-foreground">92%</span>
                <span className="text-[10px] text-muted-foreground text-center">Safety Score</span>
              </div>
              <div className="flex flex-col items-center gap-1 glass-card-strong rounded-xl p-3">
                <Users className="size-4 text-primary" />
                <span className="text-lg font-bold text-foreground">5,000+</span>
                <span className="text-[10px] text-muted-foreground text-center">Youth Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick comparison row */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Quick Comparison: Royal Path vs Urban Migration</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Avg Startup Cost", royal: "\u0E3F8,000", urban: "\u0E3F45,000", royalBetter: true },
            { label: "Year 1 Income", royal: "\u0E3F12,000/mo", urban: "\u0E3F15,000/mo", royalBetter: false },
            { label: "Year 5 Income", royal: "\u0E3F24,000/mo", urban: "\u0E3F22,000/mo", royalBetter: true },
            { label: "Safety Score", royal: "85/100", urban: "42/100", royalBetter: true },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{item.label}</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Royal</span>
                  <span className={cn("text-xs font-bold", item.royalBetter ? "text-success" : "text-foreground")}>
                    {item.royal}
                    {item.royalBetter && <CheckCircle2 className="inline size-3 ml-1" />}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Urban</span>
                  <span className={cn("text-xs font-bold", !item.royalBetter ? "text-warning" : "text-foreground")}>
                    {item.urban}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway gauges overview */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Safety & Opportunity Overview</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {pathways.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-1">
              <RiskGauge value={p.stabilityScore} label={p.title.split(" ")[0]} size={80} />
            </div>
          ))}
        </div>
      </div>

      {/* Pathway cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <PathwayCard key={pathway.id} pathway={pathway} />
        ))}
      </div>

      {/* AI recommendation */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/20 shrink-0">
              <Zap className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Pathway Recommendation</h3>
              <p className="mt-2 leading-relaxed text-primary-foreground/90">
                Based on your profile, <strong>Community Health Worker</strong> offers the best balance of
                stability (90/100) and opportunity (72/100) with zero startup cost. If you prefer
                entrepreneurship, <strong>Sustainable Agriculture</strong> provides strong government backing
                with income potential reaching 25,000/month by Year 5. Both pathways include mentorship
                and are significantly safer than urban informal labor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
          <Link href="/scenario">
            Build Path with Royal Options
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/scholarships">
            <GraduationCap className="size-4" />
            Find Scholarships
          </Link>
        </Button>
      </div>
    </div>
  )
}
