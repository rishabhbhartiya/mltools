"use client";

import React, { useState } from "react";

export default function InternshipForm() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            alert("Application submitted successfully.");
            setSubmitting(false);
        }, 1500);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-10 space-y-8 border"
        >
            <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" name="firstName" required />
                <Input label="Last Name" name="lastName" required />
                <Input label="Email" name="email" type="email" required />
                <Input label="Phone" name="phone" required />
            </div>

            <Textarea label="Statement of Purpose" name="sop" required />

            <FileInput label="Upload Resume (PDF)" name="resume" required />

            <div className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 h-4 w-4" />
                <p className="text-sm text-gray-600">
                    I consent to processing of my data for recruitment purposes.
                </p>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
            >
                {submitting ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}

/* Components */

function Input({ label, name, type = "text", required = false }: any) {
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

function FileInput({ label, name, required = false }: any) {
    return (
        <div>
            <label className="block mb-2 font-medium">
                {label} {required && "*"}
            </label>
            <input
                type="file"
                name={name}
                accept=".pdf"
                required={required}
                className="w-full border rounded-lg px-4 py-3"
            />
        </div>
    );
}
