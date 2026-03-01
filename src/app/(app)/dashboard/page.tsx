"use client";

import React, { useState, useEffect } from "react";
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

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function DashboardPage() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("updated");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      sort === "stars" ? b.stars - a.stars : sort === "issues" ? b.issues - a.issues : 0
    );

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);

  return (
    <div
      className="dashboard-root h-screen w-screen overflow-hidden flex bg-[var(--bg-base)] text-[var(--text-primary)] font-[DM_Sans,sans-serif] relative"
      data-theme={isDark ? "dark" : "light"}
    >

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-[fadeIn_.2s_ease_both]"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={[
          // layout
          "flex flex-col h-screen  overflow-y-auto z-50 shrink-0",
          // colors
          "bg-[var(--bg-surface)] border-r border-[var(--border-subtle)]",
          // desktop: static, always visible
          "md:relative md:translate-x-0 md:w-[320px] lg:w-[320px]",
          // mobile: fixed slide-over
          "fixed top-0 left-0 w-[85vw] max-w-[320px]",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          // padding
          "px-9 py-12",
        ].join(" ")}
      >
        {/* Top mark + controls */}
        <div className="flex justify-between items-center  mb-12">
          <span className="font-[DM_Mono,monospace] text-[11px] tracking-[.12em] uppercase text-[var(--text-tertiary)]">
            GH / Profile
          </span>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="tog bg-transparent border-none cursor-pointer flex items-center justify-center text-[var(--text-secondary)] p-1.5 rounded-full transition-colors duration-200"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Close — mobile only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="tog md:hidden bg-transparent border-none cursor-pointer flex items-center justify-center text-[var(--text-secondary)] p-1.5 rounded-full transition-colors duration-200"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Profile picture */}
        <div className="mb-7">
          <ProfilePicture connected={connected} />
        </div>

        {/* Title */}
        <div className="mb-8">
          <TitleSection />
        </div>

        {/* Stats */}
        {connected && (
          <div className="flex-1 flex flex-col justify-start">
            <div className="border-t border-[var(--border-subtle)] mb-1" />
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

        <div className={connected ? "" : "flex-1"} />

        {/* Connect pill */}
        <div className="pt-6">
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
      <main className="flex-1 h-screen overflow-hidden flex flex-col bg-[var(--bg-base)] min-w-0">

        {/* ── MOBILE HEADER ── */}
        <div className="flex md:hidden items-center justify-between px-5 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="tog bg-transparent border-none cursor-pointer flex items-center justify-center text-[var(--text-secondary)] p-1.5 rounded-full"
          >
            <HamburgerIcon />
          </button>

          <span className="font-[DM_Mono,monospace] text-[11px] tracking-[.12em] uppercase text-[var(--text-tertiary)]">
            GH / Profile
          </span>

          <button
            onClick={() => setIsDark(!isDark)}
            className="tog bg-transparent border-none cursor-pointer flex items-center justify-center text-[var(--text-secondary)] p-1.5 rounded-full"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* ── EMPTY STATE ── */}
        {!connected ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-[fadeIn_.8s_ease_both]">
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-[var(--border-medium)] mb-8" />
            <p className="font-[DM_Mono,monospace] text-xs text-[var(--text-tertiary)] tracking-[.1em] uppercase text-center px-6">
              connect to load repositories
            </p>
            <div className="w-px h-20 bg-gradient-to-b from-[var(--border-medium)] to-transparent mt-8" />
          </div>

        ) : (
          // ── REPO PANEL ──
          <div className="repo-panel flex-1 flex flex-col overflow-hidden">

            {/* Top bar */}
            <div className="px-6 md:px-10 pt-6 md:pt-9 flex items-center justify-between shrink-0">
              <span className="font-[Playfair_Display,serif] text-xl md:text-[22px] font-normal text-[var(--text-primary)] tracking-[-0.01em]">
                Repositories
              </span>
              <span className="font-[DM_Mono,monospace] text-[11px] text-[var(--text-secondary)] tracking-[.06em]">
                {displayed.length} / {repos.length}
              </span>
            </div>

            {/* Hairline */}
            <div className="h-px bg-[var(--border-subtle)] mx-6 md:mx-10 mt-5 shrink-0" />

            {/* Search + Filter */}
            <div className="px-6 md:px-10 pt-4 shrink-0">
              <SearchBar
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                langs={LANGS}
              />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 content-start">
              {displayed.length === 0 ? (
                <div className="col-span-full flex flex-col items-center py-16 gap-3">
                  <span className="font-[DM_Mono,monospace] text-[11px] text-[var(--text-tertiary)] tracking-[.1em] uppercase">
                    No repos match
                  </span>
                </div>
              ) : (
                displayed.map((r, i) => <GitCard key={r.id} repo={r} i={i} />)
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}