import { notFound } from "next/navigation";
import { insights } from "@/data/insights";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = insights.find((a) => a.slug === params.slug);
  if (!article) return {};

  const url = `http://localhost:3000/insights/${article.slug}`;

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
          url: "/og-article.jpg",
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
      images: ["/og-article.jpg"],
    },
  };
}

export default function InsightDetail({ params }: Props) {
  const article = insights.find((item) => item.slug === params.slug);
  if (!article) return notFound();

  return (
    <>
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-sm text-gray-500 mb-4">
            {article.date} | {article.category}
          </div>

          <h1 className="text-4xl font-serif font-bold mb-6">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-gray-700 leading-relaxed text-lg whitespace-pre-line space-y-8">
          <p>{article.content}</p>

          {/* Share Buttons */}
          <ShareButtons />
        </div>
      </section>
    </>
  );
}
