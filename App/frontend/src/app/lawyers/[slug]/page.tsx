import { lawyers } from "@/data/lawyers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lawyer = lawyers.find((l) => l.slug === params.slug);
    if (!lawyer) return {};

    const url = `http://localhost:3000/lawyers/${lawyer.slug}`;

    return {
        title: lawyer.name,
        description: lawyer.bio,
        alternates: { canonical: url },
        openGraph: {
            title: lawyer.name,
            description: lawyer.bio,
            type: "profile",
            url,
            images: [
                {
                    url: lawyer.photo,
                    width: 1200,
                    height: 630,
                    alt: lawyer.name,
                },
            ],
        },
    };
}

export default function LawyerProfile({ params }: Props) {
    const lawyer = lawyers.find((l) => l.slug === params.slug);
    if (!lawyer) return notFound();

    return (
        <>
            <section className="py-28 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-16 items-center">

                    <div>
                        <Image
                            src={lawyer.photo}
                            alt={lawyer.name}
                            width={500}
                            height={600}
                            className="object-cover border"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-4">
                            {lawyer.name}
                        </h1>

                        <p className="text-gray-600 mb-2">
                            {lawyer.designation}
                        </p>

                        <p className="text-gray-500 mb-6">
                            {lawyer.experience}
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-8">
                            {lawyer.bio}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {lawyer.specializations.map((spec, index) => (
                                <span key={index} className="border px-4 py-1 text-sm">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <Link
                            href={`/appointment?lawyer=${lawyer.slug}`}
                            className="px-6 py-3 bg-black text-white text-sm uppercase tracking-wide"
                        >
                            Book Consultation
                        </Link>

                        {/* Share Buttons */}
                        <div className="mt-10">
                            <ShareButtons />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
