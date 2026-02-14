import { notFound } from "next/navigation";
import { practiceAreas } from "@/data/practiceAreas";
import { lawyers } from "@/data/lawyers";
import Link from "next/link";


interface Props {
    params: {
        slug: string;
    };
}

export default function PracticeAreaDetail({ params }: Props) {
    const area = practiceAreas.find((a) => a.slug === params.slug);

    if (!area) {
        return notFound();
    }

    return (
        <>
            {/* Header */}
            <section className="py-28 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        {area.title}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {area.shortDescription}
                    </p>
                </div>
            </section>

            {/* Description */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {area.fullDescription}
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-serif font-semibold mb-8">
                        Scope of Services
                    </h2>

                    <ul className="space-y-4 text-gray-700">
                        {area.services.map((service, index) => (
                            <li key={index} className="border-b pb-3">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div> 
            </section>

            {/* Related Lawyers */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-serif font-semibold mb-10">
                        Related Advocates
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        {lawyers
                            .filter((lawyer) =>
                                lawyer.expertise.includes(area.slug)
                            )
                            .map((lawyer) => (
                                <div key={lawyer.slug} className="border p-8">
                                    <h3 className="text-xl font-serif font-semibold mb-2">
                                        {lawyer.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-2">
                                        {lawyer.designation}
                                    </p>

                                    <p className="text-sm text-gray-600 mb-4">
                                        {lawyer.experience}
                                    </p>

                                    <p className="text-gray-700 mb-6">
                                        {lawyer.bio}
                                    </p>

                                    <Link
                                        href={`/appointment?lawyer=${lawyer.slug}`}
                                        className="px-6 py-2 bg-black text-white text-sm uppercase tracking-wide"
                                    >
                                        Book Appointment
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

        </>
    );
}
