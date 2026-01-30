"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectProps {
    slug: string;
    title: string;
    type: string;
    description: string;
    tech: string[];
    metrics?: string;
    link?: string; // Optional external link, but we prioritize internal slug
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
    return (
        <Link href={`/projects/${project.slug}`} style={{ display: "block", height: "100%" }}>
            <motion.div
                className="card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                style={{ height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{project.title}</h3>
                    {project.metrics && (
                        <span style={{
                            background: "rgba(37, 99, 235, 0.1)",
                            color: "var(--accent)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "99px"
                        }}>
                            {project.metrics}
                        </span>
                    )}
                </div>

                <p className="muted" style={{ fontSize: "0.9rem", marginBottom: 12 }}>
                    {project.type}
                </p>

                <p style={{ marginBottom: 20, flexGrow: 1, color: "var(--text-secondary)" }}>
                    {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
                    {project.tech.slice(0, 4).map((t) => (
                        <span key={t} style={{
                            fontSize: "0.8rem",
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            color: "var(--text-secondary)"
                        }}>
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", alignSelf: "center" }}>
                            +{project.tech.length - 4} more
                        </span>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}