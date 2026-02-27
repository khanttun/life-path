"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CVRoastRefine } from "@/components/premium/cv-roast-refine"
import { DeepInternshipMatcher } from "@/components/premium/deep-internship-matcher"
import { MockInterview } from "@/components/premium/mock-interview"
import { ShadowApplicationGenerator } from "@/components/premium/shadow-application"

export default function PremiumPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-12 py-8 px-6">
        <h1 className="text-2xl font-bold text-foreground">Premium Tools</h1>

        {/* premium components exported from other site */}
        <CVRoastRefine />
        <DeepInternshipMatcher />
        <MockInterview />
        <ShadowApplicationGenerator />
      </main>
      <Footer />
    </>
  )
}
