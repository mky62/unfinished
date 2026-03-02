import {Repo,GithubUser} from '@/src/lib/types'
import { DashboardProfileHeader } from "@/src/components/dashborad-ui/profile-header"
import { RepoBrowser } from "@/src/components/dashborad-ui/repo-browser"
import { user } from '@/src/lib/img'

export default async function RepoList({
  repos,
  token,
}: {
  repos: Repo[]
  token: string
}) {


  const totalStars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0,
  )

  const totalForks = repos.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0,
  )

  const languages = Array.from(
    new Set(
      repos
        .map((r) => r.language)
        .filter((l): l is string => Boolean(l)),
    ),
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="flex h-screen w-full flex-col gap-6 px-6 py-8 md:px-10">
        {/* Profile + high‑level stats (fixed at top) */}
        <div className="shrink-0">
          <DashboardProfileHeader
            user={user}
            reposCount={repos.length}
            totalStars={totalStars}
            totalForks={totalForks}
          />
        </div>

        {/* Scrollable content: search + stack + repositories */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-1">
          <RepoBrowser
            repos={repos}
            languages={languages}
            totalAvailable={repos.length}
          />
        </div>
      </div>
    </div>
  )
}

