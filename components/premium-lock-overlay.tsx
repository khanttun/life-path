"use client"

import { ReactNode } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PremiumLockOverlayProps {
  locked?: boolean
  message?: string
  ctaLabel?: string
  children: ReactNode
}

export function PremiumLockOverlay({
  locked = false,
  message = "Premium content",
  ctaLabel = "Upgrade",
  children,
}: PremiumLockOverlayProps) {
  if (!locked) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-white/80 backdrop-blur-md">
        <Lock className="size-8 text-amber-500" />
        <p className="text-center text-sm font-semibold text-foreground">
          {message}
        </p>
        <Button size="sm" variant="outline" className="gap-2">
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}
