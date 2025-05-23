"use client"

import { useState } from "react"
import { Plus, Search, Filter, X } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import Header from "../shared/Header"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import { useToast } from "../ui/toast"
import { tasksData } from "../../data/tasks"
import type { Task } from "../../types/tasks"

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tasks, setTasks] = useState(tasksData)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { addToast } = useToast()

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = {
      id: uuidv4(),
      ...task,
    }
    setTasks((prev) => [newTask, ...prev])
    addToast({
      title: "Task added",
      description: `Task "${task.title}" has been created.`,
      type: "success",
    })
  }

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="p-6 flex-1 overflow-auto">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-full bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>

            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-colors"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus size={16} />
              New Task
            </button>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Tasks</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFilters}
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Filter size={18} />
              </button>
              <button
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsFormOpen(true)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div className="bg-card rounded-lg p-4 border border-border shadow-sm space-y-3 animate-in slide-in-from-top-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <button onClick={toggleFilters} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 rounded-lg w-full bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="mobileStatusFilter" className="block text-sm text-muted-foreground mb-1">
                  Status
                </label>
                <select
                  id="mobileStatusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
      </div>

      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleAddTask} />
    </div>
  )
}
