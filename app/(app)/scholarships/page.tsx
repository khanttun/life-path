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
  GraduationCap,
  ExternalLink,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  Filter,
  ArrowRight,
} from "lucide-react"

const scholarships = [
  {
    id: 1,
    name: "King's Scholarship (Tuition Waiver)",
    provider: "Bureau of the Royal Household",
    amount: "Full Tuition",
    deadline: "March 31, 2026",
    eligibility: "Thai nationals, age 16-25, GPA 3.0+",
    matchScore: 92,
    risk: "low" as const,
    tags: ["Full Tuition", "Government"],
  },
  {
    id: 2,
    name: "TPQI Vocational Skills Grant",
    provider: "Thailand Professional Qualification Institute",
    amount: "\u0E3F50,000",
    deadline: "April 15, 2026",
    eligibility: "Vocational students, income < \u0E3F25,000/mo",
    matchScore: 88,
    risk: "low" as const,
    tags: ["Vocational", "Skills Training"],
  },
  {
    id: 3,
    name: "EEC Workforce Development Fund",
    provider: "Eastern Economic Corridor Office",
    amount: "\u0E3F80,000",
    deadline: "May 1, 2026",
    eligibility: "STEM students willing to work in EEC zone",
    matchScore: 76,
    risk: "low" as const,
    tags: ["STEM", "EEC Region"],
  },
  {
    id: 4,
    name: "Digital Economy Scholarship",
    provider: "Ministry of Digital Economy & Society",
    amount: "\u0E3F120,000",
    deadline: "June 30, 2026",
    eligibility: "IT/Computer Science students, Thai nationals",
    matchScore: 70,
    risk: "low" as const,
    tags: ["Digital", "Technology"],
  },
  {
    id: 5,
    name: "Royal Initiative Community Enterprise Grant",
    provider: "Office of Community Enterprise Promotion",
    amount: "\u0E3F30,000 + mentorship",
    deadline: "Rolling",
    eligibility: "Youth starting community-based businesses",
    matchScore: 65,
    risk: "low" as const,
    tags: ["Enterprise", "Royal Initiative"],
  },
  {
    id: 6,
    name: "Emergency Youth Support Fund",
    provider: "Ministry of Social Development",
    amount: "\u0E3F15,000 one-time",
    deadline: "Ongoing",
    eligibility: "At-risk youth, age 15-25, low-income families",
    matchScore: 95,
    risk: "low" as const,
    tags: ["Emergency", "At-Risk Youth"],
  },
]

function ScholarshipCard({
  scholarship,
}: {
  scholarship: (typeof scholarships)[number]
}) {
  return (
    <Card className="glass-card rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
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
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-primary">{scholarship.matchScore + "% match"}</span>
            <RiskBadge level={scholarship.risk} label="Safe" />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-background/50 p-2">
            <DollarSign className="size-3.5 text-success" />
            <div>
              <p className="text-[10px] text-muted-foreground">Amount</p>
              <p className="text-xs font-semibold text-foreground">{scholarship.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/50 p-2">
            <Clock className="size-3.5 text-warning" />
            <div>
              <p className="text-[10px] text-muted-foreground">Deadline</p>
              <p className="text-xs font-semibold text-foreground">{scholarship.deadline}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-background/50 p-2">
          <Users className="size-3.5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground">Eligibility</p>
            <p className="text-xs text-foreground">{scholarship.eligibility}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {scholarship.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
              {tag}
            </span>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl mt-1">
          <ExternalLink className="size-3" />
          View Details & Apply
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ScholarshipsPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Micro-Scholarship Matching
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-matched grants, royal scholarships, and financial aid based on your risk profile
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="glass-card rounded-full px-4 py-2 text-sm font-semibold text-primary flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            6 scholarships matched
          </span>
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

      {/* Scholarship grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((s) => (
          <ScholarshipCard key={s.id} scholarship={s} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/results">
            Back to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 rounded-xl text-base" asChild>
          <Link href="/royal-path">
            Explore Royal Path
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
