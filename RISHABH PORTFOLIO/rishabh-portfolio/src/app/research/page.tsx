import research from "@/data/research.json";
import Card from "@/components/cards/Card";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function ResearchPage() {
    return (
        <AnimatedSection>
            <section>
                <h1>Research</h1>
                <p className="muted" style={{ marginBottom: 48 }}>Academic publications, thesis work, and technical deep dives.</p>

                <div className="grid">
                    {research.map((item) => (
                        <Card key={item.slug}>
                            <p className="muted" style={{ fontSize: "0.9rem", marginBottom: 8 }}>{item.date} · {item.type}</p>
                            <h3>{item.title}</h3>
                            <p>{item.excerpt}</p>
                            <Link href={`/research/${item.slug}`} style={{ color: "var(--accent)", fontWeight: 500, marginTop: 16, display: "inline-block" }}>
                                Read Paper →
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}