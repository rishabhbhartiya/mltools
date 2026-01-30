import data from "@/data/experience.json";
import Card from "@/components/cards/Card";
import AnimatedSection from "@/components/AnimatedSection";

export default function Experience() {
    return (
        <AnimatedSection>
            <section id="experience">
                <div className="ruler">
                    <h2>Experience</h2>
                    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
                        {data.map((item, i) => (
                            <Card key={i}>
                                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 8 }}>
                                    <h3 style={{ margin: 0, color: "var(--accent)" }}>{item.company}</h3>
                                    <span className="muted">{item.period}</span>
                                </div>
                                <h4 style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>{item.role}</h4>
                                <ul style={{ paddingLeft: 20, margin: 0 }}>
                                    {item.points.map((p: string, j: number) => (
                                        <li key={j} style={{ marginBottom: 8, lineHeight: "1.6" }}>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}