import data from "@/data/education.json";
import Card from "@/components/cards/Card";
import AnimatedSection from "@/components/AnimatedSection";

export default function Education() {
    return (
        <AnimatedSection>
            <section id="education">
                <div className="ruler">
                    <h2>Education</h2>
                    <div className="grid">
                        {data.map((item, i) => (
                            <Card key={i}>
                                <h3>{item.degree}</h3>
                                <p className="muted" style={{ marginBottom: 16 }}>
                                    {item.institution} · {item.period}
                                </p>
                                {item.coursework && (
                                    <div>
                                        <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: 8 }}>Relevant Coursework:</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {item.coursework.map((c, j) => (
                                                <span key={j} className="tag" style={{ fontSize: "0.8rem", background: "var(--bg)" }}>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}