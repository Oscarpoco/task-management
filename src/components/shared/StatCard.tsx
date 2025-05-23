import { ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  trend: "up" | "down" | "neutral"
}

export default function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-3xl font-bold">{value}</div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div
          className={`flex items-center text-xs ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {trend === "up" && <ArrowUp size={12} />}
          {trend === "down" && <ArrowDown size={12} />}
        </div>
      </div>
    </div>
  )
}
