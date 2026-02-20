"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  GitBranch,
  GraduationCap,
  Shield,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

function LifePathLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#0096A5" />
      <path d="M16 6L16 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 14L10 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 14L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="10" cy="24" r="2" fill="white" />
      <circle cx="22" cy="24" r="2" fill="white" />
      <circle cx="16" cy="6" r="2" fill="white" />
    </svg>
  )
}

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/scenario", label: "Scenarios", icon: GitBranch },
  { href: "/scholarships", label: "Scholarships", icon: GraduationCap },
  { href: "/royal-path", label: "Royal Path", icon: Shield },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card-strong bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <LifePathLogo />
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground leading-tight">
              LifePath AI
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-primary sm:block">
              Decision Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border/50 bg-background px-6 py-4 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
