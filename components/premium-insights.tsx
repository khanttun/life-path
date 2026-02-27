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
import { Lock, Sparkles, TrendingUp, Target, Zap, X } from "lucide-react"

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
                  Detailed 10-year wealth projections & personalized AI strategies
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
            Get 30 days free. Then 299 THB/month
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
            {/* Feature 1 */}
            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">10-Year Wealth Forecast</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get detailed year-by-year financial projections based on your decision path. See exactly how your income, savings, and debt will evolve with monthly breakdowns and scenario comparisons.
              </p>
              <div className="bg-muted rounded-lg p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Year 5 Projected Savings:</span>
                  <span className="font-semibold">฿ 300,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 10 Income Increase:</span>
                  <span className="font-semibold">+180% vs baseline</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Freedom Date:</span>
                  <span className="font-semibold">Year 7</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Personalized Strategies</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive custom action plans tailored to your profile, including specific milestones, timeline recommendations, and government assistance programs you qualify for.
              </p>
              <div className="bg-muted rounded-lg p-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-amber-600">•</span>
                  <span><strong>Month 1-3:</strong> Enroll in vocational training program</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-amber-600">•</span>
                  <span><strong>Month 4-6:</strong> Apply for 30-Baht healthcare & student subsidies</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-amber-600">•</span>
                  <span><strong>Month 12+:</strong> Start building emergency fund (45,000 THB)</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3 border-l-4 border-amber-400 pl-4">
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-amber-600" />
                <h3 className="font-semibold text-lg">AI-Powered Coaching</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get real-time AI recommendations as your life circumstances change. The system monitors your progress and suggests optimizations to improve financial stability and career outcomes.
              </p>
              <div className="bg-blue-50 border border-blue-200/30 rounded-lg p-3 text-sm">
                <p className="text-blue-900">
                  <strong>Current Recommendation:</strong> Your stress resilience score is 45/100. Building a 3-month emergency fund would boost this to 72/100 and provide crucial protection against unexpected income loss.
                </p>
              </div>
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
