import Link from "next/link";
import { practiceAreas } from "@/data/practiceAreas";

export default function PracticeAreasPage() {
    return (
        <>
            {/* Header */}
            <section className="py-28 bg-gray-50 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        Practice Areas
                    </h1>
                    <p className="text-lg text-gray-600">
                        Comprehensive legal representation across courts and tribunals.
                    </p>
                </div>
            </section>

            {/* Areas Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12">
                    {practiceAreas.map((area) => (
                        <div key={area.slug} className="border p-8">
                            <h2 className="text-2xl font-serif font-semibold mb-4">
                                {area.title}
                            </h2>

                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {area.shortDescription}
                            </p>

                            <Link
                                href={`/practice-areas/${area.slug}`}
                                className="text-sm uppercase tracking-wide border-b border-black"
                            >
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
