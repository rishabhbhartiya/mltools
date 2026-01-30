import AnimatedSection from "@/components/AnimatedSection";
import Card from "@/components/cards/Card";

export default function Kaggle() {
    return (
        <AnimatedSection>
            <section id="kaggle">
                <div className="ruler">
                    <h2>Kaggle Achievements</h2>
                    <div className="grid">
                        <Card>
                            <h3 style={{ color: "#EBA352" }}>Kaggle Expert</h3>
                            <p className="muted">Ranked Top 1% Globally</p>
                            <p>
                                Consistently competing in high-level ML competitions focusing on
                                tabular data, NLP, and efficient inference.
                            </p>
                        </Card>
                        <Card>
                            <h3>16+ Medals</h3>
                            <p className="muted">Competition Performance</p>
                            <p>
                                Awarded 16 Bronze medals for high-ranking solution notebooks and
                                discussion contributions.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}