"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "unfinished-theme"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
    const enabled = stored ? stored === "dark" : prefersDark
    document.documentElement.classList.toggle("dark", enabled)
    setIsDark(enabled)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", next)
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500"
    >
      <span
        className={`h-4 w-4 rounded-full border border-slate-400 bg-gradient-to-tr from-amber-300 to-orange-400 shadow-sm dark:hidden`}
      />
      <span
        className={`hidden h-4 w-4 items-center justify-center rounded-full border border-slate-500 bg-slate-900 text-[10px] dark:flex`}
      >
        ☾
      </span>
      <span>{isDark ? "Dark" : "Light"} mode</span>
    </button>
  )
}

