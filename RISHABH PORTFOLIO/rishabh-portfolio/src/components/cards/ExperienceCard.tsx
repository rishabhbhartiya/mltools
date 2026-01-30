"use client";

import Card from "./Card";

interface ExperienceProps {
    company: string;
    role: string;
    period: string;
    points: string[];
}

export default function ExperienceCard({ item }: { item: ExperienceProps }) {
    return (
        <Card>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                marginBottom: 8
            }}>
                <h3 style={{ margin: 0, color: "var(--accent)", fontSize: "1.2rem" }}>
                    {item.company}
                </h3>
                <span className="muted" style={{ fontSize: "0.9rem" }}>
                    {item.period}
                </span>
            </div>

            <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: "1.05rem", fontWeight: 500 }}>
                {item.role}
            </h4>

            <ul style={{
                margin: 0,
                paddingLeft: 20,
                color: "var(--text)",
                opacity: 0.9
            }}>
                {item.points.map((point, index) => (
                    <li key={index} style={{ marginBottom: 8, lineHeight: "1.6" }}>
                        {point}
                    </li>
                ))}
            </ul>
        </Card>
    );
}