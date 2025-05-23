"use client"

import { useState } from "react"
import { Plus, Search, Filter, ChevronRight, ChevronLeft } from "lucide-react"
import InterviewCard from "./InterviewCard"
import InterviewForm from "./InterviewForm"
import { useToast } from "../ui/toast"
import type { Interview } from "../../types/interviews"

interface InterviewSectionProps {
  interviews: Interview[]
  onAddInterview: (interview: Omit<Interview, "id">) => void
}

export default function InterviewSection({ interviews, onAddInterview }: InterviewSectionProps) {
  const [filter, setFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { addToast } = useToast()

  const filteredInterviews =
    filter === "all" ? interviews : interviews.filter((interview) => interview.status === filter)

  const handleAddInterview = (interview: Omit<Interview, "id">) => {
    onAddInterview(interview)
    addToast({
      title: "Interview added",
      description: `Interview with ${interview.candidate.name} has been scheduled.`,
      type: "success",
    })
  }

  return (
    <div className="mb-8 fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Interview</h2>
          <span className="text-sm text-muted-foreground">{filteredInterviews.length}</span>
        </div>

      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {filteredInterviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}

        <button
          className="min-w-[240px] h-[auto] rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={24} />
          <span className="ml-2">Add New Interview</span>
        </button>
      </div>

      <InterviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleAddInterview} />
    </div>
  )
}
