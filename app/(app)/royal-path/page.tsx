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
  Clock,
  Users,
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
      "Follow Her Majesty's Sufficiency Economy Philosophy. Learn organic farming, crop rotation, and sustainable water management with government support and guaranteed market access.",
    startupCost: "\u0E3F15,000 - \u0E3F30,000",
    monthlyIncome: "\u0E3F12,000 - \u0E3F25,000",
    growthTimeline: "6-12 months to profitability",
    regions: ["Northern", "Northeastern", "Central"],
    skills: ["Organic certification", "Water management", "Soil science", "Market access"],
    opportunityScore: 68,
    stabilityScore: 82,
  },
  {
    id: "traditional-crafts",
    title: "Traditional Craftsmanship",
    subtitle: "Local Wisdom Heritage Arts",
    icon: Hammer,
    riskLevel: "low",
    riskLabel: "Low Risk",
    description:
      "Preserve Thai cultural heritage through traditional crafts like silk weaving, pottery, woodcarving, and metalwork. Royal projects provide training, materials, and market channels.",
    startupCost: "\u0E3F5,000 - \u0E3F20,000",
    monthlyIncome: "\u0E3F10,000 - \u0E3F20,000",
    growthTimeline: "3-9 months with mentorship",
    regions: ["Northern", "Northeastern", "Southern"],
    skills: ["Traditional weaving", "Pottery", "Woodcarving", "Product design"],
    opportunityScore: 60,
    stabilityScore: 78,
  },
  {
    id: "community-health",
    title: "Community Health Worker",
    subtitle: "Royal Health Volunteer Program",
    icon: Heart,
    riskLevel: "low",
    riskLabel: "Very Low Risk",
    description:
      "Train as a community health volunteer or assistant under the Royal Health initiative. Stable government-backed positions with clear career progression to nursing or healthcare.",
    startupCost: "\u0E3F0 (Government-funded training)",
    monthlyIncome: "\u0E3F13,000 - \u0E3F22,000",
    growthTimeline: "3-6 months training",
    regions: ["All Regions"],
    skills: ["First aid", "Health education", "Patient care", "Data collection"],
    opportunityScore: 72,
    stabilityScore: 90,
  },
  {
    id: "food-enterprise",
    title: "Community Food Enterprise",
    subtitle: "Royal Project Food Processing",
    icon: Utensils,
    riskLevel: "low",
    riskLabel: "Low Risk",
    description:
      "Join Royal Project-backed food processing and community enterprise programs. Learn food safety, packaging, and direct-to-consumer sales with access to Doi Kham brand distribution.",
    startupCost: "\u0E3F10,000 - \u0E3F25,000",
    monthlyIncome: "\u0E3F11,000 - \u0E3F22,000",
    growthTimeline: "4-8 months to first income",
    regions: ["Northern", "Central", "Eastern"],
    skills: ["Food safety (GMP)", "Packaging", "E-commerce", "Supply chain"],
    opportunityScore: 65,
    stabilityScore: 80,
  },
  {
    id: "textile-fashion",
    title: "Sustainable Fashion",
    subtitle: "Queen Sirikit Textile Initiative",
    icon: Shirt,
    riskLevel: "medium",
    riskLabel: "Low-Medium",
    description:
      "Combine traditional Thai textiles with modern fashion design. The Queen Sirikit Foundation provides training in textile arts, business management, and access to premium markets.",
    startupCost: "\u0E3F8,000 - \u0E3F25,000",
    monthlyIncome: "\u0E3F10,000 - \u0E3F30,000",
    growthTimeline: "6-12 months to market",
    regions: ["Northeastern", "Northern", "Central"],
    skills: ["Textile design", "Natural dyeing", "Business planning", "Branding"],
    opportunityScore: 70,
    stabilityScore: 74,
  },
]

function PathwayCard({ pathway }: { pathway: RoyalPathway }) {
  const Icon = pathway.icon

  return (
    <Card className="glass-card rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary to-success" />
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

        {/* Score bars */}
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
            <span className="text-[10px] text-muted-foreground">Startup Cost</span>
            <span className="text-xs font-semibold text-foreground">{pathway.startupCost}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg bg-background/50 p-2">
            <span className="text-[10px] text-muted-foreground">Monthly Income</span>
            <span className="text-xs font-semibold text-foreground">{pathway.monthlyIncome}</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg bg-background/50 p-2">
            <span className="text-[10px] text-muted-foreground">Timeline</span>
            <span className="text-xs font-semibold text-foreground">{pathway.growthTimeline}</span>
          </div>
        </div>

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

        <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl mt-1">
          Add to Simulation
          <ArrowRight className="size-3" />
        </Button>
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
        <div className="bg-gradient-to-r from-primary/5 to-success/5 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
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
            <div className="grid grid-cols-3 gap-4 shrink-0">
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

      {/* Pathway cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <PathwayCard key={pathway.id} pathway={pathway} />
        ))}
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
