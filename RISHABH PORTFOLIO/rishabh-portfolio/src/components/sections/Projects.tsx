import projects from "@/data/projects.json";
import Card from "@/components/cards/Card";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function Projects() {
    return (
        <AnimatedSection>
            <section id="projects">
                <div className="ruler">
                    <h2>Flagship Projects</h2>
                    <div className="grid">
                        {projects.map((project) => (
                            <Card key={project.slug}>
                                <h3>{project.title}</h3>
                                <span className="tag" style={{ marginBottom: 12 }}>{project.type}</span>
                                <p style={{ marginBottom: 16 }}>{project.description}</p>

                                {project.metrics && (
                                    <p style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.9rem" }}>
                                        Impact: {project.metrics}
                                    </p>
                                )}

                                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {project.tech.map(t => (
                                        <span key={t} className="muted" style={{ fontSize: "0.8rem", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 4 }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ marginTop: 20 }}>
                                    {project.link.startsWith("http") ? (
                                        <a href={project.link} target="_blank" rel="noreferrer">View Project →</a>
                                    ) : (
                                        <Link href={`/projects/${project.slug}`}>View Details →</Link>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}