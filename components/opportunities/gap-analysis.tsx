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
import { PremiumLockOverlay } from "@/components/premium-lock-overlay"
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

const currentProfile = [
  { label: "Education", value: "Chulalongkorn University, Year 3" },
  { label: "Major", value: "Computer Engineering" },
  { label: "GPA", value: "3.45" },
  { label: "Skills", value: "Python, Excel, SQL" },
  { label: "Experience", value: "1 hackathon project" },
]

const idealCandidate = [
  { label: "Education", value: "Top-5 Thai University, Year 3–4" },
  { label: "Major", value: "CS / CE / IT" },
  { label: "GPA", value: "3.50+" },
  { label: "Skills", value: "Python, SQL, Tableau, Cloud" },
  { label: "Experience", value: "1–2 internships or projects" },
]

const missingSkills = [
  { name: "Tableau / Power BI", priority: "High" },
  { name: "Cloud Services (AWS/GCP)", priority: "High" },
  { name: "Git & Version Control", priority: "Medium" },
  { name: "Agile Methodology", priority: "Low" },
]

export function GapAnalysis() {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <FileText className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Gap Analysis
          </h2>
        </div>
        <p className="text-muted-foreground">
          Compare your current profile against the ideal candidate and discover
          what to improve.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary/40">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
              <Upload className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Upload your CV or Portfolio
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

      {/* Two-column comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Your Current Profile</CardTitle>
            <CardDescription>Based on your LifePath data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {currentProfile.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Ideal Candidate Snapshot</CardTitle>
            <CardDescription>
              For your target industry and role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {idealCandidate.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-[#22C55E]" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missing Skills */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Missing Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {missingSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {skill.priority === "High" ? (
                    <XCircle className="size-4 text-[#EF4444]" />
                  ) : skill.priority === "Medium" ? (
                    <AlertTriangle className="size-4 text-[#F59E0B]" />
                  ) : (
                    <CheckCircle className="size-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    skill.priority === "High"
                      ? "bg-[#EF4444]/10 text-[#EF4444]"
                      : skill.priority === "Medium"
                        ? "bg-[#F59E0B]/10 text-[#D97706]"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {skill.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Score */}
      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              Overall Readiness Score
            </p>
            <div className="text-6xl font-bold text-primary">72%</div>
            <TealProgressBar value={72} height="lg" className="max-w-md" />
            <p className="text-center text-sm text-muted-foreground">
              You are almost ready. Focus on filling the skill gaps above to
              boost your score.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Premium CTA */}
      <PremiumLockOverlay
        locked
        message="Unlock Full AI Improvement Plan"
        ctaLabel="Upgrade to Pro"
      >
        <Card className="border-border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-semibold text-foreground">
                AI-Powered Improvement Plan
              </h4>
              <div className="flex flex-col gap-2">
                <TealProgressBar
                  value={45}
                  label="Week 1: Tableau Basics"
                  showLabel
                  height="sm"
                />
                <TealProgressBar
                  value={30}
                  label="Week 2: AWS Fundamentals"
                  showLabel
                  height="sm"
                />
                <TealProgressBar
                  value={15}
                  label="Week 3: Git Workflow"
                  showLabel
                  height="sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </PremiumLockOverlay>
    </section>
  )
}
