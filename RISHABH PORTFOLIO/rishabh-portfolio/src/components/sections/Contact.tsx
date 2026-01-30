"use client";

export default function Contact() {
    return (
        <section id="contact">
            <div style={{ maxWidth: 600, margin: "auto" }}>
                <h2 style={{ textAlign: "center" }}>Get in Touch</h2>
                <p className="muted" style={{ textAlign: "center", marginBottom: 32 }}>
                    Have a question or want to work together? Leave a message below.
                </p>

                <form
                    action="https://formspree.io/f/YOUR_FORMSPREE_ID"
                    method="POST"
                    className="card"
                // Removed hardcoded background: "white"
                >
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea id="message" name="message" className="form-textarea" required></textarea>
                    </div>

                    <button type="submit" className="btn" style={{ width: "100%" }}>
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}