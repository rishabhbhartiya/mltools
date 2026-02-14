"use client";

export default function ShareButtons() {
    const url =
        typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className="flex gap-4 mt-10">
            <a
                href={`https://api.whatsapp.com/send?text=${url}`}
                target="_blank"
                className="border px-4 py-2 text-sm"
            >
                WhatsApp
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                target="_blank"
                className="border px-4 py-2 text-sm"
            >
                LinkedIn
            </a>

            <a
                href={`https://twitter.com/intent/tweet?url=${url}`}
                target="_blank"
                className="border px-4 py-2 text-sm"
            >
                X
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="_blank"
                className="border px-4 py-2 text-sm"
            >
                Facebook
            </a>
        </div>
    );
}
