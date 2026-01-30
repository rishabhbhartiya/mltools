"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <header
            style={{
                position: "fixed", // Changed from sticky to fixed for better floating behavior
                top: "1rem",      // Gap from the top of the screen
                left: "50%",
                transform: "translateX(-50%)", // Centers the floating bar
                zIndex: 100,
                width: "90%",      // Doesn't touch the edges
                maxWidth: "800px", // Keeps it compact
                backgroundColor: "rgba(20, 20, 20, 0.7)", // Darker, more translucent
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)", // Support for Safari
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "99px", // Pill shape
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
        >
            <nav
                style={{
                    padding: "12px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <strong>
                    <Link href="/" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>
                        RB
                    </Link>
                </strong>

                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <Link
                        href="/projects"
                        style={{
                            fontSize: "0.9rem",
                            color: isActive("/projects") ? "var(--accent)" : "var(--text-muted)",
                            transition: "color 0.2s"
                        }}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/research"
                        style={{
                            fontSize: "0.9rem",
                            color: isActive("/research") ? "var(--accent)" : "var(--text-muted)",
                            transition: "color 0.2s"
                        }}
                    >
                        Research
                    </Link>
                    <Link
                        href="/blog"
                        style={{
                            fontSize: "0.9rem",
                            color: isActive("/blog") ? "var(--accent)" : "var(--text-muted)",
                            transition: "color 0.2s"
                        }}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/#contact"
                        style={{
                            fontSize: "0.9rem",
                            padding: "6px 14px",
                            backgroundColor: "var(--text)",
                            color: "#3a3a3a",
                            borderRadius: "20px",
                            fontWeight: 500
                        }}
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
}