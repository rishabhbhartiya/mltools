"use client";
import AnimatedSection from "@/components/AnimatedSection";
import Card from "@/components/cards/Card";
import publications from "@/data/publications.json";
import { useState } from "react";

export default function Research() {
    const [flipbookLoaded, setFlipbookLoaded] = useState(false);

    return (
        <AnimatedSection>
            <section id="research">
                <div className="ruler">
                    <h2>Research & Publications</h2>

                    {/* Media Feature */}
                    <Card>
                        <h3 style={{ color: "var(--accent)" }}>Media Feature</h3>
                        <p style={{ fontSize: "1.1rem" }}>{publications[0]}</p>
                    </Card>

                    {/* Thesis Section */}
                    <div style={{ marginTop: 40 }}>
                        <h3>MSc Thesis: Audio Pattern Recognition</h3>
                        <p className="muted" style={{ marginBottom: 20 }}>
                            Interactive Flipbook · University of Milan
                        </p>

                        {!flipbookLoaded && (
                            <p className="muted" style={{ marginBottom: 16, fontSize: "0.9rem" }}>
                                Loading thesis flipbook...
                            </p>
                        )}

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: 0,
                                paddingBottom: "56.25%", // 16:9 aspect ratio
                                borderRadius: "16px",
                                overflow: "hidden",
                                border: "1px solid var(--border)",
                                background: "var(--card-bg)",
                            }}
                        >
                            <iframe
                                src="https://rishabhbhartiya.github.io/Flipbook/"
                                title="Rishabh Bhartiya Thesis"
                                onLoad={() => setFlipbookLoaded(true)}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
}