"use client"

import { MoreHorizontal, Calendar, Check, Clock, Trash2, Edit } from "lucide-react"
import { useState } from "react"
import { useToast } from "../ui/toast"
import type { Task } from "../../types/tasks"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const { title, dueDate, status, assignee, priority, amount } = task
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)
  const { addToast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-amber-500"
      case "pending":
        return "bg-blue-500"
      default:
        return "bg-muted"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500"
      case "medium":
        return "border-amber-500"
      case "low":
        return "border-green-500"
      default:
        return "border-muted"
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }

  const handleStatusToggle = () => {
    const newStatus = currentStatus === "completed" ? "in-progress" : "completed"
    setCurrentStatus(newStatus)
    addToast({
      title: `Task ${newStatus === "completed" ? "completed" : "reopened"}`,
      description: `Task "${title}" has been ${newStatus === "completed" ? "marked as complete" : "reopened"}.`,
      type: "success",
    })
  }

  const handleEdit = () => {
    setIsMenuOpen(false)
    addToast({
      title: "Edit task",
      description: `Editing task "${title}".`,
      type: "info",
    })
  }

  const handleDelete = () => {
    setIsMenuOpen(false)
    addToast({
      title: "Task deleted",
      description: `Task "${title}" has been deleted.`,
      type: "success",
    })
  }

  return (
    <div
      className={`bg-card rounded-xl p-4 flex flex-col gap-3 border-l-4 ${getPriorityColor(priority)} slide-in shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${getStatusColor(currentStatus)}`} />
          <h3 className="font-semibold">{title}</h3>
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

      {amount && (
        <div className="text-sm">
          <span className="text-muted-foreground">Amount: </span>
          <span className="font-semibold">${amount.toLocaleString()}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
        <Calendar size={14} />
        <span>{formatDate(dueDate)}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={assignee.avatar || `https://i.pravatar.cc/150?u=${task.id}`}
              alt={assignee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs">{currentStatus === "completed" ? "Completed" : "Call scheduled"}</span>
        </div>

        <button
          onClick={handleStatusToggle}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            currentStatus === "completed" ? "bg-green-500 text-white" : "bg-secondary hover:bg-secondary/80"
          } transition-colors`}
        >
          {currentStatus === "completed" ? <Check size={14} /> : <Clock size={14} />}
        </button>
      </div>
    </div>
  )
}
