"use client";

import React, { useState } from "react";
import { ProfilePicture } from "@/src/components/dashborad-ui/profile-picture";
import { TitleSection } from "@/src/components/dashborad-ui/title-section";
import { ConnectPill } from "@/src/components/dashborad-ui/connect-pill";
import { SearchBar } from "@/src/components/dashborad-ui/search-bar";
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
    .sort((a, b) => sort === "stars" ? b.stars - a.stars : sort === "issues" ? b.issues - a.issues : 0);

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const DRAWER_H = "60vh";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #f2f0ec; overflow: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #ddd9d2; border-radius: 2px; }
        @keyframes rise { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes heroIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .sl:hover { background: #ece9e4 !important; color: #333 !important; border-color: #dddad4 !important; }
        .fb:hover { background: #ece9e4 !important; color: #444 !important; border-color: #d8d4ce !important; }
        .cbtn:hover:not(:disabled) { transform: scale(1.02) !important; box-shadow: 0 8px 32px rgba(0,160,140,0.22) !important; }
        .cbtn { transition: all 0.18s ease !important; }
        .tog:hover { background: #ebe8e3 !important; }
        .sort-sel { appearance: none; }
        .sort-sel option { background: #f8f7f5; color: #333; }
      `}</style>

      <div style={{
        height: "100vh", width: "100vw",
        background: "#f2f0ec",
        position: "relative", overflow: "hidden",
        fontFamily: "'Manrope', sans-serif",
      }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,190,170,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,120,40,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          paddingBottom: drawerOpen ? DRAWER_H : "0",
          transition: "padding-bottom 0.52s cubic-bezier(.4,0,.2,1)",
          animation: "heroIn 0.65s cubic-bezier(.4,0,.2,1) both",
        }}>

          <ProfilePicture connected={connected} />

          <TitleSection />

          {connected && (
            <div style={{ display: "flex", gap: 36, marginBottom: 28, animation: "rise 0.4s ease both" }}>
              {[
                { val: repos.length, lbl: "repos" },
                { val: totalStars, lbl: "stars" },
                { val: repos.filter(r => !r.private).length, lbl: "public" },
              ].map(({ val, lbl }) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800,
                    background: "linear-gradient(135deg, #00a898 0%, #0078d4 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}>{val}</div>
                  <div style={{ fontSize: 10, color: "#c8c4be", fontWeight: 600, marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{lbl}</div>
                </div>
              ))}
            </div>
          )}

          <ConnectPill connected={connected} loading={loading} onConnect={connect} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </div>

        {connected && (
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: DRAWER_H,
            background: "rgba(248,246,242,0.96)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid #e4e0da",
            borderRadius: "18px 18px 0 0",
            transform: drawerOpen ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.52s cubic-bezier(.4,0,.2,1)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 -12px 48px rgba(0,0,0,0.07)",
          }}>
            <div style={{ height: 2, background: "linear-gradient(90deg, #00c8b4, #0090ff 50%, #ff8c28)", flexShrink: 0 }} />

            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px", cursor: "pointer", flexShrink: 0 }} onClick={() => setDrawerOpen(false)}>
              <div style={{ width: 34, height: 3, borderRadius: 2, background: "#ddd9d2" }} />
            </div>

            <SearchBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} langs={LANGS} />

            <div style={{
              flex: 1, overflowY: "auto",
              padding: "0 28px 28px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 8, alignContent: "start",
            }}>
              {displayed.length === 0
                ? <p style={{ fontSize: 13, color: "#ccc9c4", padding: 28, gridColumn: "1/-1", textAlign: "center" }}>No repos match.</p>
                : displayed.map((r, i) => <GitCard key={r.id} repo={r} i={i} />)
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
}