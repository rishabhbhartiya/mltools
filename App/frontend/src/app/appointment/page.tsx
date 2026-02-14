"use client";

import { useSearchParams } from "next/navigation";
import { lawyers } from "@/data/lawyers";
import { useState } from "react";

const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "2:00 PM",
    "4:00 PM",
];

export default function AppointmentPage() {
    const params = useSearchParams();
    const slug = params.get("lawyer");

    const lawyer = lawyers.find((l) => l.slug === slug);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Appointment request submitted.");
            setLoading(false);
        }, 1500);
    };

    return (
        <>
            <section className="py-28 bg-gray-50 text-center">
                <h1 className="text-4xl font-serif font-bold mb-4">
                    Book Consultation
                </h1>

                {lawyer && (
                    <p className="text-gray-600">
                        With {lawyer.name}
                    </p>
                )}
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <form
                        onSubmit={handleSubmit}
                        className="border p-8 space-y-6"
                    >
                        {/* Date Picker */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Select Date
                            </label>
                            <input
                                type="date"
                                required
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full border px-4 py-3"
                            />
                        </div>

                        {/* Time Slots */}
                        <div>
                            <label className="block mb-4 font-medium">
                                Available Time Slots
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                                {timeSlots.map((slot) => (
                                    <button
                                        type="button"
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`border px-4 py-2 ${selectedSlot === slot
                                                ? "bg-black text-white"
                                                : ""
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* User Details */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Full Name
                            </label>
                            <input
                                required
                                className="w-full border px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full border px-4 py-3"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !selectedSlot}
                            className="w-full bg-black text-white py-3 uppercase text-sm"
                        >
                            {loading ? "Submitting..." : "Confirm Appointment"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
