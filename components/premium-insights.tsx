"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lock, Sparkles, TrendingUp, Target, Zap, X, FileText, MapPin, Search, Shield } from "lucide-react"

export function PremiumInsights() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card className="glass-card rounded-2xl shadow-sm relative overflow-hidden border-2 border-amber-400/50">
        {/* Locked overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 backdrop-blur-[1px] pointer-events-none" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-100 p-2.5 text-amber-600">
                <Lock className="size-5" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  Premium Insights
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                    <Sparkles className="size-3" />
                    Pro
                  </span>
                </CardTitle>
                <CardDescription>
                  Unlock advanced opportunity & career‑building tools for students and youth
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/40 p-3 border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-4 text-amber-600" />
                <span className="text-xs font-semibold text-foreground">Wealth Forecast</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Year-by-year projections with multiple scenarios
              </p>
            </div>
            <div className="rounded-lg bg-white/40 p-3 border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <Target className="size-4 text-amber-600" />
                <span className="text-xs font-semibold text-foreground">Strategies</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Personalized action plans and milestones
              </p>
            </div>
            <div className="rounded-lg bg-white/40 p-3 border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-4 text-amber-600" />
                <span className="text-xs font-semibold text-foreground">AI Coaching</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Real-time optimization recommendations
              </p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="size-4" />
            Unlock Pro Insights
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Get 30 days free. Then 99THB/month
          </p>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-amber-500" />
                <DialogTitle>Premium Pro Insights Preview</DialogTitle>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <DialogDescription>
              See what's available with a Pro subscription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Opportunity & Premium features */}
            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Resume Gap Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically compare your CV against ideal candidate profiles and uncover missing skills or experience that keep you from top internships or programs.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Province Opportunity Map</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive heatmap showing regional demand, survival costs and potential earnings—use it to decide where to study, intern, or start a business.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Search className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Smart Path Matcher</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Match your profile (skills, interests, GPA) to the best university programs and internships across Thailand with personalized fit and income estimates.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">CV Roast & Refine</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your CV to receive AI-powered feedback: keyword optimization, ATS compatibility, and rewrite suggestions for stronger impact.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Deep Internship Matcher</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced matching using cultural fit, career mobility and risk projections to find the ideal internship opportunities for you.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Mock Interview Simulator</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Practice realistic interview scenarios with AI-generated questions and get instant feedback on your responses and body language.
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Shadow Application Builder</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate professional cover letters and tailor applications quickly using AI templates based on real job postings or scholarship opportunities.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200/50 space-y-3">
              <p className="font-semibold text-foreground">Ready to unlock these insights?</p>
              <Button 
                size="lg" 
                className="w-full gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                <Sparkles className="size-4" />
                Start Free 30-Day Trial
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                No credit card required. 299 THB/month after trial.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
