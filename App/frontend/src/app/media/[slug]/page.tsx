import { media } from "@/data/media";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import PdfDownloadButton from "@/components/PdfDownloadButton";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = media.find((m) => m.slug === params.slug);
    if (!article) return {};

    const url = `http://localhost:3000/media/${article.slug}`;

    return {
        title: article.title,
        description: article.excerpt,
        alternates: { canonical: url },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            url,
            images: [
                {
                    url: "/og-media.jpg",
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: ["/og-media.jpg"],
        },
    };
}

export default function MediaDetail({ params }: Props) {
    const article = media.find((m) => m.slug === params.slug);
    if (!article) return notFound();

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: {
            "@type": "Organization",
            name: "NatrajX Law Firm",
            logo: {
                "@type": "ImageObject",
                url: "http://localhost:3000/og-default.jpg",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `http://localhost:3000/media/${article.slug}`,
        },
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            {/* Header */}
            <section className="py-28 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-serif font-bold mb-6">
                        {article.title}
                    </h1>
                    <p className="text-gray-500 mb-4">
                        {article.source} | {article.date}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-gray-700 leading-relaxed space-y-6">
                    <p>{article.content}</p>

                    {/* PDF Download (Client Component) */}
                    <PdfDownloadButton
                        pdf={article.pdf}
                        slug={article.slug}
                    />

                    {/* Share Buttons */}
                    <ShareButtons />
                </div>
            </section>
        </>
    );
}
