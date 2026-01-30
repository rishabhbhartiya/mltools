"use client";

import Card from "./Card";

interface EducationProps {
    degree: string;
    institution: string;
    period: string;
    coursework?: string[];
}

export default function EducationCard({ item }: { item: EducationProps }) {
    return (
        <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{item.degree}</h3>
                <span className="muted" style={{ fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                    {item.period}
                </span>
            </div>

            <p className="muted" style={{ marginBottom: 16 }}>
                {item.institution}
            </p>

            {item.coursework && item.coursework.length > 0 && (
                <div style={{ marginTop: "auto" }}>
                    <p style={{
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--muted)",
                        marginBottom: 8
                    }}>
                        Relevant Coursework
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {item.coursework.map((course, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: "0.8rem",
                                    background: "var(--bg)",
                                    padding: "4px 10px",
                                    borderRadius: "4px",
                                    border: "1px solid var(--border)"
                                }}
                            >
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}