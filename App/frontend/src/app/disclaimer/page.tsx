export default function DisclaimerPage() {
    return (
        <>
            <section className="py-28 bg-gray-50 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl font-serif font-bold mb-6">
                        Disclaimer
                    </h1>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl space-y-8 text-gray-700 leading-relaxed">

                    <p>
                        As per the rules of the Bar Council of India, law firms are
                        not permitted to solicit work or advertise.
                    </p>

                    <p>
                        The information contained on this website is provided solely
                        for informational purposes and should not be interpreted as
                        solicitation or advertisement.
                    </p>

                    <p>
                        Viewing this website or communicating with the Firm through
                        this website does not create an attorney-client relationship.
                    </p>

                    <p>
                        Any reliance placed on the material on this website is at
                        the user’s own discretion and risk.
                    </p>

                </div>
            </section>
        </>
    );
}
