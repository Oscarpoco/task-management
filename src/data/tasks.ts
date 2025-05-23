import type { Task } from "../types/tasks"

export const tasksData: Task[] = [
  {
    id: "1",
    title: "Send Proposal",
    description: "Send the project proposal to the client",
    dueDate: "2023-06-15",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Alesha Hayworth",
      avatar: "https://i.pravatar.cc/150?u=alesha",
    },
    amount: 5000,
  },
  {
    id: "2",
    title: "Client Meeting",
    description: "Discuss project requirements with the client",
    dueDate: "2023-06-18",
    status: "pending",
    priority: "medium",
    assignee: {
      name: "Peter Thorne",
      avatar: "https://i.pravatar.cc/150?u=peter",
    },
  },
  {
    id: "3",
    title: "Review Contract",
    description: "Review and sign the contract",
    dueDate: "2023-06-20",
    status: "completed",
    priority: "high",
    assignee: {
      name: "Megan Farrell",
      avatar: "https://i.pravatar.cc/150?u=megan",
    },
  },
  {
    id: "4",
    title: "Prepare Presentation",
    description: "Create slides for the client presentation",
    dueDate: "2023-06-22",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
  },
  {
    id: "5",
    title: "Design Review",
    description: "Review the design mockups",
    dueDate: "2023-06-25",
    status: "pending",
    priority: "low",
    assignee: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=sarahj",
    },
  },
  {
    id: "6",
    title: "Code Review",
    description: "Review the code for the new feature",
    dueDate: "2023-06-28",
    status: "completed",
    priority: "high",
    assignee: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michaelc",
    },
  },
  {
    id: "7",
    title: "User Testing",
    description: "Conduct user testing for the new feature",
    dueDate: "2023-07-01",
    status: "pending",
    priority: "medium",
    assignee: {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?u=emilyd",
    },
  },
  {
    id: "8",
    title: "Deploy to Production",
    description: "Deploy the new feature to production",
    dueDate: "2023-07-05",
    status: "pending",
    priority: "high",
    assignee: {
      name: "Robert Wilson",
      avatar: "https://i.pravatar.cc/150?u=robertw",
    },
  },
]
