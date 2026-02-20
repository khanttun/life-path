import { Sparkles } from "lucide-react"

interface AIRecommendationBadgeProps {
  label?: string
  variant?: "default" | "success" | "warning"
}

export function AIRecommendationBadge({
  label = "AI RECOMMENDATION",
  variant = "default",
}: AIRecommendationBadgeProps) {
  const variantStyles = {
    default: "bg-blue-100 text-blue-700 border-blue-300",
    success: "bg-emerald-100 text-emerald-700 border-emerald-300",
    warning: "bg-amber-100 text-amber-700 border-amber-300",
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-xs font-semibold ${variantStyles[variant]}`}>
      <Sparkles className="size-3" />
      {label}
    </div>
  )
}
