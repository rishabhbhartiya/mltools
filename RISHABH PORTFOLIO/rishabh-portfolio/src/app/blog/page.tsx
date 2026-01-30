import blogs from "@/data/blogs.json";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function BlogPage() {
    return (
        <AnimatedSection>
            <section style={{ maxWidth: 800 }}>
                <h1>Blog</h1>
                <p className="muted" style={{ marginBottom: 48 }}>Thoughts on ML engineering, system design, and career growth.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    {blogs.map((blog) => (
                        <div key={blog.slug} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
                            <Link href={`/blog/${blog.slug}`}>
                                <h2 style={{ fontSize: "1.5rem", marginBottom: 12, cursor: "pointer" }} className="hover:text-blue-600">
                                    {blog.title}
                                </h2>
                            </Link>
                            <p className="muted" style={{ marginBottom: 12, fontSize: "0.9rem" }}>{blog.date}</p>
                            <p>{blog.excerpt}</p>
                            <Link href={`/blog/${blog.slug}`} style={{ color: "var(--accent)", fontWeight: 500, marginTop: 12, display: "inline-block" }}>
                                Read more →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </AnimatedSection>
    );
}