"use client"

import { useState } from "react"
import { Calendar, Bell, Search } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { useToast } from "../ui/toast"

export default function Header() {
  const { theme } = useTheme()
  const [date] = useState(new Date())
  const { addToast } = useToast()

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date)

  const handleNotificationClick = () => {
    addToast({
      title: "Notifications",
      description: "You have 3 unread notifications.",
      type: "info",
    })
  }

  const handleScheduleClick = () => {
    addToast({
      title: "Schedule",
      description: "Your schedule for today has been loaded.",
      type: "success",
    })
  }

  return (
    <div className="border-b border-border p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      {/* This section is hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        <button
          className="bg-card hover:bg-secondary text-foreground px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-sm"
          onClick={handleScheduleClick}
        >
          <span>Your Schedule</span>
          <Calendar size={16} />
          <span className="text-muted-foreground">{formattedDate}</span>
        </button>
      </div>

      {/* This section is visible on all devices */}
      <div className="flex items-center gap-4 mx-auto md:mx-0">
        <div
          className={`h-10 rounded-full flex items-center px-2 ${theme === "dark" ? "bg-[#8AE25E]" : "bg-[#8AE25E]"} shadow-sm`}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=user1" alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="mx-2 text-black text-xs">14:00</span>
            <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=user2" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mx-2 px-1.5 py-0.5 rounded-full bg-black text-white text-xs">13:30</div>

          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=user3" alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="mx-2 text-black text-xs">15:00</span>
          </div>
        </div>
      </div>

      {/* This section is hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-10 pr-4 py-1.5 rounded-full bg-secondary border-none focus:outline-none focus:ring-1 focus:ring-primary w-48"
          />
        </div>
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors relative"
          onClick={handleNotificationClick}
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center overflow-hidden border border-border">
          <img src="https://i.pravatar.cc/150?u=admin" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
