import research from "@/data/research.json";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export async function generateStaticParams() {
    return research.map((item) => ({ slug: item.slug }));
}

export default async function ResearchDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = research.find((p) => p.slug === slug);
    if (!item) return notFound();

    return (
        <AnimatedSection>
            <article style={{ maxWidth: 800, margin: "auto", padding: "80px 24px" }}>
                <Link href="/research" className="muted">← Back to Research</Link>
                <h1 style={{ marginTop: 24 }}>{item.title}</h1>
                <p className="muted" style={{ marginBottom: 40 }}>{item.type} · {item.date}</p>

                <div style={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                    <p>{item.content}</p>
                </div>

                {item.link && (
                    <div style={{ marginTop: 40 }}>
                        <a href={item.link} target="_blank" className="btn">View Original Document</a>
                    </div>
                )}
            </article>
        </AnimatedSection>
    );
}