"use client"

import Link from "next/link"
import Image from "next/image"
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
  Sparkles, 
  Briefcase, 
} from "lucide-react"
import { useState } from "react"

function LifePathLogo() {
  return (
    <div className="relative h-20 w-20">
      <Image
        src="/images/logofin.png"
        alt="LifeSoft AI Logo"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/scenario", label: "Scenarios", icon: GitBranch },
  { href: "/scholarships", label: "Scholarships", icon: GraduationCap },
  { href: "/royal-path", label: "Royal Path", icon: Shield },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase, isPremium: true },
  { href: "/premium", label: "Premium", icon: Sparkles, isPremium: true },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card-strong bg-white">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-0.2">
          <LifePathLogo />
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground leading-tight">
              LifeSoft AI
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-primary sm:block">
              Decision Intelligence
            </span>
          </div>
        </Link>


        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          {links.map((link) => {
  const Icon = link.icon
  const isActive = pathname === link.href || pathname?.startsWith(link.href + "/")

  return (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
        isActive
          ? "bg-primary/10 text-primary"
          : link.isPremium 
            ? "text-amber-600 hover:bg-amber-50" // Unique Gold color for Premium
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className={cn(
        "size-4 shrink-0",
        link.isPremium && !isActive && "text-amber-500 animate-pulse-slow" // Subtle pulse for premium
      )} />
      
      <span className={cn(
        "max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:max-w-[150px] group-hover:opacity-100",
        link.isPremium && "font-bold text-amber-600" // Bold text for Premium
      )}>
        {link.label}
      </span>
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

      {/* Mobile menu - Kept standard for better touch usability */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border/50 bg-background px-6 py-4 md:hidden">
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