import projects from "@/data/projects.json";
import ProjectCard from "@/components/cards/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
    title: "Projects | Rishabh Bhartiya",
};

export default function ProjectsPage() {
    return (
        <AnimatedSection>
            <section>
                <div style={{ marginBottom: 48 }}>
                    <h1>All Projects</h1>
                    <p className="muted">A complete archive of my engineering, research, and freelance work.</p>
                </div>
                <div className="grid">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}