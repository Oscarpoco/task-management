export interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  status: "completed" | "in-progress" | "pending"
  priority: "high" | "medium" | "low"
  assignee: {
    name: string
    avatar?: string
  }
  amount?: number
}
