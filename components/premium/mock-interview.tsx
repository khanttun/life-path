"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScoreBadge } from "@/components/score-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, Clock, MessageSquare, User, Send } from "lucide-react"

const mockChat = [
  {
    role: "interviewer" as const,
    text: "Tell me about a time you worked in a team to solve a complex problem.",
  },
  {
    role: "user" as const,
    text: "During my university hackathon, our team of four built a data pipeline in 48 hours. I led the backend architecture and coordinated tasks using Trello...",
  },
  {
    role: "interviewer" as const,
    text: "Interesting. How did you handle disagreements within the team?",
  },
]

const scoreCards = [
  { label: "Confidence", score: 78 },
  { label: "Communication Clarity", score: 85 },
  { label: "Technical Fit", score: 72 },
  { label: "Cultural Fit", score: 68 },
]

export function MockInterview() {
  const [industry, setIndustry] = useState("big4")
  const [language, setLanguage] = useState("english")
  const [started, setStarted] = useState(true)

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <Mic className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            AI Mock Interview
          </h2>
          <Badge className="bg-primary text-primary-foreground border-0">
            Thai / English
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Practice interviews tailored to your target industry with AI feedback.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Interview Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Select Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="big4">Big 4</SelectItem>
                  <SelectItem value="startup">Thai Startup</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Select Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thai">Thai</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {started && (
        <>
          {/* Chat interface */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Mock Interview</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>04:32</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {mockChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="size-4" />
                      ) : (
                        <MessageSquare className="size-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Input area */}
                <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                  <button className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-accent" aria-label="Voice input">
                    <Mic className="size-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your response..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90" aria-label="Send message">
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scoreCards.map((card) => (
              <Card key={card.label} className="border-border shadow-sm">
                <CardContent className="flex flex-col items-center gap-3 pt-6">
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <span className="text-4xl font-bold text-foreground">
                    {card.score}
                  </span>
                  <ScoreBadge score={card.score} size="sm" />
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start Mock Interview
        </button>
      )}
    </section>
  )
}
