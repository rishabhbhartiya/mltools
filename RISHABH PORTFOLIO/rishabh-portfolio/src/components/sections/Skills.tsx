import skills from "@/data/skills.json";
import AnimatedSection from "@/components/AnimatedSection";

export default function Skills() {
    return (
        <AnimatedSection>
            <section id="skills">
                <div className="ruler">
                    <h2>Technical Skills</h2>
                    <div className="card">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                            {skills.map((skill, i) => (
                                <span
                                    key={i}
                                    style={{
                                        background: "rgba(79, 140, 255, 0.1)",
                                        border: "1px solid rgba(79, 140, 255, 0.2)",
                                        color: "var(--text)",
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        fontSize: "0.95rem"
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}