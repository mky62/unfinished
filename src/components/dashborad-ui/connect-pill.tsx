import React from "react";

interface ConnectPillProps {
    connected: boolean;
    loading: boolean;
    onConnect: () => void;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConnectPill({ connected, loading, onConnect, drawerOpen, setDrawerOpen }: ConnectPillProps) {
    if (!connected) {
        return (
            <button
                className="cbtn"
                onClick={onConnect}
                disabled={loading}
                style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "13px 28px", borderRadius: 12, border: "none",
                    background: loading
                        ? "#ece9e4"
                        : "linear-gradient(105deg, #00c8b4 0%, #0090ff 55%, #ff8c28 100%)",
                    color: loading ? "#b0ada8" : "#fff",
                    fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
                    cursor: loading ? "default" : "pointer",
                    letterSpacing: "-0.01em",
                    boxShadow: loading ? "none" : "0 4px 24px rgba(0,170,150,0.2)",
                }}
            >
                {loading
                    ? <><div style={{ width: 13, height: 13, border: "2px solid #d8d5d0", borderTopColor: "#00c8b4", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />Connecting…</>
                    : <><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>Connect GitHub</>
                }
            </button>
        );
    }

    return (
        <button
            className="tog"
            onClick={() => setDrawerOpen((o: boolean) => !o)}
            style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 9,
                border: "1px solid #e0ddd8",
                background: "#f5f3ef",
                color: "#a8a49e",
                fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s",
            }}
        >
            <span style={{ display: "inline-block", transition: "transform 0.3s", transform: drawerOpen ? "rotate(180deg)" : "none" }}>▾</span>
            {drawerOpen ? "Hide repos" : "Show repos"}
        </button>
    );
}
