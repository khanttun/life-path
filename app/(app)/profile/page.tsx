"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [age, setAge] = useState("")
  const [education, setEducation] = useState("")
  const [status, setStatus] = useState("")
  const [income, setIncome] = useState([25000])
  const [location, setLocation] = useState("")
  const [expenses, setExpenses] = useState("")

  function handleContinue() {
    router.push("/scenario")
  }

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* Progress indicator */}
      <div className="w-full max-w-xl">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Step 1 of 3</span>
          <span className="text-muted-foreground">Profile Setup</span>
        </div>
        <Progress value={33} className="h-2" />
      </div>

      {/* Profile card */}
      <Card className="w-full max-w-xl rounded-2xl border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself so we can personalize your simulation
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Age */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g. 22"
              min={15}
              max={35}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* Education Level */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="education">Education Level</Label>
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger id="education" className="w-full rounded-xl">
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="vocational">Vocational / Diploma</SelectItem>
                <SelectItem value="bachelors">{"Bachelor's Degree"}</SelectItem>
                <SelectItem value="masters">{"Master's Degree"}</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Status */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Current Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="w-full rounded-xl">
                <SelectValue placeholder="Select your current status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="working">Working</SelectItem>
                <SelectItem value="supporting">Supporting Family</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Family Income */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Monthly Family Income</Label>
              <span className="text-sm font-semibold text-primary">
                {"฿" + income[0].toLocaleString()}
              </span>
            </div>
            <Slider
              value={income}
              onValueChange={setIncome}
              min={5000}
              max={200000}
              step={1000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{"฿5,000"}</span>
              <span>{"฿200,000"}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="w-full rounded-xl">
                <SelectValue placeholder="Select your location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Personal Expenses */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="expenses">Monthly Personal Expenses</Label>
            <Input
              id="expenses"
              type="number"
              placeholder="e.g. 8000"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* Continue button */}
          <Button
            size="lg"
            className="mt-2 w-full gap-2 rounded-xl text-base"
            onClick={handleContinue}
          >
            Continue to Scenario Builder
            <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
