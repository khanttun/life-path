"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import {
  MapPin,
  Banknote,
  X,
  Search,
  Briefcase,
  GraduationCap,
} from "lucide-react"

const skillOptions = [
  "Python",
  "Excel",
  "Communication",
  "Data Analysis",
  "Leadership",
  "Design",
  "Marketing",
  "Finance",
  "JavaScript",
  "Public Speaking",
]

const interestOptions = [
  "Technology",
  "Business",
  "Healthcare",
  "Education",
  "Arts & Design",
  "Engineering",
  "Science",
  "Law",
]

const provinces = [
  "Bangkok",
  "Chiang Mai",
  "Chonburi",
  "Nakhon Ratchasima",
  "Songkhla",
  "Khon Kaen",
  "Phuket",
  "Nonthaburi",
]

const mockResults = [
  {
    name: "Chulalongkorn University – Computer Engineering",
    type: "university" as const,
    fitScore: 92,
    skillMatch: 88,
    location: "Bangkok",
    estimatedIncome: 28000,
    survivalScore: 74,
  },
  {
    name: "Agoda – Software Engineering Intern",
    type: "internship" as const,
    fitScore: 87,
    skillMatch: 82,
    location: "Bangkok",
    estimatedIncome: 25000,
    survivalScore: 68,
  },
  {
    name: "Kasetsart University – Information Technology",
    type: "university" as const,
    fitScore: 84,
    skillMatch: 79,
    location: "Bangkok",
    estimatedIncome: 26000,
    survivalScore: 71,
  },
  {
    name: "SCB – Data Analyst Intern",
    type: "internship" as const,
    fitScore: 79,
    skillMatch: 75,
    location: "Bangkok",
    estimatedIncome: 22000,
    survivalScore: 65,
  },
  {
    name: "Chiang Mai University – Digital Arts & Media",
    type: "university" as const,
    fitScore: 74,
    skillMatch: 70,
    location: "Chiang Mai",
    estimatedIncome: 18000,
    survivalScore: 82,
  },
]

export function SmartPathMatcher() {
  const [skills, setSkills] = useState<string[]>(["Python", "Excel"])
  const [interests, setInterests] = useState<string[]>(["Technology"])
  const [salary, setSalary] = useState([15000])
  const [showResults, setShowResults] = useState(true)

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills([...skills, skill])
  }
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <Search className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Smart Path-Matcher
          </h2>
        </div>
        <p className="text-muted-foreground">
          Match your profile to the best university programs and internship
          opportunities across Thailand.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Your Profile</CardTitle>
          <CardDescription>
            Fill in your details for personalized matching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="number"
                placeholder="e.g. 3.45"
                step="0.01"
                min="0"
                max="4"
                defaultValue="3.45"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Preferred Province</Label>
              <Select defaultValue="bangkok">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p.toLowerCase().replace(" ", "-")}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-primary/10"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillOptions
                  .filter((s) => !skills.includes(s))
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                      interests.includes(interest)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label>Expected Monthly Salary</Label>
                <span className="text-sm font-semibold text-primary">
                  {salary[0].toLocaleString()} THB
                </span>
              </div>
              <Slider
                value={salary}
                onValueChange={setSalary}
                min={8000}
                max={50000}
                step={1000}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8,000 THB</span>
                <span>50,000 THB</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Find My Best Matches
          </button>
        </CardContent>
      </Card>

      {showResults && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            Top 5 Matches
          </h3>
          {mockResults.map((result, i) => (
            <Card
              key={i}
              className="border-border shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {result.type === "university" ? (
                        <GraduationCap className="size-4 text-primary" />
                      ) : (
                        <Briefcase className="size-4 text-primary" />
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground border-0"
                      >
                        {result.type === "university"
                          ? "University"
                          : "Internship"}
                      </Badge>
                    </div>
                    <h4 className="text-base font-semibold text-foreground">
                      {result.name}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {result.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Banknote className="size-3.5" />
                        {result.estimatedIncome.toLocaleString()} THB/mo
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <TealProgressBar
                        value={result.fitScore}
                        label="Fit Score"
                        showLabel
                        variant="primary"
                        height="sm"
                      />
                      <TealProgressBar
                        value={result.skillMatch}
                        label="Skills Match"
                        showLabel
                        variant="auto"
                        height="sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3 md:flex-col md:items-end">
                    <ScoreBadge
                      score={result.fitScore}
                      label="Fit"
                      size="lg"
                    />
                    <ScoreBadge
                      score={result.survivalScore}
                      label="Survival"
                      size="sm"
                    />
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary">
                  View Full Analysis
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
