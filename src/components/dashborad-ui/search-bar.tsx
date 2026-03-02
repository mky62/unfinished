"use client"

import { useEffect, useState } from "react"

type SearchBarProps = {
  onQueryChange: (value: string) => void
}

export function SearchBar({ onQueryChange }: SearchBarProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    const id = window.setTimeout(() => {
      onQueryChange(value)
    }, 200)
    return () => window.clearTimeout(id)
  }, [value, onQueryChange])

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 shadow-[0_0_0_1px_rgba(148,163,184,0.15)]">
      <span className="text-xs text-slate-500">Search repos</span>
      <input
        className="ml-2 flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
        placeholder="Filter by name or description..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-[11px] text-slate-500 hover:text-slate-300"
        >
          Clear
        </button>
      )}
    </div>
  )
}

