"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Download, UserCheck, Mail, Linkedin } from "lucide-react"

const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Data Analyst Intern position at Agoda. As a third-year Computer Engineering student at Chulalongkorn University with a GPA of 3.45, I am eager to apply my analytical skills and technical knowledge in a dynamic, data-driven environment.

During my studies, I have developed proficiency in Python, SQL, and Excel, which I have applied in academic projects involving large-scale data analysis. My experience in a 48-hour hackathon, where I led the backend architecture for a data pipeline project, demonstrates my ability to work effectively under pressure and collaborate with cross-functional teams.

I am particularly drawn to Agoda's commitment to leveraging data to enhance travel experiences, and I am confident that my technical foundation and passion for data analytics make me a strong candidate for this role.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.

Sincerely,
Somchai P.`

const mockLinkedIn = `Hi [Recruiter Name],

I'm a 3rd-year Computer Engineering student at Chulalongkorn University, and I'm very interested in the Data Analyst Intern position at Agoda.

I've been working with Python and SQL on data analysis projects, and I recently led a backend team in a hackathon. I'd love to learn more about the role and how I could contribute to your data team.

Would you be open to a brief chat? I'd appreciate any insights you could share.

Best regards,
Somchai P.`

const mockEmail = `Subject: Application for Data Analyst Internship – Somchai P.

Dear [Coordinator Name],

I hope this email finds you well. I am Somchai P., a third-year Computer Engineering student at Chulalongkorn University, writing to express my interest in the Data Analyst Intern position at Agoda.

I have attached my CV for your review. I would be grateful for the opportunity to discuss how my skills in Python, SQL, and data analysis could contribute to your team.

Thank you for your time and consideration.

Best regards,
Somchai P.
somchai.p@student.chula.ac.th
+66 8X-XXX-XXXX`

export function ShadowApplicationGenerator() {
  const [tone, setTone] = useState("formal")
  const [activeTab, setActiveTab] = useState("cover-letter")

  const getContent = () => {
    switch (activeTab) {
      case "cover-letter":
        return mockCoverLetter
      case "linkedin":
        return mockLinkedIn
      case "email":
        return mockEmail
      default:
        return mockCoverLetter
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary">
            <UserCheck className="size-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            &quot;Shadow&quot; Application Generator
          </h2>
        </div>
        <p className="text-muted-foreground">
          Generate cover letters, LinkedIn messages, and emails tailored to your
          target opportunity.
        </p>
      </div>

      {/* Input Fields */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Target Details</CardTitle>
          <CardDescription>
            Tell us about the opportunity you are applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Target Company</Label>
              <Input id="company" defaultValue="Agoda" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Internship Role</Label>
              <Input id="role" defaultValue="Data Analyst Intern" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Industry</Label>
              <Select defaultValue="tech">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Generated Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="cover-letter" className="gap-1.5">
                <Mail className="size-3.5" />
                Cover Letter
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="gap-1.5">
                <Linkedin className="size-3.5" />
                LinkedIn
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1.5">
                <Mail className="size-3.5" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cover-letter" className="mt-4">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <textarea
                  className="min-h-[320px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none"
                  defaultValue={mockCoverLetter}
                />
              </div>
            </TabsContent>
            <TabsContent value="linkedin" className="mt-4">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <textarea
                  className="min-h-[200px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none"
                  defaultValue={mockLinkedIn}
                />
              </div>
            </TabsContent>
            <TabsContent value="email" className="mt-4">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <textarea
                  className="min-h-[240px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none"
                  defaultValue={mockEmail}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-transparent px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-secondary">
              <Copy className="size-4" />
              Copy
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <Download className="size-4" />
              Download
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
