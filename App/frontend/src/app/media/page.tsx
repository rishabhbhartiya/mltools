import type { Metadata } from "next";
import Link from "next/link";
import { media } from "@/data/media";

export const metadata: Metadata = {
    title: "Media & Publications",
    description:
        "Public engagements, legal commentary, and publications by members of the Firm.",

    openGraph: {
        title: "Media & Publications | NatrajX Law Firm",
        description:
            "Public engagements, legal commentary, and publications.",
        url: "http://localhost:3000/media", // change to real domain in production
        images: [
            {
                url: "/og-media.jpg",
                width: 1200,
                height: 630,
                alt: "Media & Publications",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Media & Publications",
        description:
            "Public engagements, legal commentary, and publications.",
        images: ["/og-media.jpg"],
    },
};


export default function MediaPage() {
    return (
        <>
            <section className="py-28 bg-gray-50 text-center">
                <h1 className="text-5xl font-serif font-bold">
                    Media & Publications
                </h1>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl space-y-10">
                    {media.map((item) => (
                        <div key={item.slug} className="border-b pb-8">
                            <p className="text-sm text-gray-500 mb-2">
                                {item.source} | {item.date}
                            </p>

                            <h2 className="text-xl font-serif font-semibold mb-3">
                                <Link href={`/media/${item.slug}`}>
                                    {item.title}
                                </Link>
                            </h2>

                            <p className="text-gray-700 mb-4">
                                {item.excerpt}
                            </p>

                            <Link
                                href={`/media/${item.slug}`}
                                className="text-sm border-b"
                            >
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
