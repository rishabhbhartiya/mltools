export default function Footer() {
    return (
        <footer
            id="contact"
            style={{
                borderTop: "1px solid var(--border)",
                background: "var(--glass)",
                backdropFilter: "blur(14px)",
                marginTop: 80
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "auto",
                    padding: "48px 24px",
                    textAlign: "center",
                }}
            >
                <h3 style={{ marginBottom: 16 }}>Contact</h3>
                <p className="muted" style={{ marginBottom: 24 }}>
                    Open to opportunities in Machine Learning and Data Science.
                </p>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 32 }}>
                    <a href="mailto:your.email@example.com">Email</a>
                    <a href="https://linkedin.com/in/rishabhbhartiya">LinkedIn</a>
                    <a href="https://github.com/rishabhbhartiya">GitHub</a>
                </div>
                <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    © 2026 Rishabh Bhartiya · ML Engineer
                </div>
            </div>
        </footer>
    );
}