"use client";

import React, { useState } from "react";
import { ProfilePicture } from "@/src/components/dashborad-ui/profile-picture";
import { TitleSection } from "@/src/components/dashborad-ui/title-section";
import { ConnectPill } from "@/src/components/dashborad-ui/connect-pill";
import { SearchBar } from "@/src/components/dashborad-ui/drop-down";
import { GitCard } from "@/src/components/dashborad-ui/git-card";

const MOCK_REPOS = [
  { id: 1, name: "neural-diff", desc: "Differentiable neural architecture search", lang: "Python", langColor: "#3572A5", stars: 341, forks: 28, issues: 4, updated: "2d ago", private: false },
  { id: 2, name: "voxel-engine", desc: "Real-time voxel renderer in WebGPU", lang: "TypeScript", langColor: "#3178c6", stars: 892, forks: 61, issues: 12, updated: "5d ago", private: false },
  { id: 3, name: "dotfiles", desc: "Personal config — vim, zsh, tmux", lang: "Shell", langColor: "#5ba84a", stars: 44, forks: 7, issues: 0, updated: "3w ago", private: false },
  { id: 4, name: "budget-cli", desc: "Terminal budget tracker with sqlite", lang: "Rust", langColor: "#b7560f", stars: 127, forks: 14, issues: 2, updated: "1mo ago", private: true },
  { id: 5, name: "llm-bench", desc: "Benchmarking suite for language models", lang: "Python", langColor: "#3572A5", stars: 210, forks: 33, issues: 7, updated: "1w ago", private: false },
  { id: 6, name: "canvas-kit", desc: "Composable 2D canvas primitives", lang: "TypeScript", langColor: "#3178c6", stars: 56, forks: 9, issues: 1, updated: "2mo ago", private: false },
];

const LANGS = ["All", "Python", "TypeScript", "Rust", "Shell"];

export default function DashboardPage() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("updated");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const connect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConnected(true);
      setRepos(MOCK_REPOS);
      setTimeout(() => setDrawerOpen(true), 120);
    }, 1800);
  };

  const displayed = repos
    .filter(r => filter === "All" || r.lang === filter)
    .filter(r =>
      searchQuery === ""
        ? true
        : r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sort === "stars"
        ? b.stars - a.stars
        : sort === "issues"
          ? b.issues - a.issues
          : 0
    );

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

.dashboard-root {
  --bg-base: #f5f5f7;
  --bg-surface: #ffffff;
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
  --text-tertiary: rgba(0,0,0,.25);
  --border-subtle: rgba(0,0,0,.06);
  --border-medium: rgba(0,0,0,.12);
  --hover-subtle: rgba(0,0,0,.04);
}

.dashboard-root[data-theme='dark'] {
  --bg-base: #000000;
  --bg-surface: #111111;
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1aa;
  --text-tertiary: rgba(255,255,255,.4);
  --border-subtle: rgba(255,255,255,.1);
  --border-medium: rgba(255,255,255,.2);
  --hover-subtle: rgba(255,255,255,.1);
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

html,body,#root{
  height:100%;
  background:var(--bg-base);
  -webkit-font-smoothing:antialiased;
}

::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:var(--border-medium);border-radius:999px}
::-webkit-scrollbar-track{background:transparent}

@keyframes fadeUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes fadeIn{
  from{opacity:0}
  to{opacity:1}
}

@keyframes slideRight{
  from{opacity:0;transform:translateX(-8px)}
  to{opacity:1;transform:translateX(0)}
}

.stat-row{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  padding:14px 0;
  border-bottom:1px solid var(--border-subtle);
  animation:slideRight .4s ease both;
}

.stat-row:last-child{border-bottom:none}

.stat-label{
  font-family:'DM Sans',sans-serif;
  font-size:11px;
  font-weight:500;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--text-secondary);
}

.stat-val{
  font-family:'DM Mono',monospace;
  font-size:22px;
  font-weight:500;
  color:var(--text-primary);
  letter-spacing:-0.03em;
}

.cbtn{
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease;
}

.cbtn:hover:not(:disabled){
  transform:translateY(-1px);
  box-shadow:0 8px 24px rgba(0,0,0,.13);
}

.repo-panel{
  animation:fadeIn .5s ease both;
}

.tog:hover{background:var(--hover-subtle)!important}

.sort-sel{appearance:none}
.sort-sel option{background:var(--bg-surface);color:var(--text-primary)}

.sl:hover,.fb:hover{
  background:var(--hover-subtle)!important;
  border-color:var(--border-medium)!important;
}

.vertical-rule{
  position:absolute;
  top:0;
  bottom:0;
  left:320px;
  width:1px;
  background:var(--border-subtle);
}
`}</style>

      <div
        className="dashboard-root"
        data-theme={isDark ? "dark" : "light"}
        style={{
          height: "100vh",
          width: "100vw",
          background: "var(--bg-base)",
          fontFamily: "'DM Sans',sans-serif",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          color: "var(--text-primary)",
        }}
      >
        {/* ── LEFT SIDEBAR ── */}
        <aside
          style={{
            width: 320,
            flexShrink: 0,
            height: "100vh",
            background: "var(--bg-surface)",
            display: "flex",
            flexDirection: "column",
            padding: "48px 36px",
            position: "relative",
            zIndex: 2,
            borderRight: "1px solid var(--border-subtle)",
          }}
        >
          {/* Top mark & Theme Toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              GH / Profile
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                padding: 4,
                borderRadius: "50%",
                transition: "background 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "var(--hover-subtle)"}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
          </div>

          {/* Profile picture */}
          <div style={{ marginBottom: 28 }}>
            <ProfilePicture connected={connected} />
          </div>

          {/* Title */}
          <div style={{ marginBottom: 32 }}>
            <TitleSection />
          </div>

          {/* Stats — appear after connect */}
          {connected && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  marginBottom: 4,
                }}
              />
              {[
                { val: repos.length, lbl: "Repositories" },
                { val: totalStars, lbl: "Total Stars" },
                { val: repos.filter(r => !r.private).length, lbl: "Public" },
                { val: repos.filter(r => r.private).length, lbl: "Private" },
              ].map(({ val, lbl }, i) => (
                <div
                  key={lbl}
                  className="stat-row"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="stat-label">{lbl}</span>
                  <span className="stat-val">{val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div style={{ flex: connected ? 0 : 1 }} />

          {/* Connect pill anchored at bottom of sidebar */}
          <div style={{ paddingTop: 24 }}>
            <ConnectPill
              connected={connected}
              loading={loading}
              onConnect={connect}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main
          style={{
            flex: 1,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f7",
          }}
        >
          {!connected ? (
            /* Empty state — geometric negative space */
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                animation: "fadeIn .8s ease both",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 80,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(0,0,0,.12))",
                  marginBottom: 32,
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  color: "rgba(0,0,0,.25)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                connect to load repositories
              </p>
              <div
                style={{
                  width: 1,
                  height: 80,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,.12), transparent)",
                  marginTop: 32,
                }}
              />
            </div>
          ) : (
            <div
              className="repo-panel"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Top bar */}
              <div
                style={{
                  padding: "36px 40px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#1d1d1f",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Repositories
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: "#86868b",
                    letterSpacing: ".06em",
                  }}
                >
                  {displayed.length} / {repos.length}
                </div>
              </div>

              {/* Hairline */}
              <div
                style={{
                  height: 1,
                  background: "rgba(0,0,0,.06)",
                  margin: "20px 40px 0",
                }}
              />

              {/* Search + Filter */}
              <div style={{ padding: "16px 40px 0" }}>
                <SearchBar
                  filter={filter}
                  setFilter={setFilter}
                  sort={sort}
                  setSort={setSort}
                  langs={LANGS}
                />
              </div>

              {/* Grid */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "20px 40px 40px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                  gap: 14,
                  alignContent: "start",
                }}
              >
                {displayed.length === 0 ? (
                  <div
                    style={{
                      gridColumn: "1/-1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "64px 0",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 11,
                        color: "rgba(0,0,0,.25)",
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                      }}
                    >
                      No repos match
                    </div>
                  </div>
                ) : (
                  displayed.map((r, i) => (
                    <GitCard key={r.id} repo={r} i={i} />
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}