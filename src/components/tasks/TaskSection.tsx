"use client"

import { useState } from "react"
import { Plus, Search, Filter, ChevronRight, ChevronLeft } from "lucide-react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import { useToast } from "../ui/toast"
import type { Task } from "../../types/tasks"

interface TaskSectionProps {
  tasks: Task[]
  onAddTask: (task: Omit<Task, "id">) => void
}

export default function TaskSection({ tasks, onAddTask }: TaskSectionProps) {
  const [filter, setFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { addToast } = useToast()

  const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter)

  const handleAddTask = (task: Omit<Task, "id">) => {
    onAddTask(task)
    addToast({
      title: "Task added",
      description: `Task "${task.title}" has been created.`,
      type: "success",
    })
  }

  return (
    <div className="mb-8 fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <span className="text-sm text-muted-foreground">{filteredTasks.length}</span>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <button
          className="h-[180px] rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={24} />
          <span className="ml-2">Add New Task</span>
        </button>
      </div>

      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleAddTask} />
    </div>
  )
}
