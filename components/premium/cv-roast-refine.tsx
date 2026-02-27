"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { TealProgressBar } from "@/components/teal-progress-bar"
import { ScoreBadge } from "@/components/score-badge"
import { Upload, FileText, Sparkles } from "lucide-react"

const feedbackMetrics = [
  { label: "Keyword Optimization", score: 68, variant: "auto" as const },
  { label: "ATS Compatibility", score: 82, variant: "auto" as const },
  { label: "Impact Strength", score: 55, variant: "auto" as const },
  { label: "Bullet Point Effectiveness", score: 73, variant: "auto" as const },
]

const suggestedRewrites = [
  {
    original: "Worked on data analysis projects",
    improved:
      "Analyzed 50K+ customer data points using Python/Pandas, generating insights that increased campaign conversion by 18%",
  },
  {
    original: "Helped with marketing team",
    improved:
      "Collaborated with a 5-person marketing team to execute digital campaigns reaching 100K+ users across 3 platforms",
  },
]

export function CVRoastRefine() {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <FileText className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            CV / Portfolio Roast & Refine
          </h2>
        </div>
        <p className="text-muted-foreground">
          Get detailed AI feedback on your CV with actionable improvements.
        </p>
      </div>

      {/* Upload */}
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary/40">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
              <Upload className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Upload your CV
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF, DOCX up to 10MB
              </p>
            </div>
            <button className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Choose File
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Scores */}
      <div className="grid gap-4 md:grid-cols-2">
        {feedbackMetrics.map((m) => (
          <Card key={m.label} className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground">
                  {m.label}
                </p>
                <ScoreBadge score={m.score} size="sm" />
              </div>
              <TealProgressBar
                value={m.score}
                variant={m.variant}
                height="md"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Rewrite Panel */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <CardTitle className="text-base">AI Suggested Rewrites</CardTitle>
          </div>
          <CardDescription>
            See how AI would improve your CV bullet points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {suggestedRewrites.map((r, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="rounded-lg bg-muted/50 px-4 py-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    Original
                  </p>
                  <p className="text-sm text-foreground line-through opacity-60">
                    {r.original}
                  </p>
                </div>
                <div className="rounded-lg border-2 border-primary/20 bg-secondary/30 px-4 py-3">
                  <p className="mb-1 text-xs font-medium text-primary">
                    AI Improved
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {r.improved}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Generate Improved Version
          </button>
        </CardContent>
      </Card>
    </section>
  )
}
