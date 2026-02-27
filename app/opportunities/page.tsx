"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GapAnalysis } from "@/components/opportunities/gap-analysis"
import { ProvinceMap } from "@/components/opportunities/province-map"
import { SmartPathMatcher } from "@/components/opportunities/smart-path-matcher"

export default function OpportunitiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-12 py-8 px-6">
        <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>

        {/* imported sections from the exported site */}
        <GapAnalysis />
        <ProvinceMap />
        <SmartPathMatcher />
      </main>
      <Footer />
    </>
  )
}
