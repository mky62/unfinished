import React from "react";

interface SearchBarProps {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    langs: string[];
}

export function SearchBar({ filter, setFilter, sort, setSort, langs }: SearchBarProps) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 28px 12px", flexShrink: 0, gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {langs.map(l => (
                    <button key={l} className="fb" onClick={() => setFilter(l)} style={{
                        padding: "4px 11px", borderRadius: 7,
                        background: filter === l ? "rgba(0,190,170,0.08)" : "#f5f3ef",
                        border: `1px solid ${filter === l ? "rgba(0,190,170,0.3)" : "#e0ddd8"}`,
                        color: filter === l ? "#009e8e" : "#b0ada8",
                        fontSize: 11.5, fontWeight: 500, cursor: "pointer",
                        transition: "all 0.15s",
                    }}>{l}</button>
                ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="sort-sel" style={{
                background: "#f5f3ef", border: "1px solid #e0ddd8",
                color: "#b0ada8", borderRadius: 7, fontSize: 11.5,
                fontWeight: 500, padding: "4px 10px", cursor: "pointer",
                outline: "none", fontFamily: "'Manrope', sans-serif",
            }}>
                <option value="updated">Recently updated</option>
                <option value="stars">Most stars</option>
                <option value="issues">Open issues</option>
            </select>
        </div>
    );
}
