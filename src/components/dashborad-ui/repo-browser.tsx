"use client"

import { useMemo, useState } from "react"
import { SearchBar } from "@/src/components/dashborad-ui/search-bar"

type Repo = {
  id: number
  full_name: string
  html_url?: string
  stargazers_count: number
  forks_count?: number
  language: string | null
  description?: string | null
}

export function RepoBrowser({
  repos,
  languages,
  totalAvailable,
}: {
  repos: Repo[]
  languages: string[]
  totalAvailable: number
}) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return repos
    return repos.filter((r) => {
      const name = r.full_name?.toLowerCase() ?? ""
      const desc = r.description?.toLowerCase() ?? ""
      const lang = r.language?.toLowerCase() ?? ""
      return name.includes(q) || desc.includes(q) || lang.includes(q)
    })
  }, [query, repos])

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center justify-between">
        <SearchBar onQueryChange={setQuery} />
        <span className="hidden text-xs text-slate-500 md:inline">
          {filtered.length} shown
        </span>
      </div>

      {/* Stack / languages */}
      {languages.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
              Stack
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Repositories grid */}
      <section className="space-y-4 pb-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Repositories
          </p>
          <span className="text-xs text-slate-500">
            Showing {filtered.length} of {totalAvailable}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((repo) => (
            <article
              key={repo.id}
              className="group flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-[0_12px_30px_rgba(0,0,0,0.75)] dark:hover:border-slate-600"
            >
              <div className="flex flex-col gap-3">
                <div className="space-y-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-slate-300"
                  >
                    {repo.full_name}
                  </a>
                  {repo.description && (
                    <p className="max-w-md text-xs text-slate-600 dark:text-slate-400">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] dark:border-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 dark:bg-emerald-400" />
                      {repo.language}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span>⭐ {repo.stargazers_count}</span>
                    {typeof repo.forks_count === "number" && (
                      <span>⑂ {repo.forks_count}</span>
                    )}
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

