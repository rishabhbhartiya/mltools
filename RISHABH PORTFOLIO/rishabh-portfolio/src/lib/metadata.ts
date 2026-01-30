import type { Metadata } from "next";

export const siteMetadata: Metadata = {
    title: {
        default: "Rishabh Bhartiya | ML Engineer",
        template: "%s | Rishabh Bhartiya",
    },
    description:
        "Machine Learning Engineer at Edza AI. Kaggle Expert (Top 1%). Specializing in NLP, production ML pipelines, evaluation frameworks, and scalable AI systems.",
    keywords: [
        "Machine Learning Engineer",
        "Data Scientist",
        "NLP",
        "Edza AI",
        "Kaggle Expert",
        "Python",
        "PyTorch",
        "MLOps",
        "Rishabh Bhartiya",
    ],
    authors: [{ name: "Rishabh Bhartiya", url: "https://rishabhbhartiya.com" }],
    creator: "Rishabh Bhartiya",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://rishabhbhartiya.com",
        title: "Rishabh Bhartiya | ML Engineer",
        description: "Building production-grade educational AI systems. Kaggle Expert.",
        siteName: "Rishabh Bhartiya Portfolio",
        images: [
            {
                url: "/og-image.jpg", // Ensure you add this image to your public folder
                width: 1200,
                height: 630,
                alt: "Rishabh Bhartiya - ML Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Rishabh Bhartiya | ML Engineer",
        description: "Building production-grade educational AI systems. Kaggle Expert.",
        creator: "@rishabhbhartiya", // Update with your actual handle if available
    },
    icons: {
        icon: "/favicon.ico",
    },
};