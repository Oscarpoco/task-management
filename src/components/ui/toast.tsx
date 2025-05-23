"use client"

import * as React from "react"
import { X } from "lucide-react"

const ToastContext = React.createContext<{
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

export type Toast = {
  id: string
  title: string
  description?: string
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, ...toast }])

      if (toast.duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, toast.duration || 5000)
      }
    },
    [setToasts],
  )

  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    },
    [setToasts],
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-h-screen overflow-hidden">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg border border-border bg-card text-card-foreground flex items-start gap-3 w-80 animate-in slide-in-from-right-full ${
            toast.type === "success"
              ? "border-l-4 border-l-green-500"
              : toast.type === "error"
                ? "border-l-4 border-l-red-500"
                : toast.type === "warning"
                  ? "border-l-4 border-l-yellow-500"
                  : toast.type === "info"
                    ? "border-l-4 border-l-blue-500"
                    : ""
          }`}
        >
          <div className="flex-1">
            <h3 className="font-medium">{toast.title}</h3>
            {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
