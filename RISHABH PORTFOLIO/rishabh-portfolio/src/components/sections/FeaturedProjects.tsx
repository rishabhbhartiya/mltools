import projects from "@/data/projects.json";
import ProjectCard from "@/components/cards/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function FeaturedProjects() {
    // Take only the first 2-3 projects to show on home
    const featured = projects.slice(0, 2);

    return (
        <AnimatedSection>
            <section id="featured-projects">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <h2>Featured Projects</h2>
                    <Link href="/projects" className="btn-outline" style={{ padding: "8px 16px", borderRadius: "8px" }}>
                        View All Projects →
                    </Link>
                </div>

                <div className="grid">
                    {featured.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}