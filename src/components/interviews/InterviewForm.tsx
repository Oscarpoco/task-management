"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "../ui/modal"
import { useToast } from "../ui/toast"
import type { Interview } from "../../types/interviews"

interface InterviewFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (interview: Omit<Interview, "id">) => void
}

export default function InterviewForm({ isOpen, onClose, onSave }: InterviewFormProps) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    candidateName: "",
    position: "",
    company: "",
    status: "medium",
    interestLevel: 3,
    date: new Date().toISOString().split("T")[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newInterview: Omit<Interview, "id"> = {
      candidate: {
        name: formData.candidateName,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
      },
      position: formData.position,
      company: formData.company,
      status: formData.status as "hot" | "medium" | "low" | "not-interested",
      interestLevel: Number(formData.interestLevel),
      date: formData.date,
    }

    onSave(newInterview)
    addToast({
      title: "Interview added",
      description: `Interview with ${formData.candidateName} has been scheduled.`,
      type: "success",
    })
    onClose()

    // Reset form
    setFormData({
      candidateName: "",
      position: "",
      company: "",
      status: "medium",
      interestLevel: 3,
      date: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Interview">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="candidateName" className="block text-sm font-medium mb-1">
            Candidate Name
          </label>
          <input
            id="candidateName"
            name="candidateName"
            type="text"
            value={formData.candidateName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium mb-1">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="hot">Hot</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="not-interested">Not Interested</option>
          </select>
        </div>

        <div>
          <label htmlFor="interestLevel" className="block text-sm font-medium mb-1">
            Interest Level (1-5)
          </label>
          <input
            id="interestLevel"
            name="interestLevel"
            type="range"
            min="1"
            max="5"
            value={formData.interestLevel}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Interview Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-input hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Interview
          </button>
        </div>
      </form>
    </Modal>
  )
}
