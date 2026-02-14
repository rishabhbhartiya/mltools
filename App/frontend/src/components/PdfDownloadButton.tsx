"use client";

interface Props {
    pdf: string;
    slug: string;
}

export default function PdfDownloadButton({ pdf, slug }: Props) {
    const handleDownload = () => {
        console.log("PDF Downloaded:", slug);

        // Later:
        // fetch("/api/track-download", { method: "POST", body: JSON.stringify({ slug }) });
    };

    return (
        <a
            href={pdf}
            download
            onClick={handleDownload}
            className="inline-block mt-6 px-6 py-3 bg-black text-white text-sm uppercase"
        >
            Download PDF
        </a>
    );
}
