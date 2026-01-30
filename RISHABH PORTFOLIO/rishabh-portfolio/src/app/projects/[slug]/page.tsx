import projects from "@/data/projects.json";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Update the type definition and add 'async'
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    // Await the params object
    const { slug } = await params;

    // Use the unwrapped slug
    const project = projects.find((p) => p.slug === slug);

    if (!project) return notFound();

    return (
        <AnimatedSection>
            <article style={{ maxWidth: 800, margin: "auto", padding: "80px 24px" }}>
                <Link href="/projects" className="muted" style={{ marginBottom: 24, display: "inline-block" }}>
                    ← Back to Projects
                </Link>

                <header style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
                    <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>{project.title}</h1>

                    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <span style={{
                            background: "var(--text)",
                            color: "white",
                            padding: "6px 16px",
                            borderRadius: "99px",
                            fontSize: "0.9rem",
                            fontWeight: 500
                        }}>
                            {project.type}
                        </span>

                        {project.metrics && (
                            <span style={{
                                color: "var(--accent)",
                                fontWeight: 600,
                                fontSize: "1rem"
                            }}>
                                📈 Impact: {project.metrics}
                            </span>
                        )}
                    </div>
                </header>

                <div style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: 48 }}>
                    <p>{project.description}</p>
                </div>

                <div style={{ marginBottom: 48 }}>
                    <h3 style={{ marginBottom: 20 }}>Technologies Used</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        {project.tech.map((t) => (
                            <span key={t} style={{
                                background: "var(--card-bg)",
                                border: "1px solid var(--border)",
                                padding: "8px 20px",
                                borderRadius: "8px",
                                fontWeight: 500
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {project.link && (
                    <div style={{ marginTop: 40 }}>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn"
                        >
                            View Live Project ↗
                        </a>
                    </div>
                )}
            </article>
        </AnimatedSection>
    );
}