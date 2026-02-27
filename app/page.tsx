import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  TrendingUp,
  Shield,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  GitBranch,
  GraduationCap,
  Scale,
  Map,
  Users,
  AlertTriangle,
} from "lucide-react"

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Mesh background */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <span className="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-sm">
          <Sparkles className="size-4" />
          Decision Intelligence Platform
        </span>
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Decision Intelligence for
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {" Thailand's Youth"}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          AI-powered simulation protecting 80,000+ at-risk youth from informal labor
          exploitation. Visualize Opportunity Scores, Stability Indices, and career paths
          before you decide.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/20" asChild>
            <Link href="/profile">
              Start Your Life Simulation
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass-card gap-2 rounded-xl px-8 text-base"
            asChild
          >
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>

        {/* Stats bar */}
        <div className="glass-card mt-16 grid w-full max-w-3xl grid-cols-3 gap-6 rounded-2xl p-6 shadow-sm">
          {[
            { value: "80,000+", label: "Youth Protected" },
            { value: "12", label: "Career Paths" },
            { value: "95%", label: "Prediction Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</span>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: Target,
    title: "Profile & Risk Assessment",
    description:
      "Tell us about your age, education, income, and location. Our AI calculates your initial Opportunity Score and Stability Index.",
  },
  {
    icon: GitBranch,
    title: "Interactive Decision Tree",
    description:
      "Drag-and-drop life events like getting a degree, starting a farm, or moving to Bangkok. Toggle stress tests for worst-case scenarios.",
  },
  {
    icon: BarChart3,
    title: "Intelligence Dashboard",
    description:
      "Get animated risk gauges, regional heatmaps, 10-year projections, and AI-powered recommendations with Royal Path alternatives.",
  },
]

function HowItWorksSection() {
  return (
    <section id="features" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From Profile to Protection in 3 Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive intelligence system designed for at-risk youth decision-making
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="group glass-card flex flex-col items-center rounded-2xl p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative mb-6">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Zap,
    title: "Opportunity Scores",
    description:
      "Composite indices measuring your career growth potential, financial resilience, and life stability in one actionable number.",
  },
  {
    icon: Shield,
    title: "Contract Safety Checker",
    description:
      "The Legal Guardian evaluates employment contracts to protect youth from illegal labor exploitation and unsafe work conditions.",
  },
  {
    icon: GraduationCap,
    title: "Royal Path Engine",
    description:
      "AI recommends vocational training and local wisdom-based careers inspired by Her Majesty's Royal Projects as safe alternatives.",
  },
  {
    icon: AlertTriangle,
    title: "Stress Test Mode",
    description:
      "Toggle worst-case scenarios like job loss or medical emergencies to visualize your financial resilience under pressure.",
  },
  {
    icon: Map,
    title: "Regional Demand Heatmap",
    description:
      "Interactive Thailand map showing where your chosen career is most in-demand, safest, and highest paying by region.",
  },
  {
    icon: Users,
    title: "Micro-Scholarship Matching",
    description:
      "High-risk scenarios are automatically matched with available grants, royal scholarships, and financial aid programs.",
  },
]

function FeaturesSection() {
  return (
    <section className="mesh-bg px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Platform Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Decision Intelligence That Protects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Beyond calculators - a comprehensive youth protection ecosystem
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="glass-card flex flex-col rounded-2xl p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="glass-card overflow-hidden rounded-3xl shadow-lg">
          <div className="grid items-center md:grid-cols-2">
            <div className="flex flex-col gap-6 p-8 md:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Scale className="size-4" />
                Social Impact
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {"LIFESOFT AI 2026"}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                LifeSoft AI directly addresses the Society & Environment and Education Tech
                themes. Our platform provides an AI safety net for youth at risk of entering
                informal labor, integrating Royal Initiative pathways and legal contract
                protection into every simulation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="gap-2 rounded-xl" asChild>
                  <Link href="/profile">
                    Try the Simulator
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2 rounded-xl" asChild>
                  <Link href="/royal-path">
                    Explore Royal Path
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/30 p-8 md:p-12">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: "Opportunity Score", value: "78/100" },
                  { icon: Shield, label: "Contract Safety", value: "Verified" },
                  { icon: GraduationCap, label: "Royal Paths", value: "3 Options" },
                  { icon: AlertTriangle, label: "Stress Tested", value: "Resilient" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="glass-card-strong flex flex-col items-center gap-2 rounded-xl p-4 text-center shadow-sm"
                    >
                      <Icon className="size-5 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-bold text-foreground">{item.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-1">
          <img
            src="/images/logofin.png"
            alt="LifeSoft AI Logo"
            width="28"
            height="28"
            className="h-12 w-12 object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">LifeSoft AI</span>
            <span className="text-[10px] uppercase tracking-widest text-primary">Decision Intelligence</span>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link href="/profile" className="transition-colors hover:text-foreground">Simulator</Link>
          <Link href="/scholarships" className="transition-colors hover:text-foreground">Scholarships</Link>
          <Link href="/royal-path" className="transition-colors hover:text-foreground">Royal Path</Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          {"LIFESOFT AI 2026."}
        </p>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ImpactSection />
      <Footer />
    </main>
  )
}
