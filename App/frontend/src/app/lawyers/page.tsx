import type { Metadata } from "next";
import { lawyers } from "@/data/lawyers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const lawyer = lawyers.find((l) => l.slug === params.slug);

    if (!lawyer) return {};

    return {
        title: lawyer.name,
        description: lawyer.bio,

        openGraph: {
            title: lawyer.name,
            description: lawyer.bio,
            url: `https://argentumlegal.com/lawyers/${lawyer.slug}`,
            type: "profile",
            images: [
                {
                    url: lawyer.photo,
                    width: 1200,
                    height: 630,
                    alt: lawyer.name,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: lawyer.name,
            description: lawyer.bio,
            images: [lawyer.photo],
        },
    };
}
