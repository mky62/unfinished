import React, { useState } from "react";

export function GitCard({ repo, i }: { repo: any, i: number }) {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                position: "relative", overflow: "hidden",
                background: hov ? "#fff" : "#f8f7f5",
                borderRadius: 12,
                padding: "15px 18px",
                border: `1px solid ${hov ? "rgba(0,170,150,0.25)" : "#ece9e4"}`,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                transform: hov ? "translateY(-1px)" : "none",
                boxShadow: hov ? "0 6px 24px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
                animation: `rise 0.4s ease ${i * 0.06}s both`,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a24", letterSpacing: "-0.02em" }}>{repo.name}</span>
                    {repo.private && (
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(220,120,30,0.1)", color: "#c06010", borderRadius: 4, padding: "1px 5px" }}>private</span>
                    )}
                </div>
                <span style={{ fontSize: 10.5, color: "#bbb8b2" }}>{repo.updated}</span>
            </div>
            <p style={{ fontSize: 12, color: "#9a9890", marginBottom: 11, lineHeight: 1.55 }}>{repo.desc}</p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "#aaa8a2" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: repo.langColor, display: "inline-block" }} />
                    {repo.lang}
                </span>
                <span style={{ fontSize: 11.5, color: "#c0bdb8" }}>★ {repo.stars}</span>
                <span style={{ fontSize: 11.5, color: "#c0bdb8" }}>⑂ {repo.forks}</span>
                {repo.issues > 0 && (
                    <span style={{ fontSize: 11.5, color: "#d4735a" }}>● {repo.issues}</span>
                )}
            </div>
        </div>
    );
}
