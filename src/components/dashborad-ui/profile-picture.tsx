import React from "react";

export function ProfilePicture({ connected }: { connected: boolean }) {
    return (
        <div style={{ position: "relative", marginBottom: 0 }}>
            <div style={{
                width: 88, height: 88, borderRadius: 24,
                padding: 2.5,
                background: "linear-gradient(135deg, #00c8b4 0%, #0090ff 50%, #ff8c28 100%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}>
                <div style={{ width: "100%", height: "100%", borderRadius: 22, overflow: "hidden", background: "#e8e5df" }}>
                    <img
                        src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=dev99&backgroundColor=e8e5df"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e: any) => e.target.style.display = "none"}
                        alt="Avatar"
                    />
                </div>
            </div>
            {connected && (
                <div style={{
                    position: "absolute", bottom: 2, right: 2,
                    width: 13, height: 13, borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c8b4, #00e8a0)",
                    border: "2.5px solid #f2f0ec",
                    animation: "pulse 2.5s ease infinite",
                }} />
            )}
        </div>
    );
}
