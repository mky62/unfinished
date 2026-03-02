  <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm ring-1">
              <Image src={Logo} alt="Unfinished" width={22} height={22} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Unfinished</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ship faster. Stay focused.
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {userId ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-slate-200  px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
                >
                  Dashboard
                </Link>
                {viewer?.imageUrl && (
                  <img
                    src={viewer.imageUrl}
                    alt="Profile"
                    className="h-10 w-10 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800"
                  />
                )}
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-full border border-slate-200px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  Create account
                </Link>
              </>
            )}
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-start justify-center py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Personal dashboard
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
            A clean GitHub dashboard for your work in progress.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Connect GitHub, search your repositories, and get a beautiful,
            minimalist overview of your profile and projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
            >
              Get started
            </Link>
            <a
              href="#featured"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-400"
            >
              Explore top repos
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { k: "Fast setup", v: "Sign in and connect GitHub in seconds." },
              { k: "Minimal UI", v: "A focused layout that stays out of the way." },
              { k: "Searchable", v: "Filter repositories instantly on the client." },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-semibold">{f.k}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {f.v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured repos */}
        <section id="featured" className="scroll-mt-24 pb-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Top repositories
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Featured projects from the community
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                These are the highest‑starred repositories connected by users on
                the platform.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 md:inline-flex"
            >
              Connect yours →
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              No featured repositories yet. Be the first — sign in and connect
              GitHub from your dashboard.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((r) => (
                <a
                  key={r.full_name}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {r.full_name}
                      </p>
                      {r.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                          {r.description}
                        </p>
                      )}
                    </div>
                    {r.owner_avatar_url && (
                      <img
                        src={r.owner_avatar_url}
                        alt={r.owner_login ?? "Owner"}
                        className="h-9 w-9 rounded-xl ring-1 ring-slate-200 dark:ring-slate-800"
                      />
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>⭐ {Number(r.stargazers_count ?? 0).toLocaleString()}</span>
                      <span>⑂ {Number(r.forks_count ?? 0).toLocaleString()}</span>
                    </div>
                    {r.language && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] dark:border-slate-800 dark:bg-slate-950">
                        {r.language}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <footer className="py-6 text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Unfinished
        </footer>
      </div>