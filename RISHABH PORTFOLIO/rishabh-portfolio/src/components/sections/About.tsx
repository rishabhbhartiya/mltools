"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function About() {
    return (
        <AnimatedSection>
            {/* Main Container: Relative positioning is crucial here */}
            <section
                id="about"
                style={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    padding: "80px 24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "500px" // Ensures enough height for the dots to show
                }}
            >

                {/* Background Layer: Forced absolute positioning via style */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0 // Puts it behind everything
                    }}
                >
                    <DottedGlowBackground
                        // We use style prop implicitly by wrapping it, 
                        // but let's ensure the component fills this wrapper
                        className="h-full w-full"
                        opacity={0.6}
                        gap={12}
                        radius={2}
                        color="#C0C0C0"      // Silver dots
                        darkColor="#C0C0C0"
                        glowColor="#E0E0E0"  // Silver glow
                        backgroundOpacity={0}
                        speedMin={0.3}
                        speedMax={1.0}
                        speedScale={1}
                    />
                </div>

                {/* Content Layer: Relative positioning puts it ON TOP */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10, // Higher z-index ensures text is clickable and visible
                        maxWidth: "900px",
                        textAlign: "center"
                    }}
                >
                    <h2 style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "24px",
                        color: "var(--text)"
                    }}>
                        About Me
                    </h2>

                    <p style={{
                        lineHeight: "1.8",
                        fontSize: "1.2rem",
                        color: "var(--text-secondary)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.6)" // Shadow for readability over dots
                    }}>
                        Machine Learning Engineer with experience designing and deploying
                        end-to-end ML systems, evaluation frameworks, and data pipelines
                        for production environments. Strong background in NLP, applied
                        research, and analytics. Kaggle Expert (Top 1%) with a proven
                        record of building robust, scalable ML solutions.
                        Machine Learning Engineer with experience designing and deploying
                        end-to-end ML systems, evaluation frameworks, and data pipelines
                        for production environments. Strong background in NLP, applied
                        research, and analytics. Kaggle Expert (Top 1%) with a proven
                        record of building robust, scalable ML solutions.
                        Machine Learning Engineer with experience designing and deploying
                        end-to-end ML systems, evaluation frameworks, and data pipelines
                        for production environments. Strong background in NLP, applied
                        research, and analytics. Kaggle Expert (Top 1%) with a proven
                        record of building robust, scalable ML solutions.
                        Machine Learning Engineer with experience designing and deploying
                        end-to-end ML systems, evaluation frameworks, and data pipelines
                        for production environments. Strong background in NLP, applied
                        research, and analytics. Kaggle Expert (Top 1%) with a proven
                        record of building robust, scalable ML solutions.
                        
                    </p>
                </div>
            </section>
        </AnimatedSection>
    );
}