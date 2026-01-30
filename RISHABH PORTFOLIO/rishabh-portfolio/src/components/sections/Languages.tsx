import data from "@/data/languages.json";
import AnimatedSection from "@/components/AnimatedSection";

export default function Languages() {
    return (
        <AnimatedSection>
            <section id="languages">
                <div className="ruler">
                    <h2>Languages</h2>
                    <div className="card">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                            {data.map((lang, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontWeight: "bold" }}>{lang.name}</span>
                                    <span className="muted" style={{ fontSize: "0.9rem" }}>— {lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}