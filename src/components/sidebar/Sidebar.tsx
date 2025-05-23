"use client"

import { Home, Users, CheckSquare, User, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { useToast } from "../ui/toast"

interface SidebarProps {
  onLogout: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useToast()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    addToast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      type: "success",
    })
    onLogout()
  }

  const handleThemeToggle = () => {
    toggleTheme()
    addToast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: `You've switched to ${theme === "dark" ? "light" : "dark"} mode.`,
      type: "info",
    })
  }

  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-6 transition-all duration-300 shadow-sm">
      <div className="mb-8">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          W
        </div>
      </div>

      <nav className="flex flex-col items-center gap-6 flex-1">
        <Link
          to="/"
          className={`p-2 rounded-lg transition-colors ${isActive("/") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Home size={20} />
        </Link>
        <Link
          to="/interviews"
          className={`p-2 rounded-lg transition-colors ${isActive("/interviews") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Users size={20} />
        </Link>
        <Link
          to="/tasks"
          className={`p-2 rounded-lg transition-colors ${isActive("/tasks") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <CheckSquare size={20} />
        </Link>
        <Link
          to="/profile"
          className={`p-2 rounded-lg transition-colors ${isActive("/profile") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <User size={20} />
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}
