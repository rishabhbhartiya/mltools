import blogs from "@/data/blogs.json";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export async function generateStaticParams() {
    return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return notFound();

    return (
        <AnimatedSection>
            <article style={{ maxWidth: 700, margin: "auto", padding: "80px 24px" }}>
                <Link href="/blog" className="muted">← Back to Blog</Link>
                <h1 style={{ marginTop: 24, fontSize: "2.5rem" }}>{blog.title}</h1>
                <p className="muted" style={{ marginBottom: 48 }}>Published on {blog.date}</p>

                <div style={{ lineHeight: 1.8, fontSize: "1.15rem" }}>
                    <p>{blog.content}</p>
                </div>
            </article>
        </AnimatedSection>
    );
}