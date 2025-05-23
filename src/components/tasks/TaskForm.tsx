"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "../ui/modal"
import { useToast } from "../ui/toast"
import type { Task } from "../../types/tasks"

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Omit<Task, "id">) => void
}

export default function TaskForm({ isOpen, onClose, onSave }: TaskFormProps) {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending",
    priority: "medium",
    assigneeName: "",
    amount: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTask: Omit<Task, "id"> = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      status: formData.status as "completed" | "in-progress" | "pending",
      priority: formData.priority as "high" | "medium" | "low",
      assignee: {
        name: formData.assigneeName,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
      },
      amount: formData.amount ? Number(formData.amount) : undefined,
    }

    onSave(newTask)
    addToast({
      title: "Task added",
      description: `Task "${formData.title}" has been created.`,
      type: "success",
    })
    onClose()

    // Reset form
    setFormData({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "pending",
      priority: "medium",
      assigneeName: "",
      amount: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount ($)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="assigneeName" className="block text-sm font-medium mb-1">
            Assignee Name
          </label>
          <input
            id="assigneeName"
            name="assigneeName"
            type="text"
            value={formData.assigneeName}
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
            Save Task
          </button>
        </div>
      </form>
    </Modal>
  )
}
