import Link from "next/link";
import { insights } from "@/data/insights";

export default function InsightsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-28 bg-gray-50 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Insights
          </h1>
          <p className="text-lg text-gray-600">
            Legal updates, analysis, and commentary on recent developments.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {insights.map((article) => (
            <div key={article.slug} className="border-b pb-10">
              <div className="text-sm text-gray-500 mb-2">
                {article.date} | {article.category}
              </div>

              <h2 className="text-2xl font-serif font-semibold mb-4">
                <Link href={`/insights/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {article.excerpt}
              </p>

              <Link
                href={`/insights/${article.slug}`}
                className="text-sm uppercase tracking-wide border-b border-black"
              >
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
