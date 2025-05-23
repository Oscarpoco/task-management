"use client"

import { MoreHorizontal, Star, Calendar, Trash2, Edit } from "lucide-react"
import { useState } from "react"
import { useToast } from "../ui/toast"
import type { Interview } from "../../types/interviews"

interface InterviewCardProps {
  interview: Interview
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const { candidate, position, company, status, interestLevel } = interview
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { addToast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getInterestDots = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div key={dot} className={`w-2 h-2 rounded-full ${dot <= level ? getInterestColor(dot) : "bg-muted"}`} />
        ))}
      </div>
    )
  }

  const getInterestColor = (position: number) => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"]
    return colors[position - 1] || colors[0]
  }

  const handleEdit = () => {
    setIsMenuOpen(false)
    addToast({
      title: "Edit interview",
      description: `Editing interview with ${candidate.name}.`,
      type: "info",
    })
  }

  const handleDelete = () => {
    setIsMenuOpen(false)
    addToast({
      title: "Interview deleted",
      description: `Interview with ${candidate.name} has been deleted.`,
      type: "success",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="min-w-[240px] bg-card rounded-xl p-4 flex flex-col gap-3 scale-in shadow-sm hover:shadow-md transition-shadow border border-border">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={candidate.avatar || `https://i.pravatar.cc/150?u=${interview.id}`}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreHorizontal size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-card rounded-lg shadow-lg border border-border z-10">
              <button
                className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-secondary transition-colors rounded-t-lg"
                onClick={handleEdit}
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-destructive/10 text-destructive transition-colors rounded-b-lg"
                onClick={handleDelete}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">{candidate.name}</h3>
        <p className="text-sm text-muted-foreground">
          {position} at {company}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar size={12} />
        <span>{formatDate(interview.date)}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <span className={`text-xs px-2 py-1 bg-secondary rounded-full ${getStatusColor(status)}`}>{status}</span>
        <span className="text-xs px-2 py-1 bg-secondary rounded-full">Interview</span>
      </div>

      <div className="flex items-center justify-between">
        {getInterestDots(interestLevel)}

        <button className="text-amber-400 hover:text-amber-500 transition-colors">
          <Star size={16} fill={interestLevel > 3 ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  )
}
