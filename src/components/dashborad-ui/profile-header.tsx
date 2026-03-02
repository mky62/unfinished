import { ThemeToggle } from "@/src/components/ThemeToggle"
import { EditableProfileTitle } from "@/src/components/dashborad-ui/editable-profile-title"
import { EditableSocialLinks } from "@/src/components/dashborad-ui/editable-social-links"
import {GithubUser} from '@/src/lib/types'


export function DashboardProfileHeader({
  user,
  reposCount,
  totalStars,
  totalForks,
}: {
  user: GithubUser
  reposCount: number
  totalStars: number
  totalForks: number
}) {
  return (
    <section className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-[0_18px_45px_rgba(15,23,42,0.15)] md:flex-row md:items-center md:justify-between dark:border-slate-800/80 dark:bg-slate-950/60">
      {/* Profile */}
      <div className="flex flex-1 items-center gap-4 md:gap-5">
        {user.avatar_url && (
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-lg md:h-24 md:w-24 dark:border-slate-700/80"
          />
        )}
        <div className="space-y-3">
          <div className="mt-2 space-y-1">
            <div className="flex items-baseline gap-3 text-slate-900 dark:text-slate-50">
              <EditableProfileTitle
                name={user.name || user.login}
                handle={user.login}
              />
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
                @{user.login}
              </span>
            </div>
          </div>

          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">
            {user.bio ||
              "A snapshot of your GitHub presence — repositories, languages, and recent commits — all in one focused view."}
          </p>

          {/* Social links (editable) */}
          <EditableSocialLinks
            handle={user.login}
            defaultBlog={user.blog ?? undefined}
            defaultTwitter={user.twitter_username ?? undefined}
            githubUrl={user.html_url ?? undefined}
          />
        </div>
      </div>

      {/* Numbers summary + theme toggle */}
      <div className="flex w-full max-w-xs flex-col gap-4 text-sm md:max-w-sm">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Repositories
            </p>
            <p className="mt-1 text-xl font-semibold">{reposCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Stars
            </p>
            <p className="mt-1 text-xl font-semibold text-amber-300">
              {totalStars.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Forks
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-300">
              {totalForks.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

