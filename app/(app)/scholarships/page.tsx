"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RiskBadge } from "@/components/risk-badge"
import {
  GraduationCap,
  ExternalLink,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  Filter,
  ArrowRight,
  Shield,
  Search,
  TrendingUp,
  Sparkles,
  Star,
  AlertTriangle,
  Banknote,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ScholarshipCategory = "all" | "government" | "royal" | "emergency" | "vocational" | "digital"

interface Scholarship {
  id: number
  name: string
  provider: string
  amount: string
  deadline: string
  eligibility: string
  matchScore: number
  risk: "low" | "medium" | "high"
  category: ScholarshipCategory
  tags: string[]
  featured?: boolean
  urgency?: "high" | "medium" | "low"
  description: string
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "King's Scholarship (Tuition Waiver)",
    provider: "Bureau of the Royal Household",
    amount: "Full Tuition",
    deadline: "March 31, 2026",
    eligibility: "Thai nationals, age 16-25, GPA 3.0+",
    matchScore: 92,
    risk: "low",
    category: "royal",
    tags: ["Full Tuition", "Government", "Royal"],
    featured: true,
    urgency: "high",
    description: "Prestigious royal scholarship covering full tuition for outstanding students. Includes mentorship and career placement support through the Royal Household network.",
  },
  {
    id: 2,
    name: "TPQI Vocational Skills Grant",
    provider: "Thailand Professional Qualification Institute",
    amount: "\u0E3F50,000",
    deadline: "April 15, 2026",
    eligibility: "Vocational students, income < \u0E3F25,000/mo",
    matchScore: 88,
    risk: "low",
    category: "vocational",
    tags: ["Vocational", "Skills Training"],
    urgency: "medium",
    description: "Grant for vocational students to pursue professional qualification certifications. Covers training materials, exam fees, and travel to testing centers.",
  },
  {
    id: 3,
    name: "EEC Workforce Development Fund",
    provider: "Eastern Economic Corridor Office",
    amount: "\u0E3F80,000",
    deadline: "May 1, 2026",
    eligibility: "STEM students willing to work in EEC zone",
    matchScore: 76,
    risk: "low",
    category: "government",
    tags: ["STEM", "EEC Region", "Government"],
    urgency: "medium",
    description: "Funded by the EEC initiative to build a skilled workforce in Chachoengsao, Chonburi, and Rayong provinces. Includes guaranteed internship placement.",
  },
  {
    id: 4,
    name: "Digital Economy Scholarship",
    provider: "Ministry of Digital Economy & Society",
    amount: "\u0E3F120,000",
    deadline: "June 30, 2026",
    eligibility: "IT/Computer Science students, Thai nationals",
    matchScore: 70,
    risk: "low",
    category: "digital",
    tags: ["Digital", "Technology", "Government"],
    urgency: "low",
    description: "Scholarship for students pursuing careers in digital economy sectors including AI, cybersecurity, cloud computing, and e-commerce platform development.",
  },
  {
    id: 5,
    name: "Royal Initiative Community Enterprise Grant",
    provider: "Office of Community Enterprise Promotion",
    amount: "\u0E3F30,000 + mentorship",
    deadline: "Rolling",
    eligibility: "Youth starting community-based businesses",
    matchScore: 65,
    risk: "low",
    category: "royal",
    tags: ["Enterprise", "Royal Initiative", "Mentorship"],
    urgency: "low",
    description: "Supports youth entrepreneurs building community-based enterprises aligned with the Sufficiency Economy Philosophy. Includes 6 months of mentorship from established entrepreneurs.",
  },
  {
    id: 6,
    name: "Emergency Youth Support Fund",
    provider: "Ministry of Social Development",
    amount: "\u0E3F15,000 one-time",
    deadline: "Ongoing",
    eligibility: "At-risk youth, age 15-25, low-income families",
    matchScore: 95,
    risk: "low",
    category: "emergency",
    tags: ["Emergency", "At-Risk Youth", "Immediate"],
    featured: true,
    urgency: "high",
    description: "Emergency financial support for youth at risk of entering informal labor. No application fee. Fast-track processing within 5 business days for qualified applicants.",
  },
  {
    id: 7,
    name: "Agricultural Innovation Youth Fund",
    provider: "Ministry of Agriculture",
    amount: "\u0E3F60,000 + land access",
    deadline: "July 15, 2026",
    eligibility: "Youth interested in sustainable agriculture, age 18-30",
    matchScore: 72,
    risk: "low",
    category: "government",
    tags: ["Agriculture", "Innovation", "Sustainability"],
    urgency: "low",
    description: "Supports young farmers adopting modern sustainable agriculture techniques. Includes access to government research plots and subsidized organic certification.",
  },
  {
    id: 8,
    name: "Doi Kham Youth Apprenticeship",
    provider: "Doi Kham Food Products (Royal Project)",
    amount: "\u0E3F20,000 + training",
    deadline: "Rolling",
    eligibility: "Northern region youth, age 16-28",
    matchScore: 78,
    risk: "low",
    category: "royal",
    tags: ["Royal Project", "Food Processing", "Apprenticeship"],
    urgency: "medium",
    description: "Apprenticeship program at Doi Kham Royal Project facilities. Learn food processing, quality control, and supply chain management with guaranteed employment for top performers.",
  },
]

const categories: { value: ScholarshipCategory; label: string; count: number }[] = [
  { value: "all", label: "All", count: scholarships.length },
  { value: "royal", label: "Royal Initiative", count: scholarships.filter((s) => s.category === "royal").length },
  { value: "government", label: "Government", count: scholarships.filter((s) => s.category === "government").length },
  { value: "emergency", label: "Emergency", count: scholarships.filter((s) => s.category === "emergency").length },
  { value: "vocational", label: "Vocational", count: scholarships.filter((s) => s.category === "vocational").length },
  { value: "digital", label: "Digital", count: scholarships.filter((s) => s.category === "digital").length },
]

function UrgencyBadge({ urgency }: { urgency: string }) {
  if (urgency === "high") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-semibold text-danger">
        <AlertTriangle className="size-2.5" />
        Closing Soon
      </span>
    )
  }
  return null
}

function MatchBar({ score }: { score: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">Profile Match</span>
        <span className={cn(
          "text-xs font-bold tabular-nums",
          score >= 80 ? "text-success" : score >= 60 ? "text-primary" : "text-warning"
        )}>
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-1.5" />
    </div>
  )
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={cn(
      "glass-card rounded-2xl shadow-sm transition-all hover:shadow-md",
      scholarship.featured && "ring-2 ring-primary/20"
    )}>
      {scholarship.featured && (
        <div className="flex items-center justify-center gap-1.5 bg-primary/5 py-1.5">
          <Star className="size-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Top Match</span>
        </div>
      )}
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-tight">{scholarship.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{scholarship.provider}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <UrgencyBadge urgency={scholarship.urgency || "low"} />
            <RiskBadge level={scholarship.risk} label="Safe" />
          </div>
        </div>

        {/* Match bar */}
        <MatchBar score={scholarship.matchScore} />

        {/* Key details */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-background/50 p-2.5">
            <DollarSign className="size-3.5 text-success shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Amount</p>
              <p className="text-xs font-semibold text-foreground">{scholarship.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/50 p-2.5">
            <Clock className="size-3.5 text-warning shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Deadline</p>
              <p className="text-xs font-semibold text-foreground">{scholarship.deadline}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-background/50 p-2.5">
          <Users className="size-3.5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground">Eligibility</p>
            <p className="text-xs text-foreground">{scholarship.eligibility}</p>
          </div>
        </div>

        {/* Expandable description */}
        {expanded && (
          <p className="text-xs leading-relaxed text-muted-foreground rounded-lg bg-primary/5 p-3">
            {scholarship.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {scholarship.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 rounded-xl text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl">
            <ExternalLink className="size-3" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScholarshipsPage() {
  const [activeCategory, setActiveCategory] = useState<ScholarshipCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = scholarships.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const totalFunding = scholarships.reduce((sum) => sum + 1, 0)
  const avgMatch = Math.round(scholarships.reduce((sum, s) => sum + s.matchScore, 0) / scholarships.length)

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Micro-Scholarship Matching
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-matched grants, royal scholarships, and financial aid based on your risk profile
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="glass-card rounded-full px-4 py-2 text-sm font-semibold text-primary flex items-center gap-2">
            <Sparkles className="size-4" />
            {filtered.length + " scholarships matched"}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-1">
          <Banknote className="size-5 text-success" />
          <span className="text-2xl font-bold text-foreground">{totalFunding}</span>
          <span className="text-xs text-muted-foreground">Programs Available</span>
        </div>
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-1">
          <TrendingUp className="size-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">{avgMatch + "%"}</span>
          <span className="text-xs text-muted-foreground">Avg Match Score</span>
        </div>
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-1">
          <Shield className="size-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">3</span>
          <span className="text-xs text-muted-foreground">Royal Initiative</span>
        </div>
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-1">
          <AlertTriangle className="size-5 text-warning" />
          <span className="text-2xl font-bold text-foreground">2</span>
          <span className="text-xs text-muted-foreground">Closing Soon</span>
        </div>
      </div>

      {/* Info banner */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Filter className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Personalized Matching</h3>
            <p className="text-xs leading-relaxed text-muted-foreground mt-1">
              These scholarships are ranked by compatibility with your profile. High-risk scenarios
              automatically surface emergency funds and support programs. Complete your{" "}
              <Link href="/profile" className="text-primary underline underline-offset-2">profile</Link>{" "}
              to improve match accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scholarships, providers, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat.label}
              <span className="ml-1 opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scholarship grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Search className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No scholarships match your search.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setActiveCategory("all") }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
          <Link href="/results">
            Back to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/royal-path">
            <Shield className="size-4" />
            Explore Royal Path
          </Link>
        </Button>
      </div>
    </div>
  )
}
