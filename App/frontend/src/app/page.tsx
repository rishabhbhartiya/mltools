import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Strategic Legal Representation Across Jurisdictions
          </h1>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Established in 1979, Argentum Legal provides litigation,
            corporate advisory, arbitration, and regulatory representation
            before the Supreme Court of India, High Courts, and Tribunals.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wide"
            >
              Request Consultation
            </Link>

            <Link
              href="/practice-areas"
              className="px-8 py-3 border border-black text-sm uppercase tracking-wide"
            >
              View Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-16 text-center">
          <div>
            <h3 className="text-3xl font-serif font-semibold mb-2">
              41+ Years
            </h3>
            <p className="text-gray-600">
              Established Practice Since 1979
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-serif font-semibold mb-2">
              500+ Matters
            </h3>
            <p className="text-gray-600">
              Across Civil, Criminal & Commercial Law
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-serif font-semibold mb-2">
              National Presence
            </h3>
            <p className="text-gray-600">
              New Delhi | Ahmedabad | Chennai | Mumbai
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">
            Practice Areas
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Corporate & Commercial Law",
              "Civil & Criminal Litigation",
              "Arbitration & Dispute Resolution",
              "Real Estate & Property Law",
              "Family & Matrimonial Law",
              "Intellectual Property",
            ].map((area, index) => (
              <div key={index} className="border p-8">
                <h3 className="font-serif font-semibold text-lg mb-3">
                  {area}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Advisory and representation tailored to client objectives and regulatory framework.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/practice-areas"
              className="text-sm uppercase tracking-wide border-b border-black"
            >
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Representative Matters Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">
            Representative Matters
          </h2>

          <div className="space-y-10">
            <div className="border-b pb-6">
              <p className="text-sm text-gray-500 mb-2">
                Supreme Court of India | 2022
              </p>
              <h3 className="font-serif font-semibold text-lg">
                Criminal Appeal – Conviction Set Aside
              </h3>
            </div>

            <div className="border-b pb-6">
              <p className="text-sm text-gray-500 mb-2">
                High Court of Delhi | 2023
              </p>
              <h3 className="font-serif font-semibold text-lg">
                Commercial Contract Dispute – Decree in Favor
              </h3>
            </div>

            <div className="border-b pb-6">
              <p className="text-sm text-gray-500 mb-2">
                High Court of Gujarat | 2024
              </p>
              <h3 className="font-serif font-semibold text-lg">
                Arbitration Award Enforcement
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/case-results"
              className="text-sm uppercase tracking-wide border-b border-black"
            >
              View Representative Matters
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-gray-50 text-center">
        <h2 className="text-3xl font-serif font-semibold mb-6">
          Confidential Consultation
        </h2>

        <p className="text-gray-600 mb-8">
          Contact the Firm to discuss your legal requirements.
        </p>

        <Link
          href="/contact"
          className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wide"
        >
          Contact Our Office
        </Link>
      </section>
    </>
  );
}
