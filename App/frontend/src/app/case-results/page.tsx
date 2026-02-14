import { caseResults } from "@/data/caseResults";

export default function CaseResultsPage() {
    return (
        <>
            {/* Header */}
            <section className="py-28 bg-gray-50 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        Representative Matters
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Select matters handled by the Firm across courts and tribunals.
                        Details are presented in compliance with professional regulations
                        and confidentiality obligations.
                    </p>
                </div>
            </section>

            {/* Case List */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl space-y-12">
                    {caseResults.map((caseItem, index) => (
                        <div key={index} className="border-b pb-10">
                            <div className="mb-2 text-sm text-gray-500">
                                {caseItem.court} | {caseItem.year}
                            </div>

                            <h2 className="text-2xl font-serif font-semibold mb-4">
                                {caseItem.title}
                            </h2>

                            <p className="text-gray-700 mb-4 leading-relaxed">
                                {caseItem.summary}
                            </p>

                            <p className="text-gray-900 font-medium">
                                Outcome: {caseItem.outcome}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Compliance Note */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-sm text-gray-600 leading-relaxed">
                    <p>
                        The above matters are illustrative in nature. Past results do not
                        guarantee similar outcomes. Each matter depends on its specific
                        facts and applicable law.
                    </p>
                </div>
            </section>
        </>
    );
}
