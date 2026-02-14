import { lawyers } from "@/data/lawyers";
import Link from "next/link";

export default function TeamPage() {
    return (
        <>
            {/* Header */}
            <section className="py-28 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        Our Team
                    </h1>
                    <p className="text-lg text-gray-600">
                        Experienced advocates committed to disciplined legal representation.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12">
                    {lawyers.map((lawyer) => (
                        <div key={lawyer.slug} className="border p-8">
                            <h3 className="text-2xl font-serif font-semibold mb-2">
                                {lawyer.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-2">
                                {lawyer.designation}
                            </p>

                            <p className="text-sm text-gray-500 mb-4">
                                {lawyer.experience}
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                {lawyer.bio}
                            </p>

                            <Link
                                href={`/lawyers/${lawyer.slug}`}
                                className="block mb-4 text-sm border-b w-fit"
                            >
                                View Profile
                            </Link>


                            <Link
                                href={`/appointment?lawyer=${lawyer.slug}`}
                                className="inline-block px-6 py-2 bg-black text-white text-sm uppercase tracking-wide"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
