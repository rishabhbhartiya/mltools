import data from "@/data/publications.json";
import Card from "@/components/cards/Card";
import AnimatedSection from "@/components/AnimatedSection";

export default function Publications() {
    return (
        <AnimatedSection>
            <section id="publications">
                <div className="ruler">
                    <h2>Recognition & Publications</h2>
                    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
                        {data.map((item, i) => (
                            <Card key={i}>
                                <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>{item}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}