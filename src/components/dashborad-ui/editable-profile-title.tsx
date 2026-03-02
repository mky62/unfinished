"use client"

import { useEffect, useState } from "react"

type Props = {
  name: string
  handle: string
}

const storageKey = (handle: string) => `unfinished-alias-${handle}`

export function EditableProfileTitle({ name, handle }: Props) {
  const [alias, setAlias] = useState<string>("")
  const [editing, setEditing] = useState(false)
  const display = alias || name

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(storageKey(handle))
    if (stored) setAlias(stored)
  }, [handle])

  const save = () => {
    setEditing(false)
    if (typeof window === "undefined") return
    if (alias.trim().length === 0) {
      window.localStorage.removeItem(storageKey(handle))
      setAlias("")
    } else {
      window.localStorage.setItem(storageKey(handle), alias.trim())
    }
  }

  return (
    <div className="flex items-center gap-3">
      {editing ? (
        <>
          <input
            className="min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-50 outline-none focus:border-emerald-400"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save()
              if (e.key === "Escape") {
                setEditing(false)
              }
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-slate-950 hover:bg-emerald-400"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h1 className="truncate text-3xl font-semibold tracking-tight md:text-4xl">
            {display}
          </h1>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 hover:border-emerald-400 hover:text-emerald-300"
          >
            Edit
          </button>
        </>
      )}
    </div>
  )
}

