"use client"

import Link from "next/link"
import { ArrowRight, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-1">
          <img
            src="/images/logofin.png"
            alt="LifeSoft AI Logo"
            width="28"
            height="28"
            className="h-12 w-12 object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">LifeSoft AI</span>
            <span className="text-[10px] uppercase tracking-widest text-primary">Decision Intelligence</span>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link href="/profile" className="transition-colors hover:text-foreground">Simulator</Link>
          <Link href="/scholarships" className="transition-colors hover:text-foreground">Scholarships</Link>
          <Link href="/royal-path" className="transition-colors hover:text-foreground">Royal Path</Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          {"LIFESOFT AI 2026."}
        </p>
      </div>
    </footer>
  )
}
