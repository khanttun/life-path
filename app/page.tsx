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
} from "lucide-react"

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <Sparkles className="size-4" />
          AI-Powered Decision Simulator
        </span>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Visualize Your Future Before You Decide
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          AI-powered simulation for financial, career, and life decisions.
          See the long-term impact of your choices before making them.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 rounded-xl px-8 text-base" asChild>
            <Link href="/profile">
              Start Simulation
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-xl px-8 text-base"
            asChild
          >
            <Link href="#how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: Target,
    title: "Set Your Profile",
    description:
      "Tell us about your age, education, income, and current situation to personalize the simulation.",
  },
  {
    icon: Zap,
    title: "Choose a Scenario",
    description:
      "Select from real-life decisions like taking a student loan, starting a business, or moving to a new city.",
  },
  {
    icon: BarChart3,
    title: "See Your Future",
    description:
      "Get AI-powered projections of income, debt, savings, and risk scores over time.",
  },
]

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-background px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to understand your future
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-7" />
                </div>
                <span className="mb-2 text-sm font-semibold text-primary">
                  {"Step " + (index + 1)}
                </span>
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

const benefits = [
  {
    icon: TrendingUp,
    title: "Financial Stability",
    description:
      "Understand the financial implications of your decisions with projected income, savings, and debt over 3-5 years.",
  },
  {
    icon: Sparkles,
    title: "Career Growth",
    description:
      "Evaluate how different paths affect your career mobility and long-term earning potential.",
  },
  {
    icon: Shield,
    title: "Long-Term Impact",
    description:
      "See the ripple effects of today's choices on your future stability, security, and quality of life.",
  },
]

function WhyItMattersSection() {
  return (
    <section className="bg-muted/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why It Matters
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Make informed decisions that shape your future
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#0096A5" />
            <path d="M16 6L16 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 14L10 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 14L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="10" cy="24" r="2" fill="white" />
            <circle cx="22" cy="24" r="2" fill="white" />
            <circle cx="16" cy="6" r="2" fill="white" />
          </svg>
          <span className="font-semibold text-foreground">LifePath AI</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/profile" className="hover:text-foreground transition-colors">
            Simulator
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          {"LifePath AI. Built for youth decision-making."}
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
      <WhyItMattersSection />
      <Footer />
    </main>
  )
}
