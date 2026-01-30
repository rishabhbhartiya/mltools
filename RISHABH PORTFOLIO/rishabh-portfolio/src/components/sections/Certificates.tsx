import data from "@/data/certificates.json";
import Card from "@/components/cards/Card";
import AnimatedSection from "@/components/AnimatedSection";

export default function Certificates() {
    return (
        <AnimatedSection>
            <section id="certificates">
                <div className="ruler">
                    <h2>Certifications</h2>
                    <div className="grid">
                        {data.map((item, i) => (
                            <Card key={i}>
                                <h3>{item.title}</h3>
                                <p className="muted">{item.issuer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}