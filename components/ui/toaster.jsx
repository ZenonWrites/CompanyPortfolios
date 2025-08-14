"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"

export function Toaster() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ToastProvider>
      <ToastViewport />
      <Toast
        variant="default"
        className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
      />
    </ToastProvider>
  )
}
