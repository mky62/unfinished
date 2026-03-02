"use client"

import { useEffect, useState } from "react"
import { Globe2, Twitter, Linkedin, Github } from "lucide-react"

type Props = {
  handle: string
  defaultBlog?: string | null
  defaultTwitter?: string | null
  githubUrl?: string | null
}

type LinksState = {
  blog: string
  twitter: string
  linkedin: string
}

const storageKey = (handle: string) => `unfinished-links-${handle}`

export function EditableSocialLinks({
  handle,
  defaultBlog,
  defaultTwitter,
  githubUrl,
}: Props) {
  const [links, setLinks] = useState<LinksState>({
    blog: "",
    twitter: "",
    linkedin: "",
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(storageKey(handle))
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LinksState
        setLinks(parsed)
        return
      } catch {
        // ignore parsing error
      }
    }
    setLinks({
      blog: defaultBlog ?? "",
      twitter: defaultTwitter ?? "",
      linkedin: "",
    })
  }, [handle, defaultBlog, defaultTwitter])

  const save = () => {
    setEditing(false)
    if (typeof window === "undefined") return
    window.localStorage.setItem(storageKey(handle), JSON.stringify(links))
  }

  const effectiveBlog = links.blog.trim()
  const effectiveTwitter = links.twitter.trim()
  const effectiveLinkedin = links.linkedin.trim()
  const hasAny = !!effectiveBlog || !!effectiveTwitter || !!effectiveLinkedin || !!githubUrl

  if (!editing) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        {hasAny ? (
          <>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200 hover:ring-emerald-400/60 dark:bg-slate-900/80 dark:ring-slate-700/80"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
            )}
            {effectiveBlog && (
              <a
                href={
                  effectiveBlog.startsWith("http")
                    ? effectiveBlog
                    : `https://${effectiveBlog}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200 hover:ring-emerald-400/60 dark:bg-slate-900/80 dark:ring-slate-700/80"
              >
                <Globe2 className="h-3 w-3" />
                Website
              </a>
            )}
            {effectiveTwitter && (
              <a
                href={
                  effectiveTwitter.startsWith("http")
                    ? effectiveTwitter
                    : `https://twitter.com/${effectiveTwitter.replace("@", "")}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200 hover:ring-emerald-400/60 dark:bg-slate-900/80 dark:ring-slate-700/80"
              >
                <Twitter className="h-3 w-3" />
                X / Twitter
              </a>
            )}
            {effectiveLinkedin && (
              <a
                href={
                  effectiveLinkedin.startsWith("http")
                    ? effectiveLinkedin
                    : `https://linkedin.com/in/${effectiveLinkedin.replace("@", "")}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200 hover:ring-emerald-400/60 dark:bg-slate-900/80 dark:ring-slate-700/80"
              >
                <Linkedin className="h-3 w-3" />
                LinkedIn
              </a>
            )}
          </>
        ) : (
          <span className="text-[11px] text-slate-500">
            No social links added yet.
          </span>
        )}

        <button
          type="button"
          onClick={() => setEditing(true)}
          className="ml-1 rounded-full border border-slate-700 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 hover:border-emerald-400 hover:text-emerald-300"
        >
          Edit links
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2 text-xs text-slate-200">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <label className="w-20 text-[11px] uppercase tracking-[0.16em] text-slate-500">
          Blog
        </label>
        <input
          className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
          placeholder="https://your-site.com"
          value={links.blog}
          onChange={(e) =>
            setLinks((prev) => ({ ...prev, blog: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <label className="w-20 text-[11px] uppercase tracking-[0.16em] text-slate-500">
          X / Twitter
        </label>
        <input
          className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
          placeholder="@handle"
          value={links.twitter}
          onChange={(e) =>
            setLinks((prev) => ({ ...prev, twitter: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <label className="w-20 text-[11px] uppercase tracking-[0.16em] text-slate-500">
          LinkedIn
        </label>
        <input
          className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
          placeholder="username or full URL"
          value={links.linkedin}
          onChange={(e) =>
            setLinks((prev) => ({ ...prev, linkedin: e.target.value }))
          }
        />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-400 hover:border-slate-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          className="rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-medium text-slate-950 hover:bg-emerald-400"
        >
          Save
        </button>
      </div>
    </div>
  )
}

