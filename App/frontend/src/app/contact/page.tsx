import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="py-28 bg-gray-50 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Submit your inquiry and our office will respond accordingly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
