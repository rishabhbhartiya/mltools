"use client";

import React, { useState } from "react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Your message has been submitted successfully.");
            setLoading(false);
        }, 1500);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border shadow-xl rounded-2xl p-10 space-y-10"
        >
            {/* Honeypot (Anti-spam) */}
            <input type="text" name="company" className="hidden" />

            {/* Personal Information */}
            <SectionTitle title="Personal Information" />

            <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" name="name" required />
                <Input label="Email Address" name="email" type="email" required />
                <Input label="Phone Number" name="phone" type="tel" />
                <Select
                    label="Preferred Contact Method"
                    name="contactMethod"
                    options={["Email", "Phone", "Either"]}
                    required
                />
            </div>

            {/* Inquiry Details */}
            <SectionTitle title="Inquiry Details" />

            <div className="grid md:grid-cols-2 gap-6">
                <Select
                    label="Type of Inquiry"
                    name="inquiryType"
                    options={[
                        "Corporate Law",
                        "Litigation",
                        "Intellectual Property",
                        "Criminal Defense",
                        "Legal Consultation",
                        "Other",
                    ]}
                    required
                />

                <Select
                    label="Urgency Level"
                    name="urgency"
                    options={["Standard (48 hrs)", "Urgent (24 hrs)", "Immediate"]}
                    required
                />
            </div>

            <Input label="Subject" name="subject" required />

            <Textarea label="Message" name="message" required />

            {/* Corporate Clients */}
            <SectionTitle title="Corporate Clients (Optional)" />

            <div className="grid md:grid-cols-2 gap-6">
                <Input label="Company Name" name="companyName" />
                <Select
                    label="Estimated Budget Range"
                    name="budget"
                    options={[
                        "Below ₹50,000",
                        "₹50,000 – ₹2,00,000",
                        "₹2,00,000 – ₹10,00,000",
                        "Above ₹10,00,000",
                    ]}
                />
            </div>

            {/* Attachments */}
            <SectionTitle title="Attachments (Optional)" />

            <FileInput label="Upload Relevant Documents (PDF/DOC)" name="file" />

            {/* Consent */}
            <div className="flex items-start gap-3 pt-4">
                <input type="checkbox" required className="mt-1 h-4 w-4" />
                <p className="text-sm text-gray-600">
                    I consent to Argentum Legal processing my data for responding to
                    this inquiry.
                </p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}

/* ---------- Reusable Components ---------- */

function SectionTitle({ title }: { title: string }) {
    return (
        <h2 className="text-2xl font-semibold border-b pb-2">
            {title}
        </h2>
    );
}

function Input({
    label,
    name,
    type = "text",
    required = false,
}: any) {
    return (
        <div>
            <label className="block mb-2 font-medium">
                {label} {required && "*"}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
            />
        </div>
    );
}

function Select({
    label,
    name,
    options,
    required = false,
}: any) {
    return (
        <div>
            <label className="block mb-2 font-medium">
                {label} {required && "*"}
            </label>
            <select
                name={name}
                required={required}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
            >
                <option value="">Select</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Textarea({ label, name, required = false }: any) {
    return (
        <div>
            <label className="block mb-2 font-medium">
                {label} {required && "*"}
            </label>
            <textarea
                name={name}
                required={required}
                rows={5}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
            />
        </div>
    );
}

function FileInput({ label, name }: any) {
    return (
        <div>
            <label className="block mb-2 font-medium">{label}</label>
            <input
                type="file"
                name={name}
                className="w-full border rounded-lg px-4 py-3"
            />
        </div>
    );
}
