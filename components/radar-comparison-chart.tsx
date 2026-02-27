"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface RadarDataPoint {
  subject: string
  you: number
  ideal: number
}

interface RadarComparisonChartProps {
  data: RadarDataPoint[]
  className?: string
}

export function RadarComparisonChart({
  data,
  className,
}: RadarComparisonChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />
          <Radar
            name="You"
            dataKey="you"
            stroke="#0096A5"
            fill="#0096A5"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            name="Ideal Candidate"
            dataKey="ideal"
            stroke="#22C55E"
            fill="#22C55E"
            fillOpacity={0.15}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#6B7280" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
