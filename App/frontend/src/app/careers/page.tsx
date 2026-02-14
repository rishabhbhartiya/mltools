import InternshipForm from "./InternshipForm";

export default function CareersPage() {
  return (
    <>
      {/* Header */}
      <section className="py-28 bg-gray-50 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Careers
          </h1>
          <p className="text-lg text-gray-600">
            Professional opportunities within litigation, advisory, and dispute resolution practice.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-serif font-semibold mb-8">
            Why Join the Firm
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              The Firm provides exposure to constitutional litigation,
              commercial disputes, arbitration proceedings, and regulatory advisory work.
            </p>

            <p>
              Associates and interns participate in drafting pleadings,
              research memoranda, court appearances, and client consultations,
              ensuring structured professional development.
            </p>

            <p>
              We value analytical rigor, ethical discipline, confidentiality,
              and commitment to professional standards.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-serif font-semibold mb-10">
            Current Openings
          </h2>

          <div className="space-y-12">

            <div className="border-b pb-10">
              <h3 className="text-xl font-serif font-semibold mb-2">
                Associate – Litigation
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                2–5 Years Experience | New Delhi
              </p>
              <p className="text-gray-700 leading-relaxed">
                Representation before High Courts and Tribunals, drafting of pleadings,
                written submissions, research briefs, and client coordination.
              </p>
            </div>

            <div className="border-b pb-10">
              <h3 className="text-xl font-serif font-semibold mb-2">
                Legal Intern
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Law Students (3rd–5th Year) | All Offices
              </p>
              <p className="text-gray-700 leading-relaxed">
                Structured internship program involving legal research,
                drafting assistance, procedural support, and exposure to court proceedings.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Internship Application Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              Job Application
            </h2>
            <p className="text-gray-600">
              Submit your application for consideration in the Firm’s employment program.
            </p>
          </div>

          <InternshipForm />
        </div>
      </section>
    </>
  );
}
