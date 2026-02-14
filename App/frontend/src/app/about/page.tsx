import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="py-28 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        About the Firm
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Established in 1979, Argentum Legal has built a legacy of
                        disciplined advocacy, strategic litigation, and principled
                        legal counsel across courts and tribunals in India.
                    </p>
                </div>
            </section>

            {/* Firm Overview */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="space-y-10 text-gray-700 leading-relaxed text-lg">
                        <p>
                            The Firm represents clients before the Supreme Court of India,
                            various High Courts, Tribunals, and regulatory authorities.
                            With over four decades of legal practice, the Firm combines
                            traditional courtroom discipline with modern legal research
                            methodologies.
                        </p>

                        <p>
                            Our work spans corporate advisory, civil and criminal litigation,
                            arbitration, constitutional matters, and complex commercial
                            disputes. Each matter is handled with confidentiality,
                            diligence, and strategic foresight.
                        </p>

                        <p>
                            The Firm operates offices in New Delhi, Ahmedabad, Mumbai, and Chennai,
                            serving individual, corporate, and institutional clients across
                            jurisdictions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Practice Philosophy */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-serif font-semibold mb-8">
                        Practice Philosophy
                    </h2>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <div>
                            <h3 className="font-serif text-xl font-semibold mb-2">
                                Strategic Preparation
                            </h3>
                            <p>
                                Every case is prepared with detailed factual analysis,
                                structured documentation, and comprehensive legal research.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-xl font-semibold mb-2">
                                Ethical Representation
                            </h3>
                            <p>
                                The Firm adheres strictly to professional standards and
                                confidentiality obligations as prescribed by law.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-xl font-semibold mb-2">
                                Client-Centric Approach
                            </h3>
                            <p>
                                Legal strategy is aligned with the client’s long-term
                                interests, risk exposure, and commercial objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership CTA */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-serif font-semibold mb-6">
                    Leadership & Advocates
                </h2>
                <Link
                    href="/about/team"
                    className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wide"
                >
                    View Our Team
                </Link>
            </section>
        </>
    );
}
