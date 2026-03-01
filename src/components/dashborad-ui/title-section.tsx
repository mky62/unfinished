import React from "react";
import { SocialLinks } from "./social-links";

export function TitleSection() {
    return (
        <>
            <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(34px, 7vw, 58px)",
                fontWeight: 800,
                color: "#1c1a18",
                letterSpacing: "-0.05em",
                lineHeight: 1, marginBottom: 5,
                textAlign: "center",
            }}>Alex Mercer</h1>

            <span style={{ fontSize: 12.5, color: "#b8b4ae", fontWeight: 500, letterSpacing: "0.03em", marginBottom: 18 }}>@alexmercer</span>

            <SocialLinks />

            <p style={{
                fontSize: 13.5, color: "#a8a49e",
                lineHeight: 1.7, textAlign: "center",
                maxWidth: 360, marginBottom: 28,
                fontWeight: 400,
            }}>
                Building at the edge of systems and ML.<br />Open source by default. Mostly up past midnight.
            </p>
        </>
    );
}
