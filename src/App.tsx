"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import Dashboard from "./components/dashboard/Dashboard"
import Interviews from "./components/interviews/Interviews"
import Tasks from "./components/tasks/Tasks"
import Profile from "./components/profile/Profile"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./components/ui/toast"
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Mock authentication functions
  const login = () => {
    setIsAuthenticated(true)
  }

  const register = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register onRegister={register} />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <div className="flex h-screen bg-background text-foreground">
                    <Sidebar onLogout={logout} />
                    <div className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/interviews" element={<Interviews />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
