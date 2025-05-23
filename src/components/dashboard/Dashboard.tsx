"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import Header from "../shared/Header"
import InterviewSection from "../interviews/InterviewSection"
import TaskSection from "../tasks/TaskSection"
import StatCard from "../shared/StatCard"
import { interviewsData } from "../../data/interviews"
import { tasksData } from "../../data/tasks"
import type { Interview } from "../../types/interviews"
import type { Task } from "../../types/tasks"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [interviews, setInterviews] = useState(interviewsData)
  const [tasks, setTasks] = useState(tasksData)

  // Filter data based on search query
  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddInterview = (interview: Omit<Interview, "id">) => {
    const newInterview = {
      id: uuidv4(),
      ...interview,
    }
    setInterviews((prev) => [newInterview, ...prev])
  }

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = {
      id: uuidv4(),
      ...task,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="p-6 flex-1 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight mr-4">WORKSPACE</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard title="Deals" value={interviews.length} trend="up" />
          <StatCard title="Won" value={20} trend="up" />
          <StatCard title="Lost" value={3} trend="down" />
        </div>

        <InterviewSection interviews={filteredInterviews.slice(0, 4)} onAddInterview={handleAddInterview} />

        <TaskSection tasks={filteredTasks.slice(0, 4)} onAddTask={handleAddTask} />
      </div>
    </div>
  )
}
